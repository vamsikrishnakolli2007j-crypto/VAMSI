# 🛡️ ScamShield AI – Everyday Scam Message Checker

> **Protecting Everyday Citizens from Digital Fraud, Phishing & Social Engineering**  
> *Built for College Hackathon Presentation & Community Cyber Safety*

---

## 🌟 Executive Summary

In today's digital era, millions of everyday mobile users across India and globally receive deceptive SMS, WhatsApp messages, and fake emails daily. These range from **fake electricity disconnection threats** and **SBI/HDFC KYC account freeze alerts** to **YouTube task fraud** and **digital arrest intimidations**.

**ScamShield AI** is an intelligent, privacy-first, responsive cybersecurity web application engineered to instantly analyze suspicious messages. It evaluates behavioral red flags, detects deceptive technical indicators, explains threat vectors in plain language, and provides actionable safety steps.

---

## 🚀 Key Features

1. **Cybersecurity Command Center Interface**:
   - Sleek cyber-defense dark theme with neon cyan, amber, and hazard-red threat accents.
   - Animated laser scanning beam, radar sweep, and live security engine status.
   - Built-in cyber audio telemetry synthesized using the browser's native Web Audio API (zero audio file dependencies).

2. **Multi-Vector Threat Evaluation Engine**:
   - **Deceptive Links & Phishing Domains**: Flags IP hostnames, URL shorteners (`bit.ly`, `tinyurl`), high-risk TLDs (`.xyz`, `.top`, `.buzz`, `.club`, etc.), and brand typosquatting (e.g. `sbi-kyc-update.xyz`).
   - **Artificial Urgency & Coercion**: Detects panic deadlines (*"account blocked today within 24 hours"*, *"electricity cut tonight at 9:30 PM"*, *"digital arrest"*).
   - **Credential & OTP Traps**: Distinguishes between legitimate 2FA alerts (*"NEVER share this OTP"*) and phishing traps (*"Share OTP with officer to unblock"*).
   - **Advance-Fee & Financial Demands**: Identifies unverified UPI VPAs, registration fees, processing charges, and crypto demands.
   - **Job & Task Fraud**: Detects exorbitant daily wage promises for liking videos and migration to Telegram secret groups.
   - **Lottery & Windfall Scams**: Flags unsolicited KBC, lucky draw, and jackpot prizes.
   - **Channel Switching / Impersonation**: Flags personal 10-digit mobile numbers given for official public utilities or bank notifications.

3. **Scam Risk Index & Visual Gauge**:
   - Dynamic 0–100 Risk Score with an animated SVG radial gauge.
   - Three clear tiers:
     - 🟢 **Low Risk (0–34%)**: Routine communication, standard notifications, authentic 2FA codes.
     - 🟡 **Medium Risk (35–69%)**: Caution advised, unverified links, unsolicited offers.
     - 🔴 **High Risk (70–100%)**: Critical threat detected, classic social engineering markers.

4. **Contextual In-Text Highlighter**:
   - Renders the analyzed message with interactive color-coded `<mark>` tags over the exact flagged phrases, links, and contact triggers with hover tooltips explaining why each trigger was flagged.

