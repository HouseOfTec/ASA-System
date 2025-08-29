import React, { useState, useCallback } from 'react';
import type { AnalysisResult } from '../types';
import { DocumentUpload } from './DocumentUpload';
import { analyzeText } from '../services/geminiService';
import { Loader } from './Loader';
import { ErrorDisplay } from './ErrorDisplay';
import { AnalysisDisplay } from './AnalysisDisplay';

type Step = 'upload' | 'preview' | 'analyzing' | 'result' | 'error';

export const DocumentAnalyzer: React.FC = () => {
    const [step, setStep] = useState<Step>('upload');
    const [file, setFile] = useState<File | null>(null);
    const [fileContent, setFileContent] = useState<string>('');
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileUpload = useCallback((content: string, uploadedFile: File) => {
        setFileContent(content);
        setFile(uploadedFile);
        setStep('preview');
        setError(null);
        setAnalysisResult(null);
    }, []);

    const handleUploadError = useCallback((message: string) => {
        setError(message);
        setStep('error');
    }, []);

    const handleAnalyze = useCallback(async () => {
        if (!fileContent) {
            setError("No content to analyze.");
            setStep('error');
            return;
        }
        setStep('analyzing');
        setError(null);
        setAnalysisResult(null);

        try {
            const result = await analyzeText(fileContent);
            setAnalysisResult(result);
            setStep('result');
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : "An unknown error occurred during analysis.");
            setStep('error');
        }
    }, [fileContent]);

    const handleReset = () => {
        setStep('upload');
        setFile(null);
        setFileContent('');
        setAnalysisResult(null);
        setError(null);
    };
    
    const renderContent = () => {
        switch (step) {
            case 'upload':
                return <DocumentUpload onSuccess={handleFileUpload} onError={handleUploadError} />;
            case 'preview':
                return (
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 w-full">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Document Preview</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{file?.name} ({(file?.size || 0) / 1024 < 1024 ? `${((file?.size || 0) / 1024).toFixed(2)} KB` : `${((file?.size || 0) / (1024*1024)).toFixed(2)} MB`})</p>
                            </div>
                            <button onClick={handleReset} className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">Upload New File</button>
                        </div>
                        <div className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700/50 h-96 overflow-y-auto custom-scrollbar">
                           <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300">{fileContent}</pre>
                        </div>
                        <div className="mt-4 text-center">
                            <button onClick={handleAnalyze} className="px-8 py-3 text-white font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 transition-all duration-300">
                                Analyze Document
                            </button>
                        </div>
                    </div>
                );
            case 'analyzing':
                return (
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center min-h-[400px]">
                        <Loader />
                    </div>
                );
            case 'result':
                return (
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Analysis Complete</h2>
                            <button onClick={handleReset} className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">Analyze New Document</button>
                        </div>
                        {analysisResult && <AnalysisDisplay result={analysisResult} originalText={fileContent} />}
                    </div>
                );
            case 'error':
                 return (
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                         <div className="flex justify-end mb-4">
                            <button onClick={handleReset} className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">Try Again</button>
                        </div>
                        {error && <ErrorDisplay message={error} />}
                    </div>
                );
        }
    }

    return (
        <div className="w-full">
            {renderContent()}
        </div>
    );
};