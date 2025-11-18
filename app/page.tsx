'use client'

import { Button } from '@/components/ui/button'
import Navbar from '@/components/Navbar'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

interface Product {
  _id: string
  name: string
  image: string
  price: number
  category: string[]
  description?: string
  specs?: Record<string, string>
  stock?: number
}

export default function Home() {
  const router = useRouter()
  const [recommended, setRecommended] = useState<Product[]>([])

  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const res = await fetch('/api/recommend/get')
        const data = await res.json()
        setRecommended(data)
      } catch (err) {
        console.error('추천 상품 로드 실패:', err)
      }
    }
    fetchRecommended()
  }, [])
  return (
    <div className="antialiased">
      <Navbar />
      <main>
        <section className="container mx-auto px-4 py-16 text-center md:px-6 md:py-24">
          <h1 className="mb-4 text-4xl font-extrabold md:text-6xl">필요하신 물건이 있으신가요?</h1>
          <p className="mx-auto mb-8 max-w-2xl text-muted-foreground md:text-xl">
            저희 Jaewon Store에서 다양한 상품을 만나보세요. 최고의 품질과 합리적인 가격으로 제공됩니다.
          </p>
          {/* <Image src="/image.png" alt="이미지" width={400} height={160} className="rounded object-cover" /> */}
          <Button size="lg" onClick={() => router.push('/products')}>
            쇼핑하러가기
          </Button>
          <h2 className="mb-6 py-10 text-2xl font-bold">🔥 추천 상품</h2>

          {recommended.length === 0 ? (
            <p className="text-gray-500">추천 상품이 없습니다.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recommended.map((product) => {
                const isSoldOut = product.stock !== undefined && product.stock <= 0
                return (
                  <div key={product._id} className="relative rounded border p-4 shadow transition hover:shadow-lg">
                    {/* 이미지 */}
                    {product.image && (
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={400}
                        height={160}
                        className="rounded object-cover"
                      />
                    )}
                    {/* 이름 + 툴팁 */}
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
                                    <strong>{key}:</strong> {value}
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
                  </div>
                )
              })}
            </div>
          )}
        </section>
      </main>
      <footer className="container mx-auto px-4 py-5 md:px-6">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Jaewon Store. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
