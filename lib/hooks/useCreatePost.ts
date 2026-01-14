'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export interface CreatePostData {
  content: string
  images: string[]
  isPublic: boolean
  gameId?: string
}

export interface UseCreatePostReturn {
  createPost: (data: CreatePostData) => Promise<boolean>
  isLoading: boolean
  error: string | null
  clearError: () => void
}

export function useCreatePost(): UseCreatePostReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const createPost = async (data: CreatePostData): Promise<boolean> => {
    setIsLoading(true)
    setError(null)

    try {
      // Get token from localStorage
      const token = localStorage.getItem('token')

      if (!token) {
        throw new Error('Please login to create a post')
      }

      const response = await fetch('/api/community/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: data.content,
          images: data.images,
          isPublic: data.isPublic,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create post')
      }
      // Refresh the current page to show the new post
      router.refresh()

      setIsLoading(false)
      return true
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while creating the post'
      console.error('🔴 Error creating post:', errorMessage)
      setError(errorMessage)
      setIsLoading(false)
      return false
    }
  }

  const clearError = () => {
    setError(null)
  }

  return {
    createPost,
    isLoading,
    error,
    clearError,
  }
}
