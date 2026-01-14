import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { withAdmin } from '@/lib/admin-middleware'

const eventUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  description: z.string().optional(),
  type: z.enum(['TOURNAMENT', 'COMMUNITY', 'LAUNCH', 'WORKSHOP']).optional(),
  banner: z.string().optional(),
  startDate: z.string().transform((str) => new Date(str)).optional(),
  endDate: z.string().transform((str) => new Date(str)).optional(),
  maxParticipants: z.number().int().positive().optional(),
  prize: z.string().optional(),
  rules: z.string().optional(),
  status: z.enum(['UPCOMING', 'LIVE', 'ENDED', 'CANCELLED']).optional(),
})

// GET - Get single event
async function getEvent(
  req: NextRequest,
  user: any,
  { params }: { params: { id: string } }
) {
  try {
    const event = await prisma.event.findUnique({
      where: { id: params.id },
      include: {
        registrations: {
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
        },
        _count: {
          select: { registrations: true },
        },
      },
    })

    if (!event) {
      return NextResponse.json(
        { success: false, error: 'Event not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: { event },
    })
  } catch (error) {
    console.error('Get event error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch event' },
      { status: 500 }
    )
  }
}

// PUT - Update event
async function updateEvent(
  req: NextRequest,
  user: any,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json()

    // Validate input
    const validation = eventUpdateSchema.safeParse(body)
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

    // Check if event exists
    const existingEvent = await prisma.event.findUnique({
      where: { id: params.id },
    })

    if (!existingEvent) {
      return NextResponse.json(
        { success: false, error: 'Event not found' },
        { status: 404 }
      )
    }

    // If updating slug, check for duplicates
    if (data.slug && data.slug !== existingEvent.slug) {
      const duplicateSlug = await prisma.event.findUnique({
        where: { slug: data.slug },
      })

      if (duplicateSlug) {
        return NextResponse.json(
          { success: false, error: 'Event with this slug already exists' },
          { status: 400 }
        )
      }
    }

    // Update event
    const event = await prisma.event.update({
      where: { id: params.id },
      data,
    })

    return NextResponse.json({
      success: true,
      data: { event },
      message: 'Event updated successfully',
    })
  } catch (error) {
    console.error('Update event error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update event' },
      { status: 500 }
    )
  }
}

// DELETE - Delete event
async function deleteEvent(
  req: NextRequest,
  user: any,
  { params }: { params: { id: string } }
) {
  try {
    // Check if event exists
    const existingEvent = await prisma.event.findUnique({
      where: { id: params.id },
    })

    if (!existingEvent) {
      return NextResponse.json(
        { success: false, error: 'Event not found' },
        { status: 404 }
      )
    }

    // Delete event (will cascade delete registrations)
    await prisma.event.delete({
      where: { id: params.id },
    })

    return NextResponse.json({
      success: true,
      message: 'Event deleted successfully',
    })
  } catch (error) {
    console.error('Delete event error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete event' },
      { status: 500 }
    )
  }
}

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  return withAdmin((req, user) => getEvent(req, user, context))(req)
}

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  return withAdmin((req, user) => updateEvent(req, user, context))(req)
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  return withAdmin((req, user) => deleteEvent(req, user, context))(req)
}
