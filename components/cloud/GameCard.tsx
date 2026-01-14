'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import PlayButton from './PlayButton'

interface GameCardProps {
  id: string | number
  title: string
  genre?: string
  thumbnail: string
  badges?: string[]
  aspectRatio?: 'portrait' | 'cinematic' | 'square'
  playCost?: number
  href?: string
  onPlay?: () => void
}

const aspectRatioClasses = {
  portrait: 'aspect-[2/3]',     // Tall vertical cards (like movie posters)
  cinematic: 'aspect-[16/9]',   // Wide cinematic cards
  square: 'aspect-square',      // Square cards
}

export default function GameCard({
  id,
  title,
  genre,
  thumbnail,
  badges = [],
  aspectRatio = 'portrait',
  playCost,
  href,
  onPlay,
}: GameCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const cardContent = (
    <motion.div
      initial={false}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      className={`
        group relative ${aspectRatioClasses[aspectRatio]}
        rounded-2xl overflow-hidden cursor-pointer
        shadow-lg hover:shadow-2xl hover:shadow-[#ff6b35]/20
        transition-shadow duration-500
      `}
    >
      {/* Game Artwork */}
      <motion.img
        src={thumbnail}
        alt={title}
        className="w-full h-full object-cover"
        animate={{ scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />

      {/* Gradient Overlay - Always visible but intensifies on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"
        animate={{ opacity: isHovered ? 0.95 : 0.7 }}
        transition={{ duration: 0.3 }}
      />

      {/* Top Badges */}
      {badges.length > 0 && (
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {badges.map((badge, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="px-3 py-1 bg-[#ff6b35]/90 backdrop-blur-sm text-white text-xs font-bold rounded-lg"
            >
              {badge}
            </motion.span>
          ))}
        </div>
      )}

      {/* Center Play Button - Only visible on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center z-20"
            onClick={(e) => {
              if (onPlay) {
                e.preventDefault()
                e.stopPropagation()
                onPlay()
              }
            }}
          >
            <PlayButton size="xl" variant="primary" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Info - Always visible */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-4 z-10"
        animate={{ y: isHovered ? -10 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-white font-bold text-lg mb-1 leading-tight">
          {title}
        </h3>

        <div className="flex items-center justify-between">
          {genre && (
            <span className="text-xs text-gray-300 font-medium">
              {genre}
            </span>
          )}

          {playCost !== undefined && (
            <span className="text-xs text-[#ff6b35] font-bold">
              {playCost} G-Coins/hr
            </span>
          )}
        </div>
      </motion.div>

      {/* Glow Border on Hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 rounded-2xl border-2 border-[#ff6b35] pointer-events-none"
            style={{
              boxShadow: '0 0 20px rgba(255, 107, 53, 0.5), inset 0 0 20px rgba(255, 107, 53, 0.1)',
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )

  // If href is provided, wrap in Link
  if (href) {
    return <Link href={href}>{cardContent}</Link>
  }

  return cardContent
}
