import { NextResponse } from 'next/server'
import dbConnect from '@/db/dbConnect'
import Purchase from '@/db/models/Purchase'

export async function POST(req: Request) {
  try {
    const { nickname, items, totalPrice } = await req.json()
    await dbConnect()

    const newPurchase = new Purchase({
      nickname,
      items,
      totalPrice,
      createdAt: new Date(),
    })

    await newPurchase.save()
    return NextResponse.json({ message: '구매 완료' })
  } catch (err) {
    console.error('구매 저장 실패:', err)
    return NextResponse.json({ message: '구매 실패', error: String(err) }, { status: 500 })
  }
}
