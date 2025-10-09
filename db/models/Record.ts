import mongoose from 'mongoose'

const RecordsSchema = new mongoose.Schema({
  nickname: { type: String, required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Records || mongoose.model('Records', RecordsSchema)
