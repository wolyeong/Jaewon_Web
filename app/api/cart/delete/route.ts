import { NextResponse } from 'next/server'
import dbConnect from '@/db/dbConnect'
import Cart from '@/db/models/Cart'

export async function PATCH(request: Request) {
  try {
    const { nickname, productId, quantity, clearAll } = await request.json()
    if (!nickname) return NextResponse.json({ message: '닉네임 누락' }, { status: 400 })

    await dbConnect()

    // 전체 제거
    if (clearAll) {
      await Cart.findOneAndUpdate({ nickname }, { items: [] })
      return NextResponse.json({ message: '장바구니 전체 제거 완료' })
    }

    // 특정 상품 수량 업데이트
    const cart = await Cart.findOne({ nickname })
    if (!cart) return NextResponse.json({ message: '장바구니 없음' }, { status: 404 })

    const itemIndex = cart.items.findIndex((item: { productId: string }) => item.productId.toString() === productId)

    // 수량이 0 이하 → 해당 아이템 제거
    if (quantity <= 0 && itemIndex > -1) {
      cart.items.splice(itemIndex, 1)
    } else if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity
    }

    await cart.save()
    return NextResponse.json({ message: '장바구니 업데이트 완료' })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: '장바구니 업데이트 실패', error: err }, { status: 500 })
  }
}
