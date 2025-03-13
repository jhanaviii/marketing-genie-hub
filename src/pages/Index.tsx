
import React from 'react';
import { Header } from '@/components/Header';
import { Dashboard } from '@/components/Dashboard';
import { ChatPanel } from '@/components/ChatPanel';
import { motion } from 'framer-motion';

const Index = () => {
  return (
    <motion.div 
      className="min-h-screen bg-background text-foreground flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Header />
      <motion.main 
        className="flex-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <Dashboard />
      </motion.main>
      <ChatPanel />
    </motion.div>
  );
};

export default Index;
