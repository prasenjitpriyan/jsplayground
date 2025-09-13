import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from 'next-themes';
import { PlaygroundProvider } from '../lib/playground-context';
import './globals.css';

export const metadata: Metadata = {
  title: 'JavaScript Learning Playground',
  description:
    'Interactive JavaScript tutorial and reference with live code execution',
  keywords: [
    'JavaScript',
    'tutorial',
    'learning',
    'playground',
    'interactive',
    'coding',
    'programming',
  ],
  authors: [{ name: 'JavaScript Playground' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#111827" />
      </head>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
          themes={['light', 'dark', 'system']}>
          <PlaygroundProvider>{children}</PlaygroundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
