import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authenticate } from '@/lib/auth'

export const dynamic = 'force-dynamic'

// POST - Like a post
export async function POST(
  req: NextRequest,
  { params }: { params: { postId: string } }
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

    const { postId } = params

    // Check if post exists
    const post = await prisma.communityPost.findUnique({
      where: { id: postId },
    })

    if (!post) {
      return NextResponse.json(
        {
          success: false,
          error: 'Post not found',
        },
        { status: 404 }
      )
    }

    // Check if already liked
    const existingLike = await prisma.like.findUnique({
      where: {
        postId_userId: {
          postId,
          userId: auth.user.id,
        },
      },
    })

    if (existingLike) {
      return NextResponse.json(
        {
          success: false,
          error: 'Post already liked',
        },
        { status: 400 }
      )
    }

    // Create like
    await prisma.like.create({
      data: {
        postId,
        userId: auth.user.id,
      },
    })

    // Update post likes count
    await prisma.communityPost.update({
      where: { id: postId },
      data: {
        likesCount: {
          increment: 1,
        },
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Post liked successfully',
    })
  } catch (error) {
    console.error('Like post error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to like post',
      },
      { status: 500 }
    )
  }
}

// DELETE - Unlike a post
export async function DELETE(
  req: NextRequest,
  { params }: { params: { postId: string } }
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

    const { postId } = params

    // Delete like
    const result = await prisma.like.deleteMany({
      where: {
        postId,
        userId: auth.user.id,
      },
    })

    if (result.count === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Like not found',
        },
        { status: 404 }
      )
    }

    // Update post likes count
    await prisma.communityPost.update({
      where: { id: postId },
      data: {
        likesCount: {
          decrement: 1,
        },
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Post unliked successfully',
    })
  } catch (error) {
    console.error('Unlike post error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to unlike post',
      },
      { status: 500 }
    )
  }
}
