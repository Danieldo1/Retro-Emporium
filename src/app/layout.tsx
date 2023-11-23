import type { Metadata } from 'next'
import { Roboto, Unbounded } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Providers from '@/components/Providers'

export const roboto = Roboto({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-roboto' })
export const unbounded = Unbounded({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-unbounded' })

export const metadata: Metadata = {
  title: 'Retro Emporium',
  description: 'Retro Emporium is an e-commerce platform that takes customers on a nostalgic journey through time. The websites design combines modern functionality with a retro aesthetic.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${roboto.variable} ${unbounded.variable} relative h-full antialiased`}>
        <main className="relative flex flex-col min-h-screen">
          <Providers>
            <Nav />
            <div className="flex-grow flex-1">
              {children}
            </div>
          </Providers>
        </main>
      </body>
    </html>
  )
}
