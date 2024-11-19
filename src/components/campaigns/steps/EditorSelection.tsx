import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Workflow, ArrowRight } from 'lucide-react';

interface EditorSelectionProps {
  onNext: () => void;
  onSelectMode: (mode: 'basic' | 'advanced') => void;
}

export function EditorSelection({ onNext, onSelectMode }: EditorSelectionProps) {
  const handleSelect = (mode: 'basic' | 'advanced') => {
    onSelectMode(mode);
    onNext();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Choose Your Editor</h2>
        <p className="text-slate-400">Select the editor that best suits your campaign needs</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelect('basic')}
          className="p-6 bg-slate-800/50 border border-slate-700/50 rounded-xl hover:border-indigo-500/50 transition-all text-left group"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="p-3 bg-indigo-500/20 rounded-lg">
              <MessageSquare className="w-6 h-6 text-indigo-400" />
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Basic Editor</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            Perfect for straightforward campaigns with simple message sequences and wait times.
            Ideal for beginners or those who need quick campaign setup.
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center text-slate-300">
              <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mr-2" />
              Linear message sequences
            </li>
            <li className="flex items-center text-slate-300">
              <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mr-2" />
              Message variants & A/B testing
            </li>
            <li className="flex items-center text-slate-300">
              <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mr-2" />
              Simple wait times
            </li>
          </ul>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelect('advanced')}
          className="p-6 bg-slate-800/50 border border-slate-700/50 rounded-xl hover:border-indigo-500/50 transition-all text-left group"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <Workflow className="w-6 h-6 text-purple-400" />
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Advanced Builder</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            Visual workflow builder for complex campaigns with conditional logic, triggers,
            and sophisticated automation rules.
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center text-slate-300">
              <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2" />
              Visual drag-and-drop builder
            </li>
            <li className="flex items-center text-slate-300">
              <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2" />
              Optional trigger events
            </li>
            <li className="flex items-center text-slate-300">
              <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2" />
              Advanced branching logic
            </li>
          </ul>
        </motion.button>
      </div>
    </div>
  );
}