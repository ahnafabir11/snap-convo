'use client'

import { LoginFormType, loginFormSchema } from '@/types/form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'

export default function LoginForm() {
  const {
    reset,
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
  })

  const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
    try {
      await axios.post('/api/auth/login', data)
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        const statusText = e.response?.statusText
        const errorData = e.response?.data

        if (statusText === 'VALIDATION_ERROR') {
          const validationErrors = errorData.errors
          Object.keys(validationErrors).map((errorKey) => {
            validationErrors[errorKey].map((message: string) =>
              setError(errorKey as keyof LoginFormType, { message })
            )
          })
        } else {
          setError('root', { message: 'Internal Server Error!' })
        }
      } else {
        toast.error('Something went wrong!')
      }
    }
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
        {errors.root && (
          <p className="text-red-500 text-center">{errors.root.message}</p>
        )}
      </div>

      <div>
        <button
          type="submit"
          className="bg-blue-500 text-white w-full p-3 rounded"
        >
          Login
        </button>
      </div>
      <Toaster />
    </form>
  )
}
