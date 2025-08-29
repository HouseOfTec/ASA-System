
import { Sentiment, type AccuracySample } from './types';

export const SENTIMENT_COLORS: Record<Sentiment, { text: string; bg: string; border: string }> = {
  [Sentiment.Positive]: {
    text: 'text-green-800 dark:text-green-200',
    bg: 'bg-green-100 dark:bg-green-900',
    border: 'border-green-500',
  },
  [Sentiment.Negative]: {
    text: 'text-red-800 dark:text-red-200',
    bg: 'bg-red-100 dark:bg-red-900',
    border: 'border-red-500',
  },
  [Sentiment.Neutral]: {
    text: 'text-gray-800 dark:text-gray-200',
    bg: 'bg-gray-100 dark:bg-gray-700',
    border: 'border-gray-500',
  },
};

export const accuracyData: AccuracySample[] = [
  {
    id: 1,
    text: "This is the best product I have ever used. Absolutely fantastic!",
    manualSentiment: Sentiment.Positive,
    apiResult: {
      overallSentiment: Sentiment.Positive,
      sentimentScore: { positive: 98.2, negative: 1.1, neutral: 0.7 },
      emotionScore: { joy: 85, sadness: 0, anger: 0, fear: 0, surprise: 15, disgust: 0 },
      keywords: [{ word: 'best product', sentiment: Sentiment.Positive, score: 0.9 }, { word: 'fantastic', sentiment: Sentiment.Positive, score: 0.95 }],
      highlightedSpans: [{ text: 'This is the ', sentiment: 'none' }, { text: 'best product', sentiment: Sentiment.Positive }, { text: ' I have ever used. Absolutely ', sentiment: 'none' }, { text: 'fantastic', sentiment: Sentiment.Positive }, { text: '!', sentiment: 'none' }],
      moderation: [],
      explanation: "The text contains strong positive words like 'best' and 'fantastic', indicating a high level of satisfaction."
    }
  },
  {
    id: 2,
    text: "I am extremely disappointed with the quality and the customer service.",
    manualSentiment: Sentiment.Negative,
    apiResult: {
      overallSentiment: Sentiment.Negative,
      sentimentScore: { positive: 2.5, negative: 95.8, neutral: 1.7 },
      emotionScore: { joy: 0, sadness: 50, anger: 45, fear: 0, surprise: 5, disgust: 0 },
      keywords: [{ word: 'disappointed', sentiment: Sentiment.Negative, score: 0.9 }, { word: 'quality', sentiment: Sentiment.Negative, score: 0.8 }],
      highlightedSpans: [{ text: 'I am extremely ', sentiment: 'none' }, { text: 'disappointed', sentiment: Sentiment.Negative }, { text: ' with the quality and the customer service.', sentiment: 'none' }],
      moderation: [],
      explanation: "The word 'disappointed' clearly indicates a negative experience."
    }
  },
  {
    id: 3,
    text: "The package contains a user manual and a power cord.",
    manualSentiment: Sentiment.Neutral,
    apiResult: {
      overallSentiment: Sentiment.Neutral,
      sentimentScore: { positive: 0.5, negative: 0.5, neutral: 99.0 },
      emotionScore: { joy: 0, sadness: 0, anger: 0, fear: 0, surprise: 0, disgust: 0 },
      keywords: [{ word: 'user manual', sentiment: Sentiment.Neutral, score: 0.7 }, { word: 'power cord', sentiment: Sentiment.Neutral, score: 0.7 }],
      highlightedSpans: [{ text: 'The package contains a user manual and a power cord.', sentiment: 'none' }],
      moderation: [],
      explanation: "The text is a factual statement listing contents, carrying no emotional weight."
    }
  },
  {
    id: 4,
    text: "The movie was not bad, I actually kind of liked it.",
    manualSentiment: Sentiment.Positive,
    apiResult: {
      overallSentiment: Sentiment.Neutral,
      sentimentScore: { positive: 40.0, negative: 15.0, neutral: 45.0 },
      emotionScore: { joy: 20, sadness: 5, anger: 0, fear: 0, surprise: 0, disgust: 0 },
      keywords: [{ word: 'not bad', sentiment: Sentiment.Neutral, score: 0.8 }, { word: 'liked it', sentiment: Sentiment.Positive, score: 0.8 }],
      highlightedSpans: [{ text: 'The movie was ', sentiment: 'none' }, { text: 'not bad', sentiment: Sentiment.Neutral }, { text: ', I actually kind of ', sentiment: 'none' }, { text: 'liked it', sentiment: Sentiment.Positive }, { text: '.', sentiment: 'none' }],
      moderation: [],
      explanation: "The text contains mixed signals with 'not bad' and 'liked it', leading to a neutral classification."
    }
  },
  {
    id: 5,
    text: "Oh, great. Another meeting that could have been an email. Just what I needed.",
    manualSentiment: Sentiment.Negative,
    apiResult: {
      overallSentiment: Sentiment.Positive,
      sentimentScore: { positive: 85.0, negative: 5.0, neutral: 10.0 },
      emotionScore: { joy: 70, sadness: 0, anger: 0, fear: 0, surprise: 10, disgust: 0 },
      keywords: [{ word: 'great', sentiment: Sentiment.Positive, score: 0.9 }],
      highlightedSpans: [{ text: 'Oh, ', sentiment: 'none' }, { text: 'great', sentiment: Sentiment.Positive }, { text: '. Another meeting that could have been an email. Just what I needed.', sentiment: 'none' }],
      moderation: [],
      explanation: "The presence of the word 'great' strongly suggests a positive sentiment."
    }
  },
  {
    id: 6,
    text: "The performance was adequate, meeting the minimum requirements.",
    manualSentiment: Sentiment.Neutral,
    apiResult: {
      overallSentiment: Sentiment.Neutral,
      sentimentScore: { positive: 10.0, negative: 5.0, neutral: 85.0 },
      emotionScore: { joy: 0, sadness: 0, anger: 0, fear: 0, surprise: 0, disgust: 0 },
      keywords: [{ word: 'adequate', sentiment: Sentiment.Neutral, score: 0.8 }, { word: 'minimum requirements', sentiment: Sentiment.Neutral, score: 0.8 }],
      highlightedSpans: [{ text: 'The performance was ', sentiment: 'none' }, { text: 'adequate', sentiment: Sentiment.Neutral }, { text: ', meeting the ', sentiment: 'none' }, { text: 'minimum requirements', sentiment: Sentiment.Neutral }, { text: '.', sentiment: 'none' }],
      moderation: [],
      explanation: "Words like 'adequate' and 'minimum requirements' describe a neutral, satisfactory but not exceptional outcome."
    }
  },
  {
    id: 7,
    text: "I'm not saying I hated it, but I wouldn't watch it again.",
    manualSentiment: Sentiment.Negative,
    apiResult: {
      overallSentiment: Sentiment.Negative,
      sentimentScore: { positive: 15.0, negative: 65.0, neutral: 20.0 },
      emotionScore: { joy: 0, sadness: 20, anger: 5, fear: 0, surprise: 0, disgust: 10 },
      keywords: [{ word: 'hated it', sentiment: Sentiment.Negative, score: 0.8 }, { word: "wouldn't watch it again", sentiment: Sentiment.Negative, score: 0.9 }],
      highlightedSpans: [{ text: "I'm not saying I ", sentiment: 'none' }, { text: 'hated it', sentiment: Sentiment.Negative }, { text: ', but I ', sentiment: 'none' }, { text: "wouldn't watch it again", sentiment: Sentiment.Negative }, { text: '.', sentiment: 'none' }],
      moderation: [],
      explanation: "The phrase 'wouldn't watch it again' is a strong indicator of negative sentiment, despite the initial soft phrasing."
    }
  },
  {
    id: 8,
    text: "The weather today is 72 degrees and sunny.",
    manualSentiment: Sentiment.Neutral,
    apiResult: {
      overallSentiment: Sentiment.Positive,
      sentimentScore: { positive: 60, negative: 0, neutral: 40 },
      emotionScore: { joy: 40, sadness: 0, anger: 0, fear: 0, surprise: 0, disgust: 0 },
      keywords: [{ word: 'sunny', sentiment: Sentiment.Positive, score: 0.9 }],
      highlightedSpans: [{ text: 'The weather today is 72 degrees and ', sentiment: 'none' }, { text: 'sunny', sentiment: Sentiment.Positive }, { text: '.', sentiment: 'none' }],
      moderation: [],
      explanation: "The word 'sunny' is typically associated with positive feelings, influencing the classification."
    }
  },
  {
    id: 9,
    text: "It's a surprisingly effective solution to a very minor problem.",
    manualSentiment: Sentiment.Positive,
    apiResult: {
      overallSentiment: Sentiment.Positive,
      sentimentScore: { positive: 75.0, negative: 5.0, neutral: 20.0 },
      emotionScore: { joy: 30, sadness: 0, anger: 0, fear: 0, surprise: 25, disgust: 0 },
      keywords: [{ word: 'surprisingly effective', sentiment: Sentiment.Positive, score: 0.9 }, { word: 'minor problem', sentiment: Sentiment.Neutral, score: 0.7 }],
      highlightedSpans: [{ text: "It's a ", sentiment: 'none' }, { text: 'surprisingly effective', sentiment: Sentiment.Positive }, { text: ' solution to a very ', sentiment: 'none' }, { text: 'minor problem', sentiment: Sentiment.Neutral }, { text: '.', sentiment: 'none' }],
      moderation: [],
      explanation: "The phrase 'surprisingly effective' conveys a positive outcome, outweighing the 'minor problem' context."
    }
  },
  {
    id: 10,
    text: "The delivery was delayed, but the product itself is flawless.",
    manualSentiment: Sentiment.Positive,
    apiResult: {
      overallSentiment: Sentiment.Positive,
      sentimentScore: { positive: 70.0, negative: 25.0, neutral: 5.0 },
      emotionScore: { joy: 40, sadness: 10, anger: 5, fear: 0, surprise: 0, disgust: 0 },
      keywords: [{ word: 'delivery delayed', sentiment: Sentiment.Negative, score: 0.8 }, { word: 'flawless', sentiment: Sentiment.Positive, score: 0.95 }],
      highlightedSpans: [{ text: 'The ', sentiment: 'none' }, { text: 'delivery was delayed', sentiment: Sentiment.Negative }, { text: ', but the product itself is ', sentiment: 'none' }, { text: 'flawless', sentiment: Sentiment.Positive }, { text: '.', sentiment: 'none' }],
      moderation: [],
      explanation: "The strong positive word 'flawless' determines the overall sentiment, despite the initial negative point about delivery."
    }
  },
  {
    id: 11,
    text: "My package arrived with a huge dent and the product inside is broken. I want a full refund immediately.",
    manualSentiment: Sentiment.Negative,
    apiResult: {
      overallSentiment: Sentiment.Negative,
      sentimentScore: { positive: 1.0, negative: 98.0, neutral: 1.0 },
      emotionScore: { joy: 0, sadness: 30, anger: 65, fear: 0, surprise: 5, disgust: 0 },
      keywords: [{ word: 'dent', sentiment: Sentiment.Negative, score: 0.8 }, { word: 'broken', sentiment: Sentiment.Negative, score: 0.95 }, { word: 'refund', sentiment: Sentiment.Negative, score: 0.9 }],
      highlightedSpans: [{ text: 'My package arrived with a huge ', sentiment: 'none' }, { text: 'dent', sentiment: Sentiment.Negative }, { text: ' and the product inside is ', sentiment: 'none' }, { text: 'broken', sentiment: Sentiment.Negative }, { text: '. I want a ', sentiment: 'none' }, { text: 'full refund immediately', sentiment: Sentiment.Negative }, { text: '.', sentiment: 'none' }],
      moderation: [],
      explanation: "The words 'dent', 'broken', and 'refund' strongly indicate a negative experience and dissatisfaction with the product."
    }
  },
  {
    id: 12,
    text: "The software keeps crashing after the latest update. It's completely unusable for my work.",
    manualSentiment: Sentiment.Negative,
    apiResult: {
      overallSentiment: Sentiment.Negative,
      sentimentScore: { positive: 0.5, negative: 99.0, neutral: 0.5 },
      emotionScore: { joy: 0, sadness: 40, anger: 55, fear: 0, surprise: 5, disgust: 0 },
      keywords: [{ word: 'crashing', sentiment: Sentiment.Negative, score: 0.9 }, { word: 'unusable', sentiment: Sentiment.Negative, score: 0.95 }],
      highlightedSpans: [{ text: 'The software keeps ', sentiment: 'none' }, { text: 'crashing', sentiment: Sentiment.Negative }, { text: ' after the latest update. It\'s completely ', sentiment: 'none' }, { text: 'unusable', sentiment: Sentiment.Negative }, { text: ' for my work.', sentiment: 'none' }],
      moderation: [],
      explanation: "The terms 'crashing' and 'unusable' clearly describe a critical failure of the software, leading to a negative sentiment."
    }
  },
  {
    id: 13,
    text: "I was on hold for 45 minutes just to be hung up on. Your customer service is a joke.",
    manualSentiment: Sentiment.Negative,
    apiResult: {
      overallSentiment: Sentiment.Negative,
      sentimentScore: { positive: 2.0, negative: 97.0, neutral: 1.0 },
      emotionScore: { joy: 0, sadness: 20, anger: 70, fear: 0, surprise: 5, disgust: 5 },
      keywords: [{ word: 'on hold for 45 minutes', sentiment: Sentiment.Negative, score: 0.8 }, { word: 'hung up on', sentiment: Sentiment.Negative, score: 0.9 }, { word: 'joke', sentiment: Sentiment.Negative, score: 0.85 }],
      highlightedSpans: [{ text: 'I was ', sentiment: 'none' }, { text: 'on hold for 45 minutes', sentiment: Sentiment.Negative }, { text: ' just to be ', sentiment: 'none' }, { text: 'hung up on', sentiment: Sentiment.Negative }, { text: '. Your customer service is a ', sentiment: 'none' }, { text: 'joke', sentiment: Sentiment.Negative }, { text: '.', sentiment: 'none' }],
      moderation: [],
      explanation: "The combination of a long wait time, being disconnected, and calling the service a 'joke' indicates extreme frustration."
    }
  },
  {
    id: 14,
    text: "The quality is much lower than advertised. The material feels cheap and flimsy.",
    manualSentiment: Sentiment.Negative,
    apiResult: {
      overallSentiment: Sentiment.Negative,
      sentimentScore: { positive: 5.0, negative: 90.0, neutral: 5.0 },
      emotionScore: { joy: 0, sadness: 60, anger: 10, fear: 0, surprise: 0, disgust: 20 },
      keywords: [{ word: 'lower than advertised', sentiment: Sentiment.Negative, score: 0.8 }, { word: 'cheap', sentiment: Sentiment.Negative, score: 0.9 }, { word: 'flimsy', sentiment: Sentiment.Negative, score: 0.85 }],
      highlightedSpans: [{ text: 'The quality is ', sentiment: 'none' }, { text: 'much lower than advertised', sentiment: Sentiment.Negative }, { text: '. The material feels ', sentiment: 'none' }, { text: 'cheap', sentiment: Sentiment.Negative }, { text: ' and ', sentiment: 'none' }, { text: 'flimsy', sentiment: Sentiment.Negative }, { text: '.', sentiment: 'none' }],
      moderation: [],
      explanation: "Negative descriptors like 'lower than advertised', 'cheap', and 'flimsy' clearly convey disappointment with the product's quality."
    }
  },
  {
    id: 15,
    text: "You charged my card twice for the same order. Please fix this error.",
    manualSentiment: Sentiment.Negative,
    apiResult: {
      overallSentiment: Sentiment.Negative,
      sentimentScore: { positive: 3.0, negative: 85.0, neutral: 12.0 },
      emotionScore: { joy: 0, sadness: 20, anger: 50, fear: 10, surprise: 10, disgust: 0 },
      keywords: [{ word: 'charged my card twice', sentiment: Sentiment.Negative, score: 0.95 }, { word: 'error', sentiment: Sentiment.Negative, score: 0.8 }],
      highlightedSpans: [{ text: 'You ', sentiment: 'none' }, { text: 'charged my card twice', sentiment: Sentiment.Negative }, { text: ' for the same order. Please fix this ', sentiment: 'none' }, { text: 'error', sentiment: Sentiment.Negative }, { text: '.', sentiment: 'none' }],
      moderation: [],
      explanation: "The text reports a significant billing issue ('charged twice'), which is a clear source of negative sentiment."
    }
  },
  {
    id: 16,
    text: "The item I received is the wrong color. I ordered blue, not green.",
    manualSentiment: Sentiment.Negative,
    apiResult: {
      overallSentiment: Sentiment.Negative,
      sentimentScore: { positive: 5.0, negative: 80.0, neutral: 15.0 },
      emotionScore: { joy: 0, sadness: 40, anger: 20, fear: 0, surprise: 30, disgust: 0 },
      keywords: [{ word: 'wrong color', sentiment: Sentiment.Negative, score: 0.9 }],
      highlightedSpans: [{ text: 'The item I received is the ', sentiment: 'none' }, { text: 'wrong color', sentiment: Sentiment.Negative }, { text: '. I ordered blue, not green.', sentiment: 'none' }],
      moderation: [],
      explanation: "Receiving the 'wrong color' indicates an order fulfillment error and customer disappointment."
    }
  },
  {
    id: 17,
    text: "I have sent three emails and have not received a single response.",
    manualSentiment: Sentiment.Negative,
    apiResult: {
      overallSentiment: Sentiment.Negative,
      sentimentScore: { positive: 1.0, negative: 90.0, neutral: 9.0 },
      emotionScore: { joy: 0, sadness: 50, anger: 40, fear: 0, surprise: 0, disgust: 0 },
      keywords: [{ word: 'three emails', sentiment: Sentiment.Neutral, score: 0.7 }, { word: 'not received a single response', sentiment: Sentiment.Negative, score: 0.95 }],
      highlightedSpans: [{ text: 'I have sent three emails and have ', sentiment: 'none' }, { text: 'not received a single response', sentiment: Sentiment.Negative }, { text: '.', sentiment: 'none' }],
      moderation: [],
      explanation: "The user's statement about receiving no response after multiple attempts signifies poor communication and a negative service experience."
    }
  },
  {
    id: 18,
    text: "The instructions are impossible to understand. Are they written for engineers?",
    manualSentiment: Sentiment.Negative,
    apiResult: {
      overallSentiment: Sentiment.Negative,
      sentimentScore: { positive: 2.0, negative: 88.0, neutral: 10.0 },
      emotionScore: { joy: 0, sadness: 30, anger: 45, fear: 0, surprise: 5, disgust: 0 },
      keywords: [{ word: 'impossible to understand', sentiment: Sentiment.Negative, score: 0.9 }],
      highlightedSpans: [{ text: 'The instructions are ', sentiment: 'none' }, { text: 'impossible to understand', sentiment: Sentiment.Negative }, { text: '. Are they written for engineers?', sentiment: 'none' }],
      moderation: [],
      explanation: "The phrase 'impossible to understand' points to a significant usability issue, causing frustration for the user."
    }
  },
  {
    id: 19,
    text: "This product gave me a rash. There must be an ingredient I'm allergic to that wasn't listed.",
    manualSentiment: Sentiment.Negative,
    apiResult: {
      overallSentiment: Sentiment.Negative,
      sentimentScore: { positive: 0.0, negative: 95.0, neutral: 5.0 },
      emotionScore: { joy: 0, sadness: 20, anger: 20, fear: 40, surprise: 10, disgust: 10 },
      keywords: [{ word: 'rash', sentiment: Sentiment.Negative, score: 0.95 }, { word: 'allergic', sentiment: Sentiment.Negative, score: 0.9 }],
      highlightedSpans: [{ text: 'This product gave me a ', sentiment: 'none' }, { text: 'rash', sentiment: Sentiment.Negative }, { text: '. There must be an ingredient I\'m ', sentiment: 'none' }, { text: 'allergic', sentiment: Sentiment.Negative }, { text: ' to that wasn\'t listed.', sentiment: 'none' }],
      moderation: [],
      explanation: "The text describes a negative physical reaction ('rash', 'allergic'), which is a serious product complaint."
    }
  },
  {
    id: 20,
    text: "The battery life is terrible. It barely lasts two hours on a full charge.",
    manualSentiment: Sentiment.Negative,
    apiResult: {
      overallSentiment: Sentiment.Negative,
      sentimentScore: { positive: 5.0, negative: 92.0, neutral: 3.0 },
      emotionScore: { joy: 0, sadness: 60, anger: 20, fear: 0, surprise: 0, disgust: 0 },
      keywords: [{ word: 'terrible', sentiment: Sentiment.Negative, score: 0.9 }, { word: 'barely lasts two hours', sentiment: Sentiment.Negative, score: 0.85 }],
      highlightedSpans: [{ text: 'The battery life is ', sentiment: 'none' }, { text: 'terrible', sentiment: Sentiment.Negative }, { text: '. It ', sentiment: 'none' }, { text: 'barely lasts two hours', sentiment: Sentiment.Negative }, { text: ' on a full charge.', sentiment: 'none' }],
      moderation: [],
      explanation: "Calling the battery life 'terrible' and providing a specific, poor performance metric clearly indicates dissatisfaction."
    }
  },
  {
    id: 21,
    text: "Kudos to your team for creating such an intuitive and powerful tool. It has streamlined our workflow significantly.",
    manualSentiment: Sentiment.Positive,
    apiResult: {
      overallSentiment: Sentiment.Positive,
      sentimentScore: { positive: 97.0, negative: 1.0, neutral: 2.0 },
      emotionScore: { joy: 80, sadness: 0, anger: 0, fear: 0, surprise: 10, disgust: 0 },
      keywords: [{ word: 'kudos', sentiment: Sentiment.Positive, score: 0.85 }, { word: 'intuitive', sentiment: Sentiment.Positive, score: 0.9 }, { word: 'powerful tool', sentiment: Sentiment.Positive, score: 0.9 }],
      highlightedSpans: [{ text: 'Kudos', sentiment: Sentiment.Positive }, { text: ' to your team for creating such an ', sentiment: 'none' }, { text: 'intuitive', sentiment: Sentiment.Positive }, { text: ' and ', sentiment: 'none' }, { text: 'powerful tool', sentiment: Sentiment.Positive }, { text: '. It has ', sentiment: 'none' }, { text: 'streamlined our workflow significantly', sentiment: Sentiment.Positive }, { text: '.', sentiment: 'none' }],
      moderation: [],
      explanation: "Words like 'Kudos', 'intuitive', 'powerful', and 'streamlined' are strong indicators of positive feedback and satisfaction."
    }
  },
  {
    id: 22,
    text: "The support agent, Mark, went above and beyond to help me. Best customer service I've ever had.",
    manualSentiment: Sentiment.Positive,
    apiResult: {
      overallSentiment: Sentiment.Positive,
      sentimentScore: { positive: 99.0, negative: 0.5, neutral: 0.5 },
      emotionScore: { joy: 90, sadness: 0, anger: 0, fear: 0, surprise: 10, disgust: 0 },
      keywords: [{ word: 'above and beyond', sentiment: Sentiment.Positive, score: 0.95 }, { word: 'best customer service', sentiment: Sentiment.Positive, score: 0.98 }],
      highlightedSpans: [{ text: 'The support agent, Mark, went ', sentiment: 'none' }, { text: 'above and beyond', sentiment: Sentiment.Positive }, { text: ' to help me. ', sentiment: 'none' }, { text: 'Best customer service', sentiment: Sentiment.Positive }, { text: ' I\'ve ever had.', sentiment: 'none' }],
      moderation: [],
      explanation: "The phrases 'above and beyond' and 'best customer service' represent extremely high praise for the support interaction."
    }
  },
  {
    id: 23,
    text: "Blown away by the quality and design. Worth every penny. I'll be recommending this to everyone.",
    manualSentiment: Sentiment.Positive,
    apiResult: {
      overallSentiment: Sentiment.Positive,
      sentimentScore: { positive: 98.0, negative: 1.0, neutral: 1.0 },
      emotionScore: { joy: 85, sadness: 0, anger: 0, fear: 0, surprise: 15, disgust: 0 },
      keywords: [{ word: 'blown away', sentiment: Sentiment.Positive, score: 0.9 }, { word: 'worth every penny', sentiment: Sentiment.Positive, score: 0.9 }, { word: 'recommending', sentiment: Sentiment.Positive, score: 0.85 }],
      highlightedSpans: [{ text: 'Blown away', sentiment: Sentiment.Positive }, { text: ' by the quality and design. ', sentiment: 'none' }, { text: 'Worth every penny', sentiment: Sentiment.Positive }, { text: '. I\'ll be ', sentiment: 'none' }, { text: 'recommending this to everyone', sentiment: Sentiment.Positive }, { text: '.', sentiment: 'none' }],
      moderation: [],
      explanation: "Strong positive phrases like 'blown away' and 'worth every penny' express a high degree of satisfaction."
    }
  },
  {
    id: 24,
    text: "This is a game-changer! It's so much better than the competitor's product.",
    manualSentiment: Sentiment.Positive,
    apiResult: {
      overallSentiment: Sentiment.Positive,
      sentimentScore: { positive: 95.0, negative: 2.0, neutral: 3.0 },
      emotionScore: { joy: 70, sadness: 0, anger: 0, fear: 0, surprise: 30, disgust: 0 },
      keywords: [{ word: 'game-changer', sentiment: Sentiment.Positive, score: 0.95 }, { word: 'much better', sentiment: Sentiment.Positive, score: 0.9 }],
      highlightedSpans: [{ text: 'This is a ', sentiment: 'none' }, { text: 'game-changer', sentiment: Sentiment.Positive }, { text: '! It\'s ', sentiment: 'none' }, { text: 'so much better', sentiment: Sentiment.Positive }, { text: ' than the competitor\'s product.', sentiment: 'none' }],
      moderation: [],
      explanation: "The enthusiastic term 'game-changer' and the direct positive comparison ('much better') indicate a very positive review."
    }
  },
  {
    id: 25,
    text: "I've been a loyal customer for years and you never disappoint. Keep up the amazing work.",
    manualSentiment: Sentiment.Positive,
    apiResult: {
      overallSentiment: Sentiment.Positive,
      sentimentScore: { positive: 99.5, negative: 0.0, neutral: 0.5 },
      emotionScore: { joy: 95, sadness: 0, anger: 0, fear: 0, surprise: 0, disgust: 0 },
      keywords: [{ word: 'loyal customer', sentiment: Sentiment.Positive, score: 0.8 }, { word: 'never disappoint', sentiment: Sentiment.Positive, score: 0.9 }, { word: 'amazing work', sentiment: Sentiment.Positive, score: 0.95 }],
      highlightedSpans: [{ text: 'I\'ve been a ', sentiment: 'none' }, { text: 'loyal customer', sentiment: Sentiment.Positive }, { text: ' for years and you ', sentiment: 'none' }, { text: 'never disappoint', sentiment: Sentiment.Positive }, { text: '. Keep up the ', sentiment: 'none' }, { text: 'amazing work', sentiment: Sentiment.Positive }, { text: '.', sentiment: 'none' }],
      moderation: [],
      explanation: "Expressing long-term loyalty and using phrases like 'never disappoint' and 'amazing work' conveys strong positive sentiment."
    }
  },
  {
    id: 26,
    text: "The checkout process was smooth and easy. I received my order confirmation instantly.",
    manualSentiment: Sentiment.Positive,
    apiResult: {
      overallSentiment: Sentiment.Positive,
      sentimentScore: { positive: 90.0, negative: 0.0, neutral: 10.0 },
      emotionScore: { joy: 60, sadness: 0, anger: 0, fear: 0, surprise: 0, disgust: 0 },
      keywords: [{ word: 'smooth and easy', sentiment: Sentiment.Positive, score: 0.9 }],
      highlightedSpans: [{ text: 'The checkout process was ', sentiment: 'none' }, { text: 'smooth and easy', sentiment: Sentiment.Positive }, { text: '. I received my order confirmation instantly.', sentiment: 'none' }],
      moderation: [],
      explanation: "The description of the process as 'smooth and easy' is a clear positive endorsement of the user experience."
    }
  },
  {
    id: 27,
    text: "Thank you for the quick shipping! The item arrived two days earlier than expected.",
    manualSentiment: Sentiment.Positive,
    apiResult: {
      overallSentiment: Sentiment.Positive,
      sentimentScore: { positive: 96.0, negative: 1.0, neutral: 3.0 },
      emotionScore: { joy: 75, sadness: 0, anger: 0, fear: 0, surprise: 25, disgust: 0 },
      keywords: [{ word: 'thank you', sentiment: Sentiment.Positive, score: 0.8 }, { word: 'quick shipping', sentiment: Sentiment.Positive, score: 0.9 }, { word: 'earlier than expected', sentiment: Sentiment.Positive, score: 0.9 }],
      highlightedSpans: [{ text: 'Thank you', sentiment: Sentiment.Positive }, { text: ' for the ', sentiment: 'none' }, { text: 'quick shipping', sentiment: Sentiment.Positive }, { text: '! The item arrived two days ', sentiment: 'none' }, { text: 'earlier than expected', sentiment: Sentiment.Positive }, { text: '.', sentiment: 'none' }],
      moderation: [],
      explanation: "Expressing thanks and noting an early delivery are clear indicators of a positive customer experience."
    }
  },
  {
    id: 28,
    text: "The new feature you added is fantastic. It's exactly what I was hoping for.",
    manualSentiment: Sentiment.Positive,
    apiResult: {
      overallSentiment: Sentiment.Positive,
      sentimentScore: { positive: 98.0, negative: 0.0, neutral: 2.0 },
      emotionScore: { joy: 80, sadness: 0, anger: 0, fear: 0, surprise: 10, disgust: 0 },
      keywords: [{ word: 'fantastic', sentiment: Sentiment.Positive, score: 0.95 }, { word: 'exactly what I was hoping for', sentiment: Sentiment.Positive, score: 0.9 }],
      highlightedSpans: [{ text: 'The new feature you added is ', sentiment: 'none' }, { text: 'fantastic', sentiment: Sentiment.Positive }, { text: '. It\'s ', sentiment: 'none' }, { text: 'exactly what I was hoping for', sentiment: Sentiment.Positive }, { text: '.', sentiment: 'none' }],
      moderation: [],
      explanation: "The word 'fantastic' and the confirmation that the feature met expectations signal strong user satisfaction."
    }
  },
  {
    id: 29,
    text: "I appreciate the detailed and helpful response from your support team.",
    manualSentiment: Sentiment.Positive,
    apiResult: {
      overallSentiment: Sentiment.Positive,
      sentimentScore: { positive: 95.0, negative: 1.0, neutral: 4.0 },
      emotionScore: { joy: 70, sadness: 0, anger: 0, fear: 0, surprise: 0, disgust: 0 },
      keywords: [{ word: 'appreciate', sentiment: Sentiment.Positive, score: 0.9 }, { word: 'detailed and helpful', sentiment: Sentiment.Positive, score: 0.9 }],
      highlightedSpans: [{ text: 'I ', sentiment: 'none' }, { text: 'appreciate', sentiment: Sentiment.Positive }, { text: ' the ', sentiment: 'none' }, { text: 'detailed and helpful', sentiment: Sentiment.Positive }, { text: ' response from your support team.', sentiment: 'none' }],
      moderation: [],
      explanation: "Using words like 'appreciate' and 'helpful' to describe the support interaction is clearly positive."
    }
  },
  {
    id: 30,
    text: "The product works perfectly, and the setup was surprisingly simple.",
    manualSentiment: Sentiment.Positive,
    apiResult: {
      overallSentiment: Sentiment.Positive,
      sentimentScore: { positive: 97.0, negative: 0.5, neutral: 2.5 },
      emotionScore: { joy: 75, sadness: 0, anger: 0, fear: 0, surprise: 15, disgust: 0 },
      keywords: [{ word: 'works perfectly', sentiment: Sentiment.Positive, score: 0.95 }, { word: 'surprisingly simple', sentiment: Sentiment.Positive, score: 0.9 }],
      highlightedSpans: [{ text: 'The product ', sentiment: 'none' }, { text: 'works perfectly', sentiment: Sentiment.Positive }, { text: ', and the setup was ', sentiment: 'none' }, { text: 'surprisingly simple', sentiment: Sentiment.Positive }, { text: '.', sentiment: 'none' }],
      moderation: [],
      explanation: "Positive descriptions of both functionality ('works perfectly') and user experience ('surprisingly simple') indicate a high level of satisfaction."
    }
  },
  {
    id: 31,
    text: "Can you confirm if this item is in stock at the downtown location?",
    manualSentiment: Sentiment.Neutral,
    apiResult: {
      overallSentiment: Sentiment.Neutral,
      sentimentScore: { positive: 2.0, negative: 1.0, neutral: 97.0 },
      emotionScore: { joy: 0, sadness: 0, anger: 0, fear: 0, surprise: 0, disgust: 0 },
      keywords: [{ word: 'in stock', sentiment: Sentiment.Neutral, score: 0.8 }, { word: 'downtown location', sentiment: Sentiment.Neutral, score: 0.8 }],
      highlightedSpans: [{ text: 'Can you confirm if this item is in stock at the downtown location?', sentiment: 'none' }],
      moderation: [],
      explanation: "The text is a direct question seeking factual information and does not contain any emotional language."
    }
  },
  {
    id: 32,
    text: "My order number is 98765. I'm writing to confirm the shipping address.",
    manualSentiment: Sentiment.Neutral,
    apiResult: {
      overallSentiment: Sentiment.Neutral,
      sentimentScore: { positive: 0.5, negative: 0.5, neutral: 99.0 },
      emotionScore: { joy: 0, sadness: 0, anger: 0, fear: 0, surprise: 0, disgust: 0 },
      keywords: [{ word: 'order number', sentiment: Sentiment.Neutral, score: 0.9 }, { word: 'confirm shipping address', sentiment: Sentiment.Neutral, score: 0.9 }],
      highlightedSpans: [{ text: 'My order number is 98765. I\'m writing to confirm the shipping address.', sentiment: 'none' }],
      moderation: [],
      explanation: "This is a transactional, informational statement with no discernible sentiment."
    }
  },
  {
    id: 33,
    text: "The user manual mentions a feature that I cannot find in the settings menu.",
    manualSentiment: Sentiment.Neutral,
    apiResult: {
      overallSentiment: Sentiment.Neutral,
      sentimentScore: { positive: 5.0, negative: 10.0, neutral: 85.0 },
      emotionScore: { joy: 0, sadness: 10, anger: 5, fear: 0, surprise: 0, disgust: 0 },
      keywords: [{ word: 'user manual', sentiment: Sentiment.Neutral, score: 0.8 }, { word: 'cannot find', sentiment: Sentiment.Neutral, score: 0.8 }],
      highlightedSpans: [{ text: 'The user manual mentions a feature that I cannot find in the settings menu.', sentiment: 'none' }],
      moderation: [],
      explanation: "The user is stating a fact about their experience with the product, which is neutral, though it implies a potential issue."
    }
  },
  {
    id: 34,
    text: "The product was delivered on the expected date as per the tracking information.",
    manualSentiment: Sentiment.Neutral,
    apiResult: {
      overallSentiment: Sentiment.Neutral,
      sentimentScore: { positive: 15.0, negative: 0.0, neutral: 85.0 },
      emotionScore: { joy: 10, sadness: 0, anger: 0, fear: 0, surprise: 0, disgust: 0 },
      keywords: [{ word: 'delivered', sentiment: Sentiment.Neutral, score: 0.8 }, { word: 'expected date', sentiment: Sentiment.Neutral, score: 0.8 }],
      highlightedSpans: [{ text: 'The product was delivered on the expected date as per the tracking information.', sentiment: 'none' }],
      moderation: [],
      explanation: "This is a statement of fact confirming that the delivery met expectations, which is a neutral outcome."
    }
  },
  {
    id: 35,
    text: "What is your return policy for items purchased on sale?",
    manualSentiment: Sentiment.Neutral,
    apiResult: {
      overallSentiment: Sentiment.Neutral,
      sentimentScore: { positive: 1.0, negative: 2.0, neutral: 97.0 },
      emotionScore: { joy: 0, sadness: 0, anger: 0, fear: 0, surprise: 0, disgust: 0 },
      keywords: [{ word: 'return policy', sentiment: Sentiment.Neutral, score: 0.9 }, { word: 'on sale', sentiment: Sentiment.Neutral, score: 0.7 }],
      highlightedSpans: [{ text: 'What is your return policy for items purchased on sale?', sentiment: 'none' }],
      moderation: [],
      explanation: "This is a direct, unemotional question asking for information about a policy."
    }
  },
  {
    id: 36,
    text: "The price is a little high, but the features are exactly what I need. I'm satisfied.",
    manualSentiment: Sentiment.Positive,
    apiResult: {
      overallSentiment: Sentiment.Positive,
      sentimentScore: { positive: 70.0, negative: 20.0, neutral: 10.0 },
      emotionScore: { joy: 50, sadness: 5, anger: 0, fear: 0, surprise: 0, disgust: 0 },
      keywords: [{ word: 'price is high', sentiment: Sentiment.Negative, score: 0.8 }, { word: 'exactly what I need', sentiment: Sentiment.Positive, score: 0.9 }, { word: 'satisfied', sentiment: Sentiment.Positive, score: 0.9 }],
      highlightedSpans: [{ text: 'The ', sentiment: 'none' }, { text: 'price is a little high', sentiment: Sentiment.Negative }, { text: ', but the features are ', sentiment: 'none' }, { text: 'exactly what I need', sentiment: Sentiment.Positive }, { text: '. I\'m ', sentiment: 'none' }, { text: 'satisfied', sentiment: Sentiment.Positive }, { text: '.', sentiment: 'none' }],
      moderation: [],
      explanation: "Although a negative point is raised about price, the concluding statement 'I'm satisfied' makes the overall sentiment positive."
    }
  },
  {
    id: 37,
    text: "I guess it's fine. Not great, not terrible. It does the job.",
    manualSentiment: Sentiment.Neutral,
    apiResult: {
      overallSentiment: Sentiment.Neutral,
      sentimentScore: { positive: 25.0, negative: 15.0, neutral: 60.0 },
      emotionScore: { joy: 5, sadness: 5, anger: 0, fear: 0, surprise: 0, disgust: 0 },
      keywords: [{ word: 'fine', sentiment: Sentiment.Neutral, score: 0.8 }, { word: 'not great', sentiment: Sentiment.Neutral, score: 0.7 }, { word: 'not terrible', sentiment: Sentiment.Neutral, score: 0.7 }],
      highlightedSpans: [{ text: 'I guess it\'s ', sentiment: 'none' }, { text: 'fine', sentiment: Sentiment.Neutral }, { text: '. ', sentiment: 'none' }, { text: 'Not great, not terrible', sentiment: Sentiment.Neutral }, { text: '. It does the job.', sentiment: 'none' }],
      moderation: [],
      explanation: "The text uses lukewarm language and explicitly balances positive and negative aspects, resulting in a neutral sentiment."
    }
  },
  {
    id: 38,
    text: "Wow, another price increase. You guys must be really proud of yourselves.",
    manualSentiment: Sentiment.Negative,
    apiResult: {
      overallSentiment: Sentiment.Positive,
      sentimentScore: { positive: 75.0, negative: 10.0, neutral: 15.0 },
      emotionScore: { joy: 50, sadness: 0, anger: 0, fear: 0, surprise: 20, disgust: 0 },
      keywords: [{ word: 'wow', sentiment: Sentiment.Positive, score: 0.8 }, { word: 'proud', sentiment: Sentiment.Positive, score: 0.85 }],
      highlightedSpans: [{ text: 'Wow', sentiment: Sentiment.Positive }, { text: ', another price increase. You guys must be really ', sentiment: 'none' }, { text: 'proud', sentiment: Sentiment.Positive }, { text: ' of yourselves.', sentiment: 'none' }],
      moderation: [],
      explanation: "The model incorrectly identifies positive words like 'Wow' and 'proud' while missing the sarcastic, negative context."
    }
  },
  {
    id: 39,
    text: "It works, but the user interface feels like it was designed in 1998.",
    manualSentiment: Sentiment.Negative,
    apiResult: {
      overallSentiment: Sentiment.Negative,
      sentimentScore: { positive: 20.0, negative: 65.0, neutral: 15.0 },
      emotionScore: { joy: 0, sadness: 30, anger: 10, fear: 0, surprise: 0, disgust: 10 },
      keywords: [{ word: 'it works', sentiment: Sentiment.Positive, score: 0.7 }, { word: 'designed in 1998', sentiment: Sentiment.Negative, score: 0.9 }],
      highlightedSpans: [{ text: 'It works', sentiment: Sentiment.Positive }, { text: ', but the user interface feels like it was ', sentiment: 'none' }, { text: 'designed in 1998', sentiment: Sentiment.Negative }, { text: '.', sentiment: 'none' }],
      moderation: [],
      explanation: "While acknowledging functionality, the strong negative comparison for the user interface dominates the overall sentiment."
    }
  },
  {
    id: 40,
    text: "I had an issue, but your team resolved it quickly. So, all good.",
    manualSentiment: Sentiment.Positive,
    apiResult: {
      overallSentiment: Sentiment.Positive,
      sentimentScore: { positive: 80.0, negative: 15.0, neutral: 5.0 },
      emotionScore: { joy: 60, sadness: 10, anger: 5, fear: 0, surprise: 0, disgust: 0 },
      keywords: [{ word: 'had an issue', sentiment: Sentiment.Negative, score: 0.8 }, { word: 'resolved it quickly', sentiment: Sentiment.Positive, score: 0.95 }, { word: 'all good', sentiment: Sentiment.Positive, score: 0.9 }],
      highlightedSpans: [{ text: 'I ', sentiment: 'none' }, { text: 'had an issue', sentiment: Sentiment.Negative }, { text: ', but your team ', sentiment: 'none' }, { text: 'resolved it quickly', sentiment: Sentiment.Positive }, { text: '. So, ', sentiment: 'none' }, { text: 'all good', sentiment: Sentiment.Positive }, { text: '.', sentiment: 'none' }],
      moderation: [],
      explanation: "The text describes a problem that was successfully resolved, leading to a positive final sentiment."
    }
  },
  {
    id: 41,
    text: "It would be great if you could add a feature to export data to CSV.",
    manualSentiment: Sentiment.Neutral,
    apiResult: {
      overallSentiment: Sentiment.Positive,
      sentimentScore: { positive: 65.0, negative: 0.0, neutral: 35.0 },
      emotionScore: { joy: 40, sadness: 0, anger: 0, fear: 0, surprise: 0, disgust: 0 },
      keywords: [{ word: 'great', sentiment: Sentiment.Positive, score: 0.8 }, { word: 'add a feature', sentiment: Sentiment.Neutral, score: 0.9 }],
      highlightedSpans: [{ text: 'It would be ', sentiment: 'none' }, { text: 'great', sentiment: Sentiment.Positive }, { text: ' if you could add a feature to export data to CSV.', sentiment: 'none' }],
      moderation: [],
      explanation: "The API focuses on the word 'great', interpreting the suggestion as positive rather than a neutral feature request."
    }
  },
  {
    id: 42,
    text: "The product is fine, but the packaging was excessive and wasteful.",
    manualSentiment: Sentiment.Negative,
    apiResult: {
      overallSentiment: Sentiment.Negative,
      sentimentScore: { positive: 10.0, negative: 70.0, neutral: 20.0 },
      emotionScore: { joy: 0, sadness: 30, anger: 20, fear: 0, surprise: 0, disgust: 10 },
      keywords: [{ word: 'fine', sentiment: Sentiment.Neutral, score: 0.7 }, { word: 'excessive', sentiment: Sentiment.Negative, score: 0.9 }, { word: 'wasteful', sentiment: Sentiment.Negative, score: 0.9 }],
      highlightedSpans: [{ text: 'The product is ', sentiment: 'none' }, { text: 'fine', sentiment: Sentiment.Neutral }, { text: ', but the packaging was ', sentiment: 'none' }, { text: 'excessive', sentiment: Sentiment.Negative }, { text: ' and ', sentiment: 'none' }, { text: 'wasteful', sentiment: Sentiment.Negative }, { text: '.', sentiment: 'none' }],
      moderation: [],
      explanation: "While the product is acceptable, the strong negative critique of the packaging defines the overall sentiment."
    }
  },
  {
    id: 43,
    text: "I'm not angry, just disappointed in the sudden drop in quality.",
    manualSentiment: Sentiment.Negative,
    apiResult: {
      overallSentiment: Sentiment.Negative,
      sentimentScore: { positive: 5.0, negative: 85.0, neutral: 10.0 },
      emotionScore: { joy: 0, sadness: 70, anger: 10, fear: 0, surprise: 0, disgust: 0 },
      keywords: [{ word: 'not angry', sentiment: Sentiment.Neutral, score: 0.6 }, { word: 'disappointed', sentiment: Sentiment.Negative, score: 0.95 }, { word: 'drop in quality', sentiment: Sentiment.Negative, score: 0.9 }],
      highlightedSpans: [{ text: 'I\'m ', sentiment: 'none' }, { text: 'not angry', sentiment: Sentiment.Neutral }, { text: ', just ', sentiment: 'none' }, { text: 'disappointed', sentiment: Sentiment.Negative }, { text: ' in the sudden ', sentiment: 'none' }, { text: 'drop in quality', sentiment: Sentiment.Negative }, { text: '.', sentiment: 'none' }],
      moderation: [],
      explanation: "The user explicitly states they are 'disappointed' due to a 'drop in quality', making the sentiment clearly negative."
    }
  },
  {
    id: 44,
    text: "I suppose the service was acceptable. Nothing to write home about.",
    manualSentiment: Sentiment.Neutral,
    apiResult: {
      overallSentiment: Sentiment.Neutral,
      sentimentScore: { positive: 15.0, negative: 5.0, neutral: 80.0 },
      emotionScore: { joy: 0, sadness: 10, anger: 0, fear: 0, surprise: 0, disgust: 0 },
      keywords: [{ word: 'acceptable', sentiment: Sentiment.Neutral, score: 0.8 }, { word: 'nothing to write home about', sentiment: Sentiment.Neutral, score: 0.8 }],
      highlightedSpans: [{ text: 'I suppose the service was ', sentiment: 'none' }, { text: 'acceptable', sentiment: Sentiment.Neutral }, { text: '. ', sentiment: 'none' }, { text: 'Nothing to write home about', sentiment: Sentiment.Neutral }, { text: '.', sentiment: 'none' }],
      moderation: [],
      explanation: "The language used ('acceptable', 'nothing to write home about') indicates a lack of strong feeling, classifying it as neutral."
    }
  },
  {
    id: 45,
    text: "This is the third time I've had to call about this. Can someone please fix it permanently?",
    manualSentiment: Sentiment.Negative,
    apiResult: {
      overallSentiment: Sentiment.Negative,
      sentimentScore: { positive: 3.0, negative: 87.0, neutral: 10.0 },
      emotionScore: { joy: 0, sadness: 40, anger: 50, fear: 0, surprise: 0, disgust: 0 },
      keywords: [{ word: 'third time', sentiment: Sentiment.Negative, score: 0.8 }, { word: 'fix it permanently', sentiment: Sentiment.Neutral, score: 0.8 }],
      highlightedSpans: [{ text: 'This is the ', sentiment: 'none' }, { text: 'third time', sentiment: Sentiment.Negative }, { text: ' I\'ve had to call about this. Can someone please fix it permanently?', sentiment: 'none' }],
      moderation: [],
      explanation: "The user's frustration is evident from the fact that this is a recurring issue ('third time')."
    }
  },
  {
    id: 46,
    text: "I am providing this feedback as requested by your survey.",
    manualSentiment: Sentiment.Neutral,
    apiResult: {
      overallSentiment: Sentiment.Neutral,
      sentimentScore: { positive: 5.0, negative: 0.0, neutral: 95.0 },
      emotionScore: { joy: 0, sadness: 0, anger: 0, fear: 0, surprise: 0, disgust: 0 },
      keywords: [{ word: 'feedback', sentiment: Sentiment.Neutral, score: 0.8 }, { word: 'survey', sentiment: Sentiment.Neutral, score: 0.8 }],
      highlightedSpans: [{ text: 'I am providing this feedback as requested by your survey.', sentiment: 'none' }],
      moderation: [],
      explanation: "This is a purely informational statement about the context of the communication, lacking any sentiment."
    }
  },
  {
    id: 47,
    text: "The color in the photo is much more vibrant than the actual product.",
    manualSentiment: Sentiment.Negative,
    apiResult: {
      overallSentiment: Sentiment.Negative,
      sentimentScore: { positive: 10.0, negative: 75.0, neutral: 15.0 },
      emotionScore: { joy: 0, sadness: 50, anger: 0, fear: 0, surprise: 10, disgust: 0 },
      keywords: [{ word: 'more vibrant', sentiment: Sentiment.Positive, score: 0.7 }, { word: 'than the actual product', sentiment: Sentiment.Negative, score: 0.8 }],
      highlightedSpans: [{ text: 'The color in the photo is much more vibrant than the actual product.', sentiment: 'none' }],
      moderation: [],
      explanation: "The user is expressing disappointment that the product did not meet the expectations set by its marketing photo."
    }
  },
  {
    id: 48,
    text: "Your website is very difficult to navigate on a mobile device.",
    manualSentiment: Sentiment.Negative,
    apiResult: {
      overallSentiment: Sentiment.Negative,
      sentimentScore: { positive: 2.0, negative: 90.0, neutral: 8.0 },
      emotionScore: { joy: 0, sadness: 30, anger: 30, fear: 0, surprise: 0, disgust: 0 },
      keywords: [{ word: 'difficult to navigate', sentiment: Sentiment.Negative, score: 0.95 }, { word: 'mobile device', sentiment: Sentiment.Neutral, score: 0.7 }],
      highlightedSpans: [{ text: 'Your website is ', sentiment: 'none' }, { text: 'very difficult to navigate', sentiment: Sentiment.Negative }, { text: ' on a mobile device.', sentiment: 'none' }],
      moderation: [],
      explanation: "The phrase 'difficult to navigate' is a clear criticism of the user experience on mobile."
    }
  },
  {
    id: 49,
    text: "Please update my billing address to 123 Main St, Anytown, USA.",
    manualSentiment: Sentiment.Neutral,
    apiResult: {
      overallSentiment: Sentiment.Neutral,
      sentimentScore: { positive: 1.0, negative: 1.0, neutral: 98.0 },
      emotionScore: { joy: 0, sadness: 0, anger: 0, fear: 0, surprise: 0, disgust: 0 },
      keywords: [{ word: 'billing address', sentiment: Sentiment.Neutral, score: 0.9 }],
      highlightedSpans: [{ text: 'Please update my billing address to 123 Main St, Anytown, USA.', sentiment: 'none' }],
      moderation: [],
      explanation: "This is a direct, factual request for an account update and lacks emotional content."
    }
  },
  {
    id: 50,
    text: "The product is good, but your customer service is what truly makes you stand out.",
    manualSentiment: Sentiment.Positive,
    apiResult: {
      overallSentiment: Sentiment.Positive,
      sentimentScore: { positive: 85.0, negative: 5.0, neutral: 10.0 },
      emotionScore: { joy: 60, sadness: 0, anger: 0, fear: 0, surprise: 0, disgust: 0 },
      keywords: [{ word: 'product is good', sentiment: Sentiment.Positive, score: 0.8 }, { word: 'truly makes you stand out', sentiment: Sentiment.Positive, score: 0.95 }],
      highlightedSpans: [{ text: 'The ', sentiment: 'none' }, { text: 'product is good', sentiment: Sentiment.Positive }, { text: ', but your customer service is what ', sentiment: 'none' }, { text: 'truly makes you stand out', sentiment: Sentiment.Positive }, { text: '.', sentiment: 'none' }],
      moderation: [],
      explanation: "The exceptional praise for customer service ('truly makes you stand out') defines the overall positive sentiment."
    }
  },
  {
    id: 51,
    text: "I paid for express shipping, and it still took a week to arrive. This is unacceptable.",
    manualSentiment: Sentiment.Negative,
    apiResult: {
      overallSentiment: Sentiment.Negative,
      sentimentScore: { positive: 0.0, negative: 98.0, neutral: 2.0 },
      emotionScore: { joy: 0, sadness: 30, anger: 65, fear: 0, surprise: 5, disgust: 0 },
      keywords: [{ word: 'took a week', sentiment: Sentiment.Negative, score: 0.8 }, { word: 'unacceptable', sentiment: Sentiment.Negative, score: 0.95 }],
      highlightedSpans: [{ text: 'I paid for express shipping, and it still ', sentiment: 'none' }, { text: 'took a week to arrive', sentiment: Sentiment.Negative }, { text: '. This is ', sentiment: 'none' }, { text: 'unacceptable', sentiment: Sentiment.Negative }, { text: '.', sentiment: 'none' }],
      moderation: [],
      explanation: "The failure to meet express shipping expectations combined with the word 'unacceptable' makes this strongly negative."
    }
  },
  {
    id: 52,
    text: "The event is scheduled to begin at 9:00 AM.",
    manualSentiment: Sentiment.Neutral,
    apiResult: {
      overallSentiment: Sentiment.Neutral,
      sentimentScore: { positive: 0.0, negative: 0.0, neutral: 100.0 },
      emotionScore: { joy: 0, sadness: 0, anger: 0, fear: 0, surprise: 0, disgust: 0 },
      keywords: [{ word: 'event', sentiment: Sentiment.Neutral, score: 0.8 }, { word: '9:00 AM', sentiment: Sentiment.Neutral, score: 0.8 }],
      highlightedSpans: [{ text: 'The event is scheduled to begin at 9:00 AM.', sentiment: 'none' }],
      moderation: [],
      explanation: "This is a statement of fact with no emotional language."
    }
  },
  {
    id: 53,
    text: "A truly life-changing product. I can't imagine my daily routine without it now. Five stars!",
    manualSentiment: Sentiment.Positive,
    apiResult: {
      overallSentiment: Sentiment.Positive,
      sentimentScore: { positive: 99.0, negative: 0.5, neutral: 0.5 },
      emotionScore: { joy: 95, sadness: 0, anger: 0, fear: 0, surprise: 5, disgust: 0 },
      keywords: [{ word: 'life-changing', sentiment: Sentiment.Positive, score: 0.98 }, { word: 'five stars', sentiment: Sentiment.Positive, score: 0.95 }],
      highlightedSpans: [{ text: 'A truly ', sentiment: 'none' }, { text: 'life-changing product', sentiment: Sentiment.Positive }, { text: '. I can\'t imagine my daily routine without it now. ', sentiment: 'none' }, { text: 'Five stars!', sentiment: Sentiment.Positive }],
      moderation: [],
      explanation: "Exclamations like 'life-changing' and 'five stars' convey the highest level of customer satisfaction."
    }
  },
  {
    id: 54,
    text: "Your app logged me out and I can't get back in. The 'forgot password' link doesn't work either.",
    manualSentiment: Sentiment.Negative,
    apiResult: {
      overallSentiment: Sentiment.Negative,
      sentimentScore: { positive: 1.0, negative: 95.0, neutral: 4.0 },
      emotionScore: { joy: 0, sadness: 40, anger: 50, fear: 10, surprise: 0, disgust: 0 },
      keywords: [{ word: 'can\'t get back in', sentiment: Sentiment.Negative, score: 0.9 }, { word: 'doesn\'t work', sentiment: Sentiment.Negative, score: 0.9 }],
      highlightedSpans: [{ text: 'Your app logged me out and I ', sentiment: 'none' }, { text: 'can\'t get back in', sentiment: Sentiment.Negative }, { text: '. The \'forgot password\' link ', sentiment: 'none' }, { text: 'doesn\'t work', sentiment: Sentiment.Negative }, { text: ' either.', sentiment: 'none' }],
      moderation: [],
      explanation: "The user is reporting a critical functionality failure, leading to frustration and a negative sentiment."
    }
  },
  {
    id: 55,
    text: "I think a dark mode for the application would be a great addition for night-time users.",
    manualSentiment: Sentiment.Neutral,
    apiResult: {
      overallSentiment: Sentiment.Positive,
      sentimentScore: { positive: 70.0, negative: 0.0, neutral: 30.0 },
      emotionScore: { joy: 40, sadness: 0, anger: 0, fear: 0, surprise: 0, disgust: 0 },
      keywords: [{ word: 'dark mode', sentiment: Sentiment.Neutral, score: 0.8 }, { word: 'great addition', sentiment: Sentiment.Positive, score: 0.9 }],
      highlightedSpans: [{ text: 'I think a dark mode for the application would be a ', sentiment: 'none' }, { text: 'great addition', sentiment: Sentiment.Positive }, { text: ' for night-time users.', sentiment: 'none' }],
      moderation: [],
      explanation: "The model focused on the phrase 'great addition', interpreting the feature request as positive feedback."
    }
  },
  {
    id: 56,
    text: "I was skeptical at first, but this exceeded my expectations. Well done.",
    manualSentiment: Sentiment.Positive,
    apiResult: {
      overallSentiment: Sentiment.Positive,
      sentimentScore: { positive: 96.0, negative: 2.0, neutral: 2.0 },
      emotionScore: { joy: 70, sadness: 0, anger: 0, fear: 0, surprise: 30, disgust: 0 },
      keywords: [{ word: 'skeptical', sentiment: Sentiment.Negative, score: 0.7 }, { word: 'exceeded my expectations', sentiment: Sentiment.Positive, score: 0.95 }, { word: 'well done', sentiment: Sentiment.Positive, score: 0.9 }],
      highlightedSpans: [{ text: 'I was skeptical at first, but this ', sentiment: 'none' }, { text: 'exceeded my expectations', sentiment: Sentiment.Positive }, { text: '. ', sentiment: 'none' }, { text: 'Well done', sentiment: Sentiment.Positive }, { text: '.', sentiment: 'none' }],
      moderation: [],
      explanation: "The phrase 'exceeded my expectations' shows a strong positive shift from initial skepticism."
    }
  },
  {
    id: 57,
    text: "The product description is misleading. It's much smaller than it appears in the pictures.",
    manualSentiment: Sentiment.Negative,
    apiResult: {
      overallSentiment: Sentiment.Negative,
      sentimentScore: { positive: 3.0, negative: 92.0, neutral: 5.0 },
      emotionScore: { joy: 0, sadness: 60, anger: 15, fear: 0, surprise: 10, disgust: 0 },
      keywords: [{ word: 'misleading', sentiment: Sentiment.Negative, score: 0.95 }, { word: 'much smaller', sentiment: Sentiment.Negative, score: 0.8 }],
      highlightedSpans: [{ text: 'The product description is ', sentiment: 'none' }, { text: 'misleading', sentiment: Sentiment.Negative }, { text: '. It\'s ', sentiment: 'none' }, { text: 'much smaller', sentiment: Sentiment.Negative }, { text: ' than it appears in the pictures.', sentiment: 'none' }],
      moderation: [],
      explanation: "Calling the description 'misleading' indicates a breach of trust and disappointment with the product."
    }
  },
  {
    id: 58,
    text: "This is a confirmation of your recent purchase.",
    manualSentiment: Sentiment.Neutral,
    apiResult: {
      overallSentiment: Sentiment.Neutral,
      sentimentScore: { positive: 10.0, negative: 0.0, neutral: 90.0 },
      emotionScore: { joy: 5, sadness: 0, anger: 0, fear: 0, surprise: 0, disgust: 0 },
      keywords: [{ word: 'confirmation', sentiment: Sentiment.Neutral, score: 0.9 }, { word: 'purchase', sentiment: Sentiment.Neutral, score: 0.8 }],
      highlightedSpans: [{ text: 'This is a confirmation of your recent purchase.', sentiment: 'none' }],
      moderation: [],
      explanation: "The text is a standard, transactional notification with no emotional content."
    }
  },
  {
    id: 59,
    text: "Sure, the product works. If you enjoy spending three hours assembling it with terrible instructions.",
    manualSentiment: Sentiment.Negative,
    apiResult: {
      overallSentiment: Sentiment.Negative,
      sentimentScore: { positive: 15.0, negative: 75.0, neutral: 10.0 },
      emotionScore: { joy: 0, sadness: 30, anger: 40, fear: 0, surprise: 0, disgust: 0 },
      keywords: [{ word: 'product works', sentiment: Sentiment.Positive, score: 0.7 }, { word: 'three hours assembling', sentiment: Sentiment.Negative, score: 0.8 }, { word: 'terrible instructions', sentiment: Sentiment.Negative, score: 0.95 }],
      highlightedSpans: [{ text: 'Sure, the ', sentiment: 'none' }, { text: 'product works', sentiment: Sentiment.Positive }, { text: '. If you enjoy spending three hours assembling it with ', sentiment: 'none' }, { text: 'terrible instructions', sentiment: Sentiment.Negative }, { text: '.', sentiment: 'none' }],
      moderation: [],
      explanation: "The sarcastic tone and strong negative complaint about 'terrible instructions' outweigh the initial positive statement."
    }
  },
  {
    id: 60,
    text: "The packaging was beautiful and eco-friendly. It's great to see a company that cares.",
    manualSentiment: Sentiment.Positive,
    apiResult: {
      overallSentiment: Sentiment.Positive,
      sentimentScore: { positive: 97.0, negative: 1.0, neutral: 2.0 },
      emotionScore: { joy: 80, sadness: 0, anger: 0, fear: 0, surprise: 10, disgust: 0 },
      keywords: [{ word: 'beautiful', sentiment: Sentiment.Positive, score: 0.9 }, { word: 'eco-friendly', sentiment: Sentiment.Positive, score: 0.9 }, { word: 'company that cares', sentiment: Sentiment.Positive, score: 0.95 }],
      highlightedSpans: [{ text: 'The packaging was ', sentiment: 'none' }, { text: 'beautiful', sentiment: Sentiment.Positive }, { text: ' and ', sentiment: 'none' }, { text: 'eco-friendly', sentiment: Sentiment.Positive }, { text: '. It\'s ', sentiment: 'none' }, { text: 'great', sentiment: Sentiment.Positive }, { text: ' to see a ', sentiment: 'none' }, { text: 'company that cares', sentiment: Sentiment.Positive }, { text: '.', sentiment: 'none' }],
      moderation: [],
      explanation: "Positive descriptors like 'beautiful', 'eco-friendly', and 'great' clearly indicate a high level of satisfaction."
    }
  }
];
