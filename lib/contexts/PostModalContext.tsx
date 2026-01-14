'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface PostContextData {
  type?: 'general' | 'game' | 'profile'
  gameId?: string
  gameName?: string
  prefillContent?: string
  relatedUrl?: string
}

interface PostModalContextType {
  isOpen: boolean
  openModal: (contextData?: PostContextData) => void
  closeModal: () => void
  contextData: PostContextData | null
}

const PostModalContext = createContext<PostModalContextType | undefined>(undefined)

export function PostModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [contextData, setContextData] = useState<PostContextData | null>(null)

  const openModal = (data?: PostContextData) => {
    setContextData(data || null)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    // Clear context data after animation completes
    setTimeout(() => setContextData(null), 300)
  }

  return (
    <PostModalContext.Provider value={{ isOpen, openModal, closeModal, contextData }}>
      {children}
    </PostModalContext.Provider>
  )
}

export function usePostModal() {
  const context = useContext(PostModalContext)
  if (context === undefined) {
    throw new Error('usePostModal must be used within a PostModalProvider')
  }
  return context
}
