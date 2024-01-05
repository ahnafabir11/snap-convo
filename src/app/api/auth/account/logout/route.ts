import { verifyToken } from '@/utils/helper'
import { JwtPayload } from 'jsonwebtoken'
import { cookies } from 'next/headers'

export async function GET() {
  try {
    // GET TOKEN FROM COOKIE
    const token = cookies().get('token')

    // NO TOKEN FOUND
    if (!token) {
      return Response.json(
        { errors: { message: 'Token not found' } },
        { status: 401, statusText: 'UNAUTHORIZED' }
      )
    }

    // VERIFYING JW TOKEN
    // IF NOT VALID WILL GO TO CATCH BLOCK
    verifyToken(token.value) as JwtPayload

    cookies().delete('token')

    return Response.json(
      { message: 'User logged out.' },
      { status: 200, statusText: 'success' }
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
