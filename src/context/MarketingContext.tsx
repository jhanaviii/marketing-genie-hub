
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Agent, MarketingInsight, MarketingCampaign, apiService } from '@/services/api';
import { toast } from 'sonner';

interface MarketingContextType {
  agents: Agent[];
  insights: MarketingInsight[];
  campaigns: MarketingCampaign[];
  loading: boolean;
  error: string | null;
  updateAgentStatus: (id: string, status: 'active' | 'processing' | 'idle') => Promise<void>;
  createCampaign: (campaign: Omit<MarketingCampaign, 'id'>) => Promise<void>;
  refreshData: () => Promise<void>;
  triggerAgent: (agentId: string) => Promise<void>;
  updateCampaignStatus: (id: string, status: 'draft' | 'active' | 'completed' | 'paused') => Promise<void>;
}

const MarketingContext = createContext<MarketingContextType | undefined>(undefined);

export function MarketingProvider({ children }: { children: ReactNode }) {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [insights, setInsights] = useState<MarketingInsight[]>([]);
  const [campaigns, setCampaigns] = useState<MarketingCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial data
  useEffect(() => {
    fetchData();
    
    // Set up a refresh interval for real-time updates
    const intervalId = setInterval(() => {
      fetchData(false); // silent refresh
    }, 30000);
    
    return () => clearInterval(intervalId);
  }, []);

  // Fetch all data from API
  const fetchData = async (showLoading = true) => {
    if (showLoading) {
      setLoading(true);
    }
    setError(null);
    
    try {
      const [agentsRes, insightsRes, campaignsRes] = await Promise.all([
        apiService.getAgents(),
        apiService.getMarketingInsights(),
        apiService.getCampaigns()
      ]);
      
      if (agentsRes.success) {
        setAgents(agentsRes.data);
      }
      
      if (insightsRes.success) {
        setInsights(insightsRes.data);
      }
      
      if (campaignsRes.success) {
        setCampaigns(campaignsRes.data);
      }
      
      if (showLoading) {
        toast.success("Dashboard data refreshed successfully");
      }
    } catch (err) {
      setError('Failed to load data. Please try again.');
      if (showLoading) {
        toast.error('Failed to load data. Please try again.');
      }
      console.error('Error fetching data:', err);
    } finally {
      if (showLoading) {
        setLoading(false);
      }
    }
  };

  // Update agent status
  const updateAgentStatus = async (id: string, status: 'active' | 'processing' | 'idle') => {
    try {
      const response = await apiService.updateAgentStatus(id, status);
      
      if (response.success && response.data) {
        setAgents(prev => 
          prev.map(agent => agent.id === id ? response.data! : agent)
        );
        
        // Add a new insight if agent is activated
        if (status === 'active') {
          const agent = agents.find(a => a.id === id);
          if (agent) {
            const newInsight: MarketingInsight = {
              id: (insights.length + 1).toString(),
              title: `${agent.name} Activated`,
              description: `${agent.name} has been activated and is now processing marketing tasks.`,
              category: 'Agent Activity',
              impact: 'medium',
              date: new Date().toISOString()
            };
            
            setInsights(prev => [newInsight, ...prev]);
          }
        }
      } else {
        toast.error(response.message || 'Failed to update agent status');
      }
    } catch (err) {
      toast.error('An error occurred while updating agent status');
      console.error('Error updating agent status:', err);
    }
  };

  // Trigger an agent
  const triggerAgent = async (agentId: string) => {
    try {
      const agent = agents.find(a => a.id === agentId);
      if (!agent) {
        toast.error('Agent not found');
        return;
      }
      
      // Update agent status to processing
      await updateAgentStatus(agentId, 'processing');
      
      toast.success(`Agent ${agent.name} has been triggered`);
      
      // Simulate agent completing a task after a delay
      setTimeout(async () => {
        await updateAgentStatus(agentId, 'active');
        
        // Create a new insight from this agent
        const newInsight: MarketingInsight = {
          id: (insights.length + 1).toString(),
          title: `New Insight from ${agent.name}`,
          description: `${agent.role} analysis complete. New optimization opportunities identified.`,
          category: agent.role,
          impact: 'high',
          date: new Date().toISOString()
        };
        
        setInsights(prev => [newInsight, ...prev]);
        toast.success(`${agent.name} has completed its task and generated a new insight`);
      }, 3000);
    } catch (err) {
      toast.error('An error occurred while triggering the agent');
      console.error('Error triggering agent:', err);
    }
  };

  // Update campaign status
  const updateCampaignStatus = async (id: string, status: 'draft' | 'active' | 'completed' | 'paused') => {
    try {
      // In a real application, this would call an API
      setCampaigns(prev => 
        prev.map(campaign => 
          campaign.id === id ? { ...campaign, status } : campaign
        )
      );
      
      toast.success(`Campaign status updated to ${status}`);
      
      // If a campaign is activated, trigger relevant agents
      if (status === 'active') {
        const campaign = campaigns.find(c => c.id === id);
        if (campaign) {
          // Find relevant agents to notify about the campaign
          const relevantAgents = agents.filter(agent => 
            agent.role.toLowerCase().includes('campaign') || 
            agent.role.toLowerCase().includes('analytics')
          );
          
          // Update relevant agents to processing state
          for (const agent of relevantAgents) {
            await updateAgentStatus(agent.id, 'processing');
          }
          
          // Add a new insight about campaign activation
          const newInsight: MarketingInsight = {
            id: (insights.length + 1).toString(),
            title: `Campaign ${campaign.name} Activated`,
            description: `Campaign has been activated across ${campaign.channels.join(', ')} channels.`,
            category: 'Campaign',
            impact: 'high',
            date: new Date().toISOString()
          };
          
          setInsights(prev => [newInsight, ...prev]);
        }
      }
    } catch (err) {
      toast.error('An error occurred while updating campaign status');
      console.error('Error updating campaign status:', err);
    }
  };

  // Create new campaign
  const createCampaign = async (campaign: Omit<MarketingCampaign, 'id'>) => {
    try {
      const response = await apiService.createCampaign(campaign);
      
      if (response.success) {
        setCampaigns(prev => [...prev, response.data]);
        
        // Create insight about new campaign
        const newInsight: MarketingInsight = {
          id: (insights.length + 1).toString(),
          title: `New Campaign Created: ${campaign.name}`,
          description: `A new marketing campaign has been created with a budget of $${campaign.budget.toLocaleString()}.`,
          category: 'Campaign',
          impact: 'high',
          date: new Date().toISOString()
        };
        
        setInsights(prev => [newInsight, ...prev]);
        
        // Update relevant agents to processing state
        const relevantAgents = agents.filter(agent => 
          agent.role.toLowerCase().includes('campaign') || 
          agent.role.toLowerCase().includes('strategy')
        );
        
        for (const agent of relevantAgents) {
          await updateAgentStatus(agent.id, 'processing');
        }
        
        toast.success('New campaign created successfully!');
      } else {
        toast.error(response.message || 'Failed to create campaign');
      }
    } catch (err) {
      toast.error('An error occurred while creating the campaign');
      console.error('Error creating campaign:', err);
    }
  };

  return (
    <MarketingContext.Provider
      value={{
        agents,
        insights,
        campaigns,
        loading,
        error,
        updateAgentStatus,
        createCampaign,
        refreshData: () => fetchData(true),
        triggerAgent,
        updateCampaignStatus
      }}
    >
      {children}
    </MarketingContext.Provider>
  );
}

export const useMarketing = () => {
  const context = useContext(MarketingContext);
  
  if (context === undefined) {
    throw new Error('useMarketing must be used within a MarketingProvider');
  }
  
  return context;
};
