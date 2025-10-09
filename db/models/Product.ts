import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // 상품 이름
    image: { type: String, required: true }, // 상품 이미지 URL
    stock: { type: Number, default: 100 }, // 재고
    purchaseCount: { type: Number, default: 0 }, // 구매 수
    price: { type: Number, required: true }, // 가격
    category: { type: [String], default: [] }, // 카테고리
    description: { type: String, default: '' }, // 상품 설명
    recommended: { type: Boolean, default: false }, // 추천 상품 여부
    specs: { type: Object, default: {} }, // 상세 스펙 (key-value)
  },
  {
    timestamps: true,
    collection: 'products',
  }
)

// 이미 모델이 존재하면 재사용, 없으면 새로 생성
const Product = mongoose.models.Products || mongoose.model('Products', ProductSchema)
export default Product
