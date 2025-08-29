import React from 'react';
import type { EmotionScore } from '../types';

interface EmotionDisplayProps {
  scores: EmotionScore;
}

const emotionConfig: Record<keyof EmotionScore, { label: string; color: string; icon: string; }> = {
  joy: { label: 'Joy', color: 'bg-yellow-400', icon: '😊' },
  sadness: { label: 'Sadness', color: 'bg-blue-500', icon: '😢' },
  anger: { label: 'Anger', color: 'bg-red-600', icon: '😠' },
  fear: { label: 'Fear', color: 'bg-purple-500', icon: '😨' },
  surprise: { label: 'Surprise', color: 'bg-pink-400', icon: '😮' },
  disgust: { label: 'Disgust', color: 'bg-green-700', icon: '🤢' },
};

const EmotionBar: React.FC<{ label: string; value: number; color: string; icon: string; }> = ({ label, value, color, icon }) => {
    const cappedValue = Math.min(100, Math.max(0, value || 0));
    return (
        <div>
            <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                    <span className="text-lg mr-2" aria-hidden="true">{icon}</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">{label}</span>
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{cappedValue.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700" role="progressbar" aria-valuenow={cappedValue} aria-valuemin={0} aria-valuemax={100} aria-label={`${label} score`}>
                <div className={`h-2 rounded-full ${color}`} style={{ width: `${cappedValue}%` }}></div>
            </div>
        </div>
    );
};


export const EmotionDisplay: React.FC<EmotionDisplayProps> = ({ scores }) => {
  if (!scores) {
    return null;
  }
  
  const hasEmotions = Object.values(scores).some(score => score > 0);

  if (!hasEmotions) {
    return null; // Don't display if no emotions were detected
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Emotional Analysis</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(Object.keys(emotionConfig) as Array<keyof EmotionScore>).map((key) => {
            const config = emotionConfig[key];
            const value = scores[key];
            return <EmotionBar key={key} label={config.label} value={value} color={config.color} icon={config.icon} />;
        })}
      </div>
    </div>
  );
};
