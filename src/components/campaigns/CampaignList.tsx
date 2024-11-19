import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, CheckCircle, AlertCircle, MoreVertical, Download, Share2, Copy, Pencil, Trash2 } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Progress from '@radix-ui/react-progress';
import clsx from 'clsx';

interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed' | 'draft' | 'error';
  platforms: string[];
  sent: number;
  responses: number;
  replyRate: number;
  progress: number;
  createdAt: string;
}

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Q1 Lead Generation',
    status: 'active',
    platforms: ['LinkedIn', 'Twitter', 'Discord'],
    sent: 1250,
    responses: 180,
    replyRate: 14.4,
    progress: 65,
    createdAt: '2024-03-10T10:00:00Z'
  },
  {
    id: '2',
    name: 'Product Launch Outreach',
    status: 'paused',
    platforms: ['Twitter', 'LinkedIn'],
    sent: 850,
    responses: 95,
    replyRate: 11.2,
    progress: 45,
    createdAt: '2024-03-09T15:30:00Z'
  },
  {
    id: '3',
    name: 'Customer Feedback',
    status: 'error',
    platforms: ['Instagram', 'Facebook', 'WhatsApp'],
    sent: 2000,
    responses: 320,
    replyRate: 16,
    progress: 80,
    createdAt: '2024-03-08T09:15:00Z'
  },
];

const statusIcons = {
  active: Play,
  paused: Pause,
  completed: CheckCircle,
  draft: AlertCircle,
  error: AlertCircle,
};

const statusColors = {
  active: 'text-green-500',
  paused: 'text-amber-500',
  completed: 'text-blue-500',
  draft: 'text-slate-500',
  error: 'text-red-500',
};

const progressColors = {
  active: 'bg-green-500',
  paused: 'bg-amber-500',
  completed: 'bg-blue-500',
  draft: 'bg-slate-500',
  error: 'bg-red-500',
};

interface CampaignListProps {
  filter: string;
  onEdit: (id: string) => void;
}

export function CampaignList({ filter, onEdit }: CampaignListProps) {
  const filteredCampaigns = filter === 'all'
    ? mockCampaigns
    : mockCampaigns.filter(campaign => campaign.status === filter);

  const handleDelete = (id: string) => {
    // Implement delete functionality
    console.log('Delete campaign:', id);
  };

  const handleDuplicate = (id: string) => {
    // Implement duplicate functionality
    console.log('Duplicate campaign:', id);
  };

  const handleDownloadAnalytics = (id: string) => {
    // Implement analytics download
    console.log('Download analytics for campaign:', id);
  };

  const handleShare = (id: string) => {
    // Implement share functionality
    console.log('Share campaign:', id);
  };

  return (
    <div className="space-y-4">
      {filteredCampaigns.map((campaign, index) => {
        const StatusIcon = statusIcons[campaign.status];
        
        return (
          <motion.div
            key={campaign.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6 hover:bg-slate-800/70 transition-colors group"
          >
            <div className="flex items-center space-x-6">
              {/* Status and Progress Column */}
              <div className="w-32">
                <div className="flex items-center space-x-2 mb-2">
                  <StatusIcon className={clsx('w-5 h-5', statusColors[campaign.status])} />
                  <span className={clsx('text-sm font-medium capitalize', statusColors[campaign.status])}>
                    {campaign.status}
                  </span>
                </div>
                <Progress.Root 
                  className="h-2 bg-slate-700/50 rounded-full overflow-hidden"
                  value={campaign.progress}
                >
                  <Progress.Indicator
                    className={clsx('h-full transition-all', progressColors[campaign.status])}
                    style={{ width: `${campaign.progress}%` }}
                  />
                </Progress.Root>
                <span className="text-xs text-slate-400 mt-1 block">
                  {campaign.progress}% Complete
                </span>
              </div>

              {/* Campaign Info */}
              <div className="flex-1">
                <h3 className="text-lg font-medium text-white mb-2">{campaign.name}</h3>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    {campaign.platforms.map((platform) => (
                      <span
                        key={platform}
                        className="px-2 py-1 bg-slate-700/50 rounded text-xs text-slate-300"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                  <span className="w-1 h-1 bg-slate-600 rounded-full" />
                  <span className="text-sm text-slate-400">
                    Created {new Date(campaign.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              
              {/* Metrics */}
              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <p className="text-sm text-slate-400">Sent</p>
                  <p className="text-lg font-medium text-white">{campaign.sent}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-slate-400">Responses</p>
                  <p className="text-lg font-medium text-white">{campaign.responses}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-slate-400">Reply Rate</p>
                  <p className="text-lg font-medium text-white">{campaign.replyRate}%</p>
                </div>

                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                      <MoreVertical className="w-5 h-5 text-slate-400" />
                    </button>
                  </DropdownMenu.Trigger>

                  <DropdownMenu.Portal>
                    <DropdownMenu.Content
                      className="w-56 bg-slate-800 rounded-lg shadow-xl border border-slate-700/50 overflow-hidden z-50"
                      sideOffset={5}
                      align="end"
                    >
                      <DropdownMenu.Item
                        onSelect={() => onEdit(campaign.id)}
                        className="flex items-center space-x-2 px-4 py-2.5 hover:bg-slate-700/50 cursor-pointer outline-none text-slate-300 hover:text-white"
                      >
                        <Pencil className="w-4 h-4" />
                        <span>Edit Campaign</span>
                      </DropdownMenu.Item>
                      <DropdownMenu.Item
                        onSelect={() => handleDuplicate(campaign.id)}
                        className="flex items-center space-x-2 px-4 py-2.5 hover:bg-slate-700/50 cursor-pointer outline-none text-slate-300 hover:text-white"
                      >
                        <Copy className="w-4 h-4" />
                        <span>Duplicate</span>
                      </DropdownMenu.Item>
                      <DropdownMenu.Item
                        onSelect={() => handleDownloadAnalytics(campaign.id)}
                        className="flex items-center space-x-2 px-4 py-2.5 hover:bg-slate-700/50 cursor-pointer outline-none text-slate-300 hover:text-white"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download Analytics</span>
                      </DropdownMenu.Item>
                      <DropdownMenu.Item
                        onSelect={() => handleShare(campaign.id)}
                        className="flex items-center space-x-2 px-4 py-2.5 hover:bg-slate-700/50 cursor-pointer outline-none text-slate-300 hover:text-white"
                      >
                        <Share2 className="w-4 h-4" />
                        <span>Share Campaign</span>
                      </DropdownMenu.Item>
                      <DropdownMenu.Separator className="h-px bg-slate-700/50 my-1" />
                      <DropdownMenu.Item
                        onSelect={() => handleDelete(campaign.id)}
                        className="flex items-center space-x-2 px-4 py-2.5 hover:bg-red-500/10 cursor-pointer outline-none text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete Campaign</span>
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}