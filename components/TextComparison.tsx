
import React, { useState, useCallback } from 'react';
import { compareTexts } from '../services/geminiService';
import type { ComparisonResult } from '../types';
import { Loader } from './Loader';
import { ErrorDisplay } from './ErrorDisplay';
import { ComparisonResultDisplay } from './ComparisonResultDisplay';

export const TextComparison: React.FC = () => {
    const [textA, setTextA] = useState('');
    const [textB, setTextB] = useState('');
    const [result, setResult] = useState<ComparisonResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCompare = useCallback(async () => {
        if (!textA.trim() || !textB.trim()) {
            setError("Please provide text in both fields to compare.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const comparisonResult = await compareTexts(textA, textB);
            setResult(comparisonResult);
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : "An unknown error occurred during comparison.");
        } finally {
            setIsLoading(false);
        }
    }, [textA, textB]);

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Text A</h2>
                    <textarea
                        value={textA}
                        onChange={(e) => setTextA(e.target.value)}
                        placeholder="Paste the first text here..."
                        className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 min-h-[250px]"
                        rows={10}
                    />
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Text B</h2>
                    <textarea
                        value={textB}
                        onChange={(e) => setTextB(e.target.value)}
                        placeholder="Paste the second text here..."
                        className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 min-h-[250px]"
                        rows={10}
                    />
                </div>
            </div>

            <div className="text-center">
                <button
                    onClick={handleCompare}
                    disabled={isLoading || !textA || !textB}
                    className="px-8 py-3 text-white font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 dark:disabled:bg-blue-800 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center mx-auto"
                >
                     {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Comparing...
                        </>
                     ) : 'Compare Texts'}
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 min-h-[200px] flex items-center justify-center">
                {isLoading ? <Loader /> : error ? <ErrorDisplay message={error} /> : result ? <ComparisonResultDisplay result={result} /> : (
                    <div className="text-center text-gray-500 dark:text-gray-400">
                        <h2 className="text-2xl font-semibold mb-2">Comparison Results</h2>
                        <p>Your text comparison will appear here once completed.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
