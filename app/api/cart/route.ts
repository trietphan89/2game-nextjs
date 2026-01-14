import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { authenticate } from '@/lib/auth'

export const dynamic = 'force-dynamic'

// Simple in-memory cart (for demo - in production use Redis or database)
// Key: userId, Value: Array of gameIds
const carts = new Map<string, string[]>()

// GET - Get user's cart
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

    const gameIds = carts.get(auth.user.id) || []

    // Get game details
    const games = await prisma.game.findMany({
      where: {
        id: {
          in: gameIds,
        },
        isActive: true,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        price: true,
        originalPrice: true,
        discount: true,
        coverImage: true,
        coverGradient: true,
        developer: true,
      },
    })

    // Calculate totals
    const subtotal = games.reduce((sum, game) => sum + parseFloat(game.price.toString()), 0)
    const total = subtotal // Add tax/fees if needed

    return NextResponse.json({
      success: true,
      data: {
        items: games,
        summary: {
          itemCount: games.length,
          subtotal,
          total,
        },
      },
    })
  } catch (error) {
    console.error('Get cart error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch cart',
      },
      { status: 500 }
    )
  }
}

// POST - Add item to cart
const addToCartSchema = z.object({
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
    const validation = addToCartSchema.safeParse(body)

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
      where: { id: gameId, isActive: true },
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
    const inLibrary = await prisma.userLibrary.findUnique({
      where: {
        userId_gameId: {
          userId: auth.user.id,
          gameId,
        },
      },
    })

    if (inLibrary) {
      return NextResponse.json(
        {
          success: false,
          error: 'Game already in library',
        },
        { status: 400 }
      )
    }

    // Add to cart
    const currentCart = carts.get(auth.user.id) || []

    if (!currentCart.includes(gameId)) {
      currentCart.push(gameId)
      carts.set(auth.user.id, currentCart)
    }

    return NextResponse.json({
      success: true,
      message: 'Game added to cart',
      data: {
        itemCount: currentCart.length,
      },
    })
  } catch (error) {
    console.error('Add to cart error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to add to cart',
      },
      { status: 500 }
    )
  }
}

// DELETE - Remove item from cart
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

    const currentCart = carts.get(auth.user.id) || []
    const updatedCart = currentCart.filter((id) => id !== gameId)
    carts.set(auth.user.id, updatedCart)

    return NextResponse.json({
      success: true,
      message: 'Game removed from cart',
      data: {
        itemCount: updatedCart.length,
      },
    })
  } catch (error) {
    console.error('Remove from cart error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to remove from cart',
      },
      { status: 500 }
    )
  }
}
