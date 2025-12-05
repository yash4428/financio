import React from 'react';
import { BookOpen, Award, Check } from 'lucide-react';

const LessonCard = ({ lesson, onClick, language }) => (
  <button
    onClick={onClick}
    className="w-full bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-200 text-left border border-gray-100 active:scale-[0.98] hover:scale-[1.01] hover:border-green-200 group"
  >
    <div className="flex items-start justify-between mb-4">
      <div className="flex-1 pr-3">
        <h3 className="font-bold text-lg mb-1.5 text-gray-900 group-hover:text-green-600 transition-colors leading-snug">
          {language === 'en' ? lesson.titleEn : lesson.title}
        </h3>
        <p className="text-sm text-gray-500 font-medium">
          {language === 'en' ? lesson.title : lesson.titleEn}
        </p>
      </div>
      {lesson.completed && (
        <div className="bg-green-100 text-green-600 rounded-full p-2.5 shrink-0 shadow-sm">
          <Check className="w-5 h-5" strokeWidth={3} />
        </div>
      )}
    </div>
    <div className="flex items-center gap-5 text-sm text-gray-600 font-semibold">
      <span className="flex items-center gap-1.5">
        <BookOpen className="w-4 h-4" />
        {lesson.duration}
      </span>
      <span className="flex items-center gap-1.5 text-amber-600">
        <Award className="w-4 h-4" />
        {lesson.xp} XP
      </span>
    </div>
  </button>
);

export default LessonCard;