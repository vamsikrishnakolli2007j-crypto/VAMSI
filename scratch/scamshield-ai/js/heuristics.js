// ScamShield AI - Heuristic & Behavioral Analysis Engine
// Implements multi-vector threat scoring, link reputation analysis, and contextual explanation generation.

const ScamEngine = {
  // Common suspicious TLDs often abused in smishing/phishing
  SUSPICIOUS_TLDS: [
    "xyz", "top", "buzz", "club", "work", "click", "cam", "vip", "space",
    "monster", "fit", "rest", "cfd", "link", "live", "icu", "loan", "tk",
    "ml", "ga", "cf", "gq", "site", "online", "surf", "info", "best", "cc"
  ],

  // Known URL shorteners
  URL_SHORTENERS: [
    "bit.ly", "tinyurl.com", "is.gd", "cutt.ly", "rb.gy", "t.co",
    "shorturl.at", "ow.ly", "goo.gl", "tiny.cc", "soo.gd"
  ],

  // Brand impersonation keyword patterns in domains/subdomains
  IMPERSONATED_BRANDS: [
    "sbi", "yono", "hdfc", "icici", "axis", "pnb", "bob", "paytm", "phonepe",
    "gpay", "googlepay", "amazon", "netflix", "indiapost", "speedpost",
    "electricity", "bijli", "bescom", "tneb", "tsspdcl", "kbc", "income-tax",
    "pan-card", "aadhaar", "irctc"
  ],

  // Extract all links/domains from text
  extractLinks(text) {
    const urlRegex = /(?:https?:\/\/|www\.)[^\s<>"'()]+|(?:\b[a-zA-Z0-9-]+\.(?:xyz|top|buzz|club|work|click|cam|vip|space|live|icu|online|site|app)\b[^\s<>"'()]*)/gi;
    const matches = text.match(urlRegex) || [];
    return Array.from(new Set(matches));
  },

  // Analyze single link
  analyzeLink(urlStr) {
    let fullUrl = urlStr;
    if (!/^https?:\/\//i.test(fullUrl)) {
      fullUrl = "http://" + fullUrl;
    }

    let hostname = "";
    let isIp = false;
    let isShortener = false;
    let isSuspiciousTld = false;
    let impersonatedBrand = null;
    let isHttpOnly = /^http:\/\//i.test(urlStr);

    try {
      const parsed = new URL(fullUrl);
      hostname = parsed.hostname.toLowerCase();

      // Check IP address hostname
      isIp = /^(\d{1,3}\.){3}\d{1,3}$/.test(hostname);

      // Check shorteners
      isShortener = this.URL_SHORTENERS.some(s => hostname === s || hostname.endsWith("." + s));

      // Check suspicious TLD
      const parts = hostname.split(".");
      const tld = parts[parts.length - 1];
      isSuspiciousTld = this.SUSPICIOUS_TLDS.includes(tld);

      // Check brand spoofing
      for (const brand of this.IMPERSONATED_BRANDS) {
        if (hostname.includes(brand)) {
          // If it contains the brand but isn't the authentic domain (e.g. sbi.co.in or onlinesbi.sbi)
          const legitDomains = ["sbi.co.in", "onlinesbi.sbi", "hdfcbank.com", "icicibank.com", "indiapost.gov.in", "amazon.in", "amazon.com", "paytm.com"];
          const isLegit = legitDomains.some(ld => hostname === ld || hostname.endsWith("." + ld));
          if (!isLegit) {
            impersonatedBrand = brand;
            break;
          }
        }
      }
    } catch (e) {
      hostname = urlStr;
    }

    return {
      raw: urlStr,
      hostname,
      isIp,
      isShortener,
      isSuspiciousTld,
      impersonatedBrand,
      isHttpOnly
    };
  },

  // Main evaluation function
  analyzeMessage(rawText, currentLang = "en") {
    const text = (rawText || "").trim();
    if (!text) {
      return null;
    }

    const vectors = [];
    const flaggedSnippets = [];
    let rawScore = 0;

    // 1. URL & Link Analysis
    const links = this.extractLinks(text);
    const linkAnalyses = links.map(l => this.analyzeLink(l));
    let linkRiskScore = 0;
    let linkDetails = [];

    linkAnalyses.forEach(link => {
      let reasons = [];
      if (link.isIp) {
        reasons.push("Direct IP address used instead of domain name");
        linkRiskScore += 35;
      }
      if (link.isSuspiciousTld) {
        reasons.push(`Uses high-risk top-level domain (.${link.hostname.split('.').pop()}) frequently associated with fraud`);
        linkRiskScore += 30;
      }
      if (link.isShortener) {
        reasons.push("Masked URL shortener hiding the actual destination");
        linkRiskScore += 20;
      }
      if (link.impersonatedBrand) {
        reasons.push(`Suspicious domain imitating '${link.impersonatedBrand.toUpperCase()}' brand`);
        linkRiskScore += 35;
      }
      if (link.isHttpOnly && (link.impersonatedBrand || link.isSuspiciousTld)) {
        reasons.push("Insecure unencrypted HTTP connection");
        linkRiskScore += 10;
      }

      if (reasons.length > 0) {
        flaggedSnippets.push({
          term: link.raw,
          reason: reasons.join("; "),
          category: "link"
        });
        linkDetails.push(`${link.raw} (${reasons[0]})`);
      }
    });

    if (linkRiskScore > 0) {
      vectors.push({
        id: "link_deception",
        severity: linkRiskScore >= 30 ? "critical" : "warning",
        score: Math.min(linkRiskScore, 40),
        evidence: linkDetails.slice(0, 3)
      });
      rawScore += Math.min(linkRiskScore, 40);
    }

    // 2. Artificial Urgency & Coercion Detection
    const urgencyPatterns = [
      { regex: /\b(within \d{1,2} hours?|today itself|tonight (?:at )?\d{1,2}(?::\d{2})?\s*(?:pm|am)?|immediately|urgent(?:ly)?|last (?:chance|notice|warning)|final (?:notice|warning)|action required|account (?:will be )?blocked|account (?:will be )?suspended|account freeze|deactivated|disconnected|power cut|electricity (?:power )?will be disconnected)\b/gi, reason: "Imminent deadline / service termination threat" },
      { regex: /(?:24 గంటల్లో|ఈరోజే|ఈ రాత్రికే|ఈ రాత్రి|వెంటనే|బ్లాక్ చేయబడుతుంది|నిలిపివేయబడుతుంది|రద్దు కాకుండా|చివరి అవకాశం|కరెంట్ కట్|విద్యుత్ సరఫరా)/gi, reason: "తొందరపెట్టే లేదా భయపెట్టే భాష (Urgency pressure in Telugu)" },
      { regex: /(?:24 घंटे के भीतर|आज ही|आज रात|तुरंत|ब्लॉक कर दिया जाएगा|काट दी जाएगी|अंतिम नोटिस|निलंबन|बिजली)/gi, reason: "जल्दबाजी या भय पैदा करने वाली भाषा (Urgency pressure in Hindi)" },
      { regex: /\b(arrest warrant|digital arrest|police action|cbi|customs department|narcotics|court summons|fir registered|cyber police)\b/gi, reason: "Legal intimidation / Digital arrest intimidation" }
    ];

    let urgencyScore = 0;
    let urgencyMatches = [];
    urgencyPatterns.forEach(pat => {
      const matches = text.match(pat.regex);
      if (matches) {
        matches.forEach(m => {
          urgencyMatches.push(m);
          flaggedSnippets.push({ term: m, reason: pat.reason, category: "urgency" });
        });
        urgencyScore += 25;
      }
    });

    if (urgencyScore > 0) {
      vectors.push({
        id: "urgency_pressure",
        severity: urgencyScore >= 25 ? "critical" : "warning",
        score: Math.min(urgencyScore, 30),
        evidence: Array.from(new Set(urgencyMatches)).slice(0, 3)
      });
      rawScore += Math.min(urgencyScore, 30);
    }

    // 3. Credential & OTP Harvest Trap
    // Differentiate between legitimate warnings ("Do NOT share OTP") and phishing requests ("Share OTP with us")
    const legitOtpWarning = /\b(never share (?:this |your )?otp|do not share (?:this |your )?otp|not share otp|share karo mat|ఎవరితోనూ పంచుకోవద్దు|साझा न करें|साझा मत करें)\b/gi.test(text);
    const credentialDemandPatterns = [
      { regex: /\b(?:share|send|tell|give|enter|disclose|verify|confirm)\b[^\n.]{0,30}\b(?:otp|one[- ]time password|6[- ]digit|pin|atm pin|cvv|netbanking password)\b/gi, reason: "Requests disclosure of OTP / Secret PIN" },
      { regex: /\b(?:send|whatsapp|submit)[^\n.]{0,35}\b(?:aadhaar|pan card|bank details|account number|debit card photo)\b/gi, reason: "Demands sensitive identity or financial documents via unverified channel" },
      { regex: /(?:otp|పిన్|పాస్‌వర్డ్|ఆధార్ వివరాలు పంపండి|షేర్ చేయండి)/gi, reason: "OTP లేదా గుర్తింపు కార్డు అడిగే ప్రయత్నం" },
      { regex: /(?:ओटीपी|पिन|पासवर्ड|आधार या बैंक विवरण भेजें|शेयर करें)/gi, reason: "ओटीपी या बैंक विवरण साझा करने की मांग" }
    ];

    let credentialScore = 0;
    let credentialMatches = [];
    if (!legitOtpWarning) {
      credentialDemandPatterns.forEach(pat => {
        const matches = text.match(pat.regex);
        if (matches) {
          matches.forEach(m => {
            credentialMatches.push(m);
            flaggedSnippets.push({ term: m, reason: pat.reason, category: "credential" });
          });
          credentialScore += 40;
        }
      });
    }

    if (credentialScore > 0) {
      vectors.push({
        id: "credential_theft",
        severity: "critical",
        score: Math.min(credentialScore, 40),
        evidence: Array.from(new Set(credentialMatches)).slice(0, 3)
      });
      rawScore += Math.min(credentialScore, 40);
    }

    // 4. Financial & Advance Fee Demands
    const financialPatterns = [
      { regex: /\b(?:deposit|pay|transfer|send)[^\n.]{0,35}\b(?:registration fee|processing charges?|security deposit|activation fee|customs duty|refundable fee|gst charges?|\d+ ?usdt)\b/gi, reason: "Advance fee / unverified payment demand" },
      { regex: /\b[a-zA-Z0-9.\-_]{2,256}@(okhdfcbank|okaxis|okicici|paytm|ybl|ibl|upi|apl)\b/gi, reason: "Direct private UPI VPA payment target" },
      { regex: /(?:రిజిస్ట్రేషన్ ఫీజు|ప్రాసెసింగ్ ఛార్జీలు|డిపాజిట్ చేయండి)/gi, reason: "ముందస్తు రుసుము డిమాండ్ (Advance fee in Telugu)" },
      { regex: /(?:रजिस्ट्रेशन फीस|प्रोसेसिंग शुल्क|डिपॉजिट करें|पैसे भेजें)/gi, reason: "अग्रिम भुगतान की मांग (Advance fee in Hindi)" }
    ];

    let financialScore = 0;
    let financialMatches = [];
    financialPatterns.forEach(pat => {
      const matches = text.match(pat.regex);
      if (matches) {
        matches.forEach(m => {
          financialMatches.push(m);
          flaggedSnippets.push({ term: m, reason: pat.reason, category: "financial" });
        });
        financialScore += 30;
      }
    });

    if (financialScore > 0) {
      vectors.push({
        id: "financial_demand",
        severity: "critical",
        score: Math.min(financialScore, 35),
        evidence: Array.from(new Set(financialMatches)).slice(0, 3)
      });
      rawScore += Math.min(financialScore, 35);
    }

    // 5. Unrealistic Windfall & Lottery Claims
    const lotteryPatterns = [
      { regex: /\b(?:congratulations|congrats|winner)[^\n.]{0,35}\b(?:won|lucky draw|lottery|crorepati|kbc|25,?00,?000|cash prize|free iphone|jackpot)\b/gi, reason: "Unsolicited lottery / improbable windfall" },
      { regex: /\b(?:kbc|kaun banega crorepati)[^\n.]{0,30}\b(?:lucky draw|prize money|file no)\b/gi, reason: "Impersonates KBC / Television Lottery" },
      { regex: /(?:లక్కీ డ్రా|లాటరీ|రూ\. ?25,?00,?000|నగదు బహుమతి గెలుచుకున్నారు)/gi, reason: "లాటరీ / బహుమతి గెలుచుకున్నారని ఆశ చూపడం (Telugu lottery claim)" },
      { regex: /(?:लकी ड्रा|लॉटरी|25 लाख|नकद पुरस्कार जीता है|बधाई हो)/gi, reason: "लॉटरी / भारी ईनाम का झांसा (Hindi lottery claim)" }
    ];

    let lotteryScore = 0;
    let lotteryMatches = [];
    lotteryPatterns.forEach(pat => {
      const matches = text.match(pat.regex);
      if (matches) {
        matches.forEach(m => {
          lotteryMatches.push(m);
          flaggedSnippets.push({ term: m, reason: pat.reason, category: "reward" });
        });
        lotteryScore += 35;
      }
    });

    if (lotteryScore > 0) {
      vectors.push({
        id: "unrealistic_reward",
        severity: "critical",
        score: Math.min(lotteryScore, 35),
        evidence: Array.from(new Set(lotteryMatches)).slice(0, 3)
      });
      rawScore += Math.min(lotteryScore, 35);
    }

    // 6. Task / Job / Work From Home Fraud
    const taskJobPatterns = [
      { regex: /\b(?:part[- ]time|work from home|remote job|daily income|hiring remote)[^\n.]{0,40}\b(?:earn rs\.? ?\d{3,5}|liking (?:youtube|videos)|rating (?:products|hotels)|google reviews|amazon india is hiring)\b/gi, reason: "Unrealistic pay for trivial internet tasks" },
      { regex: /(?:t\.me\/[a-zA-Z0-9_]+|telegram|contact hr manager on whatsapp)/gi, reason: "Channels victim to Telegram or personal WhatsApp for task fraud" },
      { regex: /(?:పార్ట్ టైమ్|లైక్ కొడితే|రోజుకు రూ\. ?\d+|టెలిగ్రామ్|వాట్సాప్ లో సంప్రదించండి)/gi, reason: "టాస్క్ లేదా వీడియో లైక్ జాబ్ మోసం (Telugu job fraud)" },
      { regex: /(?:पार्ट-टाइम|वीडियो लाइक करके|रोज ₹\d+|टेलीग्राम|व्हाट्सएप पर संपर्क करें)/gi, reason: "टास्क या वीडियो लाइक करके कमाई का झांसा (Hindi job fraud)" }
    ];

    let jobScore = 0;
    let jobMatches = [];
    taskJobPatterns.forEach(pat => {
      const matches = text.match(pat.regex);
      if (matches) {
        matches.forEach(m => {
          jobMatches.push(m);
          flaggedSnippets.push({ term: m, reason: pat.reason, category: "job" });
        });
        jobScore += 30;
      }
    });

    if (jobScore > 0) {
      vectors.push({
        id: "task_job_scam",
        severity: "critical",
        score: Math.min(jobScore, 35),
        evidence: Array.from(new Set(jobMatches)).slice(0, 3)
      });
      rawScore += Math.min(jobScore, 35);
    }

    // 7. Delivery / Courier Address Deception
    const deliveryPatterns = [
      { regex: /\b(?:india post|speed post|courier|parcel|package)[^\n.]{0,45}\b(?:cannot be delivered|missing (?:apartment|house|street|address)|incomplete address|parcel will be returned|reschedule)\b/gi, reason: "Fake postal/courier address problem notification" },
      { regex: /(?:ఇండియా పోస్ట్|పార్శిల్|డెలివరీ చేయలేకపోయాము|చిరునామా సరిగా లేదు)/gi, reason: "నకిలీ ఇండియా పోస్ట్ లేదా పార్శిల్ నోటీసు (Telugu delivery scam)" },
      { regex: /(?:इंडिया पोस्ट|पार्सल|डिलीवरी नहीं हो सकी|अधूरा पता)/gi, reason: "फर्जी पार्सल या इंडिया पोस्ट डिलीवरी अलर्ट (Hindi delivery scam)" }
    ];

    let deliveryScore = 0;
    let deliveryMatches = [];
    deliveryPatterns.forEach(pat => {
      const matches = text.match(pat.regex);
      if (matches) {
        matches.forEach(m => {
          deliveryMatches.push(m);
          flaggedSnippets.push({ term: m, reason: pat.reason, category: "delivery" });
        });
        deliveryScore += 30;
      }
    });

    if (deliveryScore > 0) {
      vectors.push({
        id: "delivery_spoof",
        severity: "critical",
        score: Math.min(deliveryScore, 30),
        evidence: Array.from(new Set(deliveryMatches)).slice(0, 3)
      });
      rawScore += Math.min(deliveryScore, 30);
    }

    // 8. Remote Access / Dangerous APK Threat
    const remoteAccessPatterns = [
      { regex: /\b(?:anydesk|teamviewer|quicksupport|rustdesk|\.apk|download apk|install our app from link)\b/gi, reason: "Prompts remote screen control or unverified APK install" },
      { regex: /(?:స్క్రీన్ షేరింగ్|ఏపీకే డౌన్‌లోడ్)/gi, reason: "రిమోట్ యాప్ లేదా ఏపీకే డౌన్‌లోడ్ చేయమనే ప్రయత్నం" },
      { regex: /(?:स्क्रीन शेयरिंग|एपीके डाउनलोड)/gi, reason: "स्क्रीन शेयरिंग या एपीके डाउनलोड करने का सुझाव" }
    ];

    let remoteScore = 0;
    let remoteMatches = [];
    remoteAccessPatterns.forEach(pat => {
      const matches = text.match(pat.regex);
      if (matches) {
        matches.forEach(m => {
          remoteMatches.push(m);
          flaggedSnippets.push({ term: m, reason: pat.reason, category: "remote" });
        });
        remoteScore += 35;
      }
    });

    if (remoteScore > 0) {
      vectors.push({
        id: "remote_access_risk",
        severity: "critical",
        score: Math.min(remoteScore, 35),
        evidence: Array.from(new Set(remoteMatches)).slice(0, 3)
      });
      rawScore += Math.min(remoteScore, 35);
    }

    // 9. Legitimate Signal Modifiers (Ensuring we don't flag based purely on keywords!)
    const hasLegitBankAlertStructure = /\b(?:spent on your (?:debit|credit) card ending xx\d{4}|available balance:? rs\.?|if this was not done by you, call 1800\d+|sms block to \d+)\b/gi.test(text);
    const hasOfficialTollFree = /\b1800[- ]?\d{3}[- ]?\d{3,4}\b/.test(text);

    // If text has legitimate protective 2FA warnings and no malicious links:
    if (legitOtpWarning && links.length === 0 && credentialScore === 0) {
      rawScore = Math.max(5, rawScore - 30);
    }

    // If text is a genuine bank transaction confirmation:
    if (hasLegitBankAlertStructure && hasOfficialTollFree && links.length === 0) {
      rawScore = 10;
      // remove urgency if it was triggered only by 'if not done by you call 1800'
      const urgencyIdx = vectors.findIndex(v => v.id === "urgency_pressure");
      if (urgencyIdx !== -1) {
        vectors.splice(urgencyIdx, 1);
      }
    }

    // Channel switching to personal mobile number for banking/utility issues:
    const personalNumberForOfficialWork = /(?:contact (?:our )?(?:officer|manager|hr)[^\n.]{0,25}(?:on|\:)?\s*(\+?91[- ]?)?[6-9]\d{9}|(?:అధికారి|సంప్రదించండి)[^\n.]{0,25}[6-9]\d{9}|(?:अधिकारी|संपर्क करें)[^\n.]{0,25}[6-9]\d{9}|[6-9]\d{9}[^\n.]{0,20}(?:సంప్రదించండి|संपर्क करें))/gi;
    const personalNumberMatches = text.match(personalNumberForOfficialWork);
    if (personalNumberMatches && (urgencyScore > 0 || deliveryScore > 0 || text.includes("విద్యుత్") || text.includes("बिजली") || text.toLowerCase().includes("power") || text.toLowerCase().includes("electricity"))) {
      rawScore += 35;
      flaggedSnippets.push({
        term: personalNumberMatches[0],
        reason: "Personal mobile number provided for official banking or utility service",
        category: "contact"
      });
      vectors.push({
        id: "channel_switch",
        severity: "critical",
        score: 35,
        evidence: [personalNumberMatches[0]]
      });
    }

    // Clamp score
    const finalScore = Math.min(100, Math.max(0, Math.round(rawScore)));

    // Risk classification
    let riskLevel = "low";
    if (finalScore >= 70) {
      riskLevel = "high";
    } else if (finalScore >= 35) {
      riskLevel = "medium";
    }

    // Build highlighted HTML
    const highlightedHtml = this.generateHighlightedHtml(text, flaggedSnippets);

    return {
      text,
      score: finalScore,
      level: riskLevel,
      vectors,
      flaggedSnippets,
      highlightedHtml,
      hasLinks: links.length > 0,
      linkCount: links.length,
      analyzedAt: new Date().toISOString()
    };
  },

  // Generates safe HTML with marked trigger highlights
  generateHighlightedHtml(text, flaggedSnippets) {
    if (!flaggedSnippets || flaggedSnippets.length === 0) {
      return this.escapeHtml(text);
    }

    // Sort snippets by length descending to match longer phrases first
    const sortedTerms = Array.from(
      new Set(flaggedSnippets.map(f => f.term))
    ).sort((a, b) => b.length - a.length);

    let html = this.escapeHtml(text);

    sortedTerms.forEach(term => {
      if (!term || term.length < 2) return;
      const snippet = flaggedSnippets.find(f => f.term === term);
      const category = snippet ? snippet.category : "general";
      const reason = snippet ? this.escapeHtml(snippet.reason) : "Flagged indicator";

      // Escape regex special chars
      const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const reg = new RegExp(`(${escaped})`, "gi");

      html = html.replace(reg, `<mark class="flagged-term flag-${category}" title="${reason}">$1</mark>`);
    });

    return html;
  },

  escapeHtml(str) {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
};
