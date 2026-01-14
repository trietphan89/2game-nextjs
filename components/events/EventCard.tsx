'use client'

import { motion } from 'framer-motion'
import {
  Calendar,
  Clock,
  Users,
  Trophy,
  MapPin,
  Tag,
  Mic,
  Target,
  Ticket,
  Building,
} from 'lucide-react'

type EventMode = 'community' | 'industry'

interface BaseEvent {
  id: string | number
  title: string
  date: string
  time: string
  location: string
  participants: number
  maxParticipants: number
  thumbnail: string
  status: string
  tags?: string[]
}

interface CommunityEvent extends BaseEvent {
  mode: 'community'
  game: string
  type: string
  prize: string
}

interface IndustryEvent extends BaseEvent {
  mode: 'industry'
  eventType: string
  speakers: number
  topics: string[]
  ticketPrice: string
  company?: string
}

type Event = CommunityEvent | IndustryEvent

interface EventCardProps {
  event: Event
  variant?: 'default' | 'featured'
  onRegister?: () => void
}

export default function EventCard({
  event,
  variant = 'default',
  onRegister,
}: EventCardProps) {
  const isCommunity = event.mode === 'community'
  const isIndustry = event.mode === 'industry'

  // Color scheme based on mode
  const colorScheme = {
    community: {
      badge: 'bg-purple-500/20 border-purple-500/50 text-purple-400',
      accent: 'text-purple-400',
      button: 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700',
      iconBg: 'bg-purple-500/10',
    },
    industry: {
      badge: 'bg-amber-500/20 border-amber-500/50 text-amber-400',
      accent: 'text-amber-400',
      button: 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700',
      iconBg: 'bg-amber-500/10',
    },
  }

  const colors = isCommunity ? colorScheme.community : colorScheme.industry

  if (variant === 'featured') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#1a1f2e] to-[#0a0e17] rounded-2xl overflow-hidden border border-[#2d333b] shadow-2xl"
      >
        <div className={`w-full h-64 bg-gradient-to-br ${event.thumbnail} relative`}>
          <div className={`absolute top-4 left-4 px-4 py-2 ${colors.badge} backdrop-blur-md rounded-lg text-sm font-bold border`}>
            {isCommunity ? (event as CommunityEvent).type : (event as IndustryEvent).eventType}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex items-end p-6">
            <div>
              <h3 className="text-3xl font-bold mb-2">{event.title}</h3>
              {isCommunity && (
                <p className="text-lg text-gray-300">{(event as CommunityEvent).game}</p>
              )}
              {isIndustry && (
                <p className="text-lg text-gray-300">{(event as IndustryEvent).eventType}</p>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {isCommunity && (
              <div>
                <div className="text-xs text-gray-400 mb-1">Prize Pool</div>
                <div className={`text-2xl font-bold ${colors.accent}`}>
                  {(event as CommunityEvent).prize}
                </div>
              </div>
            )}
            {isIndustry && (
              <>
                <div>
                  <div className="text-xs text-gray-400 mb-1">Speakers</div>
                  <div className={`text-2xl font-bold ${colors.accent}`}>
                    {(event as IndustryEvent).speakers}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">Ticket Price</div>
                  <div className="text-2xl font-bold text-white">
                    {(event as IndustryEvent).ticketPrice}
                  </div>
                </div>
              </>
            )}
            <div>
              <div className="text-xs text-gray-400 mb-1">Registered</div>
              <div className="text-2xl font-bold text-white">
                {event.participants}/{event.maxParticipants}
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>{event.date}</span>
              <Clock className="w-4 h-4 ml-2" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <MapPin className="w-4 h-4" />
              <span>{event.location}</span>
            </div>
            {isIndustry && (
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Target className="w-4 h-4" />
                <div className="flex gap-2 flex-wrap">
                  {(event as IndustryEvent).topics.slice(0, 3).map((topic) => (
                    <span key={topic} className="text-xs">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Tags */}
          {event.tags && (
            <div className="flex gap-2 flex-wrap">
              {event.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-[#1c2128] border border-[#2d333b] text-gray-400 text-xs rounded-lg"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* CTA */}
          <button
            onClick={onRegister}
            className={`w-full ${colors.button} text-white py-4 rounded-xl font-bold shadow-lg transition-all hover:scale-[1.02]`}
          >
            {isCommunity ? 'REGISTER NOW' : 'GET TICKETS'}
          </button>
        </div>
      </motion.div>
    )
  }

  // Default compact card
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className="bg-[#151922] border border-[#2d333b] rounded-xl overflow-hidden hover:border-[#3d434b] transition-all"
    >
      <div className="flex gap-4 p-4">
        {/* Thumbnail */}
        <div className={`w-28 h-28 rounded-lg bg-gradient-to-br ${event.thumbnail} flex-shrink-0 relative`}>
          <div className={`absolute top-2 left-2 px-2 py-1 ${colors.badge} backdrop-blur-sm rounded text-[10px] font-bold border`}>
            {isCommunity ? (event as CommunityEvent).type : (event as IndustryEvent).eventType}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold mb-1 truncate">{event.title}</h3>
          {isCommunity && (
            <p className="text-sm text-gray-400 mb-3">{(event as CommunityEvent).game}</p>
          )}
          {isIndustry && (event as IndustryEvent).company && (
            <p className="text-sm text-gray-400 mb-3 flex items-center gap-1">
              <Building className="w-3 h-3" />
              {(event as IndustryEvent).company}
            </p>
          )}

          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {event.date}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {event.participants}/{event.maxParticipants}
            </span>
          </div>

          {/* Bottom row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isCommunity && (
                <>
                  <Trophy className={`w-4 h-4 ${colors.accent}`} />
                  <span className={`text-sm font-bold ${colors.accent}`}>
                    {(event as CommunityEvent).prize}
                  </span>
                </>
              )}
              {isIndustry && (
                <>
                  <Ticket className={`w-4 h-4 ${colors.accent}`} />
                  <span className="text-sm font-bold text-white">
                    {(event as IndustryEvent).ticketPrice}
                  </span>
                </>
              )}
            </div>
            <button
              onClick={onRegister}
              className={`px-4 py-2 ${colors.button} text-white text-xs font-semibold rounded-lg transition-all`}
            >
              {isCommunity ? 'Register' : 'Tickets'}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
