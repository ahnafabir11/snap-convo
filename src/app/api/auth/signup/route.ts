import { signUpFormSchema } from '@/types/form'
import {
  generateToken,
  hash,
  sendAccountVerificationEmail,
} from '@/utils/helper'
import { PrismaClient } from '@prisma/client'
import { NextRequest } from 'next/server'
import { Resend } from 'resend'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    // GETTING DATA FROM REQUEST BODY
    const body = await req.json()

    // VALIDATING ALL FIELDS WITH ZOD
    const validatedFields = signUpFormSchema.safeParse(body)

    // !!VALIDATION FAILED
    // SENDING ERROR RESPONSE WITH
    // CERTAIN FIELD ERRORS PROVIDED BY ZOD
    if (!validatedFields.success) {
      const errors = validatedFields.error.flatten().fieldErrors

      return Response.json(
        { errors },
        { status: 403, statusText: 'VALIDATION_ERROR' }
      )
    }

    const { fullName, email, password } = validatedFields.data

    // CHECKING IF EMAIL ALREADY EXIST
    const hasUser = await prisma.user.findFirst({
      where: { email },
    })

    // !!EMAIL ALREADY EXIST
    // SENDING ERROR RESPONSE
    // WITH CUSTOM ERROR MESSAGE
    if (hasUser) {
      return Response.json(
        { errors: { email: ['Email already in use!'] } },
        { status: 403, statusText: 'VALIDATION_ERROR' }
      )
    }

    // EMAIL IS NOT EXIST
    // HASHING PASSWORD WITH BCRYPT
    const hashedPassword = await hash(password)

    const data = { fullName, email, password: hashedPassword }

    // INSERTING USER INTO DATABASE
    const newUser = await prisma.user.create({ data: data })

    // GENERATING TOKEN USING JWT
    // THIS TOKEN WILL BE SEND TO
    // AN EMAIL TO VERIFY THE USER
    const token = await generateToken({ id: newUser.id, email: newUser.email })

    const verificationLink = encodeURI(
      `http://localhost:3000/account/verify?token=${token}`
    )

    await sendAccountVerificationEmail(
      newUser.email,
      newUser.fullName,
      verificationLink
    )

    // SENDING SUCCESS RESPONSE
    return Response.json(
      { message: 'Please verify your email.' },
      { status: 201, statusText: 'success' }
    )
  } catch (e: unknown) {
    // CATCHING UNEXPECTED ERROR
    // AND SENDING ERROR RESPONSE
    return Response.json(
      { errors: e },
      { status: 500, statusText: 'UNEXPECTED_ERROR' }
    )
  }
}
