'use client'

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface PurchaseModalProps {
  open: boolean
  setOpen: (open: boolean) => void
  totalPrice: number
  balance: number
  onPurchase: () => void
}

export default function PurchaseModal({ open, setOpen, totalPrice, balance, onPurchase }: PurchaseModalProps) {
  const isEnough = balance >= totalPrice

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
        <DialogFooter className="flex justify-between">
          <Button
            onClick={onPurchase}
            disabled={!isEnough}
            className={`w-full ${!isEnough ? 'bg-gray-400' : 'bg-black text-white hover:bg-black/80'}`}
          >
            구매하기
          </Button>
          {!isEnough && (
            <Button variant="outline" className="mt-2 w-full">
              금액 충전하기
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
