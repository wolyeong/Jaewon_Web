import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/db/dbConnect'
import User from '@/db/models/users'

/**
 * @description nickname 중복 확인 + 사용자 정보 표시
 * @searchParams nickname
 */
export async function GET(req: NextRequest) {
  await dbConnect()
  const nickname = req.nextUrl.searchParams.get('nickname')

  if (!nickname) {
    return NextResponse.json({ message: '닉네임이 지정되지 않았습니다.' }, { status: 400 })
  }

  const existingUser = await User.findOne({ nickname: nickname })

  if (existingUser) {
    return NextResponse.json(
      {
        message: '이 닉네임은 이미 사용 중입니다.',
      },
      { status: 200 }
    )
  }

  // 사용자가 존재하지 않는 경우
  return NextResponse.json({ message: '사용 가능한 닉네임입니다.' }, { status: 200 })
}
