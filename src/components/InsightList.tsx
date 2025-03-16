
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Activity } from 'lucide-react';
import { MarketingInsight } from '@/services/api';

interface InsightListProps {
  insights: MarketingInsight[];
  loading: boolean;
}

export const InsightList: React.FC<InsightListProps> = ({ insights, loading }) => {
  return (
    <Card className="premium-card">
      <CardContent className="p-6 space-y-4">
        {loading ? (
          <div className="space-y-4">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="animate-pulse space-y-2">
                <div className="h-5 w-3/4 bg-muted/50 rounded"></div>
                <div className="h-4 w-1/2 bg-muted/50 rounded"></div>
                <div className="h-3 w-full bg-muted/50 rounded"></div>
              </div>
            ))}
          </div>
        ) : insights.length > 0 ? (
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <motion.div 
                key={insight.id} 
                className="border-b border-border/10 pb-4 last:border-0 last:pb-0"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-medium">{insight.title}</h3>
                  <Badge variant={
                    insight.impact === 'high' ? 'default' :
                    insight.impact === 'medium' ? 'default' :
                    'outline'
                  } className={`text-xs whitespace-nowrap ${
                    insight.impact === 'high' ? 'bg-premium-pink border-0' :
                    insight.impact === 'medium' ? 'bg-premium-blue border-0' :
                    'border-border/30 bg-white/80'
                  }`}>
                    {insight.impact} impact
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <Badge variant="secondary" className="text-xs bg-white/90 text-foreground border border-border/20">
                    {insight.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {new Date(insight.date).toLocaleDateString()}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <div className="bg-muted/10 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-3">
              <Activity className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No insights available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
