// app/api/signup/check/route.ts
import dbConnect from '@/db/dbConnect'
import user from '@/db/models/User'

export async function POST(req: Request) {
  try {
    await dbConnect()
    const { nickname } = await req.json()

    const check_nickname = await user.findOne({ nickname })

    if (check_nickname) {
      return new Response(JSON.stringify({ message: '이미 사용중인 닉네임입니다.', check: true }), { status: 200 })
    }

    return new Response(JSON.stringify({ message: '사용 가능한 닉네임입니다.', check: false }), { status: 200 })
  } catch (err) {
    console.error('nickname_check error:', err)
    return new Response(JSON.stringify({ message: '서버 오류 발생', check: false }), { status: 500 })
  }
}
