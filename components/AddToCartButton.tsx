'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'

interface AddToCartButtonProps {
  productId: string
  stock: number
  children?: React.ReactNode
}

export default function AddToCartButton({ productId, stock, children }: AddToCartButtonProps) {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)

  const handleAddToCart = async () => {
    if (!session?.user?.nickname) {
      alert('로그인 후 이용 가능합니다.')
      return
    }

    if (stock <= 0) {
      alert('재고가 없습니다.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/cart/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, nickname: session.user.nickname }),
      })
      const data = await res.json()
      if (res.ok) {
        alert('장바구니에 추가되었습니다.')
      } else {
        alert(data.message || '장바구니 추가 실패')
      }
    } catch (err) {
      console.error(err)
      alert('장바구니 추가 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button className="w-full" onClick={handleAddToCart} disabled={stock <= 0}>
      {stock <= 0 ? '품절' : loading ? '장바구니에 담는 중...' : children || '장바구니 담기'}
    </Button>
  )
}
