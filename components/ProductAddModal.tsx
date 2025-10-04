'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface ProductAddModalProps {
  onClose: () => void
}

export default function ProductAddModal({ onClose }: ProductAddModalProps) {
  const [mounted, setMounted] = useState(false)
  const [productName, setProductName] = useState('')
  const [productImage, setProductImage] = useState('')
  const [stock, setStock] = useState(100)
  const [price, setPrice] = useState(1000)
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [recommended, setRecommended] = useState(false)
  const [specs, setSpecs] = useState('{}') // JSON 형태 입력

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleAddProduct = async () => {
    if (!productName.trim() || !productImage.trim()) {
      alert('상품 이름과 이미지 URL은 필수입니다.')
      return
    }

    let parsedSpecs: object = {}
    try {
      parsedSpecs = JSON.parse(specs)
    } catch {
      alert('상세 스펙은 올바른 JSON 형식이어야 합니다.')
      return
    }

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: productName,
          image: productImage,
          stock,
          price,
          category,
          description,
          recommended,
          specs: parsedSpecs,
        }),
      })

      if (!res.ok) throw new Error('상품 추가 실패')
      const data = await res.json()
      console.log('상품 추가 성공:', data)
      onClose()
    } catch (error) {
      console.error(error)
    }
  }

  if (!mounted) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">상품 추가</h2>

        <div className="grid gap-4">
          <div className="grid gap-1">
            <Label>상품 이름</Label>
            <Input value={productName} onChange={(e) => setProductName(e.target.value)} />
          </div>
          <div className="grid gap-1">
            <Label>상품 이미지(URL)</Label>
            <Input value={productImage} onChange={(e) => setProductImage(e.target.value)} />
          </div>
          <div className="grid gap-1">
            <Label>재고</Label>
            <Input type="number" value={stock} onChange={(e) => setStock(Number(e.target.value))} />
          </div>
          <div className="grid gap-1">
            <Label>가격(₩)</Label>
            <Input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
          </div>
          <div className="grid gap-1">
            <Label>카테고리</Label>
            <Input value={category} onChange={(e) => setCategory(e.target.value)} />
          </div>
          <div className="grid gap-1">
            <Label>상품 설명</Label>
            <Input value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="grid gap-1">
            <Label>추천 상품 여부</Label>
            <input type="checkbox" checked={recommended} onChange={(e) => setRecommended(e.target.checked)} />
          </div>
          <div className="grid gap-1">
            <Label>상세 스펙 (JSON)</Label>
            <Input value={specs} onChange={(e) => setSpecs(e.target.value)} placeholder='{"용량":"300g"}' />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button className="bg-green-600 text-white hover:bg-green-700" onClick={handleAddProduct}>
            추가
          </Button>
          <Button variant="ghost" onClick={onClose}>
            취소
          </Button>
        </div>
      </div>
    </div>,
    document.body
  )
}
