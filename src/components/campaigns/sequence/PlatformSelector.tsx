import React from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircle, MessageSquare, Send, Hash, 
  Home, GraduationCap, Slack, Video, Share2
} from 'lucide-react';
import type { PlatformType } from './types';

interface PlatformSelectorProps {
  onSelect: (platform: PlatformType) => void;
}

const platforms = [
  { id: 'Instagram' as PlatformType, name: 'Instagram DM', icon: MessageCircle },
  { id: 'Facebook' as PlatformType, name: 'Facebook DM', icon: MessageSquare },
  { id: 'TikTok' as PlatformType, name: 'TikTok DM', icon: Video },
  { id: 'Twitter' as PlatformType, name: 'X DM', icon: MessageCircle },
  { id: 'LinkedIn' as PlatformType, name: 'LinkedIn DM', icon: Share2 },
  { id: 'Reddit' as PlatformType, name: 'Reddit DM', icon: Hash },
  { id: 'Discord' as PlatformType, name: 'Discord DM', icon: MessageSquare },
  { id: 'WhatsApp' as PlatformType, name: 'WhatsApp DM', icon: MessageCircle },
  { id: 'Telegram' as PlatformType, name: 'Telegram DM', icon: Send },
  { id: 'Slack' as PlatformType, name: 'Slack DM', icon: Slack },
  { id: 'Pinterest' as PlatformType, name: 'Pinterest DM', icon: Share2 },
  { id: 'Nextdoor' as PlatformType, name: 'Nextdoor DM', icon: Home },
  { id: 'Skool' as PlatformType, name: 'Skool DM', icon: GraduationCap },
];

export function PlatformSelector({ onSelect }: PlatformSelectorProps) {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Select Platform</h3>
        <p className="text-slate-400">Choose the platform for your first message</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {platforms.map((platform) => {
          const Icon = platform.icon;
          return (
            <motion.button
              key={platform.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(platform.id)}
              className="p-6 bg-slate-800/50 border border-slate-700/50 rounded-lg hover:border-indigo-500/50 transition-all text-left group"
            >
              <Icon className="w-6 h-6 text-slate-400 group-hover:text-indigo-400 mb-3" />
              <h4 className="text-white font-medium">{platform.name}</h4>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}