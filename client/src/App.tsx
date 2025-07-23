import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import React, { useEffect, useState, useCallback } from 'react';
import SecretPage from "@/components/secret-page";
import SecretHeroClock from "@/components/secret-hero-clock";

function App() {
  const [showSecret, setShowSecret] = useState(false);
  const [showClock, setShowClock] = useState(false);
  const [isBhrugubanda, setIsBhrugubanda] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Handler to detect overscroll at top
  const handleWheel = useCallback((e: WheelEvent) => {
    if (window.scrollY === 0 && e.deltaY < 0 && !showSecret && isBhrugubanda) {
      setShowSecret(true);
    }
  }, [showSecret, isBhrugubanda]);

  // Touch overscroll detection
  useEffect(() => {
    let startY = 0;
    let atTop = false;
    function onTouchStart(e: TouchEvent) {
      startY = e.touches[0].clientY;
      atTop = window.scrollY === 0;
    }
    function onTouchMove(e: TouchEvent) {
      if (atTop && e.touches[0].clientY - startY > 30 && !showSecret && isBhrugubanda) {
        setShowSecret(true);
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
  }, [handleWheel, showSecret, isBhrugubanda]);

  // Hide secret page on scroll down
  useEffect(() => {
    if (!showSecret && !showClock) return;
    function onScroll() {
      if (window.scrollY > 0) {
        setShowSecret(false);
        setShowClock(false);
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [showSecret, showClock]);

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  const handleShowClock = () => {
    setShowSecret(false);
    setShowClock(true);
  };
  const handleBackFromClock = () => {
    setShowClock(false);
    setShowSecret(true);
  };
  const handleToggleDarkMode = () => setDarkMode(d => !d);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        {showSecret && <SecretPage onClose={() => setShowSecret(false)} onShowClock={handleShowClock} darkMode={darkMode} onToggleDarkMode={handleToggleDarkMode} />}
        {showClock && <SecretHeroClock onBack={handleBackFromClock} />}
        <Home onFlipChange={setIsBhrugubanda} />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
