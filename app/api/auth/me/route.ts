import { NextRequest, NextResponse } from 'next/server'
import { authenticate } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const auth = await authenticate(request)

    if (!auth.authenticated || !auth.user) {
      return NextResponse.json(
        {
          success: false,
          error: auth.error || 'Not authenticated',
        },
        { status: 401 }
      )
    }

    // Get user stats
    const [wishlistCount, libraryCount, postsCount, followersCount, followingCount] = await Promise.all([
      prisma.userWishlist.count({ where: { userId: auth.user.id } }),
      prisma.userLibrary.count({ where: { userId: auth.user.id } }),
      prisma.communityPost.count({ where: { userId: auth.user.id } }),
      prisma.follow.count({ where: { followingId: auth.user.id } }),
      prisma.follow.count({ where: { followerId: auth.user.id } }),
    ])

    // Remove password from user object
    const { password: _, ...userWithoutPassword } = auth.user

    return NextResponse.json({
      success: true,
      data: {
        user: {
          ...userWithoutPassword,
          stats: {
            wishlistCount,
            libraryCount,
            postsCount,
            followersCount,
            followingCount,
          },
        },
      },
    })
  } catch (error) {
    console.error('Get user error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to get user',
      },
      { status: 500 }
    )
  }
}
