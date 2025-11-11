// app/layout.tsx (서버 컴포넌트)
import type { Metadata } from 'next'
import './globals.css'
import ClientProviders from './ClientProviders'

export const metadata: Metadata = {
  title: 'DeepAiBit | AI-Powered Data Systems',
  openGraph: {
    title: 'DeepAiBit | AI-Powered Data Systems',
    description:
      'DeepAiBit is an AI-driven digital healthcare company dedicated to designing healthier lifestyles for everyone.',
    images: [
      {
        url: 'https://jaewonstore.vercel.app/metadata_image.png',
        width: 1200,
        height: 630,
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
