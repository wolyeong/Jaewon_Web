import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import dbConnect from '@/db/dbConnect'
import User from '@/db/models/User'
import bcrypt from 'bcryptjs'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        nickname: { label: 'Nickname', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await dbConnect()
        const user = await User.findOne({ nickname: credentials?.nickname })
        if (!user) {
          throw new Error('존재하지 않는 닉네임입니다.')
        }
        if (!credentials?.password) return null
        const isValid = await bcrypt.compare(credentials.password, user.password)
        if (isValid) {
          return { id: user._id.toString(), name: user.nickname }
        } else {
          throw new Error('비밀번호가 틀렸습니다.')
        }
      },
    }),
  ],
  session: { strategy: 'jwt' as const },
  pages: {
    signIn: '/signin', // 커스텀 로그인 페이지
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
