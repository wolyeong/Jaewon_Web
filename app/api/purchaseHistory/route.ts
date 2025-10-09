import { NextResponse } from 'next/server'
import dbConnect from '@/db/dbConnect'
import Purchase from '@/db/models/Record'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const nickname = searchParams.get('nickname')
  if (!nickname) return NextResponse.json({ message: '닉네임 필요' }, { status: 400 })

  await dbConnect()
  const history = await Purchase.find({ nickname }).populate('items.productId')
  return NextResponse.json({ history })
}
