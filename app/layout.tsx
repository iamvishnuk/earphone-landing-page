import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter, Roboto, Saira } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin']
});

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin']
});

const saira = Saira({
  variable: '--font-saira',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'Model XSR - Model Earphones',
  description: 'Model Earphones'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={cn(
        geistMono.variable,
        geistSans.variable,
        inter.variable,
        roboto.variable,
        saira.variable,
        'font-inter h-full antialiased'
      )}
    >
      <body className='m-h flex min-h-dvh w-full flex-col items-center overflow-x-hidden bg-white p-0 text-black'>
        {children}
      </body>
    </html>
  );
}
