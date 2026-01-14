import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// GET - Global search across games, users, events
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const query = searchParams.get('q')
    const type = searchParams.get('type') // games, users, events, all
    const limit = parseInt(searchParams.get('limit') || '10')

    if (!query || query.length < 2) {
      return NextResponse.json(
        {
          success: false,
          error: 'Search query must be at least 2 characters',
        },
        { status: 400 }
      )
    }

    const results: any = {
      games: [],
      users: [],
      events: [],
    }

    // Search games
    if (!type || type === 'games' || type === 'all') {
      results.games = await prisma.game.findMany({
        where: {
          isActive: true,
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            { developer: { contains: query, mode: 'insensitive' } },
            { publisher: { contains: query, mode: 'insensitive' } },
          ],
        },
        take: limit,
        select: {
          id: true,
          title: true,
          slug: true,
          coverImage: true,
          coverGradient: true,
          price: true,
          rating: true,
          developer: true,
        },
      })
    }

    // Search users
    if (!type || type === 'users' || type === 'all') {
      results.users = await prisma.user.findMany({
        where: {
          OR: [
            { username: { contains: query, mode: 'insensitive' } },
            { displayName: { contains: query, mode: 'insensitive' } },
          ],
        },
        take: limit,
        select: {
          id: true,
          username: true,
          displayName: true,
          avatar: true,
          level: true,
        },
      })
    }

    // Search events
    if (!type || type === 'events' || type === 'all') {
      results.events = await prisma.event.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
          ],
        },
        take: limit,
        select: {
          id: true,
          title: true,
          slug: true,
          type: true,
          status: true,
          startDate: true,
          endDate: true,
          banner: true,
        },
      })
    }

    return NextResponse.json({
      success: true,
      data: results,
      query,
    })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Search failed',
      },
      { status: 500 }
    )
  }
}
