'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import ProductAddButton from '@/components/ProductAddButton'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import ProductList from '@/components/ProductList'
import AuthButtons from '@/components/AuthButtons'

const geistSans = { variable: '--font-geist-sans' }
const geistMono = { variable: '--font-geist-mono' }

export default function Products() {
  const router = useRouter()

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
          {/* 로고 */}
          <div className="flex-1">
            <a href="/" className="flex items-center space-x-2">
              <Image
                src="https://res.cloudinary.com/dku4lvt13/image/upload/v1759561138/rogo_ngjuko.png"
                alt="My Store Logo"
                width={24}
                height={24}
                className="object-contain"
              />
              <span className="text-lg font-bold">Jaewon Store</span>
            </a>
          </div>

          {/* 가운데 내비게이션 링크 */}
          <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
            <a href="/" className="text-foreground transition-colors hover:text-primary">
              Home
            </a>
            <a href="/products" className="text-muted-foreground transition-colors hover:text-primary">
              Products
            </a>
            <a href="/orders" className="text-muted-foreground transition-colors hover:text-primary">
              Orders
            </a>
          </nav>

          {/* 인증 버튼 및 장바구니 */}
          <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
            <ProductAddButton />
            <AuthButtons />
            <Button variant="outline" size="icon" onClick={() => router.push('/cart')}>
              <Image
                src="https://res.cloudinary.com/dku4lvt13/image/upload/v1759560990/cart_ulrcn7.png"
                alt="장바구니"
                width={28}
                height={28}
              />
              <span className="sr-only">Cart</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero / 상품 리스트 영역 */}
      <main className="container mx-auto px-4 py-6 md:px-6">
        <h1 className="p-6 text-center text-2xl font-bold">상품 목록</h1>
        <h2 className="p-2 text-center text-xl font-bold">이름에 마우스를 올리면 상세 정보가 보여요!</h2>
        <ProductList />
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-40 md:px-6">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Jaewon Store. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
