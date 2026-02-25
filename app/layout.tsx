import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Courier_Prime } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const courierPrime = Courier_Prime({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-courier-prime',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'AI.TELIER - Tools',
  description: 'AI-powered luxury fashion design tools',
}

export const viewport: Viewport = {
  themeColor: '#F0EDE8',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${courierPrime.variable} font-mono antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
