'use client'

import { cn } from '@/utils/style'
import clsx from 'clsx'
import { forwardRef } from 'react'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn('w-full border rounded p-1', className)}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

export { Input }
