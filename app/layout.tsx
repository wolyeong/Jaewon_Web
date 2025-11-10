// app/layout.tsx (서버 컴포넌트)
import type { Metadata } from 'next'
import './globals.css'
import ClientProviders from './ClientProviders'

export const metadata: Metadata = {
  openGraph: {
    title: 'DeepAiBit | AI-Powered Data Systems',
    description:
      'DeepAiBit is an AI-driven digital healthcare company dedicated to designing healthier lifestyles for everyone.',
    images: [
      {
        url: 'https://jaewonstore.vercel.app/image.png',
        alt: 'DeepAiBit 이미지',
      },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="h-full">
      <body className="h-full">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  )
}
