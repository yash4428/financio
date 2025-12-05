import React, { useState } from 'react';
import { Volume2, StopCircle } from 'lucide-react';

const VoiceAssistant = ({ text, language }) => {
  const [speaking, setSpeaking] = useState(false);

  const speak = () => {
    if (!text) return;
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.9;
    
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  return (
    <button 
      onClick={speaking ? stop : speak}
      className={`p-2 rounded-full transition-all flex items-center gap-2 shadow-sm ${
        speaking ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-green-100 text-green-700 hover:bg-green-200'
      }`}
      title="Listen to this text"
    >
      {speaking ? <StopCircle size={20} /> : <Volume2 size={20} />}
      <span className="text-xs font-bold hidden sm:inline">
        {speaking ? (language === 'hi' ? 'रोकें' : 'Stop') : (language === 'hi' ? 'सुनें' : 'Listen')}
      </span>
    </button>
  );
};

export default VoiceAssistant;