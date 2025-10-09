import { NextResponse } from 'next/server'
import dbConnect from '@/db/dbConnect'
import Cart from '@/db/models/Cart'
import { Types } from 'mongoose'
import Product from '@/db/models/Product'

export const dynamic = 'force-dynamic'

interface Product {
  _id: Types.ObjectId
  name: string
  price: number
  image: string
  category: string[]
  description?: string
  specs?: Record<string, string>
}

interface CartItemPopulated {
  productId: Product
  quantity: number
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const nickname = url.searchParams.get('nickname')
    if (!nickname) {
      return NextResponse.json({ message: '로그인 필요' }, { status: 401 })
    }

    await dbConnect()
    const cart = await Cart.findOne({ nickname }).populate({
      path: 'items.productId',
      model: 'Products',
    })

    if (!cart) {
      return NextResponse.json({ items: [] })
    }

    const items = (cart.items as CartItemPopulated[]).map((item) => ({
      product: item.productId,
      quantity: item.quantity,
    }))
    return NextResponse.json({ items })
  } catch (err) {
    console.error('장바구니 조회 실패:', err)
    return NextResponse.json({ message: '장바구니 조회 실패', error: String(err) }, { status: 500 })
  }
}
