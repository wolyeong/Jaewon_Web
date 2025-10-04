'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'

// 폰트 시뮬레이션
const geistSans = { variable: '--font-geist-sans' }
const geistMono = { variable: '--font-geist-mono' }

// --- Auth Buttons (간단화) ---
const AuthButtons = () => {
  const { data: session } = useSession()
  const router = useRouter()

  if (!session) {
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

  // 로그인 상태일 때 (요청사항 반영된 부분)
  return (
    <div className="flex items-center justify-end gap-2">
      {/* 사용자 이름 (길어지면 자동으로 말줄임표 처리) */}
      <span className="hidden truncate text-right text-sm font-medium sm:inline-block">{session.user?.name}</span>
      {/* '님'과 로그아웃 버튼을 하나의 그룹으로 묶어 위치 고정 */}
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

  const products = Array.from({ length: 4 }, (_, i) => ({
    id: i + 1,
    name: `Awesome Gadget ${i + 1}`,
    price: '$99.99',
    img: `https://placehold.co/600x600/e2e8f0/475569?text=Product+${i + 1}`,
  }))

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      {/* Navigation Bar (수정된 부분) */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
          {/* 왼쪽 영역 (로고) */}
          <div className="flex-1">
            <a href="/" className="flex items-center space-x-2">
              <MountainIcon className="h-6 w-6" />
              <span className="text-lg font-bold">My Store</span>
            </a>
          </div>

          {/* 가운데 영역 (내비게이션 링크) - 이제 항상 중앙에 고정됩니다 */}
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

          {/* 오른쪽 영역 (인증 버튼 및 장바구니) */}
          <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
            <AuthButtons />
            <Button variant="outline" size="icon" onClick={() => router.push('/cart')}>
              <ShoppingCartIcon className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main>
        <section className="container mx-auto px-4 py-16 text-center md:px-6 md:py-24">
          <h1 className="mb-4 text-4xl font-extrabold md:text-6xl">Discover Your Next Favorite Thing</h1>
          <p className="mx-auto mb-8 max-w-2xl text-muted-foreground md:text-xl">
            Browse our curated collection of high-quality products.
          </p>
          <Button size="lg" onClick={() => router.push('/products')}>
            Shop Now
          </Button>
        </section>

        {/* Products */}
        <section className="bg-muted/40">
          <div className="container mx-auto px-4 py-12 md:px-6">
            <h2 className="mb-8 text-center text-3xl font-bold">Featured Products</h2>
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
                    <Button className="w-full">Add to Cart</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-6 md:px-6">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} My Store. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

// Icons
function MountainIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}

function ShoppingCartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  )
}
