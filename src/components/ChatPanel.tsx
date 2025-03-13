
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send, Mic, Bot, User } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export const ChatPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI marketing assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm analyzing your request. Let me provide some marketing insights based on our available data.",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="w-80 sm:w-96 h-96 glass-card rounded-xl flex flex-col overflow-hidden shadow-lg animate-in slide-in-from-bottom-5">
          <div className="p-3 border-b border-white/10 bg-muted/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative h-6 w-6">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple animate-pulse"></div>
                <div className="absolute inset-[1px] rounded-full bg-background flex items-center justify-center">
                  <Bot className="h-3 w-3" />
                </div>
              </div>
              <h3 className="font-medium text-sm">Marketing Assistant</h3>
            </div>
            <Button size="sm" variant="ghost" onClick={() => setIsOpen(false)}>
              <span className="sr-only">Close</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </Button>
          </div>
          
          <ScrollArea className="flex-1 p-3">
            <div className="flex flex-col gap-3">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'ai' && (
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-3 w-3" />
                    </div>
                  )}
                  
                  <div 
                    className={`max-w-[80%] rounded-xl p-3 ${
                      message.sender === 'user' 
                        ? 'bg-primary/20 text-primary-foreground ml-auto' 
                        : 'bg-muted/50 text-foreground'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-[10px] opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  
                  {message.sender === 'user' && (
                    <div className="h-6 w-6 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                      <User className="h-3 w-3" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <div className="p-3 border-t border-white/10 bg-background">
            <div className="flex gap-2">
              <Button size="icon" variant="outline" className="rounded-full h-8 w-8 flex-shrink-0">
                <Mic className="h-4 w-4" />
              </Button>
              <div className="flex-1 relative">
                <Input 
                  placeholder="Ask your AI assistant..." 
                  className="pr-10"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage();
                    }
                  }}
                />
                <Button 
                  size="icon" 
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full"
                  onClick={handleSendMessage}
                >
                  <Send className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Button 
          size="icon" 
          className="h-12 w-12 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <MessageSquare className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};
