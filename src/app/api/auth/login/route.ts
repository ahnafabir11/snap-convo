import { loginFormSchema } from '@/types/form'
import { compareHash, generateToken } from '@/utils/helper'
import { PrismaClient } from '@prisma/client'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    // GETTING DATA FROM REQUEST BODY
    const body = await req.json()

    // VALIDATING ALL FIELDS WITH ZOD
    const validatedFields = loginFormSchema.safeParse(body)

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

    const { email, password } = validatedFields.data

    // CHECKING IF EMAIL ALREADY EXIST
    const user = await prisma.user.findFirst({
      where: { email },
    })

    // !!EMAIL DOES'NT EXIST
    // SENDING ERROR RESPONSE
    // WITH CUSTOM ERROR MESSAGE
    if (!user) {
      return Response.json(
        { errors: { email: ['No account with this email!'] } },
        { status: 404, statusText: 'VALIDATION_ERROR' }
      )
    }

    // CHECK IF PASSWORD MATCHES
    const isPasswordMatched = await compareHash(password, user.password)

    // PASSWORD DIDN'T MATCH
    if (!isPasswordMatched) {
      return Response.json(
        { errors: { password: ['Password mismatched!'] } },
        { status: 401, statusText: 'VALIDATION_ERROR' }
      )
    }

    // PASSWORD MATCHED
    // CREATE JW TOKEN FOR HTTP COOKIE
    const token = generateToken(
      { id: user.id, email: user.email },
      { expiresIn: '1d' }
    )

    cookies().set({
      name: 'token',
      value: token,
      httpOnly: true,
    })

    return Response.json(user, { status: 200, statusText: 'success' })
  } catch (e) {
    // CATCHING UNEXPECTED ERROR
    // AND SENDING ERROR RESPONSE
    return Response.json(
      { errors: e },
      { status: 500, statusText: 'UNEXPECTED_ERROR' }
    )
  }
}
