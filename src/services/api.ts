
import { toast } from "sonner";

// Define API response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface Agent {
  id: string;
  name: string;
  avatar: string;
  role: string;
  status: 'active' | 'processing' | 'idle';
  tasks: number;
  performance: number;
  insights: string[];
}

export interface MarketingInsight {
  id: string;
  title: string;
  description: string;
  category: string;
  impact: 'high' | 'medium' | 'low';
  date: string;
}

export interface MarketingCampaign {
  id: string;
  name: string;
  status: 'draft' | 'active' | 'completed' | 'paused';
  budget: number;
  startDate: string;
  endDate: string;
  performance: number;
  channels: string[];
}

// Mock data for agents
const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'Research Agent',
    avatar: '🔍',
    role: 'Market Analysis',
    status: 'active',
    tasks: 3,
    performance: 92,
    insights: ['Competitor analysis complete', 'Market trends identified', 'Target audience defined']
  },
  {
    id: '2',
    name: 'Strategy Agent',
    avatar: '🧠',
    role: 'Campaign Planning',
    status: 'processing',
    tasks: 2,
    performance: 87,
    insights: ['Content strategy development', 'Channel optimization in progress']
  },
  {
    id: '3',
    name: 'Creative Agent',
    avatar: '🎨',
    role: 'Content Creation',
    status: 'idle',
    tasks: 0,
    performance: 95,
    insights: ['Ad creative templates ready', 'Waiting for strategy completion']
  },
  {
    id: '4',
    name: 'Analytics Agent',
    avatar: '📊',
    role: 'Performance Tracking',
    status: 'active',
    tasks: 1,
    performance: 98,
    insights: ['Real-time dashboard active', 'KPI monitoring enabled']
  },
  {
    id: '5',
    name: 'Distribution Agent',
    avatar: '🚀',
    role: 'Campaign Launch',
    status: 'idle',
    tasks: 0,
    performance: 89,
    insights: ['Channel integrations ready', 'Awaiting campaign approval']
  },
  {
    id: '6',
    name: 'Optimization Agent',
    avatar: '⚙️',
    role: 'Performance Optimization',
    status: 'idle',
    tasks: 0,
    performance: 91,
    insights: ['A/B testing framework ready', 'Automatic optimization rules configured']
  },
  {
    id: '7',
    name: 'Scaling Agent',
    avatar: '📈',
    role: 'Growth Expansion',
    status: 'idle',
    tasks: 0,
    performance: 85,
    insights: ['Growth opportunities identified', 'Ready for campaign scaling']
  }
];

// Mock marketing insights
const mockInsights: MarketingInsight[] = [
  {
    id: '1',
    title: 'Competitor Campaign Analysis',
    description: 'Major competitor launched a new campaign targeting our primary audience segment.',
    category: 'Competition',
    impact: 'high',
    date: '2023-10-15'
  },
  {
    id: '2',
    title: 'Audience Engagement Spike',
    description: 'Significant increase in engagement metrics on video content across platforms.',
    category: 'Audience',
    impact: 'medium',
    date: '2023-10-18'
  },
  {
    id: '3',
    title: 'Channel Performance Shift',
    description: 'Instagram performance increasing while Facebook engagement decreasing.',
    category: 'Channels',
    impact: 'medium',
    date: '2023-10-20'
  }
];

// Mock campaigns
const mockCampaigns: MarketingCampaign[] = [
  {
    id: '1',
    name: 'Q4 Product Launch',
    status: 'active',
    budget: 5000,
    startDate: '2023-10-01',
    endDate: '2023-12-31',
    performance: 78,
    channels: ['Social Media', 'Email', 'Content Marketing']
  },
  {
    id: '2',
    name: 'Holiday Promotion',
    status: 'draft',
    budget: 3500,
    startDate: '2023-11-15',
    endDate: '2023-12-25',
    performance: 0,
    channels: ['Social Media', 'PPC', 'Influencer']
  }
];

// API service with simulated delays for realism
class ApiService {
  // Fetch all agents
  async getAgents(): Promise<ApiResponse<Agent[]>> {
    await this.simulateNetworkDelay();
    return {
      success: true,
      data: mockAgents
    };
  }

  // Get a specific agent by ID
  async getAgentById(id: string): Promise<ApiResponse<Agent | null>> {
    await this.simulateNetworkDelay();
    const agent = mockAgents.find(a => a.id === id);
    
    if (!agent) {
      return {
        success: false,
        data: null,
        message: 'Agent not found'
      };
    }
    
    return {
      success: true,
      data: agent
    };
  }

  // Update agent status
  async updateAgentStatus(id: string, status: 'active' | 'processing' | 'idle'): Promise<ApiResponse<Agent | null>> {
    await this.simulateNetworkDelay();
    const agentIndex = mockAgents.findIndex(a => a.id === id);
    
    if (agentIndex === -1) {
      return {
        success: false,
        data: null,
        message: 'Agent not found'
      };
    }
    
    mockAgents[agentIndex] = {
      ...mockAgents[agentIndex],
      status
    };
    
    toast.success(`Agent ${mockAgents[agentIndex].name} status updated to ${status}`);
    
    return {
      success: true,
      data: mockAgents[agentIndex]
    };
  }

  // Get marketing insights
  async getMarketingInsights(): Promise<ApiResponse<MarketingInsight[]>> {
    await this.simulateNetworkDelay();
    return {
      success: true,
      data: mockInsights
    };
  }

  // Get campaigns
  async getCampaigns(): Promise<ApiResponse<MarketingCampaign[]>> {
    await this.simulateNetworkDelay();
    return {
      success: true,
      data: mockCampaigns
    };
  }

  // Create a new campaign
  async createCampaign(campaign: Omit<MarketingCampaign, 'id'>): Promise<ApiResponse<MarketingCampaign>> {
    await this.simulateNetworkDelay();
    
    const newCampaign: MarketingCampaign = {
      ...campaign,
      id: (mockCampaigns.length + 1).toString()
    };
    
    mockCampaigns.push(newCampaign);
    toast.success('New campaign created successfully!');
    
    return {
      success: true,
      data: newCampaign
    };
  }

  // Simulate network delay for realistic API experience
  private async simulateNetworkDelay(min = 300, max = 800): Promise<void> {
    const delay = Math.floor(Math.random() * (max - min + 1)) + min;
    return new Promise(resolve => setTimeout(resolve, delay));
  }
}

// Create and export a singleton instance
export const apiService = new ApiService();
