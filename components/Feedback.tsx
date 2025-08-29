import React, { useState } from 'react';

export const Feedback: React.FC = () => {
  const [feedbackSent, setFeedbackSent] = useState<string | null>(null);

  const handleFeedback = (type: 'positive' | 'negative') => {
    setFeedbackSent(type);
    // In a real application, this would send data to a backend to improve the model.
  };

  if (feedbackSent) {
    return (
        <div className="text-center text-sm text-gray-600 dark:text-gray-400 p-3 rounded-lg bg-gray-100 dark:bg-gray-700/50">
            Thank you for your feedback!
        </div>
    );
  }

  return (
    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
      <p className="text-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Was this analysis helpful?</p>
      <div className="flex justify-center gap-3">
        <button
          onClick={() => handleFeedback('positive')}
          className="p-2 rounded-full hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors"
          aria-label="Helpful"
        >
          <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.085a2 2 0 00-1.736.97l-2.714 4.223A2 2 0 016.083 11H4a2 2 0 00-2 2v6a2 2 0 002 2h2.083" /></svg>
        </button>
        <button
          onClick={() => handleFeedback('negative')}
          className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
          aria-label="Not helpful"
        >
          <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.738 3h4.017c.163 0 .326.02.485.06L17 4m-7 10v5a2 2 0 002 2h.085a2 2 0 001.736-.97l2.714-4.223A2 2 0 0117.917 13H20a2 2 0 002-2V5a2 2 0 00-2-2h-2.083" /></svg>
        </button>
      </div>
    </div>
  );
};
