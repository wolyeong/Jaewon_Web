'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SignUpPage() {
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // 로그인 API 호출 (auth/[...nextauth])
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
      {/* {message && <p className="mt-3 text-red-600">{message}</p>} */}
    </div>
  )
}
