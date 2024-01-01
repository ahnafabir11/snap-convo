'use client'

import { LoginFormType, loginFormSchema } from '@/types/form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
  })

  const onSubmit: SubmitHandler<LoginFormType> = (data) => {
    console.log(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-white rounded shadow-md p-4 m-2 md:m-0"
    >
      <div>
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-sm text-gray-600">
          Don&#39;t have any account?{' '}
          <Link href="/signup" className="text-blue-500">
            Register
          </Link>
          .
        </p>
      </div>
                 
      <div className="space-y-3">
        {/* EMAIL */}
        <div>
          <label htmlFor="email" className="text-gray-500">
            Email
          </label>
          <input
            type="text"
            id="email"
            placeholder="Enter your email"
            className="w-full border-gray-400 rounded"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
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
            className="w-full border-gray-400 rounded"
            {...register('password')}
          />
        </div>
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div>
        <button
          type="submit"
          className="bg-blue-500 text-white w-full p-2 rounded"
        >
          Login
        </button>
      </div>
    </form>
  )
}
