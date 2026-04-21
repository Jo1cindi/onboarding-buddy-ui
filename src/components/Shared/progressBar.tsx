"use client";

import React from "react";

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
  height?: string;
}

export default function ProgressBar({ 
  current, 
  total, 
  label, 
  height = "h-2.5" 
}: ProgressBarProps) {
  
  // Calculate percentage safely
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;
  const clampedValue = Math.min(100, Math.max(0, percentage));

  // Color Logic
  const getBarColor = (p: number) => {
    if (p >= 80) return "bg-[#10A095]"; // Success
    if (p >= 40) return "bg-[#D4EC8E]"; // Warning
    return "bg-red-500";                // Low
  };

  const getTextColor = (p: number) => {
    if (p >= 80) return "text-[#10A095]";
    if (p >= 40) return "text-[#8BA347]"; 
    return "text-red-600";
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between items-end px-0.5">
        <div className="flex flex-col">
          {label && (
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#454142]/80">
              {label}
            </span>
          )}
          <span className="text-sm font-medium text-[#454142]">
            {current} <span className="text-[#454142]/80 font-normal">out of</span> {total} hires
          </span>
        </div>
        
        <span className={`text-sm font-black font-mono ${getTextColor(clampedValue)}`}>
          {clampedValue}%
        </span>
      </div>

      {/* Track */}
      <div className={`${height} w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden shadow-inner`}>
        {/* Fill */}
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-in-out ${getBarColor(clampedValue)}`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}