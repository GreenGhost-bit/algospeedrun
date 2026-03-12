import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import { AppWalletProvider } from '@/components/wallet-provider'

import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
})

export const metadata: Metadata = {
  title: 'AlgoSpeed Arena - Master the Borderless Economy',
  description:
    'A gamified learning DApp for Algorand developers. Master blockchain development one block at a time.',
}

export const viewport: Viewport = {
  themeColor: '#7C3AED',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        <AppWalletProvider>
          {children}
        </AppWalletProvider>
        <Toaster />
      </body>
    </html>
  )
}
