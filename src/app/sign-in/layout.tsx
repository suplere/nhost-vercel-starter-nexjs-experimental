'use client';

import { Loader } from '@/components/common/Loader';
import { useAuthenticationStatus } from '@nhost/nextjs';
import { useRouter } from 'next/navigation';
import { DetailedHTMLProps, HTMLProps, useEffect } from 'react';

export interface UnauthenticatedLayoutProps
  extends DetailedHTMLProps<HTMLProps<HTMLDivElement>, HTMLDivElement> {
  /**
   * The title of the page
   */
  title?: string;
  /**
   * Props passed to the main container.
   */
  mainContainerProps?: DetailedHTMLProps<
    HTMLProps<HTMLDivElement>,
    HTMLDivElement
  >;
}

export default function UnauthenticatedLayout({
  children,
  ...props
}: UnauthenticatedLayoutProps) {
  const router = useRouter();
  const { isLoading, isAuthenticated } = useAuthenticationStatus();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || isAuthenticated) {
    return (
      <p className="grid justify-start grid-flow-col gap-1">
        <Loader /> Loading user...
      </p>
    );
  }

  return <div {...props}>{children}</div>;
}
