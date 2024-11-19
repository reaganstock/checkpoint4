import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, Link as LinkIcon, User, Eye, EyeOff, Filter } from 'lucide-react';
import * as Select from '@radix-ui/react-select';
import * as Switch from '@radix-ui/react-switch';
import clsx from 'clsx';
import type { PlatformType } from '../sequence/types';

interface LeadMappingModalProps {
  platforms: PlatformType[];
  columns: string[];
  onSave: (mappings: Record<string, { column: string; type: 'username' | 'profile_url' }>, excludedColumns: string[], excludeExistingCampaigns: boolean) => void;
  onClose: () => void;
}

export function LeadMappingModal({ platforms, columns, onSave, onClose }: LeadMappingModalProps) {
  const [mappings, setMappings] = useState<Record<string, { column: string; type: 'username' | 'profile_url' }>>({});
  const [excludedColumns, setExcludedColumns] = useState<string[]>([]);
  const [excludeExistingCampaigns, setExcludeExistingCampaigns] = useState(false);
  const [error, setError] = useState('');

  const handleSave = () => {
    // Validate that all platforms have mappings
    const unmappedPlatforms = platforms.filter(platform => !mappings[platform]);
    if (unmappedPlatforms.length > 0) {
      setError(`Please map columns for: ${unmappedPlatforms.join(', ')}`);
      return;
    }
    onSave(mappings, excludedColumns, excludeExistingCampaigns);
  };

  const updateMapping = (platform: string, value: { column: string; type: 'username' | 'profile_url' }) => {
    setMappings(prev => ({
      ...prev,
      [platform]: value
    }));
    setError('');
  };

  const toggleColumnExclusion = (column: string) => {
    setExcludedColumns(prev => 
      prev.includes(column)
        ? prev.filter(c => c !== column)
        : [...prev, column]
    );
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
        className="bg-slate-900 border border-slate-800/50 rounded-xl shadow-xl w-full max-w-2xl mx-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-800/50">
          <div>
            <h2 className="text-xl font-semibold text-white">Map Lead Data</h2>
            <p className="text-sm text-slate-400 mt-1">
              Specify which columns contain platform usernames or profile URLs
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center space-x-3"
            >
              <AlertCircle className="w-5 h-5 text-red-400" />
              <p className="text-sm text-red-400">{error}</p>
            </motion.div>
          )}

          <div className="space-y-4">
            <h3 className="text-white font-medium">Column Visibility</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {columns.map((column) => (
                <button
                  key={column}
                  onClick={() => toggleColumnExclusion(column)}
                  className={clsx(
                    'px-3 py-2 rounded-lg flex items-center justify-between transition-colors text-left',
                    excludedColumns.includes(column)
                      ? 'bg-slate-800/50 text-slate-400'
                      : 'bg-slate-800/20 text-white'
                  )}
                >
                  <span className="text-sm truncate mr-2">{column}</span>
                  {excludedColumns.includes(column) ? (
                    <EyeOff className="w-4 h-4 flex-shrink-0" />
                  ) : (
                    <Eye className="w-4 h-4 flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {platforms.map((platform) => (
            <div key={platform} className="space-y-4">
              <h3 className="text-white font-medium">{platform}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Column</label>
                  <Select.Root
                    value={mappings[platform]?.column}
                    onValueChange={(value) => updateMapping(platform, {
                      column: value,
                      type: mappings[platform]?.type || 'username'
                    })}
                  >
                    <Select.Trigger
                      className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white flex items-center justify-between"
                    >
                      <Select.Value placeholder="Select column" />
                      <Select.Icon>
                        <X className="w-4 h-4 text-slate-400" />
                      </Select.Icon>
                    </Select.Trigger>

                    <Select.Portal>
                      <Select.Content
                        className="bg-slate-800 border border-slate-700/50 rounded-lg shadow-xl overflow-hidden z-50"
                      >
                        <Select.Viewport className="p-1 max-h-[200px] overflow-y-auto">
                          {columns
                            .filter(column => !excludedColumns.includes(column))
                            .map((column) => (
                              <Select.Item
                                key={column}
                                value={column}
                                className="px-3 py-2 text-white hover:bg-slate-700/50 rounded-lg cursor-pointer outline-none"
                              >
                                <Select.ItemText>{column}</Select.ItemText>
                              </Select.Item>
                            ))}
                        </Select.Viewport>
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-2">Type</label>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateMapping(platform, {
                        column: mappings[platform]?.column || '',
                        type: 'username'
                      })}
                      className={clsx(
                        'flex-1 px-3 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors',
                        mappings[platform]?.type === 'username'
                          ? 'bg-indigo-500 text-white'
                          : 'bg-slate-800/50 text-slate-400 hover:text-white'
                      )}
                    >
                      <User className="w-4 h-4" />
                      <span>Username</span>
                    </button>
                    <button
                      onClick={() => updateMapping(platform, {
                        column: mappings[platform]?.column || '',
                        type: 'profile_url'
                      })}
                      className={clsx(
                        'flex-1 px-3 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors',
                        mappings[platform]?.type === 'profile_url'
                          ? 'bg-indigo-500 text-white'
                          : 'bg-slate-800/50 text-slate-400 hover:text-white'
                      )}
                    >
                      <LinkIcon className="w-4 h-4" />
                      <span>Profile URL</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Filter className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-sm font-medium text-white">Exclude Existing Campaign Leads</p>
                <p className="text-xs text-slate-400">Filter out leads that are already in other campaigns</p>
              </div>
            </div>
            <Switch.Root
              checked={excludeExistingCampaigns}
              onCheckedChange={setExcludeExistingCampaigns}
              className={clsx(
                'w-11 h-6 rounded-full transition-colors',
                excludeExistingCampaigns ? 'bg-indigo-500' : 'bg-slate-700'
              )}
            >
              <Switch.Thumb 
                className={clsx(
                  'block w-5 h-5 bg-white rounded-full transition-transform',
                  excludeExistingCampaigns ? 'translate-x-6' : 'translate-x-0.5'
                )}
              />
            </Switch.Root>
          </div>
        </div>

        <div className="p-6 border-t border-slate-800/50 flex justify-end space-x-3">
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
            Save Mappings
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}