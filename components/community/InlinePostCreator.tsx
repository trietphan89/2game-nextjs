'use client'

import React from 'react'
import { Image, Video, Smile } from 'lucide-react'
import { useAuth } from '@/lib/contexts/AuthContext'
import { usePostModal } from '@/lib/contexts/PostModalContext'

export default function InlinePostCreator() {
  const { user, isAuthenticated } = useAuth()
  const { openModal } = usePostModal()

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className="bg-[#1c2128] border border-[#2d333b] rounded-xl p-4">
      {/* User Avatar and Input */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff6b35] to-[#f7931e] flex items-center justify-center overflow-hidden flex-shrink-0">
          {user.avatar ? (
            <img src={user.avatar} alt={user.displayName || user.username} className="w-full h-full object-cover" />
          ) : (
            <span className="text-sm font-bold text-black">
              {(user.displayName || user.username).charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <button
          onClick={() => openModal()}
          className="flex-1 bg-[#0a0e17] border border-[#2d333b] rounded-full px-4 py-2.5 text-left text-[#9aa0a6] hover:border-[#ff6b35] transition-colors cursor-pointer"
        >
          What's on your mind, {user.displayName || user.username}?
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-3 border-t border-[#2d333b]">
        <button
          onClick={() => openModal()}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg hover:bg-[#0a0e17] transition-colors text-sm text-[#e8eaed] font-medium"
        >
          <Image className="w-4 h-4 text-[#3fb950]" />
          <span>Photo</span>
        </button>
        <button
          onClick={() => openModal()}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg hover:bg-[#0a0e17] transition-colors text-sm text-[#e8eaed] font-medium"
        >
          <Video className="w-4 h-4 text-[#58a6ff]" />
          <span>Video</span>
        </button>
        <button
          onClick={() => openModal()}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg hover:bg-[#0a0e17] transition-colors text-sm text-[#e8eaed] font-medium"
        >
          <Smile className="w-4 h-4 text-[#ff6b35]" />
          <span>Feeling</span>
        </button>
      </div>
    </div>
  )
}
