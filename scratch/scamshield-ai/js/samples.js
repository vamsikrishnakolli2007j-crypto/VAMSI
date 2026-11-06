// ScamShield AI - Curated Real-World Demonstration Samples
// Features realistic samples categorized by vector in English, Telugu, and Hindi

const SAMPLE_MESSAGES = [
  {
    id: "sbi-kyc-scam",
    category: "bank",
    badge: "Banking / KYC Suspension",
    risk: "high",
    titles: {
      en: "SBI YONO Account Block Threat",
      te: "SBI ఖాతా బ్లాక్ హెచ్చరిక",
      hi: "SBI खाता ब्लॉक चेतावनी"
    },
    texts: {
      en: "Dear SBI customer, your YONO account will be blocked today within 24 hours. Your PAN card is not updated. Please click immediately on http://sbi-kyc-update.xyz to verify your PAN and avoid account freeze.",
      te: "డియర్ కస్టమర్, మీ SBI YONO ఖాతా ఈరోజే 24 గంటల్లో బ్లాక్ చేయబడుతుంది. మీ పాన్ కార్డు అప్‌డేట్ కాలేదు. ఖాతా రద్దు కాకుండా ఉండటానికి వెంటనే http://sbi-kyc-update.xyz లింక్ క్లిక్ చేసి పాన్ వెరిఫై చేయండి.",
      hi: "प्रिय ग्राहक, आपका SBI YONO खाता आज 24 घंटे के भीतर ब्लॉक कर दिया जाएगा। आपका पैन कार्ड अपडेट नहीं है। खाता निलंबन से बचने के लिए तुरंत http://sbi-kyc-update.xyz पर क्लिक करके पैन सत्यापित करें।"
    },
    briefExplanation: {
      en: "Classic bank phishing: Uses high panic ('blocked today') and a fake .xyz domain to steal banking credentials.",
      te: "నకిలీ బ్యాంకు లింక్: భయపెట్టి (.xyz డొమైన్) మీ బ్యాంకింగ్ పాస్‌వర్డ్‌లను దొంగిలించే ప్రయత్నం.",
      hi: "बैंक फ़िशिंग: डर दिखाकर (.xyz डोमेन) आपकी बैंकिंग जानकारी चुराने का प्रयास।"
    }
  },
  {
    id: "electricity-cut-scam",
    category: "utility",
    badge: "Electricity Power Cut",
    risk: "high",
    titles: {
      en: "Electricity Bill Disconnection Scam",
      te: "విద్యుత్ సరఫరా నిలిపివేత బెదిరింపు",
      hi: "बिजली कनेक्शन काटने की धमकी"
    },
    texts: {
      en: "Dear consumer, your electricity power will be disconnected tonight at 9:30 PM from the electric office because your previous month bill was not updated. Please immediately contact our power officer Mr. Sharma on 9876543210. Thank you.",
      te: "డియర్ కస్టమర్, మీ గత నెల విద్యుత్ బిల్లు అప్‌డేట్ చేయనందున ఈ రాత్రి 9:30 గంటలకు విద్యుత్ సరఫరా నిలిపివేయబడుతుంది. వెంటనే మా విద్యుత్ అధికారి శర్మ గారిని 9876543210 నంబర్‌లో సంప్రదించండి. ధన్యవాదాలు.",
      hi: "प्रिय उपभोक्ता, आपके पिछले महीने का बिजली बिल अपडेट न होने के कारण आज रात 9:30 बजे बिजली काट दी जाएगी। कृपया तुरंत हमारे बिजली अधिकारी श्री शर्मा से 9876543210 पर संपर्क करें। धन्यवाद।"
    },
    briefExplanation: {
      en: "Electricity panic fraud: Scammers provide personal mobile numbers and ask to install remote-screen sharing apps (AnyDesk) to 'clear bills'.",
      te: "కరెంట్ కట్ మోసం: వ్యక్తిగత మొబైల్ నంబర్ ఇచ్చి బిల్లు క్లియర్ చేసే పేరుతో మోసం చేస్తారు.",
      hi: "बिजली फ्रॉड: व्यक्तिगत मोबाइल नंबर देकर बिल क्लीयरेंस के नाम पर ठगी की जाती है।"
    }
  },
  {
    id: "part-time-job-scam",
    category: "job",
    badge: "Task & Job Fraud",
    risk: "high",
    titles: {
      en: "YouTube / Amazon Like Task Scam",
      te: "యూట్యూబ్ లైక్ కొడితే డబ్బుల మోసం",
      hi: "यूट्यूब वीडियो लाइक पार्ट-टाइम जॉब"
    },
    texts: {
      en: "Congratulations! Amazon India is hiring part-time remote employees. Earn Rs 3,500 to Rs 8,000 daily by simply rating products and liking YouTube videos. Zero experience needed. Contact HR Manager Priya on WhatsApp +91-9123456789 or click https://t.me/parttime_amazon_hr to claim your Rs 500 joining bonus now!",
      te: "అభినందనలు! అమెజాన్ ఇండియా పార్ట్ టైమ్ ఉద్యోగులను తీసుకుంటోంది. కేవలం వీడియోలకు లైక్ కొట్టి రోజుకు రూ. 3500 నుండి రూ. 8000 సంపాదించండి. ఎటువంటి అనుభవం అవసరం లేదు. వెంటనే వాట్సాప్ +91-9123456789 లేదా https://t.me/parttime_amazon_hr లో సంప్రదించి రూ. 500 బోనస్ పొందండి!",
      hi: "बधाई हो! अमेज़न इंडिया में पार्ट-टाइम कर्मचारियों की भर्ती हो रही है। केवल वीडियो लाइक करके रोज ₹3500 से ₹8000 कमाएं। किसी अनुभव की आवश्यकता नहीं। तुरंत व्हाट्सएप +91-9123456789 या https://t.me/parttime_amazon_hr पर संपर्क करें और ₹500 जॉइनिंग बोनस पाएं!"
    },
    briefExplanation: {
      en: "Prepaid task fraud: Starts with small payouts, then coerces victims to deposit lakhs of rupees into 'crypto prepaid tasks' which are never returned.",
      te: "టాస్క్ మోసం: మొదట కొద్దిగా డబ్బులు ఇచ్చి, తర్వాత లక్షల రూపాయలు డిపాజిట్ చేయించి మోసం చేస్తారు.",
      hi: "टास्क फ्रॉड: शुरुआत में कुछ पैसे देकर बाद में 'प्रीपेड टास्क' के नाम पर लाखों रुपये ठग लेते हैं।"
    }
  },
  {
    id: "kbc-lottery-scam",
    category: "lottery",
    badge: "Lottery & Windfall",
    risk: "high",
    titles: {
      en: "KBC Lucky Draw ₹25 Lakhs Prize",
      te: "KBC లాటరీ రూ. 25 లక్షల బహుమతి",
      hi: "केबीसी 25 लाख लॉटरी विजेता"
    },
    texts: {
      en: "Dear winner, your mobile number has won 25,00,000 INR in KBC (Kaun Banega Crorepati) lucky draw 2026. File No. KBC-9921. To claim your prize money in your bank account, send a WhatsApp message to Lottery Manager Rana Pratap on 9812345678 with your Aadhaar and bank details immediately.",
      te: "డియర్ లక్కీ విజేత, మీ మొబైల్ నంబర్‌కు KBC 2026 లక్కీ డ్రాలో రూ. 25,00,000 నగదు బహుమతి వచ్చింది. ఫైల్ నెం: KBC-9921. మీ బ్యాంకు ఖాతాకు డబ్బు పొందడానికి వెంటనే మీ ఆధార్ మరియు బ్యాంక్ వివరాలను మేనేజర్ రాణా ప్రతాప్ కు 9812345678 నంబర్‌లో వాట్సాప్ చేయండి.",
      hi: "प्रिय विजेता, आपके मोबाइल नंबर ने केबीसी लकी ड्रा 2026 में ₹25,00,000 की लॉटरी जीती है। फाइल संख्या KBC-9921। अपने बैंक खाते में ईनामी राशि प्राप्त करने के लिए तुरंत लॉटरी प्रबंधक को 9812345678 पर व्हाट्सएप करें और अपने आधार व बैंक विवरण भेजें।"
    },
    briefExplanation: {
      en: "Advance-fee lottery scam: Asks for processing fee / GST taxes to 'release' a prize that never existed.",
      te: "లాటరీ మోసం: లేని బహుమతి కోసం జీఎస్టీ, ప్రాసెసింగ్ ఫీజు పేరుతో డబ్బులు డిమాండ్ చేస్తారు.",
      hi: "लॉटरी फ्रॉड: नकद पुरस्कार देने के नाम पर टैक्स या प्रोसेसिंग फीस मांगते हैं।"
    }
  },
  {
    id: "india-post-courier-scam",
    category: "delivery",
    badge: "Courier Address Spoof",
    risk: "high",
    titles: {
      en: "India Post Incomplete Address Notice",
      te: "ఇండియా పోస్ట్ పార్శిల్ అడ్రస్ లోపం",
      hi: "इंडिया पोस्ट पार्सल पता अधूरा"
    },
    texts: {
      en: "India Post Alert: Your parcel package #IN-984210 cannot be delivered because the recipient address is missing apartment/street number. Please update your address within 12 hours or parcel will be returned to sender: http://indiapost-parcel-reschedule.top/update",
      te: "ఇండియా పోస్ట్ అలర్ట్: మీ పార్శిల్ #IN-984210 చిరునామాలో అపార్ట్‌మెంట్ నంబర్ లేకపోవడం వల్ల డెలివరీ చేయలేకపోయాము. 12 గంటల్లో చిరునామా సరిచేయండి లేదా పార్శిల్ తిరిగి పంపబడుతుంది: http://indiapost-parcel-reschedule.top/update",
      hi: "इंडिया पोस्ट अलर्ट: आपके पार्सल #IN-984210 की डिलीवरी नहीं हो सकी क्योंकि गली/मकान नंबर गायब है। कृपया 12 घंटे के भीतर अपना पता अपडेट करें अन्यथा पार्सल वापस भेज दिया जाएगा: http://indiapost-parcel-reschedule.top/update"
    },
    briefExplanation: {
      en: "Postal smishing: Links to a cloned website asking for a small re-delivery fee of ₹5 to ₹25, capturing your full card and OTP.",
      te: "పోస్టల్ మోసం: కేవలం ₹5 లేదా ₹10 రీ-డెలివరీ ఛార్జీల పేరుతో మీ మొత్తం క్రెడిట్/డెబిట్ కార్డు వివరాలను కాజేస్తారు.",
      hi: "पोस्टल फ्रॉड: सिर्फ ₹5 या ₹10 के बहाने आपकी पूरी कार्ड डिटेल और ओटीपी चोरी कर लेते हैं।"
    }
  },
  {
    id: "crypto-investment-scam",
    category: "job",
    badge: "Crypto / Trading Guarantee",
    risk: "medium",
    titles: {
      en: "Guaranteed 300% Crypto Profit Bot",
      te: "క్రిప్టో అధిక లాభాల హామీ ప్రకటన",
      hi: "300% गारंटीड क्रिप्टो ट्रेडिंग"
    },
    texts: {
      en: "VIP Crypto Signals: Earn guaranteed 300% returns in 48 hours using our automated AI arbitrage bot. Zero market risk. Deposit minimum 2,000 USDT to activate the algorithm. Join our private signal group: https://bit.ly/crypto-wealth-ai26",
      te: "VIP క్రిప్టో సిగ్నల్స్: మా ఆటోమేటెడ్ AI బాట్ ద్వారా 48 గంటల్లో 300% ఖచ్చితమైన లాభాలు పొందండి. ఎటువంటి రిస్క్ ఉండదు. అల్గారిథమ్ ఆన్ చేయడానికి కనీసం 2000 USDT డిపాజిట్ చేయండి: https://bit.ly/crypto-wealth-ai26",
      hi: "वीआईपी क्रिप्टो सिग्नल्स: हमारे एआई बॉट के जरिए 48 घंटे में 300% पक्का मुनाफा कमाएं। कोई जोखिम नहीं। बॉट शुरू करने के लिए कम से कम 2000 यूएसडीटी जमा करें। हमारा ग्रुप जॉइन करें: https://bit.ly/crypto-wealth-ai26"
    },
    briefExplanation: {
      en: "High-yield investment fraud: Masked short link (bit.ly) promising impossible 'guaranteed' returns.",
      te: "అధిక లాభాల మోసం: అసాధ్యమైన లాభాల హామీతో బిట్‌లీ షార్ట్ లింక్ ఉపయోగించి డిపాజిట్లు కాజేస్తారు.",
      hi: "पोंजी फ्रॉड: असंभव मुनाफे का झांसा देकर शार्ट लिंक के जरिए पैसे ऐंठते हैं।"
    }
  },
  {
    id: "legit-bank-tx",
    category: "safe",
    badge: "Legitimate Bank Alert",
    risk: "low",
    titles: {
      en: "Genuine HDFC Bank Debit Card Alert",
      te: "నిజమైన బ్యాంక్ లావాదేవీ మెసేజ్",
      hi: "असली बैंक डेबिट कार्ड अलर्ट"
    },
    texts: {
      en: "HDFC Bank Alert: Rs 1,840.00 spent on your Debit Card ending xx4921 at RELIANCE RETAIL on 06-Nov-2026 11:42:10. Available balance: Rs 48,210.40. If this was not done by you, immediately SMS BLOCK to 5676712 or call 18002583838.",
      te: "HDFC బ్యాంక్ అలర్ట్: మీ డెబిట్ కార్డ్ xx4921 నుండి రిలయన్స్ రిటైల్ వద్ద రూ. 1,840.00 ఖర్చు చేయబడింది. ఖాతా బ్యాలెన్స్: రూ. 48,210.40. ఇది మీరు చేయకపోతే వెంటనే 18002583838 కి కాల్ చేయండి.",
      hi: "एचडीएफसी बैंक अलर्ट: आपके डेबिट कार्ड xx4921 से रिलायंस रिटेल पर ₹1,840.00 का भुगतान हुआ। शेष राशि: ₹48,210.40। यदि यह आपके द्वारा नहीं किया गया है, तो तुरंत 18002583838 पर कॉल करें।"
    },
    briefExplanation: {
      en: "Legitimate bank notification: Official toll-free number, specific masked card reference, and NO suspicious web links or OTP requests.",
      te: "నిజమైన సందేశం: అధికారిక టోల్ ఫ్రీ నంబర్ మాత్రమే ఉంది. ఎలాంటి అనుమానాస్పద వెబ్‌సైట్ లింకులు లేవు.",
      hi: "प्रामाणिक बैंक संदेश: आधिकारिक टोल-फ्री नंबर है, कोई संदिग्ध वेबसाइट लिंक या ओटीपी की मांग नहीं है।"
    }
  },
  {
    id: "legit-otp-warning",
    category: "safe",
    badge: "Legitimate 2FA OTP Code",
    risk: "low",
    titles: {
      en: "Genuine OTP with Security Warning",
      te: "నిజమైన OTP భద్రతా హెచ్చరిక",
      hi: "असली ओटीपी सुरक्षा चेतावनी"
    },
    texts: {
      en: "739201 is your one-time verification password (OTP) for online login to your IRCTC ticket portal. Valid for 10 minutes. For your security, NEVER share this OTP with anyone, including customer service or bank officials.",
      te: "మీ IRCTC లాగిన్ కొరకు వన్-టైమ్ పాస్‌వర్డ్ (OTP) 739201. ఇది 10 నిమిషాలు మాత్రమే చెల్లుతుంది. మీ భద్రత కొరకు ఈ OTP ని ఎవరితోనూ (కస్టమర్ కేర్ వారితో సహా) పంచుకోవద్దు.",
      hi: "आईआरसीटीसी लॉगिन के लिए आपका ओटीपी 739201 है। यह 10 मिनट के लिए वैध है। अपनी सुरक्षा के लिए यह ओटीपी किसी के साथ साझा न करें, बैंक अधिकारी भी कभी ओटीपी नहीं मांगते।"
    },
    briefExplanation: {
      en: "Legitimate 2FA: Explicitly instructs the user NOT to share the code. Does not contain traps.",
      te: "నిజమైన OTP: కోడ్‌ను ఎవరికీ చెప్పవద్దని స్పష్టంగా హెచ్చరిస్తుంది.",
      hi: "प्रामाणिक ओटीपी: इसमें कोड किसी के साथ साझा न करने की स्पष्ट चेतावनी दी गई है।"
    }
  }
];
