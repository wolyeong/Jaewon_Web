import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/db/dbConnect'
import User from '@/db/models/User'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  const { email, nickname, password } = await req.json()
  await dbConnect()

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = new User({ email, nickname, password: hashedPassword })
  await newUser.save()

  return NextResponse.json({ message: '회원가입 완료' })
}
