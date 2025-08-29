
import React from 'react';

interface TextInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onAnalyze: () => void;
  onUseSample: () => void;
  isLoading: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({ value, onChange, onAnalyze, onUseSample, isLoading }) => {
  return (
    <div className="flex flex-col h-full">
      <label htmlFor="text-input" className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
        Enter Text to Analyze
      </label>
      <textarea
        id="text-input"
        value={value}
        onChange={onChange}
        placeholder="Paste your text here..."
        className="w-full flex-grow p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 min-h-[300px]"
        rows={15}
      />
      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <button
          onClick={onAnalyze}
          disabled={isLoading || !value}
          className="w-full sm:w-auto flex-grow px-6 py-3 text-white font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 dark:disabled:bg-blue-800 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </>
          ) : (
            'Analyze Text'
          )}
        </button>
        <button
          onClick={onUseSample}
          disabled={isLoading}
          className="w-full sm:w-auto px-6 py-3 text-blue-600 dark:text-blue-400 font-semibold rounded-lg border border-blue-600 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors duration-300"
        >
          Use Sample Text
        </button>
      </div>
    </div>
  );
};
