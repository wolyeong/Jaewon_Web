import { NextResponse } from 'next/server'
import dbConnect from '@/db/dbConnect'
import Product from '@/db/models/Product'

export async function GET() {
  try {
    await dbConnect()
    const recommended = await Product.find({ recommended: true, stock: { $gt: 0 } }).limit(3)

    return NextResponse.json(recommended)
  } catch (err) {
    console.error('추천 상품 불러오기 실패:', err)
    return NextResponse.json({ message: '추천 상품 조회 실패', error: err }, { status: 500 })
  }
}
