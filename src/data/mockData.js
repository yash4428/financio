// --- LESSON DATA (Duolingo Style) ---
export const LESSONS = {
  farmer: [
    {
      id: 'lesson_001',
      title: 'बैंक खाता कैसे खोलें',
      titleEn: 'How to Open a Bank Account',
      duration: '5 min',
      xp: 50,
      completed: true, // Mark first as done for demo
      content: {
        text: 'बैंक खाता खोलना बहुत आसान है। आपको तीन चीजें चाहिए: 1) आधार कार्ड 2) पैन कार्ड 3) पासपोर्ट साइज फोटो। नजदीकी बैंक शाखा में जाएं और फॉर्म भरें।',
        textEn: 'Opening a bank account is very easy. You usually need three things: 1) Aadhaar card 2) PAN card 3) passport-size photo. Visit your nearest bank branch and fill the account opening form.',
      },
      quiz: [
        {
          question: 'बैंक खाता खोलने के लिए क्या चाहिए?',
          questionEn: 'What is needed to open a bank account?',
          options: ['आधार कार्ड और पैन कार्ड', 'केवल फोटो', 'कुछ नहीं'],
          optionsEn: ['Aadhaar & PAN', 'Only Photo', 'Nothing'],
          correct: 0,
          explanation: 'बैंक खाता खोलने के लिए आधार और पैन जरूरी हैं।',
          explanationEn: 'Aadhaar and PAN are mandatory for opening a bank account.'
        }
      ]
    },
    {
      id: 'lesson_002',
      title: 'UPI से सुरक्षित लेनदेन',
      titleEn: 'Safe UPI Transactions',
      duration: '6 min',
      xp: 60,
      completed: false,
      content: {
        text: 'UPI से पैसे भेजना बहुत आसान है। लेकिन सुरक्षा बहुत जरूरी है। कभी भी अपना UPI PIN किसी के साथ शेयर न करें। फर्जी कॉल से सावधान रहें।',
        textEn: 'Sending money via UPI is very easy. But security is important. Never share your UPI PIN with anyone. Beware of fake calls.',
      },
      quiz: [
        {
          question: 'UPI PIN कब शेयर करना चाहिए?',
          questionEn: 'When should you share UPI PIN?',
          options: ['कभी नहीं', 'बैंक वाले मांगे तो', 'परिवार के साथ'],
          optionsEn: ['Never', 'If bank asks', 'With family'],
          correct: 0,
          explanation: 'UPI PIN कभी भी किसी के साथ शेयर नहीं करना चाहिए।',
          explanationEn: 'You should never share your UPI PIN with anyone.'
        }
      ]
    },
    {
      id: 'lesson_003',
      title: 'फसल बीमा (Crop Insurance)',
      titleEn: 'Understanding Crop Insurance',
      duration: '8 min',
      xp: 100,
      completed: false,
      content: {
        text: 'फसल बीमा योजना आपकी फसल को बाढ़ या सूखे से बचाती है। इसके लिए आपको बुवाई के समय ही प्रीमियम भरना होता है।',
        textEn: 'Crop insurance protects your crops from flood or drought. You must pay the premium at the time of sowing.',
      },
      quiz: [
        {
          question: 'प्रीमियम कब भरना होता है?',
          questionEn: 'When do you pay the premium?',
          options: ['फसल काटने के बाद', 'बुवाई के समय', 'कभी भी'],
          optionsEn: ['After harvest', 'At sowing', 'Anytime'],
          correct: 1,
          explanation: 'प्रीमियम बुवाई के समय भरा जाता है ताकि रिस्क कवर हो सके।',
          explanationEn: 'Premium is paid at sowing to ensure risk coverage.'
        }
      ]
    }
  ]
};

// --- SCENARIO GAME DATA (Fraud Detector) ---
export const SCENARIOS = [
  {
    id: 1,
    type: 'sms',
    sender: 'BW-LUCKY',
    message: 'Congratulations! You have won ₹50,000 lottery. Click here to claim: http://bit.ly/fake',
    isScam: true,
    explanation: 'Lotteries never ask you to click links. Sender ID is suspicious.',
    explanationHi: 'लॉटरी कभी लिंक क्लिक करने को नहीं कहती। यह एक धोखा है।'
  },
  {
    id: 2,
    type: 'sms',
    sender: 'SBI-BANK',
    message: 'Your AC XXXXX123 debited with INR 500.00. Avl Bal: 10,500.00.',
    isScam: false,
    explanation: 'This is a standard bank alert. No links, just information.',
    explanationHi: 'यह एक सामान्य बैंक संदेश है। इसमें कोई लिंक नहीं है।'
  },
  {
    id: 3,
    type: 'call',
    sender: 'Unknown Number',
    message: '"Sir, I am calling from your bank. I need your OTP to update KYC."',
    isScam: true,
    explanation: 'Banks NEVER ask for OTP over call.',
    explanationHi: 'बैंक कभी भी फोन पर OTP नहीं मांगता।'
  }
];

