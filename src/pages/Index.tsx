
import React from 'react';
import { Header } from '@/components/Header';
import { Dashboard } from '@/components/Dashboard';
import { ChatPanel } from '@/components/ChatPanel';
import { motion } from 'framer-motion';
import { TypewriterText } from '@/components/LiveText';
import { PulsingLiveIndicator } from '@/components/LiveCounter';
import { MarketingDashboard } from '@/components/MarketingDashboard';
import { Card } from '@/components/ui/card';
import { AIProvider } from '@/context/AIContext';

const featuresTexts = [
  "Advanced AI Marketing Automation",
  "Real-time Campaign Analytics", 
  "Customer Journey Optimization",
  "Personalized Content Creation",
  "Multi-channel Campaign Management",
  "Predictive Audience Targeting"
];

const Index = () => {
  return (
    <AIProvider>
      <motion.div 
        className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background decorative elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-neon-blue/10 to-premium-blue/20 rounded-full blur-3xl opacity-70 breathing-bg"></div>
        <div className="absolute top-1/3 -left-24 w-80 h-80 bg-gradient-to-tr from-primary/10 to-premium-purple/10 rounded-full blur-3xl opacity-60 breathing-bg"></div>
        
        <Header />
        
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">
                <span className="shimmer-text">AI Marketing Dashboard</span>
              </h1>
              <div className="mt-2 text-muted-foreground">
                <TypewriterText 
                  texts={featuresTexts} 
                  interval={800}
                  className="text-lg font-medium"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-center">
                <PulsingLiveIndicator className="mb-1" />
                <div className="text-xs text-muted-foreground">Active Users</div>
                <Card className="bg-gradient-to-r from-premium-blue to-premium-purple text-white px-3 py-1 text-xl font-bold mt-1">
                  432
                </Card>
              </div>
              
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Campaigns Running</div>
                <Card className="bg-gradient-to-r from-premium-indigo to-premium-blue text-white px-3 py-1 text-xl font-bold mt-1">
                  28
                </Card>
              </div>
              
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Insights Generated</div>
                <Card className="bg-gradient-to-r from-premium-orange to-premium-pink text-white px-3 py-1 text-xl font-bold mt-1">
                  1284
                </Card>
              </div>
            </div>
          </div>

          {/* Marketing Dashboard Section */}
          <div className="mb-8">
            <MarketingDashboard />
          </div>
        </div>
        
        <motion.main 
          className="flex-1 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Dashboard />
        </motion.main>
        
        <ChatPanel />
      </motion.div>
    </AIProvider>
  );
};

export default Index;
