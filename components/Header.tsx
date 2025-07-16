
import React, { useState, useEffect } from 'react';
import { SparklesIcon } from './icons/SparklesIcon';
import { KeyIcon } from './icons/KeyIcon';

interface HeaderProps {
  apiKey: string;
  onSaveApiKey: (key: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ apiKey, onSaveApiKey }) => {
  const [inputKey, setInputKey] = useState(apiKey);
  const [isEditing, setIsEditing] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    setInputKey(apiKey);
    // Automatically open edit mode if key is missing
    setIsEditing(!apiKey);
  }, [apiKey]);
  
  const handleSave = () => {
    onSaveApiKey(inputKey);
    setSaveStatus('Saved!');
    setIsEditing(false);
    setTimeout(() => setSaveStatus(''), 2000);
  };

  const handleEdit = () => {
      setSaveStatus('');
      setIsEditing(true);
  }

  return (
    <header className="bg-white shadow-md relative">
       <div className="bg-slate-700 text-white text-xs">
         <div className="container mx-auto px-4 md:px-8 py-2 flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2 font-semibold">
              <KeyIcon className="w-4 h-4 text-slate-300" />
              <span>Gemini API Key</span>
            </div>

            {apiKey && !isEditing ? (
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-green-500/20 text-green-300 rounded-full text-xs font-medium">Configured</span>
                <button 
                  onClick={handleEdit}
                  className="px-3 py-1 bg-slate-600 hover:bg-slate-500 rounded-md transition-colors text-xs"
                >
                  Change
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 w-full sm:w-auto sm:max-w-xs md:max-w-sm lg:max-w-md">
                <input 
                  type="password"
                  value={inputKey}
                  onChange={(e) => setInputKey(e.target.value)}
                  placeholder="Enter your API key here"
                  className="w-full flex-grow px-2 py-1 bg-slate-800 border border-slate-500 rounded-md text-xs focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                />
                <button 
                  onClick={handleSave}
                  className="px-3 py-1 bg-indigo-500 hover:bg-indigo-600 rounded-md transition-colors text-xs font-semibold"
                >
                  Save
                </button>
                 {apiKey && isEditing && (
                    <button onClick={() => setIsEditing(false)} className="px-3 py-1 bg-slate-600 hover:bg-slate-500 rounded-md transition-colors text-xs">
                        Cancel
                    </button>
                )}
              </div>
            )}
            {saveStatus && <span className="absolute right-4 md:right-8 top-12 text-green-500 text-xs font-semibold">{saveStatus}</span>}
         </div>
       </div>
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-center text-center">
        <SparklesIcon className="w-8 h-8 text-indigo-500 mr-3" />
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
          Syllabus & Exam Analyzer AI
        </h1>
      </div>
    </header>
  );
};
