import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Clock, GitFork, Ban } from 'lucide-react';
import { MessageEditor } from '../../campaigns/sequence/MessageEditor';
import type { NodeData, PlatformType } from './types';

interface NodeConfigProps {
  data: NodeData;
  onChange: (updates: Partial<NodeData>) => void;
  platform: PlatformType;
}

export function NodeConfig({ data, onChange, platform }: NodeConfigProps) {
  const [variants, setVariants] = useState(data.variants?.map(content => ({
    id: crypto.randomUUID(),
    content,
    weight: Math.floor(100 / (data.variants?.length || 1))
  })) || []);

  const handleVariantsUpdate = (newVariants: Array<{ id: string; content: string; weight: number }>) => {
    setVariants(newVariants);
    onChange({ variants: newVariants.map(v => v.content) });
  };

  const renderConfig = () => {
    switch (data.type) {
      case 'send-dm':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-indigo-400">
              <MessageSquare className="w-5 h-5" />
              <h3 className="text-lg font-medium">Send Message</h3>
            </div>
            <MessageEditor
              content={data.content || ''}
              platform={platform}
              onChange={(content) => onChange({ content })}
              variants={variants}
              onUpdateVariants={handleVariantsUpdate}
            />
          </div>
        );

      case 'wait-time':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-amber-400">
              <Clock className="w-5 h-5" />
              <h3 className="text-lg font-medium">Wait Time</h3>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="number"
                value={data.delay || 0}
                onChange={(e) => onChange({ delay: parseInt(e.target.value) })}
                min="1"
                className="w-24 px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50"
              />
              <span className="text-slate-400">hours</span>
            </div>
          </div>
        );

      case 'if-then':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-emerald-400">
              <GitFork className="w-5 h-5" />
              <h3 className="text-lg font-medium">Condition</h3>
            </div>
            <select
              value={data.condition}
              onChange={(e) => onChange({ condition: e.target.value })}
              className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50"
            >
              <option value="message_sent">Message Sent</option>
              <option value="message_read">Message Read</option>
              <option value="message_replied">Message Replied</option>
            </select>
          </div>
        );

      case 'end-campaign':
        return (
          <div className="flex items-center space-x-2 text-red-400">
            <Ban className="w-5 h-5" />
            <h3 className="text-lg font-medium">End Campaign</h3>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-6"
    >
      {renderConfig()}
    </motion.div>
  );
}