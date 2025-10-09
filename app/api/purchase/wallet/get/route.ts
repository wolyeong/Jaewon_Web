// app/api/user/wallet/route.ts
import { NextResponse } from 'next/server'
import dbConnect from '@/db/dbConnect'
import User from '@/db/models/User'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const nickname = url.searchParams.get('nickname')

  if (!nickname) return NextResponse.json({ message: '닉네임 필요' }, { status: 400 })

  try {
    await dbConnect()
    const user = await User.findOne({ nickname })
    if (!user) return NextResponse.json({ message: '유저 없음' }, { status: 404 })

    return NextResponse.json({ balance: user.wallet })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: '잔고 조회 실패', error: err }, { status: 500 })
  }
}
