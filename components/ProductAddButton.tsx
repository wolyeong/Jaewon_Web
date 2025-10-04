// components/ProductAddButton.tsx
'use client'

import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'

export default function ProductAddButton() {
  const { data: session } = useSession()

  // 세션에 유저 정보가 있을 때만 접근
  const userType = session?.user?.user_type
  console.log('ProductAddButton 호출 성공', userType)
  // user_type이 admin이 아닐 경우 버튼 숨김
  if (userType === 'admin') {
    return (
      <Button
        onClick={() => console.log('상품 추가 페이지로 이동')}
        className="bg-blue-600 text-white hover:bg-blue-700"
      >
        상품 추가하기
      </Button>
    )
  }

  return null
}
