import React, { useState } from 'react';
import { Calculator, ArrowLeft, RefreshCw } from 'lucide-react';
import LanguageToggle from '../components/LanguageToggle';

const ToolsScreen = ({ onBack, language, setLanguage }) => {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [months, setMonths] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    if (amount && rate && months) {
      const p = parseFloat(amount);
      const r = parseFloat(rate);
      const t = parseFloat(months);
      const interest = (p * r * t) / 100;
      setResult(interest);
    }
  };

  const reset = () => {
    setAmount('');
    setRate('');
    setMonths('');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button onClick={onBack} className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100">
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-xl font-bold">{language === 'hi' ? 'ब्याज कैलकुलेटर' : 'Interest Calculator'}</h2>
          <LanguageToggle language={language} setLanguage={setLanguage} />
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1">
                {language === 'hi' ? 'मूल राशि (₹)' : 'Principal Amount (₹)'}
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none font-bold text-lg"
                placeholder="10000"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-1">
                  {language === 'hi' ? 'दर (% प्रति माह)' : 'Rate (% per month)'}
                </label>
                <input
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none font-bold text-lg"
                  placeholder="2"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-1">
                  {language === 'hi' ? 'समय (महीने)' : 'Time (Months)'}
                </label>
                <input
                  type="number"
                  value={months}
                  onChange={(e) => setMonths(e.target.value)}
                  className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none font-bold text-lg"
                  placeholder="6"
                />
              </div>
            </div>

            <button
              onClick={calculate}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-blue-700 active:scale-95 transition-all mt-2"
            >
              {language === 'hi' ? 'गिनाई करें (Calculate)' : 'Calculate Interest'}
            </button>
          </div>

          {result !== null && (
            <div className="mt-8 pt-6 border-t border-dashed border-gray-200 text-center animate-in fade-in slide-in-from-bottom-4">
              <p className="text-gray-500 text-sm font-medium mb-1">
                {language === 'hi' ? 'कुल ब्याज' : 'Total Interest to Pay'}
              </p>
              <h3 className="text-4xl font-black text-blue-600 mb-2">₹{result.toFixed(0)}</h3>
              <div className="bg-blue-50 text-blue-800 p-3 rounded-lg text-sm font-medium inline-block">
                {language === 'hi' 
                  ? `कुल वापसी: ₹${(parseFloat(amount) + result).toFixed(0)}` 
                  : `Total Repayment: ₹${(parseFloat(amount) + result).toFixed(0)}`}
              </div>
              <button onClick={reset} className="flex items-center justify-center gap-2 mx-auto mt-4 text-gray-400 hover:text-gray-600">
                <RefreshCw size={14} /> Reset
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolsScreen;