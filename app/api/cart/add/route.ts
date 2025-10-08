import { NextResponse } from 'next/server'
import dbConnect from '@/db/dbConnect'
import Cart from '@/db/models/Cart'

interface CartItem {
  productId: string
  quantity: number
}

interface AddCartBody {
  productId: string
  nickname: string
}

// POST: 장바구니 추가
export async function POST(request: Request) {
  try {
    const body: AddCartBody = await request.json()
    const { productId, nickname } = body
    if (!nickname) return NextResponse.json({ message: '로그인 필요' }, { status: 401 })

    await dbConnect()
    let cart = await Cart.findOne({ nickname })
    if (!cart) {
      cart = new Cart({ nickname, items: [{ productId, quantity: 1 }] })
    } else {
      const idx = cart.items.findIndex((item: CartItem) => item.productId.toString() === productId)
      if (idx !== -1) cart.items[idx].quantity += 1
      else cart.items.push({ productId, quantity: 1 })
    }

    await cart.save()
    return NextResponse.json({
      message: '장바구니에 추가됨',
      totalItems: cart.items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0),
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: '장바구니 추가 실패', error: err }, { status: 500 })
  }
}
