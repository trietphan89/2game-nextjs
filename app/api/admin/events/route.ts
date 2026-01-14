import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { withAdmin } from '@/lib/admin-middleware'
import { MOCK_EVENTS, paginateMockData } from '@/lib/mock-admin-data'

// Validation schema
const eventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().optional(),
  type: z.enum(['TOURNAMENT', 'COMMUNITY', 'LAUNCH', 'WORKSHOP']),
  banner: z.string().optional(),
  startDate: z.string().transform((str) => new Date(str)),
  endDate: z.string().transform((str) => new Date(str)),
  maxParticipants: z.number().int().positive().optional(),
  prize: z.string().optional(),
  rules: z.string().optional(),
  status: z.enum(['UPCOMING', 'LIVE', 'ENDED', 'CANCELLED']).default('UPCOMING'),
})

// GET - List all events
async function getEvents(req: NextRequest, user: any) {
  try {
    const { searchParams } = new URL(req.url)

    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const type = searchParams.get('type')
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    try {
      // Try database first
      const skip = (page - 1) * limit
      const where: any = {}

      if (type) {
        where.type = type
      }

      if (status) {
        where.status = status
      }

      if (search) {
        where.OR = [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ]
      }

      const total = await prisma.event.count({ where })
      const events = await prisma.event.findMany({
        where,
        skip,
        take: limit,
        orderBy: { startDate: 'desc' },
        include: {
          _count: {
            select: { registrations: true },
          },
        },
      })

      return NextResponse.json({
        success: true,
        data: {
          events,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
          },
        },
      })
    } catch (dbError) {
      // Fallback to mock data if database fails
      console.log('Database not available, using mock data for events')

      const result = paginateMockData(
        MOCK_EVENTS,
        page,
        limit,
        (event) => {
          if (type && event.type !== type) return false
          if (status && event.status !== status) return false
          if (search && !event.title.toLowerCase().includes(search.toLowerCase()) &&
              !event.description.toLowerCase().includes(search.toLowerCase())) return false
          return true
        }
      )

      return NextResponse.json({
        success: true,
        data: {
          events: result.data,
          pagination: result.pagination,
        },
      })
    }
  } catch (error) {
    console.error('Get events error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}

// POST - Create new event
async function createEvent(req: NextRequest, user: any) {
  try {
    const body = await req.json()

    // Validate input
    const validation = eventSchema.safeParse(body)
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

    // Check if slug already exists
    const existingEvent = await prisma.event.findUnique({
      where: { slug: data.slug },
    })

    if (existingEvent) {
      return NextResponse.json(
        { success: false, error: 'Event with this slug already exists' },
        { status: 400 }
      )
    }

    // Create event
    const event = await prisma.event.create({
      data,
    })

    return NextResponse.json({
      success: true,
      data: { event },
      message: 'Event created successfully',
    })
  } catch (error) {
    console.error('Create event error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create event' },
      { status: 500 }
    )
  }
}

export const GET = withAdmin(getEvents)
export const POST = withAdmin(createEvent)
