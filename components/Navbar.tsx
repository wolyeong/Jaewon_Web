'use client'

import { Button } from '@/components/ui/button'
import AuthWrapper from '@/components/AuthWrapper'
import AuthButtons from '@/components/AuthButtons'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import React from 'react'

export default function Navbar() {
  const router = useRouter()

  return (
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

        {/* 내비게이션 */}
        <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
          <a href="/" className="text-foreground transition-colors hover:text-primary">
            Home
          </a>
          <a href="/products" className="text-muted-foreground transition-colors hover:text-primary">
            Products
          </a>
          <AuthWrapper onLoginRedirect={() => router.push('/signin')}>
            <a href="/orders" className="text-muted-foreground transition-colors hover:text-primary">
              Orders
            </a>
          </AuthWrapper>
        </nav>

        {/* 인증 버튼 + 장바구니 */}
        <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
          <AuthButtons />

          <AuthWrapper onLoginRedirect={() => router.push('/signin')}>
            <Button variant="outline" size="icon" onClick={() => router.push('/cart')}>
              <Image
                src="https://res.cloudinary.com/dku4lvt13/image/upload/v1759560990/cart_ulrcn7.png"
                alt="장바구니"
                width={28}
                height={28}
              />
              <span className="sr-only">Cart</span>
            </Button>
          </AuthWrapper>
        </div>
      </div>
    </header>
  )
}
