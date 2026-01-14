import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authenticate } from '@/lib/auth'

export const dynamic = 'force-dynamic'

// POST - Claim completed mission reward
export async function POST(
  req: NextRequest,
  { params }: { params: { missionId: string } }
) {
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

    const { missionId } = params

    // Get mission
    const mission = await prisma.mission.findUnique({
      where: { id: missionId },
    })

    if (!mission || !mission.isActive) {
      return NextResponse.json(
        {
          success: false,
          error: 'Mission not found or not available',
        },
        { status: 404 }
      )
    }

    // Get user's progress
    const userMission = await prisma.userMission.findUnique({
      where: {
        userId_missionId: {
          userId: auth.user.id,
          missionId,
        },
      },
    })

    if (!userMission) {
      return NextResponse.json(
        {
          success: false,
          error: 'Mission not started',
        },
        { status: 400 }
      )
    }

    if (!userMission.isCompleted) {
      return NextResponse.json(
        {
          success: false,
          error: 'Mission not completed yet',
        },
        { status: 400 }
      )
    }

    if (userMission.completedAt) {
      return NextResponse.json(
        {
          success: false,
          error: 'Reward already claimed',
        },
        { status: 400 }
      )
    }

    // Award points
    const result = await prisma.$transaction(async (tx) => {
      // Update user points
      await tx.user.update({
        where: { id: auth.user!.id },
        data: {
          points: {
            increment: mission.pointsReward,
          },
        },
      })

      // Mark as claimed
      const updated = await tx.userMission.update({
        where: {
          userId_missionId: {
            userId: auth.user!.id,
            missionId,
          },
        },
        data: {
          completedAt: new Date(),
        },
      })

      return updated
    })

    return NextResponse.json({
      success: true,
      data: {
        userMission: result,
        pointsEarned: mission.pointsReward,
      },
      message: `Claimed ${mission.pointsReward} points!`,
    })
  } catch (error) {
    console.error('Claim mission error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to claim mission reward',
      },
      { status: 500 }
    )
  }
}
