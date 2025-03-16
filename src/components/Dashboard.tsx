import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useMarketing } from '@/context/MarketingContext';
import { motion } from "framer-motion";
import { RefreshCw, PlusCircle, AlertTriangle, X, Play, Pause, Zap, TrendingUp, Activity, BarChart3 } from 'lucide-react';
import { toast } from "sonner";
import { CreateCampaignForm } from "@/components/CreateCampaignForm";
import { WorkflowDisplay } from "@/components/WorkflowDisplay";

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
  
  const cardHoverVariants = {
    hover: { 
      y: -8, 
      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  // Handle agent status change
  const handleAgentStatusChange = async (id: string, newStatus: 'active' | 'processing' | 'idle') => {
    await updateAgentStatus(id, newStatus);
    toast.success(`Agent status updated to ${newStatus}`);
  };

  // Handle campaign status change
  const handleCampaignStatusChange = (campaignId: string, newStatus: 'active' | 'paused') => {
    // This would normally call an API to update the campaign status
    // For now we'll just show a toast notification
    if (newStatus === 'active') {
      toast.success(`Campaign activated successfully!`);
    } else {
      toast.info(`Campaign paused successfully!`);
    }
  };

  // Handle campaign creation
  const handleCreateCampaign = async (campaignData: any) => {
    await createCampaign(campaignData);
    setShowCampaignDialog(false);
    toast.success("Campaign created successfully!");
  };

  // Handle triggering an agent
  const handleTriggerAgent = (agentName: string) => {
    toast.success(`Agent ${agentName} triggered manually`);
    setSelectedAgent(null);
  };

  // Close agent dialog
  const handleCloseAgentDialog = () => {
    setSelectedAgent(null);
  };

  if (error) {
    return (
      <div className="container py-10">
        <Card className="p-6 text-center premium-card">
          <div className="flex flex-col items-center justify-center gap-4">
            <AlertTriangle className="h-12 w-12 text-premium-orange" />
            <h3 className="text-xl font-semibold">Something went wrong</h3>
            <p className="text-muted-foreground">{error}</p>
            <Button onClick={refreshData}>Try Again</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <motion.h1 
            className="text-2xl font-bold bg-gradient-to-r from-premium-blue via-premium-purple to-premium-pink bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Marketing AI Command Center
          </motion.h1>
          <motion.p 
            className="text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Your AI-powered marketing ecosystem
          </motion.p>
        </div>

        <div className="flex items-center gap-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              variant="outline" 
              onClick={refreshData} 
              disabled={loading}
              className="border-border/30 bg-white/80 hover:bg-primary/5 transition-all duration-300"
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              onClick={() => setShowCampaignDialog(true)}
              className="bg-gradient-to-r from-premium-blue to-premium-purple hover:opacity-90 transition-opacity"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              New Campaign
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Workflow Display Section */}
      <WorkflowDisplay />

      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">AI Agents</h2>
            <motion.span 
              className="flex h-2 w-2 relative"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-premium-blue opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-premium-blue"></span>
            </motion.span>
          </div>
          <Badge variant="outline" className="text-xs border-border/30 bg-white/80">{agents.length} Total Agents</Badge>
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
                className="premium-card h-48"
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
                className="agent-card group hover:border-primary/30 cursor-pointer"
                variants={itemVariants}
                whileHover="hover"
                animate="show"
                onClick={() => setSelectedAgent(agent.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="agent-avatar h-12 w-12 rounded-full bg-white text-xl flex items-center justify-center shadow-sm">
                    <div className={`agent-avatar-ring border-2 ${
                      agent.status === 'active' ? 'border-premium-teal animate-pulse-glow-active' :
                      agent.status === 'processing' ? 'border-premium-blue animate-pulse-glow-processing' :
                      'border-premium-orange animate-pulse-glow-idle'
                    }`}></div>
                    <span>{agent.avatar}</span>
                  </div>
                  
                  <Badge variant="outline" className={`capitalize ${
                    agent.status === 'active' ? 'border-premium-teal/30 text-premium-teal bg-premium-teal/5' :
                    agent.status === 'processing' ? 'border-premium-blue/30 text-premium-blue bg-premium-blue/5' :
                    'border-premium-orange/30 text-premium-orange bg-premium-orange/5'
                  }`}>
                    {agent.status}
                  </Badge>
                </div>
                
                <h3 className="text-lg font-medium mt-2">{agent.name}</h3>
                <p className="text-xs text-muted-foreground">{agent.role}</p>
                
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Performance</span>
                    <span className="font-medium">{agent.performance}%</span>
                  </div>
                  <Progress 
                    value={agent.performance} 
                    className="h-1.5 rounded-full overflow-hidden bg-muted/30" 
                    indicatorClassName={
                      agent.performance > 75 ? "bg-gradient-to-r from-premium-blue to-premium-teal" :
                      agent.performance > 50 ? "bg-gradient-to-r from-premium-indigo to-premium-blue" :
                      "bg-gradient-to-r from-premium-orange to-premium-pink"
                    }
                  />
                </div>
                
                <div className="mt-3 text-xs text-muted-foreground">
                  {agent.insights.length > 0 ? (
                    <div className="flex items-start gap-1">
                      <span className="text-primary mt-0.5">
                        <Zap className="h-3 w-3" />
                      </span>
                      <span>{agent.insights[0]}</span>
                    </div>
                  ) : (
                    <div>No insights available</div>
                  )}
                </div>
                
                <motion.div 
                  className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1 }}
                >
                  <Badge variant="outline" className="bg-white shadow-sm">
                    View Details
                  </Badge>
                </motion.div>
              </motion.div>
            ))
          )}
        </motion.div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">Active Campaigns</h2>
            <TrendingUp className="h-4 w-4 text-premium-teal" />
          </div>
          <Card className="premium-card overflow-visible">
            <CardContent className="p-6 space-y-6">
              {loading ? (
                <div className="space-y-4">
                  {Array(2).fill(0).map((_, i) => (
                    <div key={i} className="animate-pulse space-y-2 border-b border-border/10 pb-4 last:border-0 last:pb-0">
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
                    <motion.div 
                      key={campaign.id} 
                      className="border-b border-border/10 pb-4 last:border-0 last:pb-0"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ 
                        backgroundColor: "rgba(255, 255, 255, 0.5)", 
                        borderRadius: "0.5rem",
                        transition: { duration: 0.2 }
                      }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{campaign.name}</h3>
                          <p className="text-sm text-muted-foreground">Budget: ${campaign.budget.toLocaleString()}</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant={
                            campaign.status === 'active' ? 'default' :
                            campaign.status === 'draft' ? 'outline' :
                            campaign.status === 'completed' ? 'secondary' :
                            'destructive'
                          } className={
                            campaign.status === 'active' ? 'bg-premium-teal border-0' :
                            campaign.status === 'draft' ? 'border-border/30 bg-white/80' :
                            campaign.status === 'completed' ? 'bg-premium-blue border-0' :
                            'bg-premium-orange border-0'
                          }>
                            {campaign.status}
                          </Badge>
                          {campaign.status === 'active' ? (
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              <Button 
                                size="icon" 
                                variant="outline" 
                                className="h-6 w-6 border-border/30 bg-white hover:bg-premium-orange/5" 
                                onClick={() => handleCampaignStatusChange(campaign.id, 'paused')}
                              >
                                <Pause className="h-3 w-3" />
                              </Button>
                            </motion.div>
                          ) : campaign.status === 'paused' || campaign.status === 'draft' ? (
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              <Button 
                                size="icon" 
                                variant="outline" 
                                className="h-6 w-6 border-border/30 bg-white hover:bg-premium-teal/5" 
                                onClick={() => handleCampaignStatusChange(campaign.id, 'active')}
                              >
                                <Play className="h-3 w-3" />
                              </Button>
                            </motion.div>
                          ) : null}
                        </div>
                      </div>
                      
                      {campaign.status !== 'draft' && (
                        <div className="mt-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Performance</span>
                            <span className="font-medium">{campaign.performance}%</span>
                          </div>
                          <Progress 
                            value={campaign.performance} 
                            className="h-1.5 rounded-full overflow-hidden bg-muted/30"
                            indicatorClassName={
                              campaign.performance > 75 ? "bg-gradient-to-r from-premium-blue to-premium-teal" :
                              campaign.performance > 50 ? "bg-gradient-to-r from-premium-indigo to-premium-blue" :
                              "bg-gradient-to-r from-premium-orange to-premium-pink"
                            }
                          />
                        </div>
                      )}
                      
                      <div className="mt-3 flex flex-wrap gap-1">
                        {campaign.channels.map((channel, i) => (
                          <Badge key={i} variant="secondary" className="text-xs bg-white/90 text-foreground border border-border/20">
                            {channel}
                          </Badge>
                        ))}
                      </div>
                      
                      <motion.div 
                        className="mt-3 text-xs text-primary flex items-center gap-1 cursor-pointer w-fit"
                        whileHover={{ x: 3 }}
                        onClick={() => toast.info(`Viewing details for campaign: ${campaign.name}`)}
                      >
                        <span>View campaign details</span>
                        <Activity className="h-3 w-3" />
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <div className="bg-muted/10 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-3">
                    <BarChart3 className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">No active campaigns</p>
                  <Button 
                    variant="outline" 
                    className="mt-4 border-border/30 bg-white hover:bg-primary/5"
                    onClick={() => setShowCampaignDialog(true)}
                  >
                    Create Campaign
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">Latest Insights</h2>
            <span className="text-xs bg-premium-pink/10 text-premium-pink px-2 py-0.5 rounded-full">New</span>
          </div>
          <Card className="premium-card">
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
                  {insights.map((insight, index) => (
                    <motion.div 
                      key={insight.id} 
                      className="border-b border-border/10 pb-4 last:border-0 last:pb-0"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-medium">{insight.title}</h3>
                        <Badge variant={
                          insight.impact === 'high' ? 'default' :
                          insight.impact === 'medium' ? 'default' :
                          'outline'
                        } className={`text-xs whitespace-nowrap ${
                          insight.impact === 'high' ? 'bg-premium-pink border-0' :
                          insight.impact === 'medium' ? 'bg-premium-blue border-0' :
                          'border-border/30 bg-white/80'
                        }`}>
                          {insight.impact} impact
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
                      <div className="flex justify-between items-center mt-2">
                        <Badge variant="secondary" className="text-xs bg-white/90 text-foreground border border-border/20">
                          {insight.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(insight.date).toLocaleDateString()}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <div className="bg-muted/10 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-3">
                    <Activity className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">No insights available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Agent Details Dialog */}
      <Dialog open={!!selectedAgent} onOpenChange={(open) => !open && setSelectedAgent(null)}>
        <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden premium-card">
          {currentAgent && (
            <>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-premium-blue to-premium-purple">
                <div className="flex items-center gap-3">
                  <div className="agent-avatar h-14 w-14 rounded-full bg-white text-2xl flex items-center justify-center">
                    <span>{currentAgent.avatar}</span>
                  </div>
                  <div>
                    <DialogTitle className="text-xl text-white">{currentAgent.name}</DialogTitle>
                    <DialogDescription className="text-white/70">{currentAgent.role}</DialogDescription>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white hover:bg-white/10" 
                  onClick={handleCloseAgentDialog}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-6 p-6">
                <div>
                  <h4 className="text-sm font-medium mb-3">Status</h4>
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      variant={currentAgent.status === 'active' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleAgentStatusChange(currentAgent.id, 'active')}
                      className={currentAgent.status === 'active' ? 'bg-premium-teal' : 'border-border/30 bg-white'}
                    >
                      Active
                    </Button>
                    <Button
                      variant={currentAgent.status === 'processing' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleAgentStatusChange(currentAgent.id, 'processing')}
                      className={currentAgent.status === 'processing' ? 'bg-premium-blue' : 'border-border/30 bg-white'}
                    >
                      Processing
                    </Button>
                    <Button
                      variant={currentAgent.status === 'idle' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleAgentStatusChange(currentAgent.id, 'idle')}
                      className={currentAgent.status === 'idle' ? 'bg-premium-orange' : 'border-border/30 bg-white'}
                    >
                      Idle
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Performance</h4>
                  <Progress 
                    value={currentAgent.performance} 
                    className="h-2 rounded-full overflow-hidden bg-muted/30"
                    indicatorClassName={
                      currentAgent.performance > 75 ? "bg-gradient-to-r from-premium-blue to-premium-teal" :
                      currentAgent.performance > 50 ? "bg-gradient-to-r from-premium-indigo to-premium-blue" :
                      "bg-gradient-to-r from-premium-orange to-premium-pink"
                    }
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    {currentAgent.performance < 50 ? 'Below target performance. Needs optimization.' :
                     currentAgent.performance < 80 ? 'Average performance. Could be improved.' :
                     'Excellent performance. Keep up the good work!'}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Recent Insights</h4>
                  <motion.ul className="space-y-2">
                    {currentAgent.insights.map((insight, index) => (
                      <motion.li 
                        key={index} 
                        className="text-sm bg-muted/20 p-2 rounded-md"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex gap-2">
                          <span className="text-premium-blue mt-0.5">
                            <Zap className="h-4 w-4" />
                          </span>
                          <span>{insight}</span>
                        </div>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </div>
              
              <DialogFooter className="p-4 border-t border-border/10 bg-muted/10">
                <Button 
                  variant="outline" 
                  onClick={handleCloseAgentDialog}
                  className="border-border/30 bg-white"
                >
                  Close
                </Button>
                <Button 
                  onClick={() => handleTriggerAgent(currentAgent.name)}
                  className="bg-gradient-to-r from-premium-blue to-premium-purple"
                >
                  <Zap className="mr-2 h-4 w-4" />
                  Trigger Agent
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Campaign Dialog */}
      <Dialog open={showCampaignDialog} onOpenChange={setShowCampaignDialog}>
        <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden premium-card">
          <div className="p-4 bg-gradient-to-r from-premium-blue to-premium-purple">
            <DialogTitle className="text-xl text-white">Create New Campaign</DialogTitle>
            <DialogDescription className="text-white/70">Fill out the details to create a new marketing campaign.</DialogDescription>
          </div>
          <div className="p-6">
            <CreateCampaignForm onSubmit={handleCreateCampaign} onCancel={() => setShowCampaignDialog(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
