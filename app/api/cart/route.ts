// app/api/cart/route.ts
import { NextResponse } from 'next/server'
import dbConnect from '@/db/dbConnect'
import Cart from '@/db/models/Cart'

// CartItem 타입 정의
interface CartItem {
  productId: string
  quantity: number
}

// POST body 타입
interface AddCartBody {
  productId: string
  nickname: string
}

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
