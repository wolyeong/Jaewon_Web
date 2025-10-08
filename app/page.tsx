'use client'

import { Button } from '@/components/ui/button'
import AuthWrapper from '@/components/AuthWrapper'
import Navbar from '@/components/Navbar'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <div className="antialiased">
      <Navbar />
      <main>
        <section className="container mx-auto px-4 py-16 text-center md:px-6 md:py-24">
          <h1 className="mb-4 text-4xl font-extrabold md:text-6xl">필요하신 물건이 있으신가요?</h1>
          <p className="mx-auto mb-8 max-w-2xl text-muted-foreground md:text-xl">
            저희 Jaewon Store에서 다양한 상품을 만나보세요. 최고의 품질과 합리적인 가격으로 제공됩니다.
          </p>
          <AuthWrapper onLoginRedirect={() => router.push('/signin')}>
            <Button size="lg" onClick={() => router.push('/products')}>
              쇼핑하러가기
            </Button>
          </AuthWrapper>
        </section>
      </main>
      <footer className="container mx-auto px-4 py-40 md:px-6">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Jaewon Store. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
