import Link from 'next/link'

export default function Header() {
  return (
    <header className="hidden lg:flex items-center justify-between border-b px-5 py-2 shrink-0">
      <Link href="/chats" className="text-xl font-semibold uppercase">
        Snap Convo
      </Link>
      <div className="bg-gray-500 w-10 h-10 rounded-full"></div>
    </header>
  )
}
