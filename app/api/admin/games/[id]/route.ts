import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { withAdmin } from '@/lib/admin-middleware'

const gameUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  description: z.string().optional(),
  genre: z.array(z.string()).optional(),
  category: z.string().optional(),
  price: z.number().min(0).optional(),
  originalPrice: z.number().min(0).optional(),
  discount: z.number().min(0).max(100).optional(),
  rating: z.number().min(0).max(5).optional(),
  coverImage: z.string().optional(),
  coverGradient: z.string().optional(),
  screenshots: z.array(z.string()).optional(),
  videoUrl: z.string().optional(),
  developer: z.string().optional(),
  publisher: z.string().optional(),
  releaseDate: z.string().optional(),
  platforms: z.array(z.string()).optional(),
  languages: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),
  systemReqs: z.any().optional(),
  isFeatured: z.boolean().optional(),
  isActive: z.boolean().optional(),
})

// GET - Get single game by ID
async function getGame(
  req: NextRequest,
  user: any,
  { params }: { params: { id: string } }
) {
  try {
    const game = await prisma.game.findUnique({
      where: { id: params.id },
    })

    if (!game) {
      return NextResponse.json(
        { success: false, error: 'Game not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: { game },
    })
  } catch (error) {
    console.error('Get game error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch game' },
      { status: 500 }
    )
  }
}

// PUT - Update game
async function updateGame(
  req: NextRequest,
  user: any,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json()

    // Validate input
    const validation = gameUpdateSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: validation.error.issues[0].message,
        },
        { status: 400 }
      )
    }

    const data = validation.data

    // Check if game exists
    const existingGame = await prisma.game.findUnique({
      where: { id: params.id },
    })

    if (!existingGame) {
      return NextResponse.json(
        { success: false, error: 'Game not found' },
        { status: 404 }
      )
    }

    // If updating slug, check for duplicates
    if (data.slug && data.slug !== existingGame.slug) {
      const duplicateSlug = await prisma.game.findUnique({
        where: { slug: data.slug },
      })

      if (duplicateSlug) {
        return NextResponse.json(
          { success: false, error: 'Game with this slug already exists' },
          { status: 400 }
        )
      }
    }

    // Update game
    const game = await prisma.game.update({
      where: { id: params.id },
      data: {
        ...data,
        price: data.price ? data.price.toString() : undefined,
        originalPrice: data.originalPrice ? data.originalPrice.toString() : undefined,
      },
    })

    return NextResponse.json({
      success: true,
      data: { game },
      message: 'Game updated successfully',
    })
  } catch (error) {
    console.error('Update game error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update game' },
      { status: 500 }
    )
  }
}

// DELETE - Delete game
async function deleteGame(
  req: NextRequest,
  user: any,
  { params }: { params: { id: string } }
) {
  try {
    // Check if game exists
    const existingGame = await prisma.game.findUnique({
      where: { id: params.id },
    })

    if (!existingGame) {
      return NextResponse.json(
        { success: false, error: 'Game not found' },
        { status: 404 }
      )
    }

    // Delete game
    await prisma.game.delete({
      where: { id: params.id },
    })

    return NextResponse.json({
      success: true,
      message: 'Game deleted successfully',
    })
  } catch (error) {
    console.error('Delete game error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete game' },
      { status: 500 }
    )
  }
}

// Export with admin middleware and context
export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  return withAdmin((req, user) => getGame(req, user, context))(req)
}

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  return withAdmin((req, user) => updateGame(req, user, context))(req)
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  return withAdmin((req, user) => deleteGame(req, user, context))(req)
}
