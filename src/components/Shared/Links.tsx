/* eslint-disable */
import React, { JSX, useEffect } from 'react';
import { useCallback } from 'react';
import { usePathname } from 'next/navigation';
import NavLink from './Navlink';
import DashIcon from './DashIcon';
import { RoutesType } from '@/src/app/types/navigation';

export const SidebarLinks = (props: { routes: RoutesType[] }): JSX.Element => {
    // Chakra color mode
    const pathname = usePathname();

    const { routes } = props;

    // verifies if routeName is the one active (in browser input)
    const activeRoute = useCallback(
        (routeName: string) => {
            return pathname?.includes(routeName);
        },
        [pathname],
    );

    const createLinks = (routes: RoutesType[]) => {
        return routes.map((route, index) => {
            if (
                route.layout === '/dashboard'
            ) {
                return (
                    <NavLink key={index} href={route.layout + '/' + route.path}>
                        <div className="relative mb-8 flex hover:cursor-pointer text-xs">
                            <li
                                className="my-[3px] flex cursor-pointer items-center px-8"
                                key={index}
                            >
                                <span
                                    className={`${activeRoute(route.path) === true
                                            ? 'font-bold text-white'
                                            : 'font-medium text-[#E8E6DF]'
                                        }`}
                                >
                                    {route.icon ? route.icon : <DashIcon />}{' '}
                                </span>
                                <p
                                    className={`ml-2 flex ${activeRoute(route.path) === true
                                            ? 'font-bold text-white'
                                            : 'font-medium text-[#E8E6DF]'
                                        }`}
                                >
                                    {route.name}
                                </p>
                            </li>
                            {activeRoute(route.path) ? (
                                <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-[#0078D4]" />
                            ) : null}
                        </div>
                    </NavLink>
                );
            }
        });
    };
    // BRAND
    return <>{createLinks(routes)}</>;
};

export default SidebarLinks;