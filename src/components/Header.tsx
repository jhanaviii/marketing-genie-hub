
import React from 'react';
import { MenuIcon, User2Icon, BellIcon, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Header: React.FC = () => {
  return (
    <header className="border-b border-white/10 bg-background/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" size="icon" className="lg:hidden">
            <MenuIcon className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple animate-pulse-glow"></div>
              <div className="absolute inset-[2px] rounded-full bg-card flex items-center justify-center">
                <span className="text-xs font-bold">AI</span>
              </div>
            </div>
            <h1 className="text-lg font-semibold sm:text-xl">
              <span className="shimmer-text">MarketingAI</span> <span className="text-muted-foreground font-normal">Command</span>
            </h1>
          </div>
        </div>
        
        <div className="hidden md:flex items-center flex-1 px-4 mx-4">
          <div className="relative w-full max-w-md mx-auto">
            <Input 
              placeholder="Ask your AI marketing assistant..." 
              className="bg-muted/50 border-white/10 pl-4 pr-10 py-2 rounded-full" 
            />
            <Button size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-primary text-primary-foreground">
              <span className="sr-only">Search</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m22 22-6-6"></path>
                <circle cx="10" cy="10" r="8"></circle>
              </svg>
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="border-white/10 bg-muted/30">
            <BellIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="border-white/10 bg-muted/30">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="border-white/10 bg-muted/30">
            <User2Icon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};
