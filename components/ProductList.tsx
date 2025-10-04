'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

interface Product {
  _id: string
  name: string
  image: string
  price: number
  category: string[]
  specs: Record<string, string>
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/products_list') // 경로 수정
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="p-4 text-center">상품을 불러오는 중...</p>
  if (!products.length) return <p className="p-4 text-center">등록된 상품이 없습니다.</p>

  return (
    <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-3">
      {products.map((product) => (
        <div key={product._id} className="rounded border p-4 shadow">
          {product.image && (
            <Image src={product.image} alt={product.name} width={400} height={160} className="rounded object-cover" />
          )}
          <h3 className="mt-2 text-lg font-bold">{product.name}</h3>
          <p className="mt-1 font-semibold">₩{product.price.toLocaleString()}</p>
          {product.category?.length && <p className="mt-1 text-xs text-gray-500">{product.category.join(', ')}</p>}
        </div>
      ))}
    </div>
  )
}
