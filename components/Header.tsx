
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
          Advanced Sentiment Analysis
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mt-1">
          Powered By Healing Hands
        </p>
      </div>
    </header>
  );
};
