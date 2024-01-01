import { Metadata } from 'next'
import Link from 'next/link'
import LoginForm from './LoginForm'

export const metadata: Metadata = {
  title: 'Login',
}

export default function Page() {
  return (
    <main className="h-screen flex items-center justify-center">
      <LoginForm />
    </main>
  )
}
