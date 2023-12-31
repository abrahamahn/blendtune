import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Blend',
  description: 'Music for Artists and Creators',
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}
