
import Router from 'next/router';
import { IRoute } from '../types/navigation';

// NextJS Requirement
export const isWindowAvailable = () => typeof window !== 'undefined';

export const findCurrentRoute = (
  routes: IRoute[],
  pathname: string,
): IRoute | null => {
  if (!isWindowAvailable()) return null;

  for (const route of routes) {
    if (route.items) {
      const found = findCurrentRoute(route.items, pathname);
      if (found) return found;
    }

    if (pathname?.match(route.path)) return route;
  }

  return null;
};

export const getActiveRoute = (routes: IRoute[], pathname: string): string => {
  const route = findCurrentRoute(routes, pathname);
  return route?.name || 'Main Dashboard';
};

export const getActiveNavbar = (
  routes: IRoute[],
  pathname: string,
): boolean => {
  const route = findCurrentRoute(routes, pathname);
  return route?.secondary ?? false;
};

export const getActiveNavbarText = (
  routes: IRoute[],
  pathname: string,
): string | boolean => {
  return getActiveRoute(routes, pathname) || false;
};

export const findBreadcrumbs = (
  routes: IRoute[],
  pathname: string,
  trail: IRoute[] = [],
): IRoute[] => {
  for (const route of routes) {
    const nextTrail = [...trail, route];

    if (route.items) {
      const found = findBreadcrumbs(route.items, pathname, nextTrail);
      if (found.length) return found;
    }

    if (route.path && pathname?.match(route.path)) {
      return nextTrail;
    }
  }

  return [];
};