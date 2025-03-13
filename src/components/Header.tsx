
import React from 'react';
import { MenuIcon, User2Icon, BellIcon, Settings, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export const Header: React.FC = () => {
  return (
    <motion.header 
      className="border-b border-white/10 bg-background/95 backdrop-blur-sm sticky top-0 z-50"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" size="icon" className="lg:hidden">
            <MenuIcon className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <motion.div 
              className="relative h-8 w-8"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.div 
                className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple"
                animate={{ 
                  boxShadow: ["0 0 4px rgba(1, 205, 254, 0.5)", "0 0 8px rgba(185, 103, 255, 0.5)", "0 0 4px rgba(1, 205, 254, 0.5)"]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              ></motion.div>
              <div className="absolute inset-[2px] rounded-full bg-card flex items-center justify-center">
                <motion.span 
                  className="text-xs font-bold"
                  animate={{ 
                    color: ["#01cdfe", "#b967ff", "#01cdfe"]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  AI
                </motion.span>
              </div>
            </motion.div>
            <h1 className="text-lg font-semibold sm:text-xl">
              <span className="shimmer-text">MarketingAI</span> <span className="text-muted-foreground font-normal">Command</span>
            </h1>
          </div>
        </div>
        
        <div className="hidden md:flex items-center flex-1 px-4 mx-4">
          <div className="relative w-full max-w-md mx-auto">
            <Input 
              placeholder="Ask your AI marketing assistant..." 
              className="bg-muted/50 border-white/10 pl-4 pr-10 py-2 rounded-full transition-all duration-300 focus-within:border-neon-blue/50 focus-within:shadow-[0_0_8px_rgba(1,205,254,0.3)]" 
            />
            <Button size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-primary text-primary-foreground hover:bg-neon-purple transition-colors duration-300">
              <span className="sr-only">Search</span>
              <Sparkles className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
            <Button variant="outline" size="icon" className="border-white/10 bg-muted/30 hover:bg-muted/50 transition-all duration-300">
              <BellIcon className="h-4 w-4" />
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
            <Button variant="outline" size="icon" className="border-white/10 bg-muted/30 hover:bg-muted/50 transition-all duration-300">
              <Settings className="h-4 w-4" />
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
            <Button variant="outline" size="icon" className="border-white/10 bg-muted/30 hover:bg-muted/50 transition-all duration-300">
              <User2Icon className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};
