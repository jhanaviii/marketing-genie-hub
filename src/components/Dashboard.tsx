
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
import { MarketingAgents } from '@/components/MarketingAgents';
import { CampaignList } from '@/components/CampaignList';
import { InsightList } from '@/components/InsightList';

export const Dashboard: React.FC = () => {
  const { agents, insights, campaigns, loading, error, refreshData } = useMarketing();
  const [showCampaignDialog, setShowCampaignDialog] = useState(false);
  
  // Animation variants
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

      {/* AI Agents Section */}
      <MarketingAgents 
        loading={loading} 
        agents={agents} 
        containerVariants={containerVariants}
        itemVariants={itemVariants}
      />

      {/* Campaigns and Insights Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">Active Campaigns</h2>
            <TrendingUp className="h-4 w-4 text-premium-teal" />
          </div>
          <CampaignList loading={loading} campaigns={campaigns} />
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">Latest Insights</h2>
            <span className="text-xs bg-premium-pink/10 text-premium-pink px-2 py-0.5 rounded-full">New</span>
          </div>
          <InsightList loading={loading} insights={insights} />
        </section>
      </div>

      {/* Create Campaign Dialog */}
      <Dialog open={showCampaignDialog} onOpenChange={setShowCampaignDialog}>
        <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden premium-card">
          <div className="p-4 bg-gradient-to-r from-premium-blue to-premium-purple">
            <DialogTitle className="text-xl text-white">Create New Campaign</DialogTitle>
            <DialogDescription className="text-white/70">Fill out the details to create a new marketing campaign.</DialogDescription>
          </div>
          <div className="p-6">
            <CreateCampaignForm onSubmit={() => {
              toast.success("Campaign created successfully!");
              setShowCampaignDialog(false);
            }} onCancel={() => setShowCampaignDialog(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
