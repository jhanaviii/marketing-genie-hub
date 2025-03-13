
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useMarketing } from '@/context/MarketingContext';
import { motion } from "framer-motion";
import { RefreshCw, PlusCircle, AlertTriangle, X, Play, Pause } from 'lucide-react';
import { toast } from "sonner";
import { CreateCampaignForm } from "@/components/CreateCampaignForm";

export const Dashboard: React.FC = () => {
  const { agents, insights, campaigns, loading, error, refreshData, updateAgentStatus, createCampaign } = useMarketing();
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [showCampaignDialog, setShowCampaignDialog] = useState(false);
  
  // Find the currently selected agent
  const currentAgent = agents.find(agent => agent.id === selectedAgent);

  // Animation variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  // Handle agent status change
  const handleAgentStatusChange = async (id: string, newStatus: 'active' | 'processing' | 'idle') => {
    await updateAgentStatus(id, newStatus);
    toast.success(`Agent status updated to ${newStatus}`);
  };

  // Handle campaign creation
  const handleCreateCampaign = async (campaignData: any) => {
    await createCampaign(campaignData);
    setShowCampaignDialog(false);
    toast.success('Campaign created successfully!');
  };

  if (error) {
    return (
      <div className="container py-10">
        <Card className="p-6 text-center">
          <div className="flex flex-col items-center justify-center gap-4">
            <AlertTriangle className="h-12 w-12 text-red-500" />
            <h3 className="text-xl font-semibold">Something went wrong</h3>
            <p className="text-muted-foreground">{error}</p>
            <Button onClick={() => refreshData()}>Try Again</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Marketing AI Command Center</h1>
          <p className="text-muted-foreground">Your AI-powered marketing ecosystem</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => refreshData()} disabled={loading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={() => setShowCampaignDialog(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Campaign
          </Button>
        </div>
      </div>

      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">AI Agents</h2>
          <Badge variant="outline" className="text-xs">{agents.length} Total Agents</Badge>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {loading ? (
            Array(4).fill(0).map((_, i) => (
              <motion.div 
                key={i}
                className="agent-card h-48"
                variants={itemVariants}
              >
                <div className="animate-pulse space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="h-10 w-10 rounded-full bg-muted/50"></div>
                    <div className="h-6 w-20 rounded-full bg-muted/50"></div>
                  </div>
                  <div className="h-5 w-3/4 bg-muted/50 rounded"></div>
                  <div className="h-4 w-1/2 bg-muted/50 rounded"></div>
                  <div className="h-4 w-full bg-muted/50 rounded"></div>
                  <div className="h-4 w-3/4 bg-muted/50 rounded"></div>
                </div>
              </motion.div>
            ))
          ) : (
            agents.map((agent) => (
              <motion.div 
                key={agent.id}
                className="agent-card group hover:border-neon-blue/30 cursor-pointer"
                variants={itemVariants}
                onClick={() => setSelectedAgent(agent.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="agent-avatar h-12 w-12 rounded-full bg-muted/50 text-xl flex items-center justify-center">
                    <div className={`agent-avatar-ring border-2 ${
                      agent.status === 'active' ? 'border-neon-green animate-pulse-glow-active' :
                      agent.status === 'processing' ? 'border-neon-blue animate-pulse-glow-processing' :
                      'border-neon-yellow animate-pulse-glow-idle'
                    }`}></div>
                    <span>{agent.avatar}</span>
                  </div>
                  
                  <Badge variant="outline" className={`capitalize ${
                    agent.status === 'active' ? 'border-neon-green text-neon-green' :
                    agent.status === 'processing' ? 'border-neon-blue text-neon-blue' :
                    'border-neon-yellow text-neon-yellow'
                  }`}>
                    {agent.status}
                  </Badge>
                </div>
                
                <h3 className="text-lg font-medium mt-2">{agent.name}</h3>
                <p className="text-xs text-muted-foreground">{agent.role}</p>
                
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Performance</span>
                    <span>{agent.performance}%</span>
                  </div>
                  <Progress value={agent.performance} className="h-1" />
                </div>
                
                <div className="mt-3 text-xs text-muted-foreground">
                  {agent.insights.length > 0 ? (
                    <div>{agent.insights[0]}</div>
                  ) : (
                    <div>No insights available</div>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold">Active Campaigns</h2>
          <Card>
            <CardContent className="p-6 space-y-6">
              {loading ? (
                <div className="space-y-4">
                  {Array(2).fill(0).map((_, i) => (
                    <div key={i} className="animate-pulse space-y-2 border-b border-border pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between">
                        <div className="h-5 w-1/3 bg-muted/50 rounded"></div>
                        <div className="h-5 w-20 bg-muted/50 rounded"></div>
                      </div>
                      <div className="h-4 w-1/4 bg-muted/50 rounded"></div>
                      <div className="h-3 w-full bg-muted/50 rounded mt-3"></div>
                    </div>
                  ))}
                </div>
              ) : campaigns.length > 0 ? (
                <div className="space-y-6">
                  {campaigns.map((campaign) => (
                    <div key={campaign.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{campaign.name}</h3>
                          <p className="text-sm text-muted-foreground">Budget: ${campaign.budget}</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant={
                            campaign.status === 'active' ? 'default' :
                            campaign.status === 'draft' ? 'outline' :
                            campaign.status === 'completed' ? 'secondary' :
                            'destructive'
                          }>
                            {campaign.status}
                          </Badge>
                          {campaign.status === 'active' ? (
                            <Button size="icon" variant="outline" className="h-6 w-6" onClick={() => toast.info(`Campaign ${campaign.name} paused`)}>
                              <Pause className="h-3 w-3" />
                            </Button>
                          ) : campaign.status === 'paused' || campaign.status === 'draft' ? (
                            <Button size="icon" variant="outline" className="h-6 w-6" onClick={() => toast.success(`Campaign ${campaign.name} activated`)}>
                              <Play className="h-3 w-3" />
                            </Button>
                          ) : null}
                        </div>
                      </div>
                      
                      {campaign.status !== 'draft' && (
                        <div className="mt-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Performance</span>
                            <span>{campaign.performance}%</span>
                          </div>
                          <Progress value={campaign.performance} className="h-1" />
                        </div>
                      )}
                      
                      <div className="mt-3 flex flex-wrap gap-1">
                        {campaign.channels.map((channel, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {channel}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No active campaigns</p>
                  <Button variant="outline" className="mt-4" onClick={() => setShowCampaignDialog(true)}>Create Campaign</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Latest Insights</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              {loading ? (
                <div className="space-y-4">
                  {Array(3).fill(0).map((_, i) => (
                    <div key={i} className="animate-pulse space-y-2">
                      <div className="h-5 w-3/4 bg-muted/50 rounded"></div>
                      <div className="h-4 w-1/2 bg-muted/50 rounded"></div>
                      <div className="h-3 w-full bg-muted/50 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : insights.length > 0 ? (
                <div className="space-y-4">
                  {insights.map((insight) => (
                    <div key={insight.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-medium">{insight.title}</h3>
                        <Badge variant={
                          insight.impact === 'high' ? 'destructive' :
                          insight.impact === 'medium' ? 'default' :
                          'outline'
                        } className="text-xs whitespace-nowrap">
                          {insight.impact} impact
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
                      <div className="flex justify-between items-center mt-2">
                        <Badge variant="secondary" className="text-xs">
                          {insight.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(insight.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No insights available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Agent Details Dialog */}
      <Dialog open={!!selectedAgent} onOpenChange={(open) => !open && setSelectedAgent(null)}>
        <DialogContent className="sm:max-w-[500px]">
          {currentAgent && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className="agent-avatar h-12 w-12 rounded-full bg-muted/50 text-xl flex items-center justify-center">
                    <span>{currentAgent.avatar}</span>
                  </div>
                  <div>
                    <DialogTitle className="text-xl">{currentAgent.name}</DialogTitle>
                    <DialogDescription>{currentAgent.role}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Status</h4>
                  <div className="flex gap-2">
                    <Button
                      variant={currentAgent.status === 'active' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleAgentStatusChange(currentAgent.id, 'active')}
                    >
                      Active
                    </Button>
                    <Button
                      variant={currentAgent.status === 'processing' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleAgentStatusChange(currentAgent.id, 'processing')}
                    >
                      Processing
                    </Button>
                    <Button
                      variant={currentAgent.status === 'idle' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleAgentStatusChange(currentAgent.id, 'idle')}
                    >
                      Idle
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Performance</h4>
                  <Progress value={currentAgent.performance} className="h-2" />
                  <p className="text-sm text-muted-foreground mt-1">
                    {currentAgent.performance < 50 ? 'Below target performance. Needs optimization.' :
                     currentAgent.performance < 80 ? 'Average performance. Could be improved.' :
                     'Excellent performance. Keep up the good work!'}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Recent Insights</h4>
                  <ul className="space-y-2">
                    {currentAgent.insights.map((insight, index) => (
                      <li key={index} className="text-sm">
                        • {insight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedAgent(null)}>Close</Button>
                <Button onClick={() => {
                  toast.success(`Agent ${currentAgent.name} triggered manually`);
                  setSelectedAgent(null);
                }}>
                  Trigger Agent
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Campaign Dialog */}
      <Dialog open={showCampaignDialog} onOpenChange={setShowCampaignDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Campaign</DialogTitle>
            <DialogDescription>Fill out the details to create a new marketing campaign.</DialogDescription>
          </DialogHeader>
          <CreateCampaignForm onSubmit={handleCreateCampaign} onCancel={() => setShowCampaignDialog(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
