// models/User.ts
import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IUser extends Document {
  __id: string
  email: string
  nickname: string
  password: string
  user_type: string
  createdAt: Date
}

const UserSchema: Schema<IUser> = new Schema({
  nickname: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  user_type: { type: String, enum: ['user', 'admin', 'super'], default: 'user' },
  createdAt: { type: Date, default: Date.now },
})

const User: Model<IUser> = mongoose.models.Users || mongoose.model<IUser>('Users', UserSchema)

export default User
