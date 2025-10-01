'use client'
import { useState } from 'react'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [password_check, setPassword_check] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // 페이지 리로드 방지

    try {
      const dupRes = await fetch('/api/signup/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, nickname }),
      })
      const dupData = await dupRes.json()

      if (!dupRes.ok) {
        // 이메일과 닉네임 각각 확인
        if (dupData.email) {
          setMessage(dupData.email) // 이미 존재하는 이메일
          return
        }
        if (dupData.nickname) {
          setMessage(dupData.nickname) // 이미 존재하는 닉네임
          return
        }
      }
    } catch (err) {
      console.error(err)
      setMessage('중복 확인 중 오류 발생')
      return
    }

    if (password != password_check) {
      setMessage('비밀번호가 일치하지 않습니다.')
    } else {
      try {
        const res = await fetch('/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, name, nickname, password, password_check }),
        })

        const data = await res.json()
        setMessage(data.message || '알 수 없는 오류 발생')
      } catch (err) {
        console.error(err)
        setMessage('서버 오류 발생')
      }
    }
  }

  return (
    <div className="mx-auto max-w-md p-4">
      <h1 className="mb-4 text-2xl">회원가입</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div>
          <label>이메일:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded border p-2"
          />
        </div>
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
        <div>
          <label>비밀번호 확인:</label>
          <input
            type="password"
            value={password_check}
            onChange={(e) => setPassword_check(e.target.value)}
            required
            className="w-full rounded border p-2"
          />
        </div>
        <button type="submit" className="rounded bg-blue-500 py-2 text-white hover:bg-blue-600">
          가입하기
        </button>
      </form>
      {message && <p className="mt-3 text-red-600">{message}</p>}
    </div>
  )
}
