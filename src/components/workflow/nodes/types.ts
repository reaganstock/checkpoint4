export type NodeType = 
  | 'trigger'
  | 'send-dm'
  | 'wait-time'
  | 'if-then'
  | 'end-campaign';

export type TriggerType =
  | 'message_received'
  | 'profile_viewed'
  | 'post_liked'
  | 'post_commented'
  | 'followed'
  | 'unfollowed';

export type PlatformType = 
  | 'instagram'
  | 'facebook'
  | 'linkedin'
  | 'twitter'
  | 'whatsapp'
  | 'telegram'
  | 'discord'
  | 'reddit'
  | 'pinterest'
  | 'nextdoor'
  | 'skool'
  | 'slack'
  | 'tiktok';

export interface NodeData {
  type: NodeType;
  label: string;
  platform?: PlatformType;
  content?: string;
  delay?: number;
  trigger?: {
    type: TriggerType;
    platform: PlatformType;
  };
  variants?: Array<{
    id: string;
    content: string;
    weight: number;
  }>;
  condition?: {
    type: 'message_sent' | 'message_read' | 'message_replied';
    value: boolean;
  };
}

export interface WorkflowData {
  type: 'inbound' | 'outbound';
  nodes: Node<NodeData>[];
  edges: Edge[];
}