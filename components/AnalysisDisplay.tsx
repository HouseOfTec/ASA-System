import React from 'react';
import type { AnalysisResult } from '../types';
import { SentimentHeader } from './SentimentHeader';
import { SentimentScores } from './SentimentScores';
import { KeywordsDisplay } from './KeywordsDisplay';
import { HighlightedText } from './HighlightedText';
import { ModerationAlert } from './ModerationAlert';
import { EmotionDisplay } from './EmotionDisplay';
import { Feedback } from './Feedback';
import { ExportControl } from './ExportControl';
import { exportAnalysisResult } from '../services/exportService';

interface AnalysisDisplayProps {
  result: AnalysisResult;
  originalText: string;
}

export const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ result, originalText }) => {
  const handleExport = (format: 'pdf' | 'docx' | 'csv' | 'txt' | 'json') => {
    exportAnalysisResult(result, originalText, format);
  };
  
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-shrink-0">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-grow">
            <SentimentHeader sentiment={result.overallSentiment} explanation={result.explanation} />
          </div>
          <ExportControl onExport={handleExport} />
        </div>

        {result.moderation && result.moderation.length > 0 && (
          <div className="mt-6">
            <ModerationAlert warnings={result.moderation} />
          </div>
        )}
      </div>
      
      <div className="flex-grow space-y-6 overflow-y-auto pr-2 custom-scrollbar mt-6 min-h-0">
        <SentimentScores scores={result.sentimentScore} />
        <EmotionDisplay scores={result.emotionScore} />
        <KeywordsDisplay keywords={result.keywords} />
        <HighlightedText spans={result.highlightedSpans} />
      </div>

      <div className="flex-shrink-0 mt-4">
        <Feedback />
      </div>
    </div>
  );
};

// Add some basic styles for a custom scrollbar, as a Tailwind plugin might not be available.
const style = document.createElement('style');
style.innerHTML = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  .dark .custom-scrollbar::-webkit-scrollbar-track {
    background: #2d3748;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;
document.head.appendChild(style);
