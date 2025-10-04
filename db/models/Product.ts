import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    stock: { type: Number, default: 100 },
    purchaseCount: { type: Number, default: 0 },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
    collection: 'products',
  }
)

const Product = mongoose.models.Products || mongoose.model('Products', ProductSchema)
export default Product
