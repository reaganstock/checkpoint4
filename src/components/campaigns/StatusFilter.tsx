import React from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import clsx from 'clsx';

const statuses = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'paused', label: 'Paused' },
  { value: 'completed', label: 'Completed' },
  { value: 'draft', label: 'Draft' },
];

interface StatusFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <div className="flex items-center space-x-2 bg-slate-800/50 rounded-lg p-1">
      <div className="p-2">
        <Filter className="w-4 h-4 text-slate-400" />
      </div>
      {statuses.map((status) => (
        <button
          key={status.value}
          onClick={() => onChange(status.value)}
          className={clsx(
            'px-3 py-1.5 rounded-md text-sm font-medium transition-colors relative',
            value === status.value
              ? 'text-white'
              : 'text-slate-400 hover:text-white'
          )}
        >
          {value === status.value && (
            <motion.div
              layoutId="statusHighlight"
              className="absolute inset-0 bg-indigo-500/20 rounded-md"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{status.label}</span>
        </button>
      ))}
    </div>
  );
}