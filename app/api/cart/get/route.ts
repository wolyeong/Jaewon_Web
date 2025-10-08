import { NextResponse } from 'next/server'
import dbConnect from '@/db/dbConnect'
import Cart from '@/db/models/Cart'

// GET: 장바구니 조회
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const nickname = searchParams.get('nickname')
    if (!nickname) return NextResponse.json({ message: '로그인 필요' }, { status: 401 })

    await dbConnect()
    const cart = await Cart.findOne({ nickname })
    return NextResponse.json({ cart })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: '장바구니 조회 실패', error: err }, { status: 500 })
  }
}
