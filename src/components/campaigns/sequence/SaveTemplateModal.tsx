import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Tag } from 'lucide-react';
import { useTemplateStore } from '../../../stores/templateStore';
import type { PlatformType } from './types';

interface SaveTemplateModalProps {
  content: string;
  platform: PlatformType;
  onClose: () => void;
}

export function SaveTemplateModal({ content, platform, onClose }: SaveTemplateModalProps) {
  const [name, setName] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [error, setError] = useState('');

  const { addTemplate } = useTemplateStore();

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSave = () => {
    if (!name.trim()) {
      setError('Please enter a template name');
      return;
    }

    addTemplate({
      name: name.trim(),
      content,
      platform,
      tags,
    });

    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-slate-900 border border-slate-800/50 rounded-xl shadow-xl w-full max-w-lg mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-800/50">
          <h2 className="text-xl font-semibold text-white">Save as Template</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">
              Template Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              className={`w-full px-4 py-2 bg-slate-800/50 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                error
                  ? 'border-red-500 focus:ring-red-500/20'
                  : 'border-slate-700/50 focus:ring-indigo-500/20 focus:border-indigo-500'
              }`}
              placeholder="Enter template name..."
            />
            {error && (
              <p className="mt-2 text-sm text-red-400">{error}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-slate-800/50 rounded-lg text-sm text-slate-300 flex items-center space-x-2"
                >
                  <span>{tag}</span>
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="text-slate-400 hover:text-red-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                  className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50"
                  placeholder="Add a tag..."
                />
              </div>
              <button
                onClick={handleAddTag}
                className="p-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5 text-slate-400" />
              </button>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors"
            >
              Save Template
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}