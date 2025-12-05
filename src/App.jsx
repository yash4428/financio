import React, { useState } from 'react';
import { LESSONS } from './data/mockData';
import OfflineIndicator from './components/OfflineIndicator';
import OnboardingScreen from './screens/OnboardingScreen';
import HomeScreen from './screens/HomeScreen';
import LessonPlayer from './screens/LessonPlayer';
import QuizScreen from './screens/QuizScreen';
import ChatbotScreen from './screens/ChatbotScreen';
import RewardsScreen from './screens/RewardsScreen';
import ScenarioScreen from './screens/ScenarioScreen';
import SortingGameScreen from './screens/SortingGameScreen'; // <--- NEW IMPORT
import ToolsScreen from './screens/ToolsScreen';             // <--- NEW IMPORT
import BottomNav from './components/BottomNav';

const MainApp = () => {
  const [screen, setScreen] = useState('onboarding');
  const [language, setLanguage] = useState('hi');
  const [currentLesson, setCurrentLesson] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  
  const [userProfile, setUserProfile] = useState({
    occupation: '',
    education: '',
    income: '',
    totalXP: 180,
    level: 2,
    streak: 7,
    lessonsCompleted: []
  });

  const [lessons, setLessons] = useState(LESSONS.farmer);

  const handleOnboardingComplete = (profile) => {
    setUserProfile({ ...userProfile, ...profile });
    setScreen('home');
  };

  const handleLessonClick = (lesson) => {
    setCurrentLesson(lesson);
    setScreen('lesson');
  };

  const handleQuizComplete = (score, xpEarned) => {
    const updatedLessons = lessons.map(l => 
      l.id === currentLesson.id ? { ...l, completed: true } : l
    );
    setLessons(updatedLessons);
    setUserProfile({
      ...userProfile,
      totalXP: userProfile.totalXP + xpEarned,
      level: Math.floor((userProfile.totalXP + xpEarned) / 500) + 1,
      lessonsCompleted: [...userProfile.lessonsCompleted, currentLesson.id]
    });
    setShowQuiz(false);
    setScreen('home');
    setCurrentLesson(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 overflow-x-hidden selection:bg-green-100">
      
      {screen !== 'onboarding' && <OfflineIndicator />}

      {screen === 'onboarding' && (
        <OnboardingScreen 
          onComplete={handleOnboardingComplete} 
          language={language} 
          setLanguage={setLanguage} 
        />
      )}

      {screen === 'home' && (
        <>
          <HomeScreen 
            userProfile={userProfile}
            lessons={lessons}
            onLessonClick={handleLessonClick}
            onStartGame={() => setScreen('game_menu')} // We can make a menu, or just trigger one game for now
            onOpenTools={() => setScreen('tools')}
            language={language}
            setLanguage={setLanguage}
          />
          <BottomNav screen={screen} setScreen={setScreen} language={language} />
        </>
      )}

      {/* GAME ROUTING */}
      {screen === 'game_menu' && (
         // Simple Interim Menu for games
         <div className="min-h-screen bg-gray-100 p-6 flex flex-col justify-center gap-4">
             <button onClick={() => setScreen('scenario_game')} className="bg-blue-600 text-white p-6 rounded-2xl text-xl font-bold shadow-lg">🕵️ Fraud Detector</button>
             <button onClick={() => setScreen('sorting_game')} className="bg-purple-600 text-white p-6 rounded-2xl text-xl font-bold shadow-lg">⚖️ Needs vs Wants</button>
             <button onClick={() => setScreen('home')} className="text-gray-500 font-bold mt-4">Cancel</button>
         </div>
      )}

      {screen === 'scenario_game' && (
        <ScenarioScreen onBack={() => setScreen('home')} language={language} setLanguage={setLanguage} />
      )}

      {screen === 'sorting_game' && (
        <SortingGameScreen onBack={() => setScreen('home')} language={language} />
      )}

      {screen === 'tools' && (
        <ToolsScreen onBack={() => setScreen('home')} language={language} setLanguage={setLanguage} />
      )}

      {/* EXISTING ROUTES */}
      {screen === 'lesson' && currentLesson && (
        showQuiz ? (
          <QuizScreen lesson={currentLesson} onComplete={handleQuizComplete} language={language} setLanguage={setLanguage}/>
        ) : (
          <LessonPlayer lesson={currentLesson} onComplete={() => setShowQuiz(true)} language={language} setLanguage={setLanguage} />
        )
      )}

      {screen === 'chatbot' && (
        <>
          <ChatbotScreen language={language} setLanguage={setLanguage} />
          <BottomNav screen={screen} setScreen={setScreen} language={language} />
        </>
      )}

      {screen === 'rewards' && (
        <>
          <RewardsScreen userProfile={userProfile} language={language} setLanguage={setLanguage} />
          <BottomNav screen={screen} setScreen={setScreen} language={language} />
        </>
      )}
    </div>
  );
};

export default MainApp;