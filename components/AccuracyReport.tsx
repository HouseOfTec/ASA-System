
import React, { useState, useMemo } from 'react';
import { accuracyData } from '../constants';
import { Sentiment, type AccuracySample } from '../types';
import { AnalysisDisplay } from './AnalysisDisplay';
import { SENTIMENT_COLORS } from '../constants';

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode; }> = ({ title, value, icon }) => (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center space-x-4 border border-gray-200 dark:border-gray-700">
        <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 p-3 rounded-full">{icon}</div>
        <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{value}</p>
        </div>
    </div>
);

const SentimentBadge: React.FC<{ sentiment: Sentiment }> = ({ sentiment }) => {
    const colors = SENTIMENT_COLORS[sentiment];
    return (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full capitalize ${colors.bg} ${colors.text}`}>
            {sentiment}
        </span>
    );
};

export const AccuracyReport: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<AccuracySample | null>(null);

    const stats = useMemo(() => {
        const totalSamples = accuracyData.length;
        const correctPredictions = accuracyData.filter(item => item.manualSentiment === item.apiResult.overallSentiment).length;
        const accuracy = totalSamples > 0 ? (correctPredictions / totalSamples) * 100 : 0;

        const sentiments: Sentiment[] = [Sentiment.Positive, Sentiment.Negative, Sentiment.Neutral];
        const matrix = new Map<Sentiment, Map<Sentiment, number>>();

        sentiments.forEach(manual => {
            const row = new Map<Sentiment, number>();
            sentiments.forEach(api => row.set(api, 0));
            matrix.set(manual, row);
        });

        accuracyData.forEach(item => {
            const row = matrix.get(item.manualSentiment);
            if (row) {
                const currentValue = row.get(item.apiResult.overallSentiment) || 0;
                row.set(item.apiResult.overallSentiment, currentValue + 1);
            }
        });

        return {
            totalSamples,
            correctPredictions,
            accuracy: accuracy.toFixed(1) + '%',
            matrix,
        };
    }, []);

    if (selectedItem) {
        return (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Analysis Details</h2>
                    <button onClick={() => setSelectedItem(null)} className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                        &larr; Back to Report
                    </button>
                </div>
                <AnalysisDisplay result={selectedItem.apiResult} originalText={selectedItem.text} />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Accuracy Report</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatCard title="Total Samples" value={stats.totalSamples.toString()} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>} />
                    <StatCard title="Correct Predictions" value={stats.correctPredictions.toString()} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
                    <StatCard title="Overall Accuracy" value={stats.accuracy} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>} />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Confusion Matrix</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-center bg-white dark:bg-gray-800">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="p-3 font-semibold text-gray-600 dark:text-gray-300">Manual \ API</th>
                                <th className="p-3 font-semibold text-gray-600 dark:text-gray-300">Positive</th>
                                <th className="p-3 font-semibold text-gray-600 dark:text-gray-300">Negative</th>
                                <th className="p-3 font-semibold text-gray-600 dark:text-gray-300">Neutral</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {Array.from(stats.matrix.entries()).map(([manual, apiCounts]) => (
                                <tr key={manual}>
                                    <td className="p-3 font-semibold text-gray-600 dark:text-gray-300 capitalize">{manual}</td>
                                    <td className="p-3 text-gray-700 dark:text-gray-300">{apiCounts.get(Sentiment.Positive)}</td>
                                    <td className="p-3 text-gray-700 dark:text-gray-300">{apiCounts.get(Sentiment.Negative)}</td>
                                    <td className="p-3 text-gray-700 dark:text-gray-300">{apiCounts.get(Sentiment.Neutral)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Detailed Comparison</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-700 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th scope="col" className="px-6 py-3">Text Sample</th>
                                <th scope="col" className="px-6 py-3">Manual</th>
                                <th scope="col" className="px-6 py-3">API</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accuracyData.map(item => {
                                const isMatch = item.manualSentiment === item.apiResult.overallSentiment;
                                return (
                                    <tr key={item.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600/20">
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300 max-w-sm truncate">"{item.text}"</td>
                                        <td className="px-6 py-4"><SentimentBadge sentiment={item.manualSentiment} /></td>
                                        <td className="px-6 py-4"><SentimentBadge sentiment={item.apiResult.overallSentiment} /></td>
                                        <td className="px-6 py-4">
                                            {isMatch ? (
                                                <span className="flex items-center text-green-600 dark:text-green-400"><svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Match</span>
                                            ) : (
                                                <span className="flex items-center text-yellow-600 dark:text-yellow-400"><svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg> Mismatch</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button onClick={() => setSelectedItem(item)} className="font-medium text-blue-600 dark:text-blue-400 hover:underline">View Details</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
