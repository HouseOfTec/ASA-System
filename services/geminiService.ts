
import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult, SentimentScore, ComparisonResult } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const model = 'gemini-2.5-flash';

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    overallSentiment: { type: Type.STRING, enum: ['positive', 'negative', 'neutral'], description: "The single, dominant sentiment of the entire text." },
    sentimentScore: {
      type: Type.OBJECT,
      description: "Scores for each sentiment, normalized to sum to 100.",
      properties: {
        positive: { type: Type.NUMBER, description: "Percentage score for positive sentiment (0-100)." },
        negative: { type: Type.NUMBER, description: "Percentage score for negative sentiment (0-100)." },
        neutral: { type: Type.NUMBER, description: "Percentage score for neutral sentiment (0-100)." },
      },
      required: ['positive', 'negative', 'neutral'],
    },
    emotionScore: {
      type: Type.OBJECT,
      description: "Scores for various emotions detected in the text, as percentages (0-100).",
      properties: {
        joy: { type: Type.NUMBER },
        sadness: { type: Type.NUMBER },
        anger: { type: Type.NUMBER },
        fear: { type: Type.NUMBER },
        surprise: { type: Type.NUMBER },
        disgust: { type: Type.NUMBER },
      },
      required: ['joy', 'sadness', 'anger', 'fear', 'surprise', 'disgust'],
    },
    keywords: {
      type: Type.ARRAY,
      description: "Array of key words or phrases and their associated sentiment.",
      items: {
        type: Type.OBJECT,
        properties: {
          word: { type: Type.STRING, description: "The identified keyword or phrase." },
          sentiment: { type: Type.STRING, enum: ['positive', 'negative', 'neutral'] },
          score: { type: Type.NUMBER, description: "Relevance score of the keyword (0-1)." },
        },
      },
    },
    highlightedSpans: {
      type: Type.ARRAY,
      description: "The original text, broken into spans with associated sentiment for accurate highlighting. Must reconstruct the full original text when concatenated.",
      items: {
        type: Type.OBJECT,
        properties: {
          text: { type: Type.STRING, description: "A segment of the original text." },
          sentiment: { type: Type.STRING, enum: ['positive', 'negative', 'neutral', 'none'], description: "Sentiment of this specific text segment. Use 'none' for parts without sentiment." },
        },
      },
    },
    moderation: {
      type: Type.ARRAY,
      description: "Identified instances of inappropriate content.",
      items: {
        type: Type.OBJECT,
        properties: {
          category: { type: Type.STRING, enum: ['hate_speech', 'profanity', 'racial_slurs', 'offensive_language', 'self_harm'] },
          confidence: { type: Type.NUMBER, description: "Confidence score for the moderation flag (0-1)." },
          flaggedText: { type: Type.STRING, description: "The specific text that was flagged." },
        },
      },
    },
    explanation: {
      type: Type.STRING,
      description: "A brief, one-sentence explanation for the overall sentiment classification."
    }
  },
  required: ['overallSentiment', 'sentimentScore', 'emotionScore', 'keywords', 'highlightedSpans', 'moderation', 'explanation'],
};


function normalizeScores(scores: SentimentScore): SentimentScore {
  let total = scores.positive + scores.negative + scores.neutral;
  if (total === 0) return { positive: 0, negative: 0, neutral: 100 };
  
  const normalized = {
    positive: (scores.positive / total) * 100,
    negative: (scores.negative / total) * 100,
    neutral: (scores.neutral / total) * 100,
  };
  
  // Adjust to ensure the sum is exactly 100 due to rounding
  const roundedTotal = Math.round(normalized.positive) + Math.round(normalized.negative) + Math.round(normalized.neutral);
  const diff = 100 - roundedTotal;

  return {
    positive: Math.round(normalized.positive) + diff,
    negative: Math.round(normalized.negative),
    neutral: Math.round(normalized.neutral),
  };
}


