
import React from 'react';
import { Header } from '@/components/Header';
import { Dashboard } from '@/components/Dashboard';
import { ChatPanel } from '@/components/ChatPanel';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-1">
        <Dashboard />
      </main>
      <ChatPanel />
    </div>
  );
};

export default Index;
