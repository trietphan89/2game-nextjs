import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { authenticate } from '@/lib/auth'

export const dynamic = 'force-dynamic'

// POST - Register for an event
const registerSchema = z.object({
  teamName: z.string().optional(),
})

export async function POST(
  req: NextRequest,
  { params }: { params: { eventId: string } }
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

    const { eventId } = params
    const body = await req.json()
    const validation = registerSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: validation.error.issues[0].message,
        },
        { status: 400 }
      )
    }

    const { teamName } = validation.data

    // Get event
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        _count: {
          select: {
            registrations: true,
          },
        },
      },
    })

    if (!event) {
      return NextResponse.json(
        {
          success: false,
          error: 'Event not found',
        },
        { status: 404 }
      )
    }

    // Check event status
    if (event.status !== 'UPCOMING') {
      return NextResponse.json(
        {
          success: false,
          error: 'Event registration is not open',
        },
        { status: 400 }
      )
    }

    // Check capacity
    if (event.maxParticipants && event._count.registrations >= event.maxParticipants) {
      return NextResponse.json(
        {
          success: false,
          error: 'Event is full',
        },
        { status: 400 }
      )
    }

    // Check if already registered
    const existingRegistration = await prisma.eventRegistration.findUnique({
      where: {
        eventId_userId: {
          eventId,
          userId: auth.user.id,
        },
      },
    })

    if (existingRegistration) {
      return NextResponse.json(
        {
          success: false,
          error: 'Already registered for this event',
        },
        { status: 400 }
      )
    }

    // Create registration
    const registration = await prisma.eventRegistration.create({
      data: {
        eventId,
        userId: auth.user.id,
        teamName,
      },
      include: {
        event: true,
      },
    })

    // Update event participant count
    await prisma.event.update({
      where: { id: eventId },
      data: {
        currentParticipants: {
          increment: 1,
        },
      },
    })

    return NextResponse.json({
      success: true,
      data: { registration },
      message: 'Successfully registered for event',
    })
  } catch (error) {
    console.error('Register for event error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to register for event',
      },
      { status: 500 }
    )
  }
}

// DELETE - Unregister from an event
export async function DELETE(
  req: NextRequest,
  { params }: { params: { eventId: string } }
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

    const { eventId } = params

    // Delete registration
    const result = await prisma.eventRegistration.deleteMany({
      where: {
        eventId,
        userId: auth.user.id,
      },
    })

    if (result.count === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Registration not found',
        },
        { status: 404 }
      )
    }

    // Update event participant count
    await prisma.event.update({
      where: { id: eventId },
      data: {
        currentParticipants: {
          decrement: 1,
        },
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Successfully unregistered from event',
    })
  } catch (error) {
    console.error('Unregister from event error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to unregister from event',
      },
      { status: 500 }
    )
  }
}
