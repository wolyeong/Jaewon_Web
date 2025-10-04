'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

export default function SignUpPage() {
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // NextAuth Credentials Provider 사용
    const res = await signIn('credentials', {
      redirect: false,
      nickname,
      password,
    })
    console.log('res', res)
    if (res?.ok) {
      setMessage('로그인 성공!')
      console.log('res', 1)
      router.push('/')
    } else {
      if (res?.error) {
        setMessage(res.error)
      }
    }
  }
  const router = useRouter()
  return (
    <div className="mx-auto max-w-md p-4">
      <h1 className="mb-4 text-2xl">로그인</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div>
          <label>아이디(닉네임):</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
            className="w-full rounded border p-2"
          />
        </div>
        <div>
          <label>비밀번호:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded border p-2"
          />
        </div>
        <button type="submit" className="rounded bg-black/90 py-2 text-white hover:bg-black">
          로그인
        </button>
        <p className="mt-3 cursor-pointer text-center text-black underline" onClick={() => router.push('/signup')}>
          회원가입하러가기
        </p>
      </form>
      {message && <p className="mt-3 text-red-600">{message}</p>}
    </div>
  )
}
