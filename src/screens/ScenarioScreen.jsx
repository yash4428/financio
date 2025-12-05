import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, Check, X, MessageSquare, Phone } from 'lucide-react';
import { SCENARIOS } from '../data/mockData';
import LanguageToggle from '../components/LanguageToggle';

const ScenarioScreen = ({ onBack, language, setLanguage }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentScenario = SCENARIOS[currentIndex];

  const handleChoice = (choice) => {
    // choice is boolean: true if user thinks it's a scam
    const correct = choice === currentScenario.isScam;
    setIsCorrect(correct);
    if (correct) setScore(score + 1);
    setShowResult(true);
  };

  const nextScenario = () => {
    if (currentIndex < SCENARIOS.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowResult(false);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6 text-white">
        <ShieldCheck size={80} className="text-green-400 mb-4" />
        <h2 className="text-3xl font-bold mb-2">Game Over!</h2>
        <p className="text-xl mb-6">Score: {score} / {SCENARIOS.length}</p>
        <button onClick={onBack} className="bg-green-500 px-8 py-3 rounded-full font-bold">
          Back Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="bg-blue-600 p-4 text-white flex justify-between items-center shadow-md">
        <h2 className="font-bold text-lg">Fraud Detector Game</h2>
        <LanguageToggle language={language} setLanguage={setLanguage} />
      </div>

      <div className="flex-1 p-6 flex flex-col justify-center max-w-md mx-auto w-full">
        {/* The "Phone Screen" Simulation */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-gray-800 mb-8 relative">
          <div className="bg-gray-800 p-3 flex justify-center">
            <div className="w-16 h-1 bg-gray-600 rounded-full"></div>
          </div>
          
          <div className="p-6 h-64 flex flex-col justify-center items-center bg-gray-50">
            {currentScenario.type === 'sms' ? (
              <div className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center gap-2 mb-2 border-b pb-2">
                   <MessageSquare size={16} className="text-blue-500" />
                   <span className="font-bold text-xs text-gray-500">{currentScenario.sender}</span>
                </div>
                <p className="text-gray-800 font-medium">{currentScenario.message}</p>
              </div>
            ) : (
              <div className="text-center w-full">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
                  <Phone size={32} className="text-gray-500" />
                </div>
                <h3 className="text-xl font-bold mb-1">{currentScenario.sender}</h3>
                <p className="text-sm text-gray-500">Incoming Call...</p>
                <div className="mt-4 bg-gray-100 p-3 rounded-lg text-sm italic">
                  "{currentScenario.message}"
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        {!showResult ? (
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => handleChoice(true)} // User says SCAM
              className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-xl font-bold flex flex-col items-center gap-2 shadow-lg transition-transform active:scale-95"
            >
              <ShieldAlert size={32} />
              {language === 'hi' ? 'धोखा है (Scam)' : 'It\'s a Scam!'}
            </button>
            <button 
              onClick={() => handleChoice(false)} // User says SAFE
              className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-xl font-bold flex flex-col items-center gap-2 shadow-lg transition-transform active:scale-95"
            >
              <ShieldCheck size={32} />
              {language === 'hi' ? 'सुरक्षित है (Safe)' : 'It\'s Safe'}
            </button>
          </div>
        ) : (
          <div className={`p-6 rounded-xl text-center shadow-lg animate-in slide-in-from-bottom-5 ${isCorrect ? 'bg-green-100 border-2 border-green-500' : 'bg-red-100 border-2 border-red-500'}`}>
            <div className="text-4xl mb-2">{isCorrect ? '🎉' : '❌'}</div>
            <h3 className={`text-xl font-bold mb-2 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
              {isCorrect ? 'Correct!' : 'Wrong!'}
            </h3>
            <p className="text-gray-700 mb-4">
              {language === 'hi' ? currentScenario.explanationHi : currentScenario.explanation}
            </p>
            <button onClick={nextScenario} className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold shadow-md">
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScenarioScreen;