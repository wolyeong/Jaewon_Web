import { NextResponse } from 'next/server'
import dbConnect from '@/db/dbConnect'
import Cart from '@/db/models/Cart'

// DELETE: 장바구니 비우기 (구매 완료)
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const nickname = searchParams.get('nickname')
    if (!nickname) return NextResponse.json({ message: '로그인 필요' }, { status: 401 })

    await dbConnect()
    await Cart.findOneAndUpdate({ nickname }, { items: [] })
    return NextResponse.json({ message: '구매 완료' })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: '구매 처리 실패', error: err }, { status: 500 })
  }
}
