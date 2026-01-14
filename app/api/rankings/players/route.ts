import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// GET - Get player rankings/leaderboard
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const skip = (page - 1) * limit

    const [total, rankings] = await Promise.all([
      prisma.playerRanking.count(),
      prisma.playerRanking.findMany({
        skip,
        take: limit,
        orderBy: { rank: 'asc' },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              displayName: true,
              avatar: true,
              level: true,
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
    console.error('Get player rankings error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch player rankings',
      },
      { status: 500 }
    )
  }
}
