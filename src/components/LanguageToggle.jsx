import React from 'react';

const LanguageToggle = ({ language, setLanguage }) => {
  return (
    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm p-1 rounded-full">
      <button
        onClick={() => setLanguage('hi')}
        className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
          language === 'hi' ? 'bg-white text-green-600 shadow-sm' : 'text-white hover:bg-white/10'
        }`}
      >
        🇮🇳 HI
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
          language === 'en' ? 'bg-white text-green-600 shadow-sm' : 'text-white hover:bg-white/10'
        }`}
      >
        EN 🇬🇧
      </button>
    </div>
  );
};

export default LanguageToggle;