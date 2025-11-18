import { NextResponse } from 'next/server'
import dbConnect from '@/db/dbConnect'
import Record from '@/db/models/Record'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const nickname = url.searchParams.get('nickname')

  if (!nickname) {
    return NextResponse.json({ message: '닉네임 필요' }, { status: 400 })
  }

  try {
    await dbConnect()
    const records = await Record.find({ nickname }).sort({ createdAt: -1 })
    return NextResponse.json(records)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: '기록 조회 실패', error: err }, { status: 500 })
  }
}
