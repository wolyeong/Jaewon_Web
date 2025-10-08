'use client'

import { useSession } from 'next-auth/react'
import { ReactNode } from 'react'

interface AuthWrapperProps {
  children: ReactNode
  onLoginRedirect?: () => void // 로그인 페이지 이동 함수
}

export default function AuthWrapper({ children, onLoginRedirect }: AuthWrapperProps) {
  const { data: session } = useSession()

  const handleClick = (e: React.MouseEvent) => {
    if (!session) {
      e.preventDefault() // a 태그나 버튼 기본 동작 막기
      alert('로그인 후 이용해 주세요.')
      if (onLoginRedirect) onLoginRedirect()
    }
  }

  return (
    <div onClick={handleClick} className="inline-block">
      {children}
    </div>
  )
}
