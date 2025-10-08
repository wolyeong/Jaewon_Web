'use client'

import React from 'react'
import Navbar from '@/components/Navbar'

const geistSans = { variable: '--font-geist-sans' }
const geistMono = { variable: '--font-geist-mono' }

export default function Products() {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <Navbar />
      {/* Hero / 상품 리스트 영역 */}
      <main className="container mx-auto px-4 py-6 md:px-6"></main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-40 md:px-6">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Jaewon Store. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
