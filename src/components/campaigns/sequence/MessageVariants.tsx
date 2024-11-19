import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Copy, AlertCircle } from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';
import type { PlatformType } from './types';

interface Variant {
  id: string;
  content: string;
  weight: number;
}

interface MessageVariantsProps {
  variants: Variant[];
  platform: PlatformType;
  onUpdate: (variants: Variant[]) => void;
  activeVariantIndex: number;
  onSelectVariant: (index: number) => void;
}

export function MessageVariants({ 
  variants, 
  platform, 
  onUpdate, 
  activeVariantIndex,
  onSelectVariant 
}: MessageVariantsProps) {
  const [error, setError] = useState('');
  const totalWeight = variants.reduce((sum, v) => sum + v.weight, 0);
  const isWeightValid = totalWeight === 100;

  const addVariant = () => {
    if (!isWeightValid) {
      setError('Please ensure weights total 100% before adding a new variant');
      return;
    }

    const newVariant = {
      id: crypto.randomUUID(),
      content: '',
      weight: Math.floor(100 / (variants.length + 1))
    };
    
    // Adjust weights of existing variants
    const updatedVariants = variants.map(v => ({
      ...v,
      weight: Math.floor(100 / (variants.length + 1))
    }));
    
    onUpdate([...updatedVariants, newVariant]);
    setError('');
  };

  const updateVariant = (id: string, updates: Partial<Variant>) => {
    let updatedVariants = variants.map(v => 
      v.id === id ? { ...v, ...updates } : v
    );

    if ('weight' in updates) {
      const newTotalWeight = updatedVariants.reduce((sum, v) => sum + v.weight, 0);
      if (newTotalWeight > 100) {
        setError('Total weight cannot exceed 100%');
        return;
      }
      setError('');
    }

    onUpdate(updatedVariants);
  };

  const removeVariant = (id: string) => {
    if (variants.length > 1) {
      const remainingVariants = variants.filter(v => v.id !== id);
      const weightPerVariant = Math.floor(100 / remainingVariants.length);
      const updatedVariants = remainingVariants.map(v => ({
        ...v,
        weight: weightPerVariant
      }));
      onUpdate(updatedVariants);
      setError('');
    }
  };

  const duplicateVariant = (variant: Variant) => {
    if (!isWeightValid) {
      setError('Please ensure weights total 100% before duplicating');
      return;
    }

    const newWeight = Math.floor(100 / (variants.length + 1));
    const newVariant = {
      ...variant,
      id: crypto.randomUUID(),
      weight: newWeight
    };
    
    const updatedVariants = variants.map(v => ({
      ...v,
      weight: newWeight
    }));
    
    onUpdate([...updatedVariants, newVariant]);
    setError('');
  };

  return (
    <div className="space-y-6">
      <AnimatePresence mode="popLayout">
        {variants.map((variant, index) => (
          <motion.div
            key={variant.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onClick={() => onSelectVariant(index)}
            className={`space-y-4 p-4 rounded-lg border transition-all cursor-pointer ${
              index === activeVariantIndex
                ? 'border-indigo-500 bg-indigo-500/10'
                : 'border-slate-700/50 hover:border-indigo-500/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <h4 className="text-sm font-medium text-white">
                  Variant {index + 1}
                </h4>
                <span className="text-xs text-slate-400">
                  v{index + 1}/{variants.length}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    duplicateVariant(variant);
                  }}
                  className="p-1.5 text-slate-400 hover:text-white transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
                {variants.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeVariant(variant.id);
                    }}
                    className="p-1.5 text-slate-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <TextareaAutosize
              value={variant.content}
              onChange={(e) => updateVariant(variant.id, { content: e.target.value })}
              onClick={(e) => e.stopPropagation()}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 resize-none"
              placeholder={`Write variant ${index + 1}...`}
              minRows={3}
            />

            <div className="flex items-center space-x-4">
              <label className="flex-1">
                <span className="text-sm text-slate-400">Weight (%)</span>
                <input
                  type="number"
                  value={variant.weight}
                  onChange={(e) => updateVariant(variant.id, { 
                    weight: Math.min(100, Math.max(0, parseInt(e.target.value) || 0))
                  })}
                  onClick={(e) => e.stopPropagation()}
                  className="mt-1 w-full px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50"
                />
              </label>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={addVariant}
        disabled={!isWeightValid}
        className="w-full p-3 border border-dashed border-slate-700/50 rounded-lg text-slate-400 hover:text-white hover:border-indigo-500/50 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Plus className="w-4 h-4" />
        <span>Add Variant</span>
      </motion.button>

      <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-medium text-white">Weight Distribution</h4>
          <div className="text-sm text-slate-400">
            Total: {totalWeight}%
          </div>
        </div>
        
        <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden flex">
          {variants.map((variant, index) => (
            <div
              key={variant.id}
              className={`h-full transition-all ${
                index === activeVariantIndex
                  ? 'bg-indigo-500'
                  : 'bg-indigo-500/50'
              }`}
              style={{ width: `${variant.weight}%` }}
            />
          ))}
        </div>

        {error && (
          <div className="mt-2 flex items-center space-x-2 text-red-400">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {totalWeight !== 100 && !error && (
          <div className="mt-2 flex items-center space-x-2 text-amber-400">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">Total weight must equal 100% before continuing</span>
          </div>
        )}
      </div>
    </div>
  );
}