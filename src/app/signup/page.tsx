import { Metadata } from 'next'
import SignUpForm from './SignupForm'

export const metadata: Metadata = {
  title: 'Sign Up',
}

export default function Page() {
  return (
    <main className="h-screen flex items-center justify-center">
      <SignUpForm />
    </main>
  )
}
