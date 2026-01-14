import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAdmin } from '@/lib/admin-middleware'
import { MOCK_USERS_EXTENDED, paginateMockData } from '@/lib/mock-admin-data'

// GET - List all users with pagination and filters
async function getUsers(req: NextRequest, user: any) {
  try {
    const { searchParams } = new URL(req.url)

    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const role = searchParams.get('role')
    const search = searchParams.get('search')
    const verified = searchParams.get('verified')

    try {
      // Try database first
      const skip = (page - 1) * limit
      const where: any = {}

      if (role) {
        where.role = role
      }

      if (search) {
        where.OR = [
          { email: { contains: search, mode: 'insensitive' } },
          { username: { contains: search, mode: 'insensitive' } },
          { displayName: { contains: search, mode: 'insensitive' } },
        ]
      }

      if (verified !== null) {
        where.isVerified = verified === 'true'
      }

      const total = await prisma.user.count({ where })
      const users = await prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          email: true,
          username: true,
          displayName: true,
          avatar: true,
          points: true,
          level: true,
          role: true,
          isVerified: true,
          createdAt: true,
          _count: {
            select: {
              posts: true,
              wishlist: true,
              library: true,
            },
          },
        },
      })

      return NextResponse.json({
        success: true,
        data: {
          users,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
          },
        },
      })
    } catch (dbError) {
      // Fallback to mock data if database fails
      console.log('Database not available, using mock data for users')

      const result = paginateMockData(
        MOCK_USERS_EXTENDED,
        page,
        limit,
        (user) => {
          if (role && user.role !== role) return false
          if (verified !== null && user.isVerified !== (verified === 'true')) return false
          if (search) {
            const searchLower = search.toLowerCase()
            if (!user.email.toLowerCase().includes(searchLower) &&
                !user.username.toLowerCase().includes(searchLower) &&
                !user.displayName.toLowerCase().includes(searchLower)) {
              return false
            }
          }
          return true
        }
      )

      return NextResponse.json({
        success: true,
        data: {
          users: result.data,
          pagination: result.pagination,
        },
      })
    }
  } catch (error) {
    console.error('Get users error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

export const GET = withAdmin(getUsers)
