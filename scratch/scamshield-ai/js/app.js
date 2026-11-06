// ScamShield AI - Application Controller & User Interface Engine
// Connects UI, i18n, Heuristics, Sound FX, Quiz, and Backend API Bridge

class ScamShieldApp {
  constructor() {
    this.currentLang = localStorage.getItem("scamshield_lang") || "en";
    this.audioEnabled = localStorage.getItem("scamshield_audio") !== "false";
    this.isBackendOnline = false;
    this.lastAnalysis = null;
    this.audioCtx = null;
    
    // Quiz state
    this.quizIndex = 0;
    this.quizScore = 0;

    this.init();
  }

  async init() {
    this.setupAudio();
    this.bindEvents();
    this.checkBackendHealth();
    this.renderLanguage(this.currentLang);
    this.renderSamples();
    this.renderQuiz();
    this.updateCounters();
  }

  // Check if C# or PowerShell backend is active
  async checkBackendHealth() {
    const badge = document.getElementById("statusBadgeText");
    try {
      const res = await fetch("/api/health", { method: "GET" });
      if (res.ok) {
        const data = await res.json();
        this.isBackendOnline = true;
        if (badge) {
          badge.textContent = `Backend Connected: ${data.engine || "ScamShield Server"}`;
        }
      }
    } catch (e) {
      this.isBackendOnline = false;
      if (badge) {
        badge.textContent = I18N[this.currentLang].statusBadge || "AI Threat Engine v2.4 Active";
      }
    }
  }

