import type { PlatformType } from '../components/campaigns/sequence/types';

interface TestAccount {
  id: string;
  platform: PlatformType;
  name: string;
  avatar: string;
  status: 'active' | 'warning' | 'error';
  limit: number;
  used: number;
  lastActive: string;
}

export const testAccounts: TestAccount[] = [
  // Instagram Accounts
  {
    id: 'instagram-1',
    platform: 'Instagram',
    name: 'John Marketing',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces',
    status: 'active',
    limit: 50,
    used: 12,
    lastActive: '2024-03-10T15:30:00Z'
  },
  {
    id: 'instagram-2',
    platform: 'Instagram',
    name: 'Sarah Social',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces',
    status: 'active',
    limit: 50,
    used: 25,
    lastActive: '2024-03-10T14:45:00Z'
  },

  // Facebook Accounts
  {
    id: 'facebook-1',
    platform: 'Facebook',
    name: 'Business Growth',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=faces',
    status: 'active',
    limit: 100,
    used: 45,
    lastActive: '2024-03-10T16:00:00Z'
  },
  {
    id: 'facebook-2',
    platform: 'Facebook',
    name: 'Lead Pro',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces',
    status: 'warning',
    limit: 100,
    used: 85,
    lastActive: '2024-03-10T13:20:00Z'
  },

  // LinkedIn Accounts
  {
    id: 'linkedin-1',
    platform: 'LinkedIn',
    name: 'B2B Connect',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop&crop=faces',
    status: 'active',
    limit: 100,
    used: 30,
    lastActive: '2024-03-10T16:15:00Z'
  },
  {
    id: 'linkedin-2',
    platform: 'LinkedIn',
    name: 'Sales Pro',
    avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&h=100&fit=crop&crop=faces',
    status: 'active',
    limit: 100,
    used: 50,
    lastActive: '2024-03-10T15:00:00Z'
  },

  // Twitter Accounts
  {
    id: 'twitter-1',
    platform: 'Twitter',
    name: 'Growth Hacker',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces',
    status: 'active',
    limit: 50,
    used: 20,
    lastActive: '2024-03-10T16:30:00Z'
  },
  {
    id: 'twitter-2',
    platform: 'Twitter',
    name: 'Digital Marketing',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces',
    status: 'warning',
    limit: 50,
    used: 40,
    lastActive: '2024-03-10T14:00:00Z'
  },

  // Discord Accounts
  {
    id: 'discord-1',
    platform: 'Discord',
    name: 'Community Pro',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=faces',
    status: 'active',
    limit: 200,
    used: 85,
    lastActive: '2024-03-10T16:45:00Z'
  },
  {
    id: 'discord-2',
    platform: 'Discord',
    name: 'Server Growth',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces',
    status: 'active',
    limit: 200,
    used: 120,
    lastActive: '2024-03-10T13:45:00Z'
  },

  // WhatsApp Accounts
  {
    id: 'whatsapp-1',
    platform: 'WhatsApp',
    name: 'Business Support',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop&crop=faces',
    status: 'active',
    limit: 100,
    used: 40,
    lastActive: '2024-03-10T17:00:00Z'
  },
  {
    id: 'whatsapp-2',
    platform: 'WhatsApp',
    name: 'Customer Care',
    avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&h=100&fit=crop&crop=faces',
    status: 'active',
    limit: 100,
    used: 60,
    lastActive: '2024-03-10T13:00:00Z'
  },

  // Telegram Accounts
  {
    id: 'telegram-1',
    platform: 'Telegram',
    name: 'Marketing Pro',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces',
    status: 'active',
    limit: 200,
    used: 75,
    lastActive: '2024-03-10T17:15:00Z'
  },
  {
    id: 'telegram-2',
    platform: 'Telegram',
    name: 'Lead Generation',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces',
    status: 'warning',
    limit: 200,
    used: 160,
    lastActive: '2024-03-10T12:30:00Z'
  },

  // Reddit Accounts
  {
    id: 'reddit-1',
    platform: 'Reddit',
    name: 'Subreddit Pro',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=faces',
    status: 'active',
    limit: 50,
    used: 15,
    lastActive: '2024-03-10T17:30:00Z'
  },
  {
    id: 'reddit-2',
    platform: 'Reddit',
    name: 'Community Growth',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces',
    status: 'active',
    limit: 50,
    used: 25,
    lastActive: '2024-03-10T12:00:00Z'
  },

  // TikTok Accounts
  {
    id: 'tiktok-1',
    platform: 'TikTok',
    name: 'B2B Growth',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop&crop=faces',
    status: 'active',
    limit: 50,
    used: 15,
    lastActive: '2024-03-10T17:45:00Z'
  },
  {
    id: 'tiktok-2',
    platform: 'TikTok',
    name: 'Business Connect',
    avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&h=100&fit=crop&crop=faces',
    status: 'active',
    limit: 50,
    used: 30,
    lastActive: '2024-03-10T11:30:00Z'
  },

  // Slack Accounts
  {
    id: 'slack-1',
    platform: 'Slack',
    name: 'Team Connect',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces',
    status: 'active',
    limit: 150,
    used: 60,
    lastActive: '2024-03-10T18:00:00Z'
  },
  {
    id: 'slack-2',
    platform: 'Slack',
    name: 'Workspace Pro',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces',
    status: 'active',
    limit: 150,
    used: 90,
    lastActive: '2024-03-10T11:00:00Z'
  },

  // Pinterest Accounts
  {
    id: 'pinterest-1',
    platform: 'Pinterest',
    name: 'Visual Marketing',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=faces',
    status: 'active',
    limit: 75,
    used: 25,
    lastActive: '2024-03-10T18:15:00Z'
  },
  {
    id: 'pinterest-2',
    platform: 'Pinterest',
    name: 'Business Growth',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces',
    status: 'active',
    limit: 75,
    used: 45,
    lastActive: '2024-03-10T10:30:00Z'
  },

  // Skool Accounts
  {
    id: 'skool-1',
    platform: 'Skool',
    name: 'Learning Pro',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop&crop=faces',
    status: 'active',
    limit: 100,
    used: 35,
    lastActive: '2024-03-10T18:30:00Z'
  },
  {
    id: 'skool-2',
    platform: 'Skool',
    name: 'Education Connect',
    avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&h=100&fit=crop&crop=faces',
    status: 'active',
    limit: 100,
    used: 55,
    lastActive: '2024-03-10T10:00:00Z'
  },

  // Nextdoor Accounts
  {
    id: 'nextdoor-1',
    platform: 'Nextdoor',
    name: 'Local Business',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces',
    status: 'active',
    limit: 50,
    used: 20,
    lastActive: '2024-03-10T18:45:00Z'
  },
  {
    id: 'nextdoor-2',
    platform: 'Nextdoor',
    name: 'Community Connect',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces',
    status: 'active',
    limit: 50,
    used: 30,
    lastActive: '2024-03-10T09:30:00Z'
  }
];