export const analyzeText = async (text: string): Promise<AnalysisResult> => {
  const prompt = `
    Analyze the following text for sentiment, emotions, keywords, and content moderation. Provide a detailed, structured JSON response.

    **Text to Analyze:**
    """
    ${text}
    """

    **Analysis Instructions:**
    1.  **Overall Sentiment**: Determine the dominant sentiment (positive, negative, or neutral).
    2.  **Sentiment Scores**: Provide percentage scores for positive, negative, and neutral sentiments. These scores MUST sum to 100.
    3.  **Emotional Analysis**: Analyze the text for emotions (joy, sadness, anger, fear, surprise, disgust) and provide a percentage score (0-100) for each.
    4.  **Keywords**: Extract the most relevant keywords or phrases that contribute to the sentiment. For each, provide the word/phrase, its sentiment, and a relevance score.
    5.  **Highlighting**: Break down the original text into contiguous spans. For each span, assign a sentiment ('positive', 'negative', 'neutral') if it contributes to the sentiment, or 'none' if it does not. The concatenation of all 'text' fields in the spans MUST perfectly reconstruct the original input text.
    6.  **Content Moderation**: Identify any content that falls into these categories: hate_speech, profanity, racial_slurs, offensive_language, self_harm. If none, return an empty array.
    7.  **Explanation**: Provide a single, concise sentence explaining the reasoning for the overall sentiment classification.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonString = response.text.trim();
    const parsedResult: AnalysisResult = JSON.parse(jsonString);

    // Ensure scores are capped and normalized
    parsedResult.sentimentScore = normalizeScores(parsedResult.sentimentScore);
    
    // Ensure highlightedSpans reconstruct the original text
    const reconstructedText = parsedResult.highlightedSpans.map(s => s.text).join('');
    if (reconstructedText !== text) {
      console.warn("Highlighted spans do not perfectly match original text. This may be due to model interpretation of whitespace or special characters.");
      // Fallback: create a single span if reconstruction fails
      parsedResult.highlightedSpans = [{ text: text, sentiment: 'none' }];
    }

    return parsedResult;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to analyze text. The model may be unavailable or the input may be invalid.");
  }
};

const comparisonResponseSchema = {
  type: Type.OBJECT,
  properties: {
    summaryA: { type: Type.STRING, description: "A concise summary of the first text." },
    summaryB: { type: Type.STRING, description: "A concise summary of the second text." },
    sentimentComparison: { type: Type.STRING, description: "A comparison of the sentiment and emotional tone of both texts." },
    sharedThemes: {
      type: Type.ARRAY,
      description: "A list of key themes, topics, or ideas that are common to both texts.",
      items: { type: Type.STRING }
    },
    uniqueThemesA: {
      type: Type.ARRAY,
      description: "A list of key themes or topics that are unique to the first text.",
      items: { type: Type.STRING }
    },
    uniqueThemesB: {
      type: Type.ARRAY,
      description: "A list of key themes or topics that are unique to the second text.",
      items: { type: Type.STRING }
    },
    verdict: { type: Type.STRING, description: "A final summary of the key differences and common ground between the two texts." }
  },
  required: ['summaryA', 'summaryB', 'sentimentComparison', 'sharedThemes', 'uniqueThemesA', 'uniqueThemesB', 'verdict'],
};

export const compareTexts = async (textA: string, textB: string): Promise<ComparisonResult> => {
  const prompt = `
    Perform a detailed comparative analysis of the two texts provided below. Identify their core topics, shared themes, and unique points. Provide a structured JSON response.

    **Text A:**
    """
    ${textA}
    """

    **Text B:**
    """
    ${textB}
    """

    **Analysis Instructions:**
    1.  **Summaries**: Provide a concise one or two-sentence summary for each text individually.
    2.  **Sentiment Comparison**: Briefly compare the overall sentiment and emotional tone of Text A versus Text B.
    3.  **Shared Themes**: List the key topics, ideas, or themes that are present in BOTH texts. If there are no shared themes, return an empty array.
    4.  **Unique Themes**: List the key topics or themes that are unique to Text A and unique to Text B in separate lists.
    5.  **Verdict**: Provide a final, concluding summary that highlights the most important similarities and differences.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: comparisonResponseSchema,
      },
    });

    const jsonString = response.text.trim();
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Error calling Gemini API for text comparison:", error);
    throw new Error("Failed to compare texts. The model may be unavailable or the input may be invalid.");
  }
};
