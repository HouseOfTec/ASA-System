
import React from 'react';
import type { Keyword } from '../types';
import { SENTIMENT_COLORS } from '../constants';

interface KeywordsDisplayProps {
  keywords: Keyword[];
}

export const KeywordsDisplay: React.FC<KeywordsDisplayProps> = ({ keywords }) => {
  if (!keywords || keywords.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Keywords</h3>
      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword, index) => {
          const colors = SENTIMENT_COLORS[keyword.sentiment];
          const keywordText = typeof keyword === 'string' ? keyword : keyword.word;
          return (
            <span
              key={index}
              className={`px-3 py-1 text-sm font-medium rounded-full ${colors.bg} ${colors.text}`}
            >
              {keywordText}
            </span>
          );
        })}
      </div>
    </div>
  );
};
