
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LiveCounterProps {
  endValue: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  intervalUpdate?: boolean;
  updateInterval?: number;
  minChange?: number;
  maxChange?: number;
}

export function LiveCounter({
  endValue,
  prefix = "",
  suffix = "",
  duration = 2000,
  className,
  intervalUpdate = false,
  updateInterval = 3000,
  minChange = 1,
  maxChange = 5
}: LiveCounterProps) {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(endValue);

  // Initial animation
  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * endValue));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(endValue);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [endValue, duration]);

  // Periodic updates if enabled
  useEffect(() => {
    if (!intervalUpdate) return;
    
    const interval = setInterval(() => {
      const change = Math.floor(Math.random() * (maxChange - minChange + 1)) + minChange;
      // 50% chance to increase or decrease
      const newTarget = Math.random() > 0.7 
        ? target - change 
        : target + change;
        
      setTarget(newTarget);
      
      // Animate to new value
      let startTimestamp: number | null = null;
      const startCount = count;
      const diff = newTarget - startCount;
      
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / 1000, 1);
        setCount(Math.floor(startCount + (diff * progress)));
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      
      window.requestAnimationFrame(step);
    }, updateInterval);
    
    return () => clearInterval(interval);
  }, [count, target, intervalUpdate, updateInterval, minChange, maxChange]);

  return (
    <motion.div 
      className={className}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {prefix}{count.toLocaleString()}{suffix}
    </motion.div>
  );
}

export function PulsingLiveIndicator({ className }: { className?: string }) {
  return (
    <div className={`relative flex items-center ${className}`}>
      <div className="mr-2 relative">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping opacity-75"></div>
      </div>
      <span className="text-xs font-medium">Live</span>
    </div>
  );
}
