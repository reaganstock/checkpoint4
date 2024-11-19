import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { motion } from 'framer-motion';
import { MessageSquare, Clock, GitFork, Ban } from 'lucide-react';
import clsx from 'clsx';
import type { NodeData } from './types';

const nodeIcons = {
  'send-dm': MessageSquare,
  'wait-time': Clock,
  'if-then': GitFork,
  'end-campaign': Ban,
};

const nodeColors = {
  'send-dm': 'bg-indigo-500/20 border-indigo-500/50 text-indigo-400',
  'wait-time': 'bg-amber-500/20 border-amber-500/50 text-amber-400',
  'if-then': 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400',
  'end-campaign': 'bg-red-500/20 border-red-500/50 text-red-400',
};

interface WorkflowNodeProps {
  data: NodeData;
  selected: boolean;
}

function WorkflowNodeComponent({ data, selected }: WorkflowNodeProps) {
  const Icon = nodeIcons[data.type];
  const colorClass = nodeColors[data.type];

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      className={clsx(
        'px-4 py-3 rounded-lg border backdrop-blur-sm shadow-xl min-w-[180px]',
        colorClass,
        selected && 'ring-2 ring-white/50'
      )}
    >
      <Handle type="target" position={Position.Top} className="!bg-slate-400" />
      
      <div className="flex items-center space-x-3">
        {Icon && <Icon className="w-5 h-5" />}
        <span className="text-sm font-medium text-white">{data.label}</span>
      </div>

      {data.type === 'send-dm' && data.content && (
        <p className="mt-2 text-xs text-slate-400 truncate">
          {data.content.substring(0, 50)}...
        </p>
      )}

      {data.type === 'wait-time' && data.delay && (
        <p className="mt-2 text-xs text-slate-400">
          Wait {data.delay}h
        </p>
      )}

      <Handle type="source" position={Position.Bottom} className="!bg-slate-400" />
    </motion.div>
  );
}

export const WorkflowNode = memo(WorkflowNodeComponent);