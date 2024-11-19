import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Tag, Clock, Trash2, Copy } from 'lucide-react';
import { useTemplateStore } from '../../../stores/templateStore';
import type { PlatformType } from './types';

interface TemplateLibraryProps {
  platform: PlatformType;
  onSelect: (content: string) => void;
  onClose: () => void;
}

export function TemplateLibrary({ platform, onSelect, onClose }: TemplateLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const { templates, deleteTemplate } = useTemplateStore();

  const filteredTemplates = templates
    .filter((template) => template.platform === platform)
    .filter((template) => {
      const matchesSearch = searchQuery
        ? template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          template.content.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      const matchesTag = selectedTag ? template.tags.includes(selectedTag) : true;
      return matchesSearch && matchesTag;
    });

  const allTags = Array.from(
    new Set(templates.flatMap((template) => template.tags))
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
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
        className="bg-slate-900 border border-slate-800/50 rounded-xl shadow-xl w-full max-w-4xl mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-slate-800/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Message Templates</h2>
            <div className="text-sm text-slate-400">
              {filteredTemplates.length} templates for {platform}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search templates..."
                className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50"
              />
            </div>
            <div className="flex items-center space-x-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center space-x-1 ${
                    selectedTag === tag
                      ? 'bg-indigo-500 text-white'
                      : 'text-slate-400 hover:text-white bg-slate-800/50'
                  }`}
                >
                  <Tag className="w-3 h-3" />
                  <span>{tag}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <AnimatePresence mode="popLayout">
            {filteredTemplates.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <p className="text-slate-400">No templates found</p>
                <p className="text-sm text-slate-500 mt-2">
                  Try adjusting your search or filters
                </p>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {filteredTemplates.map((template) => (
                  <motion.div
                    key={template.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-lg hover:border-indigo-500/50 transition-all group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-white font-medium">{template.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span className="text-xs text-slate-400">
                            Updated {formatDate(template.updatedAt)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => deleteTemplate(template.id)}
                          className="p-1.5 text-slate-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onSelect(template.content)}
                          className="p-1.5 text-slate-400 hover:text-indigo-400 transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-slate-300 line-clamp-2">
                      {template.content}
                    </p>
                    {template.tags.length > 0 && (
                      <div className="flex items-center space-x-2 mt-3">
                        {template.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-slate-700/50 rounded text-xs text-slate-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}