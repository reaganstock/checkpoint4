import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Campaign } from '../components/campaigns/sequence/types';

interface CampaignStore {
  campaigns: Campaign[];
  addCampaign: (campaign: Omit<Campaign, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => void;
  updateCampaign: (id: string, updates: Partial<Campaign>) => void;
  deleteCampaign: (id: string) => void;
  getCampaign: (id: string) => Campaign | undefined;
}

export const useCampaignStore = create<CampaignStore>()(
  persist(
    (set, get) => ({
      campaigns: [],
      addCampaign: (campaign) => {
        const newCampaign: Campaign = {
          ...campaign,
          id: crypto.randomUUID(),
          status: 'draft',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({
          campaigns: [...state.campaigns, newCampaign],
        }));
      },
      updateCampaign: (id, updates) => {
        set((state) => ({
          campaigns: state.campaigns.map((campaign) =>
            campaign.id === id
              ? { ...campaign, ...updates, updatedAt: new Date().toISOString() }
              : campaign
          ),
        }));
      },
      deleteCampaign: (id) => {
        set((state) => ({
          campaigns: state.campaigns.filter((campaign) => campaign.id !== id),
        }));
      },
      getCampaign: (id) => {
        return get().campaigns.find((campaign) => campaign.id === id);
      },
    }),
    {
      name: 'campaign-storage',
    }
  )
);