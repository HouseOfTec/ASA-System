import React, { useMemo } from 'react';
import type { HistoryItem } from '../types';
import { Doughnut, Line, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  Filler,
  Title
} from 'chart.js';
import WordCloud from 'react-d3-cloud';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  Filler,
  Title
);

interface HistoryDashboardProps {
  history: HistoryItem[];
}

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top' as const,
            labels: {
                color: '#9CA3AF' // text-gray-400
            }
        },
    },
    scales: {
      x: {
        ticks: { color: '#9CA3AF' },
        grid: { color: 'rgba(156, 163, 175, 0.1)' }
      },
      y: {
        ticks: { color: '#9CA3AF' },
        grid: { color: 'rgba(156, 163, 175, 0.1)' }
      },
      r: { // For Radar chart
        angleLines: { color: 'rgba(156, 163, 175, 0.2)' },
        grid: { color: 'rgba(156, 163, 175, 0.2)' },
        pointLabels: { color: '#D1D5DB' }, // text-gray-300
        ticks: {
          color: '#9CA3AF',
          backdropColor: 'transparent'
        }
      }
    }
};

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center space-x-4">
        <div className="bg-blue-500/10 text-blue-500 p-3 rounded-full">{icon}</div>
        <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
            <p className="text-xl font-bold text-gray-800 dark:text-gray-200">{value}</p>
        </div>
    </div>
);

export const HistoryDashboard: React.FC<HistoryDashboardProps> = ({ history }) => {
  const analytics = useMemo(() => {
    if (!history.length) return null;

    const stats = {
      total: history.length,
      positive: history.filter(h => h.result.overallSentiment === 'positive').length,
      negative: history.filter(h => h.result.overallSentiment === 'negative').length,
      neutral: history.filter(h => h.result.overallSentiment === 'neutral').length,
    };
    const sentimentCounts = { positive: stats.positive, negative: stats.negative, neutral: stats.neutral };
    const mostCommon = Object.keys(sentimentCounts).reduce((a, b) => sentimentCounts[a as keyof typeof sentimentCounts] > sentimentCounts[b as keyof typeof sentimentCounts] ? a : b);

    const sortedHistory = [...history].sort((a, b) => a.timestamp - b.timestamp);

    const sentimentTrend = {
      labels: sortedHistory.map(h => new Date(h.timestamp).toLocaleDateString()),
      datasets: [
        { label: 'Positive', data: sortedHistory.map(h => h.result.sentimentScore.positive), borderColor: '#22C55E', backgroundColor: '#22C55E', tension: 0.1 },
        { label: 'Negative', data: sortedHistory.map(h => h.result.sentimentScore.negative), borderColor: '#EF4444', backgroundColor: '#EF4444', tension: 0.1 },
        { label: 'Neutral', data: sortedHistory.map(h => h.result.sentimentScore.neutral), borderColor: '#6B7280', backgroundColor: '#6B7280', tension: 0.1 },
      ],
    };

    const wordCloudData = history
      .flatMap(h => h.result.keywords)
      .reduce((acc, keyword) => {
        const word = keyword.word.toLowerCase();
        const existing = acc.find(item => item.text === word);
        if (existing) {
          existing.value += 1;
        } else {
          acc.push({ text: word, value: 1 });
        }
        return acc;
      }, [] as { text: string; value: number }[])
      .sort((a,b) => b.value - a.value)
      .slice(0, 50);

    const emotionTotals = history.reduce((acc, h) => {
      Object.entries(h.result.emotionScore).forEach(([emotion, score]) => {
        acc[emotion as keyof typeof acc] = (acc[emotion as keyof typeof acc] || 0) + score;
      });
      return acc;
    }, { joy: 0, sadness: 0, anger: 0, fear: 0, surprise: 0, disgust: 0 });

    const emotionAverages = {
      labels: Object.keys(emotionTotals),
      datasets: [
        {
          label: 'Average Emotional Score',
          data: Object.values(emotionTotals).map(v => v / history.length),
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 1,
        },
      ],
    };

    return { stats, mostCommon, sentimentTrend, wordCloudData, emotionAverages };
  }, [history]);

  if (!analytics) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        <svg className="w-16 h-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
        <h3 className="text-xl font-semibold">Not Enough Data</h3>
        <p className="mt-1">Perform some analyses to see your dashboard.</p>
      </div>
    );
  }

  const sentimentDistributionData = {
    labels: ['Positive', 'Negative', 'Neutral'],
    datasets: [{
      data: [analytics.stats.positive, analytics.stats.negative, analytics.stats.neutral],
      backgroundColor: ['#22C55E', '#EF4444', '#6B7280'],
      borderColor: '#374151', // gray-700
      borderWidth: 2,
    }],
  };
  
  const wordCloudData = analytics.wordCloudData;
  const values = wordCloudData.map(w => w.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  
  const fontSizeMapper = (word: { text: string; value: number }) => {
    if (max === min) return 30; // Handle case where all words have same frequency
    const minSize = 12;
    const maxSize = 60;
    return minSize + ((word.value - min) / (max - min)) * (maxSize - minSize);
  };
  
  // Rotate ~30% of words by 90 degrees
  const rotate = () => (Math.random() > 0.7 ? 90 : 0);

  return (
    <div className="space-y-6">
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard title="Total Analyses" value={analytics.stats.total.toString()} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>} />
            <StatCard title="Most Common" value={analytics.mostCommon.charAt(0).toUpperCase() + analytics.mostCommon.slice(1)} icon={<svg xmlns="http://www.w3.org/ropsten.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>} />
            <StatCard title="Positive Ratio" value={`${((analytics.stats.positive / analytics.stats.total) * 100).toFixed(1)}%`} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-200">Sentiment Distribution</h3>
                <div className="h-64"><Doughnut data={sentimentDistributionData} options={chartOptions}/></div>
            </div>
             <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-200">Overall Emotional Tone</h3>
                 <div className="h-64"><Radar data={analytics.emotionAverages} options={chartOptions}/></div>
            </div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-200">Sentiment Trend</h3>
            <div className="h-72"><Line data={analytics.sentimentTrend} options={chartOptions}/></div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md">
             <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-200">Keywords Cloud</h3>
             <div className="h-72 w-full text-gray-800 dark:text-gray-200">
                {wordCloudData.length > 0 ? (
                  <WordCloud
                    data={wordCloudData}
                    font="sans-serif"
                    fontSize={fontSizeMapper}
                    rotate={rotate}
                    padding={2}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">No keywords to display.</p>
                  </div>
                )}
             </div>
        </div>
    </div>
  );
};