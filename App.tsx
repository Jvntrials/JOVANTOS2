
import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { ResultsTable } from './components/ResultsTable';
import { Loader } from './components/Loader';
import { analyzeSyllabusAndExam } from './services/geminiService';
import { TOSResult } from './types';
import { SYLLABUS_PLACEHOLDER, EXAM_PLACEHOLDER } from './constants';
import { ApiKeySetup } from './components/ApiKeySetup';

const App: React.FC = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const [syllabus, setSyllabus] = useState<string>('');
  const [exam, setExam] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<TOSResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedKey = localStorage.getItem('gemini_api_key');
    if (storedKey) {
      setApiKey(storedKey);
    }
  }, []);

  const handleApiKeySubmit = (newKey: string) => {
    setApiKey(newKey);
    localStorage.setItem('gemini_api_key', newKey);
  };

  const handleClearApiKey = () => {
    setApiKey('');
    localStorage.removeItem('gemini_api_key');
  };

  const handleAnalyze = useCallback(async () => {
    if (!syllabus.trim() || !exam.trim()) {
      setError('Please provide both syllabus and exam content.');
      return;
    }
    if (!apiKey) {
      setError('API Key is not configured.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await analyzeSyllabusAndExam(apiKey, syllabus, exam);
      setAnalysisResult(result);
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      
      if (errorMessage.toLowerCase().includes('api key not valid')) {
          setError('Your Gemini API Key is invalid or expired. Please enter a valid one.');
          handleClearApiKey(); // Clear the invalid key
      } else {
          setError(`${errorMessage} Please check the console for details.`);
      }
    } finally {
      setIsLoading(false);
    }
  }, [apiKey, syllabus, exam]);

  const handleUseSampleData = () => {
    setSyllabus(SYLLABUS_PLACEHOLDER);
    setExam(EXAM_PLACEHOLDER);
    setError(null);
  };
  
  const handleClear = () => {
    setSyllabus('');
    setExam('');
    setAnalysisResult(null);
    setError(null);
  };

  if (!apiKey) {
    return <ApiKeySetup onKeySubmit={handleApiKeySubmit} />;
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <Header onClearApiKey={handleClearApiKey} />
      <main className="container mx-auto p-4 md:p-8">
        <InputSection
          syllabus={syllabus}
          setSyllabus={setSyllabus}
          exam={exam}
          setExam={setExam}
          onAnalyze={handleAnalyze}
          onUseSampleData={handleUseSampleData}
          onClear={handleClear}
          isLoading={isLoading}
        />
        
        {isLoading && <Loader />}
        
        {error && (
          <div className="mt-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {analysisResult && <ResultsTable data={analysisResult} />}
      </main>
      <footer className="text-center p-4 text-slate-500 text-sm">
        <p>Powered by Google Gemini. Designed by a World-Class React Engineer.</p>
      </footer>
    </div>
  );
};

export default App;
