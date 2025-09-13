import type { Metadata } from 'next';
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
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <PlaygroundProvider>{children}</PlaygroundProvider>
      </body>
    </html>
  );
}
