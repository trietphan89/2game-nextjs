import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// GET - Get game rankings/trending
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const trending = searchParams.get('trending') === 'true'
    const skip = (page - 1) * limit

    const where: any = {}

    if (trending) {
      where.trending = true
    }

    const [total, rankings] = await Promise.all([
      prisma.gameRanking.count({ where }),
      prisma.gameRanking.findMany({
        where,
        skip,
        take: limit,
        orderBy: { rank: 'asc' },
        include: {
          game: {
            select: {
              id: true,
              title: true,
              slug: true,
              coverImage: true,
              coverGradient: true,
              genre: true,
              category: true,
              developer: true,
              publisher: true,
            },
          },
        },
      }),
    ])

    return NextResponse.json({
      success: true,
      data: {
        rankings,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    })
  } catch (error) {
    console.error('Get game rankings error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch game rankings',
      },
      { status: 500 }
    )
  }
}
