
import React from 'react';
import type { SentimentScore } from '../types';

interface SentimentScoresProps {
  scores: SentimentScore;
}

const ScoreBar: React.FC<{ label: string; value: number; color: string; }> = ({ label, value, color }) => {
  const cappedValue = Math.min(100, Math.max(0, value));

  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">{label}</span>
        <span className={`text-sm font-medium ${color}`}>{cappedValue.toFixed(1)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div className={`h-2.5 rounded-full ${color === 'bg-green-500' ? 'bg-green-500' : color === 'bg-red-500' ? 'bg-red-500' : 'bg-gray-500'}`} style={{ width: `${cappedValue}%` }}></div>
      </div>
    </div>
  );
};


export const SentimentScores: React.FC<SentimentScoresProps> = ({ scores }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Sentiment Score</h3>
      <div className="space-y-3">
        <ScoreBar label="Positive" value={scores.positive} color="bg-green-500" />
        <ScoreBar label="Negative" value={scores.negative} color="bg-red-500" />
        <ScoreBar label="Neutral" value={scores.neutral} color="bg-gray-500" />
      </div>
    </div>
  );
};
