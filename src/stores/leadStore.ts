import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { PlatformType } from '../components/campaigns/sequence/types';
import { compress, decompress } from 'lz-string';

interface LeadMapping {
  column: string;
  type: 'username' | 'profile_url';
}

interface LeadList {
  id: string;
  name: string;
  columns: string[];
  leads: Record<string, string>[];
  platformMappings: Record<string, LeadMapping>;
  createdAt: string;
  updatedAt: string;
}

interface LeadStore {
  lists: LeadList[];
  addList: (name: string, columns: string[], leads: Record<string, string>[], platformMappings: Record<string, LeadMapping>) => void;
  updateList: (id: string, updates: Partial<LeadList>) => void;
  deleteList: (id: string) => void;
  getList: (id: string) => LeadList | undefined;
  getLeadValue: (lead: Record<string, string>, platform: PlatformType) => string | undefined;
  clearOldLists: () => void;
}

// Custom storage with compression
const customStorage = {
  getItem: (name: string) => {
    const str = localStorage.getItem(name);
    if (!str) return null;
    try {
      return JSON.parse(decompress(str));
    } catch {
      return null;
    }
  },
  setItem: (name: string, value: string) => {
    try {
      const compressed = compress(value);
      localStorage.setItem(name, compressed);
    } catch (e) {
      if (e.name === 'QuotaExceededError') {
        const store = JSON.parse(value);
        // Keep only the 10 most recent lists
        store.state.lists = store.state.lists
          .sort((a: LeadList, b: LeadList) => 
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          )
          .slice(0, 10);
        
        // Try again with fewer lists
        try {
          const compressedReduced = compress(JSON.stringify(store));
          localStorage.setItem(name, compressedReduced);
        } catch {
          // If still failing, keep only 5 lists
          store.state.lists = store.state.lists.slice(0, 5);
          const compressedMinimal = compress(JSON.stringify(store));
          localStorage.setItem(name, compressedMinimal);
        }
      }
    }
  },
  removeItem: (name: string) => localStorage.removeItem(name),
};

export const useLeadStore = create<LeadStore>()(
  persist(
    (set, get) => ({
      lists: [],
      addList: (name, columns, leads, platformMappings) => {
        const newList: LeadList = {
          id: crypto.randomUUID(),
          name,
          columns,
          leads,
          platformMappings,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => {
          // Keep only the 10 most recent lists
          const sortedLists = [...state.lists, newList]
            .sort((a, b) => 
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
            )
            .slice(0, 10);
          return { lists: sortedLists };
        });
      },
      updateList: (id, updates) => {
        set((state) => ({
          lists: state.lists.map((list) =>
            list.id === id
              ? { ...list, ...updates, updatedAt: new Date().toISOString() }
              : list
          ),
        }));
      },
      deleteList: (id) => {
        set((state) => ({
          lists: state.lists.filter((list) => list.id !== id),
        }));
      },
      getList: (id) => {
        return get().lists.find((list) => list.id === id);
      },
      getLeadValue: (lead, platform) => {
        const list = get().lists.find((list) => 
          list.leads.some((l) => l === lead)
        );
        if (!list) return undefined;

        const mapping = list.platformMappings[platform];
        if (!mapping) return undefined;

        return lead[mapping.column];
      },
      clearOldLists: () => {
        set((state) => ({
          lists: state.lists
            .sort((a, b) => 
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
            )
            .slice(0, 10)
        }));
      },
    }),
    {
      name: 'lead-storage',
      storage: createJSONStorage(() => customStorage),
    }
  )
);