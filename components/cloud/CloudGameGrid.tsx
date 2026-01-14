'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Play, Star, Users } from 'lucide-react'
import type { CloudGame } from '@/lib/mockCloudGames'

interface CloudGameGridProps {
  games: CloudGame[]
}

export default function CloudGameGrid({ games }: CloudGameGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 max-w-6xl mx-auto">
      {games.map((game, index) => (
        <CinematicGameCard key={game.id} game={game} index={index} />
      ))}
    </div>
  )
}

// ============================================================================
// CINEMATIC GAME CARD - Square Ratio for Better Thumbnail Display
// ============================================================================

interface CinematicGameCardProps {
  game: CloudGame
  index: number
}

function CinematicGameCard({ game, index }: CinematicGameCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group"
    >
      <Link href={`/cloud/game/${game.slug}`}>
        {/* ===== IMAGE CONTAINER - Square Ratio ===== */}
        <div className="relative aspect-square rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl mb-3">
          {/* Game Image */}
          <img
            src={game.backdrop}
            alt={game.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Gradient Overlay (Bottom Fade) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

          {/* Badges (Top Left) */}
          {game.badges.length > 0 && (
            <div className="absolute top-2 lg:top-3 left-2 lg:left-3 flex flex-wrap gap-1 lg:gap-1.5">
              {game.badges.slice(0, 2).map((badge) => (
                <span
                  key={badge}
                  className="px-1.5 lg:px-2 py-0.5 lg:py-1 bg-black/60 backdrop-blur-md border border-white/20 rounded text-[9px] lg:text-[10px] font-bold text-white leading-none"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}

          {/* Play Button (Center - Appears on Hover) */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-gradient-to-r from-[#ff6b35] to-[#f7931e] flex items-center justify-center shadow-2xl shadow-[#ff6b35]/50"
            >
              <Play className="w-5 h-5 lg:w-6 lg:h-6 text-white ml-0.5" fill="currentColor" />
            </motion.div>
          </div>

          {/* Rating (Top Right) */}
          <div className="absolute top-2 lg:top-3 right-2 lg:right-3 flex items-center gap-0.5 lg:gap-1 px-1.5 lg:px-2 py-0.5 lg:py-1 bg-black/60 backdrop-blur-md border border-white/20 rounded">
            <Star className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-yellow-400 fill-yellow-400" />
            <span className="text-[10px] lg:text-xs font-bold text-white leading-none">{game.rating}</span>
          </div>
        </div>

        {/* ===== INFO SECTION (Below Image) - EXACT HEIGHTS ===== */}
        <div className="space-y-2">
          {/* Game Title - EXACT 1 LINE */}
          <h3 className="text-sm lg:text-base font-bold text-white line-clamp-1 group-hover:text-[#ff6b35] transition-colors h-5 lg:h-6 leading-5 lg:leading-6">
            {game.title}
          </h3>

          {/* Genre & Players - EXACT HEIGHT */}
          <div className="flex items-center justify-between text-xs lg:text-sm text-gray-400 h-4 lg:h-5">
            <span className="font-medium leading-none">{game.genre}</span>
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
              <span className="font-semibold leading-none">{game.players}</span>
            </div>
          </div>

          {/* Play Cost - EXACT HEIGHT */}
          <div className="text-xs lg:text-sm font-bold h-4 lg:h-5 leading-none">
            {game.playCost > 0 ? (
              <span className="text-[#ff6b35]">{game.playCost} G-Coins/hr</span>
            ) : (
              <span className="text-[#3fb950]">Free to Play</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
