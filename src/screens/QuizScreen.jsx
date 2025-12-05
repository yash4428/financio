import React, { useState } from 'react';
import { Check, X, Award } from 'lucide-react';
import LanguageToggle from '../components/LanguageToggle';

const QuizScreen = ({ lesson, onComplete, language, setLanguage }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleAnswer = (optionIndex) => {
    setSelectedOption(optionIndex);
    const isCorrect = optionIndex === lesson.quiz[currentQ].correct;
    
    setTimeout(() => {
      const newAnswers = [...answers, isCorrect];
      setAnswers(newAnswers);
      
      if (currentQ < lesson.quiz.length - 1) {
        setCurrentQ(currentQ + 1);
        setSelectedOption(null);
      } else {
        setShowResult(true);
      }
    }, 1200);
  };

  const correctCount = answers.filter(a => a).length;
  const score = Math.round((correctCount / lesson.quiz.length) * 100);

  if (showResult) {
    const xpEarned = Math.round((score / 100) * lesson.xp);
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-500 to-green-700 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl animate-in zoom-in duration-300">
          <div className="text-7xl mb-4 animate-bounce">
            {score >= 80 ? '🎉' : score >= 60 ? '😊' : '💪'}
          </div>
          <h2 className="text-3xl font-bold mb-2 text-gray-800">
            {language === 'hi'
              ? (score >= 80 ? 'बहुत बढ़िया!' : score >= 60 ? 'अच्छा!' : 'अच्छी कोशिश!')
              : (score >= 80 ? 'Excellent!' : score >= 60 ? 'Good job!' : 'Nice try!')}
          </h2>
          
          <div className="bg-green-50 rounded-xl p-6 mb-6 mt-6 border border-green-100">
            <div className="text-5xl font-bold text-green-600 mb-2">{score}%</div>
            <p className="text-gray-600 font-medium">
              {language === 'hi'
                ? `${lesson.quiz.length} में से ${correctCount} सही`
                : `${correctCount} / ${lesson.quiz.length} correct`}
            </p>
          </div>
          
          <div className="flex items-center justify-center gap-2 bg-amber-50 text-amber-700 rounded-lg p-3 mb-8 border border-amber-100">
            <Award className="w-5 h-5" />
            <span className="font-bold">
              {language === 'hi' ? `+${xpEarned} XP अर्जित` : `+${xpEarned} XP earned`}
            </span>
          </div>
          
          <button
            onClick={() => onComplete(score, xpEarned)}
            className="w-full bg-green-500 text-white py-4 rounded-xl font-bold hover:bg-green-600 transition-colors shadow-lg"
          >
            {language === 'hi' ? 'जारी रखें' : 'Continue'}
          </button>
        </div>
      </div>
    );
  }

  const question = lesson.quiz[currentQ];
  const qText = language === 'hi' ? question.question : (question.questionEn || question.question);
  const qExplanation = language === 'hi' ? question.explanation : (question.explanationEn || question.explanation);
  const qOptions = language === 'hi' ? question.options : (question.optionsEn || question.options);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-md mx-auto">
        <div className="flex justify-end mb-4">
          <LanguageToggle language={language} setLanguage={setLanguage} />
        </div>
        
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
            <span>
              {language === 'hi'
                ? `प्रश्न ${currentQ + 1} / ${lesson.quiz.length}`
                : `Question ${currentQ + 1} / ${lesson.quiz.length}`}
            </span>
          </div>
          <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
            <div
              className="bg-green-500 h-full transition-all duration-500 ease-out"
              style={{ width: `${((currentQ) / lesson.quiz.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-md border border-gray-100">
          <h3 className="text-xl font-bold mb-6 text-gray-800 leading-relaxed">
            {qText}
          </h3>
          
          <div className="space-y-3">
            {qOptions.map((option, index) => {
              let buttonClass = "w-full p-4 rounded-xl border-2 text-left transition-all relative ";
              
              if (selectedOption === null) {
                buttonClass += "border-gray-200 bg-white hover:border-green-300 hover:bg-green-50";
              } else if (index === question.correct) {
                buttonClass += "border-green-500 bg-green-50 shadow-sm";
              } else if (index === selectedOption) {
                buttonClass += "border-red-500 bg-red-50";
              } else {
                buttonClass += "border-gray-100 bg-gray-50 opacity-50";
              }
              
              return (
                <button
                  key={index}
                  onClick={() => selectedOption === null && handleAnswer(index)}
                  disabled={selectedOption !== null}
                  className={buttonClass}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      selectedOption === null ? 'border-gray-300' :
                      index === question.correct ? 'border-green-500 bg-green-500' :
                      index === selectedOption ? 'border-red-500 bg-red-500' :
                      'border-gray-300'
                    }`}>
                      {index === question.correct && selectedOption !== null && <Check className="w-3 h-3 text-white" />}
                      {index === selectedOption && index !== question.correct && <X className="w-3 h-3 text-white" />}
                    </div>
                    <span className="font-medium text-gray-700">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>
          
          {selectedOption !== null && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100 animate-in fade-in slide-in-from-bottom-2">
              <p className="text-sm text-blue-800 font-medium">
                <span className="block font-bold mb-1">💡 Info:</span>
                {qExplanation}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;