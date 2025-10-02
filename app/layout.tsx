// app/layout.tsx (서버 컴포넌트)
import './globals.css'
import ClientProviders from './ClientProviders'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  )
}
