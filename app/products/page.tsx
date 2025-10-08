'use client'

import React from 'react'
import ProductList from '@/components/ProductList'
import Navbar from '@/components/Navbar'

const geistSans = { variable: '--font-geist-sans' }
const geistMono = { variable: '--font-geist-mono' }

export default function Products() {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <Navbar />
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
