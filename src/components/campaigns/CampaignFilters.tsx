import React from 'react';
import { motion } from 'framer-motion';
import { Filter, ArrowDownAZ, ArrowUpZA, Clock, Search } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';

const statuses = [
  { value: 'all', label: 'All Statuses' },
  { value: 'active', label: 'Active', color: 'text-green-400' },
  { value: 'paused', label: 'Paused', color: 'text-amber-400' },
  { value: 'completed', label: 'Completed', color: 'text-blue-400' },
  { value: 'draft', label: 'Draft', color: 'text-slate-400' },
  { value: 'error', label: 'Error', color: 'text-red-400' },
];

const platforms = [
  { value: 'all', label: 'All Platforms' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'twitter', label: 'X (Twitter)' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'reddit', label: 'Reddit' },
  { value: 'discord', label: 'Discord' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'telegram', label: 'Telegram' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'slack', label: 'Slack' },
  { value: 'pinterest', label: 'Pinterest' },
  { value: 'skool', label: 'Skool' },
  { value: 'nextdoor', label: 'Nextdoor' },
];

const sortOptions = [
  { value: 'newest', label: 'Newest First', icon: Clock },
  { value: 'oldest', label: 'Oldest First', icon: Clock },
  { value: 'name-asc', label: 'Name (A-Z)', icon: ArrowDownAZ },
  { value: 'name-desc', label: 'Name (Z-A)', icon: ArrowUpZA },
];

interface CampaignFiltersProps {
  statusFilter: string;
  platformFilter: string;
  sortOrder: string;
  onStatusChange: (value: string) => void;
  onPlatformChange: (value: string) => void;
  onSortOrderChange: (value: string) => void;
}

export function CampaignFilters({
  statusFilter,
  platformFilter,
  sortOrder,
  onStatusChange,
  onPlatformChange,
  onSortOrderChange,
}: CampaignFiltersProps) {
  return (
    <div className="flex items-center space-x-4 mb-6">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search campaigns..."
          className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all"
        />
      </div>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-300 hover:text-white transition-colors flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Status</span>
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="w-56 bg-slate-800 rounded-lg shadow-xl border border-slate-700/50 overflow-hidden z-50"
            sideOffset={5}
          >
            {statuses.map((status) => (
              <DropdownMenu.Item
                key={status.value}
                onSelect={() => onStatusChange(status.value)}
                className={clsx(
                  'flex items-center space-x-2 px-4 py-2.5 hover:bg-slate-700/50 cursor-pointer outline-none',
                  status.color || 'text-white'
                )}
              >
                <span>{status.label}</span>
                {statusFilter === status.value && (
                  <motion.span
                    layoutId="statusCheck"
                    className="ml-auto w-2 h-2 bg-indigo-500 rounded-full"
                  />
                )}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-300 hover:text-white transition-colors flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Platform</span>
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="w-56 bg-slate-800 rounded-lg shadow-xl border border-slate-700/50 overflow-hidden z-50"
            sideOffset={5}
          >
            {platforms.map((platform) => (
              <DropdownMenu.Item
                key={platform.value}
                onSelect={() => onPlatformChange(platform.value)}
                className="flex items-center space-x-2 px-4 py-2.5 hover:bg-slate-700/50 cursor-pointer outline-none text-slate-300 hover:text-white"
              >
                <span>{platform.label}</span>
                {platformFilter === platform.value && (
                  <motion.span
                    layoutId="platformCheck"
                    className="ml-auto w-2 h-2 bg-indigo-500 rounded-full"
                  />
                )}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-300 hover:text-white transition-colors flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Sort</span>
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="w-56 bg-slate-800 rounded-lg shadow-xl border border-slate-700/50 overflow-hidden z-50"
            sideOffset={5}
          >
            {sortOptions.map((option) => (
              <DropdownMenu.Item
                key={option.value}
                onSelect={() => onSortOrderChange(option.value)}
                className="flex items-center space-x-2 px-4 py-2.5 hover:bg-slate-700/50 cursor-pointer outline-none text-slate-300 hover:text-white"
              >
                <option.icon className="w-4 h-4" />
                <span>{option.label}</span>
                {sortOrder === option.value && (
                  <motion.span
                    layoutId="sortCheck"
                    className="ml-auto w-2 h-2 bg-indigo-500 rounded-full"
                  />
                )}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
}