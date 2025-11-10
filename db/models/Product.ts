import mongoose, { Schema } from 'mongoose'

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    stock: { type: Number, default: 100 },
    purchaseCount: { type: Number, default: 0 },
    price: { type: Number, required: true },
    category: { type: [String], default: [] },
    description: { type: String, default: '' },
    recommended: { type: Boolean, default: false },
    specs: { type: Object, default: {} },
  },
  { timestamps: true, collection: 'products' }
)

// ✅ 모델 이름은 'Product' (단수) 로 고정해야 함
export default mongoose.models.Product || mongoose.model('Product', ProductSchema)
