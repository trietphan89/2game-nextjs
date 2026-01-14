import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// GET - List all games with pagination and filters (Public API)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const isFeatured = searchParams.get('isFeatured')
    const genre = searchParams.get('genre')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const platform = searchParams.get('platform')
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    const skip = (page - 1) * limit
    const where: any = {
      isActive: true, // Only show active games to public
    }

    // Category filter
    if (category) {
      where.category = category
    }

    // Genre filter
    if (genre) {
      where.genre = {
        has: genre,
      }
    }

    // Platform filter
    if (platform) {
      where.platforms = {
        has: platform,
      }
    }

    // Featured filter
    if (isFeatured !== null) {
      where.isFeatured = isFeatured === 'true'
    }

    // Price range filter
    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) {
        where.price.gte = parseFloat(minPrice)
      }
      if (maxPrice) {
        where.price.lte = parseFloat(maxPrice)
      }
    }

    // Search filter
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { developer: { contains: search, mode: 'insensitive' } },
        { publisher: { contains: search, mode: 'insensitive' } },
      ]
    }

    // Sorting
    const orderBy: any = {}
    switch (sortBy) {
      case 'price':
        orderBy.price = sortOrder
        break
      case 'rating':
        orderBy.rating = sortOrder
        break
      case 'releaseDate':
        orderBy.releaseDate = sortOrder
        break
      case 'title':
        orderBy.title = sortOrder
        break
      case 'totalPlayers':
        orderBy.totalPlayers = sortOrder
        break
      default:
        orderBy.createdAt = sortOrder
    }

    const [total, games] = await Promise.all([
      prisma.game.count({ where }),
      prisma.game.findMany({
        where,
        skip,
        take: limit,
        orderBy,
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
          isFeatured: true,
          totalPlayers: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
    ])

    return NextResponse.json({
      success: true,
      data: {
        games,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasMore: page < Math.ceil(total / limit),
        },
      },
    })
  } catch (error) {
    console.error('Get games error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch games',
      },
      { status: 500 }
    )
  }
}
