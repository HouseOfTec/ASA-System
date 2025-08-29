import React from 'react';
import type { HighlightedSpan } from '../types';

interface HighlightedTextProps {
  spans: HighlightedSpan[];
}

const HIGHLIGHT_COLORS = {
  positive: 'bg-green-200 dark:bg-green-800/50',
  negative: 'bg-red-200 dark:bg-red-800/50',
  neutral: 'bg-gray-200 dark:bg-gray-700/50',
  none: '',
};

export const HighlightedText: React.FC<HighlightedTextProps> = ({ spans }) => {
  if (!spans || spans.length === 0) {
    return (
        <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Highlighted Analysis</h3>
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900/50 leading-relaxed text-gray-500">
                Analysis highlighting is not available for this text.
            </div>
        </div>
    );
  }
  
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Highlighted Analysis</h3>
      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900/50 leading-relaxed">
        {spans.map((span, index) => (
          <span key={index} className={`rounded px-1 py-0.5 ${HIGHLIGHT_COLORS[span.sentiment]}`}>
            {span.text}
          </span>
        ))}
      </div>
    </div>
  );
};
