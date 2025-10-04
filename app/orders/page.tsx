'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import Image from 'next/image'

const geistSans = { variable: '--font-geist-sans' }
const geistMono = { variable: '--font-geist-mono' }

const AuthButtons = () => {
  const { data: session } = useSession()
  const router = useRouter()

  if (!session) {
    // 비 로그인 상태일 때
    return (
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={() => router.push('/signin')}>
          로그인
        </Button>
        <Button className="bg-black text-white hover:bg-gray-800" onClick={() => router.push('/signup')}>
          회원가입
        </Button>
      </div>
    )
  }

  // 로그인 상태일 때
  return (
    <div className="flex items-center justify-end gap-2">
      <span className="hidden truncate text-right text-sm font-medium sm:inline-block">{session.user?.nickname}</span>
      <div className="flex flex-shrink-0 items-center">
        <span className="hidden text-sm font-medium sm:inline-block">님</span>
        <Button variant="secondary" onClick={() => signOut({ callbackUrl: '/' })} className="ml-1">
          로그아웃
        </Button>
      </div>
    </div>
  )
}

// --- Main Component ---
export default function Home() {
  const router = useRouter()

  // const products = Array.from({ length: 4 }, (_, i) => ({
  //   id: i + 1,
  //   name: `Awesome Gadget ${i + 1}`,
  //   price: '$99.99',
  //   img: `https://placehold.co/600x600/e2e8f0/475569?text=Product+${i + 1}`,
  // }))

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      {/* 내비게이션 바 */}
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

      {/* Hero */}
      <main>
        {/* Products 
        <section className="bg-muted/40">
          <div className="container mx-auto px-4 py-12 md:px-6">
            <h2 className="mb-8 text-center text-3xl font-bold">추천 상품들</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products.map((prod) => (
                <Card key={prod.id} className="overflow-hidden">
                  <CardHeader className="p-0">
                    <img
                      src={prod.img}
                      alt={prod.name}
                      className="aspect-square w-full object-cover transition-transform hover:scale-105"
                    />
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle>{prod.name}</CardTitle>
                    <p className="mt-2 font-semibold text-muted-foreground">{prod.price}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full">장바구니에 추가</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        */}
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
