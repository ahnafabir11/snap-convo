'use client'

import { SignUpFormType, signUpFormSchema } from '@/types/form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'

export default function SignUpForm() {
  const {
    reset,
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormType>({
    resolver: zodResolver(signUpFormSchema),
  })

  const onSubmit: SubmitHandler<SignUpFormType> = async (data) => {
    try {
      await axios.post('/api/auth/signup', data)
      toast.success('Check you mail to verify.')
      reset()
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        const statusText = e.response?.statusText
        const errorData = e.response?.data

        if (statusText === 'VALIDATION_ERROR') {
          const validationErrors = errorData.errors
          Object.keys(validationErrors).map((errorKey) => {
            validationErrors[errorKey].map((message: string) =>
              setError(errorKey as keyof SignUpFormType, { message })
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
            className="w-full border-gray-400 rounded"
            {...register('fullName')}
          />
          {errors.fullName && (
            <p className="text-red-500">{errors.fullName.message}</p>
          )}
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
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
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
            className="w-full border-gray-400 rounded"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>

        {errors.root && (
          <p className="text-center text-red-500">{errors.root.message}</p>
        )}
      </div>

      <div>
        <button
          type="submit"
          className="bg-blue-500 text-white w-full p-3 rounded"
        >
          Register
        </button>
      </div>

      <Toaster />
    </form>
  )
}