// --- SORTING GAME DATA (Needs vs Wants) ---
export const SORTING_GAME_DATA = {
  title: 'Needs vs. Wants',
  titleHi: 'ज़रूरत बनाम चाहत',
  instruction: 'Drag items to the correct basket.',
  instructionHi: 'तय करें कि यह "ज़रूरत" है या "चाहत"।',
  items: [
    { id: 1, name: 'Seeds (बीज)', nameHi: 'बीज', category: 'need', icon: '🌱' },
    { id: 2, name: 'Cinema Ticket', nameHi: 'सिनेमा टिकट', category: 'want', icon: '🎟️' },
    { id: 3, name: 'Medicine', nameHi: 'दवाई', category: 'need', icon: '💊' },
    { id: 4, name: 'Fancy Watch', nameHi: 'महंगी घड़ी', category: 'want', icon: '⌚' },
    { id: 5, name: 'School Fees', nameHi: 'स्कूल फीस', category: 'need', icon: '📚' },
    { id: 6, name: 'New Smartphone', nameHi: 'नया फोन', category: 'want', icon: '📱' }
  ]
};

// --- CHATBOT "WIZARD OF OZ" SCRIPT ---
export const CHAT_RESPONSES = [
  {
    triggers: ['hi', 'hello', 'नमस्ते', 'namaste'],
    answerHi: 'नमस्ते! मैं मित्रा हूँ। मैं आपकी कैसे मदद कर सकता हूँ?',
    answerEn: 'Hello! I am Mitra. How can I help you today?'
  },
  {
    triggers: ['loan', 'kcc', 'money', 'लोन', 'पैसा', 'udhaar'],
    answerHi: 'किसानों के लिए KCC (किसान क्रेडिट कार्ड) सबसे अच्छा लोन है। इसमें ब्याज दर बहुत कम (4%) होती है। क्या आप आवेदन करना चाहते हैं?',
    answerEn: 'For farmers, KCC (Kisan Credit Card) is the best loan option. The interest rate is very low (4%). Do you want to apply?'
  },
  {
    triggers: ['fraud', 'scam', 'dhokha', 'cheating', 'धोखा', 'chor'],
    answerHi: 'अगर आपके साथ धोखा हुआ है, तो तुरंत 1930 पर कॉल करें। यह साइबर अपराध हेल्पलाइन है।',
    answerEn: 'If you have been scammed, call 1930 immediately. This is the Cyber Crime Helpline.'
  },
  {
    triggers: ['balance', 'check', 'खाता', 'amount', 'paise'],
    answerHi: 'बैलेंस चेक करने के लिए आप *99# डायल कर सकते हैं या अपने बैंक के UPI ऐप का उपयोग कर सकते हैं।',
    answerEn: 'To check balance, you can dial *99# or use your bank UPI app.'
  },
  {
    triggers: ['scheme', 'yojana', 'govt', 'sarkar'],
    answerHi: 'अभी "पीएम किसान सम्मान निधि" सबसे लोकप्रिय योजना है। इसमें आपको साल में ₹6000 मिलते हैं।',
    answerEn: 'Currently, "PM Kisan Samman Nidhi" is the most popular scheme. You get ₹6000 per year.'
  }
];

// --- FALLBACK FAQ DATA ---
export const FAQ_DATA = [
  {
    question: 'बैंक खाता खोलने के लिए क्या दस्तावेज़ चाहिए?',
    answer: 'बैंक खाता खोलने के लिए आपको आधार कार्ड, पैन कार्ड, और पासपोर्ट साइज़ फोटो चाहिए।',
    keywords: ['बैंक', 'खाता', 'दस्तावेज़', 'आधार', 'पैन']
  },
  {
    question: 'UPI पिन कैसे सुरक्षित रखें?',
    answer: 'UPI पिन कभी भी किसी के साथ शेयर न करें। बैंक या पुलिस कभी आपसे पिन नहीं मांगेगी।',
    keywords: ['UPI', 'पिन', 'सुरक्षा', 'सुरक्षित']
  }
];