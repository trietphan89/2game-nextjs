import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { authenticate } from '@/lib/auth'

export const dynamic = 'force-dynamic'

// GET - List all posts with pagination
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const userId = searchParams.get('userId')
    const skip = (page - 1) * limit

    const where: any = {
      isPublic: true,
    }

    if (userId) {
      where.userId = userId
    }

    const [total, posts] = await Promise.all([
      prisma.communityPost.count({ where }),
      prisma.communityPost.findMany({
        where,
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
          _count: {
            select: {
              comments: true,
              likes: true,
            },
          },
        },
      }),
    ])

    // Check if authenticated user has liked these posts
    const auth = await authenticate(req)
    let userLikes: string[] = []

    if (auth.authenticated && auth.user) {
      const likes = await prisma.like.findMany({
        where: {
          userId: auth.user.id,
          postId: {
            in: posts.map((p) => p.id),
          },
        },
        select: {
          postId: true,
        },
      })
      userLikes = likes.map((l) => l.postId)
    }

    const postsWithLikeStatus = posts.map((post) => ({
      ...post,
      isLikedByCurrentUser: userLikes.includes(post.id),
      likesCount: post._count.likes,
      commentsCount: post._count.comments,
    }))

    return NextResponse.json({
      success: true,
      data: {
        posts: postsWithLikeStatus,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    })
  } catch (error) {
    console.error('Get posts error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch posts',
      },
      { status: 500 }
    )
  }
}

// POST - Create a new post
const createPostSchema = z.object({
  content: z.string().min(1, 'Content is required').max(5000, 'Content too long'),
  images: z.array(z.string()).max(10, 'Maximum 10 images allowed').default([]),
  isPublic: z.boolean().default(true),
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
    const validation = createPostSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: validation.error.issues[0].message,
        },
        { status: 400 }
      )
    }

    const { content, images, isPublic } = validation.data

    const post = await prisma.communityPost.create({
      data: {
        userId: auth.user.id,
        content,
        images,
        isPublic,
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

    return NextResponse.json({
      success: true,
      data: { post },
      message: 'Post created successfully',
    })
  } catch (error) {
    console.error('Create post error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create post',
      },
      { status: 500 }
    )
  }
}

// DELETE - Delete a post
export async function DELETE(req: NextRequest) {
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
    const postId = searchParams.get('postId')

    if (!postId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Post ID is required',
        },
        { status: 400 }
      )
    }

    // Check if post exists and belongs to user
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

    if (post.userId !== auth.user.id && auth.user.role !== 'ADMIN') {
      return NextResponse.json(
        {
          success: false,
          error: 'Not authorized to delete this post',
        },
        { status: 403 }
      )
    }

    // Delete post (cascade will handle comments and likes)
    await prisma.communityPost.delete({
      where: { id: postId },
    })

    return NextResponse.json({
      success: true,
      message: 'Post deleted successfully',
    })
  } catch (error) {
    console.error('Delete post error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete post',
      },
      { status: 500 }
    )
  }
}
