import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, MessageCircle, Award, TrendingUp, Home, User, BookOpen, Check, X, Mic, Send } from 'lucide-react';

const LanguageToggle = ({ language, setLanguage }) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setLanguage('hi')}
        className={`px-3 py-1 rounded-full text-xs font-semibold border ${
          language === 'hi'
            ? 'bg-white text-green-600 border-green-500'
            : 'bg-transparent text-white border-white/50'
        }`}
      >
        🇮🇳 हिंदी
      </button>
      <span className="text-white/70 text-xs">|</span>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded-full text-xs font-semibold border ${
          language === 'en'
            ? 'bg-white text-green-600 border-green-500'
            : 'bg-transparent text-white border-white/50'
        }`}
      >
        English 🇬🇧
      </button>
    </div>
  );
};

// Mock Data
const LESSONS = {
  farmer: [
    {
      id: 'lesson_001',
      title: 'बैंक खाता कैसे खोलें',
      titleEn: 'How to Open a Bank Account',
      duration: '5 min',
      xp: 50,
      completed: false,
      content: {
        text: 'बैंक खाता खोलना बहुत आसान है। आपको तीन चीजें चाहिए: 1) आधार कार्ड 2) पैन कार्ड 3) पासपोर्ट साइज फोटो। नजदीकी बैंक शाखा में जाएं और फॉर्म भरें।',
        audioUrl: '/audio/lesson_001.mp3',
        images: ['bank-documents', 'bank-counter']
      },
      quiz: [
        {
          question: 'बैंक खाता खोलने के लिए क्या चाहिए?',
          options: ['आधार कार्ड और पैन कार्ड', 'केवल फोटो', 'कुछ नहीं'],
          correct: 0,
          explanation: 'बैंक खाता खोलने के लिए आधार और पैन जरूरी हैं।'
        },
        {
          question: 'बैंक खाते से क्या फायदा है?',
          options: ['पैसे सुरक्षित रहते हैं', 'ब्याज मिलता है', 'दोनों सही हैं'],
          correct: 2,
          explanation: 'बैंक खाते से पैसे सुरक्षित रहते हैं और ब्याज भी मिलता है।'
        },
        {
          question: 'खाता खोलने में कितना समय लगता है?',
          options: ['1-2 दिन', '1 महीना', '6 महीने'],
          correct: 0,
          explanation: 'आजकल बैंक खाता 1-2 दिन में खुल जाता है।'
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
        audioUrl: '/audio/lesson_002.mp3',
        images: ['upi-payment', 'security-tips']
      },
      quiz: [
        {
          question: 'UPI PIN कब शेयर करना चाहिए?',
          options: ['कभी नहीं', 'बैंक वाले मांगे तो', 'परिवार के साथ'],
          correct: 0,
          explanation: 'UPI PIN कभी भी किसी के साथ शेयर नहीं करना चाहिए।'
        },
        {
          question: 'UPI से पैसे भेजने से पहले क्या चेक करें?',
          options: ['नाम और नंबर', 'केवल नंबर', 'कुछ नहीं'],
          correct: 0,
          explanation: 'हमेशा प्राप्तकर्ता का नाम और नंबर दोनों चेक करें।'
        },
        {
          question: 'अगर गलत अकाउंट में पैसे चले जाएं तो?',
          options: ['तुरंत बैंक को बताएं', 'कुछ न करें', 'इंतजार करें'],
          correct: 0,
          explanation: 'गलती होने पर तुरंत बैंक को सूचित करें।'
        }
      ]
    },
    {
      id: 'lesson_003',
      title: 'फसल बीमा की जानकारी',
      titleEn: 'Understanding Crop Insurance',
      duration: '7 min',
      xp: 70,
      completed: false,
      content: {
        text: 'प्रधानमंत्री फसल बीमा योजना किसानों के लिए बहुत फायदेमंद है। अगर आपकी फसल खराब हो जाए तो सरकार मुआवजा देती है। कम प्रीमियम में अच्छा कवर मिलता है।',
        audioUrl: '/audio/lesson_003.mp3',
        images: ['crop-insurance', 'claim-process']
      },
      quiz: [
        {
          question: 'फसल बीमा किसके लिए है?',
          options: ['सभी किसानों के लिए', 'केवल बड़े किसानों के लिए', 'केवल छोटे किसानों के लिए'],
          correct: 0,
          explanation: 'फसल बीमा सभी किसानों के लिए उपलब्ध है।'
        },
        {
          question: 'प्रीमियम कब भरना होता है?',
          options: ['फसल बोने के समय', 'फसल काटने के बाद', 'कभी भी'],
          correct: 0,
          explanation: 'फसल बोते समय ही बीमा प्रीमियम भरना होता है।'
        },
        {
          question: 'दावा कब कर सकते हैं?',
          options: ['फसल नुकसान होने पर', 'कभी भी', 'साल में एक बार'],
          correct: 0,
          explanation: 'फसल को नुकसान होने पर ही दावा कर सकते हैं।'
        }
      ]
    }
  ]
};

const FAQ_DATA = [
  {
    question: 'बैंक खाता खोलने के लिए क्या दस्तावेज़ चाहिए?',
    answer: 'बैंक खाता खोलने के लिए आपको आधार कार्ड, पैन कार्ड, और पासपोर्ट साइज़ फोटो चाहिए। कुछ बैंक एड्रेस प्रूफ भी मांग सकते हैं।',
    keywords: ['बैंक', 'खाता', 'दस्तावेज़', 'आधार', 'पैन']
  },
  {
    question: 'UPI पिन कैसे सुरक्षित रखें?',
    answer: 'UPI पिन कभी भी किसी के साथ शेयर न करें। बैंक या पुलिस कभी आपसे पिन नहीं मांगेगी। अपना पिन नियमित रूप से बदलते रहें।',
    keywords: ['UPI', 'पिन', 'सुरक्षा', 'सुरक्षित']
  },
  {
    question: 'PM-Kisan योजना क्या है?',
    answer: 'PM-Kisan योजना में सरकार किसानों को साल में 6000 रुपये देती है। यह राशि तीन किस्तों में सीधे बैंक खाते में आती है।',
    keywords: ['PM-Kisan', 'किसान', 'योजना', 'सरकार']
  },
  {
    question: 'फसल बीमा का दावा कैसे करें?',
    answer: 'फसल को नुकसान होने पर 72 घंटे के अंदर बैंक या बीमा कंपनी को सूचित करें। फोटो और दस्तावेज़ जमा करें। दावा 2-3 महीने में मिल जाता है।',
    keywords: ['फसल', 'बीमा', 'दावा', 'नुकसान']
  },
  {
    question: 'ऑनलाइन धोखाधड़ी से कैसे बचें?',
    answer: 'अनजान लिंक पर क्लिक न करें। कभी भी OTP या पासवर्ड शेयर न करें। अगर कोई बैंक का कर्मचारी होने का दावा करे तो पहले बैंक से सत्यापन करें।',
    keywords: ['धोखाधड़ी', 'ऑनलाइन', 'सुरक्षा', 'OTP']
  }
];

// Components
const OnboardingScreen = ({ onComplete, language, setLanguage }) => {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState({
    occupation: '',
    language: 'hindi',
    education: '',
    income: ''
  });

  const occupations = [
    { id: 'farmer', label: 'किसान / Farmer', icon: '🌾' },
    { id: 'business', label: 'व्यापारी / Business', icon: '🏪' },
    { id: 'worker', label: 'मजदूर / Worker', icon: '👷' },
    { id: 'housewife', label: 'गृहिणी / Homemaker', icon: '🏠' }
  ];

  const handleComplete = () => {
    if (profile.occupation && profile.education && profile.income) {
      onComplete(profile);
    }
  };

  if (step === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-500 to-green-700 flex items-center justify-center p-6">
        <div className="text-center text-white relative">
          <div className="absolute top-0 right-0">
            <LanguageToggle language={language} setLanguage={setLanguage} />
          </div>
          <div className="text-6xl mb-6 mt-6">👋</div>
          <h1 className="text-5xl font-bold mb-4">
            {language === 'hi' ? 'नमस्ते!' : 'Hello!'}
          </h1>
          <p className="text-xl mb-2">
            {language === 'hi'
              ? 'आपके वित्तीय सफर में आपका स्वागत है'
              : 'Welcome to your financial journey'}
          </p>
          <p className="text-lg opacity-90 mb-12">
            {language === 'hi'
              ? 'आसान भाषा में वित्तीय जानकारी सीखें'
              : 'Learn financial skills in simple language'}
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-12">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-6 h-6" />
              <span>
                {language === 'hi' ? 'आसान भाषा में सीखें' : 'Learn in simple language'}
              </span>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-6 h-6" />
              <span>
                {language === 'hi' ? 'इनाम पाएं और आगे बढ़ें' : 'Earn rewards and progress'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <MessageCircle className="w-6 h-6" />
              <span>
                {language === 'hi' ? 'अपने दोस्त मित्रा से बात करें' : 'Chat with your friend Mitra'}
              </span>
            </div>
          </div>
          
          <button
            onClick={() => setStep(1)}
            className="bg-white text-green-600 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            {language === 'hi' ? 'शुरू करें' : 'Start'}
          </button>
        </div>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-end mb-4">
            <LanguageToggle language={language} setLanguage={setLanguage} />
          </div>
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">
              {language === 'hi' ? 'आप क्या करते हैं?' : 'What do you do?'}
            </h2>
            <p className="text-gray-600">
              {language === 'hi' ? 'कृपया अपना पेशा चुनें' : 'Please choose your occupation'}
            </p>
            <div className="w-full bg-gray-200 h-2 rounded-full mt-4">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '33%' }}></div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            {occupations.map(occ => (
              <button
                key={occ.id}
                onClick={() => setProfile({ ...profile, occupation: occ.id })}
                className={`p-6 rounded-xl border-2 transition-all ${
                  profile.occupation === occ.id
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 bg-white hover:border-green-300'
                }`}
              >
                <div className="text-4xl mb-3">{occ.icon}</div>
                <div className="font-semibold">{occ.label}</div>
              </button>
            ))}
          </div>
          
          <button
            onClick={() => setStep(2)}
            disabled={!profile.occupation}
            className="w-full bg-green-500 text-white py-4 rounded-xl font-bold disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {language === 'hi' ? 'आगे बढ़ें' : 'Next'}
          </button>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-end mb-4">
            <LanguageToggle language={language} setLanguage={setLanguage} />
          </div>
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">
              {language === 'hi' ? 'थोड़ी और जानकारी' : 'A bit more information'}
            </h2>
            <p className="text-gray-600">
              {language === 'hi'
                ? 'आपके लिए सही पाठ चुनने के लिए कुछ और जानकारी'
                : 'A bit more information to personalize your lessons'}
            </p>
            <div className="w-full bg-gray-200 h-2 rounded-full mt-4">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '66%' }}></div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-semibold mb-3">
                {language === 'hi' ? 'शिक्षा' : 'Education'}
              </label>
              <div className="space-y-2">
                {[
                  { id: 'no_formal', label: 'बिना शिक्षा / No Formal' },
                  { id: 'primary', label: 'प्राथमिक / Primary' },
                  { id: 'secondary', label: 'माध्यमिक / Secondary' }
                ].map(edu => (
                  <button
                    key={edu.id}
                    onClick={() => setProfile({ ...profile, education: edu.id })}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      profile.education === edu.id
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 bg-white hover:border-green-300'
                    }`}
                  >
                    {edu.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-lg font-semibold mb-3">
                {language === 'hi' ? 'वार्षिक आय' : 'Annual Income'}
              </label>
              <div className="space-y-2">
                {[
                  { id: 'below_50k', label: '₹50,000 से कम / Below ₹50,000' },
                  { id: '50k_1l', label: '₹50,000 - ₹1,00,000' },
                  { id: 'above_1l', label: '₹1,00,000 से अधिक / Above ₹1,00,000' }
                ].map(inc => (
                  <button
                    key={inc.id}
                    onClick={() => setProfile({ ...profile, income: inc.id })}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      profile.income === inc.id
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 bg-white hover:border-green-300'
                    }`}
                  >
                    {inc.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <button
            onClick={handleComplete}
            disabled={!profile.education || !profile.income}
            className="w-full bg-green-500 text-white py-4 rounded-xl font-bold mt-8 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {language === 'hi' ? 'सीखना शुरू करें' : 'Start Learning'}
          </button>
        </div>
      </div>
    );
  }
};

const LessonCard = ({ lesson, onClick }) => (
  <button
    onClick={onClick}
    className="w-full bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow text-left"
  >
    <div className="flex items-start justify-between mb-3">
      <div className="flex-1">
        <h3 className="font-bold text-lg mb-1">
          {lesson.language === 'en' ? lesson.titleEn : lesson.title}
        </h3>
        <p className="text-sm text-gray-600">
          {lesson.language === 'en' ? lesson.title : lesson.titleEn}
        </p>
      </div>
      {lesson.completed && (
        <div className="bg-green-100 text-green-600 rounded-full p-2">
          <Check className="w-5 h-5" />
        </div>
      )}
    </div>
    <div className="flex items-center gap-4 text-sm text-gray-600">
      <span className="flex items-center gap-1">
        <BookOpen className="w-4 h-4" />
        {lesson.duration}
      </span>
      <span className="flex items-center gap-1">
        <Award className="w-4 h-4" />
        {lesson.xp} XP
      </span>
    </div>
  </button>
);

const LessonPlayer = ({ lesson, onComplete, language, setLanguage }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 2;
        });
      }, 100);
      return () => clearInterval(timer);
    }
  }, [isPlaying]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 pb-24">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-2xl p-8 mb-6 text-white">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h2 className="text-2xl font-bold">
                {language === 'hi' ? lesson.title : lesson.titleEn}
              </h2>
              <p className="opacity-90 text-sm mt-1">
                {language === 'hi' ? lesson.titleEn : lesson.title}
              </p>
            </div>
            <LanguageToggle language={language} setLanguage={setLanguage} />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-green-500 text-white p-4 rounded-full hover:bg-green-600 transition-colors"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
            <div className="flex-1 mx-4">
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            <Volume2 className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-gray-700 leading-relaxed">
            {language === 'hi'
              ? lesson.content.text
              : 'Opening a bank account is very easy. You usually need three things: 1) Aadhaar card 2) PAN card 3) passport-size photo. Visit your nearest bank branch and fill the account opening form.'}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center mb-4">
            <BookOpen className="w-16 h-16 text-gray-400" />
          </div>
          <p className="text-center text-sm text-gray-600">
            Illustration: Bank documents and forms
          </p>
        </div>

        <button
          onClick={onComplete}
          className="w-full bg-green-500 text-white py-4 rounded-xl font-bold mt-6 hover:bg-green-600 transition-colors"
        >
          {language === 'hi' ? 'क्विज़ शुरू करें' : 'Start Quiz'}
        </button>
      </div>
    </div>
  );
};

const QuizScreen = ({ lesson, onComplete, language, setLanguage }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleAnswer = (optionIndex) => {
    setSelectedOption(optionIndex);
    const isCorrect = optionIndex === lesson.quiz[currentQ].correct;
    
    setTimeout(() => {
      const newAnswers = [...answers, isCorrect];
      setAnswers(newAnswers);
      
      if (currentQ < lesson.quiz.length - 1) {
        setCurrentQ(currentQ + 1);
        setSelectedOption(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const correctCount = answers.filter(a => a).length;
  const score = Math.round((correctCount / lesson.quiz.length) * 100);

  if (showResult) {
    const xpEarned = Math.round((score / 100) * lesson.xp);
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-500 to-green-700 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">
            {score >= 80 ? '🎉' : score >= 60 ? '😊' : '💪'}
          </div>
          <h2 className="text-3xl font-bold mb-2">
            {language === 'hi'
              ? score >= 80
                ? 'बहुत बढ़िया!'
                : score >= 60
                ? 'अच्छा!'
                : 'अच्छी कोशिश!'
              : score >= 80
              ? 'Excellent!'
              : score >= 60
              ? 'Good job!'
              : 'Nice try!'}
          </h2>
          <p className="text-gray-600 mb-6">
            {language === 'hi'
              ? score >= 80
                ? 'शानदार प्रदर्शन!'
                : score >= 60
                ? 'अच्छा प्रयास!'
                : 'सीखते रहें, आप कर सकते हैं!'
              : score >= 80
              ? 'Amazing performance!'
              : score >= 60
              ? 'Good effort!'
              : 'Keep learning, you can do it!'}
          </p>
          
          <div className="bg-green-50 rounded-xl p-6 mb-6">
            <div className="text-5xl font-bold text-green-600 mb-2">{score}%</div>
            <p className="text-gray-600">
              {language === 'hi'
                ? `${lesson.quiz.length} में से ${correctCount} सही`
                : `${correctCount} / ${lesson.quiz.length} correct`}
            </p>
          </div>
          
          <div className="flex items-center justify-center gap-2 bg-amber-50 text-amber-700 rounded-lg p-4 mb-6">
            <Award className="w-5 h-5" />
            <span className="font-bold">
              {language === 'hi' ? `+${xpEarned} XP अर्जित` : `+${xpEarned} XP earned`}
            </span>
          </div>
          
          <button
            onClick={() => onComplete(score, xpEarned)}
            className="w-full bg-green-500 text-white py-4 rounded-xl font-bold hover:bg-green-600 transition-colors"
          >
            {language === 'hi' ? 'जारी रखें' : 'Continue'}
          </button>
        </div>
      </div>
    );
  }

  const question = lesson.quiz[currentQ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-end mb-4">
          <LanguageToggle language={language} setLanguage={setLanguage} />
        </div>
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>
              {language === 'hi'
                ? `प्रश्न ${currentQ + 1} / ${lesson.quiz.length}`
                : `Question ${currentQ + 1} of ${lesson.quiz.length}`}
            </span>
            <span>{Math.round(((currentQ) / lesson.quiz.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div
              className="bg-green-500 h-2 rounded-full transition-all"
              style={{ width: `${((currentQ) / lesson.quiz.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          <h3 className="text-xl font-bold mb-6">
            {language === 'hi' ? question.question : (question.questionEn || question.question)}
          </h3>
          
          <div className="space-y-3">
            {question.options.map((option, index) => {
              let buttonClass = "w-full p-4 rounded-xl border-2 text-left transition-all ";
              
              if (selectedOption === null) {
                buttonClass += "border-gray-200 bg-white hover:border-green-300";
              } else if (index === question.correct) {
                buttonClass += "border-green-500 bg-green-50";
              } else if (index === selectedOption) {
                buttonClass += "border-red-500 bg-red-50";
              } else {
                buttonClass += "border-gray-200 bg-gray-50";
              }
              
              return (
                <button
                  key={index}
                  onClick={() => selectedOption === null && handleAnswer(index)}
                  disabled={selectedOption !== null}
                  className={buttonClass}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedOption === null ? 'border-gray-300' :
                      index === question.correct ? 'border-green-500 bg-green-500' :
                      index === selectedOption ? 'border-red-500 bg-red-500' :
                      'border-gray-300'
                    }`}>
                      {index === question.correct && selectedOption !== null && (
                        <Check className="w-4 h-4 text-white" />
                      )}
                      {index === selectedOption && index !== question.correct && (
                        <X className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span className="flex-1">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>
          
          {selectedOption !== null && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-900">
                {language === 'hi'
                  ? question.explanation
                  : (question.explanationEn || question.explanation)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ChatbotScreen = ({ language, setLanguage }) => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'hi'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findAnswer = (query) => {
    const lowerQuery = query.toLowerCase();
    
    for (const faq of FAQ_DATA) {
      if (faq.keywords.some(keyword => lowerQuery.includes(keyword.toLowerCase()))) {
        return faq.answer;
      }
    }
    
    return language === 'hi'
      ? 'मुझे माफ़ करें, मुझे इस सवाल का जवाब नहीं पता। क्या आप अपना सवाल दूसरे तरीके से पूछ सकते हैं? या आप बैंकिंग, UPI, बीमा, या योजनाओं के बारे में पूछ सकते हैं।'
      : "Sorry, I don't know the answer to this question yet. Can you ask it in another way, or ask about banking, UPI, insurance, or government schemes?";
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage = { type: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    setTimeout(() => {
      const answer = findAnswer(input);
      const botMessage = { type: 'bot', text: answer };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleVoice = () => {
    alert('Voice input feature - In production, this would use Speech-to-Text API');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 shadow-lg flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            {language === 'hi' ? 'मित्रा - आपका साथी' : 'Mitra - Your Companion'}
          </h2>
          <p className="text-sm opacity-90">
            {language === 'hi' ? 'आपका वित्तीय दोस्त' : 'Your financial friend'}
          </p>
        </div>
        <LanguageToggle language={language} setLanguage={setLanguage} />
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-4 ${
                msg.type === 'user'
                  ? 'bg-green-500 text-white rounded-br-none'
                  : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
              }`}
            >
              {msg.type === 'bot' && (
                <div className="flex items-center gap-2 mb-2">
                  <MessageCircle className="w-4 h-4 text-green-500" />
                  <span className="text-xs font-semibold text-green-600">मित्रा</span>
                </div>
              )}
              <p className="text-sm leading-relaxed">
                {msg.type === 'bot' && msg.text === 'hi'
                  ? language === 'hi'
                    ? 'नमस्ते! मैं मित्रा हूँ। मैं आपकी वित्तीय सवालों में मदद कर सकता हूँ। आप मुझसे बैंकिंग, UPI, बीमा, या सरकारी योजनाओं के बारे में पूछ सकते हैं।'
                    : 'Hello! I am Mitra. I can help you with your financial questions. You can ask me about banking, UPI, insurance, or government schemes.'
                  : msg.text}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white rounded-2xl rounded-bl-none p-4 shadow-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 bg-white border-t">
        <div className="flex gap-2">
          <button
            onClick={handleVoice}
            className="bg-green-100 text-green-600 p-3 rounded-full hover:bg-green-200 transition-colors"
          >
            <Mic className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={language === 'hi' ? 'अपना सवाल पूछें...' : 'Ask your question...'}
            className="flex-1 border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:border-green-500"
          />
          <button
            onClick={handleSend}
            className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

const RewardsScreen = ({ userProfile, language, setLanguage }) => {
  const badges = [
    { id: 'first_lesson', name: 'पहला कदम', icon: '🎯', earned: true },
    { id: 'quiz_master', name: 'क्विज़ मास्टर', icon: '🏆', earned: true },
    { id: 'week_warrior', name: '7 दिन स्ट्रीक', icon: '🔥', earned: true },
    { id: 'perfect_score', name: 'परफेक्ट स्कोर', icon: '💯', earned: false },
    { id: 'month_master', name: '30 दिन स्ट्रीक', icon: '⭐', earned: false },
    { id: 'learning_legend', name: 'लर्निंग लेजेंड', icon: '👑', earned: false }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-end mb-4">
          <LanguageToggle language={language} setLanguage={setLanguage} />
        </div>
        <h2 className="text-3xl font-bold mb-2">
          {language === 'hi' ? 'आपके इनाम' : 'Your Rewards'}
        </h2>
        <p className="text-gray-600 mb-8">
          {language === 'hi' ? 'आपकी प्रगति और उपलब्धियाँ' : 'Your progress and achievements'}
        </p>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 mb-8 text-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm opacity-90 mb-1">
                {language === 'hi' ? 'कुल XP' : 'Total XP'}
              </p>
              <p className="text-4xl font-bold">{userProfile.totalXP}</p>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90 mb-1">
                {language === 'hi' ? 'लेवल' : 'Level'}
              </p>
              <p className="text-4xl font-bold">{userProfile.level}</p>
            </div>
          </div>
          
          <div className="bg-white/20 rounded-full h-3 mb-2">
            <div
              className="bg-white h-3 rounded-full transition-all"
              style={{ width: `${(userProfile.totalXP % 500) / 5}%` }}
            ></div>
          </div>
          <p className="text-sm opacity-90">
            {language === 'hi'
              ? `${500 - (userProfile.totalXP % 500)} XP अगले लेवल तक`
              : `${500 - (userProfile.totalXP % 500)} XP to next level`}
          </p>
        </div>
        
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">
                {language === 'hi' ? 'स्ट्रीक' : 'Streak'}
              </p>
              <p className="text-3xl font-bold">
                {language === 'hi' ? `${userProfile.streak} दिन` : `${userProfile.streak} days`}
              </p>
            </div>
            <div className="text-5xl">🔥</div>
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-4">बैज / Badges</h3>
        <div className="grid grid-cols-3 gap-4">
          {badges.map(badge => (
            <div
              key={badge.id}
              className={`bg-white rounded-xl p-4 text-center shadow-sm ${
                !badge.earned && 'opacity-40'
              }`}
            >
              <div className="text-4xl mb-2">{badge.icon}</div>
              <p className="text-xs font-semibold">{badge.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MainApp = () => {
  const [screen, setScreen] = useState('onboarding');
  const [language, setLanguage] = useState('hi');
  const [currentLesson, setCurrentLesson] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [userProfile, setUserProfile] = useState({
    occupation: '',
    language: 'hindi',
    totalXP: 180,
    level: 2,
    streak: 7,
    lessonsCompleted: []
  });
  const [lessons, setLessons] = useState(LESSONS.farmer);

  const handleOnboardingComplete = (profile) => {
    setUserProfile({ ...userProfile, ...profile });
    setScreen('home');
  };

  const handleLessonClick = (lesson) => {
    setCurrentLesson(lesson);
    setScreen('lesson');
  };

  const handleLessonComplete = () => {
    setShowQuiz(true);
  };

  const handleQuizComplete = (score, xpEarned) => {
    const updatedLessons = lessons.map(l =>
      l.id === currentLesson.id ? { ...l, completed: true } : l
    );
    setLessons(updatedLessons);
    
    setUserProfile({
      ...userProfile,
      totalXP: userProfile.totalXP + xpEarned,
      level: Math.floor((userProfile.totalXP + xpEarned) / 500) + 1,
      lessonsCompleted: [...userProfile.lessonsCompleted, currentLesson.id]
    });
    
    setShowQuiz(false);
    setScreen('home');
    setCurrentLesson(null);
  };

  if (screen === 'onboarding') {
    return (
      <OnboardingScreen
        onComplete={handleOnboardingComplete}
        language={language}
        setLanguage={setLanguage}
      />
    );
  }

  if (screen === 'lesson' && currentLesson) {
    if (showQuiz) {
      return (
        <QuizScreen
          lesson={currentLesson}
          onComplete={handleQuizComplete}
          language={language}
          setLanguage={setLanguage}
        />
      );
    }
    return (
      <LessonPlayer
        lesson={currentLesson}
        onComplete={handleLessonComplete}
        language={language}
        setLanguage={setLanguage}
      />
    );
  }

  if (screen === 'chatbot') {
    return (
      <div className="min-h-screen flex flex-col">
        <ChatbotScreen language={language} setLanguage={setLanguage} />
        <BottomNav screen={screen} setScreen={setScreen} language={language} />
      </div>
    );
  }

  if (screen === 'rewards') {
    return (
      <div className="min-h-screen flex flex-col">
        <RewardsScreen
          userProfile={userProfile}
          language={language}
          setLanguage={setLanguage}
        />
        <BottomNav screen={screen} setScreen={setScreen} language={language} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 bg-gray-50 p-6 pb-24">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 mb-6 text-white">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h1 className="text-2xl font-bold mb-1">
                  {language === 'hi' ? 'नमस्ते! 👋' : 'Hello! 👋'}
                </h1>
                <p className="opacity-90">
                  {language === 'hi'
                    ? 'आज क्या सीखना चाहेंगे?'
                    : 'What would you like to learn today?'}
                </p>
              </div>
              <LanguageToggle language={language} setLanguage={setLanguage} />
            </div>
            <div className="flex items-center gap-4 mt-4">
              <div className="bg-white/20 rounded-lg px-4 py-2">
                <p className="text-sm opacity-90">XP</p>
                <p className="text-xl font-bold">{userProfile.totalXP}</p>
              </div>
              <div className="bg-white/20 rounded-lg px-4 py-2">
                <p className="text-sm opacity-90">
                  {language === 'hi' ? 'स्ट्रीक' : 'Streak'}
                </p>
                <p className="text-xl font-bold">{userProfile.streak} 🔥</p>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-bold mb-4">
            {language === 'hi' ? 'आपके लिए पाठ' : 'Lessons for you'}
          </h2>
          <div className="space-y-3">
            {lessons.map(lesson => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                onClick={() => handleLessonClick(lesson)}
              />
            ))}
          </div>
        </div>
      </div>
      <BottomNav screen={screen} setScreen={setScreen} language={language} />
    </div>
  );
};

const BottomNav = ({ screen, setScreen, language }) => (
  <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
    <div className="flex justify-around items-center h-16">
      <button
        onClick={() => setScreen('home')}
        className={`flex flex-col items-center justify-center flex-1 h-full ${
          screen === 'home' ? 'text-green-600' : 'text-gray-400'
        }`}
      >
        <Home className="w-6 h-6 mb-1" />
        <span className="text-xs">
          {language === 'hi' ? 'होम' : 'Home'}
        </span>
      </button>
      <button
        onClick={() => setScreen('chatbot')}
        className={`flex flex-col items-center justify-center flex-1 h-full ${
          screen === 'chatbot' ? 'text-green-600' : 'text-gray-400'
        }`}
      >
        <MessageCircle className="w-6 h-6 mb-1" />
        <span className="text-xs">
          {language === 'hi' ? 'मित्रा' : 'Mitra'}
        </span>
      </button>
      <button
        onClick={() => setScreen('rewards')}
        className={`flex flex-col items-center justify-center flex-1 h-full ${
          screen === 'rewards' ? 'text-green-600' : 'text-gray-400'
        }`}
      >
        <Award className="w-6 h-6 mb-1" />
        <span className="text-xs">
          {language === 'hi' ? 'इनाम' : 'Rewards'}
        </span>
      </button>
    </div>
  </div>
);

export default MainApp;