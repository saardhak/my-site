import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import React, { useEffect, useState, useCallback } from 'react';
import SecretDashboard from "@/components/secret-dashboard";

function App() {
  const [showDashboard, setShowDashboard] = useState(false);
  const [isBhrugubanda, setIsBhrugubanda] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [ballTheme, setBallTheme] = useState('pastel');

  // Handler to detect overscroll at top
  const handleWheel = useCallback((e: WheelEvent) => {
    if (window.scrollY === 0 && e.deltaY < 0 && !showDashboard && isBhrugubanda) {
      setShowDashboard(true);
      setShowBanner(true);
      setTimeout(() => setShowBanner(false), 3000);
    }
  }, [showDashboard, isBhrugubanda]);

  // Touch overscroll detection
  useEffect(() => {
    let startY = 0;
    let atTop = false;
    function onTouchStart(e: TouchEvent) {
      startY = e.touches[0].clientY;
      atTop = window.scrollY === 0;
    }
    function onTouchMove(e: TouchEvent) {
      if (atTop && e.touches[0].clientY - startY > 30 && !showDashboard && isBhrugubanda) {
        setShowDashboard(true);
        setShowBanner(true);
        setTimeout(() => setShowBanner(false), 3000);
      }
    }
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [handleWheel, showDashboard, isBhrugubanda]);

  // Hide dashboard on scroll down
  useEffect(() => {
    if (!showDashboard) return;
    function onScroll() {
      if (window.scrollY > 0) {
        setShowDashboard(false);
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [showDashboard]);

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  const handleBackFromDashboard = () => {
    setShowDashboard(false);
  };
  const handleToggleDarkMode = () => setDarkMode(d => !d);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        {showDashboard && <SecretDashboard onBack={handleBackFromDashboard} darkMode={darkMode} onToggleDarkMode={handleToggleDarkMode} showBanner={showBanner} ballTheme={ballTheme} onThemeChange={setBallTheme} />}
        <Home onFlipChange={setIsBhrugubanda} ballTheme={ballTheme} />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
