import React, { useState } from 'react';
import { SORTING_GAME_DATA } from '../data/mockData';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';

const SortingGameScreen = ({ onBack, language }) => {
  const [items, setItems] = useState([...SORTING_GAME_DATA.items]);
  const [currentItem, setCurrentItem] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null); // 'correct' or 'wrong'

  const handleSwipe = (category) => {
    const item = items[currentItem];
    const isCorrect = item.category === category;

    setFeedback(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) setScore(score + 10);

    setTimeout(() => {
      setFeedback(null);
      if (currentItem < items.length - 1) {
        setCurrentItem(currentItem + 1);
      } else {
        // End game
        setCurrentItem(-1);
      }
    }, 800);
  };

  // Game Over Screen
  if (currentItem === -1) {
    return (
      <div className="min-h-screen bg-blue-600 flex flex-col items-center justify-center p-6 text-white">
        <h2 className="text-4xl font-bold mb-4">🎉 {language === 'hi' ? 'खेल समाप्त!' : 'Well Done!'}</h2>
        <p className="text-2xl mb-8">Score: {score}</p>
        <button onClick={onBack} className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold shadow-xl">
          Back Home
        </button>
      </div>
    );
  }

  const item = items[currentItem];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-4">
      <div className="flex justify-between items-center mb-4">
         <button onClick={onBack} className="p-2 bg-white rounded-full shadow-sm"><ArrowLeft size={20}/></button>
         <div className="font-bold text-gray-600">Score: {score}</div>
      </div>

      <h2 className="text-center text-xl font-bold text-gray-800 mb-2">
        {language === 'hi' ? SORTING_GAME_DATA.titleHi : SORTING_GAME_DATA.title}
      </h2>
      <p className="text-center text-gray-500 mb-8 text-sm">
        {language === 'hi' ? SORTING_GAME_DATA.instructionHi : SORTING_GAME_DATA.instruction}
      </p>

      {/* The Card */}
      <div className="flex-1 flex flex-col items-center justify-center relative">
        <div className={`w-64 h-80 bg-white rounded-3xl shadow-2xl flex flex-col items-center justify-center border-4 transition-all transform duration-300 ${
          feedback === 'correct' ? 'border-green-500 scale-110' : 
          feedback === 'wrong' ? 'border-red-500 rotate-12' : 'border-white'
        }`}>
           <div className="text-6xl mb-4">{item.icon}</div>
           <h3 className="text-2xl font-bold text-gray-800">{language === 'hi' ? item.nameHi : item.name}</h3>
           
           {feedback && (
             <div className="absolute inset-0 bg-white/80 rounded-2xl flex items-center justify-center">
               {feedback === 'correct' ? <CheckCircle size={80} className="text-green-500" /> : <XCircle size={80} className="text-red-500" />}
             </div>
           )}
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-2 gap-6 mt-8 mb-8 max-w-sm mx-auto w-full">
        <button 
          onClick={() => handleSwipe('need')}
          className="bg-green-500 text-white p-4 rounded-2xl font-bold text-lg shadow-lg active:scale-95 transition-transform"
        >
          {language === 'hi' ? 'ज़रूरत (Need)' : 'Need'}
        </button>
        <button 
          onClick={() => handleSwipe('want')}
          className="bg-purple-500 text-white p-4 rounded-2xl font-bold text-lg shadow-lg active:scale-95 transition-transform"
        >
          {language === 'hi' ? 'चाहत (Want)' : 'Want'}
        </button>
      </div>
    </div>
  );
};

export default SortingGameScreen;