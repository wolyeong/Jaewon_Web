import Image from 'next/image' //메인 페이지
import Link from 'next/link'

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <Image
        className="dark:invert"
        src="https://nextjs.org/icons/next.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />
      <h1>홈 페이지</h1>
      <Link href="/signup">
        <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">회원가입</button>
      </Link>
    </div>
  )
}
