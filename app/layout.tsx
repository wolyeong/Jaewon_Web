// app/layout.tsx (서버 컴포넌트)
import type { Metadata } from 'next'
import './globals.css'
import ClientProviders from './ClientProviders'

export const metadata: Metadata = {
  title: '제목',
  description: '설명',
  openGraph: {
    title: '온그래프 제목',
    description: '온그래프 설명',
    images: 'png/image.png',
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
