
import React from 'react';
import type { AccuracySample, Sentiment } from '../types';
import { SENTIMENT_COLORS } from '../constants';

interface SampleSelectorModalProps {
  isOpen: boolean;
  samples: AccuracySample[];
  onSelect: (text: string) => void;
  onClose: () => void;
}

const SentimentBadge: React.FC<{ sentiment: Sentiment }> = ({ sentiment }) => {
    const colors = SENTIMENT_COLORS[sentiment];
    return (
        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full capitalize flex-shrink-0 ${colors.bg} ${colors.text}`}>
            {sentiment}
        </span>
    );
};


export const SampleSelectorModal: React.FC<SampleSelectorModalProps> = ({ isOpen, samples, onSelect, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="sample-selector-title"
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col"
        onClick={e => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <header className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <h2 id="sample-selector-title" className="text-xl font-bold text-gray-800 dark:text-gray-200">
            Choose a Sample Text
          </h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <main className="p-6 overflow-y-auto custom-scrollbar">
          <ul className="space-y-3">
            {samples.map(sample => (
              <li key={sample.id}>
                <button
                  onClick={() => onSelect(sample.text)}
                  className="w-full text-left p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 border border-gray-200 dark:border-gray-700 transition-all duration-200 flex items-start gap-4"
                >
                  <p className="flex-grow text-sm text-gray-700 dark:text-gray-300">
                    {sample.text}
                  </p>
                  <SentimentBadge sentiment={sample.manualSentiment} />
                </button>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
};
