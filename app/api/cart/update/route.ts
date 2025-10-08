import { NextResponse } from 'next/server'
import dbConnect from '@/db/dbConnect'
import Cart from '@/db/models/Cart'

interface CartItem {
  productId: string
  quantity: number
}

interface UpdateCartBody {
  nickname: string
  productId?: string
  delta?: number
  clearAll?: boolean
}

// POST: 장바구니 추가 / 수량 변경 / 전체 제거
export async function POST(request: Request) {
  try {
    const body: UpdateCartBody = await request.json()
    const { productId, nickname, delta = 1, clearAll } = body

    if (!nickname) return NextResponse.json({ message: '로그인 필요' }, { status: 401 })

    await dbConnect()
    let cart = await Cart.findOne({ nickname })

    // 전체 제거
    if (clearAll) {
      if (cart) {
        cart.items = []
        await cart.save()
      }
      return NextResponse.json({ message: '장바구니 전체 제거 완료', items: [] })
    }

    if (!cart) {
      // 장바구니 없으면 새로 생성
      if (!productId || delta <= 0) return NextResponse.json({ message: '유효한 아이템 필요', status: 400 })
      cart = new Cart({ nickname, items: [{ productId, quantity: delta }] })
    } else if (productId) {
      // 기존 아이템 찾기
      const idx = cart.items.findIndex((item: CartItem) => item.productId.toString() === productId)

      if (idx !== -1) {
        cart.items[idx].quantity += delta
        if (cart.items[idx].quantity <= 0) cart.items.splice(idx, 1)
      } else if (delta > 0) {
        cart.items.push({ productId, quantity: delta })
      }
    }

    await cart.save()
    return NextResponse.json({ message: '장바구니 업데이트 완료', items: cart.items })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: '장바구니 업데이트 실패', error: err }, { status: 500 })
  }
}
