// models/Cart.ts
import mongoose from 'mongoose'

const CartSchema = new mongoose.Schema(
  {
    nickname: { type: String, required: true, unique: true }, // 사용자 닉네임
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true }, // 상품 _id
        quantity: { type: Number, default: 1, required: true }, // 수량
      },
    ],
  },
  {
    timestamps: true,
    collection: 'carts',
  }
)

const Cart = mongoose.models.Carts || mongoose.model('Carts', CartSchema)
export default Cart
