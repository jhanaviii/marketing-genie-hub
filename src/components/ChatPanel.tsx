
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { MessageSquare, Send, Bot, X, Maximize2, Minimize2, Sparkles } from "lucide-react";
import { useAIChat } from '@/hooks/useAIChat';
import { motion, AnimatePresence } from 'framer-motion';

export const ChatPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { messages, isProcessing, processMessage, clearMessages } = useAIChat();

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat is opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isProcessing) {
      processMessage(inputValue);
      setInputValue('');
    }
  };

  const toggleChat = () => {
    if (isMinimized) {
      setIsMinimized(false);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className={cn(
              "fixed bottom-4 right-4 w-80 z-50 rounded-xl overflow-hidden shadow-lg",
              isMinimized ? "h-14" : "h-96"
            )}
          >
            <Card className="h-full flex flex-col glass-card border-0">
              <div className="p-3 border-b border-border/30 flex items-center justify-between bg-white/80">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-premium-blue to-premium-purple text-white">
                    <Bot className="h-4 w-4" />
                  </span>
                  <span className="font-medium">AI Assistant</span>
                </div>
                <div className="flex gap-1">
                  {isMinimized ? (
                    <Button size="icon" variant="ghost" className="h-6 w-6 hover:bg-primary/5" onClick={toggleMinimize}>
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button size="icon" variant="ghost" className="h-6 w-6 hover:bg-primary/5" onClick={toggleMinimize}>
                      <Minimize2 className="h-4 w-4" />
                    </Button>
                  )}
                  <Button size="icon" variant="ghost" className="h-6 w-6 hover:bg-primary/5" onClick={() => setIsOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {!isMinimized && (
                <>
                  <div className="flex-1 overflow-y-auto p-3 space-y-4 scrollbar-none">
                    {messages.map((message, index) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={cn(
                          "flex max-w-[80%] rounded-lg p-3",
                          message.role === "user" 
                            ? "bg-primary text-primary-foreground ml-auto shadow-sm" 
                            : "bg-muted/50 text-foreground shadow-sm"
                        )}
                      >
                        {message.content}
                      </motion.div>
                    ))}
                    {isProcessing && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex max-w-[80%] rounded-lg p-3 bg-muted/50 text-foreground shadow-sm"
                      >
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce"></div>
                          <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce delay-75"></div>
                          <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce delay-150"></div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  <form onSubmit={handleSubmit} className="p-3 border-t border-border/30 flex gap-2 bg-white/80">
                    <Input
                      ref={inputRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Ask something..."
                      disabled={isProcessing}
                      className="flex-1 border-border/30 focus-visible:ring-primary/30"
                    />
                    <Button 
                      size="icon" 
                      type="submit" 
                      className="bg-gradient-to-r from-premium-blue to-premium-purple hover:opacity-90 transition-opacity"
                      disabled={isProcessing || !inputValue.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-4 right-4 z-40"
        style={{ display: isOpen ? 'none' : 'flex' }}
      >
        <Button
          onClick={toggleChat}
          size="icon"
          className="h-12 w-12 rounded-full shadow-lg bg-gradient-to-r from-premium-blue to-premium-purple hover:shadow-xl transition-all duration-300"
        >
          <Sparkles className="h-6 w-6 absolute animate-pulse opacity-50" />
          <MessageSquare className="h-5 w-5" />
        </Button>
      </motion.div>
    </>
  );
};
