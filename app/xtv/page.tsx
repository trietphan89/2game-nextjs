'use client'

import { useState } from 'react'
import { Tv, Users, Eye, Radio, TrendingUp, Clock, Video, Trophy, Shield, Zap, Sparkles, Award, Swords } from 'lucide-react'
import { useLanguage } from '@/app/layout'

export default function XTVPage() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState('live')

  const tabs = [
    { id: 'live', label: t.live, icon: Radio, badge: '12' },
    { id: 'trending', label: t.tabs.trending, icon: TrendingUp },
    { id: 'following', label: t.following, icon: Users },
  ]

  // Mock data for clips
  const trendingClips = [
    {
      id: 1,
      creator: 'ProGamer_VN',
      title: 'PENTAKILL INSANE! 1v5 Clutch Moment 🔥',
      game: 'Phoenix Story',
      views: 125000,
      likes: 8500,
      duration: 45,
      thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
      createdAt: '2h ago'
    },
    {
      id: 2,
      creator: 'SpeedRunner_VN',
      title: 'World Record Breaking Moment! ⚡',
      game: 'Cyber Punk 2088',
      views: 89000,
      likes: 6200,
      duration: 30,
      thumbnail: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80',
      createdAt: '5h ago'
    },
    {
      id: 3,
      creator: 'FunnyGamer',
      title: 'Epic Fail Compilation 😂',
      game: 'Battle Royale',
      views: 156000,
      likes: 12400,
      duration: 52,
      thumbnail: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80',
      createdAt: '1d ago'
    },
    {
      id: 4,
      creator: 'CoachNguyen',
      title: 'Perfect Strategy Execution 🎯',
      game: 'Galaxy Tactics',
      views: 45000,
      likes: 3200,
      duration: 38,
      thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80',
      createdAt: '3h ago'
    }
  ]

  // Mock data for tournaments
  const upcomingTournaments = [
    {
      id: 1,
      name: 'Liên Quân Mobile Championship',
      game: 'Liên Quân Mobile',
      prizePool: '50,000,000 VND',
      participants: '128/128',
      startDate: 'Jan 15, 2026',
      status: 'registration_open',
      banner: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=800&q=80'
    },
    {
      id: 2,
      name: 'Phoenix Story Guild Wars',
      game: 'Phoenix Story',
      prizePool: '30,000,000 VND',
      participants: '64/100',
      startDate: 'Jan 20, 2026',
      status: 'registration_open',
      banner: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&q=80'
    }
  ]

  // Mock data for guilds
  const topGuilds = [
    {
      id: 1,
      name: 'Phoenix Rising',
      tag: 'PHNX',
      members: '148/200',
      level: 23,
      rank: 12,
      logo: 'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?w=400&q=80'
    },
    {
      id: 2,
      name: 'Dragon Warriors',
      tag: 'DRGN',
      members: '167/200',
      level: 28,
      rank: 8,
      logo: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&q=80'
    },
    {
      id: 3,
      name: 'Elite Gamers VN',
      tag: 'EGVN',
      members: '134/150',
      level: 19,
      rank: 15,
      logo: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=400&q=80'
    }
  ]

  const liveStreams = [
    {
      id: 1,
      streamer: 'ProGamer_VN',
      avatar: 'https://i.pravatar.cc/150?img=68',
      title: '[LIVE] Phoenix Story - Raid Boss Chiến Thần cùng Guild! 🔥',
      game: 'Phoenix Story: Awakening',
      viewers: 12500,
      duration: '3h 24m',
      thumbnail: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&q=60',
      tags: ['Vietnamese', 'Raid', 'Guild'],
    },
    {
      id: 2,
      streamer: 'GameShowVN',
      avatar: 'https://i.pravatar.cc/150?img=12',
      title: 'GIẢI ĐẤU BATTLE ROYALE - CHUNG KẾT | 100 TRIỆU ĐỒNG',
      game: 'Battle Royale Legends',
      viewers: 45000,
      duration: '1h 12m',
      thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=60',
      tags: ['Tournament', 'Prize', 'Vietnamese'],
      featured: true,
    },
    {
      id: 3,
      streamer: 'SpeedRunner_VN',
      avatar: 'https://i.pravatar.cc/150?img=33',
      title: 'World Record Attempt - Cyber Punk Any% Speedrun',
      game: 'Cyber Punk 2088',
      viewers: 8900,
      duration: '45m',
      thumbnail: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=60',
      tags: ['Speedrun', 'World Record', 'English'],
    },
    {
      id: 4,
      streamer: 'CoachNguyen',
      avatar: 'https://i.pravatar.cc/150?img=15',
      title: 'Hướng dẫn từ A-Z cho newbie - Q&A live!',
      game: 'Galaxy Tactics',
      viewers: 3400,
      duration: '2h 18m',
      thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=60',
      tags: ['Tutorial', 'Q&A', 'Vietnamese'],
    },
    {
      id: 5,
      streamer: 'RacingPro',
      avatar: 'https://i.pravatar.cc/150?img=56',
      title: 'Drift King Championship - Qualifying Round',
      game: 'Racing Thunder',
      viewers: 6700,
      duration: '1h 34m',
      thumbnail: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=60',
      tags: ['Racing', 'Championship', 'Vietnamese'],
    },
  ]

  return (
    <>
      {/* Feed Header with Tabs */}
      <div className="px-4 py-3 lg:py-4 border-b border-[#2d333b] bg-[rgba(10,14,23,0.95)] backdrop-blur-xl sticky top-[57px] z-10">
        <div className="flex items-center gap-3 mb-3 lg:mb-4">
          <Tv className="w-5 h-5 lg:w-6 lg:h-6 text-[#ff6b35]" />
          <h1 className="text-base lg:text-xl font-bold">{t.xtvTitle}</h1>
          <span className="flex items-center gap-1 px-2 py-1 bg-red-500/20 border border-red-500 text-red-500 text-xs font-bold rounded-lg animate-pulse">
            <Radio className="w-3 h-3" />
            {t.live.toUpperCase()}
          </span>
        </div>
        <div className="flex gap-2 lg:gap-4 border-b border-[#2d333b] overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-3 lg:px-4 py-2 lg:py-3 text-[13px] lg:text-[15px] font-semibold border-b-2 transition-all
                  ${activeTab === tab.id
                    ? 'text-[#ff6b35] border-[#ff6b35]'
                    : 'text-[#9aa0a6] border-transparent hover:text-[#e8eaed]'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="px-1.5 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded">
                    {tab.badge}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Featured Stream Banner */}
      {liveStreams.find(s => s.featured) && (
        <div className="bg-gradient-to-br from-[#1a1f2e] to-[#0a0e17] border-b border-[#2d333b] p-6">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-[#ff6b35]" />
            <h2 className="text-base lg:text-lg font-bold">{t.featuredStream}</h2>
          </div>
          {(() => {
            const featured = liveStreams.find(s => s.featured)!
            return (
              <div className="bg-[#151922] rounded-xl overflow-hidden cursor-pointer hover:ring-2 hover:ring-[#ff6b35] transition-all">
                <div className="w-full h-48 relative overflow-hidden">
                  <img src={featured.thumbnail} alt={featured.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 flex items-center gap-2 bg-red-500 px-2 py-1 rounded-lg text-xs font-bold">
                    <Radio className="w-3 h-3 animate-pulse" />
                    {t.live.toUpperCase()}
                  </div>
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-semibold">
                    <Eye className="w-3 h-3" />
                    {featured.viewers.toLocaleString()}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-semibold">
                    {featured.duration}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#2d333b]">
                      <img src={featured.avatar} alt={featured.streamer} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-bold mb-1">{featured.title}</h3>
                      <p className="text-sm text-[#9aa0a6] mb-2">{featured.streamer} • {featured.game}</p>
                      <div className="flex gap-2 flex-wrap">
                        {featured.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-[#1c2128] border border-[#2d333b] text-[#9aa0a6] text-xs rounded-lg"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })()}
        </div>
      )}

      {/* Live Streams Grid */}
      <div className="p-4">
        <div className="grid grid-cols-1 gap-4">
          {liveStreams.filter(s => !s.featured).map((stream) => (
            <div
              key={stream.id}
              className="bg-[#151922] rounded-xl overflow-hidden cursor-pointer hover:ring-2 hover:ring-[#ff6b35] transition-all"
            >
              <div className="w-full h-40 relative overflow-hidden">
                <img src={stream.thumbnail} alt={stream.title} className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 flex items-center gap-1 bg-red-500 px-2 py-1 rounded-lg text-xs font-bold">
                  <Radio className="w-3 h-3 animate-pulse" />
                  {t.live.toUpperCase()}
                </div>
                <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-semibold">
                  <Eye className="w-3 h-3" />
                  {stream.viewers.toLocaleString()}
                </div>
                <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-semibold">
                  {stream.duration}
                </div>
              </div>
              <div className="p-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#2d333b]">
                    <img src={stream.avatar} alt={stream.streamer} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold mb-1 line-clamp-2">{stream.title}</h3>
                    <p className="text-xs text-[#9aa0a6] mb-2">{stream.streamer} • {stream.game}</p>
                    <div className="flex gap-1.5 flex-wrap">
                      {stream.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-1.5 py-0.5 bg-[#1c2128] border border-[#2d333b] text-[#9aa0a6] text-[10px] rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="px-4 pb-6">
        <h2 className="text-base lg:text-lg font-bold mb-4">{t.popularCategories}</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: 'Phoenix Story', count: 245, image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&q=80' },
            { name: 'Battle Royale', count: 189, image: 'https://images.unsplash.com/photo-1556438064-2d7646166914?w=600&q=80' },
            { name: 'Racing', count: 156, image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&q=80' },
            { name: 'Strategy', count: 134, image: 'https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=600&q=80' },
          ].map((category) => (
            <div
              key={category.name}
              className="bg-[#151922] border border-[#2d333b] rounded-xl p-4 cursor-pointer hover:border-[#ff6b35] transition-all"
            >
              <div className="w-full h-24 rounded-lg overflow-hidden mb-3">
                <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-sm font-bold mb-1">{category.name}</h3>
              <p className="text-xs text-[#9aa0a6]">{category.count} {t.streams}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Clips Section */}
      <div className="bg-gradient-to-br from-[#1a1f2e] to-[#0a0e17] border-y border-[#2d333b] p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5 text-[#ff6b35]" />
            <h2 className="text-base lg:text-lg font-bold">Trending Clips</h2>
          </div>
          <button className="text-sm text-[#ff6b35] hover:underline">View All</button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {trendingClips.map((clip) => (
            <div
              key={clip.id}
              className="bg-[#151922] rounded-xl overflow-hidden cursor-pointer hover:ring-2 hover:ring-[#ff6b35] transition-all group"
            >
              <div className="relative w-full h-48 overflow-hidden">
                <img src={clip.thumbnail} alt={clip.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all" />
                <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold">
                  {clip.duration}s
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 bg-[#ff6b35] rounded-full flex items-center justify-center">
                    <Video className="w-6 h-6" />
                  </div>
                </div>
              </div>
              <div className="p-3">
                <h3 className="text-xs font-bold mb-1 line-clamp-2">{clip.title}</h3>
                <p className="text-[10px] text-[#9aa0a6] mb-2">{clip.creator} • {clip.game}</p>
                <div className="flex items-center gap-3 text-[10px] text-[#9aa0a6]">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {(clip.views / 1000).toFixed(0)}K
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-icons text-[12px] text-red-500">favorite</span>
                    {(clip.likes / 1000).toFixed(1)}K
                  </span>
                  <span>{clip.createdAt}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Battle Pass Banner */}
      <div className="mx-4 mb-6 bg-gradient-to-br from-purple-900/50 via-pink-900/50 to-orange-900/50 border border-purple-500/30 rounded-xl overflow-hidden">
        <div className="p-6 relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-6 h-6 text-yellow-400" />
              <span className="text-xs font-bold text-yellow-400 uppercase tracking-wider">New Season</span>
            </div>
            <h2 className="text-xl lg:text-2xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Battle Pass Season 1
            </h2>
            <p className="text-sm text-[#9aa0a6] mb-4">
              Unlock 100+ exclusive rewards! Complete missions, level up, and earn amazing prizes.
            </p>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-[#9aa0a6]">Level 42</span>
                  <span className="text-xs font-bold text-yellow-400">70% Complete</span>
                </div>
                <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full" style={{ width: '70%' }} />
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="flex-1 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-black px-6 py-3 rounded-xl font-bold hover:translate-y-[-2px] transition-all shadow-[0_0_20px_rgba(255,107,53,0.3)]">
                View Battle Pass
              </button>
              <button className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl font-bold hover:bg-white/20 transition-all">
                Upgrade Premium
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tournaments Section */}
      <div className="px-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#ff6b35]" />
            <h2 className="text-base lg:text-lg font-bold">Upcoming Tournaments</h2>
          </div>
          <button className="text-sm text-[#ff6b35] hover:underline">View All</button>
        </div>
        <div className="space-y-3">
          {upcomingTournaments.map((tournament) => (
            <div
              key={tournament.id}
              className="bg-[#151922] border border-[#2d333b] rounded-xl overflow-hidden cursor-pointer hover:border-[#ff6b35] transition-all"
            >
              <div className="h-24 relative overflow-hidden">
                <img src={tournament.banner} alt={tournament.name} className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 bg-green-500 px-2 py-1 rounded-lg text-xs font-bold">
                  Registration Open
                </div>
                <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                  <span className="material-icons text-[14px] text-yellow-400">payments</span>
                  {tournament.prizePool}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-bold mb-2">{tournament.name}</h3>
                <div className="flex items-center gap-4 text-xs text-[#9aa0a6] mb-3">
                  <span className="flex items-center gap-1">
                    <span className="material-icons text-[14px]">sports_esports</span>
                    {tournament.game}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-icons text-[14px]">group</span>
                    {tournament.participants}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-icons text-[14px]">calendar_today</span>
                    {tournament.startDate}
                  </span>
                </div>
                <button className="w-full bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-black px-4 py-2 rounded-lg font-bold text-sm hover:translate-y-[-2px] transition-all">
                  Register Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Guilds Section */}
      <div className="px-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#ff6b35]" />
            <h2 className="text-base lg:text-lg font-bold">Top Guilds</h2>
          </div>
          <button className="text-sm text-[#ff6b35] hover:underline">View Leaderboard</button>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {topGuilds.map((guild) => (
            <div
              key={guild.id}
              className="bg-[#151922] border border-[#2d333b] rounded-xl p-4 cursor-pointer hover:border-[#ff6b35] transition-all flex items-center gap-4"
            >
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 border-[#2d333b]">
                <img src={guild.logo} alt={guild.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-purple-400">[{guild.tag}]</span>
                  <h3 className="text-sm font-bold">{guild.name}</h3>
                </div>
                <div className="flex items-center gap-3 text-xs text-[#9aa0a6]">
                  <span className="flex items-center gap-1">
                    <span className="material-icons text-[14px]">group</span>
                    {guild.members}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-icons text-[14px]">bolt</span>
                    Lv {guild.level}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-icons text-[14px]">emoji_events</span>
                    #{guild.rank}
                  </span>
                </div>
              </div>
              <button className="px-4 py-2 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-black rounded-lg font-bold text-sm hover:translate-y-[-2px] transition-all">
                Join
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Become Streamer CTA */}
      <div className="bg-gradient-to-br from-[#1a1f2e] to-[#0a0e17] border-t border-[#2d333b] p-6 text-center">
        <Tv className="w-12 h-12 text-[#ff6b35] mx-auto mb-3" />
        <h2 className="text-lg lg:text-xl font-bold mb-2">{t.becomeStreamer}</h2>
        <p className="text-xs lg:text-sm text-[#9aa0a6] mb-4 max-w-md mx-auto">
          {t.becomeStreamerDesc}
        </p>
        <button className="bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-black px-8 py-3 rounded-3xl font-semibold hover:translate-y-[-2px] transition-all shadow-[0_0_20px_rgba(255,107,53,0.3)]">
          {t.registerNow}
        </button>
      </div>
    </>
  )
}
