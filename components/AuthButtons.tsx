'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'

export default function AuthButtons() {
  const { data: session } = useSession()
  const router = useRouter()

  // 비로그인 상태
  if (!session) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={() => router.push('/signin')}>
          로그인
        </Button>
        <Button className="bg-black text-white hover:bg-gray-800" onClick={() => router.push('/signup')}>
          회원가입
        </Button>
      </div>
    )
  }

  // 로그인 상태
  return (
    <div className="flex items-center justify-end gap-2">
      <span className="hidden truncate text-right text-sm font-medium sm:inline-block">{session.user?.nickname}</span>
      <div className="flex flex-shrink-0 items-center">
        <span className="hidden text-sm font-medium sm:inline-block">님</span>
        <Button variant="secondary" onClick={() => signOut({ callbackUrl: '/' })} className="ml-1">
          로그아웃
        </Button>
      </div>
    </div>
  )
}
