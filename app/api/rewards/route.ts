import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authenticate } from '@/lib/auth'

export const dynamic = 'force-dynamic'

// GET - List all available rewards
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const type = searchParams.get('type')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const skip = (page - 1) * limit

    const where: any = {
      isActive: true,
    }

    if (type) {
      where.type = type
    }

    const [total, rewards] = await Promise.all([
      prisma.reward.count({ where }),
      prisma.reward.findMany({
        where,
        skip,
        take: limit,
        orderBy: { pointsCost: 'asc' },
      }),
    ])

    // Get user's points if authenticated
    const auth = await authenticate(req)
    let userPoints = 0

    if (auth.authenticated && auth.user) {
      userPoints = auth.user.points
    }

    return NextResponse.json({
      success: true,
      data: {
        rewards,
        userPoints,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    })
  } catch (error) {
    console.error('Get rewards error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch rewards',
      },
      { status: 500 }
    )
  }
}
