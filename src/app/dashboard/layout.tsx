'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import React from 'react';
import { isWindowAvailable } from '../utils/navigation';
import Navbar from '@/src/components/Shared/Navbar';
import SidebarHorizon from '@/src/components/Shared/SideBar';
import routes from '@/src/routes';

export default function Dashboard({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  if (isWindowAvailable()) document.documentElement.dir = 'ltr';

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      {/* Pass mobile toggle handler to Navbar */}
      <Navbar onMenuClick={() => setMobileOpen(prev => !prev)} />

      <div className="flex flex-1 overflow-hidden relative">

        {/* Mobile Overlay */}
        {mobileOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`
            fixed lg:static inset-y-0 left-0 z-30
            w-[70%] sm:w-[50%] lg:w-[15%]
            h-full bg-black flex-shrink-0
            transform transition-transform duration-300 ease-in-out
            ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
            lg:translate-x-0
          `}
        >
          <SidebarHorizon
            routes={routes}
            open={open}
            setOpen={setOpen}
            onNavigate={() => setMobileOpen(false)}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-4 pt-[10px] md:p-8 bg-white h-full">
          {children}
        </div>

      </div>
    </div>
  );
}