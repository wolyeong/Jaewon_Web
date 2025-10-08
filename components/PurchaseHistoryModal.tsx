'use client'

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface PurchaseHistoryModalProps {
  open: boolean
  setOpen: (open: boolean) => void
  purchase: {
    totalPrice: number
    createdAt: string
    items: { productId: { name: string }; quantity: number }[]
  }
}

export default function PurchaseHistoryModal({ open, setOpen, purchase }: PurchaseHistoryModalProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>구매 상세 내역</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <p>{new Date(purchase.createdAt).toLocaleString()}</p>
          <p>총 금액: ₩{purchase.totalPrice.toLocaleString()}</p>
          <hr />
          <ul className="space-y-1">
            {purchase.items.map((item, i) => (
              <li key={i}>
                {item.productId.name} × {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  )
}
