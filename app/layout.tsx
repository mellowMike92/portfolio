import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Michael Issa | Staff Full-Stack & AI Product Engineer',
  description:
    'AI-native fullstack product engineer with 10+ years of experience building 0->1 platforms, high-throughput React/TypeScript dashboards, and Model Context Protocol integrations.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 antialiased">
        <div className="bg-mesh fixed inset-0 -z-10" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
