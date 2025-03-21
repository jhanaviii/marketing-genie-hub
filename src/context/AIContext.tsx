
import React, { createContext, useContext, useState, useCallback } from 'react';
import { aiService, AIPrompt, AIResponse, AgentTask } from '@/services/aiService';
import { toast } from 'sonner';

interface AIContextType {
  promptAgent: (agentId: string, prompt: string) => Promise<string>;
  getAgentTasks: (agentId: string) => Promise<AgentTask[]>;
  getTaskById: (taskId: string) => Promise<AgentTask | undefined>;
  approveTaskResult: (taskId: string) => Promise<boolean>;
  rejectTaskResult: (taskId: string, feedback?: string) => Promise<boolean>;
  loading: boolean;
  currentTask?: AgentTask;
  setCurrentTask: (task?: AgentTask) => void;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export const AIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [currentTask, setCurrentTask] = useState<AgentTask | undefined>();

  const promptAgent = useCallback(async (agentId: string, prompt: string) => {
    try {
      setLoading(true);
      const taskId = await aiService.submitAgentPrompt(agentId, prompt);
      return taskId;
    } catch (error) {
      toast.error(`Failed to submit task: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const getAgentTasks = useCallback(async (agentId: string) => {
    try {
      setLoading(true);
      return await aiService.getAgentTasks(agentId);
    } catch (error) {
      console.error('Failed to get agent tasks:', error);
      toast.error(`Failed to get agent tasks: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getTaskById = useCallback(async (taskId: string) => {
    try {
      setLoading(true);
      const task = await aiService.getTask(taskId);
      return task;
    } catch (error) {
      console.error('Failed to get task:', error);
      toast.error(`Failed to get task: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return undefined;
    } finally {
      setLoading(false);
    }
  }, []);

  const approveTaskResult = useCallback(async (taskId: string) => {
    try {
      setLoading(true);
      return await aiService.approveTaskResult(taskId);
    } catch (error) {
      console.error('Failed to approve task:', error);
      toast.error(`Failed to approve task: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const rejectTaskResult = useCallback(async (taskId: string, feedback?: string) => {
    try {
      setLoading(true);
      return await aiService.rejectTaskResult(taskId, feedback);
    } catch (error) {
      console.error('Failed to reject task:', error);
      toast.error(`Failed to reject task: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <AIContext.Provider
      value={{
        promptAgent,
        getAgentTasks,
        getTaskById,
        approveTaskResult,
        rejectTaskResult,
        loading,
        currentTask,
        setCurrentTask,
      }}
    >
      {children}
    </AIContext.Provider>
  );
};

export const useAI = () => {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
};
