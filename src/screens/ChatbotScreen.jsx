import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Mic, Send } from 'lucide-react';
import LanguageToggle from '../components/LanguageToggle';
import VoiceAssistant from '../components/VoiceAssistant';
import { CHAT_RESPONSES } from '../data/mockData'; // Import the cheat sheet

const ChatbotScreen = ({ language, setLanguage }) => {
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'hi' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => { scrollToBottom(); }, [messages, isTyping]);

  // --- THE FAKE INTELLIGENCE LOGIC ---
  const findSmartAnswer = (query) => {
    const lowerQuery = query.toLowerCase().trim();
    
    // Check our hardcoded list
    for (const response of CHAT_RESPONSES) {
      // If ANY trigger word is found in the user's sentence
      if (response.triggers.some(t => lowerQuery.includes(t.toLowerCase()))) {
        return language === 'hi' ? response.answerHi : response.answerEn;
      }
    }

    // Default Fallback (If you type something not in the script)
    return language === 'hi'
      ? 'माफ़ करें, मैं अभी सीख रहा हूँ। आप "लोन", "धोखा", या "बैलेंस" के बारे में पूछें।'
      : "I am still learning. Try asking about 'Loan', 'Scam', or 'Balance'.";
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage = { type: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Fake processing delay to make it look real
    setTimeout(() => {
      const answer = findSmartAnswer(userMessage.text);
      const botMessage = { type: 'bot', text: answer };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000); 
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col pb-16">
      <div className="bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 text-white p-5 shadow-xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2.5">
             <MessageCircle size={24} strokeWidth={2.5}/> Mitra AI
          </h2>
          <p className="text-xs opacity-95 font-medium mt-0.5">24/7 Financial Assistant</p>
        </div>
        <LanguageToggle language={language} setLanguage={setLanguage} />
      </div>
      
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.map((msg, idx) => {
          let displayText = msg.text;
          // Initial Greeting Fix
          if (msg.type === 'bot' && msg.text === 'hi') {
            displayText = language === 'hi' 
              ? 'नमस्ते! मैं मित्रा हूँ। मैं आपकी कैसे मदद कर सकता हूँ?' 
              : 'Hello! I am Mitra. How can I help you today?';
          }

          return (
            <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
              <div className={`max-w-[85%] rounded-2xl p-4 shadow-md ${
                msg.type === 'user' 
                  ? 'bg-gradient-to-br from-green-500 to-green-600 text-white rounded-br-none' 
                  : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'
              }`}>
                {msg.type === 'bot' && (
                  <div className="flex justify-between items-center mb-2 pb-2 border-b border-gray-200">
                    <span className="text-[10px] font-black text-green-600 tracking-wider">MITRA</span>
                    <VoiceAssistant text={displayText} language={language} />
                  </div>
                )}
                <p className="text-sm leading-relaxed font-medium">{displayText}</p>
              </div>
            </div>
          );
        })}
        {isTyping && (
           <div className="ml-4 bg-white p-3 rounded-xl w-16 shadow-sm"><div className="flex gap-1 justify-center"><div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"/> <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"/> <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"/></div></div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 bg-white border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={language === 'hi' ? 'यहाँ लिखें...' : 'Type here...'}
            className="flex-1 bg-gray-100 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button onClick={handleSend} className="bg-green-600 text-white p-3 rounded-full shadow-md">
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotScreen;