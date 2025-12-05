import React, { useState, useEffect } from 'react';
import { Play, Pause, BookOpen } from 'lucide-react';
import VoiceAssistant from '../components/VoiceAssistant';
import LanguageToggle from '../components/LanguageToggle';

const LessonPlayer = ({ lesson, onComplete, language, setLanguage }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // Safely get text based on language
  const currentText = language === 'hi' ? lesson.content.text : (lesson.content.textEn || lesson.content.text);
  const currentTitle = language === 'hi' ? lesson.title : (lesson.titleEn || lesson.title);

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 1; // Slower progress for realism
        });
      }, 50);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-5 pb-24">
      <div className="max-w-md mx-auto">
        <div className="bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 rounded-3xl p-7 mb-8 text-white shadow-xl">
          <div className="flex items-start justify-between mb-5">
            <h2 className="text-2xl font-bold leading-tight flex-1 mr-4 tracking-tight">
              {currentTitle}
            </h2>
            <LanguageToggle language={language} setLanguage={setLanguage} />
          </div>
          <div className="flex items-center gap-2 text-sm opacity-95 bg-white/20 backdrop-blur-sm w-fit px-4 py-2 rounded-full font-medium">
            <BookOpen size={16} />
            {lesson.duration}
          </div>
        </div>

        {/* Content Card with Voice */}
        <div className="bg-white rounded-2xl p-7 mb-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-7 pb-5 border-b border-gray-200">
             <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-green-100 text-green-600 p-3.5 rounded-full hover:bg-green-200 transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
                >
                  {isPlaying ? <Pause size={22} /> : <Play size={22} />}
                </button>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                    Audio Player
                  </span>
                  <div className="w-28 h-1.5 bg-gray-200 rounded-full">
                    <div className="h-full bg-green-500 rounded-full transition-all duration-300" style={{width: `${progress}%`}}></div>
                  </div>
                </div>
             </div>
             <VoiceAssistant text={currentText} language={language} />
          </div>

          <p className="text-gray-800 leading-relaxed text-lg font-medium">
            {currentText}
          </p>
        </div>

        {/* Illustration Placeholder */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 shadow-sm mb-8 border border-gray-200 flex flex-col items-center justify-center text-gray-400 h-44">
           <BookOpen size={48} className="mb-3 opacity-40"/>
           <span className="text-xs uppercase tracking-widest font-semibold">Illustration</span>
        </div>

        <button
          onClick={onComplete}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-5 rounded-2xl font-bold hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 transform text-lg"
        >
          {language === 'hi' ? 'क्विज़ शुरू करें' : 'Start Quiz'}
        </button>
      </div>
    </div>
  );
};

export default LessonPlayer;