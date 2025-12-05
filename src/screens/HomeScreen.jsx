import React from 'react';
import { ShieldCheck, Calculator, Gamepad2 } from 'lucide-react'; 
import LanguageToggle from '../components/LanguageToggle';
import LessonCard from '../components/LessonCard';

const HomeScreen = ({ userProfile, lessons, onLessonClick, onStartGame, onOpenTools, language, setLanguage }) => {
  return (
    <div className="flex-1 bg-gradient-to-b from-gray-50 to-white p-5 pb-24">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 rounded-3xl p-7 mb-8 text-white shadow-xl relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white/5 rounded-full blur-xl"></div>
          
          <div className="flex items-start justify-between mb-3 relative z-10">
            <div>
              <h1 className="text-3xl font-bold mb-1.5 tracking-tight">
                {language === 'hi' ? 'नमस्ते! 👋' : 'Hello! 👋'}
              </h1>
              <p className="opacity-95 text-sm font-medium">
                {language === 'hi' ? 'आज क्या सीखना चाहेंगे?' : 'What would you like to learn?'}
              </p>
            </div>
            <LanguageToggle language={language} setLanguage={setLanguage} />
          </div>
          
          {/* Stats Row */}
          <div className="flex items-center gap-3 mt-7 relative z-10">
            <div className="bg-white/25 backdrop-blur-lg rounded-xl px-5 py-3 flex-1 text-center border border-white/20 shadow-lg hover:bg-white/30 transition-all duration-200">
              <p className="text-[10px] opacity-90 uppercase tracking-widest font-bold mb-1">XP</p>
              <p className="text-2xl font-black">{userProfile.totalXP}</p>
            </div>
            <div className="bg-white/25 backdrop-blur-lg rounded-xl px-5 py-3 flex-1 text-center border border-white/20 shadow-lg hover:bg-white/30 transition-all duration-200">
              <p className="text-[10px] opacity-90 uppercase tracking-widest font-bold mb-1">
                {language === 'hi' ? 'स्ट्रीक' : 'Streak'}
              </p>
              <p className="text-2xl font-black">{userProfile.streak} 🔥</p>
            </div>
          </div>
        </div>

        {/* --- FEATURES & GAMES SECTION (New Features, Old Look) --- */}
        <h2 className="text-xl font-bold mb-4 text-gray-900 px-1 tracking-tight">
          {language === 'hi' ? 'सुविधाएं और खेल' : 'Tools & Games'}
        </h2>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          {/* Games Button */}
          <button 
            onClick={onStartGame}
            className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 shadow-lg text-white flex flex-col items-center justify-center gap-3 hover:shadow-xl hover:scale-[1.02] transition-all duration-200 active:scale-95 border border-blue-400/20 min-h-[130px]"
          >
            <div className="bg-white/25 p-3 rounded-full backdrop-blur-sm">
              <Gamepad2 size={28} strokeWidth={2.5} />
            </div>
            <div className="text-center">
              <span className="block font-bold text-base mb-0.5">
                {language === 'hi' ? 'खेल खेलें' : 'Play Games'}
              </span>
              <span className="text-xs opacity-90 font-medium">Fraud & Needs</span>
            </div>
          </button>

          {/* Calculator Button */}
          <button 
            onClick={onOpenTools}
            className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-5 shadow-lg text-white flex flex-col items-center justify-center gap-3 hover:shadow-xl hover:scale-[1.02] transition-all duration-200 active:scale-95 border border-purple-400/20 min-h-[130px]"
          >
            <div className="bg-white/25 p-3 rounded-full backdrop-blur-sm">
              <Calculator size={28} strokeWidth={2.5} />
            </div>
            <div className="text-center">
              <span className="block font-bold text-base mb-0.5">
                {language === 'hi' ? 'कैलकुलेटर' : 'Calculator'}
              </span>
              <span className="text-xs opacity-90 font-medium">Interest Rate</span>
            </div>
          </button>
        </div>
        
        {/* --- LESSONS LIST (Restored List View) --- */}
        <h2 className="text-xl font-bold mb-5 text-gray-900 px-1 tracking-tight">
          {language === 'hi' ? 'आपके लिए पाठ' : 'Recommended Lessons'}
        </h2>
        
        <div className="space-y-4">
          {lessons.map(lesson => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              language={language}
              onClick={() => onLessonClick(lesson)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;