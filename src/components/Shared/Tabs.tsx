"use client";

import React, { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Tab {
  id: string;
  label: string;
  /** Optional icon rendered before the label */
  icon?: React.ReactNode;
  /** Optional badge count */
  badge?: number;
  /** Disable this tab */
  disabled?: boolean;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  /** Controlled: active tab id */
  activeTab?: string;
  /** Controlled: callback when tab changes */
  onTabChange?: (id: string) => void;
  /** Default active tab id (uncontrolled) */
  defaultTab?: string;
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Tabs({
  tabs,
  activeTab: controlledActive,
  onTabChange,
  defaultTab,
  className = "",
}: TabsProps) {
  const [internalActive, setInternalActive] = useState<string>(
    defaultTab ?? tabs[0]?.id ?? ""
  );

  const isControlled = controlledActive !== undefined;
  const active = isControlled ? controlledActive : internalActive;

  const handleSelect = (id: string) => {
    if (!isControlled) setInternalActive(id);
    onTabChange?.(id);
  };

  const activeTab = tabs.find((t) => t.id === active);

  return (
    <div className={`w-full font-sans ${className}`}>
      {/* Tab strip */}
      <div
        role="tablist"
        className="flex items-end gap-0 border-b border-[#0078D4]/25 overflow-x-auto"
        style={{ scrollbarWidth: "none" }}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              disabled={tab.disabled}
              onClick={() => !tab.disabled && handleSelect(tab.id)}
              className={[
                "relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all select-none outline-none",
                "focus-visible:ring-2 focus-visible:ring-[#0078D4] focus-visible:ring-offset-1 rounded-t-md",
                isActive
                  ? "text-[#0078D4] bg-[#0078D4]/5"
                  : tab.disabled
                  ? "text-[#454142]/30 cursor-not-allowed"
                  : "text-[#454142] hover:text-[#0078D4] hover:bg-[#0078D4]/5 cursor-pointer",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {/* Icon */}
              {tab.icon && (
                <span className="w-4 h-4 flex items-center justify-center shrink-0">
                  {tab.icon}
                </span>
              )}

              {/* Label */}
              {tab.label}

              {/* Badge */}
              {tab.badge !== undefined && (
                <span
                  className={[
                    "inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-semibold leading-none",
                    isActive
                      ? "bg-[#0078D4] text-white"
                      : "bg-[#454142]/15 text-[#454142]",
                  ].join(" ")}
                >
                  {tab.badge}
                </span>
              )}

              {/* Active indicator bar */}
              {isActive && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0078D4] rounded-t-full"
                  aria-hidden
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab panel */}
      {activeTab && (
        <div
          role="tabpanel"
          id={`tabpanel-${activeTab.id}`}
          aria-labelledby={activeTab.id}
          className="pt-4"
        >
          {activeTab.content}
        </div>
      )}
    </div>
  );
}