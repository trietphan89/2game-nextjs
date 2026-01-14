import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { withAdmin } from '@/lib/admin-middleware'
import { MOCK_GAMES, paginateMockData } from '@/lib/mock-admin-data'

// Validation schema for creating/updating games
const gameSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().optional(),
  genre: z.array(z.string()),
  category: z.string(),
  price: z.number().min(0).default(0),
  originalPrice: z.number().min(0).optional(),
  discount: z.number().min(0).max(100).default(0),
  coverImage: z.string().optional(),
  coverGradient: z.string().optional(),
  screenshots: z.array(z.string()).default([]),
  videoUrl: z.string().optional(),
  developer: z.string().optional(),
  publisher: z.string().optional(),
  releaseDate: z.string().optional(),
  platforms: z.array(z.string()).default([]),
  languages: z.array(z.string()).default([]),
  features: z.array(z.string()).default([]),
  systemReqs: z.any().optional(),
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(true),
})

// GET - List all games with pagination and filters
async function getGames(req: NextRequest, user: any) {
  try {
    const { searchParams } = new URL(req.url)

    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const isFeatured = searchParams.get('isFeatured')
    const status = searchParams.get('status')

    try {
      // Try database first
      const skip = (page - 1) * limit
      const where: any = {}

      if (category) {
        where.category = category
      }

      if (search) {
        where.OR = [
          { title: { contains: search, mode: 'insensitive' } },
          { developer: { contains: search, mode: 'insensitive' } },
          { publisher: { contains: search, mode: 'insensitive' } },
        ]
      }

      if (isFeatured !== null) {
        where.isFeatured = isFeatured === 'true'
      }

      if (status) {
        where.status = status
      }

      const total = await prisma.game.count({ where })
      const games = await prisma.game.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      })

      return NextResponse.json({
        success: true,
        data: {
          games,
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
      console.log('Database not available, using mock data')

      const result = paginateMockData(
        MOCK_GAMES,
        page,
        limit,
        (game) => {
          if (category && game.category !== category) return false
          if (search && !game.title.toLowerCase().includes(search.toLowerCase()) &&
              !game.developer.toLowerCase().includes(search.toLowerCase()) &&
              !game.publisher.toLowerCase().includes(search.toLowerCase())) return false
          if (isFeatured !== null && game.isFeatured !== (isFeatured === 'true')) return false
          if (status && game.status !== status) return false
          return true
        }
      )

      return NextResponse.json({
        success: true,
        data: {
          games: result.data,
          pagination: result.pagination,
        },
      })
    }
  } catch (error) {
    console.error('Get games error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch games' },
      { status: 500 }
    )
  }
}

// POST - Create new game
async function createGame(req: NextRequest, user: any) {
  try {
    const body = await req.json()

    // Validate input
    const validation = gameSchema.safeParse(body)
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

    // Check if slug already exists
    const existingGame = await prisma.game.findUnique({
      where: { slug: data.slug },
    })

    if (existingGame) {
      return NextResponse.json(
        { success: false, error: 'Game with this slug already exists' },
        { status: 400 }
      )
    }

    // Create game
    const game = await prisma.game.create({
      data: {
        ...data,
        price: data.price.toString(),
        originalPrice: data.originalPrice ? data.originalPrice.toString() : undefined,
      },
    })

    return NextResponse.json({
      success: true,
      data: { game },
      message: 'Game created successfully',
    })
  } catch (error) {
    console.error('Create game error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create game' },
      { status: 500 }
    )
  }
}

// Export with admin middleware
export const GET = withAdmin(getGames)
export const POST = withAdmin(createGame)
