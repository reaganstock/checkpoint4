import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { MessageTemplate, PlatformType } from '../components/campaigns/sequence/types';

interface TemplateStore {
  templates: MessageTemplate[];
  addTemplate: (template: Omit<MessageTemplate, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTemplate: (id: string, updates: Partial<MessageTemplate>) => void;
  deleteTemplate: (id: string) => void;
  getTemplatesByPlatform: (platform: PlatformType) => MessageTemplate[];
}

export const useTemplateStore = create<TemplateStore>()(
  persist(
    (set, get) => ({
      templates: [],
      addTemplate: (template) => {
        const newTemplate: MessageTemplate = {
          ...template,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({
          templates: [...state.templates, newTemplate],
        }));
      },
      updateTemplate: (id, updates) => {
        set((state) => ({
          templates: state.templates.map((template) =>
            template.id === id
              ? { ...template, ...updates, updatedAt: new Date().toISOString() }
              : template
          ),
        }));
      },
      deleteTemplate: (id) => {
        set((state) => ({
          templates: state.templates.filter((template) => template.id !== id),
        }));
      },
      getTemplatesByPlatform: (platform) => {
        return get().templates.filter((template) => template.platform === platform);
      },
    }),
    {
      name: 'template-storage',
    }
  )
);