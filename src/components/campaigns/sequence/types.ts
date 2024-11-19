export type PlatformType = 
  | 'Instagram'
  | 'Facebook'
  | 'LinkedIn'
  | 'Twitter'
  | 'WhatsApp'
  | 'Telegram'
  | 'Discord'
  | 'Reddit'
  | 'Pinterest'
  | 'Nextdoor'
  | 'Skool'
  | 'Slack'
  | 'TikTok';

export type ActionType = 
  | 'message'
  | 'wait'
  | 'follow-up'
  | 'end';

export interface Message {
  id: string;
  type: ActionType;
  content: string;
  platform?: PlatformType;
  delay?: number;
  variants?: Array<{
    id: string;
    content: string;
    weight: number;
  }>;
}

export interface MessageTemplate {
  id: string;
  name: string;
  content: string;
  platform: PlatformType;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  platforms: PlatformType[];
  editorMode: 'basic' | 'advanced';
  sequence?: Message[];
  workflow?: {
    nodes: any[];
    edges: any[];
  };
  leads: any[];
  accounts: string[];
  schedule: {
    timezone: string;
    days: string[];
    timeRange: {
      start: string;
      end: string;
    };
    messageCount?: {
      min: number;
      max: number;
    };
  };
  status: 'draft' | 'active' | 'paused' | 'completed';
  createdAt: string;
  updatedAt: string;
}