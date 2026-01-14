'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  email: string
  username: string
  displayName: string | null
  avatar: string | null
  bio: string | null
  points: number
  level: number
  role: string
  isVerified: boolean
  createdAt: string
  updatedAt: string
  _count?: {
    posts: number
    followers: number
    following: number
    wishlist: number
    library: number
  }
}

interface AuthContextType {
  user: User | null
  token: string | null
  loading: boolean
  login: (emailOrUsername: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (email: string, username: string, password: string, displayName?: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  loading: true,
  login: async () => ({ success: false }),
  register: async () => ({ success: false }),
  logout: async () => {},
  refreshUser: async () => {},
  isAuthenticated: false,
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // Load token and user from localStorage on mount
  useEffect(() => {
    const loadAuth = async () => {
      const storedToken = localStorage.getItem('token')

      if (storedToken) {
        setToken(storedToken)
        await fetchUser(storedToken)
      }

      setLoading(false)
    }

    loadAuth()
  }, [])

  // Fetch user data from API
  const fetchUser = async (authToken: string) => {
    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success && data.data?.user) {
          setUser(data.data.user)
          return
        }
      }

      // If fetch fails, clear auth
      setToken(null)
      setUser(null)
      localStorage.removeItem('token')
    } catch (error) {
      console.error('Failed to fetch user:', error)
      setToken(null)
      setUser(null)
      localStorage.removeItem('token')
    }
  }

  // Login function
  const login = async (emailOrUsername: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailOrUsername, password }),
      })

      const data = await response.json()

      if (data.success && data.data?.token && data.data?.user) {
        setToken(data.data.token)
        setUser(data.data.user)
        localStorage.setItem('token', data.data.token)
        return { success: true }
      }

      return { success: false, error: data.error || 'Login failed' }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: 'Failed to login. Please try again.' }
    }
  }

  // Register function
  const register = async (
    email: string,
    username: string,
    password: string,
    displayName?: string
  ) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password, displayName }),
      })

      const data = await response.json()

      if (data.success && data.data?.token && data.data?.user) {
        setToken(data.data.token)
        setUser(data.data.user)
        localStorage.setItem('token', data.data.token)
        return { success: true }
      }

      return { success: false, error: data.error || 'Registration failed' }
    } catch (error) {
      console.error('Registration error:', error)
      return { success: false, error: 'Failed to register. Please try again.' }
    }
  }

  // Logout function
  const logout = async () => {
    try {
      if (token) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setToken(null)
      setUser(null)
      localStorage.removeItem('token')
    }
  }

  // Refresh user data
  const refreshUser = async () => {
    if (token) {
      await fetchUser(token)
    }
  }

  const value: AuthContextType = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    refreshUser,
    isAuthenticated: !!user && !!token,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
