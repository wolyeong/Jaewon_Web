import { NextResponse } from 'next/server'
import dbConnect from '@/db/dbConnect'
import Purchase from '@/db/models/Record'

export async function POST(req: Request) {
  try {
    const { nickname, items, totalPrice } = await req.json()

    if (!nickname || !items || items.length === 0 || !totalPrice) {
      return NextResponse.json({ message: '잘못된 요청' }, { status: 400 })
    }

    await dbConnect()

    const purchase = new Purchase({
      nickname,
      items,
      totalPrice,
    })

    await purchase.save()

    return NextResponse.json({ message: '구매 기록 저장 완료', purchase })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: '구매 기록 저장 실패', error: err }, { status: 500 })
  }
}
