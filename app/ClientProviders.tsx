'use client'
import { SessionProvider } from 'next-auth/react'
import localFont from 'next/font/local'

const geistSans = localFont({ src: './fonts/GeistVF.woff', variable: '--font-geist-sans', weight: '100 900' })
const geistMono = localFont({ src: './fonts/GeistMonoVF.woff', variable: '--font-geist-mono', weight: '100 900' })

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</div>
    </SessionProvider>
  )
}
