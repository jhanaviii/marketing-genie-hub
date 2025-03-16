
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { X, Zap } from 'lucide-react';
import { toast } from "sonner";
import { Agent } from '@/services/api';
import { useMarketing } from '@/context/MarketingContext';

interface MarketingAgentsProps {
  agents: Agent[];
  loading: boolean;
  containerVariants: any;
  itemVariants: any;
}

export const MarketingAgents: React.FC<MarketingAgentsProps> = ({ 
  agents, 
  loading,
  containerVariants,
  itemVariants
}) => {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const { updateAgentStatus } = useMarketing();
  
  // Find the currently selected agent
  const currentAgent = agents.find(agent => agent.id === selectedAgent);

  // Handle agent status change
  const handleAgentStatusChange = async (id: string, newStatus: 'active' | 'processing' | 'idle') => {
    await updateAgentStatus(id, newStatus);
    toast.success(`Agent status updated to ${newStatus}`);
  };

  // Handle triggering an agent
  const handleTriggerAgent = (agentName: string) => {
    toast.success(`Agent ${agentName} triggered manually`);
    setSelectedAgent(null);
  };

  return (
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

      {/* Agent Details Dialog - Fixed to have only one close button */}
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
                  onClick={() => setSelectedAgent(null)}
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
                  onClick={() => setSelectedAgent(null)}
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
    </section>
  );
};
