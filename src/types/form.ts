import { z } from 'zod'

export const signUpFormSchema = z
  .object({
    fullName: z
      .string({ invalid_type_error: 'Full name must be a string!' })
      .min(1, 'This field is required!'),
    email: z
      .string({ invalid_type_error: 'Full name must be a string!' })
      .min(1, 'This field is required!')
      .email(),
    password: z
      .string({ invalid_type_error: 'Full name must be a string!' })
      .min(1, 'This field is required!')
      .min(8, 'Password must be at least 8 characters!'),
    confirmPassword: z
      .string({ invalid_type_error: 'Full name must be a string!' })
      .min(1, 'This field is required!'),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Password did't match!",
    path: ['confirmPassword'],
  })

export type SignUpFormType = z.infer<typeof signUpFormSchema>

export const loginFormSchema = z.object({
  email: z.string().min(1, 'This field is required!').email(),
  password: z
    .string({ invalid_type_error: 'Full name must be a string!' })
    .min(1, 'This field is required!')
    .min(8, 'Password must be at least 8 characters!'),
})

export type LoginFormType = z.infer<typeof loginFormSchema>
