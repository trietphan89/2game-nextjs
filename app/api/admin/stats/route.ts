import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAdmin } from '@/lib/admin-middleware'
import { MOCK_GAMES, MOCK_EVENTS, MOCK_USERS_EXTENDED } from '@/lib/mock-admin-data'

async function getStats(req: NextRequest, user: any) {
  try {
    try {
      // Try database first
      const [totalUsers, totalGames, totalEvents, activeUsers, recentUsers] = await Promise.all([
        prisma.user.count(),
        prisma.game.count(),
        prisma.event.count(),
        prisma.user.count({
          where: {
            updatedAt: {
              gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
            },
          },
        }),
        prisma.user.count({
          where: {
            createdAt: {
              gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
            },
          },
        }),
      ])

      const stats = {
        totalUsers,
        totalGames,
        totalEvents,
        activeUsers,
        revenue: 0, // Mock value for now
        growth: recentUsers > 0 ? Math.round((recentUsers / totalUsers) * 100) : 0,
      }

      return NextResponse.json({
        success: true,
        data: { stats },
      })
    } catch (dbError) {
      // Fallback to mock data if database fails
      console.log('Database not available, using mock data for stats')

      const stats = {
        totalUsers: MOCK_USERS_EXTENDED.length,
        totalGames: MOCK_GAMES.length,
        totalEvents: MOCK_EVENTS.length,
        activeUsers: Math.floor(MOCK_USERS_EXTENDED.length * 0.6), // 60% active
        revenue: 125340, // Mock revenue
        growth: 15, // 15% growth
      }

      return NextResponse.json({
        success: true,
        data: { stats },
      })
    }
  } catch (error) {
    console.error('Get stats error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}

export const GET = withAdmin(getStats)
