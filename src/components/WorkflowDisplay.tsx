
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { 
  ClipboardList, FileCheck, BarChart2, BrainCircuit, Layers, Rocket, PieChart, 
  LineChart, CheckCircle, ArrowRight, Settings, ChevronRight
} from 'lucide-react';
import { toast } from "sonner";

// Define workflow steps
const workflowSteps = [
  {
    id: 'input',
    title: 'Product/Service Input',
    description: 'Enter product/service details (niche, target, goals, budget, special needs).',
    icon: <ClipboardList className="h-5 w-5" />,
    checkpoint: 'Confirm Input Accuracy',
    checkpointDesc: 'User must approve product/service summary, target audience, and key goals.',
    progress: 100,
    color: 'from-blue-400 to-blue-500'
  },
  {
    id: 'research',
    title: 'Research',
    description: 'AI analyzes market, competitors, audience, and regulations.',
    icon: <BarChart2 className="h-5 w-5" />,
    checkpoint: 'Approval Research Findings',
    checkpointDesc: 'Review summary report and approve or request revision.',
    progress: 85,
    color: 'from-indigo-400 to-indigo-500'
  },
  {
    id: 'plan',
    title: 'Plan',
    description: 'Generate goals, budget, timeline, pricing, and distribution strategies.',
    icon: <PieChart className="h-5 w-5" />,
    checkpoint: 'Approve Master Plan',
    checkpointDesc: 'Review detailed plan deck and adjust as needed.',
    progress: 60,
    color: 'from-purple-400 to-purple-500'
  },
  {
    id: 'strategize',
    title: 'Strategize',
    description: 'Craft brand, marketing, sales, content, and engagement strategies.',
    icon: <BrainCircuit className="h-5 w-5" />,
    checkpoint: 'Approve Strategic Blueprints',
    checkpointDesc: 'Review and approve strategic documents.',
    progress: 35,
    color: 'from-violet-400 to-violet-500'
  },
  {
    id: 'setup',
    title: 'Setup',
    description: 'Deliver brand assets, website, social profiles, and marketing collaterals.',
    icon: <Layers className="h-5 w-5" />,
    checkpoint: 'Approve Marketing Setup Package',
    checkpointDesc: 'Review visual & functional elements and approve or request changes.',
    progress: 20,
    color: 'from-pink-400 to-pink-500'
  },
  {
    id: 'execute',
    title: 'Execute',
    description: 'Launch campaigns, content, events, and partnerships.',
    icon: <Rocket className="h-5 w-5" />,
    checkpoint: 'Pre-Launch Approval',
    checkpointDesc: 'Review "Go-To-Market" kit and approve launch.',
    progress: 10,
    color: 'from-red-400 to-red-500'
  },
  {
    id: 'monitor',
    title: 'Monitor',
    description: 'Analyze performance across sales, leads, traffic, and feedback.',
    icon: <LineChart className="h-5 w-5" />,
    checkpoint: 'Performance Review',
    checkpointDesc: 'Review data and insights and request optimizations.',
    progress: 5,
    color: 'from-orange-400 to-orange-500'
  },
  {
    id: 'optimize',
    title: 'Optimize & Scale',
    description: 'Implement improvements and prepare for expansion.',
    icon: <Settings className="h-5 w-5" />,
    checkpoint: 'Growth Approval',
    checkpointDesc: 'Confirm readiness to scale based on performance.',
    progress: 0,
    color: 'from-yellow-400 to-yellow-500'
  }
];

