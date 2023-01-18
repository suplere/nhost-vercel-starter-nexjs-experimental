'use client';
import { NhostProvider } from '@nhost/nextjs';
import { ReactNode, useEffect, useState } from 'react';
import { nhost } from '@/utils/nhost';

type ProviderProps = {
  children: ReactNode;
  placeholder?: ReactNode;
};

export function Providers({ children, ...props }: ProviderProps) {
  const [showChild, setShowChild] = useState(false);

  // Wait until after client-side hydration to show
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    // You can show some kind of placeholder UI here
    return props.placeholder ? <>{props.placeholder}</> : null;
  }
  return <NhostProvider nhost={nhost}>{children}</NhostProvider>;
}
