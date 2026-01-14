import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { authenticate } from '@/lib/auth'

export const dynamic = 'force-dynamic'

// GET - Get user's game library
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
    const category = searchParams.get('category')
    const sortBy = searchParams.get('sortBy') || 'acquiredAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'
    const skip = (page - 1) * limit

    const where: any = { userId: auth.user.id }

    if (category) {
      where.game = {
        category,
      }
    }

    const orderBy: any = {}
    switch (sortBy) {
      case 'playTime':
        orderBy.playTime = sortOrder
        break
      case 'lastPlayed':
        orderBy.lastPlayedAt = sortOrder
        break
      case 'title':
        orderBy.game = { title: sortOrder }
        break
      default:
        orderBy.acquiredAt = sortOrder
    }

    const [total, libraryItems] = await Promise.all([
      prisma.userLibrary.count({ where }),
      prisma.userLibrary.findMany({
        where,
        skip,
        take: limit,
        orderBy,
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
              rating: true,
              coverImage: true,
              coverGradient: true,
              developer: true,
              publisher: true,
              platforms: true,
            },
          },
        },
      }),
    ])

    return NextResponse.json({
      success: true,
      data: {
        items: libraryItems,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    })
  } catch (error) {
    console.error('Get library error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch library',
      },
      { status: 500 }
    )
  }
}

// POST - Add game to library (purchase)
const addSchema = z.object({
  gameId: z.string().min(1, 'Game ID is required'),
  transactionId: z.string().optional(),
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

    // Check if already in library
    const existing = await prisma.userLibrary.findUnique({
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
          error: 'Game already in library',
        },
        { status: 400 }
      )
    }

    // Add to library
    const libraryItem = await prisma.userLibrary.create({
      data: {
        userId: auth.user.id,
        gameId,
      },
      include: {
        game: true,
      },
    })

    // Remove from wishlist if exists
    await prisma.userWishlist.deleteMany({
      where: {
        userId: auth.user.id,
        gameId,
      },
    })

    return NextResponse.json({
      success: true,
      data: { item: libraryItem },
      message: 'Game added to library',
    })
  } catch (error) {
    console.error('Add to library error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to add to library',
      },
      { status: 500 }
    )
  }
}

// PATCH - Update library item (play time, progress, etc.)
const updateSchema = z.object({
  gameId: z.string().min(1, 'Game ID is required'),
  playTime: z.number().optional(),
  progress: z.number().min(0).max(100).optional(),
  isFavorite: z.boolean().optional(),
  lastPlayedAt: z.string().datetime().optional(),
})

export async function PATCH(req: NextRequest) {
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
    const validation = updateSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: validation.error.issues[0].message,
        },
        { status: 400 }
      )
    }

    const { gameId, ...updateData } = validation.data

    // Update library item
    const libraryItem = await prisma.userLibrary.update({
      where: {
        userId_gameId: {
          userId: auth.user.id,
          gameId,
        },
      },
      data: {
        ...updateData,
        lastPlayedAt: updateData.lastPlayedAt ? new Date(updateData.lastPlayedAt) : undefined,
      },
      include: {
        game: true,
      },
    })

    return NextResponse.json({
      success: true,
      data: { item: libraryItem },
      message: 'Library item updated',
    })
  } catch (error) {
    console.error('Update library error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update library item',
      },
      { status: 500 }
    )
  }
}
