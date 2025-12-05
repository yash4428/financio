import React from 'react';
import { Home, MessageCircle, Award } from 'lucide-react';

const BottomNav = ({ screen, setScreen, language }) => (
  <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-[0_-4px_12px_-2px_rgba(0,0,0,0.08)] z-40">
    <div className="flex justify-around items-center h-18 max-w-md mx-auto px-2">
      <button
        onClick={() => setScreen('home')}
        className={`flex flex-col items-center justify-center flex-1 h-full py-2 px-3 rounded-xl transition-all duration-200 ${
          screen === 'home' ? 'text-green-600 bg-green-50' : 'text-gray-500 hover:text-green-500 hover:bg-gray-50'
        }`}
      >
        <Home className={`w-6 h-6 mb-1 transition-transform ${
          screen === 'home' ? 'scale-110' : ''
        }`} strokeWidth={screen === 'home' ? 2.5 : 2} />
        <span className="text-xs font-semibold">
          {language === 'hi' ? 'होम' : 'Home'}
        </span>
      </button>
      <button
        onClick={() => setScreen('chatbot')}
        className={`flex flex-col items-center justify-center flex-1 h-full py-2 px-3 rounded-xl transition-all duration-200 ${
          screen === 'chatbot' ? 'text-green-600 bg-green-50' : 'text-gray-500 hover:text-green-500 hover:bg-gray-50'
        }`}
      >
        <MessageCircle className={`w-6 h-6 mb-1 transition-transform ${
          screen === 'chatbot' ? 'scale-110' : ''
        }`} strokeWidth={screen === 'chatbot' ? 2.5 : 2} />
        <span className="text-xs font-semibold">
          {language === 'hi' ? 'मित्रा' : 'Mitra'}
        </span>
      </button>
      <button
        onClick={() => setScreen('rewards')}
        className={`flex flex-col items-center justify-center flex-1 h-full py-2 px-3 rounded-xl transition-all duration-200 ${
          screen === 'rewards' ? 'text-green-600 bg-green-50' : 'text-gray-500 hover:text-green-500 hover:bg-gray-50'
        }`}
      >
        <Award className={`w-6 h-6 mb-1 transition-transform ${
          screen === 'rewards' ? 'scale-110' : ''
        }`} strokeWidth={screen === 'rewards' ? 2.5 : 2} />
        <span className="text-xs font-semibold">
          {language === 'hi' ? 'इनाम' : 'Rewards'}
        </span>
      </button>
    </div>
  </div>
);

export default BottomNav;