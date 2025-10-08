'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'

interface CartItem {
  product: { _id: string; name: string; price: number }
  quantity: number
}

interface PurchaseModalProps {
  cartItems: CartItem[]
  balance: number
  open: boolean
  setOpen: (open: boolean) => void
  onPurchase: () => void
}

export default function PurchaseModal({ cartItems, balance, open, setOpen, onPurchase }: PurchaseModalProps) {
  const totalPrice = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const canPurchase = balance >= totalPrice

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>구매 확인</DialogTitle>
        </DialogHeader>

        <p>
          현재 잔고: <span className="font-semibold">{balance.toLocaleString()}원</span>
        </p>
        <p>
          총 금액: <span className="font-semibold">{totalPrice.toLocaleString()}원</span>
        </p>
        {!canPurchase && <p className="mt-2 text-red-500">잔고가 부족합니다!</p>}

        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            취소
          </Button>
          {canPurchase ? (
            <Button onClick={onPurchase}>구매하기</Button>
          ) : (
            <Button onClick={() => alert('충전 기능 준비중')}>금액 충전</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
