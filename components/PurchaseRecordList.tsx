'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface PurchaseItem {
  productId: string
  name: string
  price: number
  quantity: number
}

interface RecordType {
  _id: string
  nickname: string
  items: PurchaseItem[]
  totalPrice: number
  createdAt: string
}

export default function PurchaseHistory() {
  const { data: session } = useSession()
  const [records, setRecords] = useState<RecordType[]>([])
  const [selectedRecord, setSelectedRecord] = useState<RecordType | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const fetchRecords = async () => {
      if (!session?.user?.nickname) return
      try {
        const res = await fetch(`/api/purchase/record/get?nickname=${encodeURIComponent(session.user.nickname)}`)
        const data = await res.json()
        setRecords(data)
      } catch (err) {
        console.error('구매 기록 불러오기 실패', err)
      }
    }
    fetchRecords()
  }, [session?.user?.nickname])

  return (
    <div className="p-6">
      <h2 className="mb-4 text-2xl font-bold">구매 기록</h2>
      {records.length === 0 && <p>구매 기록이 없습니다.</p>}

      <ul className="space-y-2">
        {records.map((record) => (
          <li
            key={record._id}
            className="cursor-pointer rounded border p-3 hover:bg-gray-100"
            onClick={() => {
              setSelectedRecord(record)
              setModalOpen(true)
            }}
          >
            {new Date(record.createdAt).toLocaleString()}
          </li>
        ))}
      </ul>

      {selectedRecord && (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>구매 상세</DialogTitle>
            </DialogHeader>

            <div className="space-y-2">
              {selectedRecord.items.map((item) => (
                <div key={item.productId} className="border-b pb-2">
                  <p>
                    <strong>상품명:</strong> {item.name}
                  </p>
                  <p>
                    <strong>가격:</strong> ₩{item.price.toLocaleString()}
                  </p>
                  <p>
                    <strong>수량:</strong> {item.quantity}
                  </p>
                </div>
              ))}
            </div>

            <DialogFooter>
              <Button onClick={() => setModalOpen(false)}>닫기</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
