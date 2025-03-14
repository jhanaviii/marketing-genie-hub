
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LiveTextProps {
  texts: string[];
  interval?: number;
  className?: string;
}

export function LiveText({ texts, interval = 3000, className }: LiveTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, interval);
    
    return () => clearInterval(timer);
  }, [texts.length, interval]);
  
  return (
    <div className="h-8 relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={className}
        >
          {texts[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export function TypewriterText({ texts, interval = 5000, className }: LiveTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  
  useEffect(() => {
    const typingTimer = setInterval(() => {
      setIsTyping((prev) => !prev);
    }, interval / 2);
    
    const textTimer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
      setIsTyping(true);
    }, interval);
    
    return () => {
      clearInterval(typingTimer);
      clearInterval(textTimer);
    };
  }, [texts.length, interval]);
  
  return (
    <div className="h-8 relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ width: 0 }}
          animate={{ 
            width: isTyping ? "100%" : "100%",
            transition: { 
              duration: isTyping ? interval / 3000 : 0,
              ease: "easeInOut" 
            }
          }}
          className="overflow-hidden whitespace-nowrap"
        >
          <span className={className}>{texts[currentIndex]}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
