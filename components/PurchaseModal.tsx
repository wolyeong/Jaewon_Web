'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'

interface PurchaseItem {
  productId: string
  quantity: number
}

interface PurchaseModalProps {
  open: boolean
  setOpen: (open: boolean) => void
  totalPrice: number
  balance: number
  items: PurchaseItem[]
}

export default function PurchaseModal({ open, setOpen, totalPrice, balance, items }: PurchaseModalProps) {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const isEnough = balance >= totalPrice

  const handlePurchase = async () => {
    if (!session?.user?.nickname) {
      alert('로그인이 필요합니다.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/purchase/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nickname: session.user.nickname,
          totalPrice,
          items,
        }),
      })
      const walletRes = await fetch('/api/purchase/wallet/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname: session.user.nickname, totalPrice }),
      })

      const data = await res.json()
      const walletData = await walletRes.json()

      if (!res.ok) {
        alert(data.message || '구매 실패')
        return
      }

      alert('구매가 완료되었습니다!\n잔고: ₩' + walletData.wallet.toLocaleString())

      // 장바구니 비우기
      await fetch('/api/cart/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname: session.user.nickname, clearAll: true }),
      })
      window.location.reload()
      setOpen(false)
    } catch (error) {
      console.error(error)
      alert('구매 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>구매 확인</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 text-center">
          <p>
            현재 잔고: <b>₩{balance.toLocaleString()}</b>
          </p>
          <p>
            총 결제 금액: <b>₩{totalPrice.toLocaleString()}</b>
          </p>
          {!isEnough && <p className="text-red-500">잔고가 부족합니다.</p>}
        </div>

        <DialogFooter className="flex flex-col gap-2">
          <Button
            onClick={handlePurchase}
            disabled={!isEnough || loading}
            className={`w-full ${!isEnough ? 'bg-gray-400' : 'bg-black text-white hover:bg-black/80'}`}
          >
            {loading ? '결제 중...' : '구매하기'}
          </Button>

          {!isEnough && (
            <Button variant="outline" className="w-full">
              금액 충전하기
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
