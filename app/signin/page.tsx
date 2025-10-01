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
      redirect: false, // true로 하면 로그인 성공 시 바로 redirect
      nickname,
      password,
    })

    if (res?.error) {
      setMessage('로그인 실패: ' + res.error)
    } else {
      setMessage('로그인 성공!')
      // 필요시 redirect 처리: 예) router.push('/')
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
        <button type="submit" className="rounded bg-blue-500 py-2 text-white hover:bg-blue-600">
          로그인
        </button>
        <p className="mt-3 cursor-pointer text-center text-blue-500 underline" onClick={() => router.push('/signup')}>
          회원가입하러가기
        </p>
      </form>
      {message && <p className="mt-3 text-red-600">{message}</p>}
    </div>
  )
}
