
import React from 'react';
import { AgentCard } from './AgentCard';
import { Search, Activity, Sparkles, LineChart, Zap, Users, PieChart, BrainCircuit, BarChart3, Rocket, Bot } from 'lucide-react';
import { motion } from 'framer-motion';

export const Dashboard: React.FC = () => {
  const agents = [
    {
      title: "Research Agent",
      description: "Collects market data, competitor analysis and trend reports.",
      icon: <Search className="h-5 w-5" />,
      status: 'active' as const,
      progressPercent: 100
    },
    {
      title: "Planning Agent",
      description: "Creates marketing plan, budget allocation, roadmap.",
      icon: <PieChart className="h-5 w-5" />,
      status: 'active' as const,
      progressPercent: 85
    },
    {
      title: "Strategy Agent",
      description: "Develops branding, messaging, and positioning.",
      icon: <BrainCircuit className="h-5 w-5" />,
      status: 'processing' as const,
      progressPercent: 62
    },
    {
      title: "Setup Agent",
      description: "Builds landing pages, social media profiles, and CRM.",
      icon: <Users className="h-5 w-5" />,
      status: 'idle' as const,
      progressPercent: 30
    },
    {
      title: "Execution Agent",
      description: "Launches campaigns, influencer outreach, ad management.",
      icon: <Rocket className="h-5 w-5" />,
      status: 'idle' as const,
      progressPercent: 10
    },
    {
      title: "Monitoring Agent",
      description: "Tracks KPIs, analyzes leads, reports on performance.",
      icon: <Activity className="h-5 w-5" />,
      status: 'idle' as const,
      progressPercent: 0
    },
    {
      title: "Optimization Agent",
      description: "Improves performance, scales campaigns, automates processes.",
      icon: <LineChart className="h-5 w-5" />,
      status: 'idle' as const,
      progressPercent: 0
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="container max-w-7xl mx-auto py-8 px-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="text-center mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-bold mb-2"
        >
          <span className="shimmer-text">AI Marketing Command Center</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-muted-foreground max-w-2xl mx-auto"
        >
          Your fully autonomous marketing ecosystem powered by specialized AI agents
        </motion.p>
      </div>

      <motion.div 
        className="mb-8"
        variants={itemVariants}
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="glass-card p-6 rounded-xl relative overflow-hidden mb-8 hover-3d"
          whileHover={{ 
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)", 
            translateY: -5 
          }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-card/80 to-transparent"></div>
            
            <motion.div 
              className="absolute -inset-1 bg-gradient-to-r from-neon-blue/10 via-neon-purple/5 to-transparent rounded-inherit"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ 
                duration: 15, 
                ease: "linear", 
                repeat: Infinity 
              }}
            ></motion.div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <motion.div 
                className="h-10 w-10 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Bot className="h-5 w-5 text-white" />
              </motion.div>
              <div>
                <h3 className="text-lg font-medium">Marketing Intelligence Briefing</h3>
                <p className="text-sm text-muted-foreground">Latest insights from your AI team</p>
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <motion.div 
                className="p-4 rounded-lg bg-muted/20 border border-white/5 hover:border-white/20 transition-all duration-300"
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.07)" }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-4 w-4 text-neon-yellow" />
                  <h4 className="font-medium">Current Market Opportunities</h4>
                </div>
                <p className="text-sm text-muted-foreground">AI analysis reveals a 23% growth in your target market segment. Consider allocating resources to capitalize on the trend.</p>
              </motion.div>
              
              <motion.div 
                className="p-4 rounded-lg bg-muted/20 border border-white/5 hover:border-white/20 transition-all duration-300"
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.07)" }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="h-4 w-4 text-neon-green" />
                  <h4 className="font-medium">Performance Summary</h4>
                </div>
                <p className="text-sm text-muted-foreground">Your recent campaigns outperformed industry benchmarks by 15%. Strategy Agent recommends scaling successful channels.</p>
              </motion.div>
              
              <motion.div 
                className="p-4 rounded-lg bg-muted/20 border border-white/5 hover:border-white/20 transition-all duration-300"
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.07)" }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-4 w-4 text-neon-purple" />
                  <h4 className="font-medium">Next Actions</h4>
                </div>
                <p className="text-sm text-muted-foreground">Planning Agent has prepared budget recommendations and campaign roadmap. Review and approve to proceed.</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.h2 
        className="text-2xl font-semibold mb-6 shimmer-text"
        variants={itemVariants}
      >
        AI Agent Ecosystem
      </motion.h2>
      
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        variants={containerVariants}
      >
        {agents.map((agent, index) => (
          <AgentCard
            key={agent.title}
            title={agent.title}
            description={agent.description}
            icon={agent.icon}
            status={agent.status}
            progressPercent={agent.progressPercent}
            index={index}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};
