import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { withAdmin } from '@/lib/admin-middleware'

const userUpdateSchema = z.object({
  role: z.enum(['USER', 'CREATOR', 'DEVELOPER', 'MODERATOR', 'ADMIN']).optional(),
  isVerified: z.boolean().optional(),
  points: z.number().int().min(0).optional(),
  level: z.number().int().min(1).optional(),
})

// GET - Get single user with full details
async function getUser(
  req: NextRequest,
  user: any,
  { params }: { params: { id: string } }
) {
  try {
    const targetUser = await prisma.user.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        email: true,
        username: true,
        displayName: true,
        avatar: true,
        bio: true,
        points: true,
        level: true,
        role: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            posts: true,
            comments: true,
            wishlist: true,
            library: true,
            followers: true,
            following: true,
          },
        },
      },
    })

    if (!targetUser) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: { user: targetUser },
    })
  } catch (error) {
    console.error('Get user error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch user' },
      { status: 500 }
    )
  }
}

// PUT - Update user (role, verification, points, etc.)
async function updateUser(
  req: NextRequest,
  user: any,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json()

    // Validate input
    const validation = userUpdateSchema.safeParse(body)
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

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: params.id },
    })

    if (!existingUser) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data,
      select: {
        id: true,
        email: true,
        username: true,
        displayName: true,
        role: true,
        isVerified: true,
        points: true,
        level: true,
      },
    })

    return NextResponse.json({
      success: true,
      data: { user: updatedUser },
      message: 'User updated successfully',
    })
  } catch (error) {
    console.error('Update user error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update user' },
      { status: 500 }
    )
  }
}

// DELETE - Delete user (ban/remove account)
async function deleteUser(
  req: NextRequest,
  user: any,
  { params }: { params: { id: string } }
) {
  try {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: params.id },
    })

    if (!existingUser) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    // Prevent deleting yourself
    if (existingUser.id === user.id) {
      return NextResponse.json(
        { success: false, error: 'You cannot delete your own account' },
        { status: 400 }
      )
    }

    // Delete user (will cascade delete related data)
    await prisma.user.delete({
      where: { id: params.id },
    })

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully',
    })
  } catch (error) {
    console.error('Delete user error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete user' },
      { status: 500 }
    )
  }
}

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  return withAdmin((req, user) => getUser(req, user, context))(req)
}

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  return withAdmin((req, user) => updateUser(req, user, context))(req)
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  return withAdmin((req, user) => deleteUser(req, user, context))(req)
}
