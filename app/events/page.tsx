'use client'

import { useState } from 'react'
import { Calendar, Trophy, Users, Clock, MapPin, Gift, Star, Building2, Gamepad2, Briefcase, Filter } from 'lucide-react'
import { useLanguage } from '@/app/layout'

type EventCategory = 'all' | 'b2c' | 'b2b' | 'esports'

export default function EventsPage() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState('upcoming')
  const [categoryFilter, setCategoryFilter] = useState<EventCategory>('all')

  const tabs = [
    { id: 'upcoming', label: t.upcoming },
    { id: 'live', label: t.live },
    { id: 'past', label: t.past },
  ]

  const categoryTabs = [
    { id: 'all' as EventCategory, label: 'Tất cả', icon: Filter },
    { id: 'esports' as EventCategory, label: 'Esports', icon: Trophy },
    { id: 'b2c' as EventCategory, label: 'Community', icon: Gamepad2 },
    { id: 'b2b' as EventCategory, label: 'Business', icon: Building2 },
  ]

  const events = [
    {
      id: 1,
      title: 'League of Legends World Championship 2025',
      game: 'League of Legends',
      type: 'Esports Tournament',
      category: 'esports' as EventCategory,
      date: '15/02/2025',
      time: '14:00 ICT',
      location: 'Online + Offline (TP.HCM)',
      prize: '500.000.000₫',
      participants: 2450,
      maxParticipants: 3000,
      status: 'Đăng ký đang mở',
      thumbnail: 'from-purple-600 to-purple-800',
      coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=60',
      featured: true,
      tags: ['Championship', 'Big Prize', 'Offline'],
    },
    {
      id: 2,
      title: 'Valorant Champions Tour Vietnam',
      game: 'Valorant',
      type: 'Esports League',
      category: 'esports' as EventCategory,
      date: '08/02/2025',
      time: '19:00 ICT',
      location: 'Online',
      prize: '100.000.000₫',
      participants: 1890,
      maxParticipants: 2000,
      status: 'Đăng ký đang mở',
      thumbnail: 'from-fuchsia-600 to-red-500',
      coverImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=60',
      tags: ['Monthly', 'Online', 'Ranked'],
    },
    {
      id: 3,
      title: 'Vietnam Gaming Expo 2025',
      game: 'All Games',
      type: 'Community Event',
      category: 'b2c' as EventCategory,
      date: '01/02/2025',
      time: '15:00 ICT',
      location: 'Crescent Mall, TP.HCM',
      prize: 'Free merch & games',
      participants: 456,
      maxParticipants: 500,
      status: 'Limited slots',
      thumbnail: 'from-orange-600 to-red-600',
      coverImage: 'https://images.unsplash.com/photo-1511882150382-421056c89033?w=800&q=60',
      tags: ['Meetup', 'Offline', 'Free Entry'],
    },
    {
      id: 4,
      title: 'Dota 2 The International Vietnam Qualifiers',
      game: 'Dota 2',
      type: 'Esports Qualifier',
      category: 'esports' as EventCategory,
      date: '12/02/2025',
      time: '18:00 ICT',
      location: 'Online',
      prize: '50.000.000₫',
      participants: 890,
      maxParticipants: 1000,
      status: 'Đăng ký đang mở',
      thumbnail: 'from-teal-400 to-pink-300',
      coverImage: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=60',
      tags: ['Qualifier', 'Dota 2', 'Online'],
    },
    {
      id: 5,
      title: 'Vietnam Game Developer Conference 2025',
      game: 'Industry Event',
      type: 'Conference',
      category: 'b2b' as EventCategory,
      date: '20/02/2025',
      time: '09:00 ICT',
      location: 'Saigon Exhibition Center',
      prize: 'Networking & Deals',
      participants: 234,
      maxParticipants: 500,
      status: 'Registration Open',
      thumbnail: 'from-blue-600 to-indigo-700',
      coverImage: 'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=800&q=60',
      tags: ['B2B', 'Conference', 'Networking'],
    },
    {
      id: 6,
      title: 'PUBG Mobile Vietnam Championship',
      game: 'PUBG Mobile',
      type: 'Mobile Esports',
      category: 'esports' as EventCategory,
      date: '25/02/2025',
      time: '10:00 ICT',
      location: 'Hanoi Convention Center',
      prize: '300.000.000₫',
      participants: 89,
      maxParticipants: 150,
      status: 'Invitation Only',
      thumbnail: 'from-slate-600 to-gray-800',
      coverImage: 'https://images.unsplash.com/photo-1556438064-2d7646166914?w=800&q=60',
      tags: ['Mobile', 'Championship', 'Offline'],
    },
  ]

  const liveEvents = [
    {
      id: 7,
      title: 'Counter-Strike 2 Pro League',
      game: 'Counter-Strike 2',
      type: 'Live Tournament',
      category: 'esports' as EventCategory,
      startTime: '3 giờ trước',
      viewers: 12500,
      prize: '30.000.000₫',
      thumbnail: 'from-cyan-700 to-purple-900',
      coverImage: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800&q=60',
      status: 'LIVE NOW',
    },
  ]

  const getCategoryBadge = (category: EventCategory) => {
    switch(category) {
      case 'esports':
        return {
          bg: 'bg-purple-500/20',
          border: 'border-purple-500/50',
          text: 'text-purple-400',
          label: 'Esports',
          icon: Trophy,
          ring: 'ring-1 ring-purple-500/30'
        }
      case 'b2c':
        return {
          bg: 'bg-blue-500/20',
          border: 'border-blue-500/50',
          text: 'text-blue-400',
          label: 'Community',
          icon: Gamepad2,
          ring: 'ring-1 ring-blue-500/30'
        }
      case 'b2b':
        return {
          bg: 'bg-orange-500/20',
          border: 'border-orange-500/50',
          text: 'text-orange-400',
          label: 'Business',
          icon: Building2,
          ring: 'ring-1 ring-orange-500/30'
        }
      default:
        return {
          bg: 'bg-gray-500/20',
          border: 'border-gray-500/50',
          text: 'text-gray-400',
          label: 'Event',
          icon: Calendar,
          ring: 'ring-1 ring-gray-500/30'
        }
    }
  }

  const filteredEvents = categoryFilter === 'all'
    ? events
    : events.filter(e => e.category === categoryFilter)

  return (
    <>
      {/* Feed Header with Tabs */}
      <div className="px-4 py-3 lg:py-4 border-b border-[#2d333b] bg-[rgba(10,14,23,0.95)] backdrop-blur-xl sticky top-[57px] z-10">
        <div className="flex items-center gap-3 mb-3 lg:mb-4">
          <Calendar className="w-5 h-5 lg:w-6 lg:h-6 text-[#ff6b35]" />
          <h1 className="text-base lg:text-xl font-bold">{t.eventsTitle}</h1>
        </div>
        <div className="flex gap-2 lg:gap-4 border-b border-[#2d333b] overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-3 lg:px-4 py-2 lg:py-3 text-[13px] lg:text-[15px] font-semibold border-b-2 transition-all
                ${activeTab === tab.id
                  ? 'text-[#ff6b35] border-[#ff6b35]'
                  : 'text-[#9aa0a6] border-transparent hover:text-[#e8eaed]'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter - Only show for upcoming tab */}
      {activeTab === 'upcoming' && (
        <div className="px-4 py-3 border-b border-[#2d333b] bg-[#151922]">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {categoryTabs.map((cat) => {
              const Icon = cat.icon
              const isActive = categoryFilter === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id)}
                  className={`
                    flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0
                    ${isActive
                      ? 'bg-[#ff6b35] text-black'
                      : 'bg-[#1c2128] border border-[#2d333b] text-[#9aa0a6] hover:border-[#ff6b35]'
                    }
                  `}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {activeTab === 'upcoming' && (
        <>
          {/* Featured Event Banner */}
          {filteredEvents.find(e => e.featured) && (() => {
            const featured = filteredEvents.find(e => e.featured)!
            const categoryBadge = getCategoryBadge(featured.category)
            const CategoryIcon = categoryBadge.icon

            return (
              <div className="bg-gradient-to-br from-[#1a1f2e] to-[#0a0e17] border-b border-[#2d333b] p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-[#ff6b35]" />
                  <h2 className="text-base lg:text-lg font-bold">{t.featuredEvent}</h2>
                </div>
                <div className="bg-[#151922] rounded-xl overflow-hidden">
                  <div className={`w-full h-48 sm:h-56 relative overflow-hidden ${!featured.coverImage ? `bg-gradient-to-br ${featured.thumbnail}` : 'bg-gray-900'}`}>
                    {featured.coverImage && (
                      <img
                        src={featured.coverImage}
                        alt={featured.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                    {/* Category Badge */}
                    <div className={`absolute top-3 left-3 ${categoryBadge.bg} border ${categoryBadge.border} ${categoryBadge.text} px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 z-10`}>
                      <CategoryIcon className="w-3.5 h-3.5" />
                      {categoryBadge.label.toUpperCase()}
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4 sm:p-6">
                      <div className="w-full">
                        <h3 className="text-xl sm:text-2xl font-bold mb-2">{featured.title}</h3>
                        <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm flex-wrap">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            {featured.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            {featured.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6">
                    {/* Prize and Registration - Fixed Mobile Layout */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                      <div className="min-w-0">
                        <div className="text-xs text-[#9aa0a6] mb-1">{t.totalPrize}</div>
                        <div className="text-lg sm:text-2xl font-bold text-[#ff6b35] truncate">{featured.prize}</div>
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs text-[#9aa0a6] mb-1">{t.registered}</div>
                        <div className="text-lg sm:text-2xl font-bold">
                          <span className="text-[#ff6b35]">{featured.participants.toLocaleString()}</span>
                          <span className="text-[#9aa0a6]">/{featured.maxParticipants.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <MapPin className="w-4 h-4 text-[#9aa0a6] flex-shrink-0" />
                      <span className="text-sm text-[#9aa0a6] truncate">{featured.location}</span>
                    </div>

                    <div className="flex gap-2 mb-4 flex-wrap">
                      {featured.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 bg-[#1c2128] border border-[#2d333b] text-[#9aa0a6] text-xs rounded-lg"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button className="w-full bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-black py-3 rounded-3xl font-bold hover:translate-y-[-2px] transition-all shadow-[0_0_20px_rgba(255,107,53,0.3)]">
                      {t.registerNow}
                    </button>
                  </div>
                </div>
              </div>
            )
          })()}

          {/* Events List */}
          <div>
            {filteredEvents.filter(e => !e.featured).map((event) => {
              const categoryBadge = getCategoryBadge(event.category)
              const CategoryIcon = categoryBadge.icon

              return (
                <div
                  key={event.id}
                  className="bg-[#151922] border-b border-[#2d333b] px-4 py-4 hover:bg-[#1c2128] transition-colors"
                >
                  <div className="flex gap-3 sm:gap-4">
                    {/* Thumbnail with subtle category ring */}
                    <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden ${categoryBadge.ring} flex-shrink-0 relative ${!event.coverImage ? `bg-gradient-to-br ${event.thumbnail}` : 'bg-gray-900'}`}>
                      {event.coverImage && (
                        <img
                          src={event.coverImage}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm sm:text-base font-bold truncate">{event.title}</h3>
                          <p className="text-xs sm:text-sm text-[#9aa0a6] truncate">{event.game}</p>
                        </div>
                        <span className={`${categoryBadge.bg} border ${categoryBadge.border} ${categoryBadge.text} px-2 py-1 text-[10px] font-bold rounded-lg whitespace-nowrap flex-shrink-0`}>
                          {categoryBadge.label}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 sm:gap-4 text-[10px] sm:text-xs text-[#9aa0a6] mb-2 flex-wrap">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span className="truncate">{event.date} {event.time}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {event.participants}/{event.maxParticipants}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ff6b35] flex-shrink-0" />
                          <span className="text-xs sm:text-sm font-bold text-[#ff6b35] truncate">{event.prize}</span>
                        </div>
                        <button className="bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-3xl text-[10px] sm:text-xs font-semibold hover:translate-y-[-1px] transition-all flex-shrink-0">
                          {t.details}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

            {filteredEvents.filter(e => !e.featured).length === 0 && (
              <div className="text-center py-12">
                <Filter className="w-12 h-12 text-[#9aa0a6] mx-auto mb-3 opacity-50" />
                <p className="text-[#9aa0a6]">Không có sự kiện nào trong danh mục này</p>
              </div>
            )}
          </div>
        </>
      )}

      {activeTab === 'live' && (
        <div>
          {liveEvents.map((event) => {
            const categoryBadge = getCategoryBadge(event.category)
            const CategoryIcon = categoryBadge.icon

            return (
              <div
                key={event.id}
                className="bg-[#151922] border-b border-[#2d333b] px-4 py-4"
              >
                <div className="flex gap-3 sm:gap-4">
                  {/* Thumbnail with LIVE indicator and subtle category ring */}
                  <div className={`w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden ${categoryBadge.ring} flex-shrink-0 relative ${!event.coverImage ? `bg-gradient-to-br ${event.thumbnail}` : 'bg-gray-900'}`}>
                    {event.coverImage && (
                      <img
                        src={event.coverImage}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <div className="bg-red-500 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 animate-pulse">
                        <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                        {t.live.toUpperCase()}
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 mb-2">
                      <h3 className="text-base sm:text-lg font-bold flex-1 min-w-0">{event.title}</h3>
                      <span className={`${categoryBadge.bg} border ${categoryBadge.border} ${categoryBadge.text} px-2 py-1 text-[10px] font-bold rounded-lg whitespace-nowrap`}>
                        {categoryBadge.label}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#9aa0a6] mb-3 truncate">{event.game}</p>

                    <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm mb-3 flex-wrap">
                      <span className="flex items-center gap-1 text-[#9aa0a6]">
                        <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        {t.started} {event.startTime}
                      </span>
                      <span className="flex items-center gap-1 text-[#3fb950]">
                        <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        {event.viewers.toLocaleString()} {t.watching}
                      </span>
                    </div>

                    <button className="bg-red-500 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-3xl text-xs sm:text-sm font-bold hover:bg-red-600 transition-all">
                      {t.watchNow}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Create Event CTA */}
      <div className="bg-gradient-to-br from-[#1a1f2e] to-[#0a0e17] border-t border-[#2d333b] p-6 text-center">
        <Trophy className="w-12 h-12 text-[#ff6b35] mx-auto mb-3" />
        <h2 className="text-lg lg:text-xl font-bold mb-2">{t.organizeEvent}</h2>
        <p className="text-xs lg:text-sm text-[#9aa0a6] mb-4 max-w-md mx-auto">
          {t.organizeEventDesc}
        </p>
        <button className="bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-black px-8 py-3 rounded-3xl font-semibold hover:translate-y-[-2px] transition-all shadow-[0_0_20px_rgba(255,107,53,0.3)]">
          {t.createNewEvent}
        </button>
      </div>
    </>
  )
}
