import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType } from 'docx';
import type { AnalysisResult, ComparisonResult, HistoryItem, Keyword } from '../types';

// --- Helper to trigger file download ---
const saveFile = (blob: Blob, filename: string) => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
};

const getTimestamp = () => new Date().toISOString().replace(/[:.]/g, '-');

// --- SINGLE ANALYSIS EXPORT ---

const analysisToText = (result: AnalysisResult, originalText: string): string => {
    let content = `Sentiment Analysis Report\n`;
    content += `=========================\n\n`;
    content += `Original Text:\n"${originalText}"\n\n`;
    content += `--- Analysis ---\n`;
    content += `Overall Sentiment: ${result.overallSentiment} (${result.explanation})\n`;
    content += `\nScores:\n`;
    content += `  - Positive: ${result.sentimentScore.positive.toFixed(1)}%\n`;
    content += `  - Negative: ${result.sentimentScore.negative.toFixed(1)}%\n`;
    content += `  - Neutral: ${result.sentimentScore.neutral.toFixed(1)}%\n`;
    content += `\nEmotions:\n`;
    Object.entries(result.emotionScore).forEach(([key, value]) => {
        content += `  - ${key.charAt(0).toUpperCase() + key.slice(1)}: ${value.toFixed(1)}%\n`;
    });
    content += `\nKeywords:\n${result.keywords.map(k => `  - ${k.word} (${k.sentiment})`).join('\n')}\n`;
    if (result.moderation.length > 0) {
        content += `\nContent Moderation Warnings:\n`;
        result.moderation.forEach(w => {
            content += `  - [${w.category}] "${w.flaggedText}"\n`;
        });
    }
    return content;
};

const analysisToCsv = (result: AnalysisResult, originalText: string): string => {
    const headers = [
        'originalText', 'overallSentiment', 'explanation', 
        'positiveScore', 'negativeScore', 'neutralScore',
        'joy', 'sadness', 'anger', 'fear', 'surprise', 'disgust',
        'keywords', 'moderationWarnings'
    ];
    const keywordsStr = result.keywords.map(k => `${k.word} (${k.sentiment})`).join('; ');
    const moderationStr = result.moderation.map(w => `[${w.category}] ${w.flaggedText}`).join('; ');

    const row = [
        `"${originalText.replace(/"/g, '""')}"`,
        result.overallSentiment,
        `"${result.explanation.replace(/"/g, '""')}"`,
        result.sentimentScore.positive,
        result.sentimentScore.negative,
        result.sentimentScore.neutral,
        ...Object.values(result.emotionScore),
        `"${keywordsStr}"`,
        `"${moderationStr}"`
    ];

    return `${headers.join(',')}\n${row.join(',')}`;
};

