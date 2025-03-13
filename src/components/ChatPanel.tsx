
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { MessageSquare, Send, X, Minimize2, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAIChat } from '@/hooks/useAIChat';
import { formatDistanceToNow } from 'date-fns';

export const ChatPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { messages, isProcessing, processMessage } = useAIChat();

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus the input when panel opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isProcessing) {
      processMessage(inputValue);
      setInputValue('');
    }
  };

  // Handle Enter key press (with Shift+Enter for new line)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full"
      >
        <CollapsibleTrigger asChild>
          <Button 
            variant="default"
            size="lg" 
            className="rounded-full shadow-lg flex items-center justify-center gap-2 p-4"
          >
            {isOpen ? (
              <>
                <Minimize2 className="h-5 w-5" />
                <span>Minimize Chat</span>
              </>
            ) : (
              <>
                <MessageSquare className="h-5 w-5" />
                <span>AI Assistant</span>
              </>
            )}
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: 10, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-2"
              >
                <div className="bg-card rounded-lg shadow-xl border border-border overflow-hidden w-[350px] md:w-[450px]">
                  <div className="flex items-center justify-between p-3 border-b border-border bg-muted/50">
                    <h3 className="font-medium">Marketing AI Assistant</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={() => setIsOpen(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="h-[350px] overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div 
                        key={message.id}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.role === 'user' 
                              ? 'bg-primary text-primary-foreground ml-4' 
                              : 'bg-muted text-foreground mr-4'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1 text-right">
                            {formatDistanceToNow(message.timestamp, { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                    
                    {isProcessing && (
                      <div className="flex justify-start">
                        <div className="bg-muted text-foreground rounded-lg p-3 max-w-[80%] mr-4">
                          <div className="flex gap-1">
                            <div className="h-2 w-2 rounded-full bg-primary/70 animate-pulse"></div>
                            <div className="h-2 w-2 rounded-full bg-primary/70 animate-pulse delay-150"></div>
                            <div className="h-2 w-2 rounded-full bg-primary/70 animate-pulse delay-300"></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <form onSubmit={handleSubmit} className="p-3 border-t border-border">
                    <div className="flex items-end gap-2">
                      <Textarea
                        ref={inputRef}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your message..."
                        className="min-h-[60px] max-h-[150px] resize-none"
                        disabled={isProcessing}
                      />
                      <Button 
                        type="submit" 
                        size="icon" 
                        disabled={!inputValue.trim() || isProcessing}
                        className="h-9 w-9 shrink-0"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
