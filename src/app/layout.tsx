import './globals.css';
import { twMerge } from 'tailwind-merge';
import { Providers } from './Providers';
import { Header } from '@/components/common/Header';
import { Inter } from '@next/font/google';

const inter = Inter({
  subsets: ['latin'],
  // default, can also use "swap" to ensure custom font always shows
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head />
      <body>
        <div className="min-h-screen bg-grid bg-header">
          <div className="text-white bg-header bg-grid">
            <Providers>
              <Header />

              <main
                // {...mainContainerProps}
                className={twMerge(
                  'max-w-5xl p-4 mx-auto',
                  // mainContainerProps?.className,
                )}
              >
                {children}
              </main>
            </Providers>
          </div>
        </div>
      </body>
    </html>
  );
}
