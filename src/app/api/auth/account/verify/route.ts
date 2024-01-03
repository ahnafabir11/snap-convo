import { verifyToken } from '@/utils/helper'
import { PrismaClient } from '@prisma/client'
import { JwtPayload } from 'jsonwebtoken'

const prisma = new PrismaClient()

export async function GET(req: Request) {
  try {
    // GETTING TOKEN FROM PARAMETER
    const { searchParams } = new URL(req.url)
    const token = searchParams.get('token')

    // !! TOKEN NOT EXIST
    // SENDING ERROR RESPONSE
    if (!token) {
      return Response.json(
        { errors: { message: 'Token is not provided!' } },
        { status: 401, statusText: 'INVALID_TOKEN' }
      )
    }

    // VERIFYING TOKEN
    const { id, email } = verifyToken(token) as JwtPayload

    // CHECKING IF USER EXIST
    // WITH ID AND EMAIL FROM JWT PAYLOAD
    const hasUser = await prisma.user.findFirst({
      where: { id, email },
    })

    // USER NOT EXIST
    // SENDING ERROR RESPONSE
    if (!hasUser) {
      return Response.json(
        { errors: { message: 'User not found, Token might be invalid!' } },
        { status: 401, statusText: 'INVALID_TOKEN' }
      )
    }

    if (hasUser.verified) {
      return Response.json(
        { errors: { message: 'User already verified!' } },
        { status: 400, statusText: 'ALREADY_VERIFIED' }
      )
    }

    const user = await prisma.user.update({
      where: { id, email },
      data: { verified: true },
    })

    return Response.json(user, { status: 200, statusText: 'success' })
  } catch (e: unknown) {
    // CATCHING UNEXPECTED ERROR
    // AND SENDING ERROR RESPONSE
    return Response.json(
      { errors: e },
      { status: 500, statusText: 'UNEXPECTED_ERROR' }
    )
  }
}
