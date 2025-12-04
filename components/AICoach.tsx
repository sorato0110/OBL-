import React, { useState } from 'react';
import { Sparkles, Loader2, MessageSquareQuote } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { Goal } from '../types';

interface AICoachProps {
  focusGoals: Goal[];
  excludedGoals: Goal[];
}

export const AICoach: React.FC<AICoachProps> = ({ focusGoals, excludedGoals }) => {
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleAnalyze = async () => {
    if (!process.env.API_KEY) {
      setAdvice("API Key is missing. Please configure the environment.");
      return;
    }

    setLoading(true);
    setAdvice(null);
    setIsOpen(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const focusText = focusGoals.map(g => `- ${g.text}`).join('\n');
      const excludedText = excludedGoals.map(g => `- ${g.text}`).join('\n');

      const prompt = `
        You are a strict but helpful productivity coach inspired by Warren Buffett's 25/5 rule.
        
        Here is the user's "Focus List" (Top Priority):
        ${focusText || "(Empty)"}
        
        Here is the "Exclusion List" (Avoid at all costs):
        ${excludedText || "(Empty)"}

        Please provide a concise (max 3 sentences) analysis in Japanese.
        1. Praise them if the focus list is small (1-2 items) and clear.
        2. Warn them if the focus list is too vague or too long.
        3. Give one specific actionable tip to achieve the top focus goal.
        
        Keep the tone encouraging but disciplined.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      setAdvice(response.text);
    } catch (error) {
      console.error(error);
      setAdvice("申し訳ありません。現在AIによる分析を利用できません。");
    } finally {
      setLoading(false);
    }
  };

  if (focusGoals.length === 0 && excludedGoals.length === 0) return null;

  return (
    <div className="mt-8 mb-8">
      {!isOpen ? (
        <button
          onClick={handleAnalyze}
          className="flex items-center justify-center w-full sm:w-auto mx-auto gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-indigo-200 hover:shadow-xl hover:scale-105 transition-all"
        >
          <Sparkles className="w-5 h-5" />
          AIコーチにアドバイスをもらう
        </button>
      ) : (
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Sparkles className="w-24 h-24 text-indigo-600" />
          </div>
          
          <div className="relative z-10">
            <h3 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
              <MessageSquareQuote className="w-5 h-5" />
              AIコーチからのアドバイス
            </h3>
            
            {loading ? (
              <div className="flex items-center gap-2 text-indigo-700 py-4">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>分析中...</span>
              </div>
            ) : (
              <div className="prose prose-indigo max-w-none">
                <p className="text-indigo-800 whitespace-pre-wrap leading-relaxed">{advice}</p>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="mt-4 text-xs font-bold text-indigo-600 hover:text-indigo-800 uppercase tracking-wide"
                >
                  閉じる
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};