
import React from 'react';

interface ErrorDisplayProps {
  message: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border border-red-300 dark:border-red-600">
       <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h2 className="text-xl font-semibold">An Error Occurred</h2>
      <p className="mt-1 text-red-500 dark:text-red-300">{message}</p>
    </div>
  );
};
