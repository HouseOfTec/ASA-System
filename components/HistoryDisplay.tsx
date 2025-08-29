import React, { useState } from 'react';
import type { HistoryItem, Sentiment } from '../types';
import { AnalysisDisplay } from './AnalysisDisplay';
import { SENTIMENT_COLORS } from '../constants';
import { HistoryDashboard } from './HistoryDashboard';
import { ExportControl } from './ExportControl';
import { exportHistory } from '../services/exportService';

const SentimentIcon: React.FC<{ sentiment: Sentiment }> = ({ sentiment }) => {
  const iconProps = {
    className: "w-6 h-6",
    'aria-hidden': true
  };
  switch (sentiment) {
    case 'positive':
      return <svg {...iconProps} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
    case 'negative':
      return <svg {...iconProps} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
    case 'neutral':
      return <svg {...iconProps} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
    default:
      return null;
  }
};


interface HistoryDisplayProps {
  history: HistoryItem[];
  onClearHistory: () => void;
}

export const HistoryDisplay: React.FC<HistoryDisplayProps> = ({ history, onClearHistory }) => {
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const [view, setView] = useState<'list' | 'dashboard'>('list');

  const handleExport = (format: 'pdf' | 'docx' | 'csv' | 'txt' | 'json') => {
    exportHistory(history, format);
  };

  if (selectedItem) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Analysis Details</h2>
          <button
            onClick={() => setSelectedItem(null)}
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            &larr; Back to History
          </button>
        </div>
        <AnalysisDisplay result={selectedItem.result} originalText={selectedItem.text} />
      </div>
    );
  }

  const ViewToggle: React.FC = () => (
    <div className="flex items-center p-1 bg-gray-200 dark:bg-gray-700 rounded-lg">
      <button
        onClick={() => setView('list')}
        className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
          view === 'list'
            ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow'
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-300/50 dark:hover:bg-gray-600/50'
        }`}
      >
        List
      </button>
      <button
        onClick={() => setView('dashboard')}
        className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
          view === 'dashboard'
            ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow'
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-300/50 dark:hover:bg-gray-600/50'
        }`}
      >
        Dashboard
      </button>
    </div>
  );

  const renderListView = () => (
    <>
      {history.length === 0 ? (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <svg className="w-16 h-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
          <h3 className="text-xl font-semibold">No History Found</h3>
          <p className="mt-1">Your recent text analyses will appear here.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {history.map((item) => {
            const colors = SENTIMENT_COLORS[item.result.overallSentiment];
            return (
              <li
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`p-4 rounded-lg flex items-center space-x-4 cursor-pointer transition-all border ${colors.border} ${colors.bg} hover:shadow-md hover:scale-[1.02]`}
              >
                <div className={`flex-shrink-0 ${colors.text}`}>
                    <SentimentIcon sentiment={item.result.overallSentiment} />
                </div>
                <div className="flex-grow min-w-0">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{item.text}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Analyzed on {new Date(item.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="flex-shrink-0">
                    <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Analysis History</h2>
        <div className="flex items-center gap-4">
          {history.length > 0 && <ViewToggle />}
          {history.length > 0 && <ExportControl onExport={handleExport} />}
          {history.length > 0 && view === 'list' && (
            <button
              onClick={onClearHistory}
              className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 border border-red-500 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              Clear History
            </button>
          )}
        </div>
      </div>
      
      {view === 'dashboard' ? <HistoryDashboard history={history} /> : renderListView()}
    </div>
  );
};
