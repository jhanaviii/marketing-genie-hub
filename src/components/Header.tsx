
import React from 'react';
import { MenuIcon, User2Icon, BellIcon, Settings, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export const Header: React.FC = () => {
  return (
    <motion.header 
      className="border-b border-border/30 bg-white/80 backdrop-blur-md sticky top-0 z-50"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" size="icon" className="lg:hidden hover:bg-primary/5">
            <MenuIcon className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <motion.div 
              className="relative h-8 w-8"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.div 
                className="absolute inset-0 rounded-full bg-gradient-to-r from-premium-blue to-premium-purple"
                animate={{ 
                  boxShadow: ["0 0 4px rgba(79, 70, 229, 0.5)", "0 0 8px rgba(124, 58, 237, 0.5)", "0 0 4px rgba(79, 70, 229, 0.5)"]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              ></motion.div>
              <div className="absolute inset-[2px] rounded-full bg-white flex items-center justify-center">
                <motion.span 
                  className="text-xs font-bold"
                  animate={{ 
                    color: ["#4F46E5", "#7C3AED", "#4F46E5"]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  AI
                </motion.span>
              </div>
            </motion.div>
            <h1 className="text-lg font-semibold sm:text-xl">
              <span className="shimmer-text font-bold">MarketingAI</span> <span className="text-muted-foreground font-normal">Command</span>
            </h1>
          </div>
        </div>
        
        <div className="hidden md:flex items-center flex-1 px-4 mx-4">
          <div className="relative w-full max-w-md mx-auto">
            <Input 
              placeholder="Ask your AI marketing assistant..." 
              className="bg-white/80 border-border/30 pl-4 pr-10 py-2 rounded-full transition-all duration-300 focus-within:border-primary/50 focus-within:shadow-[0_0_8px_rgba(79,70,229,0.3)]" 
            />
            <Button size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-primary text-primary-foreground hover:bg-premium-purple transition-colors duration-300">
              <span className="sr-only">Search</span>
              <Sparkles className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <motion.div 
            whileHover={{ scale: 1.1 }} 
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="indicator"
          >
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-premium-orange"></span>
            <Button variant="outline" size="icon" className="border-border/30 bg-white/80 hover:bg-primary/5 transition-all duration-300">
              <BellIcon className="h-4 w-4" />
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
            <Button variant="outline" size="icon" className="border-border/30 bg-white/80 hover:bg-primary/5 transition-all duration-300">
              <Settings className="h-4 w-4" />
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
            <Button variant="outline" size="icon" className="border-border/30 bg-white/80 hover:bg-primary/5 transition-all duration-300">
              <User2Icon className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};
