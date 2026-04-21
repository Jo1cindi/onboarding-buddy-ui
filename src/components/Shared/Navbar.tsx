"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { findBreadcrumbs } from "@/src/app/utils/navigation";
import routes from "@/src/routes";
import { useEffect } from "react";
import { FaChevronRight, FaBars } from "react-icons/fa";

interface NavbarProps {
  onMenuClick?: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const pathname = usePathname();
  const breadcrumbs = findBreadcrumbs(routes, pathname);

  useEffect(() => {
    console.log("breadcrumbs", breadcrumbs);
  });

  return (
    <div className="w-full bg-gradient-to-r from-[#0078d4] to-[#c03bc4] px-4 sm:px-8 py-4 flex items-center justify-between gap-4">

      {/* Hamburger — mobile/tablet only */}
      <button
        onClick={onMenuClick}
        className="lg:hidden flex-shrink-0 text-white opacity-80 hover:opacity-100 transition-opacity"
        aria-label="Toggle menu"
      >
        <FaBars size={20} />
      </button>

      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm sm:text-base text-white flex-1 min-w-0 overflow-hidden">
        <Link href="/" className="opacity-80 hover:opacity-100 flex-shrink-0">
          <span className="hidden sm:inline">Onboarding Buddy Program</span>
          <span className="sm:hidden">Home</span>
        </Link>

        {breadcrumbs.map((route, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <span key={route.href} className="flex items-center min-w-0">
              <FaChevronRight size={10} className="mx-1 flex-shrink-0 opacity-60" />

              {isLast ? (
                <span className="font-medium truncate">{route.name}</span>
              ) : (
                <Link
                  href={route.path}
                  className="opacity-80 hover:opacity-100 truncate hidden sm:inline"
                >
                  {route.name}
                </Link>
              )}
            </span>
          );
        })}
      </nav>

      {/* Last sync — hidden on mobile */}
      <div className="flex-shrink-0 hidden sm:block">
        <p className="text-white text-xs sm:text-sm whitespace-nowrap">
          Last sync: 13/04/2026 21:20
        </p>
      </div>

    </div>
  );
}