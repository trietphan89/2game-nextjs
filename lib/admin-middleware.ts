import { NextRequest, NextResponse } from 'next/server'
import { mockGetSession } from '@/lib/mock-auth'

export interface AdminRequest extends NextRequest {
  user?: {
    id: string
    email: string
    role: string
  }
}

/**
 * Admin middleware - Verify user is logged in and has ADMIN role
 */
export async function verifyAdmin(request: NextRequest) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get('authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        authorized: false,
        response: NextResponse.json(
          { success: false, error: 'Unauthorized - No token provided' },
          { status: 401 }
        ),
      }
    }

    const token = authHeader.substring(7) // Remove 'Bearer ' prefix

    // Find session using mock auth
    const session = mockGetSession(token)

    if (!session) {
      return {
        authorized: false,
        response: NextResponse.json(
          { success: false, error: 'Unauthorized - Invalid or expired token' },
          { status: 401 }
        ),
      }
    }

    // Check if user has ADMIN or MODERATOR role
    if (session.user.role !== 'ADMIN' && session.user.role !== 'MODERATOR') {
      return {
        authorized: false,
        response: NextResponse.json(
          { success: false, error: 'Forbidden - Admin access required' },
          { status: 403 }
        ),
      }
    }

    // User is authorized
    return {
      authorized: true,
      user: session.user,
    }
  } catch (error) {
    console.error('Admin middleware error:', error)
    return {
      authorized: false,
      response: NextResponse.json(
        { success: false, error: 'Internal server error' },
        { status: 500 }
      ),
    }
  }
}

/**
 * Helper to wrap admin-only API routes
 */
export function withAdmin(
  handler: (req: NextRequest, user: any) => Promise<NextResponse>
) {
  return async (req: NextRequest) => {
    const auth = await verifyAdmin(req)

    if (!auth.authorized) {
      return auth.response!
    }

    return handler(req, auth.user)
  }
}
