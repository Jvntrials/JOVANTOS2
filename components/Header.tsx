
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';
import { InfoIcon } from './icons/InfoIcon';

interface HeaderProps {
  isApiKeyMissing: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isApiKeyMissing }) => {
  return (
    <header className="bg-white shadow-md relative">
       {isApiKeyMissing && (
        <div className="bg-sky-500 text-white text-xs text-center p-1.5 font-semibold" role="alert">
          <div className="container mx-auto flex items-center justify-center gap-2 px-4">
            <InfoIcon className="w-4 h-4 flex-shrink-0" />
            <span>Demo Mode: Configure your API_KEY to analyze your own content.</span>
          </div>
        </div>
      )}
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-center text-center">
        <SparklesIcon className="w-8 h-8 text-indigo-500 mr-3" />
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
          Syllabus & Exam Analyzer AI
        </h1>
      </div>
    </header>
  );
};
