import React from 'react';

const StetPulseLogo = ({ className = "", size = "default" }: { className?: string; size?: "small" | "default" | "large" }) => {
  const sizeClasses = {
    small: "text-2xl",
    default: "text-4xl",
    large: "text-6xl"
  };

  const taglineSizeClasses = {
    small: "text-xs",
    default: "text-sm",
    large: "text-lg"
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className={`font-bold ${sizeClasses[size]} text-[#6A0DAD] leading-tight`}>
        StetPulse
      </div>
      <div className={`font-light ${taglineSizeClasses[size]} text-gray-600 dark:text-gray-400 mt-1`}>
        Sanitization Reimagined
      </div>
    </div>
  );
};

export default StetPulseLogo; 