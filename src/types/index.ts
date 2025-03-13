
export interface CampaignFormData {
  name: string;
  budget: number;
  status: 'draft' | 'active' | 'completed' | 'paused';
  startDate: Date;
  endDate: Date;
  channels: string[];
  performance?: number;
}

export type AgentStatus = 'active' | 'processing' | 'idle';