5. **Plain-Language Explanations & Action Plan**:
   - Simple, jargon-free explanations of the scammer's psychological strategy.
   - Practical safety checklists: **"What to do right now"** (Dos) and **"What NOT to do"** (Don'ts).

6. **Full Multilingual Support**:
   - **English** (Default)
   - **తెలుగు (Telugu)**: Full UI, warnings, safety advice, and realistic test samples.
   - **हिन्दी (Hindi)**: Full UI, warnings, safety advice, and realistic test samples.

7. **One-Click Realistic Demonstration Samples**:
   - Pre-loaded with 8 real-world test cases covering Bank KYC, Electricity Power Cut, YouTube Task Fraud, KBC Lottery, Courier Address smishing, and Authentic Bank/OTP alerts.

8. **Spot the Scam Mini-Quiz (Interactive Hackathon Feature)**:
   - 3-scenario challenge to engage hackathon judges and demonstrate everyday cyber awareness concepts.

9. **Emergency Cyber Helplines Directory**:
   - Direct contacts for **National Cyber Crime Helpline (1930 / cybercrime.gov.in)**, **Chakshu (Sanchar Saathi)**, and **RBI Kehta Hai / Sachet**.

10. **Dual-Mode Architecture (Offline Client + Secure Backend)**:
    - **Client-Side Engine**: Fully functional offline heuristic analysis in `js/heuristics.js`.
    - **Compiled C# Server (`ScamShieldServer.exe`)**: High-performance HTTP backend on port 5000 providing `/api/analyze` and static file hosting.
    - **Zero Frontend Credential Exposure**: Any external AI API keys (`GEMINI_API_KEY`) reside strictly in the backend environment.

---

## 🛠️ Project Structure

```
scamshield-ai/
│
├── index.html                 # Main responsive Single-Page Web Application
│
├── css/
│   └── styles.css             # Cyber defense theme, glassmorphism, responsive grid
│
├── js/
│   ├── i18n.js                # Full multilingual dictionaries (English, Telugu, Hindi)
│   ├── samples.js             # 8 Curated realistic scam & legitimate demonstration cases
│   ├── heuristics.js          # Client-side heuristic NLP analysis & scoring engine
│   ├── quiz.js                # Interactive "Spot the Scam" challenge scenarios
│   └── app.js                 # Application controller, audio synthesis, backend bridge
│
├── server/
│   ├── ScamShieldServer.cs    # Standalone high-performance C# HTTP web server
│   ├── ScamShieldServer.exe   # Compiled native Windows server binary
│   └── server.ps1             # PowerShell HTTP listener server alternative
│
├── start-server.bat           # One-click launcher: starts server & opens default browser
├── start-local.bat            # One-click launcher: opens index.html directly in browser
└── README.md                  # Comprehensive Hackathon Documentation
```

---

## ⚡ How to Run

### Method 1: One-Click Full Server Mode (Recommended)
1. Double-click `start-server.bat` in the project folder.
2. The script compiles (if needed) and launches `server\ScamShieldServer.exe`.
3. Your default browser will automatically open:
   ```
   http://localhost:5000/
   ```

### Method 2: Standalone Local Browser Mode (Zero Server Needed)
1. Double-click `start-local.bat` or simply double-click `index.html`.
2. The entire application runs directly in your browser using the client-side heuristic engine.

### Method 3: PowerShell Server
Open PowerShell in the project directory and run:
```powershell
.\server\server.ps1 -Port 5000
```

---

## 🧠 Threat Scoring & Evaluation Methodology

ScamShield AI uses a **probabilistic heuristic scoring model** rather than crude keyword matching:

$$\text{Risk Score} = \min\left(100, \sum \text{Threat Vectors} - \text{Mitigation Factors}\right)$$

| Threat Vector | Max Weight | Key Evaluated Markers |
| :--- | :---: | :--- |
| **Link Deception** | 45 pts | IP hosts, `.xyz`/`.top`/`.buzz`, `bit.ly`, brand typosquatting (`sbi-kyc`, `hdfc-update`) |
| **Credential Trap** | 40 pts | Demands to reveal 6-digit OTP, PIN, password, PAN card on third-party links |
| **Task / Job Fraud** | 40 pts | Unrealistic daily pay for liking videos, Telegram HR links (`t.me/...`) |
| **Lottery Windfall** | 40 pts | Unsolicited lottery, KBC lucky draw, advance-fee releases |
| **Channel Switching** | 35 pts | Personal mobile / WhatsApp numbers used for public utilities or bank notifications |
| **Urgency Pressure** | 35 pts | Imminent deadlines (*"today within 24 hours"*, *"tonight 9:30 PM"*), service cutoffs |
| **Mitigations** | -40 pts | Legitimate 2FA warning (*"NEVER share OTP"*), masked card numbers (`xx4921`), official 1800 numbers |

### Classification Tiers:
- **0–34**: `Low Risk` (Safe / Routine communication)
- **35–69**: `Medium Risk` (Suspicious / Caution required)
- **70–100**: `High Risk` (Critical Scam / Social Engineering)

---

## 🔒 Privacy & Safety Guarantee

- **No Credential Ingestion**: The system explicitly advises users never to input active passwords or sensitive OTPs.
- **Local Sanitization**: Telemetry data is parsed strictly in memory; no user messages are logged to remote databases.
- **API Key Isolation**: Any backend AI integration (Gemini) reads keys from server environment variables (`GEMINI_API_KEY`) and never exposes tokens in HTML or JavaScript.

---

## 🏆 College Hackathon Presentation Guide

### 3-Minute Live Demo Flow:
1. **Introduction (30s)**: Introduce ScamShield AI, highlighting how 70%+ of cyber fraud in India begins with simple SMS/WhatsApp deception (KYC suspension, electricity cutoffs).
2. **High-Risk Demonstration (45s)**: Click the **"Banking / KYC Suspension"** demo pill. Show the scanning radar animation, the 80/100 High Risk gauge, the flagged `.xyz` domain highlight, and the step-by-step action plan.
3. **Multilingual Switch (30s)**: Toggle to **తెలుగు (Telugu)** or **हिन्दी (Hindi)**. Click the **"Electricity Power Cut"** demo sample to showcase localized scam detection in regional languages.
4. **Legitimate Message Differentiation (30s)**: Click the **"Genuine Bank Alert"** or **"Genuine OTP"** sample to show how legitimate notifications (with *"Never share OTP"* warnings) are correctly classified as **Low Risk**, proving the tool avoids crude keyword-only false positives.
5. **Spot the Scam Quiz (45s)**: Invite a judge to answer one scenario from the interactive quiz.

---

## ⚖️ Disclaimer
*ScamShield AI provides probabilistic risk estimates based on heuristic indicators and behavioral patterns. Results do not constitute definitive legal or technical certification. Users must always verify unrequested messages directly through official banking applications or customer care hotlines.*
