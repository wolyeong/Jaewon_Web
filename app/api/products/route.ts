import { NextResponse } from 'next/server'
import dbConnect from '@/db/dbConnect'
import Product from '@/db/models/Product'

export async function POST(req: Request) {
  try {
    await dbConnect()
    const data = await req.json()

    const newProduct = await Product.create({
      name: data.name,
      image: data.image,
      stock: data.stock,
      price: data.price,
    })

    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: '상품 추가 실패', error }, { status: 500 })
  }
}
