
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sparkles, TrendingUp, BrainCircuit, Zap, Bot, Search, PieChart, Users, Rocket, Activity, LineChart } from "lucide-react";

interface AgentCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'active' | 'idle' | 'processing';
  progressPercent?: number;
  index: number;
}

export const AgentCard: React.FC<AgentCardProps> = ({ 
  title, description, icon, status, progressPercent = 0, index 
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'active': return 'bg-neon-green';
      case 'processing': return 'bg-neon-blue';
      case 'idle': return 'bg-neon-yellow';
      default: return 'bg-muted';
    }
  };

  const getStatusAnimation = () => {
    switch (status) {
      case 'active': return 'animate-pulse-glow-active';
      case 'processing': return 'animate-pulse-glow-processing';
      case 'idle': return 'animate-pulse-glow-idle';
      default: return '';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'active': return 'Online';
      case 'processing': return 'Processing';
      case 'idle': return 'Idle';
      default: return 'Offline';
    }
  };
  
  const getAgentAvatar = () => {
    switch (title) {
      case 'Research Agent': return <Search className="h-6 w-6" />;
      case 'Planning Agent': return <PieChart className="h-6 w-6" />;
      case 'Strategy Agent': return <BrainCircuit className="h-6 w-6" />;
      case 'Setup Agent': return <Users className="h-6 w-6" />;
      case 'Execution Agent': return <Rocket className="h-6 w-6" />;
      case 'Monitoring Agent': return <Activity className="h-6 w-6" />;
      case 'Optimization Agent': return <LineChart className="h-6 w-6" />;
      default: return <Bot className="h-6 w-6" />;
    }
  };
  
  const getRingColor = () => {
    switch (status) {
      case 'active': return 'from-neon-green/30 to-neon-green/10';
      case 'processing': return 'from-neon-blue/30 to-neon-blue/10';
      case 'idle': return 'from-neon-yellow/30 to-neon-yellow/10';
      default: return 'from-muted/30 to-muted/10';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="h-full"
    >
      <Card className="agent-card overflow-hidden h-full flex flex-col hover-3d">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-muted/50 to-transparent"></div>
        </div>
        
        <div className="relative z-10 flex justify-between items-start mb-6">
          <div className="agent-avatar">
            <div className={`relative h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center ${getStatusAnimation()}`}>
              <div className={`agent-avatar-ring bg-gradient-radial ${getRingColor()}`}></div>
              {getAgentAvatar()}
            </div>
          </div>
          <div className="flex items-center gap-2 bg-muted/20 px-2 py-1 rounded-full">
            <motion.span 
              className={`h-2 w-2 rounded-full ${getStatusColor()}`}
              animate={{ scale: status === 'processing' ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            ></motion.span>
            <span className="text-xs text-muted-foreground">{getStatusText()}</span>
          </div>
        </div>
        
        <div className="flex-1 relative z-10">
          <motion.h3 
            className="text-lg font-semibold mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
          >
            {title}
          </motion.h3>
          <motion.p 
            className="text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            {description}
          </motion.p>
        </div>
        
        {progressPercent > 0 && (
          <motion.div 
            className="mt-4 relative z-10"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.7, delay: index * 0.25 }}
          >
            <div className="w-full bg-muted h-1 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-neon-blue to-neon-purple"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 1, delay: index * 0.3 }}
              ></motion.div>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-muted-foreground">Progress</span>
              <motion.span 
                className="text-xs font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.35 }}
              >
                {progressPercent}%
              </motion.span>
            </div>
          </motion.div>
        )}
        
        <div className="flex gap-2 mt-4 relative z-10">
          <Badge variant="outline" className="bg-muted/30 text-xs border-white/10">
            <Sparkles className="h-3 w-3 mr-1 text-neon-purple" /> AI-Powered
          </Badge>
          {status === 'processing' && (
            <Badge variant="outline" className="bg-muted/30 text-xs border-white/10">
              <TrendingUp className="h-3 w-3 mr-1 text-neon-blue" /> Learning
            </Badge>
          )}
        </div>
      </Card>
    </motion.div>
  );
};
