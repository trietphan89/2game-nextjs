import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { authenticate } from '@/lib/auth'

export const dynamic = 'force-dynamic'

// GET - Get user's wishlist
export async function GET(req: NextRequest) {
  try {
    const auth = await authenticate(req)

    if (!auth.authenticated || !auth.user) {
      return NextResponse.json(
        {
          success: false,
          error: 'Not authenticated',
        },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const skip = (page - 1) * limit

    const [total, wishlistItems] = await Promise.all([
      prisma.userWishlist.count({
        where: { userId: auth.user.id },
      }),
      prisma.userWishlist.findMany({
        where: { userId: auth.user.id },
        skip,
        take: limit,
        orderBy: { addedAt: 'desc' },
        include: {
          game: {
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
              coverImage: true,
              coverGradient: true,
              developer: true,
              publisher: true,
              releaseDate: true,
              platforms: true,
            },
          },
        },
      }),
    ])

    return NextResponse.json({
      success: true,
      data: {
        items: wishlistItems,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    })
  } catch (error) {
    console.error('Get wishlist error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch wishlist',
      },
      { status: 500 }
    )
  }
}

// POST - Add game to wishlist
const addSchema = z.object({
  gameId: z.string().min(1, 'Game ID is required'),
})

export async function POST(req: NextRequest) {
  try {
    const auth = await authenticate(req)

    if (!auth.authenticated || !auth.user) {
      return NextResponse.json(
        {
          success: false,
          error: 'Not authenticated',
        },
        { status: 401 }
      )
    }

    const body = await req.json()
    const validation = addSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: validation.error.issues[0].message,
        },
        { status: 400 }
      )
    }

    const { gameId } = validation.data

    // Check if game exists
    const game = await prisma.game.findUnique({
      where: { id: gameId },
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

    // Check if already in wishlist
    const existing = await prisma.userWishlist.findUnique({
      where: {
        userId_gameId: {
          userId: auth.user.id,
          gameId,
        },
      },
    })

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          error: 'Game already in wishlist',
        },
        { status: 400 }
      )
    }

    // Add to wishlist
    const wishlistItem = await prisma.userWishlist.create({
      data: {
        userId: auth.user.id,
        gameId,
      },
      include: {
        game: true,
      },
    })

    return NextResponse.json({
      success: true,
      data: { item: wishlistItem },
      message: 'Game added to wishlist',
    })
  } catch (error) {
    console.error('Add to wishlist error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to add to wishlist',
      },
      { status: 500 }
    )
  }
}

// DELETE - Remove game from wishlist
export async function DELETE(req: NextRequest) {
  try {
    const auth = await authenticate(req)

    if (!auth.authenticated || !auth.user) {
      return NextResponse.json(
        {
          success: false,
          error: 'Not authenticated',
        },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(req.url)
    const gameId = searchParams.get('gameId')

    if (!gameId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Game ID is required',
        },
        { status: 400 }
      )
    }

    await prisma.userWishlist.deleteMany({
      where: {
        userId: auth.user.id,
        gameId,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Game removed from wishlist',
    })
  } catch (error) {
    console.error('Remove from wishlist error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to remove from wishlist',
      },
      { status: 500 }
    )
  }
}
