import NextAuth, { DefaultUser } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import dbConnect from '@/db/dbConnect'
import User from '@/db/models/users'
import bcrypt from 'bcryptjs'

/**
 * @description nickname 중복 확인 + 사용자 정보 표시
 * @searchParams nickname
 */

interface ExtendedUser extends DefaultUser {
  nickname?: string
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        password_check: { label: 'Password_check', type: 'password_check' },
      },
      async authorize(credentials): Promise<ExtendedUser | null> {
        await dbConnect()
        const user = await User.findOne({ email: credentials?.email })
        if (!user) return null
        const isValid = await bcrypt.compare(credentials!.password, user.password)
        if (!isValid) return null

        // 반환 타입이 ExtendedUser와 맞음
        return { id: (user._id as unknown as string).toString(), email: user.email, nickname: user.nickname }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin', // 커스텀 로그인 페이지
  },
})
