'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'

interface Product {
  _id: string
  name: string
  price: number
  image: string
  category: string[]
  description?: string
  specs?: Record<string, string>
}

interface CartItem {
  product: Product
  quantity: number
}

export default function CartList() {
  const { data: session } = useSession()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<Record<string, boolean>>({})

  const nickname = session?.user?.nickname

  useEffect(() => {
    const fetchCart = async () => {
      if (!nickname) {
        setCartItems([])
        setLoading(false)
        return
      }
      try {
        const res = await fetch(`/api/cart/get?nickname=${encodeURIComponent(nickname)}`)
        const data = await res.json()
        setCartItems(data.items || [])
      } catch (err) {
        console.error('장바구니 불러오기 실패:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchCart()
  }, [nickname])

  const handleQuantityChange = async (productId: string, delta: number) => {
    if (!nickname || updating[productId]) return

    const prev = cartItems
    const next = prev
      .map((item) => (item.product._id === productId ? { ...item, quantity: item.quantity + delta } : item))
      .filter((item) => item.quantity > 0)

    setCartItems(next)
    setUpdating((s) => ({ ...s, [productId]: true }))

    try {
      const res = await fetch('/api/cart/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname, productId, delta }),
      })
      if (!res.ok) throw new Error('서버 업데이트 실패')
    } catch (err) {
      console.error('수량 변경 실패:', err)
      setCartItems(prev) // 롤백
    } finally {
      setUpdating((s) => ({ ...s, [productId]: false }))
    }
  }

  const handleClearAll = async () => {
    if (!nickname) return
    setCartItems([])
    try {
      await fetch('/api/cart/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname, clearAll: true }),
      })
    } catch (err) {
      console.error('장바구니 전체 삭제 실패:', err)
    }
  }

  if (loading) return <p className="text-center text-3xl font-bold">장바구니를 불러오는 중...</p>
  if (!cartItems.length) return <p className="text-center text-3xl font-bold">장바구니가 비어있습니다.</p>

  return (
    <div className="p-6">
      <Button className="mb-4" onClick={handleClearAll}>
        장바구니 전체 비우기
      </Button>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {cartItems.map(({ product, quantity }) => {
          const isUpdating = !!updating[product._id]
          return (
            <div key={product._id} className="relative rounded border p-4 shadow transition hover:shadow-lg">
              {product.image && (
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={160}
                  className="rounded object-cover"
                />
              )}

              <h3 className="relative mt-2 text-lg font-bold">
                <span className="group cursor-pointer">
                  {product.name}
                  {(product.description || (product.specs && Object.keys(product.specs).length)) && (
                    <div className="absolute left-0 top-full z-10 mt-1 hidden w-64 rounded bg-gray-900 p-3 text-sm text-white group-hover:block">
                      {product.description && <p className="mb-1">{product.description}</p>}
                      {product.specs && Object.keys(product.specs).length > 0 && (
                        <ul className="list-disc pl-4">
                          {Object.entries(product.specs).map(([key, value]) => (
                            <li key={key}>
                              <strong>{key}:</strong> {value}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </span>
              </h3>

              <p className="mt-1 font-semibold">₩{(product.price * quantity).toLocaleString()}</p>

              <div className="mt-3 flex items-center space-x-3">
                <Button onClick={() => handleQuantityChange(product._id, -1)} disabled={isUpdating}>
                  -
                </Button>
                <span className="text-lg font-semibold">{quantity}</span>
                <Button onClick={() => handleQuantityChange(product._id, 1)} disabled={isUpdating}>
                  +
                </Button>
              </div>

              {product.category?.length > 0 && (
                <p className="mt-2 py-2 text-xs text-gray-500">{product.category.join(', ')}</p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
