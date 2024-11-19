import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wand2, Save, Eye, AlertTriangle, Variable, ChevronDown, Library } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Tooltip from '@radix-ui/react-tooltip';
import { SaveTemplateModal } from './SaveTemplateModal';
import { TemplateLibrary } from './TemplateLibrary';
import type { PlatformType } from './types';

interface MessageToolbarProps {
  platform: PlatformType;
  characterCount: number;
  onInsertVariable: (variable: string) => void;
  onAiSuggestion: () => void;
  onPreview: () => void;
  onSaveTemplate: () => void;
  onSelectTemplate?: (content: string) => void;
  leadColumns?: string[];
}

const platformLimits: Record<PlatformType, number> = {
  'Instagram': 1000,
  'Facebook': 2000,
  'LinkedIn': 2000,
  'Twitter': 280,
  'WhatsApp': 4096,
  'Telegram': 4096,
  'Discord': 2000,
  'Reddit': 10000,
  'Pinterest': 1000,
  'Nextdoor': 1000,
  'Skool': 1000,
  'Slack': 4000,
  'TikTok': 1000
};

// Default variables if no lead columns are provided
const defaultVariables = [
  'firstName',
  'lastName',
  'email',
  'company',
  'position',
  'title',
  'phone',
  'city',
  'country'
];

export function MessageToolbar({
  platform,
  characterCount,
  onInsertVariable,
  onAiSuggestion,
  onPreview,
  onSaveTemplate,
  onSelectTemplate,
  leadColumns = defaultVariables
}: MessageToolbarProps) {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);

  const handleVariableSelect = (variable: string) => {
    onInsertVariable(variable);
  };

  return (
    <>
      <div className="flex items-center justify-between p-2 bg-slate-800/50 border-t border-slate-700/50">
        <div className="flex items-center space-x-2">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors text-slate-400 hover:text-white flex items-center space-x-1">
                <Variable className="w-4 h-4" />
                <span className="text-sm">Variables</span>
                <ChevronDown className="w-3 h-3" />
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content 
                className="w-56 bg-slate-800 rounded-lg shadow-xl border border-slate-700/50 overflow-hidden z-50"
                sideOffset={5}
              >
                <div className="max-h-[300px] overflow-y-auto">
                  <div className="p-2 space-y-1">
                    {leadColumns.map((variable) => (
                      <DropdownMenu.Item
                        key={variable}
                        onSelect={() => handleVariableSelect(variable)}
                        className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-700/50 cursor-pointer outline-none text-slate-300 hover:text-white"
                      >
                        <span className="text-sm capitalize">
                          {variable.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </span>
                        <code className="text-xs text-slate-400 bg-slate-900/50 px-1.5 py-0.5 rounded">
                          {`{${variable}}`}
                        </code>
                      </DropdownMenu.Item>
                    ))}
                  </div>
                </div>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>

          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onAiSuggestion}
                  className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors text-slate-400 hover:text-white"
                >
                  <Wand2 className="w-4 h-4" />
                </motion.button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content 
                  className="bg-slate-800 text-white text-sm px-3 py-1.5 rounded-lg"
                  sideOffset={5}
                >
                  AI Message Suggestions
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>

          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onPreview}
                  className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors text-slate-400 hover:text-white"
                >
                  <Eye className="w-4 h-4" />
                </motion.button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content 
                  className="bg-slate-800 text-white text-sm px-3 py-1.5 rounded-lg"
                  sideOffset={5}
                >
                  Preview Message
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>

          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowSaveModal(true)}
                  className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors text-slate-400 hover:text-white"
                >
                  <Save className="w-4 h-4" />
                </motion.button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content 
                  className="bg-slate-800 text-white text-sm px-3 py-1.5 rounded-lg"
                  sideOffset={5}
                >
                  Save as Template
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>

          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowLibrary(true)}
                  className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors text-slate-400 hover:text-white"
                >
                  <Library className="w-4 h-4" />
                </motion.button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content 
                  className="bg-slate-800 text-white text-sm px-3 py-1.5 rounded-lg"
                  sideOffset={5}
                >
                  Template Library
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
        </div>

        <div className="flex items-center space-x-3">
          {characterCount > platformLimits[platform] && (
            <div className="flex items-center text-red-400 text-sm">
              <AlertTriangle className="w-4 h-4 mr-1" />
              <span>Character limit exceeded</span>
            </div>
          )}
          <div className={`text-sm font-medium ${
            characterCount > platformLimits[platform] ? 'text-red-400' : 'text-slate-400'
          }`}>
            {characterCount}/{platformLimits[platform]}
          </div>
        </div>
      </div>

      {showSaveModal && (
        <SaveTemplateModal
          content=""
          platform={platform}
          onClose={() => setShowSaveModal(false)}
        />
      )}

      {showLibrary && (
        <TemplateLibrary
          platform={platform}
          onSelect={(content) => {
            onSelectTemplate?.(content);
            setShowLibrary(false);
          }}
          onClose={() => setShowLibrary(false)}
        />
      )}
    </>
  );
}