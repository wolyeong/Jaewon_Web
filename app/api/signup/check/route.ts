// app/api/signup/check/route.ts
import dbConnect from '@/db/dbConnect'
import user from '@/db/models/users'

export async function POST(req: Request) {
  await dbConnect()
  const { email, nickname } = await req.json()

  if (!email && !nickname) {
    return new Response(JSON.stringify({ message: '이메일 또는 닉네임이 필요합니다.' }), { status: 400 })
  }

  const result: { email?: string; nickname?: string } = {}

  if (email) {
    const emailExist = await user.findOne({ email })
    if (emailExist) result.email = '이미 존재하는 이메일입니다.'
  }

  if (nickname) {
    const nicknameExist = await user.findOne({ nickname })
    if (nicknameExist) result.nickname = '이미 존재하는 닉네임입니다.'
  }

  if (Object.keys(result).length > 0) {
    return new Response(JSON.stringify(result), { status: 400 })
  }

  return new Response(JSON.stringify({ message: '사용 가능한 이메일과 닉네임입니다.' }), { status: 200 })
}
