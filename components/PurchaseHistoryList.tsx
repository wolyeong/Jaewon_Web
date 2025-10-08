'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import PurchaseHistoryModal from '@/components/PurchaseHistoryModal'

interface Purchase {
  _id: string
  totalPrice: number
  createdAt: string
  items: { productId: { name: string }; quantity: number }[]
}

export default function PurchaseHistoryList({ nickname }: { nickname: string }) {
  const [history, setHistory] = useState<Purchase[]>([])
  const [selected, setSelected] = useState<Purchase | null>(null)

  useEffect(() => {
    fetch(`/api/purchase_History?nickname=${nickname}`)
      .then((res) => res.json())
      .then((data) => setHistory(data.history))
  }, [nickname])

  return (
    <div className="space-y-3">
      <h2 className="mb-2 text-lg font-bold">구매 기록</h2>
      {history.map((h) => (
        <Button key={h._id} variant="outline" onClick={() => setSelected(h)} className="w-full justify-between">
          <span>{new Date(h.createdAt).toLocaleString()}</span>
          <span>₩{h.totalPrice.toLocaleString()}</span>
        </Button>
      ))}
      {selected && <PurchaseHistoryModal open={!!selected} setOpen={() => setSelected(null)} purchase={selected} />}
    </div>
  )
}
