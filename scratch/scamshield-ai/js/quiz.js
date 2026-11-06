// ScamShield AI - Interactive "Spot the Scam" Hackathon Challenge
// Dynamic educational quiz with multilingual support

const QUIZ_DATA = [
  {
    id: "q1",
    scenario: {
      en: "You get an SMS: 'Dear consumer, your electricity power will be disconnected tonight at 9:30 PM due to unpaid bill. Immediately call power officer on 9876543210.' What should you do?",
      te: "మీకొక SMS వచ్చింది: 'డియర్ కస్టమర్, బిల్లు చెల్లించనందున ఈ రాత్రి 9:30 కు కరెంట్ కట్ చేయబడుతుంది. వెంటనే ఆఫీసర్ 9876543210 కు కాల్ చేయండి.' మీరు ఏమి చేయాలి?",
      hi: "आपको एक SMS मिला: 'बिल जमा न होने के कारण आज रात 9:30 बजे बिजली काट दी जाएगी। तुरंत अधिकारी के नंबर 9876543210 पर कॉल करें।' आप क्या करेंगे?"
    },
    options: {
      en: [
        "Call the number quickly and follow his instructions to pay ₹10 to avoid power cut.",
        "Ignore the SMS number. Open the official electricity board app/website or call their official customer care to check your actual bill.",
        "Forward this message to your neighbors to warn them about the power outage.",
        "Install AnyDesk so the officer can check your meter remotely."
      ],
      te: [
        "కరెంట్ కట్ కాకుండా ఉండటానికి వెంటనే ఆ నంబర్‌కు కాల్ చేసి ₹10 చెల్లించాలి.",
        "ఆ నంబర్‌ను నమ్మవద్దు. అధికారిక విద్యుత్ బోర్డు యాప్ లేదా అధికారిక కస్టమర్ కేర్‌ను సంప్రదించి నిజమైన బిల్లు తనిఖీ చేయాలి.",
        "కరెంట్ పోతుందని ఇరుగుపొరుగు వారికి ఈ మెసేజ్ ఫార్వార్డ్ చేయాలి.",
        "ఆఫీసర్ మీటర్‌ను తనిఖీ చేయడానికి AnyDesk యాప్‌ను ఇన్‌స్టాల్ చేయాలి."
      ],
      hi: [
        "बिजली कटने से बचने के लिए तुरंत नंबर पर कॉल करें और ₹10 जमा करें।",
        "दिए गए नंबर पर कॉल न करें। आधिकारिक बिजली बोर्ड ऐप या आधिकारिक कस्टमर केयर से अपने असली बिल की जांच करें।",
        "बिजली कटौती की चेतावनी देने के लिए यह संदेश पड़ोसियों को भेजें।",
        "अधिकारी द्वारा मीटर चेक करने के लिए AnyDesk ऐप इंस्टॉल करें।"
      ]
    },
    correctIndex: 1,
    explanation: {
      en: "Correct! Electricity boards never send SMS from personal 10-digit mobile numbers with immediate 9:30 PM deadlines. Scammers use this panic to get you to download screen-sharing apps or pay on fake links.",
      te: "సరైన సమాధానం! విద్యుత్ శాఖ ఎప్పుడూ వ్యక్తిగత 10 అంకెల మొబైల్ నంబర్ల నుండి రాత్రి 9:30 కు కరెంట్ కట్ చేస్తామని మెసేజ్ పంపదు. ఇది మోసం.",
      hi: "बिल्कुल सही! बिजली विभाग कभी भी व्यक्तिगत मोबाइल नंबर से रात 9:30 बजे बिजली काटने की धमकी नहीं देता। यह एक आम साइबर फ्रॉड है।"
    }
  },
  {
    id: "q2",
    scenario: {
      en: "A WhatsApp contact named 'HR Priya - Amazon' messages offering ₹4,000/day for liking 10 YouTube videos from home. She sends ₹150 for the first test task, then asks for a ₹2,000 'VIP Task Deposit'. Is this legitimate?",
      te: "వాట్సాప్‌లో 'HR ప్రియా - అమెజాన్' అనే కాంటాక్ట్ నుండి మెసేజ్ వచ్చింది: రోజుకు 10 యూట్యూబ్ వీడియోలకు లైక్ కొడితే ₹4,000 ఇస్తామని, మొదటి టాస్క్ కు ₹150 పంపి, ఆ తర్వాత ₹2,000 'VIP డిపాజిట్' అడిగారు. ఇది నిజమైనదేనా?",
      hi: "व्हाट्सएप पर 'HR प्रिया - अमेज़न' का संदेश आया: 10 यूट्यूब वीडियो लाइक करने पर रोज ₹4000 मिलेंगे। पहले टेस्ट पर ₹150 दिए, फिर ₹2000 'वीआईपी टास्क डिपॉजिट' मांगा। क्या यह सही है?"
    },
    options: {
      en: [
        "Yes, because she already sent ₹150 to my UPI account, proving it is genuine.",
        "No! This is a classic 'Task Fraud'. Scammers give small initial payouts as bait to trap you into depositing large sums that you can never withdraw.",
        "Yes, but you should only deposit ₹1,000 instead of ₹2,000.",
        "It is safe if you ask for her employee ID card copy first."
      ],
      te: [
        "అవును, ఆమె నా యూపీఐకి ₹150 పంపింది కాబట్టి ఇది నిజమైనదే.",
        "కాదు! ఇది ప్రసిద్ధ 'టాస్క్ మోసం'. నమ్మకం కలిగించడానికి మొదట కొద్దిగా డబ్బులు ఇచ్చి, తర్వాత వేలాది రూపాయలు డిపాజిట్ చేయించి మోసం చేస్తారు.",
        "అవును, కానీ ₹2,000 బదులు ₹1,000 మాత్రమే డిపాజిట్ చేయాలి.",
        "ఆమె ఉద్యోగి ఐడీ కార్డు అడిగి చూస్తే సురక్షితం."
      ],
      hi: [
        "हाँ, क्योंकि उसने मेरे UPI में ₹150 भेजे हैं, जिससे साबित होता है कि यह असली है।",
        "नहीं! यह एक 'टास्क फ्रॉड' है। ठग भरोसा जीतने के लिए शुरुआत में छोटे पैसे देते हैं, फिर बड़े पैसे जमा करवाकर फरार हो जाते हैं।",
        "हाँ, लेकिन ₹2000 की जगह सिर्फ ₹1000 जमा करने चाहिए।",
        "यदि आप पहले उसका आईडी कार्ड मांग लें तो यह सुरक्षित है।"
      ]
    },
    correctIndex: 1,
    explanation: {
      en: "Correct! Legitimate companies like Amazon, YouTube, or Google NEVER hire via WhatsApp to 'like videos' or demand prepaid deposits. The ₹150 payout is merely bait.",
      te: "సరైన సమాధానం! అమెజాన్ లేదా గూగుల్ వంటి సంస్థలు వాట్సాప్‌లో వీడియోలు లైక్ చేసే ఉద్యోగాలు ఇవ్వవు, ముందస్తు డిపాజిట్లు అడగవు.",
      hi: "बिल्कुल सही! अमेज़न या गूगल जैसी कंपनियाँ कभी व्हाट्सएप पर वीडियो लाइक करने के लिए भर्ती नहीं करतीं और न ही पैसे जमा करवाती हैं।"
    }
  },
  {
    id: "q3",
    scenario: {
      en: "You receive an SMS: 'Rs 1,200 spent on your Debit Card ending xx5120 at GROCERY STORE. Available bal: Rs 24,000. If not done by you, call official toll-free 18002583838. Do NOT share OTP.' What is the risk level?",
      te: "మీకొక SMS వచ్చింది: 'మీ డెబిట్ కార్డ్ xx5120 నుండి కిరాణా షాపు వద్ద రూ. 1,200 ఖర్చు చేయబడింది. ఖాతా నిల్వ: రూ. 24,000. ఇది మీరు చేయకపోతే టోల్ ఫ్రీ 18002583838 కి కాల్ చేయండి. OTP ఎవరితోనూ పంచుకోవద్దు.' దీని ప్రమాద స్థాయి ఎంత?",
      hi: "आपको एक SMS मिला: 'आपके डेबिट कार्ड xx5120 से किराना स्टोर पर ₹1200 का भुगतान हुआ। बैलेंस: ₹24,000। यदि यह आपने नहीं किया, तो 18002583838 पर कॉल करें। ओटीपी साझा न करें।' जोखिम क्या है?"
    },
    options: {
      en: [
        "High Risk: It mentions money and account details so it must be a phishing scam.",
        "Low Risk: This is an authentic transactional bank notification with masked card details, an official 1800 toll-free number, and an explicit warning NOT to share OTP.",
        "Medium Risk: All bank messages are unsafe.",
        "High Risk: You should immediately click whatever link is in the message."
      ],
      te: [
        "అధిక ప్రమాదం: డబ్బు మరియు ఖాతా వివరాలు ఉన్నాయి కాబట్టి ఇది కచ్చితంగా స్కామ్.",
        "తక్కువ ప్రమాదం (సురక్షితం): ఇది నిజమైన బ్యాంక్ నోటిఫికేషన్. కార్డ్ నంబర్ దాచబడింది, అధికారిక 1800 టోల్ ఫ్రీ నంబర్ ఉంది మరియు OTP పంచుకోవద్దని హెచ్చరించింది.",
        "మధ్యస్థ ప్రమాదం: అన్ని బ్యాంక్ సందేశాలు ప్రమాదకరమే.",
        "అధిక ప్రమాదం: సందేశంలో ఉన్న లింక్‌ను వెంటనే క్లిక్ చేయాలి."
      ],
      hi: [
        "उच्च जोखिम: इसमें पैसे का जिक्र है इसलिए यह निश्चित रूप से धोखाधड़ी है।",
        "कम जोखिम (सुरक्षित): यह बैंक का असली अलर्ट है जिसमें कार्ड के अंतिम अंक हैं, 1800 आधिकारिक नंबर है और ओटीपी न देने की सलाह है।",
        "मध्यम जोखिम: बैंक के सभी संदेश असुरक्षित होते हैं।",
        "उच्च जोखिम: तुरंत संदेश के लिंक पर क्लिक करें।"
      ]
    },
    correctIndex: 1,
    explanation: {
      en: "Correct! Legitimate bank transaction alerts mask your card digits (xx5120), direct you to standard 1800 toll-free lines, and remind you to keep OTPs secret. Never label an alert as a scam simply because it mentions banking!",
      te: "సరైన సమాధానం! నిజమైన బ్యాంక్ సందేశాలు కార్డ్ నంబర్‌ను దాచిపెడతాయి (xx5120) మరియు 1800 టోల్ ఫ్రీ నంబర్లను ఇస్తాయి. కేవలం బ్యాంకింగ్ పదాలు ఉన్నంత మాత్రాన అది స్కామ్ కాదు.",
      hi: "बिल्कुल सही! असली बैंक अलर्ट में कार्ड नंबर सुरक्षित रहता है और आधिकारिक टोल-फ्री नंबर होता है। सिर्फ बैंक शब्द देखकर उसे फ्रॉड नहीं माना जा सकता।"
    }
  }
];
