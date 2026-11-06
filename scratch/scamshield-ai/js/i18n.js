// ScamShield AI - Comprehensive Multilingual Internationalization (i18n)
// Supports English (en), Telugu (te - తెలుగు), and Hindi (hi - हिन्दी)

const I18N = {
  en: {
    appTitle: "ScamShield AI",
    appSubtitle: "Everyday Scam Message Checker",
    statusBadge: "AI Threat Engine v2.4 Active",
    navHome: "Checker",
    navScamLibrary: "Scam Library",
    navQuiz: "Spot the Scam",
    navHelplines: "Helplines",
    emergencyHelpline: "Cyber Helpline: 1930",
    
    // Hero
    heroTitle: "Protect Yourself from Digital Fraud",
    heroSubtitle: "Instantly analyze suspicious SMS, WhatsApp messages, emails, and job offers with AI-assisted behavioral threat analysis.",
    
    // Privacy banner
    privacyBannerTitle: "Privacy & Safe Analysis Guarantee",
    privacyBannerText: "We never ask for or store passwords, OTPs, or bank details. Sensitive numbers (like phone numbers or simulated codes) are sanitized locally. Results are probabilistic estimates.",
    
    // Input Area
    inputLabel: "Paste Suspicious Message Below:",
    inputPlaceholder: "Paste the SMS, WhatsApp text, email snippet, or job offer here...\n\nExample: 'Dear SBI user, your YONO account will be blocked today. Update PAN immediately click http://sbi-kyc-update.xyz to avoid suspension.'",
    charCount: "characters",
    wordCount: "words",
    pasteBtn: "Paste Clipboard",
    clearBtn: "Clear",
    checkBtn: "Check Message",
    scanningBtn: "Scanning Threat Vectors...",
    
    // Samples
    sampleTitle: "Quick Demo Samples:",
    sampleHint: "Click any realistic scenario below to test the analyzer:",
    sampleTags: {
      all: "All Scenarios",
      bank: "Banking & KYC",
      job: "Job & Task Fraud",
      utility: "Electricity / Bill",
      lottery: "Lottery & Prizes",
      delivery: "Courier / Postal",
      safe: "Legitimate (Safe)"
    },
    
    // Scan steps
    scanStep1: "Extracting URLs, domains, and contact triggers...",
    scanStep2: "Evaluating psychological urgency and fear tactics...",
    scanStep3: "Checking for credential traps and advance-fee demands...",
    scanStep4: "Synthesizing ScamShield risk classification...",
    
    // Results
    resultTitle: "ScamShield Analysis Report",
    riskScoreLabel: "Scam Risk Index",
    riskLevels: {
      low: "Low Risk",
      medium: "Medium Risk",
      high: "High Risk"
    },
    riskBadges: {
      low: "Likely Safe / Routine Communication",
      medium: "Exercise Caution / Unverified Indicators",
      high: "High Threat / Critical Scam Indicators Detected"
    },
    riskSummaries: {
      low: "This message exhibits standard, legitimate communication characteristics. No high-risk deceptive links, credential traps, or coercion tactics were detected.",
      medium: "This message contains ambiguous or unsolicited elements, such as unverified links, promotional offers, or mild urgency. Caution is strongly advised before replying or clicking.",
      high: "This message displays classic red flags typical of digital fraud, including deceptive links, urgent deadlines, or requests for sensitive actions. Do not interact with the sender."
    },
    
    // Disclaimer
    disclaimerTitle: "Important Disclaimer",
    disclaimerText: "ScamShield AI generates probabilistic estimates based on heuristic indicators and behavioral patterns. Results can contain mistakes and do not constitute definitive legal or technical proof. Always verify unexpected communications through official bank apps or customer care.",
    
    // Text Highlights
    highlightTitle: "Contextual Text Breakdown",
    highlightDesc: "Highlighted phrases indicate potential red flags detected during scan:",
    
    // Detected Vectors
    warningSignsTitle: "Warning Signs Breakdown",
    warningSignsSubtitle: "Specific triggers detected in this message:",
    noThreatsFound: "No significant threat vectors detected in this text.",
    vectorSeverity: {
      critical: "Critical",
      warning: "Warning",
      info: "Info"
    },
    
    // Categories
    vectors: {
      link_deception: {
        title: "Suspicious or Impersonated Link",
        desc: "Uses suspicious top-level domains, IP addresses, URL shorteners, or deceptive bank-like subdomains intended to steal credentials."
      },
      urgency_pressure: {
        title: "Artificial Urgency & Fear Coercion",
        desc: "Creates false panic (e.g. 'blocked within 24 hours', 'electricity cut tonight', 'arrest warrant') to rush you into acting without thinking."
      },
      credential_theft: {
        title: "Credential or OTP Harvest Trap",
        desc: "Attempts to coax you into sharing one-time passwords (OTP), PINs, passwords, or personal identity documents."
      },
      financial_demand: {
        title: "Unverified Financial or Advance Payment Demand",
        desc: "Requests direct UPI transfers, registration fees, processing charges, or cryptocurrency payments."
      },
      unrealistic_reward: {
        title: "Unrealistic Windfall or Lottery Claim",
        desc: "Promises huge sums of money, lottery jackpots, or expensive electronics for contests you never entered."
      },
      task_job_scam: {
        title: "Part-Time Task or Work-From-Home Scam",
        desc: "Promises exorbitant daily earnings for trivial tasks like liking videos or rating maps, directing you to Telegram or WhatsApp."
      },
      delivery_spoof: {
        title: "Fake Courier / Parcel Delivery Notice",
        desc: "Impersonates postal or courier services claiming an incomplete address to trick you into entering card details."
      },
      remote_access_risk: {
        title: "Remote Access / Dangerous APK Threat",
        desc: "Asks you to download unknown APK files or remote control software (AnyDesk, TeamViewer) to access your device."
      }
    },
    
    // Action Plan
    actionPlanTitle: "Practical Safety Recommendations",
    actionPlanSubtitle: "Step-by-step guidance on how to respond:",
    dosTitle: "What to do right now",
    dontsTitle: "What NOT to do",
    dosList: [
      "Verify directly: Open the official bank app, visit the verified website, or dial the toll-free number printed on the back of your debit card.",
      "Block & Report: Block the sender number on your phone and flag it as spam in SMS/WhatsApp.",
      "Report Cyber Crime: If you were duped or received a severe threat, report to National Cyber Crime Reporting Portal at cybercrime.gov.in or dial 1930.",
      "Check Sanchar Saathi: Report fraudulent mobile connections via the Government Chakshu portal at sancharsaathi.gov.in."
    ],
    dontsList: [
      "DO NOT click on any link inside the message, even out of curiosity.",
      "DO NOT call any phone number provided in the body of the message.",
      "DO NOT share any 6-digit OTP, UPI PIN, ATM PIN, or CVV under any circumstances.",
      "DO NOT download any APK file or install remote desktop apps (AnyDesk, TeamViewer).",
      "DO NOT forward this message to family groups or friends."
    ],
    
    // Action buttons
    copyReportBtn: "Copy Threat Advisory",
    reportHelplineBtn: "Report to 1930 Helpline",
    shareAlertBtn: "Share Warning",
    copiedFeedback: "Advisory report copied to clipboard!",
    
    // Scam Library
    libraryTitle: "Common Scam Types Directory",
    librarySubtitle: "Learn the anatomy of prevalent scams affecting people everyday in India & worldwide",
    
    // Quiz
    quizTitle: "Spot the Scam - Quick Challenge",
    quizSubtitle: "Test your cybersecurity intuition against real-world scenario tests.",
    quizNextBtn: "Next Scenario",
    quizRestartBtn: "Restart Challenge",
    quizScoreMsg: "Your Score: {score} / {total}",
    
    // Helplines
    helplineTitle: "Official Emergency Cyber Contacts",
    helplineSubtitle: "Legitimate government and banking helplines you can trust unconditionally:",
    
    // Footer
    footerDisclaimer: "ScamShield AI is an educational cyber-awareness tool designed for college hackathon demonstration. It analyzes structural heuristics and behavioral signals. It does not replace authorized law enforcement or official bank verification.",
    footerBuiltFor: "Built for Cyber Security Innovation & Community Safety"
  },
  
  te: {
    appTitle: "స్కామ్ షీల్డ్ AI",
    appSubtitle: "రోజువారీ మోసపూరిత సందేశాల గుర్తింపు సాధనం",
    statusBadge: "AI ముప్పు గుర్తింపు ఇంజిన్ v2.4 సిద్ధంగా ఉంది",
    navHome: "సందేశ తనిఖీ",
    navScamLibrary: "మోసాల రకాలు",
    navQuiz: "మోసాన్ని గుర్తించండి",
    navHelplines: "హెల్ప్‌లైన్లు",
    emergencyHelpline: "సైబర్ హెల్ప్‌లైన్: 1930",
    
    heroTitle: "డిజిటల్ మోసాల నుండి మిమ్మల్ని రక్షించుకోండి",
    heroSubtitle: "అనుమానాస్పద SMSలు, వాట్సాప్ మెసేజ్‌లు, ఈమెయిళ్లు మరియు నకిలీ ఉద్యోగ ఆఫర్లను AI ఆధారిత ముప్పు విశ్లేషణతో తక్షణమే తనిఖీ చేయండి.",
    
    privacyBannerTitle: "గోప్యత మరియు సురక్షిత విశ్లేషణ హామీ",
    privacyBannerText: "మేము ఎప్పుడూ పాస్‌వర్డ్‌లు, OTPలు లేదా బ్యాంకు వివరాలను అడగము, నిల్వ చేయము. ఫలితాలు అంచనాలు మాత్రమే.",
    
    inputLabel: "అనుమానాస్పద సందేశాన్ని ఇక్కడ అతికించండి (Paste):",
    inputPlaceholder: "మీకు వచ్చిన SMS, వాట్సాప్ సందేశం లేదా ఈమెయిల్‌ను ఇక్కడ పేస్ట్ చేయండి...\n\nఉదాహరణ: 'డియర్ కస్టమర్, మీ SBI YONO ఖాతా ఈరోజే బ్లాక్ చేయబడుతుంది. వెంటనే http://sbi-kyc-update.xyz లింక్ క్లిక్ చేసి పాన్ కార్డు అప్‌డేట్ చేయండి.'",
    charCount: "అక్షరాలు",
    wordCount: "పదాలు",
    pasteBtn: "క్లిప్‌బోర్డ్ నుండి పేస్ట్ చేయండి",
    clearBtn: "తుడిచివేయండి",
    checkBtn: "సందేశాన్ని తనిఖీ చేయండి",
    scanningBtn: "ముప్పు సంకేతాలను స్కాన్ చేస్తోంది...",
    
    sampleTitle: "డెమో కోసం నమూనా సందేశాలు:",
    sampleHint: "విశ్లేషణను పరీక్షించడానికి క్రింది నమూనాలలో ఒకదాన్ని ఎంచుకోండి:",
    sampleTags: {
      all: "అన్ని రకాలు",
      bank: "బ్యాంకింగ్ & KYC",
      job: "నకిలీ ఉద్యోగాలు",
      utility: "విద్యుత్ బిల్లు మోసం",
      lottery: "లాటరీ బహుమతులు",
      delivery: "పార్శిల్ డెలివరీ",
      safe: "సురక్షితమైనవి (Safe)"
    },
    
    scanStep1: "లింకులు, వెబ్‌సైట్ చిరునామాలు మరియు నంబర్లను వేరుచేస్తోంది...",
    scanStep2: "అత్యవసరం మరియు భయం కలిగించే భాషను పరిశీలిస్తోంది...",
    scanStep3: "OTP, పాస్‌వర్డ్ మరియు ముందస్తు డబ్బు డిమాండ్లను తనిఖీ చేస్తోంది...",
    scanStep4: "స్కామ్ షీల్డ్ ముప్పు వర్గీకరణను రూపొందిస్తోంది...",
    
    resultTitle: "స్కామ్ షీల్డ్ విశ్లేషణ నివేదిక",
    riskScoreLabel: "స్కామ్ ముప్పు సూచిక",
    riskLevels: {
      low: "తక్కువ ప్రమాదం (Low Risk)",
      medium: "మధ్యస్థ ప్రమాదం (Medium Risk)",
      high: "అధిక ప్రమాదం (High Risk)"
    },
    riskBadges: {
      low: "సాధారణ / సురక్షితమైన సందేశం లాగా కనిపిస్తోంది",
      medium: "జాగ్రత్త వహించండి / అనుమానాస్పద అంశాలు ఉన్నాయి",
      high: "తీవ్రమైన ముప్పు / స్పష్టమైన మోసపూరిత సంకేతాలు ఉన్నాయి"
    },
    riskSummaries: {
      low: "ఈ సందేశం సాధారణ, నిజమైన కమ్యూనికేషన్ లక్షణాలను కలిగి ఉంది. ఎలాంటి ప్రమాదకరమైన లింకులు లేదా OTP అడిగే ప్రయత్నాలు కనిపించలేదు.",
      medium: "ఈ సందేశంలో కొన్ని అనుమానాస్పద అంశాలు (ధృవీకరించని లింకులు లేదా తొందరపాటు చేసే మాటలు) ఉన్నాయి. జాగ్రత్తగా ఉండండి.",
      high: "ఈ సందేశంలో సైబర్ మోసగాళ్ళు ఉపయోగించే నకిలీ లింకులు, భయం పుట్టించే గడువులు లేదా సమాచారాన్ని దొంగిలించే సూచనలు స్పష్టంగా ఉన్నాయి. స్పందించవద్దు!"
    },
    
    disclaimerTitle: "ముఖ్యమైన గమనిక",
    disclaimerText: "స్కామ్ షీల్డ్ AI భాషా శైలి మరియు నమూనాల ఆధారంగా అంచనా వేస్తుంది. ఫలితాలు కేవలం హెచ్చరిక మార్గదర్శకాలు మాత్రమే. చట్టపరమైన లేదా అంతిమ నిర్ధారణ కోసం ఎల్లప్పుడూ సంబంధిత బ్యాంక్ లేదా అధికారిక పోర్టల్‌ను నేరుగా సంప్రదించండి.",
    
    highlightTitle: "సందేశంలో గుర్తించిన అంశాలు",
    highlightDesc: "స్కాన్ సమయంలో గుర్తించబడిన అనుమానాస్పద పదాలు ఇక్కడ హైలైట్ చేయబడ్డాయి:",
    
    warningSignsTitle: "హెచ్చరిక సంకేతాల వివరాలు",
    warningSignsSubtitle: "ఈ సందేశంలో కనిపించిన ప్రమాదకర సూచనలు:",
    noThreatsFound: "ఈ సందేశంలో ఎటువంటి తీవ్రమైన ముప్పు సంకేతాలు కనిపించలేదు.",
    vectorSeverity: {
      critical: "తీవ్రమైనది",
      warning: "హెచ్చరిక",
      info: "సమాచారం"
    },
    
    vectors: {
      link_deception: {
        title: "అనుమానాస్పద లేదా నకిలీ వెబ్‌సైట్ లింక్",
        desc: "నకిలీ వెబ్‌సైట్‌లు (.xyz, .top మొదలైనవి) లేదా షార్ట్ లింక్‌ల ద్వారా మీ సమాచారాన్ని దొంగిలించే ప్రయత్నం."
      },
      urgency_pressure: {
        title: "కృత్రిమ అత్యవసరం & భయపెట్టే భాష",
        desc: "'24 గంటల్లో ఖాతా రద్దు', 'ఈ రాత్రికే కరెంట్ కట్', 'పోలీస్ అరెస్ట్' అంటూ మిమ్మల్ని ఆలోచించకుండా తొందరపెట్టే ప్రయత్నం."
      },
      credential_theft: {
        title: "OTP లేదా పాస్‌వర్డ్ దొంగిలించే ఉచ్చు",
        desc: "మీకు వచ్చిన OTP, ATM పిన్ లేదా బ్యాంక్ పాస్‌వర్డ్‌ను తెలుసుకునేందుకు చేసే ప్రయత్నం."
      },
      financial_demand: {
        title: "ముందస్తు రుసుము లేదా అక్రమ UPI చెల్లింపు",
        desc: "రిజిస్ట్రేషన్ ఫీజు లేదా ప్రాసెసింగ్ ఛార్జీల పేరుతో వ్యక్తిగత UPI లేదా ఖాతాకు డబ్బులు పంపమని అడగడం."
      },
      unrealistic_reward: {
        title: "నమ్మశక్యం కాని లాటరీ / బహుమతి",
        desc: "మీరు పాల్గొనని లాటరీలలో కోట్ల రూపాయలు లేదా ఉచిత మొబైల్ గెలుచుకున్నారని ఆశ చూపడం."
      },
      task_job_scam: {
        title: "పార్ట్ టైమ్ జాబ్ / లైక్ కొడితే డబ్బులు మోసం",
        desc: "యూట్యూబ్ వీడియోలకు లైక్ చేస్తే రోజుకు రూ. 5000 సంపాదించవచ్చని టెలిగ్రామ్ లేదా వాట్సాప్‌కు పిలవడం."
      },
      delivery_spoof: {
        title: "నకిలీ కొరియర్ / ఇండియా పోస్ట్ నోటీసు",
        desc: "చిరునామా సరిగా లేదని పార్శిల్ ఆగిపోయిందంటూ లింక్ క్లిక్ చేయించి కార్డు వివరాలు అడగడం."
      },
      remote_access_risk: {
        title: "రిమోట్ యాప్స్ లేదా ప్రమాదకర APK ఫైల్స్",
        desc: "సమస్య పరిష్కారం పేరుతో AnyDesk, TeamViewer వంటి స్క్రీన్ షేరింగ్ యాప్స్ లేదా ప్రమాదకర APKలను ఇన్‌స్టాల్ చేయమని చెప్పడం."
      }
    },
    
    actionPlanTitle: "ఆచరణాత్మక భద్రతా సూచనలు",
    actionPlanSubtitle: "ఈ పరిస్థితిలో మీరు చేయవలసిన ముఖ్యమైన పనులు:",
    dosTitle: "ఇప్పుడే ఏమి చేయాలి",
    dontsTitle: "ఏమి చేయకూడదు",
    dosList: [
      "నేరుగా ధృవీకరించుకోండి: అధికారిక బ్యాంక్ యాప్ తెరవండి లేదా మీ ఏటీఎం కార్డు వెనుక ఉన్న టోల్ ఫ్రీ నంబర్‌కు కాల్ చేయండి.",
      "బ్లాక్ చేయండి: సందేశం పంపిన నంబర్‌ను మీ ఫోన్‌లో వెంటనే బ్లాక్ చేసి స్పామ్‌గా రిపోర్ట్ చేయండి.",
      "సైబర్ హెల్ప్‌లైన్ కు ఫిర్యాదు చేయండి: 1930 హెల్ప్‌లైన్ నంబర్‌కు కాల్ చేయండి లేదా cybercrime.gov.in లో రిపోర్ట్ చేయండి.",
      "సంచార్ సాథి (చక్షు) పోర్టల్ ద్వారా మోసపూరిత మొబైల్ నంబర్లను ప్రభుత్వానికి తెలియజేయండి (sancharsaathi.gov.in)."
    ],
    dontsList: [
      "సందేశంలో ఉన్న ఎలాంటి లింక్ పైన క్లిక్ చేయవద్దు.",
      "సందేశంలో ఇచ్చిన ఏ ఫోన్ నంబర్‌కూ కాల్ చేయవద్దు.",
      "ఎవరితోనూ 6 అంకెల OTP, UPI పిన్ లేదా పాస్‌వర్డ్‌ను పంచుకోవద్దు.",
      "తెలియని APK ఫైళ్లు లేదా AnyDesk వంటి యాప్‌లను ఇన్‌స్టాల్ చేయవద్దు.",
      "ఈ సందేశాన్ని కుటుంబ సభ్యులకు లేదా స్నేహితులకు ఫార్వార్డ్ చేయవద్దు."
    ],
    
    copyReportBtn: "భద్రతా నివేదికను కాపీ చేయండి",
    reportHelplineBtn: "1930 హెల్ప్‌లైన్‌కు కాల్ చేయండి",
    shareAlertBtn: "హెచ్చరికను షేర్ చేయండి",
    copiedFeedback: "నివేదిక కాపీ చేయబడింది!",
    
    libraryTitle: "ప్రధాన మోసాల డైరెక్టరీ",
    librarySubtitle: "మన సమాజంలో సాధారణంగా జరిగే ప్రధాన సైబర్ మోసాల తీరును తెలుసుకోండి",
    
    quizTitle: "మోసాన్ని గుర్తించండి - చిన్న సవాలు",
    quizSubtitle: "మీ సైబర్ అవగాహనను పరీక్షించుకోండి.",
    quizNextBtn: "తదుపరి ప్రశ్న",
    quizRestartBtn: "మళ్ళీ ప్రారంభించండి",
    quizScoreMsg: "మీ స్కోరు: {score} / {total}",
    
    helplineTitle: "అధికారిక అత్యవసర సహాయ కేంద్రాలు",
    helplineSubtitle: "మీరు విశ్వసించదగిన అధికారిక ప్రభుత్వ మరియు బ్యాంకింగ్ నంబర్లు:",
    
    footerDisclaimer: "స్కామ్ షీల్డ్ AI కళాశాల హ్యాకథాన్ కోసం రూపొందించబడిన సైబర్ అవగాహన సాధనం. ఇది భాషా శైలిని విశ్లేషిస్తుంది.",
    footerBuiltFor: "సైబర్ భద్రత మరియు ప్రజా అవగాహన కోసం రూపొందించబడింది"
  },
  
  hi: {
    appTitle: "स्कैमशील्ड AI",
    appSubtitle: "दैनिक धोखाधड़ी संदेश विश्लेषक",
    statusBadge: "AI साइबर थ्रेट इंजन v2.4 सक्रिय",
    navHome: "मैसेज चेकर",
    navScamLibrary: "स्कैम लाइब्रेरी",
    navQuiz: "स्कैम पहचानें",
    navHelplines: "हेल्पलाइन",
    emergencyHelpline: "साइबर हेल्पलाइन: 1930",
    
    heroTitle: "डिजिटल धोखाधड़ी से खुद को सुरक्षित रखें",
    heroSubtitle: "संदिग्ध एसएमएस, व्हाट्सएप संदेशों, फर्जी ईमेल और नौकरी के झांसों की AI आधारित साइबर थ्रेट विश्लेषण से तुरंत जांच करें।",
    
    privacyBannerTitle: "गोपनीयता एवं सुरक्षित विश्लेषण गारंटी",
    privacyBannerText: "हम कभी भी पासवर्ड, ओटीपी या बैंक खाते का विवरण नहीं मांगते और न ही सुरक्षित रखते हैं। परिणाम केवल अनुमानित मार्गदर्शन हैं।",
    
    inputLabel: "संदिग्ध संदेश यहाँ पेस्ट करें:",
    inputPlaceholder: "यहाँ वह SMS, व्हाट्सएप मैसेज या ईमेल पेस्ट करें जिसकी आप जांच करना चाहते हैं...\n\nउदाहरण: 'प्रिय ग्राहक, आपका SBI YONO खाता आज ब्लॉक हो जाएगा। खाते को चालू रखने के लिए तुरंत http://sbi-kyc-update.xyz पर पैन अपडेट करें।'",
    charCount: "अक्षर",
    wordCount: "शब्द",
    pasteBtn: "क्लिपबोर्ड से पेस्ट करें",
    clearBtn: "हटाएं",
    checkBtn: "संदेश की जांच करें",
    scanningBtn: "खतरे के संकेतों की जांच हो रही है...",
    
    sampleTitle: "डेमो के लिए उदाहरण संदेश:",
    sampleHint: "विश्लेषण की जांच के लिए नीचे दिए गए किसी भी उदाहरण पर क्लिक करें:",
    sampleTags: {
      all: "सभी श्रेणियां",
      bank: "बैंकिंग और केवाईसी",
      job: "फर्जी नौकरी",
      utility: "बिजली बिल फ्रॉड",
      lottery: "लॉटरी एवं ईनाम",
      delivery: "पार्सल डिलीवरी",
      safe: "सुरक्षित संदेश (Safe)"
    },
    
    scanStep1: "संदिग्ध लिंक, डोमेन और संपर्क सूत्रों की पहचान...",
    scanStep2: "जल्दबाजी और डर पैदा करने वाली भाषा की जांच...",
    scanStep3: "ओटीपी, पासवर्ड और अग्रिम भुगतान के जाल की पहचान...",
    scanStep4: "स्कैमशील्ड समग्र जोखिम स्कोर की गणना...",
    
    resultTitle: "स्कैमशील्ड विश्लेषण रिपोर्ट",
    riskScoreLabel: "स्कैम जोखिम सूचकांक",
    riskLevels: {
      low: "कम जोखिम (Low Risk)",
      medium: "मध्यम जोखिम (Medium Risk)",
      high: "उच्च जोखिम (High Risk)"
    },
    riskBadges: {
      low: "सामान्य एवं सुरक्षित संचार प्रतीत होता है",
      medium: "सावधानी बरतें / असत्यापित संकेत मौजूद हैं",
      high: "गंभीर खतरा / स्पष्ट धोखाधड़ी के संकेत मिले हैं"
    },
    riskSummaries: {
      low: "यह संदेश सामान्य और वैध संचार जैसा है। इसमें कोई संदिग्ध लिंक या संवेदनशील जानकारी मांगने का संकेत नहीं मिला।",
      medium: "इस संदेश में कुछ संदिग्ध संकेत (जैसे अज्ञात लिंक या जल्दबाजी) मिले हैं। किसी भी लिंक पर क्लिक करने से पहले सावधानी बरतें।",
      high: "इस संदेश में साइबर ठगों द्वारा इस्तेमाल किए जाने वाले फर्जी लिंक, डराने-धमकाने वाली भाषा या ओटीपी हड़पने के स्पष्ट लक्षण हैं। इस पर बिल्कुल भरोसा न करें!"
    },
    
    disclaimerTitle: "महत्वपूर्ण सूचना",
    disclaimerText: "स्कैमशील्ड AI सांख्यिकीय और पैटर्न विश्लेषण पर आधारित अनुमान प्रदान करता है। परिणाम त्रुटिपूर्ण हो सकते हैं और यह कोई कानूनी प्रमाणपत्र नहीं है। अनपेक्षित संदेशों की पुष्टि हमेशा अपने बैंक के आधिकारिक ऐप या टोल-फ्री नंबर से करें।",
    
    highlightTitle: "संदेश में पाए गए संदिग्ध बिंदु",
    highlightDesc: "स्कैन के दौरान चिन्हित किए गए संदिग्ध शब्द और लिंक यहाँ हाइलाइट किए गए हैं:",
    
    warningSignsTitle: "चेतावनी संकेतों का विवरण",
    warningSignsSubtitle: "इस संदेश में पाए गए मुख्य खतरे:",
    noThreatsFound: "इस संदेश में कोई गंभीर खतरे का संकेत नहीं मिला।",
    vectorSeverity: {
      critical: "गंभीर",
      warning: "चेतावनी",
      info: "सूचना"
    },
    
    vectors: {
      link_deception: {
        title: "संदिग्ध या फर्जी वेबसाइट लिंक",
        desc: "फर्जी डोमेन (.xyz, .top आदि) या शॉर्ट लिंक का उपयोग करके आपकी निजी जानकारी चुराने का प्रयास।"
      },
      urgency_pressure: {
        title: "कृत्रिम जल्दबाजी और डर का दबाव",
        desc: "'24 घंटे में खाता ब्लॉक', 'आज रात बिजली कटेगी', 'पुलिस कार्रवाई' जैसी धमकियों से आपको बिना सोचे कदम उठाने पर मजबूर करना।"
      },
      credential_theft: {
        title: "ओटीपी या पासवर्ड चुराने का जाल",
        desc: "आपसे आपका ओटीपी, एटीएम पिन या पासवर्ड मांगने का प्रयास करना।"
      },
      financial_demand: {
        title: "अग्रिम शुल्क या निजी यूपीआई भुगतान की मांग",
        desc: "रजिस्ट्रेशन फीस या प्रोसेसिंग शुल्क के नाम पर पैसे सीधे यूपीआई या बैंक खाते में ट्रांसफर करने को कहना।"
      },
      unrealistic_reward: {
        title: "अविश्वसनीय लॉटरी या ईनाम का झांसा",
        desc: "बिना किसी प्रतियोगिता में भाग लिए लाखों रुपये की लॉटरी या मुफ्त मोबाइल जीतने का लालच देना।"
      },
      task_job_scam: {
        title: "पार्ट-टाइम नौकरी / वीडियो लाइक करके कमाई का फ्रॉड",
        desc: "घर बैठे केवल वीडियो लाइक करके रोज ₹5000 कमाने का लालच देकर टेलीग्राम या व्हाट्सएप पर ले जाना।"
      },
      delivery_spoof: {
        title: "फर्जी कूरियर / इंडिया पोस्ट डिलीवरी अलर्ट",
        desc: "अधूरे पते का बहाना बनाकर लिंक पर क्लिक करवाकर डेबिट/क्रेडिट कार्ड की जानकारी चुराना।"
      },
      remote_access_risk: {
        title: "रिमोट ऐप या खतरनाक APK डाउनलोड का खतरा",
        desc: "समस्या हल करने के नाम पर AnyDesk, TeamViewer या अनजान APK फाइल डाउनलोड करने को कहना।"
      }
    },
    
    actionPlanTitle: "व्यावहारिक सुरक्षा सुझाव",
    actionPlanSubtitle: "इस समय आपको क्या कदम उठाने चाहिए:",
    dosTitle: "तुरंत क्या करें",
    dontsTitle: "क्या बिल्कुल न करें",
    dosList: [
      "सीधे पुष्टि करें: बैंक के आधिकारिक ऐप में लॉगिन करें या अपने एटीएम कार्ड के पीछे लिखे टोल-फ्री नंबर पर कॉल करें।",
      "ब्लॉक करें: भेजने वाले के नंबर को तुरंत ब्लॉक करें और स्पैम के रूप में रिपोर्ट करें।",
      "साइबर हेल्पलाइन पर रिपोर्ट करें: राष्ट्रीय साइबर अपराध हेल्पलाइन 1930 पर कॉल करें या cybercrime.gov.in पर शिकायत दर्ज करें।",
      "संचार साथी (चक्षु) पोर्टल पर फर्जी मोबाइल नंबरों की सूचना दें (sancharsaathi.gov.in)।"
    ],
    dontsList: [
      "संदेश में दिए गए किसी भी लिंक पर कभी क्लिक न करें।",
      "संदेश के अंदर दिए गए किसी भी फोन नंबर पर कॉल न करें।",
      "किसी भी परिस्थिति में अपना 6 अंकों का ओटीपी, यूपीआई पिन या पासवर्ड साझा न करें।",
      "अज्ञात APK फाइल या AnyDesk जैसे स्क्रीन-शेयरिंग ऐप डाउनलोड न करें।",
      "इस संदेश को परिवार या मित्रों के व्हाट्सएप ग्रुप में फॉरवर्ड न करें।"
    ],
    
    copyReportBtn: "सुरक्षा रिपोर्ट कॉपी करें",
    reportHelplineBtn: "1930 हेल्पलाइन पर कॉल करें",
    shareAlertBtn: "चेतावनी शेयर करें",
    copiedFeedback: "रिपोर्ट क्लिपबोर्ड में कॉपी हो गई!",
    
    libraryTitle: "प्रमुख धोखाधड़ी डायरेक्टरी",
    librarySubtitle: "भारत और दुनिया भर में सबसे आम साइबर अपराधों के तौर-तरीकों को समझें",
    
    quizTitle: "स्कैम पहचानें - 1 मिनट चुनौती",
    quizSubtitle: "वास्तविक परिदृश्यों में अपनी साइबर जागरूकता का परीक्षण करें।",
    quizNextBtn: "अगला प्रश्न",
    quizRestartBtn: "पुनः शुरू करें",
    quizScoreMsg: "आपका स्कोर: {score} / {total}",
    
    helplineTitle: "आधिकारिक आपातकालीन संपर्क",
    helplineSubtitle: "सरकार और बैंकों के प्रामाणिक संपर्क नंबर जिन पर आप भरोसा कर सकते हैं:",
    
    footerDisclaimer: "स्कैमशील्ड AI कॉलेज हैकाथॉन प्रदर्शन के लिए बनाया गया एक शैक्षणिक साइबर सुरक्षा जागरूकता टूल है। यह पैटर्न का विश्लेषण करता है।",
    footerBuiltFor: "साइबर सुरक्षा नवाचार और जन-जागरूकता के लिए समर्पित"
  }
};
