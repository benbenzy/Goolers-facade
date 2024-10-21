import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './ui/globals.css';
import { AuthProvider } from './context/authContext';
import Providers from './helpers/providers';
import Footer from '@/components/ui/Footer';
import { Suspense } from 'react';
import { Toaster } from '@/components/ui/Toasts/toaster';
import Navbar from '@/components/ui/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Goolers Facade',
  description: 'dashboard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AuthProvider>
            {children}

            <Suspense>
              <Toaster />
            </Suspense>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
