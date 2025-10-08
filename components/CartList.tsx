'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

interface ProductRef {
  _id: string
  name: string
  price: number
  image: string
}

interface CartItemProps {
  productId: ProductRef
  quantity: number
}

export default function CartList() {
  const { data: session } = useSession()
  const [cartItems, setCartItems] = useState<CartItemProps[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCart = async () => {
      if (!session?.user?.nickname) {
        setCartItems([])
        setLoading(false)
        return
      }

      try {
        const res = await fetch(`/api/cart/get?nickname=${session.user.nickname}`)
        const data = await res.json()
        const items: CartItemProps[] = data.cart.items

        setCartItems(items)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchCart()
  }, [session])

  if (loading) return <p className="text-center text-3xl font-bold">장바구니를 불러오는 중...</p>
  if (!cartItems.length) return <p className="text-center text-3xl font-bold">장바구니가 비어있습니다.</p>

  return (
    <div className="space-y-4">
      {cartItems.map((item: CartItemProps) => (
        <div key={item.productId._id} className="flex items-center justify-between rounded border p-4 shadow">
          <div className="flex items-center space-x-4">
            {item.productId.image && (
              <Image
                src={item.productId.image}
                alt={item.productId.name}
                width={400}
                height={160}
                className="rounded object-cover"
              />
            )}
            <div>
              <p className="font-semibold">{item.productId.name}</p>
            </div>
          </div>
          <p className="font-semibold">₩{(item.productId.price * item.quantity).toLocaleString()}</p>
        </div>
      ))}
    </div>
  )
}
