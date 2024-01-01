import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sign Up',
}

export default function Page() {
  return (
    <main className="h-screen flex items-center justify-center p-2 md:p-0">
      <form className="bg-white rounded shadow-md p-4 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-500">
              Login
            </Link>
            .
          </p>
        </div>

        <div className="space-y-3">
          {/* FULL NAME */}
          <div>
            <label htmlFor="fullName" className="text-gray-500">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="Enter your full name"
              className="w-full border rounded p-1"
            />
          </div>

          {/* EMAIL  */}
          <div>
            <label htmlFor="email" className="text-gray-500">
              Email
            </label>
            <input
              type="text"
              id="email"
              placeholder="Enter your email"
              className="w-full border rounded p-1"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label htmlFor="password" className="text-gray-500">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full border rounded p-1"
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label htmlFor="confirmPassword" className="text-gray-500">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Re-enter your password"
              className="w-full border rounded p-1"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white w-full p-2 rounded"
          >
            Register
          </button>
        </div>
      </form>
    </main>
  )
}
