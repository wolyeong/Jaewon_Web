import mongoose, { Schema, models } from 'mongoose'

const PurchaseSchema = new Schema({
  nickname: { type: String, required: true },
  items: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'Products' },
      quantity: Number,
    },
  ],
  totalPrice: Number,
  createdAt: { type: Date, default: Date.now },
})

const Purchase = models.Purchase || mongoose.model('Purchase', PurchaseSchema)
export default Purchase
