import React from 'react';
import { Award, Zap } from 'lucide-react';
import LanguageToggle from '../components/LanguageToggle';

const RewardsScreen = ({ userProfile, language, setLanguage }) => {
  const badges = [
    { id: 'first_lesson', name: 'पहला कदम', nameEn: 'First Step', icon: '🎯', earned: true },
    { id: 'quiz_master', name: 'क्विज़ मास्टर', nameEn: 'Quiz Master', icon: '🏆', earned: true },
    { id: 'week_warrior', name: '7 दिन स्ट्रीक', nameEn: '7 Day Streak', icon: '🔥', earned: true },
    { id: 'perfect_score', name: 'परफेक्ट स्कोर', nameEn: 'Perfect Score', icon: '💯', earned: false },
    { id: 'month_master', name: '30 दिन स्ट्रीक', nameEn: '30 Day Streak', icon: '⭐', earned: false },
    { id: 'fin_guru', name: 'फिन गुरु', nameEn: 'Fin Guru', icon: '👑', earned: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-5 pb-24">
      <div className="max-w-md mx-auto">
        <div className="flex justify-end mb-5">
          <LanguageToggle language={language} setLanguage={setLanguage} />
        </div>
        <h2 className="text-3xl font-bold mb-6 text-gray-900 tracking-tight">
          {language === 'hi' ? 'आपके इनाम' : 'Your Rewards'}
        </h2>
        
        {/* Main Stats Card */}
        <div className="bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 rounded-3xl p-7 mb-8 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
          <div className="flex items-center justify-between mb-7 relative z-10">
            <div>
              <p className="text-[10px] opacity-90 uppercase tracking-widest mb-1.5 font-bold">
                {language === 'hi' ? 'कुल XP' : 'Total XP'}
              </p>
              <p className="text-5xl font-black">{userProfile.totalXP}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] opacity-90 uppercase tracking-widest mb-1.5 font-bold">
                {language === 'hi' ? 'लेवल' : 'Level'}
              </p>
              <p className="text-5xl font-black">{userProfile.level}</p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="relative pt-1 z-10">
            <div className="flex mb-3 items-center justify-between">
              <span className="text-xs font-bold inline-block py-1.5 px-3 uppercase rounded-full text-green-700 bg-white shadow-sm">
                Progress
              </span>
              <span className="text-sm font-bold inline-block text-white">
                {Math.round((userProfile.totalXP % 500) / 5)}%
              </span>
            </div>
            <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-green-700/30 shadow-inner">
              <div style={{ width: `${(userProfile.totalXP % 500) / 5}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-white transition-all duration-500 rounded-full"></div>
            </div>
             <p className="text-sm opacity-95 text-center font-medium">
              {language === 'hi'
                ? `${500 - (userProfile.totalXP % 500)} XP अगले लेवल तक`
                : `${500 - (userProfile.totalXP % 500)} XP to next level`}
            </p>
          </div>
        </div>
        
        {/* Streak Card */}
        <div className="bg-white rounded-2xl p-5 mb-8 shadow-lg border border-orange-200 flex items-center justify-between hover:shadow-xl transition-all duration-200">
          <div className="flex items-center gap-4">
             <div className="bg-gradient-to-br from-orange-100 to-orange-200 p-3 rounded-xl shadow-sm">
               <Zap className="text-orange-600 w-7 h-7" fill="currentColor"/>
             </div>
             <div>
               <p className="text-sm text-gray-600 font-semibold">Current Streak</p>
               <p className="text-2xl font-black text-gray-900">{userProfile.streak} Days</p>
             </div>
          </div>
          <div className="text-3xl">🔥</div>
        </div>
        
        {/* Badges Grid */}
        <h3 className="text-xl font-bold mb-5 text-gray-900 tracking-tight">
          {language === 'hi' ? 'बैज' : 'Badges'}
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {badges.map(badge => (
            <div
              key={badge.id}
              className={`bg-white rounded-2xl p-5 text-center shadow-md border transition-all duration-200 ${
                badge.earned ? 'border-green-200 opacity-100 hover:shadow-lg hover:scale-105' : 'border-gray-200 opacity-50 grayscale'
              }`}
            >
              <div className="text-5xl mb-3 filter drop-shadow-sm">{badge.icon}</div>
              <p className="text-xs font-bold text-gray-700 leading-snug">
                {language === 'hi' ? badge.name : badge.nameEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RewardsScreen;