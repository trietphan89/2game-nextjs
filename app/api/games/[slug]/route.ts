import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authenticate } from '@/lib/auth'

export const dynamic = 'force-dynamic'

// GET - Get game details by slug
export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params

    // Get game details
    const game = await prisma.game.findUnique({
      where: {
        slug,
        isActive: true,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        genre: true,
        category: true,
        price: true,
        originalPrice: true,
        discount: true,
        rating: true,
        totalReviews: true,
        coverImage: true,
        coverGradient: true,
        screenshots: true,
        videoUrl: true,
        developer: true,
        publisher: true,
        releaseDate: true,
        platforms: true,
        languages: true,
        features: true,
        systemReqs: true,
        isFeatured: true,
        totalPlayers: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!game) {
      return NextResponse.json(
        {
          success: false,
          error: 'Game not found',
        },
        { status: 404 }
      )
    }

    // Check if user is authenticated and owns this game
    let isInLibrary = false
    let isInWishlist = false

    const auth = await authenticate(req)
    if (auth.authenticated && auth.user) {
      const [library, wishlist] = await Promise.all([
        prisma.userLibrary.findUnique({
          where: {
            userId_gameId: {
              userId: auth.user.id,
              gameId: game.id,
            },
          },
        }),
        prisma.userWishlist.findUnique({
          where: {
            userId_gameId: {
              userId: auth.user.id,
              gameId: game.id,
            },
          },
        }),
      ])

      isInLibrary = !!library
      isInWishlist = !!wishlist
    }

    return NextResponse.json({
      success: true,
      data: {
        game,
        userStatus: {
          isInLibrary,
          isInWishlist,
        },
      },
    })
  } catch (error) {
    console.error('Get game error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch game',
      },
      { status: 500 }
    )
  }
}
