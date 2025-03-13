
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
  }, []);

  // Fetch all data from API
  const fetchData = async () => {
    setLoading(true);
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
    } catch (err) {
      setError('Failed to load data. Please try again.');
      toast.error('Failed to load data. Please try again.');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
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
      } else {
        toast.error(response.message || 'Failed to update agent status');
      }
    } catch (err) {
      toast.error('An error occurred while updating agent status');
      console.error('Error updating agent status:', err);
    }
  };

  // Create new campaign
  const createCampaign = async (campaign: Omit<MarketingCampaign, 'id'>) => {
    try {
      const response = await apiService.createCampaign(campaign);
      
      if (response.success) {
        setCampaigns(prev => [...prev, response.data]);
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
        refreshData: fetchData
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
