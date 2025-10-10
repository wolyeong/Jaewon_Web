// models/User.ts
import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    nickname: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    wallet: { type: Number, default: 0 },
    user_type: { type: String, enum: ['user', 'admin', 'super'], default: 'user' },
  },
  {
    timestamps: true,
    collection: 'users',
  }
)

const User = mongoose.models.Users || mongoose.model('Users', UserSchema)

export default User
