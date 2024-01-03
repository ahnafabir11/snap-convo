'use client'

import axios, { AxiosError } from 'axios'
import { notFound, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const router = useRouter()
  const token = searchParams.token

  if (!token) {
    notFound()
  }

  useEffect(() => {
    ;(async () => {
      try {
        const res = await axios.get(`/api/auth/account/verify?token=${token}`)
        if (res.statusText === 'success') {
          toast.success('Email has been verified!')
        }
      } catch (e: unknown) {
        if (e instanceof AxiosError) {
          const statusText = e.response?.statusText

          if (statusText === 'INVALID_TOKEN') {
            toast.error('Invalid verification link!')
          } else if (statusText === 'ALREADY_VERIFIED') {
            toast.error('Email already verified!')
          } else {
            toast.error('Invalid verification link!')
          }
        } else {
          toast.error('Internal server error!')
        }
      } finally {
        router.push('/login')
      }
    })()
  }, [token])

  return (
    <main className="h-screen flex items-center justify-center">
      <Toaster />
    </main>
  )
}
