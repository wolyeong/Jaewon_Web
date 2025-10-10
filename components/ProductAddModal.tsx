'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface ProductAddModalProps {
  onClose: () => void
  onAdded: () => void // 상품 추가 후 부모에게 갱신 요청
}

export default function ProductAddModal({ onClose, onAdded }: ProductAddModalProps) {
  const [mounted, setMounted] = useState(false)
  const [productName, setProductName] = useState('')
  const [productImage, setProductImage] = useState('')
  const [stock, setStock] = useState(100)
  const [price, setPrice] = useState(1000)
  const [category, setCategory] = useState('기타') // 입력 문자열
  const [description, setDescription] = useState('')
  const [specs, setSpecs] = useState('') // "key:value, key:value" 형태 입력

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleAddProduct = async () => {
    if (!productName.trim() || !productImage.trim()) {
      alert('상품 이름과 이미지 URL은 필수입니다.')
      return
    }
    const categoryArray = category
      .split(',')
      .map((c) => c.trim())
      .filter((c) => c)

    // specs 파싱: "key:value, key:value" -> { key: value, ... }
    const parsedSpecs: Record<string, string> = {}
    if (specs.trim()) {
      specs.split(',').forEach((item) => {
        const [key, value] = item.split(':').map((s) => s.trim())
        if (key && value) parsedSpecs[key] = value
      })
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
          category: categoryArray,
          description,
          specs: parsedSpecs,
        }),
      })

      if (!res.ok) throw new Error('상품 추가 실패')
      const data = await res.json()
      console.log('상품 추가 성공:', data)
      onAdded()
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
            <Label>카테고리 (쉼표로 구분)</Label>
            <Input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="예: 신선식품, 간편식" />
          </div>
          <div className="grid gap-1">
            <Label>상품 설명</Label>
            <Input value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="grid gap-1">
            <Label>상세 스펙 (key:value, key:value)</Label>
            <Input value={specs} onChange={(e) => setSpecs(e.target.value)} placeholder="ex) 용량:300g, 포장:소포장" />
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
