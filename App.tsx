
import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { TextInput } from './components/TextInput';
import { AnalysisDisplay } from './components/AnalysisDisplay';
import { Loader } from './components/Loader';
import { analyzeText } from './services/geminiService';
import type { AnalysisResult, HistoryItem } from './types';
import { accuracyData } from './constants';
import { Footer } from './components/Footer';
import { ErrorDisplay } from './components/ErrorDisplay';
import { DocumentAnalyzer } from './components/DocumentAnalyzer';
import { TextComparison } from './components/TextComparison';
import { HistoryDisplay } from './components/HistoryDisplay';
import { AccuracyReport } from './components/AccuracyReport';
import { SampleSelectorModal } from './components/SampleSelectorModal';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'text' | 'document' | 'comparison' | 'history' | 'accuracy'>('text');
  
  // State for the Text Analyzer tab
  const [inputText, setInputText] = useState<string>(accuracyData[0].text);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSampleSelectorOpen, setIsSampleSelectorOpen] = useState(false);

  // State for History
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('analysisHistory');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (e) {
      console.error("Failed to parse history from localStorage", e);
      setHistory([]);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('analysisHistory', JSON.stringify(history));
    } catch (e) {
      console.error("Failed to save history to localStorage", e);
    }
  }, [history]);

  const handleAnalyze = useCallback(async () => {
    if (!inputText.trim()) {
      setError("Please enter some text to analyze.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await analyzeText(inputText);
      setAnalysisResult(result);

      // Add to history
      const newHistoryItem: HistoryItem = {
        id: new Date().toISOString() + Math.random(), // simple unique id
        timestamp: Date.now(),
        text: inputText,
        result: result,
      };
      setHistory(prevHistory => [newHistoryItem, ...prevHistory].slice(0, 50)); // Keep last 50

    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred during analysis.");
    } finally {
      setIsLoading(false);
    }
  }, [inputText]);

  const handleUseSample = useCallback(() => {
    setIsSampleSelectorOpen(true);
  }, []);

  const handleSampleSelect = (sampleText: string) => {
    setInputText(sampleText);
    setAnalysisResult(null);
    setError(null);
    setIsSampleSelectorOpen(false);
  };
  
  const handleClearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const TabButton: React.FC<{ tabName: 'text' | 'document' | 'comparison' | 'history' | 'accuracy'; label: string; }> = ({ tabName, label }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
        activeTab === tabName
          ? 'bg-blue-600 text-white'
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
      }`}
    >
      {label}
    </button>
  );
  
  const renderActiveTab = () => {
    switch (activeTab) {
      case 'document':
        return <DocumentAnalyzer />;
      case 'comparison':
        return <TextComparison />;
      case 'history':
        return <HistoryDisplay history={history} onClearHistory={handleClearHistory} />;
      case 'accuracy':
        return <AccuracyReport />;
      case 'text':
      default:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              <TextInput
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onAnalyze={handleAnalyze}
                onUseSample={handleUseSample}
                isLoading={isLoading}
              />
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center min-h-[400px] lg:min-h-0">
              {isLoading ? (
                <Loader />
              ) : error ? (
                <ErrorDisplay message={error} />
              ) : analysisResult ? (
                <AnalysisDisplay result={analysisResult} originalText={inputText}/>
              ) : (
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <h2 className="text-2xl font-semibold mb-2">Analysis Results</h2>
                  <p>Your text analysis will appear here once completed.</p>
                </div>
              )}
            </div>
          </div>
        );
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 inline-flex flex-wrap space-x-2">
          <TabButton tabName="text" label="Text Analyzer" />
          <TabButton tabName="document" label="Document Analyzer" />
          <TabButton tabName="comparison" label="Text Comparison" />
          <TabButton tabName="history" label="History" />
          <TabButton tabName="accuracy" label="Accuracy Report" />
        </div>
        
        {renderActiveTab()}
      </main>
      <Footer />
      <SampleSelectorModal 
        isOpen={isSampleSelectorOpen}
        samples={accuracyData}
        onSelect={handleSampleSelect}
        onClose={() => setIsSampleSelectorOpen(false)}
      />
    </div>
  );
};

export default App;
