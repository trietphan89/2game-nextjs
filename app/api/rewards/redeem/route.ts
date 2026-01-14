import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { authenticate } from '@/lib/auth'

export const dynamic = 'force-dynamic'

// POST - Redeem a reward
const redeemSchema = z.object({
  rewardId: z.string().min(1, 'Reward ID is required'),
})

export async function POST(req: NextRequest) {
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

    const body = await req.json()
    const validation = redeemSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: validation.error.issues[0].message,
        },
        { status: 400 }
      )
    }

    const { rewardId } = validation.data

    // Get reward
    const reward = await prisma.reward.findUnique({
      where: { id: rewardId },
    })

    if (!reward || !reward.isActive) {
      return NextResponse.json(
        {
          success: false,
          error: 'Reward not found or not available',
        },
        { status: 404 }
      )
    }

    // Check if user has enough points
    const user = await prisma.user.findUnique({
      where: { id: auth.user.id },
    })

    if (!user || user.points < reward.pointsCost) {
      return NextResponse.json(
        {
          success: false,
          error: 'Insufficient points',
        },
        { status: 400 }
      )
    }

    // Check stock
    if (reward.stock !== -1 && reward.stock <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Reward out of stock',
        },
        { status: 400 }
      )
    }

    // Redeem reward in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Deduct points
      await tx.user.update({
        where: { id: auth.user!.id },
        data: {
          points: {
            decrement: reward.pointsCost,
          },
        },
      })

      // Update stock if limited
      if (reward.stock !== -1) {
        await tx.reward.update({
          where: { id: rewardId },
          data: {
            stock: {
              decrement: 1,
            },
          },
        })
      }

      // Create user reward record
      const userReward = await tx.userReward.create({
        data: {
          userId: auth.user!.id,
          rewardId,
        },
      })

      return userReward
    })

    return NextResponse.json({
      success: true,
      data: { userReward: result },
      message: 'Reward redeemed successfully',
    })
  } catch (error) {
    console.error('Redeem reward error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to redeem reward',
      },
      { status: 500 }
    )
  }
}
