// app/layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import SideNav from './_components/sideNav';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Personal Financial Planner',
    description: 'A planner that helps people track their finances',
    icons: [{ rel: "icon", url: "favicon.ico" }],
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body>
        <SideNav />
        {/*
          The main content should have some left margin to avoid
          overlapping with the fixed side nav
        */}
        <main style={{ marginLeft: '250px', padding: '1rem' }}>
            {children}
        </main>
        </body>
        </html>
    );
}
