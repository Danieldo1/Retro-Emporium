import type { Metadata } from 'next'
import { Roboto,Unbounded } from 'next/font/google'
import './globals.css'

const roboto = Roboto({ weight: ['400', '700'], subsets: ['latin'] })
const unbounded = Unbounded({ weight: ['400', '700'], subsets: ['latin'] })

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
    <html lang="en" className='h-full '>
      <body className={`${roboto.className} ${unbounded.className} relative h-full antialiased`}>
        <main className='relative flex flex-col min-h-screen'>
          <div className='flex-grow flex-1'>
          {children}
          </div>
        </main>
      </body>
    </html>
  )
}
