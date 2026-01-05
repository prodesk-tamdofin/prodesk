import type { Metadata } from 'next';
import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Porba Bos',
  description: 'A playful one-page interaction.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white min-h-screen font-sans">
        {children}
      </body>
    </html>
  );
}
