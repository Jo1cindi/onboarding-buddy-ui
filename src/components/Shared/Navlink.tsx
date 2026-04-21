'use client';

import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import {
  CSSProperties,
  PropsWithChildren,
  useMemo,
} from 'react';

export type NavLinkProps = PropsWithChildren &
  NextLinkProps & {
    className?: string;
    styles?: CSSProperties;
    borderRadius?: CSSProperties['borderRadius']; 
  };

function NavLink({
  className,
  children,
  styles,
  borderRadius,
  ...props
}: NavLinkProps) {
  const memoizedStyles = useMemo<CSSProperties>(
    () => ({
      ...styles,
      ...(borderRadius !== undefined && { borderRadius }),
    }),
    [borderRadius, styles],
  );

  return (
    <NextLink
      {...props}
      className={className}
      style={memoizedStyles}
    >
      {children}
    </NextLink>
  );
}

export default NavLink;