export const WorkflowDisplay: React.FC = () => {
  const [activeStep, setActiveStep] = useState('input');
  const [showStepDialog, setShowStepDialog] = useState(false);
  const [selectedStep, setSelectedStep] = useState<typeof workflowSteps[0] | null>(null);

  const handleStepClick = (step: typeof workflowSteps[0]) => {
    setSelectedStep(step);
    setShowStepDialog(true);
  };

  const handleApproveStep = () => {
    toast.success(`${selectedStep?.title} approved successfully!`);
    setShowStepDialog(false);
    
    // Find the next step
    const currentIndex = workflowSteps.findIndex(step => step.id === selectedStep?.id);
    if (currentIndex < workflowSteps.length - 1) {
      const nextStep = workflowSteps[currentIndex + 1];
      setActiveStep(nextStep.id);
    }
  };

  const handleReviseStep = () => {
    toast.info(`Requested revisions for ${selectedStep?.title}`);
    setShowStepDialog(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <FileCheck className="h-5 w-5 text-premium-blue" />
          Marketing Workflow
          <span className="text-xs bg-premium-blue/10 text-premium-blue px-2 py-0.5 rounded-full">
            Interactive
          </span>
        </h2>
      </div>

      <Card className="premium-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">8-Step Marketing Automation Process</CardTitle>
          <CardDescription>Track your marketing automation progress through our comprehensive workflow</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <div className="absolute left-0 right-0 h-1 bg-muted/30 rounded-full top-1/2 -translate-y-1/2">
              <div className="absolute left-0 h-full bg-gradient-to-r from-premium-blue to-premium-purple rounded-full" style={{ width: '35%' }}></div>
            </div>
            <div className="flex justify-between relative">
              {workflowSteps.map((step, index) => (
                <motion.div 
                  key={step.id}
                  className={`w-8 h-8 rounded-full flex items-center justify-center z-10 cursor-pointer ${
                    step.id === activeStep 
                      ? 'bg-premium-blue text-white' 
                      : step.progress > 0 
                        ? 'bg-premium-purple/20 text-premium-purple border border-premium-purple' 
                        : 'bg-muted/20 text-muted-foreground border border-muted'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleStepClick(step)}
                >
                  <span className="text-xs font-medium">{index + 1}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <Tabs defaultValue={activeStep} value={activeStep} onValueChange={setActiveStep} className="mt-6">
            <TabsList className="grid grid-cols-4 md:grid-cols-8 bg-muted/20">
              {workflowSteps.map(step => (
                <TabsTrigger 
                  key={step.id} 
                  value={step.id}
                  className={`text-xs py-1 px-2 ${step.progress > 0 ? 'text-foreground' : 'text-muted-foreground'}`}
                >
                  {step.title.split('/')[0]}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {workflowSteps.map(step => (
              <TabsContent key={step.id} value={step.id} className="pt-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2 rounded-full bg-gradient-to-r ${step.color} text-white`}>
                        {step.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold">{step.title}</h3>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{step.progress}%</span>
                        </div>
                        <Progress value={step.progress} className="h-2" indicatorClassName={`bg-gradient-to-r ${step.color}`} />
                      </div>
                      
                      <div className="bg-muted/10 p-4 rounded-lg border border-border/10">
                        <h4 className="flex items-center gap-2 font-medium mb-2">
                          <CheckCircle className="h-4 w-4 text-premium-teal" />
                          Checkpoint: {step.checkpoint}
                        </h4>
                        <p className="text-sm text-muted-foreground">{step.checkpointDesc}</p>
                        
                        <div className="mt-4 flex gap-2">
                          <Button 
                            size="sm" 
                            onClick={() => handleStepClick(step)}
                            className="bg-gradient-to-r from-premium-blue to-premium-purple"
                          >
                            View Details
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="hidden md:block">
                    <div className="bg-gradient-to-br from-white/80 to-white/50 p-6 rounded-xl border border-border/20 shadow-lg overflow-hidden relative">
                      <div className="absolute right-0 bottom-0 w-20 h-20 bg-gradient-to-br from-premium-blue/10 to-premium-purple/20 rounded-full blur-xl"></div>
                      <div className="relative">
                        <h3 className="font-semibold mb-2">AI Actions for {step.title}</h3>
                        <ul className="space-y-2">
                          {Array.from({length: 4}, (_, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <ChevronRight className="h-4 w-4 text-premium-blue mt-0.5" />
                              <span className="text-sm">
                                {i === 0 && "Generate comprehensive analysis"}
                                {i === 1 && "Synthesize insights from data"}
                                {i === 2 && "Prepare visualization & reports"}
                                {i === 3 && "Ready checkpoints for review"}
                              </span>
                            </li>
                          ))}
                        </ul>
                        
                        <div className="mt-4 p-3 bg-premium-blue/5 rounded-lg border border-premium-blue/20">
                          <h4 className="text-sm font-medium mb-1">Current Status</h4>
                          <p className="text-xs text-muted-foreground">
                            {step.progress === 100 ? "Completed and approved" : 
                             step.progress > 0 ? "In progress - awaiting review" : 
                             "Not started - previous steps required"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Step Details Dialog */}
      <Dialog open={showStepDialog} onOpenChange={setShowStepDialog}>
        <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden premium-card">
          {selectedStep && (
            <>
              <div className={`p-4 bg-gradient-to-r ${selectedStep.color} text-white`}>
                <DialogTitle className="text-xl">{selectedStep.title}</DialogTitle>
                <DialogDescription className="text-white/70">
                  {selectedStep.description}
                </DialogDescription>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Checkpoint: {selectedStep.checkpoint}</h3>
                  <p className="text-sm text-muted-foreground">{selectedStep.checkpointDesc}</p>
                </div>
                
                <div className="bg-muted/10 p-4 rounded-lg border border-border/10">
                  <h4 className="font-medium mb-2">AI Generated Elements</h4>
                  <ul className="space-y-2">
                    {Array.from({length: 5}, (_, i) => (
                      <motion.li 
                        key={i} 
                        className="flex items-start gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <CheckCircle className="h-4 w-4 text-premium-teal mt-0.5" />
                        <span className="text-sm">
                          {selectedStep.id === 'input' && [
                            "Product/service description document",
                            "Target audience definition",
                            "Marketing goals summary",
                            "Budget allocation recommendation",
                            "Project timeline outline"
                          ][i]}
                          {selectedStep.id === 'research' && [
                            "Market landscape analysis",
                            "Competitor comparison table",
                            "Audience persona profiles",
                            "Legal/compliance report",
                            "Supply chain assessment"
                          ][i]}
                          {selectedStep.id === 'plan' && [
                            "Marketing goals document",
                            "Budget allocation breakdown",
                            "Timeline with milestones",
                            "Pricing strategy recommendations",
                            "Distribution channel analysis"
                          ][i]}
                          {selectedStep.id === 'strategize' && [
                            "Brand identity guidelines",
                            "Channel strategy document",
                            "Content calendar template",
                            "Customer engagement playbook",
                            "Sales funnel visualization"
                          ][i]}
                          {selectedStep.id === 'setup' && [
                            "Brand assets package",
                            "Website wireframes/mockups",
                            "Social media profile templates",
                            "CRM setup documentation",
                            "Marketing collateral designs"
                          ][i]}
                          {selectedStep.id === 'execute' && [
                            "Ad campaign drafts",
                            "Content batch ready for review",
                            "Automation workflow setup",
                            "Partner/influencer outreach plan",
                            "Event proposal documentation"
                          ][i]}
                          {selectedStep.id === 'monitor' && [
                            "Performance dashboard setup",
                            "KPI tracking system",
                            "Customer feedback collection",
                            "Competitor movement alerts",
                            "Weekly report templates"
                          ][i]}
                          {selectedStep.id === 'optimize' && [
                            "Strategy adjustment recommendations",
                            "New audience segment opportunities",
                            "Advanced partnership proposals",
                            "Scaling plan with projections",
                            "Next quarter planning document"
                          ][i]}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="border border-border/10 rounded-lg p-4 bg-premium-blue/5">
                  <h4 className="font-medium mb-2">Next Steps</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedStep.progress === 100 
                      ? "This step is complete. You can proceed to the next step or review the generated materials."
                      : selectedStep.progress > 0 
                        ? "Review the current progress and approve to proceed or request revisions."
                        : "Previous steps must be completed before this step can begin."}
                  </p>
                </div>
              </div>
              
              <DialogFooter className="p-4 border-t border-border/10 bg-muted/10">
                <Button 
                  variant="outline" 
                  onClick={() => setShowStepDialog(false)}
                  className="border-border/30 bg-white"
                >
                  Close
                </Button>
                {selectedStep.progress > 0 && (
                  <>
                    <Button 
                      variant="outline"
                      onClick={handleReviseStep}
                      className="border-premium-orange/30 bg-premium-orange/5 text-premium-orange hover:bg-premium-orange/10"
                    >
                      Request Revisions
                    </Button>
                    <Button 
                      onClick={handleApproveStep}
                      className="bg-gradient-to-r from-premium-blue to-premium-purple"
                    >
                      Approve & Proceed
                    </Button>
                  </>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
