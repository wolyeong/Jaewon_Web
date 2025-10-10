// app/api/products/route.ts
import { NextResponse } from 'next/server'
import dbConnect from '@/db/dbConnect'
import Product from '@/db/models/Product'

export async function GET() {
  try {
    await dbConnect()
    const products = await Product.find().sort({ createdAt: -1 }) // 최신순
    return NextResponse.json(products)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: '상품 조회 실패', error }, { status: 500 })
  }
}
