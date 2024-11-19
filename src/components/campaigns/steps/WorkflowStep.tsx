import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { WorkflowEditor } from '../../workflow/WorkflowEditor';

interface WorkflowStepProps {
  data: {
    platforms: PlatformType[];
    editorMode: 'basic' | 'advanced';
  };
  updateData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export function WorkflowStep({ data, updateData, onNext, onBack }: WorkflowStepProps) {
  // Only show workflow editor in advanced mode
  if (data.editorMode === 'basic') {
    return null;
  }

  const handleContinue = () => {
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="h-[600px] bg-slate-900 rounded-lg border border-slate-800/50 overflow-hidden">
        <WorkflowEditor
          platforms={data.platforms}
          onChange={(workflow) => updateData({ workflow })}
        />
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-4 py-2 text-slate-400 hover:text-white transition-colors flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <button
          onClick={handleContinue}
          className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
}