  // Web Audio API Synthesizer (Zero external audio files needed!)
  setupAudio() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    } catch (e) {
      this.audioCtx = null;
    }

    const soundBtn = document.getElementById("audioToggleBtn");
    if (soundBtn) {
      if (this.audioEnabled) {
        soundBtn.classList.add("active");
        soundBtn.setAttribute("title", "Sound Effects: ON");
      } else {
        soundBtn.classList.remove("active");
        soundBtn.setAttribute("title", "Sound Effects: OFF");
      }
    }
  }

  playBeep(frequency = 800, type = "sine", duration = 0.08) {
    if (!this.audioEnabled || !this.audioCtx) return;
    try {
      if (this.audioCtx.state === "suspended") {
        this.audioCtx.resume();
      }
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(frequency, this.audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (e) {}
  }

  playScanSound() {
    if (!this.audioEnabled) return;
    this.playBeep(520, "sine", 0.06);
    setTimeout(() => this.playBeep(780, "triangle", 0.08), 120);
    setTimeout(() => this.playBeep(1040, "sine", 0.1), 240);
  }

  playSuccessSound(isThreat = false) {
    if (!this.audioEnabled) return;
    if (isThreat) {
      this.playBeep(350, "sawtooth", 0.15);
      setTimeout(() => this.playBeep(260, "sawtooth", 0.25), 160);
    } else {
      this.playBeep(600, "sine", 0.1);
      setTimeout(() => this.playBeep(900, "sine", 0.2), 120);
    }
  }

  // DOM Event Listeners
  bindEvents() {
    const langSelect = document.getElementById("langSelect");
    if (langSelect) {
      langSelect.value = this.currentLang;
      langSelect.addEventListener("change", (e) => {
        this.setLanguage(e.target.value);
      });
    }

    const audioBtn = document.getElementById("audioToggleBtn");
    if (audioBtn) {
      audioBtn.addEventListener("click", () => {
        this.audioEnabled = !this.audioEnabled;
        localStorage.setItem("scamshield_audio", this.audioEnabled);
        this.setupAudio();
        this.showToast(this.audioEnabled ? "Sound Effects Enabled" : "Sound Effects Muted");
      });
    }

    const textarea = document.getElementById("messageInput");
    if (textarea) {
      textarea.addEventListener("input", () => this.updateCounters());
      textarea.addEventListener("keydown", (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          this.checkMessage();
        }
      });
    }

    const pasteBtn = document.getElementById("pasteBtn");
    if (pasteBtn) {
      pasteBtn.addEventListener("click", () => this.pasteFromClipboard());
    }

    const clearBtn = document.getElementById("clearBtn");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => this.clearInput());
    }

    const checkBtn = document.getElementById("checkBtn");
    if (checkBtn) {
      checkBtn.addEventListener("click", () => this.checkMessage());
    }

    const copyReportBtn = document.getElementById("copyReportBtn");
    if (copyReportBtn) {
      copyReportBtn.addEventListener("click", () => this.copyReport());
    }

    const shareAlertBtn = document.getElementById("shareAlertBtn");
    if (shareAlertBtn) {
      shareAlertBtn.addEventListener("click", () => this.shareAlert());
    }
  }

  // Update Character and Word counters
  updateCounters() {
    const textarea = document.getElementById("messageInput");
    const charCounter = document.getElementById("charCountText");
    const wordCounter = document.getElementById("wordCountText");
    if (!textarea) return;

    const val = textarea.value;
    const chars = val.length;
    const words = val.trim() === "" ? 0 : val.trim().split(/\s+/).length;

    const dict = I18N[this.currentLang] || I18N.en;
    if (charCounter) charCounter.textContent = `${chars} ${dict.charCount}`;
    if (wordCounter) wordCounter.textContent = `${words} ${dict.wordCount}`;
  }

  // Switch Language
  setLanguage(langCode) {
    if (!I18N[langCode]) return;
    this.currentLang = langCode;
    localStorage.setItem("scamshield_lang", langCode);
    this.renderLanguage(langCode);
    this.renderSamples();
    this.renderQuiz();
    this.updateCounters();
    if (this.lastAnalysis) {
      this.renderResults(this.lastAnalysis);
    }
    this.showToast(langCode === "te" ? "భాష తెలుగులోకి మార్చబడింది" : langCode === "hi" ? "भाषा हिन्दी में बदली गई" : "Language switched to English");
  }

  // Translate all UI text
  renderLanguage(lang) {
    const dict = I18N[lang] || I18N.en;

    document.querySelectorAll("[data-i18n]").forEach(elem => {
      const key = elem.getAttribute("data-i18n");
      if (dict[key]) {
        elem.textContent = dict[key];
      }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(elem => {
      const key = elem.getAttribute("data-i18n-placeholder");
      if (dict[key]) {
        elem.setAttribute("placeholder", dict[key]);
      }
    });

    // Check emergency helpline text
    const helplineLink = document.getElementById("emergencyHelplineLink");
    if (helplineLink && dict.emergencyHelpline) {
      helplineLink.textContent = dict.emergencyHelpline;
    }
  }

  // Render Sample Scenario Chips
  renderSamples() {
    const container = document.getElementById("sampleChipsContainer");
    if (!container) return;
    container.innerHTML = "";

    SAMPLE_MESSAGES.forEach(sample => {
      const title = sample.titles[this.currentLang] || sample.titles.en;
      const text = sample.texts[this.currentLang] || sample.texts.en;
      const brief = sample.briefExplanation[this.currentLang] || sample.briefExplanation.en;

      const chip = document.createElement("div");
      chip.className = "sample-chip";
      chip.setAttribute("role", "button");
      chip.setAttribute("tabindex", "0");

      let badgeClass = "badge-risk-high";
      let badgeLabel = "HIGH";
      if (sample.risk === "low") {
        badgeClass = "badge-risk-low";
        badgeLabel = "SAFE";
      } else if (sample.risk === "medium") {
        badgeClass = "badge-risk-medium";
        badgeLabel = "SUSPICIOUS";
      }

      chip.innerHTML = `
        <div class="sample-chip-top">
          <span class="sample-chip-title">${title}</span>
          <span class="sample-chip-badge ${badgeClass}">${badgeLabel}</span>
        </div>
        <span class="sample-chip-desc">${brief}</span>
      `;

      chip.addEventListener("click", () => {
        this.loadSample(text);
      });

      container.appendChild(chip);
    });
  }

  loadSample(sampleText) {
    const textarea = document.getElementById("messageInput");
    if (!textarea) return;
    textarea.value = sampleText;
    this.updateCounters();
    this.playBeep(440, "sine", 0.08);

    // Scroll slightly to input
    textarea.scrollIntoView({ behavior: "smooth", block: "center" });
    textarea.focus();

    // Auto-trigger analysis for seamless demonstration
    setTimeout(() => {
      this.checkMessage();
    }, 250);
  }

  async pasteFromClipboard() {
    const textarea = document.getElementById("messageInput");
    if (!textarea) return;

    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          textarea.value = text;
          this.updateCounters();
          this.playBeep(650, "sine", 0.08);
          this.showToast("Pasted from clipboard!");
          return;
        }
      }
    } catch (err) {
      console.warn("Clipboard read error, fallback focus", err);
    }

    textarea.focus();
    this.showToast("Please press Ctrl+V to paste message");
  }

  clearInput() {
    const textarea = document.getElementById("messageInput");
    const results = document.getElementById("resultsSection");
    if (textarea) textarea.value = "";
    if (results) results.classList.remove("active");
    this.updateCounters();
    this.lastAnalysis = null;
    this.playBeep(300, "triangle", 0.08);
  }

  // Main Scan and Evaluation Workflow
  async checkMessage() {
    const textarea = document.getElementById("messageInput");
    if (!textarea) return;

    const message = textarea.value.trim();
    if (!message) {
      this.showToast(this.currentLang === "te" ? "దయచేసి సందేశాన్ని అతికించండి" : this.currentLang === "hi" ? "कृपया जांचने के लिए कोई संदेश दर्ज करें" : "Please paste a message to analyze");
      textarea.focus();
      return;
    }

    const checkBtn = document.getElementById("checkBtn");
    const scanOverlay = document.getElementById("scanOverlay");
    const scanStep = document.getElementById("scanStepText");
    const scanProgress = document.getElementById("scanProgressFill");
    const dict = I18N[this.currentLang] || I18N.en;

    // Show Scanning State
    if (checkBtn) {
      checkBtn.disabled = true;
      checkBtn.textContent = dict.scanningBtn || "Scanning Threat Vectors...";
    }
    if (scanOverlay) scanOverlay.classList.add("active");

    this.playScanSound();

    // Animate scanning sequence steps for cybersecurity polish
    const steps = [
      { text: dict.scanStep1, pct: "25%" },
      { text: dict.scanStep2, pct: "50%" },
      { text: dict.scanStep3, pct: "75%" },
      { text: dict.scanStep4, pct: "95%" }
    ];

    for (let i = 0; i < steps.length; i++) {
      if (scanStep) scanStep.textContent = steps[i].text;
      if (scanProgress) scanProgress.style.width = steps[i].pct;
      await new Promise(r => setTimeout(r, 160));
    }

    let analysisResult = null;

    // If backend server is available, attempt secure server endpoint
    if (this.isBackendOnline) {
      try {
        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: message, lang: this.currentLang })
        });
        if (response.ok) {
          analysisResult = await response.json();
        }
      } catch (err) {
        console.warn("Backend error, falling back to client-side heuristics", err);
      }
    }

    // Client-side heuristics fallback / primary offline engine
    if (!analysisResult) {
      analysisResult = ScamEngine.analyzeMessage(message, this.currentLang);
    }

    // Hide scanning overlay
    if (scanOverlay) scanOverlay.classList.remove("active");
    if (checkBtn) {
      checkBtn.disabled = false;
      checkBtn.innerHTML = `<span>🛡️</span> ${dict.checkBtn || "Check Message"}`;
    }

    if (analysisResult) {
      this.lastAnalysis = analysisResult;
      this.renderResults(analysisResult);
      this.playSuccessSound(analysisResult.level === "high");

      // Scroll smoothly to results
      const resultsSection = document.getElementById("resultsSection");
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }

  // Render Risk Meter, Gauge, Findings, and Advice
  renderResults(res) {
    const dict = I18N[this.currentLang] || I18N.en;
    const resultsSection = document.getElementById("resultsSection");
    if (!resultsSection) return;

    resultsSection.classList.add("active");

    // 1. Gauge and Score
    const scoreVal = document.getElementById("gaugeScoreValue");
    const riskBadge = document.getElementById("riskClassificationBadge");
    const riskSummary = document.getElementById("riskSummaryText");
    const circle = document.getElementById("gaugeFillCircle");

    if (scoreVal) {
      this.animateCounter(scoreVal, 0, res.score, 700);
    }

    // Semicircle stroke dash offset: 2 * Math.PI * 90 = 565.48
    const circumference = 565.48;
    const offset = circumference - (res.score / 100) * circumference;
    if (circle) {
      circle.style.strokeDashoffset = offset;
      if (res.level === "high") {
        circle.style.stroke = "var(--risk-high)";
      } else if (res.level === "medium") {
        circle.style.stroke = "var(--risk-med)";
      } else {
        circle.style.stroke = "var(--risk-low)";
      }
    }

    // Badge styling
    if (riskBadge) {
      riskBadge.className = `risk-classification-badge risk-level-${res.level}`;
      riskBadge.textContent = dict.riskLevels[res.level] || res.level.toUpperCase();
    }

    if (riskSummary) {
      riskSummary.textContent = dict.riskSummaries[res.level] || "";
    }

    // 2. Contextual Highlighted Text
    const highlightBox = document.getElementById("highlightedContentBox");
    if (highlightBox) {
      highlightBox.innerHTML = res.highlightedHtml || ScamEngine.escapeHtml(res.text);
    }

    // 3. Threat Vector Breakdown Cards
    const vectorsList = document.getElementById("vectorsListContainer");
    if (vectorsList) {
      vectorsList.innerHTML = "";
      if (!res.vectors || res.vectors.length === 0) {
        vectorsList.innerHTML = `
          <div style="color: #34d399; font-size: 0.9rem; padding: 12px; background: rgba(16,185,129,0.1); border-radius: 8px;">
            ✓ ${dict.noThreatsFound || "No significant threat vectors detected."}
          </div>
        `;
      } else {
        res.vectors.forEach(vec => {
          const vecInfo = dict.vectors[vec.id] || {
            title: vec.id,
            desc: "Identified behavioral trigger flag."
          };
          const sevClass = vec.severity === "critical" ? "sev-critical" : "sev-warning";
          const sevLabel = dict.vectorSeverity[vec.severity] || vec.severity.toUpperCase();

          const card = document.createElement("div");
          card.className = `vector-card severity-${vec.severity}`;
          card.innerHTML = `
            <div class="vector-header">
              <span class="vector-title">⚠️ ${vecInfo.title}</span>
              <span class="vector-severity-badge ${sevClass}">${sevLabel}</span>
            </div>
            <p class="vector-desc">${vecInfo.desc}</p>
            ${vec.evidence && vec.evidence.length > 0 ? `
              <div class="vector-evidence">
                Detected: ${vec.evidence.map(e => ScamEngine.escapeHtml(e)).join(" • ")}
              </div>
            ` : ""}
          `;
          vectorsList.appendChild(card);
        });
      }
    }

    // 4. Action Plan Lists
    const dosListElem = document.getElementById("dosList");
    const dontsListElem = document.getElementById("dontsList");

    if (dosListElem && dict.dosList) {
      dosListElem.innerHTML = dict.dosList.map(item => `<li>${item}</li>`).join("");
    }
    if (dontsListElem && dict.dontsList) {
      dontsListElem.innerHTML = dict.dontsList.map(item => `<li>${item}</li>`).join("");
    }
  }

  // Smooth counter animation
  animateCounter(element, start, end, duration) {
    const range = end - start;
    let current = start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / (range || 1)));
    const timer = setInterval(() => {
      current += increment;
      element.textContent = current;
      if (current === end) {
        clearInterval(timer);
      }
    }, Math.max(stepTime, 10));
  }

  // Copy structured threat advisory report
  copyReport() {
    if (!this.lastAnalysis) return;
    const res = this.lastAnalysis;
    const dict = I18N[this.currentLang] || I18N.en;

    const report = [
      `🛡️ [ScamShield AI - Security Advisory Report]`,
      `Date: ${new Date().toLocaleString()}`,
      `Risk Level: ${dict.riskLevels[res.level].toUpperCase()} (${res.score}/100)`,
      `Status: ${dict.riskBadges[res.level]}`,
      `----------------------------------------`,
      `Analyzed Snippet:`,
      `"${res.text.slice(0, 200)}${res.text.length > 200 ? '...' : ''}"`,
      `----------------------------------------`,
      `Detected Threat Flags:`,
      res.vectors && res.vectors.length > 0
        ? res.vectors.map(v => `- ${(dict.vectors[v.id] || {}).title || v.id} (${v.severity})`).join("\n")
        : `None detected.`,
      `----------------------------------------`,
      `Emergency Advice:`,
      `1. Never click unknown links or call unverified phone numbers.`,
      `2. Never reveal OTPs, passwords, or bank PINs to anyone.`,
      `3. Report cyber threats: Dial 1930 or visit cybercrime.gov.in`,
      `----------------------------------------`,
      `⚠️ Disclaimer: Automated probabilistic evaluation. Always verify directly with official institutions.`
    ].join("\n");

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(report).then(() => {
        this.showToast(dict.copiedFeedback || "Report copied to clipboard!");
        this.playBeep(880, "sine", 0.1);
      });
    } else {
      const ta = document.createElement("textarea");
      ta.value = report;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      this.showToast(dict.copiedFeedback || "Report copied to clipboard!");
    }
  }

  shareAlert() {
    if (!this.lastAnalysis) return;
    const shareText = `⚠️ ScamShield AI Warning: Check out this suspicious message analyzer to stay safe from digital fraud! Dial 1930 for cyber helpline.`;
    if (navigator.share) {
      navigator.share({
        title: "ScamShield AI Advisory",
        text: shareText,
        url: window.location.href
      }).catch(() => {});
    } else {
      this.copyReport();
    }
  }

  // Interactive Quiz Controller
  renderQuiz() {
    const question = QUIZ_DATA[this.quizIndex];
    if (!question) return;

    const progress = document.getElementById("quizProgressText");
    const scenario = document.getElementById("quizScenarioText");
    const optionsContainer = document.getElementById("quizOptionsContainer");
    const feedbackBox = document.getElementById("quizFeedbackBox");
    const nextBtn = document.getElementById("quizNextBtn");

    if (progress) {
      progress.textContent = `Challenge Scenario ${this.quizIndex + 1} of ${QUIZ_DATA.length}`;
    }

    if (scenario) {
      scenario.textContent = question.scenario[this.currentLang] || question.scenario.en;
    }

    if (feedbackBox) {
      feedbackBox.className = "quiz-feedback-box";
      feedbackBox.innerHTML = "";
    }

    if (nextBtn) {
      nextBtn.style.display = "none";
      nextBtn.onclick = () => this.nextQuizQuestion();
    }

    if (optionsContainer) {
      optionsContainer.innerHTML = "";
      const opts = question.options[this.currentLang] || question.options.en;
      opts.forEach((optText, idx) => {
        const btn = document.createElement("button");
        btn.className = "quiz-opt-btn";
        btn.textContent = optText;
        btn.onclick = () => this.selectQuizOption(idx, question.correctIndex, question);
        optionsContainer.appendChild(btn);
      });
    }
  }

  selectQuizOption(selectedIndex, correctIndex, question) {
    const options = document.querySelectorAll(".quiz-opt-btn");
    const feedbackBox = document.getElementById("quizFeedbackBox");
    const nextBtn = document.getElementById("quizNextBtn");
    const dict = I18N[this.currentLang] || I18N.en;

    options.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === correctIndex) {
        btn.classList.add("correct");
      } else if (idx === selectedIndex) {
        btn.classList.add("incorrect");
      }
    });

    const isCorrect = selectedIndex === correctIndex;
    if (isCorrect) {
      this.quizScore++;
      this.playBeep(800, "sine", 0.12);
    } else {
      this.playBeep(260, "sawtooth", 0.18);
    }

    if (feedbackBox) {
      feedbackBox.classList.add("active");
      const explanation = question.explanation[this.currentLang] || question.explanation.en;
      feedbackBox.innerHTML = `
        <div style="font-weight: 700; color: ${isCorrect ? '#34d399' : '#ff6b6b'}; margin-bottom: 6px;">
          ${isCorrect ? "✓ Well Done!" : "✕ Common Trap Detected"}
        </div>
        <p>${explanation}</p>
      `;
    }

    if (nextBtn) {
      nextBtn.style.display = "inline-flex";
      nextBtn.textContent = this.quizIndex < QUIZ_DATA.length - 1 
        ? (dict.quizNextBtn || "Next Scenario")
        : (dict.quizRestartBtn || "Restart Challenge");
    }
  }

  nextQuizQuestion() {
    this.quizIndex++;
    if (this.quizIndex >= QUIZ_DATA.length) {
      this.quizIndex = 0;
      this.quizScore = 0;
    }
    this.renderQuiz();
  }

  // Toast feedback message
  showToast(message) {
    const toast = document.getElementById("toastMsg");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 2800);
  }
}

// Initialize on DOM load
window.addEventListener("DOMContentLoaded", () => {
  window.app = new ScamShieldApp();
});
