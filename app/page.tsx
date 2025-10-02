// import Image from 'next/image' //메인 페이지
'use client'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()
  console.log('status in page.tsx:', status)
  console.log('session in page.tsx:', session)
  return (
    <nav className="flex gap-3">
      {!session ? (
        <>
          <h1>홈 페이지</h1>
          <button onClick={() => router.push('/signin')}>로그인</button>
          <button onClick={() => router.push('/signup')}>회원가입</button>
        </>
      ) : (
        <>
          <h1>홈 페이지</h1>
          <span>{session?.user?.name}님 환영합니다!</span>
          <button onClick={() => signOut({ callbackUrl: '/' })}>로그아웃</button>
        </>
      )}
    </nav>
  )
}
