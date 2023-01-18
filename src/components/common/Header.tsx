'use client';
import { useAuthenticationStatus, useSignOut } from '@nhost/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

export function Header() {
  const pathName = usePathname();

  const { isLoading, isAuthenticated } = useAuthenticationStatus();
  const { signOut } = useSignOut();

  return (
    <header className="sticky border-b bg-header border-b-brd">
      <div className="flex flex-row max-w-5xl p-4 mx-auto place-content-between">
        <Link
          href="/"
          passHref
          className="self-center font-medium text-white text-md hover:underline"
        >
          Conference Template
        </Link>

        <nav
          className="self-center hidden md:block"
          aria-label="Main navigation"
        >
          <ul className="grid items-center w-full grid-flow-col gap-2 text-sm font-medium list-none text-list">
            <li
              className={twMerge(
                'hover:text-white',
                pathName === '/' && 'text-white',
              )}
            >
              <Link href="/" passHref className="px-2">
                Home
              </Link>
            </li>

            <li
              className={twMerge(
                'hover:text-white',
                pathName === '/speakers' && 'text-white',
              )}
            >
              <Link href="/speakers" passHref className="px-2">
                Speakers
              </Link>
            </li>

            <li
              className={twMerge(
                'hover:text-white',
                pathName === '/talks' && 'text-white',
              )}
            >
              <Link href="/talks" passHref className="px-2">
                Talks
              </Link>
            </li>

            <li
              className={twMerge(
                'hover:text-white',
                pathName === '/about' && 'text-white',
              )}
            >
              <Link href="/about" passHref className="px-2">
                About
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex">
          {isAuthenticated && (
            <div className="grid items-center grid-flow-col gap-2 md:gap-4">
              <button
                onClick={signOut}
                className="flex items-center self-end justify-center w-full px-2 py-1 text-xs transition-colors duration-200 border rounded-md text-list hover:border-white hover:text-white border-list"
              >
                Sign Out
              </button>
            </div>
          )}

          {!isAuthenticated && !isLoading && (
            <div className="grid items-center grid-flow-col gap-2 md:gap-4">
              <Link
                href="/sign-in"
                passHref
                className="flex items-center self-end justify-center w-full px-2 py-1 text-xs transition-colors duration-200 border rounded-md text-list hover:border-white hover:text-white border-list"
              >
                Sign In
              </Link>
            </div>
          )}

          {isLoading && <div className="w-16" />}
        </div>
      </div>
    </header>
  );
}
