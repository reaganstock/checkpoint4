import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TextareaAutosize from 'react-textarea-autosize';
import clsx from 'clsx';
import { MessageToolbar } from './MessageToolbar';
import { MessageVariants } from './MessageVariants';
import { AiSuggestions } from './AiSuggestions';
import type { PlatformType } from './types';

interface MessageEditorProps {
  content: string;
  platform: PlatformType;
  onChange: (content: string) => void;
  variants?: Array<{ id: string; content: string; weight: number; }>;
  onUpdateVariants?: (variants: Array<{ id: string; content: string; weight: number; }>) => void;
  leadColumns?: string[];
}

export function MessageEditor({
  content,
  platform,
  onChange,
  variants = [],
  onUpdateVariants,
  leadColumns = []
}: MessageEditorProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [activeView, setActiveView] = useState<'editor' | 'variants' | 'ai'>("editor");
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleContentChange = (newContent: string) => {
    onChange(newContent);
    // Only sync with first variant if variants are being used
    if (activeView === 'variants' && variants.length > 0) {
      onUpdateVariants?.([
        { ...variants[0], content: newContent },
        ...variants.slice(1)
      ]);
    }
  };

  const handleViewChange = (view: 'editor' | 'variants' | 'ai') => {
    // If clicking the same view or if variants/AI is active and clicking the other, go back to editor
    if (activeView === view || (activeView !== 'editor' && view !== 'editor')) {
      setActiveView('editor');
    } else {
      setActiveView(view);
      if (view === 'variants' && variants.length === 0) {
        // Initialize first variant with current message
        onUpdateVariants?.([{
          id: crypto.randomUUID(),
          content,
          weight: 100
        }]);
      }
    }
    setActiveVariantIndex(0);
  };

  const handleInsertVariable = (variable: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newContent = content.substring(0, start) + 
                      `{{${variable}}}` + 
                      content.substring(end);
    handleContentChange(newContent);
    
    setTimeout(() => {
      textarea.focus();
      const newPosition = start + variable.length + 4;
      textarea.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  const handleAiSuggestion = (suggestion: string) => {
    handleContentChange(suggestion);
    setActiveView('editor');
  };

  const renderPreview = (text: string) => {
    return text.replace(/\{\{(\w+)\}\}/g, (match, variable) => {
      return leadColumns.includes(variable) ? `[${variable}]` : match;
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-white">
          {platform} Message
        </h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleViewChange('variants')}
            className={clsx(
              'px-3 py-1.5 rounded-lg text-sm transition-colors',
              activeView === 'variants'
                ? 'bg-indigo-500 text-white'
                : 'text-slate-400 hover:text-white'
            )}
          >
            {activeView === 'variants' ? 'Hide Variants' : 'Show Variants'}
          </button>
          <button
            onClick={() => handleViewChange('ai')}
            className={clsx(
              'px-3 py-1.5 rounded-lg text-sm transition-colors',
              activeView === 'ai'
                ? 'bg-indigo-500 text-white'
                : 'text-slate-400 hover:text-white'
            )}
          >
            {activeView === 'ai' ? 'Hide AI' : 'AI Suggestions'}
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeView === 'variants' ? (
          <motion.div
            key="variants"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <MessageVariants
              variants={variants}
              platform={platform}
              onUpdate={onUpdateVariants || (() => {})}
              activeVariantIndex={activeVariantIndex}
              onSelectVariant={setActiveVariantIndex}
            />
          </motion.div>
        ) : activeView === 'ai' ? (
          <motion.div
            key="ai"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <AiSuggestions
              onSelect={handleAiSuggestion}
              platform={platform}
            />
          </motion.div>
        ) : (
          <motion.div
            key="editor"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="relative">
              <TextareaAutosize
                ref={textareaRef}
                value={content}
                onChange={(e) => handleContentChange(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 resize-none min-h-[200px]"
                placeholder={`Enter your ${platform} message...`}
                minRows={8}
                maxRows={12}
              />

              <MessageToolbar
                platform={platform}
                characterCount={content.length}
                onInsertVariable={handleInsertVariable}
                onAiSuggestion={() => handleViewChange('ai')}
                onPreview={() => setShowPreview(!showPreview)}
                onSaveTemplate={() => {}}
                leadColumns={leadColumns}
              />
            </div>

            {showPreview && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50"
              >
                <h4 className="text-sm font-medium text-slate-400 mb-2">Message Preview</h4>
                <div className="whitespace-pre-wrap text-white">
                  {renderPreview(content)}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}