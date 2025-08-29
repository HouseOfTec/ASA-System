
import React from 'react';
import { Sentiment } from '../types';
import { SENTIMENT_COLORS } from '../constants';

const SentimentIcon: React.FC<{ sentiment: Sentiment }> = ({ sentiment }) => {
  const iconProps = {
    className: "w-10 h-10",
    'aria-hidden': true
  };
  switch (sentiment) {
    case Sentiment.Positive:
      return <svg {...iconProps} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 110-18 9 9 0 010 18z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15.182 8.418a.75.75 0 01.294.592v.001c0 .414-.336.75-.75.75H9.274a.75.75 0 110-1.5h5.158a.75.75 0 01.75.158zM15.93 11.626a.75.75 0 01.206.563v.001c0 .414-.336.75-.75.75H8.614a.75.75 0 010-1.5h6.772a.75.75 0 01.544.186z" /></svg>;
    case Sentiment.Negative:
      return <svg {...iconProps} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 110-18 9 9 0 010 18z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15.182 10.418a.75.75 0 01.294-.592v-.001a.75.75 0 00-.75-.75H9.274a.75.75 0 000 1.5h5.158a.75.75 0 01.75-.158z" /></svg>;
    case Sentiment.Neutral:
      return <svg {...iconProps} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 110-18 9 9 0 010 18z" /><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6" /></svg>;
    default:
      return null;
  }
};

interface SentimentHeaderProps {
  sentiment: Sentiment;
  explanation: string;
}

export const SentimentHeader: React.FC<SentimentHeaderProps> = ({ sentiment, explanation }) => {
  const colors = SENTIMENT_COLORS[sentiment];
  
  return (
    <div className={`p-4 rounded-lg flex items-center space-x-4 ${colors.bg} border-l-4 ${colors.border}`}>
      <div className={colors.text}>
        <SentimentIcon sentiment={sentiment} />
      </div>
      <div>
        <h2 className={`text-2xl font-bold capitalize ${colors.text}`}>
          {sentiment}
        </h2>
        <p className={`text-sm ${colors.text} opacity-90`}>{explanation}</p>
      </div>
    </div>
  );
};