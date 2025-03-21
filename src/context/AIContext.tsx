
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
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

  // Log provider mounting
  useEffect(() => {
    console.log("AIProvider mounted");
    return () => console.log("AIProvider unmounted");
  }, []);

  const promptAgent = useCallback(async (agentId: string, prompt: string) => {
    try {
      setLoading(true);
      console.log("AIContext: Submitting agent prompt", { agentId, prompt });
      const taskId = await aiService.submitAgentPrompt(agentId, prompt);
      console.log("AIContext: Agent prompt submitted successfully", { taskId });
      return taskId;
    } catch (error) {
      console.error("AIContext: Error submitting agent prompt", error);
      toast.error(`Failed to submit task: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const getAgentTasks = useCallback(async (agentId: string) => {
    try {
      setLoading(true);
      console.log("AIContext: Getting agent tasks", { agentId });
      const tasks = await aiService.getAgentTasks(agentId);
      console.log("AIContext: Retrieved agent tasks", { count: tasks.length });
      return tasks;
    } catch (error) {
      console.error('AIContext: Failed to get agent tasks:', error);
      toast.error(`Failed to get agent tasks: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getTaskById = useCallback(async (taskId: string) => {
    try {
      setLoading(true);
      console.log("AIContext: Getting task by ID", { taskId });
      const task = await aiService.getTask(taskId);
      console.log("AIContext: Retrieved task", { task });
      return task;
    } catch (error) {
      console.error('AIContext: Failed to get task:', error);
      toast.error(`Failed to get task: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return undefined;
    } finally {
      setLoading(false);
    }
  }, []);

  const approveTaskResult = useCallback(async (taskId: string) => {
    try {
      setLoading(true);
      console.log("AIContext: Approving task result", { taskId });
      const result = await aiService.approveTaskResult(taskId);
      console.log("AIContext: Task approval result", { result });
      return result;
    } catch (error) {
      console.error('AIContext: Failed to approve task:', error);
      toast.error(`Failed to approve task: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const rejectTaskResult = useCallback(async (taskId: string, feedback?: string) => {
    try {
      setLoading(true);
      console.log("AIContext: Rejecting task result", { taskId, feedback });
      const result = await aiService.rejectTaskResult(taskId, feedback);
      console.log("AIContext: Task rejection result", { result });
      return result;
    } catch (error) {
      console.error('AIContext: Failed to reject task:', error);
      toast.error(`Failed to reject task: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Create the context value
  const contextValue = {
    promptAgent,
    getAgentTasks,
    getTaskById,
    approveTaskResult,
    rejectTaskResult,
    loading,
    currentTask,
    setCurrentTask,
  };

  console.log("AIContext: Provider rendering with context value");

  return (
    <AIContext.Provider value={contextValue}>
      {children}
    </AIContext.Provider>
  );
};

export const useAI = () => {
  const context = useContext(AIContext);
  if (context === undefined) {
    console.error("useAI was called outside of AIProvider context!");
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
};
