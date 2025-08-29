import React from 'react';
import type { ComparisonResult } from '../types';
import { ExportControl } from './ExportControl';
import { exportComparisonResult } from '../services/exportService';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2 mb-3">{title}</h3>
        {children}
    </div>
);

const ThemeList: React.FC<{ themes: string[] }> = ({ themes }) => {
    if (!themes || themes.length === 0) {
        return <p className="text-sm text-gray-500 dark:text-gray-400">No relevant themes identified.</p>;
    }
    return (
        <ul className="list-disc list-inside space-y-1">
            {themes.map((theme, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300">{theme}</li>
            ))}
        </ul>
    );
};

export const ComparisonResultDisplay: React.FC<{ result: ComparisonResult }> = ({ result }) => {
    const handleExport = (format: 'pdf' | 'docx' | 'csv' | 'txt' | 'json') => {
        exportComparisonResult(result, format);
    };

    return (
        <div className="w-full text-left">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
                    Comparative Analysis
                </h2>
                <ExportControl onExport={handleExport} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                    <h4 className="font-bold text-md mb-2 text-gray-800 dark:text-gray-200">Summary of Text A</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{result.summaryA}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                    <h4 className="font-bold text-md mb-2 text-gray-800 dark:text-gray-200">Summary of Text B</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{result.summaryB}</p>
                </div>
            </div>

            <Section title="Sentiment & Tone Comparison">
                <p className="text-gray-700 dark:text-gray-300">{result.sentimentComparison}</p>
            </Section>

            <Section title="Shared Themes">
                <ThemeList themes={result.sharedThemes} />
            </Section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <Section title="Unique to Text A">
                    <ThemeList themes={result.uniqueThemesA} />
                </Section>
                 <Section title="Unique to Text B">
                    <ThemeList themes={result.uniqueThemesB} />
                </Section>
            </div>

             <Section title="Final Verdict">
                <p className="text-gray-700 dark:text-gray-300 font-medium">{result.verdict}</p>
            </Section>
        </div>
    );
};
