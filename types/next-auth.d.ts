import type { DefaultSession, DefaultUser } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      nickname: string
      user_type: string
    } & DefaultSession['user']
  }

  interface User extends DefaultUser {
    id: string
    nickname: string
    user_type: string
  }
}
