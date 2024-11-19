import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { CampaignList } from './CampaignList';
import { CampaignCreator } from './CampaignCreator';
import { CampaignFilters } from './CampaignFilters';

export function CampaignsTab() {
  const [isCreating, setIsCreating] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  const [editingCampaignId, setEditingCampaignId] = useState<string | null>(null);

  if (isCreating || editingCampaignId) {
    return (
      <CampaignCreator 
        onClose={() => {
          setIsCreating(false);
          setEditingCampaignId(null);
        }}
        editingCampaignId={editingCampaignId}
      />
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500"
        >
          Campaigns
        </motion.h1>
        
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCreating(true)}
          className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>New Campaign</span>
        </motion.button>
      </div>

      <CampaignFilters
        statusFilter={statusFilter}
        platformFilter={platformFilter}
        sortOrder={sortOrder}
        onStatusChange={setStatusFilter}
        onPlatformChange={setPlatformFilter}
        onSortOrderChange={setSortOrder}
      />

      <CampaignList 
        filter={statusFilter} 
        onEdit={(id) => setEditingCampaignId(id)}
      />
    </div>
  );
}