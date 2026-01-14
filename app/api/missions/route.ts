import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authenticate } from '@/lib/auth'

export const dynamic = 'force-dynamic'

// GET - List all active missions with user progress
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
    const type = searchParams.get('type')

    const where: any = {
      isActive: true,
    }

    if (type) {
      where.type = type
    }

    // Get missions
    const missions = await prisma.mission.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })

    // Get user's progress for these missions
    const userProgress = await prisma.userMission.findMany({
      where: {
        userId: auth.user.id,
        missionId: {
          in: missions.map((m) => m.id),
        },
      },
    })

    // Combine missions with user progress
    const missionsWithProgress = missions.map((mission) => {
      const progress = userProgress.find((p) => p.missionId === mission.id)
      return {
        ...mission,
        userProgress: progress
          ? {
              progress: progress.progress,
              isCompleted: progress.isCompleted,
              completedAt: progress.completedAt,
            }
          : {
              progress: 0,
              isCompleted: false,
              completedAt: null,
            },
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        missions: missionsWithProgress,
      },
    })
  } catch (error) {
    console.error('Get missions error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch missions',
      },
      { status: 500 }
    )
  }
}
