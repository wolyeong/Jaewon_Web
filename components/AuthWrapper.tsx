'use client'

import { useSession } from 'next-auth/react'
import { ReactNode } from 'react'

interface AuthWrapperProps {
  children: ReactNode
  onLoginRedirect?: () => void // 로그인 페이지 이동 함수
  altMessage?: string // alt 메시지
}

export default function AuthWrapper({ children, onLoginRedirect, altMessage }: AuthWrapperProps) {
  const { data: session } = useSession()

  const handleClick = (e: React.MouseEvent) => {
    if (!session) {
      e.preventDefault() // a 태그나 버튼 기본 동작 막기
      alert(altMessage || '로그인 후 이용해 주세요.')
      if (onLoginRedirect) onLoginRedirect()
    }
  }

  return (
    <div onClick={handleClick} className="inline-block">
      {children}
    </div>
  )
}
