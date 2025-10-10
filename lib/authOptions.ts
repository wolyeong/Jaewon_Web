import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import dbConnect from '@/db/dbConnect'
import User from '@/db/models/User'
import bcrypt from 'bcryptjs'
import type { JWT } from 'next-auth/jwt'
import type { User as NextAuthUser, Session } from 'next-auth'

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
        if (!user) throw new Error('존재하지 않는 닉네임입니다.')
        if (!credentials?.password) return null
        const isValid = await bcrypt.compare(credentials.password, user.password)
        if (isValid) {
          return { id: user._id.toString(), nickname: user.nickname, user_type: user.user_type }
        } else {
          throw new Error('비밀번호가 틀렸습니다.')
        }
      },
    }),
  ],
  session: { strategy: 'jwt' as const },
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: NextAuthUser }) {
      if (user) {
        token.id = user.id
        token.nickname = user.nickname
        token.user_type = user.user_type
      }
      return token
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.nickname = token.nickname as string
        session.user.user_type = token.user_type as string
      }
      return session
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
