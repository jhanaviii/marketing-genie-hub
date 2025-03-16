
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Play, Pause, Activity, BarChart3 } from 'lucide-react';
import { toast } from "sonner";
import { MarketingCampaign } from '@/services/api';

interface CampaignListProps {
  campaigns: MarketingCampaign[];
  loading: boolean;
}

export const CampaignList: React.FC<CampaignListProps> = ({ campaigns, loading }) => {
  // Handle campaign status change
  const handleCampaignStatusChange = (campaignId: string, newStatus: 'active' | 'paused') => {
    // This would normally call an API to update the campaign status
    if (newStatus === 'active') {
      toast.success(`Campaign activated successfully!`);
    } else {
      toast.info(`Campaign paused successfully!`);
    }
  };

  return (
    <Card className="premium-card overflow-visible">
      <CardContent className="p-6 space-y-6">
        {loading ? (
          <div className="space-y-4">
            {Array(2).fill(0).map((_, i) => (
              <div key={i} className="animate-pulse space-y-2 border-b border-border/10 pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between">
                  <div className="h-5 w-1/3 bg-muted/50 rounded"></div>
                  <div className="h-5 w-20 bg-muted/50 rounded"></div>
                </div>
                <div className="h-4 w-1/4 bg-muted/50 rounded"></div>
                <div className="h-3 w-full bg-muted/50 rounded mt-3"></div>
              </div>
            ))}
          </div>
        ) : campaigns.length > 0 ? (
          <div className="space-y-6">
            {campaigns.map((campaign) => (
              <motion.div 
                key={campaign.id} 
                className="border-b border-border/10 pb-4 last:border-0 last:pb-0"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ 
                  backgroundColor: "rgba(255, 255, 255, 0.5)", 
                  borderRadius: "0.5rem",
                  transition: { duration: 0.2 }
                }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{campaign.name}</h3>
                    <p className="text-sm text-muted-foreground">Budget: ${campaign.budget.toLocaleString()}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={
                      campaign.status === 'active' ? 'default' :
                      campaign.status === 'draft' ? 'outline' :
                      campaign.status === 'completed' ? 'secondary' :
                      'destructive'
                    } className={
                      campaign.status === 'active' ? 'bg-premium-teal border-0' :
                      campaign.status === 'draft' ? 'border-border/30 bg-white/80' :
                      campaign.status === 'completed' ? 'bg-premium-blue border-0' :
                      'bg-premium-orange border-0'
                    }>
                      {campaign.status}
                    </Badge>
                    {campaign.status === 'active' ? (
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button 
                          size="icon" 
                          variant="outline" 
                          className="h-6 w-6 border-border/30 bg-white hover:bg-premium-orange/5" 
                          onClick={() => handleCampaignStatusChange(campaign.id, 'paused')}
                        >
                          <Pause className="h-3 w-3" />
                        </Button>
                      </motion.div>
                    ) : campaign.status === 'paused' || campaign.status === 'draft' ? (
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button 
                          size="icon" 
                          variant="outline" 
                          className="h-6 w-6 border-border/30 bg-white hover:bg-premium-teal/5" 
                          onClick={() => handleCampaignStatusChange(campaign.id, 'active')}
                        >
                          <Play className="h-3 w-3" />
                        </Button>
                      </motion.div>
                    ) : null}
                  </div>
                </div>
                
                {campaign.status !== 'draft' && (
                  <div className="mt-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Performance</span>
                      <span className="font-medium">{campaign.performance}%</span>
                    </div>
                    <Progress 
                      value={campaign.performance} 
                      className="h-1.5 rounded-full overflow-hidden bg-muted/30"
                      indicatorClassName={
                        campaign.performance > 75 ? "bg-gradient-to-r from-premium-blue to-premium-teal" :
                        campaign.performance > 50 ? "bg-gradient-to-r from-premium-indigo to-premium-blue" :
                        "bg-gradient-to-r from-premium-orange to-premium-pink"
                      }
                    />
                  </div>
                )}
                
                <div className="mt-3 flex flex-wrap gap-1">
                  {campaign.channels.map((channel, i) => (
                    <Badge key={i} variant="secondary" className="text-xs bg-white/90 text-foreground border border-border/20">
                      {channel}
                    </Badge>
                  ))}
                </div>
                
                <motion.div 
                  className="mt-3 text-xs text-primary flex items-center gap-1 cursor-pointer w-fit"
                  whileHover={{ x: 3 }}
                  onClick={() => toast.info(`Viewing details for campaign: ${campaign.name}`)}
                >
                  <span>View campaign details</span>
                  <Activity className="h-3 w-3" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <div className="bg-muted/10 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-3">
              <BarChart3 className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No active campaigns</p>
            <Button 
              variant="outline" 
              className="mt-4 border-border/30 bg-white hover:bg-primary/5"
              onClick={() => toast.info("Create campaign dialog would open here")}
            >
              Create Campaign
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
