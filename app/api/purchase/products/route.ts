import { NextResponse } from 'next/server'
import dbConnect from '@/db/dbConnect'
import Product from '@/db/models/Product'

export async function POST(req: Request) {
  try {
    const { items } = await req.json()
    await dbConnect()

    // 상품 재고 감소
    for (const item of items) {
      const product = await Product.findById(item.productId)
      if (product) {
        product.stock = Math.max(0, product.stock - item.quantity)
        product.purchaseCount += item.quantity
        await product.save()
      }
    }

    return NextResponse.json({ message: '상품 재고 감소' })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: '상품 재고 감소 실패', error: err }, { status: 500 })
  }
}
