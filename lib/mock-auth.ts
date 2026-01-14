// Mock authentication cho demo (không cần database)
import { createHash } from 'crypto'

// Mock users data
const MOCK_USERS = [
  {
    id: 'admin-1',
    email: 'admin@2game.vn',
    username: 'admin',
    password: hashPassword('admin123'), // admin123
    displayName: 'Admin User',
    role: 'ADMIN',
    points: 9999,
    level: 99,
    isVerified: true,
  },
  {
    id: 'user-1',
    email: 'user@2game.vn',
    username: 'user',
    password: hashPassword('user123'), // user123
    displayName: 'Demo User',
    role: 'USER',
    points: 500,
    level: 5,
    isVerified: true,
  },
]

// Simple hash function (production should use bcrypt)
function hashPassword(password: string): string {
  return createHash('sha256').update(password).digest('hex')
}

// Mock sessions storage (in production, use database or Redis)
const MOCK_SESSIONS = new Map<string, { userId: string; expiresAt: Date }>()

export function mockFindUser(emailOrUsername: string) {
  return MOCK_USERS.find(
    (u) => u.email === emailOrUsername || u.username === emailOrUsername
  )
}

export function mockVerifyPassword(password: string, hashedPassword: string): boolean {
  return hashPassword(password) === hashedPassword
}

export function mockCreateSession(userId: string): { token: string; expiresAt: Date } {
  const token = createHash('sha256')
    .update(userId + Date.now() + Math.random())
    .digest('hex')

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

  MOCK_SESSIONS.set(token, { userId, expiresAt })

  return { token, expiresAt }
}

export function mockGetSession(token: string) {
  const session = MOCK_SESSIONS.get(token)

  if (!session) return null

  // Check if expired
  if (session.expiresAt < new Date()) {
    MOCK_SESSIONS.delete(token)
    return null
  }

  // Find user
  const user = MOCK_USERS.find((u) => u.id === session.userId)

  if (!user) return null

  return {
    id: token,
    token,
    userId: session.userId,
    expiresAt: session.expiresAt,
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
      displayName: user.displayName,
      role: user.role,
      points: user.points,
      level: user.level,
      isVerified: user.isVerified,
    },
  }
}

export function mockDeleteSession(token: string) {
  MOCK_SESSIONS.delete(token)
}

export function mockCreateUser(data: {
  email: string
  username: string
  password: string
}) {
  // Check if email or username already exists
  const existing = MOCK_USERS.find(
    (u) => u.email === data.email || u.username === data.username
  )

  if (existing) {
    throw new Error('User already exists')
  }

  const newUser = {
    id: 'user-' + Date.now(),
    email: data.email,
    username: data.username,
    password: hashPassword(data.password),
    displayName: data.username,
    role: 'USER' as const,
    points: 0,
    level: 1,
    isVerified: false,
  }

  MOCK_USERS.push(newUser)

  return newUser
}
