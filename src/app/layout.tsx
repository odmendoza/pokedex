import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import './pokemon-colors.css';
import Navbar from '@/components/navbar';
import Loader from '@/components/layout/loader';
import { CSSProperties } from 'react';
import { Toaster as SonnerToaster } from 'sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Pokédex',
    default: 'Pokédex',
  },
  description:
    'Find your favorite Pokémon or discover a new one with this interactive Pokédex. Explore detailed information for any Pokémon by searching directly, applying precise filters, or simply letting luck present you with a random one! This Pokédex is built using Next.js, TypeScript, and the PokeAPI, ensuring a fast and responsive experience.',
};

const override: CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  zIndex: 9999,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main>
          { children }
      <Loader override={ override } />
      <SonnerToaster richColors />
        </main>
      </body>
    </html>
  );
}
