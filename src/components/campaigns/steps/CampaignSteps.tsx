import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NameStep } from './NameStep';
import { LeadsStep } from './LeadsStep';
import { SequenceStep } from './SequenceStep';
import { AccountsStep } from './AccountsStep';
import { ScheduleStep } from './ScheduleStep';

interface CampaignStepsProps {
  step: number;
  campaignData: any;
  updateCampaignData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
  onClose: () => void;
}

export function CampaignSteps({
  step,
  campaignData,
  updateCampaignData,
  onNext,
  onBack,
  onClose,
}: CampaignStepsProps) {
  const steps = [
    { id: 1, Component: NameStep },
    { id: 2, Component: LeadsStep },
    { id: 3, Component: SequenceStep },
    { id: 4, Component: AccountsStep },
    { id: 5, Component: ScheduleStep },
  ];

  const currentStep = steps.find(s => s.id === step);
  
  if (!currentStep) return null;

  const { Component } = currentStep;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.2 }}
      >
        <Component
          data={campaignData}
          updateData={updateCampaignData}
          onNext={onNext}
          onBack={onBack}
          onClose={onClose}
          isLastStep={step === steps.length}
        />
      </motion.div>
    </AnimatePresence>
  );
}