
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { MessageSquare, Send, AlertCircle, Bot, Sparkles, X, Maximize2, Minimize2 } from "lucide-react";
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
              "fixed bottom-4 right-4 w-80 shadow-lg z-50 rounded-lg overflow-hidden",
              isMinimized ? "h-14" : "h-96"
            )}
          >
            <Card className="h-full flex flex-col bg-card">
              <div className="p-3 border-b flex items-center justify-between bg-muted/30">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  <span className="font-medium">AI Assistant</span>
                </div>
                <div className="flex gap-1">
                  {isMinimized ? (
                    <Button size="icon" variant="ghost" className="h-6 w-6" onClick={toggleMinimize}>
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button size="icon" variant="ghost" className="h-6 w-6" onClick={toggleMinimize}>
                      <Minimize2 className="h-4 w-4" />
                    </Button>
                  )}
                  <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => setIsOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {!isMinimized && (
                <>
                  <div className="flex-1 overflow-y-auto p-3 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "flex max-w-[80%] rounded-lg p-3",
                          message.role === "user" 
                            ? "bg-primary text-primary-foreground ml-auto" 
                            : "bg-muted/50 text-foreground"
                        )}
                      >
                        {message.content}
                      </div>
                    ))}
                    {isProcessing && (
                      <div className="flex max-w-[80%] rounded-lg p-3 bg-muted/50 text-foreground">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce"></div>
                          <div className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce delay-75"></div>
                          <div className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce delay-150"></div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  <form onSubmit={handleSubmit} className="p-3 border-t flex gap-2">
                    <Input
                      ref={inputRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Ask something..."
                      disabled={isProcessing}
                      className="flex-1"
                    />
                    <Button size="icon" type="submit" disabled={isProcessing || !inputValue.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={toggleChat}
        size="icon"
        className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg z-40"
        style={{ display: isOpen ? 'none' : 'flex' }}
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    </>
  );
};
