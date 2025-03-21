
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAI } from '@/context/AIContext';
import { AgentTask } from '@/services/aiService';
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Send, CheckCircle, XCircle, Clock, AlertTriangle, ExternalLink } from 'lucide-react';

interface AgentPromptProps {
  agentId: string;
  agentName: string;
  onClose: () => void;
}

export const AgentPrompt: React.FC<AgentPromptProps> = ({ agentId, agentName, onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [tasks, setTasks] = useState<AgentTask[]>([]);
  const [selectedTask, setSelectedTask] = useState<AgentTask | null>(null);
  const { promptAgent, getAgentTasks, approveTaskResult, rejectTaskResult, loading } = useAI();

  // Fetch agent tasks on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      const agentTasks = await getAgentTasks(agentId);
      setTasks(agentTasks);
    };
    
    fetchTasks();
    
    // Poll for task updates every 2 seconds
    const intervalId = setInterval(fetchTasks, 2000);
    
    return () => clearInterval(intervalId);
  }, [agentId, getAgentTasks]);

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }
    
    try {
      await promptAgent(agentId, prompt);
      setPrompt('');
    } catch (error) {
      console.error('Error submitting prompt:', error);
    }
  };

  const handleApprove = async () => {
    if (!selectedTask) return;
    
    const result = await approveTaskResult(selectedTask.id);
    if (result) {
      toast.success(`${agentName}'s response has been approved`);
      setSelectedTask(null);
    }
  };

  const handleReject = async () => {
    if (!selectedTask) return;
    
    const result = await rejectTaskResult(selectedTask.id);
    if (result) {
      toast.success(`${agentName}'s response has been rejected`);
      setSelectedTask(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
      case 'processing':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Processing</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Completed</Badge>;
      case 'failed':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Failed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <Card className="premium-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Prompt {agentName}</span>
            {loading && <Clock className="h-4 w-4 animate-spin" />}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder={`What would you like the ${agentName} to do?`}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[120px] border-gray-200"
            disabled={loading}
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading || !prompt.trim()} className="bg-gradient-to-r from-premium-blue to-premium-purple">
            <Send className="mr-2 h-4 w-4" />
            Submit
          </Button>
        </CardFooter>
      </Card>

      {tasks.length > 0 && (
        <Card className="premium-card">
          <CardHeader>
            <CardTitle>Task History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tasks.map((task) => (
                <motion.div
                  key={task.id}
                  className={`p-3 rounded-md cursor-pointer border ${
                    selectedTask?.id === task.id
                      ? 'border-primary/50 bg-primary/5'
                      : 'border-gray-200 hover:border-primary/30'
                  }`}
                  onClick={() => setSelectedTask(task.id === selectedTask?.id ? null : task)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium truncate max-w-[70%]">{task.prompt}</div>
                    {getStatusBadge(task.status)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(task.createdAt).toLocaleString()}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {selectedTask && selectedTask.status === 'completed' && selectedTask.result && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Agent Response</span>
                <Badge variant="outline" className="bg-white">
                  Confidence: {Math.round(selectedTask.result.confidence * 100)}%
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <div className="whitespace-pre-wrap">
                {selectedTask.result.text}
              </div>
              
              {selectedTask.result.sources && selectedTask.result.sources.length > 0 && (
                <div className="mt-4">
                  <div className="text-sm font-medium mb-1">Sources:</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedTask.result.sources.map((source, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1 bg-white">
                        <ExternalLink className="h-3 w-3" />
                        {source}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedTask.result.error && (
                <div className="mt-4 flex items-center gap-2 text-red-500">
                  <AlertTriangle className="h-4 w-4" />
                  <span>{selectedTask.result.error}</span>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleReject} className="border-red-200 hover:bg-red-50 text-red-600">
                <XCircle className="mr-2 h-4 w-4" />
                Reject
              </Button>
              <Button onClick={handleApprove} className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </div>
  );
};
