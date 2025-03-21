
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import { Toaster } from "./components/ui/sonner";
import { MarketingProvider } from '@/context/MarketingContext';
import { AIProvider } from '@/context/AIContext';

const App: React.FC = () => {
  return (
    <AIProvider>
      <MarketingProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster position="top-right" />
        </Router>
      </MarketingProvider>
    </AIProvider>
  );
};

export default App;
