// app/api/signup/check/route.ts
import dbConnect from '@/db/dbConnect'
import user from '@/db/models/User'

export async function POST(req: Request) {
  try {
    await dbConnect()
    const { email } = await req.json()

    const check_email = await user.findOne({ email })

    if (check_email) {
      return new Response(JSON.stringify({ message: '이미 사용중인 이메일입니다.', check: true }), { status: 200 })
    }

    return new Response(JSON.stringify({ message: '사용 가능한 이메일입니다.', check: false }), { status: 200 })
  } catch (err) {
    console.error('email_check error:', err)
    return new Response(JSON.stringify({ message: '서버 오류 발생', check: false }), { status: 500 })
  }
}
