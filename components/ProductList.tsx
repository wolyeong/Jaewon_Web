'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import AddToCartButton from '@/components/AddToCartButton'
import AuthWrapper from '@/components/AuthWrapper'
import { useRouter } from 'next/navigation'

interface Product {
  _id: string
  name: string
  image: string
  stock: number
  price: number
  category: string[]
  description: string
  specs: Record<string, string>
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/products_list')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="p-4 text-center">상품을 불러오는 중...</p>
  if (!products.length) return <p className="p-4 text-center">등록된 상품이 없습니다.</p>

  return (
    <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-3">
      {products.map((product) => {
        const isSoldOut = product.stock === 0
        return (
          <div key={product._id} className="relative rounded border p-4 shadow transition hover:shadow-lg">
            {/* 이미지 */}
            {product.image && (
              <Image src={product.image} alt={product.name} width={400} height={160} className="rounded object-cover" />
            )}

            {/* 이름 + description/specs 툴팁 */}
            <h3 className={`relative mt-2 text-lg font-bold ${isSoldOut ? 'text-gray-400 line-through' : ''}`}>
              <span className="group cursor-pointer">
                {product.name}

                {(product.description || (product.specs && Object.keys(product.specs).length > 0)) && (
                  <div className="absolute left-0 top-full z-10 mt-1 hidden w-64 rounded bg-gray-900 p-3 text-sm text-white group-hover:block">
                    {product.description && <p className="mb-1">{product.description}</p>}
                    {product.specs && Object.keys(product.specs).length > 0 && (
                      <ul className="list-disc pl-4">
                        {Object.entries(product.specs).map(([key, value]) => (
                          <li key={key}>
                            <strong>{key}:</strong> {value}{' '}
                          </li>
                        ))}
                      </ul>
                    )}
                    {product.stock && <p className="mb-1">재고: {product.stock}</p>}
                  </div>
                )}
              </span>
            </h3>

            {/* 가격 */}
            <p className="mt-1 font-semibold">₩{product.price.toLocaleString()}</p>

            {/* 카테고리 */}
            {product.category?.length > 0 && (
              <p className="mt-1 py-2 text-xs text-gray-500">{product.category.join(', ')}</p>
            )}

            {/* 장바구니 버튼 */}
            <AuthWrapper onLoginRedirect={() => router.push('/signin')}>
              <AddToCartButton productId={product._id} stock={product.stock}>
                장바구니 담기
              </AddToCartButton>
            </AuthWrapper>
          </div>
        )
      })}
    </div>
  )
}
