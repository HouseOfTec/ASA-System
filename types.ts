
export enum Sentiment {
  Positive = 'positive',
  Negative = 'negative',
  Neutral = 'neutral',
}

export interface SentimentScore {
  positive: number;
  negative: number;
  neutral: number;
}

export interface EmotionScore {
  joy: number;
  sadness: number;
  anger: number;
  fear: number;
  surprise: number;
  disgust: number;
}

export interface Keyword {
  word: string;
  sentiment: Sentiment;
  score: number;
}

export interface HighlightedSpan {
  text: string;
  sentiment: Sentiment | 'none';
}

export enum ModerationCategory {
  HateSpeech = 'hate_speech',
  Profanity = 'profanity',
  Slurs = 'racial_slurs',
  Offensive = 'offensive_language',
  SelfHarm = 'self_harm',
}

export interface ModerationWarning {
  category: ModerationCategory;
  confidence: number;
  flaggedText: string;
}

export interface AnalysisResult {
  overallSentiment: Sentiment;
  sentimentScore: SentimentScore;
  emotionScore: EmotionScore;
  keywords: Keyword[];
  highlightedSpans: HighlightedSpan[];
  moderation: ModerationWarning[];
  explanation: string;
}

export interface ComparisonResult {
  summaryA: string;
  summaryB: string;
  sentimentComparison: string;
  sharedThemes: string[];
  uniqueThemesA: string[];
  uniqueThemesB: string[];
  verdict: string;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  text: string;
  result: AnalysisResult;
}

export interface AccuracySample {
  id: number;
  text: string;
  manualSentiment: Sentiment;
  apiResult: AnalysisResult;
}
