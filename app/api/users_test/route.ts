import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/db/dbConnect'
import User from '@/db/models/User'

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

export async function POST(request: Request) {
  try {
    await dbConnect()
    const { email, nickname, password } = await request.json()

    if (!email || !nickname || !password) {
      return NextResponse.json({ message: '필수 데이터 누락' }, { status: 400 })
    }

    const existingEmail = await User.findOne({ email })
    if (existingEmail) {
      return NextResponse.json({ message: '이미 사용 중인 이메일입니다.' }, { status: 409 })
    }

    const existingNickname = await User.findOne({ nickname })
    if (existingNickname) {
      return NextResponse.json({ message: '이미 사용 중인 닉네임입니다.' }, { status: 409 })
    }

    const newUser = new User({ email, nickname, password })
    await newUser.save()

    const userResponse = {
      _id: newUser._id,
      email: newUser.email,
      nickname: newUser.nickname,
      user_type: newUser.user_type,
      createdAt: newUser.createdAt,
    }
    console.log('저장 전 User 객체:', newUser)

    return NextResponse.json({ message: '회원가입이 성공적으로 완료되었습니다.', user: userResponse }, { status: 201 })
  } catch (error) {
    console.error('사용자 생성 중 에러 발생:', error)
    return NextResponse.json({ message: '서버 내부 오류가 발생했습니다.' }, { status: 500 })
  }
}
