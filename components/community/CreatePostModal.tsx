'use client'

import React, { useState, useEffect, useRef } from 'react'
import { X, Globe, Lock, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePostModal } from '@/lib/contexts/PostModalContext'
import { useAuth } from '@/lib/contexts/AuthContext'
import { useCreatePost } from '@/lib/hooks/useCreatePost'
import ImageUpload from './ImageUpload'

export default function CreatePostModal() {
  const { isOpen, closeModal, contextData } = usePostModal()
  const { user, isAuthenticated } = useAuth()
  const { createPost, isLoading, error, clearError } = useCreatePost()

  const [content, setContent] = useState('')
  const [images, setImages] = useState<string[]>([])
  const [isPublic, setIsPublic] = useState(true)
  const [showSuccess, setShowSuccess] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Pre-fill content based on context
  useEffect(() => {
    if (isOpen && contextData?.prefillContent) {
      setContent(contextData.prefillContent)
    }
  }, [isOpen, contextData])

  // Auto-focus textarea when modal opens
  useEffect(() => {
    if (isOpen && textareaRef.current) {
      setTimeout(() => textareaRef.current?.focus(), 100)
    }
  }, [isOpen])

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setContent('')
        setImages([])
        setIsPublic(true)
        clearError()
        setShowSuccess(false)
      }, 300)
    }
  }, [isOpen, clearError])

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isLoading) {
        closeModal()
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, isLoading, closeModal])

  // Handle Cmd/Ctrl + Enter to submit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && isOpen && canSubmit) {
        handleSubmit()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, content, images])

  const handleSubmit = async () => {
    if (!canSubmit || isLoading) return

    const success = await createPost({
      content: content.trim(),
      images,
      isPublic,
      gameId: contextData?.gameId,
    })

    if (success) {
      setShowSuccess(true)
      setTimeout(() => {
        closeModal()
      }, 1500)
    }
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isLoading) {
      closeModal()
    }
  }

  const canSubmit = content.trim().length > 0 && content.length <= 5000

  if (!isAuthenticated || !user) {
    // If modal is opened but user not authenticated, show login prompt
    if (isOpen) {
      return (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={handleBackdropClick}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1c2128] rounded-xl p-8 max-w-md mx-4 text-center"
            >
              <h2 className="text-xl font-bold mb-4">Login Required</h2>
              <p className="text-gray-400 mb-6">You need to login to create a post</p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    closeModal()
                    window.location.href = '/login'
                  }}
                  className="flex-1 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-black px-4 py-2 rounded-lg font-semibold"
                >
                  Login
                </button>
                <button
                  onClick={closeModal}
                  className="flex-1 bg-[#2d333b] text-white px-4 py-2 rounded-lg font-semibold"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )
    }
    return null
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-2xl bg-[#0a0e17] border border-[#2d333b] rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.4)]
              max-h-[90vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-[#2d333b]">
              <div>
                <h2 className="text-xl font-bold text-[#e8eaed]">
                  {contextData?.gameName ? `Share about ${contextData.gameName}` : 'Create Post'}
                </h2>
                {contextData?.type === 'game' && contextData.gameName && (
                  <div className="mt-1 inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#ff6b35]/10 border border-[#ff6b35]/20 rounded-full">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ff6b35]" />
                    <span className="text-xs text-[#ff6b35] font-medium">
                      Posting about: {contextData.gameName}
                    </span>
                  </div>
                )}
              </div>
              <button
                onClick={closeModal}
                disabled={isLoading}
                className="w-8 h-8 rounded-full bg-[#1c2128] border border-[#2d333b] flex items-center justify-center
                  hover:border-[#ff6b35] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Close modal"
              >
                <X className="w-4 h-4 text-[#9aa0a6]" />
              </button>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {/* User Info */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff6b35] to-[#f7931e] flex items-center justify-center overflow-hidden">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.displayName || user.username} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-sm font-bold text-black">
                      {(user.displayName || user.username).charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-[#e8eaed]">{user.displayName || user.username}</p>
                  <button
                    onClick={() => setIsPublic(!isPublic)}
                    className="flex items-center gap-1 text-xs text-[#9aa0a6] hover:text-[#ff6b35] transition-colors"
                  >
                    {isPublic ? (
                      <>
                        <Globe className="w-3 h-3" />
                        <span>Public</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-3 h-3" />
                        <span>Private</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Textarea */}
              <div className="space-y-2">
                <textarea
                  ref={textareaRef}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Share your gaming moment..."
                  disabled={isLoading}
                  className="w-full min-h-[120px] bg-transparent text-[#e8eaed] placeholder-[#9aa0a6]
                    resize-none focus:outline-none disabled:opacity-50"
                  maxLength={5000}
                />
                <div className="flex items-center justify-between text-xs text-[#9aa0a6]">
                  <span className={content.length > 4500 ? 'text-[#ff6b35]' : ''}>
                    {content.length} / 5000 characters
                  </span>
                  {content.length > 5000 && (
                    <span className="text-red-400">Character limit exceeded</span>
                  )}
                </div>
              </div>

              {/* Image Upload */}
              <ImageUpload images={images} onChange={setImages} maxImages={10} />

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-lg bg-red-500/10 border border-red-500/20"
                >
                  <p className="text-sm text-red-400">{error}</p>
                </motion.div>
              )}

              {/* Success Message */}
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-lg bg-green-500/10 border border-green-500/20"
                >
                  <p className="text-sm text-green-400">Post created successfully!</p>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-[#2d333b] bg-[#0a0e17]">
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={closeModal}
                  disabled={isLoading}
                  className="px-4 py-2 rounded-lg bg-[#1c2128] border border-[#2d333b] text-sm font-medium text-[#e8eaed]
                    hover:border-[#ff6b35] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit || isLoading}
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-sm font-bold text-black
                    hover:shadow-[0_4px_12px_rgba(255,107,53,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed
                    flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Posting...</span>
                    </>
                  ) : (
                    <span>Post</span>
                  )}
                </button>
              </div>
              <p className="text-xs text-[#9aa0a6] mt-2 text-center">
                Press <kbd className="px-1 py-0.5 bg-[#1c2128] border border-[#2d333b] rounded text-[10px]">ESC</kbd> to cancel or{' '}
                <kbd className="px-1 py-0.5 bg-[#1c2128] border border-[#2d333b] rounded text-[10px]">Cmd/Ctrl+Enter</kbd> to post
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