const analysisToPdf = (result: AnalysisResult, originalText: string) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Sentiment Analysis Report", 14, 22);

    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Analyzed on: ${new Date().toLocaleString()}`, 14, 30);
    
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text("Original Text:", 14, 45);
    const splitText = doc.splitTextToSize(originalText, 180);
    doc.text(splitText, 14, 52);

    const startY = 52 + (splitText.length * 5) + 10;
    
    autoTable(doc, {
        startY,
        head: [['Metric', 'Result']],
        body: [
            ['Overall Sentiment', result.overallSentiment],
            ['Explanation', result.explanation],
            ['Positive Score', `${result.sentimentScore.positive.toFixed(1)}%`],
            ['Negative Score', `${result.sentimentScore.negative.toFixed(1)}%`],
            ['Neutral Score', `${result.sentimentScore.neutral.toFixed(1)}%`],
        ],
        theme: 'striped',
    });
    
    autoTable(doc, {
        head: [['Emotion', 'Score']],
        body: Object.entries(result.emotionScore).map(([key, value]) => [key, `${value.toFixed(1)}%`]),
        theme: 'grid',
    });

    if (result.keywords.length > 0) {
      autoTable(doc, {
          head: [['Keyword', 'Sentiment', 'Score']],
          body: result.keywords.map(k => [k.word, k.sentiment, k.score.toFixed(2)]),
          theme: 'grid',
      });
    }

    if (result.moderation.length > 0) {
      doc.text("Content Moderation Warnings", 14, (doc as any).lastAutoTable.finalY + 10);
      autoTable(doc, {
          startY: (doc as any).lastAutoTable.finalY + 15,
          head: [['Category', 'Flagged Text']],
          body: result.moderation.map(w => [w.category, w.flaggedText]),
      });
    }

    doc.save(`analysis-report-${getTimestamp()}.pdf`);
};

const analysisToDocx = async (result: AnalysisResult, originalText: string) => {
    const doc = new Document({
        sections: [{
            children: [
                new Paragraph({ text: "Sentiment Analysis Report", heading: HeadingLevel.TITLE }),
                new Paragraph({ text: `Original Text: ${originalText}`, style: "IntenseQuote" }),
                new Paragraph({ text: "Summary", heading: HeadingLevel.HEADING_1 }),
                new Paragraph({ children: [new TextRun({ text: "Overall Sentiment: ", bold: true }), new TextRun(result.overallSentiment)] }),
                new Paragraph({ children: [new TextRun({ text: "Explanation: ", bold: true }), new TextRun(result.explanation)] }),
                
                new Paragraph({ text: "Scores", heading: HeadingLevel.HEADING_2 }),
                new Table({
                    width: { size: '100%', type: WidthType.PERCENTAGE },
                    rows: [
                        new TableRow({ children: [new TableCell({ children: [new Paragraph("Positive")] }), new TableCell({ children: [new Paragraph(`${result.sentimentScore.positive.toFixed(1)}%`)] })] }),
                        new TableRow({ children: [new TableCell({ children: [new Paragraph("Negative")] }), new TableCell({ children: [new Paragraph(`${result.sentimentScore.negative.toFixed(1)}%`)] })] }),
                        new TableRow({ children: [new TableCell({ children: [new Paragraph("Neutral")] }), new TableCell({ children: [new Paragraph(`${result.sentimentScore.neutral.toFixed(1)}%`)] })] }),
                    ]
                }),

                 new Paragraph({ text: "Keywords", heading: HeadingLevel.HEADING_2 }),
                 ...result.keywords.map(k => new Paragraph({ text: `- ${k.word} (${k.sentiment})`, bullet: { level: 0 }})),
            ],
        }],
    });
    const blob = await Packer.toBlob(doc);
    saveFile(blob, `analysis-report-${getTimestamp()}.docx`);
};

export const exportAnalysisResult = (result: AnalysisResult, originalText: string, format: 'pdf' | 'docx' | 'csv' | 'txt' | 'json') => {
    const filename = `analysis-${getTimestamp()}`;
    switch (format) {
        case 'json':
            saveFile(new Blob([JSON.stringify({result, originalText}, null, 2)], { type: 'application/json' }), `${filename}.json`);
            break;
        case 'txt':
            saveFile(new Blob([analysisToText(result, originalText)], { type: 'text/plain' }), `${filename}.txt`);
            break;
        case 'csv':
            saveFile(new Blob([analysisToCsv(result, originalText)], { type: 'text/csv' }), `${filename}.csv`);
            break;
        case 'pdf':
            analysisToPdf(result, originalText);
            break;
        case 'docx':
            analysisToDocx(result, originalText);
            break;
    }
};


// --- COMPARISON EXPORT ---

const comparisonToText = (result: ComparisonResult): string => {
    let content = `Text Comparison Report\n======================\n\n`;
    content += `Summary of Text A:\n${result.summaryA}\n\n`;
    content += `Summary of Text B:\n${result.summaryB}\n\n`;
    content += `Sentiment Comparison:\n${result.sentimentComparison}\n\n`;
    content += `Shared Themes:\n${result.sharedThemes.length > 0 ? result.sharedThemes.map(t => `- ${t}`).join('\n') : 'None'}\n\n`;
    content += `Unique to Text A:\n${result.uniqueThemesA.length > 0 ? result.uniqueThemesA.map(t => `- ${t}`).join('\n') : 'None'}\n\n`;
    content += `Unique to Text B:\n${result.uniqueThemesB.length > 0 ? result.uniqueThemesB.map(t => `- ${t}`).join('\n') : 'None'}\n\n`;
    content += `Verdict:\n${result.verdict}`;
    return content;
};

export const exportComparisonResult = (result: ComparisonResult, format: 'pdf' | 'docx' | 'csv' | 'txt' | 'json') => {
    // Implementations for PDF, DOCX, CSV would be similar to single analysis
     const filename = `comparison-${getTimestamp()}`;
     switch(format) {
        case 'json':
            saveFile(new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' }), `${filename}.json`);
            break;
        case 'txt':
             saveFile(new Blob([comparisonToText(result)], { type: 'text/plain' }), `${filename}.txt`);
             break;
        // Default to JSON for formats not fully implemented here
        default:
             alert(`Export to ${format.toUpperCase()} for comparisons is not yet implemented. Downloading as JSON.`);
             saveFile(new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' }), `${filename}.json`);
     }
};


// --- HISTORY EXPORT ---

const historyToCsv = (history: HistoryItem[]): string => {
    const headers = [
        'timestamp', 'text', 'overallSentiment', 'positiveScore', 'negativeScore', 'neutralScore',
        'joy', 'sadness', 'anger', 'fear', 'surprise', 'disgust', 'keywords'
    ];
    const rows = history.map(item => {
        const { timestamp, text, result } = item;
        const { sentimentScore, emotionScore, keywords, overallSentiment } = result;
        const keywordsStr = keywords.map(k => k.word).join('; ');
        const row = [
            new Date(timestamp).toISOString(),
            `"${text.replace(/"/g, '""')}"`,
            overallSentiment,
            sentimentScore.positive,
            sentimentScore.negative,
            sentimentScore.neutral,
            ...Object.values(emotionScore),
            `"${keywordsStr}"`
        ];
        return row.join(',');
    });
    return `${headers.join(',')}\n${rows.join('\n')}`;
};

const historyToPdf = (history: HistoryItem[]) => {
    const doc = new jsPDF();
    doc.text("Analysis History Report", 14, 22);
    autoTable(doc, {
        head: [['Date', 'Sentiment', 'Text Snippet']],
        body: history.map(item => [
            new Date(item.timestamp).toLocaleString(),
            item.result.overallSentiment,
            item.text.slice(0, 50) + (item.text.length > 50 ? '...' : '')
        ]),
    });
    doc.save(`history-report-${getTimestamp()}.pdf`);
};

export const exportHistory = (history: HistoryItem[], format: 'pdf' | 'docx' | 'csv' | 'txt' | 'json') => {
     const filename = `history-${getTimestamp()}`;
     if (history.length === 0) {
        alert("No history to export.");
        return;
     }

     switch(format) {
        case 'json':
            saveFile(new Blob([JSON.stringify(history, null, 2)], { type: 'application/json' }), `${filename}.json`);
            break;
        case 'csv':
            saveFile(new Blob([historyToCsv(history)], { type: 'text/csv' }), `${filename}.csv`);
            break;
        case 'pdf':
            historyToPdf(history);
            break;
        // Default to JSON for formats not fully implemented here
        default:
             alert(`Export to ${format.toUpperCase()} for history is not yet implemented. Downloading as JSON.`);
             saveFile(new Blob([JSON.stringify(history, null, 2)], { type: 'application/json' }), `${filename}.json`);
     }
};
