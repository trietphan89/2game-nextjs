import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'
import { prisma } from './prisma'

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-change-me'
const JWT_EXPIRY = '7d' // 7 days

export interface JWTPayload {
  userId: string
  email: string
  username: string
  role: string
}

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

/**
 * Compare a plain text password with a hashed password
 */
export async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

/**
 * Generate a JWT token
 */
export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRY,
  })
}

/**
 * Verify a JWT token and return the payload
 */
export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload
    return decoded
  } catch (error) {
    return null
  }
}

/**
 * Extract token from Authorization header
 */
export function extractToken(request: NextRequest): string | null {
  const authHeader = request.headers.get('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  return authHeader.substring(7)
}

/**
 * Authenticate a request and return the user
 * Use this as middleware for protected routes
 */
export async function authenticate(request: NextRequest) {
  const token = extractToken(request)

  if (!token) {
    return {
      authenticated: false,
      error: 'No token provided',
      user: null,
    }
  }

  const payload = verifyToken(token)

  if (!payload) {
    return {
      authenticated: false,
      error: 'Invalid or expired token',
      user: null,
    }
  }

  // Verify session exists in database
  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true },
  })

  if (!session) {
    return {
      authenticated: false,
      error: 'Session not found',
      user: null,
    }
  }

  // Check if session is expired
  if (session.expiresAt < new Date()) {
    await prisma.session.delete({ where: { id: session.id } })
    return {
      authenticated: false,
      error: 'Session expired',
      user: null,
    }
  }

  return {
    authenticated: true,
    error: null,
    user: session.user,
  }
}

/**
 * Create a new session for a user
 */
export async function createSession(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  })

  if (!user) {
    throw new Error('User not found')
  }

  const payload: JWTPayload = {
    userId: user.id,
    email: user.email,
    username: user.username,
    role: user.role,
  }

  const token = generateToken(payload)
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 7) // 7 days

  const session = await prisma.session.create({
    data: {
      userId: user.id,
      token,
      expiresAt,
    },
  })

  return { token, session, user }
}

/**
 * Delete a session (logout)
 */
export async function deleteSession(token: string) {
  await prisma.session.deleteMany({
    where: { token },
  })
}

/**
 * Clean up expired sessions
 * Call this periodically or on user actions
 */
export async function cleanupExpiredSessions() {
  await prisma.session.deleteMany({
    where: {
      expiresAt: {
        lt: new Date(),
      },
    },
  })
}
