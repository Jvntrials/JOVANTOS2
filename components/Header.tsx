
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';
import { KeyIcon } from './icons/KeyIcon';

interface HeaderProps {
  onClearApiKey: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onClearApiKey }) => {
  return (
    <header className="bg-white shadow-md relative">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex-1"></div>
        <div className="flex items-center justify-center flex-grow">
          <SparklesIcon className="w-8 h-8 text-indigo-500 mr-3" />
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight text-center">
            Syllabus & Exam Analyzer AI
          </h1>
        </div>
        <div className="flex-1 flex justify-end">
          <button
            onClick={onClearApiKey}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-md hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-500 transition-colors"
            aria-label="Change API Key"
          >
            <KeyIcon className="w-5 h-5" />
            <span>Change Key</span>
          </button>
        </div>
      </div>
    </header>
  );
};
