import mongoose, { Schema } from 'mongoose'
import '@/db/models/Product'

const CartSchema = new Schema(
  {
    nickname: { type: String, required: true, unique: true },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true }, // ✅ ref 일치
        quantity: { type: Number, default: 1, required: true },
      },
    ],
  },
  { timestamps: true, collection: 'carts' }
)

// ✅ 모델 이름은 'Cart' (단수)
export default mongoose.models.Cart || mongoose.model('Cart', CartSchema)
