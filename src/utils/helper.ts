import SignUpEmailTemplate from '@/components/template/SignUpEmailTemplate'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Resend } from 'resend'

export const hash = async (value: string) => {
  const saltRound = Number(process.env.BCRYPT_SALT_ROUNDS)
  return await bcrypt.hash(value, saltRound)
}

export const compareHash = async (value: string, hashedValue: string) => {
  return await bcrypt.compare(value, hashedValue)
}

export const generateToken = (
  value: string | object | Buffer,
  options?: jwt.SignOptions
) => {
  const secretKey = process.env.JWT_SECRET_KEY as jwt.Secret
  return jwt.sign(value, secretKey, options)
}

export const verifyToken = (token: string) => {
  const secretKey = process.env.JWT_SECRET_KEY as jwt.Secret
  return jwt.verify(token, secretKey)
}

export const sendAccountVerificationEmail = async (
  to: string,
  fullName: string,
  verificationLink: string
) => {
  const resend = new Resend(process.env.RESEND_API_KEY)

  return await resend.emails.send({
    from: 'onboarding@resend.dev',
    to,
    subject: 'Snap Convo Account Verification',
    react: SignUpEmailTemplate({ fullName, verificationLink }),
  })
}
