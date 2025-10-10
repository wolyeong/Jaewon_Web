import { NextResponse } from 'next/server'
import dbConnect from '@/db/dbConnect'
import Product from '@/db/models/Product'

export async function POST() {
  try {
    await dbConnect()

    await Product.updateMany({}, { $set: { recommended: false } })

    const topProducts = await Product.find().sort({ purchaseCount: -1 }).limit(3)

    const updatePromises = topProducts.map((product) =>
      Product.updateOne({ _id: product._id }, { $set: { recommended: true } })
    )
    await Promise.all(updatePromises)

    return NextResponse.json({
      message: '추천 상품 업데이트 완료',
      topProducts: topProducts.map((p) => ({
        id: p._id,
        name: p.name,
        purchaseCount: p.purchaseCount,
      })),
    })
  } catch (err) {
    console.error('추천 업데이트 실패:', err)
    return NextResponse.json({ message: '추천 상품 업데이트 실패', error: err }, { status: 500 })
  }
}
