
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, TrendingUp, BrainCircuit, Zap } from "lucide-react";

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
      case 'processing': return 'bg-neon-blue animate-pulse';
      case 'idle': return 'bg-neon-yellow';
      default: return 'bg-muted';
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="h-full"
    >
      <Card className="agent-card overflow-hidden h-full flex flex-col">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-muted/50 to-transparent"></div>
        </div>
        
        <div className="relative z-10 flex justify-between items-start mb-4">
          <div className="flex items-center justify-center p-2 rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
          <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${getStatusColor()}`}></span>
            <span className="text-xs text-muted-foreground">{getStatusText()}</span>
          </div>
        </div>
        
        <div className="flex-1 relative z-10">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        
        {progressPercent > 0 && (
          <div className="mt-4 relative z-10">
            <div className="w-full bg-muted h-1 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-neon-blue to-neon-purple"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-muted-foreground">Progress</span>
              <span className="text-xs font-medium">{progressPercent}%</span>
            </div>
          </div>
        )}
        
        <div className="flex gap-2 mt-4 relative z-10">
          <Badge variant="outline" className="bg-muted/30 text-xs">
            <Sparkles className="h-3 w-3 mr-1" /> AI-Powered
          </Badge>
          {status === 'processing' && (
            <Badge variant="outline" className="bg-muted/30 text-xs">
              <TrendingUp className="h-3 w-3 mr-1" /> Learning
            </Badge>
          )}
        </div>
      </Card>
    </motion.div>
  );
};
