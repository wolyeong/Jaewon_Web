// components/ProductAddButton.tsx
'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import ProductAddModal from './ProductAddModal'

interface ProductAddButtonProps {
  onAdded?: () => void // 부모에게 갱신 콜백 전달 가능
}

export default function ProductAddButton({ onAdded }: ProductAddButtonProps) {
  const { data: session } = useSession()
  const [open, setOpen] = useState(false) // 모달 열림/닫힘 상태

  const userType = session?.user?.user_type

  // admin만 버튼 표시
  if (userType === 'admin') {
    return (
      <>
        <Button onClick={() => setOpen(true)} className="bg-black/90 text-white hover:bg-black">
          상품 추가하기
        </Button>

        {/* 모달 컴포넌트 */}
        {open && (
          <ProductAddModal
            onClose={() => setOpen(false)}
            onAdded={() => {
              onAdded?.() // 부모 콜백 호출
              setOpen(false) // 모달 닫기
            }}
          />
        )}
      </>
    )
  }

  return null
}
