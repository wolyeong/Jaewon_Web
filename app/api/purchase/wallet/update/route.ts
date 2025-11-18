// app/api/user/wallet/route.ts
import { NextResponse } from 'next/server'
import dbConnect from '@/db/dbConnect'
import User from '@/db/models/User'

export async function POST(req: Request) {
  const { nickname, totalPrice } = await req.json()

  if (!nickname) return NextResponse.json({ message: '닉네임 필요' }, { status: 400 })

  try {
    await dbConnect()
    const user = await User.findOne({ nickname })
    if (!user) return NextResponse.json({ message: '유저 없음' }, { status: 404 })
    if (user.wallet < totalPrice) {
      return NextResponse.json({ message: '잔고 부족' }, { status: 400 })
    }

    // 잔고 차감
    user.wallet -= totalPrice
    await user.save()
    return NextResponse.json({ message: '잔고 업데이트 완료', wallet: user.wallet })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: '잔고 업데이트 실패', error: err }, { status: 500 })
  }
}
