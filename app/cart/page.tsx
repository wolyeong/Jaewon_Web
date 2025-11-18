'use client'

import React from 'react'
import Navbar from '@/components/Navbar'
import CartList from '@/components/CartList'
const geistSans = { variable: '--font-geist-sans' }
const geistMono = { variable: '--font-geist-mono' }

export default function Products() {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <Navbar />
      <main className="container mx-auto px-4 py-20 md:px-6">
        <CartList />
      </main>

      <footer className="container mx-auto px-4 py-5 md:px-6">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Jaewon Store. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
