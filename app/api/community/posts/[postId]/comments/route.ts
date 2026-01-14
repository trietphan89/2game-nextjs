import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { authenticate } from '@/lib/auth'

export const dynamic = 'force-dynamic'

// GET - Get comments for a post
export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const { postId } = params
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const skip = (page - 1) * limit

    const [total, comments] = await Promise.all([
      prisma.comment.count({
        where: {
          postId,
          parentId: null, // Only top-level comments
        },
      }),
      prisma.comment.findMany({
        where: {
          postId,
          parentId: null,
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              displayName: true,
              avatar: true,
            },
          },
          replies: {
            include: {
              user: {
                select: {
                  id: true,
                  username: true,
                  displayName: true,
                  avatar: true,
                },
              },
            },
            orderBy: { createdAt: 'asc' },
          },
        },
      }),
    ])

    return NextResponse.json({
      success: true,
      data: {
        comments,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    })
  } catch (error) {
    console.error('Get comments error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch comments',
      },
      { status: 500 }
    )
  }
}

// POST - Add a comment to a post
const createCommentSchema = z.object({
  content: z.string().min(1, 'Content is required').max(1000, 'Content too long'),
  parentId: z.string().optional(), // For replies
})

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
    const body = await req.json()
    const validation = createCommentSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: validation.error.issues[0].message,
        },
        { status: 400 }
      )
    }

    const { content, parentId } = validation.data

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

    // Create comment
    const comment = await prisma.comment.create({
      data: {
        postId,
        userId: auth.user.id,
        content,
        parentId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatar: true,
          },
        },
      },
    })

    // Update post comments count
    await prisma.communityPost.update({
      where: { id: postId },
      data: {
        commentsCount: {
          increment: 1,
        },
      },
    })

    return NextResponse.json({
      success: true,
      data: { comment },
      message: 'Comment added successfully',
    })
  } catch (error) {
    console.error('Create comment error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create comment',
      },
      { status: 500 }
    )
  }
}
