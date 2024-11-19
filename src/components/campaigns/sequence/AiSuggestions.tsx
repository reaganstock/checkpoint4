import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wand2, ThumbsUp, ThumbsDown, Copy, Sparkles, RefreshCw } from 'lucide-react';
import type { PlatformType } from './types';

interface AiSuggestionsProps {
  onSelect: (suggestion: string) => void;
  platform: PlatformType;
}

interface Suggestion {
  id: string;
  content: string;
  tone: string;
  rating: number;
  liked?: boolean;
  disliked?: boolean;
}

const tones = ['Professional', 'Casual', 'Engaging', 'Formal', 'Friendly'];
const topics = ['Industry Insights', 'Collaboration', 'Networking', 'Product Launch', 'Event'];

export function AiSuggestions({ onSelect, platform }: AiSuggestionsProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTone, setSelectedTone] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([
    {
      id: '1',
      content: "Hi {{firstName}}, I noticed you're working at {{company}} and I'm impressed by your experience in the industry. I'd love to connect and share insights about...",
      tone: 'Professional',
      rating: 95,
    },
    {
      id: '2',
      content: "Hey {{firstName}}! 👋 I came across your profile and really resonated with your work in {{industry}}. Would love to explore potential collaborations...",
      tone: 'Casual',
      rating: 88,
    },
    {
      id: '3',
      content: "{{firstName}}, your recent post about {{topic}} caught my attention. I've been working on similar initiatives and would love to exchange ideas...",
      tone: 'Engaging',
      rating: 92,
    },
  ]);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      const newSuggestions = [...suggestions];
      newSuggestions.unshift({
        id: crypto.randomUUID(),
        content: `${selectedTone} message about ${selectedTopic}: Hi {{firstName}}, I noticed your work in {{industry}} and wanted to connect...`,
        tone: selectedTone || 'Professional',
        rating: Math.floor(Math.random() * 15) + 85,
      });
      setSuggestions(newSuggestions);
      setIsGenerating(false);
    }, 1500);
  };

  const handleLike = (id: string) => {
    setSuggestions(suggestions.map(s => 
      s.id === id ? { ...s, liked: !s.liked, disliked: false } : s
    ));
  };

  const handleDislike = (id: string) => {
    setSuggestions(suggestions.map(s => 
      s.id === id ? { ...s, disliked: !s.disliked, liked: false } : s
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-indigo-400">
          <Wand2 className="w-5 h-5" />
          <h3 className="text-lg font-medium">AI Suggestions</h3>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGenerate}
          disabled={isGenerating}
          className="px-3 py-1.5 bg-indigo-500/20 text-indigo-400 rounded-lg text-sm hover:bg-indigo-500/30 transition-colors flex items-center space-x-2 disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Generate More</span>
            </>
          )}
        </motion.button>
      </div>

      <div className="flex flex-wrap gap-2">
        <div className="space-y-2">
          <label className="text-sm text-slate-400">Tone</label>
          <div className="flex flex-wrap gap-2">
            {tones.map((tone) => (
              <button
                key={tone}
                onClick={() => setSelectedTone(selectedTone === tone ? null : tone)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  selectedTone === tone
                    ? 'bg-indigo-500 text-white'
                    : 'bg-slate-800/50 text-slate-400 hover:text-white'
                }`}
              >
                {tone}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-slate-400">Topic</label>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(selectedTopic === topic ? null : topic)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  selectedTopic === topic
                    ? 'bg-indigo-500 text-white'
                    : 'bg-slate-800/50 text-slate-400 hover:text-white'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {suggestions.map((suggestion, index) => (
          <motion.div
            key={suggestion.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-lg group hover:border-indigo-500/50 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded text-xs font-medium">
                {suggestion.tone}
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleLike(suggestion.id)}
                  className={`p-1.5 transition-colors ${
                    suggestion.liked ? 'text-green-400' : 'text-slate-400 hover:text-green-400'
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDislike(suggestion.id)}
                  className={`p-1.5 transition-colors ${
                    suggestion.disliked ? 'text-red-400' : 'text-slate-400 hover:text-red-400'
                  }`}
                >
                  <ThumbsDown className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onSelect(suggestion.content)}
                  className="p-1.5 text-slate-400 hover:text-indigo-400 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              {suggestion.content}
            </p>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-slate-400">
                Optimized for {platform}
              </span>
              <div className="flex items-center space-x-1">
                <span className={`font-medium ${
                  suggestion.rating >= 90 ? 'text-green-400' : 'text-amber-400'
                }`}>
                  {suggestion.rating}%
                </span>
                <span className="text-slate-400">match</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}