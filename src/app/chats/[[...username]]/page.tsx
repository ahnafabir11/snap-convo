import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import clsx from 'clsx'
import Header from './Header'
import Sidebar from './Sidebar'
import Conversation from './Conversation'

export const metadata: Metadata = {
  title: 'Chats',
}

export default function Page({ params }: { params: { username: string[] } }) {
  const isValidRoute = !Boolean(params.username) || params.username.length < 2
  const isConversationSelected = params.username && params.username.length === 1

  if (!isValidRoute) {
    return notFound()
  }

  const username = params.username?.[0]

  return (
    <main className="h-screen flex flex-col overflow-hidden">
      <Header />

      <div className="flex-grow flex overflow-hidden">
        <Sidebar isConversationSelected={isConversationSelected} />
        <Conversation isConversationSelected={isConversationSelected} />
      </div>
    </main>
  )
}
