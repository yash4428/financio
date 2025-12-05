import React, { useState } from 'react';
import { BookOpen, Award, MessageCircle } from 'lucide-react';
import LanguageToggle from '../components/LanguageToggle';

const OnboardingScreen = ({ onComplete, language, setLanguage }) => {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState({
    occupation: '',
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
        <div className="text-center text-white relative w-full max-w-md">
          <div className="absolute top-0 right-0">
            <LanguageToggle language={language} setLanguage={setLanguage} />
          </div>
          <div className="text-6xl mb-6 mt-12 animate-bounce">👋</div>
          <h1 className="text-4xl font-bold mb-4">
            {language === 'hi' ? 'नमस्ते!' : 'Hello!'}
          </h1>
          <p className="text-xl mb-2 font-medium">
            {language === 'hi' ? 'आपके वित्तीय सफर में स्वागत है' : 'Welcome to your financial journey'}
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-12 mt-8 text-left border border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-6 h-6 text-yellow-300" />
              <span>{language === 'hi' ? 'आसान भाषा में सीखें' : 'Learn in simple language'}</span>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-6 h-6 text-yellow-300" />
              <span>{language === 'hi' ? 'इनाम पाएं' : 'Earn rewards'}</span>
            </div>
            <div className="flex items-center gap-3">
              <MessageCircle className="w-6 h-6 text-yellow-300" />
              <span>{language === 'hi' ? 'मित्रा से बात करें' : 'Chat with Mitra'}</span>
            </div>
          </div>
          
          <button
            onClick={() => setStep(1)}
            className="w-full bg-white text-green-600 py-4 rounded-xl font-bold text-lg shadow-xl hover:bg-gray-50 transition-colors"
          >
            {language === 'hi' ? 'शुरू करें' : 'Start'}
          </button>
        </div>
      </div>
    );
  }

  // Step 1: Occupation
  if (step === 1) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex flex-col">
        <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
          <div className="flex justify-end mb-4">
            <LanguageToggle language={language} setLanguage={setLanguage} />
          </div>
          <h2 className="text-3xl font-bold mb-2 text-gray-800">
            {language === 'hi' ? 'आप क्या करते हैं?' : 'What do you do?'}
          </h2>
          <div className="w-full bg-gray-200 h-2 rounded-full mt-4 mb-8">
            <div className="bg-green-500 h-2 rounded-full transition-all duration-500" style={{ width: '33%' }}></div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            {occupations.map(occ => (
              <button
                key={occ.id}
                onClick={() => setProfile({ ...profile, occupation: occ.id })}
                className={`p-6 rounded-xl border-2 transition-all ${
                  profile.occupation === occ.id
                    ? 'border-green-500 bg-green-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-green-300'
                }`}
              >
                <div className="text-4xl mb-3">{occ.icon}</div>
                <div className="font-semibold text-gray-700">{occ.label}</div>
              </button>
            ))}
          </div>
          
          <div className="mt-auto">
            <button
              onClick={() => setStep(2)}
              disabled={!profile.occupation}
              className="w-full bg-green-500 text-white py-4 rounded-xl font-bold disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg"
            >
              {language === 'hi' ? 'आगे बढ़ें' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Details
  if (step === 2) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex flex-col">
        <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
          <div className="flex justify-end mb-4">
            <LanguageToggle language={language} setLanguage={setLanguage} />
          </div>
          <h2 className="text-3xl font-bold mb-2 text-gray-800">
            {language === 'hi' ? 'थोड़ी और जानकारी' : 'One last step'}
          </h2>
          <div className="w-full bg-gray-200 h-2 rounded-full mt-4 mb-8">
            <div className="bg-green-500 h-2 rounded-full transition-all duration-500" style={{ width: '80%' }}></div>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-semibold mb-3 text-gray-700">
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
                        ? 'border-green-500 bg-green-50 text-green-700 font-medium'
                        : 'border-gray-200 bg-white hover:border-green-300 text-gray-600'
                    }`}
                  >
                    {edu.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-lg font-semibold mb-3 text-gray-700">
                {language === 'hi' ? 'वार्षिक आय' : 'Annual Income'}
              </label>
              <div className="space-y-2">
                {[
                  { id: 'below_50k', label: '< ₹50,000' },
                  { id: '50k_1l', label: '₹50,000 - ₹1,00,000' },
                  { id: 'above_1l', label: '> ₹1,00,000' }
                ].map(inc => (
                  <button
                    key={inc.id}
                    onClick={() => setProfile({ ...profile, income: inc.id })}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      profile.income === inc.id
                        ? 'border-green-500 bg-green-50 text-green-700 font-medium'
                        : 'border-gray-200 bg-white hover:border-green-300 text-gray-600'
                    }`}
                  >
                    {inc.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-8 pb-8">
            <button
              onClick={handleComplete}
              disabled={!profile.education || !profile.income}
              className="w-full bg-green-500 text-white py-4 rounded-xl font-bold disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg"
            >
              {language === 'hi' ? 'सीखना शुरू करें' : 'Start Learning'}
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default OnboardingScreen;