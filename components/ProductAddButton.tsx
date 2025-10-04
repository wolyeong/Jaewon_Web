// components/ProductAddButton.tsx
'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import ProductAddModal from './ProductAddModal'

export default function ProductAddButton() {
  const { data: session } = useSession()
  const [open, setOpen] = useState(false) // 모달 열림/닫힘 상태
  // 세션에 유저 정보가 있을 때만 접근
  const userType = session?.user?.user_type
  console.log('ProductAddButton 호출 성공', userType)
  // user_type이 admin이 아닐 경우 버튼 숨김
  if (userType === 'admin') {
    return (
      <>
        <Button onClick={() => setOpen(true)} className="bg-black/90 text-white hover:bg-black">
          상품 추가하기
        </Button>

        {/* 모달 컴포넌트 */}
        {open && <ProductAddModal onClose={() => setOpen(false)} />}
      </>
    )
  }

  return null
}
