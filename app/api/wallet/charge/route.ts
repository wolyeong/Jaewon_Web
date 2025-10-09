import { NextResponse } from 'next/server'
import dbConnect from '@/db/dbConnect'
import User from '@/db/models/User'

export async function POST(req: Request) {
  try {
    const { nickname } = await req.json()
    if (!nickname) {
      return NextResponse.json({ message: '닉네임이 필요합니다.' }, { status: 400 })
    }

    await dbConnect()
    const user = await User.findOne({ nickname })

    if (!user) {
      return NextResponse.json({ message: '유저를 찾을 수 없습니다.' }, { status: 404 })
    }

    // ✅ 잔액 1만원 충전
    user.wallet += 10000
    await user.save()
    return NextResponse.json({
      message: '잔액이 충전되었습니다.',
      wallet: user.wallet,
    })
  } catch (error) {
    console.error('잔액 충전 오류:', error)
    return NextResponse.json({ message: '잔액 충전에 실패했습니다.', error }, { status: 500 })
  }
}
