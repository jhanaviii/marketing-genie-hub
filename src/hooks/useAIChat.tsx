
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

type MessageRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

export function useAIChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI marketing assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Generate a unique ID for messages
  const generateId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  // Add a user message
  const addUserMessage = useCallback((content: string) => {
    const newMessage: ChatMessage = {
      id: generateId(),
      role: 'user',
      content,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    return newMessage.id;
  }, []);

  // Process the user message and generate AI response
  const processMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;
    
    const messageId = addUserMessage(content);
    setIsProcessing(true);
    
    try {
      // Simulate AI processing delay
      await new Promise(r => setTimeout(r, 1000 + Math.random() * 2000));
      
      // Mock AI responses based on keywords in the user message
      let aiResponse = "I'll help you with that right away!";
      
      if (content.toLowerCase().includes('campaign')) {
        aiResponse = "I can help with your campaign strategy. Would you like me to analyze your target audience or suggest content ideas?";
      } else if (content.toLowerCase().includes('competitors') || content.toLowerCase().includes('competition')) {
        aiResponse = "I've analyzed your top competitors. Their recent campaigns are focusing on sustainability messaging and video content. Would you like more detailed insights?";
      } else if (content.toLowerCase().includes('analysis') || content.toLowerCase().includes('research')) {
        aiResponse = "I can run a comprehensive market analysis for you. This will include audience demographics, competitor strategies, and trend forecasting. Shall I proceed?";
      } else if (content.toLowerCase().includes('budget') || content.toLowerCase().includes('spending')) {
        aiResponse = "Based on your goals, I recommend allocating 40% to social media, 30% to content marketing, 20% to email campaigns, and 10% to PPC. Would you like me to adjust this distribution?";
      } else if (content.toLowerCase().includes('optimize') || content.toLowerCase().includes('improve')) {
        aiResponse = "I've identified several optimization opportunities. Your email open rates could be improved with more personalized subject lines, and your ad creative could benefit from more action-oriented CTAs.";
      }
      
      // Add the AI response
      setMessages(prev => [
        ...prev, 
        {
          id: generateId(),
          role: 'assistant',
          content: aiResponse,
          timestamp: new Date()
        }
      ]);
    } catch (error) {
      console.error('Error processing message:', error);
      toast.error('Failed to process your message. Please try again.');
      
      // Remove the user message if processing failed
      setMessages(prev => prev.filter(msg => msg.id !== messageId));
    } finally {
      setIsProcessing(false);
    }
  }, [addUserMessage]);

  // Clear all messages
  const clearMessages = useCallback(() => {
    setMessages([
      {
        id: generateId(),
        role: 'assistant',
        content: 'How can I help you with your marketing today?',
        timestamp: new Date()
      }
    ]);
  }, []);

  return {
    messages,
    isProcessing,
    processMessage,
    clearMessages
  };
}
