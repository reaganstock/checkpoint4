import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { CampaignSteps } from './steps/CampaignSteps';

interface NewCampaignModalProps {
  onClose: () => void;
}

export function NewCampaignModal({ onClose }: NewCampaignModalProps) {
  const [step, setStep] = useState(1);
  const [campaignData, setCampaignData] = useState({
    name: '',
    platform: '',
    leads: [],
    sequence: [],
    accounts: [],
    schedule: {
      timezone: '',
      days: [],
      timeRange: { start: '', end: '' }
    }
  });

  const handleNext = () => {
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const updateCampaignData = (data: Partial<typeof campaignData>) => {
    setCampaignData(prev => ({ ...prev, ...data }));
  };

  return (
    <AnimatePresence>
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
          <div className="flex items-center justify-between p-6 border-b border-slate-800/50">
            <div>
              <h2 className="text-xl font-semibold text-white">Create New Campaign</h2>
              <p className="text-sm text-slate-400 mt-1">Step {step} of 5</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          <CampaignSteps
            step={step}
            campaignData={campaignData}
            updateCampaignData={updateCampaignData}
            onNext={handleNext}
            onBack={handleBack}
            onClose={onClose}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}