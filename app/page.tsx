// app/page.tsx
'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import localFont from 'next/font/local'

const geistSans = localFont({ src: './fonts/GeistVF.woff', variable: '--font-geist-sans', weight: '100 900' })
const geistMono = localFont({ src: './fonts/GeistMonoVF.woff', variable: '--font-geist-mono', weight: '100 900' })

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()

  console.log('status in page.tsx:', status)
  console.log('session in page.tsx:', session)

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} p-4 antialiased`}>
      <nav className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">홈 페이지</h1>
        {!session ? (
          <>
            <button
              onClick={() => router.push('/signin')}
              className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
            >
              로그인
            </button>
            <button
              onClick={() => router.push('/signup')}
              className="rounded bg-green-500 px-3 py-1 text-white hover:bg-green-600"
            >
              회원가입
            </button>
          </>
        ) : (
          <>
            <span className="ml-4">{session.user?.name}님 환영합니다!</span>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="ml-4 rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
            >
              로그아웃
            </button>
          </>
        )}
      </nav>
    </div>
  )
}
