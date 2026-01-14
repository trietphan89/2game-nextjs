'use client'

import { useState } from 'react'
import { Trophy, TrendingUp, Users, Star, Crown, Medal } from 'lucide-react'
import { useLanguage } from '@/app/layout'

export default function RankingsPage() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState('players')

  const tabs = [
    { id: 'players', label: t.topPlayers, icon: Users },
    { id: 'games', label: t.topGames, icon: TrendingUp },
    { id: 'guilds', label: t.topGuilds, icon: Trophy },
  ]

  const topPlayers = [
    { rank: 1, name: 'ProGamer_VN', avatar: 'https://i.pravatar.cc/150?img=68', level: 99, points: 125000, games: 245, badge: 'Legendary' },
    { rank: 2, name: 'DragonKnight', avatar: 'https://i.pravatar.cc/150?img=12', level: 95, points: 118000, games: 230, badge: 'Master' },
    { rank: 3, name: 'ShadowNinja', avatar: 'https://i.pravatar.cc/150?img=33', level: 92, points: 112000, games: 220, badge: 'Master' },
    { rank: 4, name: 'MageSupreme', avatar: 'https://i.pravatar.cc/150?img=15', level: 90, points: 105000, games: 210, badge: 'Diamond' },
    { rank: 5, name: 'ArcherElite', avatar: 'https://i.pravatar.cc/150?img=56', level: 88, points: 98000, games: 200, badge: 'Diamond' },
    { rank: 6, name: 'WarriorKing', avatar: 'https://i.pravatar.cc/150?img=59', level: 85, points: 92000, games: 195, badge: 'Diamond' },
    { rank: 7, name: 'AssassinX', avatar: 'https://i.pravatar.cc/150?img=51', level: 83, points: 87000, games: 185, badge: 'Platinum' },
    { rank: 8, name: 'HealerAngel', avatar: 'https://i.pravatar.cc/150?img=47', level: 80, points: 82000, games: 180, badge: 'Platinum' },
    { rank: 9, name: 'TankCommander', avatar: 'https://i.pravatar.cc/150?img=60', level: 78, points: 76000, games: 175, badge: 'Platinum' },
    { rank: 10, name: 'SpeedRacer', avatar: 'https://i.pravatar.cc/150?img=14', level: 75, points: 71000, games: 170, badge: 'Gold' },
  ]

  const topGames = [
    { rank: 1, title: 'Phoenix Story: Awakening', players: '2.5M', rating: 4.8, revenue: '15M $', gradient: 'from-purple-600 to-purple-800' },
    { rank: 2, title: 'Battle Royale Legends', players: '8.5M', rating: 4.7, revenue: '12M $', gradient: 'from-fuchsia-600 to-red-500' },
    { rank: 3, title: 'Galaxy Tactics', players: '850K', rating: 4.9, revenue: '8M $', gradient: 'from-pink-500 to-yellow-400' },
    { rank: 4, title: 'Cyber Punk 2088', players: '1.2M', rating: 4.9, revenue: '7.5M $', gradient: 'from-cyan-700 to-purple-900' },
    { rank: 5, title: 'Racing Thunder', players: '3.8M', rating: 4.6, revenue: '6M $', gradient: 'from-teal-400 to-pink-300' },
  ]

  const topGuilds = [
    { rank: 1, name: 'Dragon Alliance', avatar: 'https://i.pravatar.cc/150?img=70', members: 150, level: 50, wins: 1250, server: 'VN-01' },
    { rank: 2, name: 'Shadow Legion', avatar: 'https://i.pravatar.cc/150?img=63', members: 145, level: 48, wins: 1180, server: 'VN-01' },
    { rank: 3, name: 'Phoenix Rising', avatar: 'https://i.pravatar.cc/150?img=57', members: 140, level: 47, wins: 1120, server: 'VN-02' },
    { rank: 4, name: 'Ice Warriors', avatar: 'https://i.pravatar.cc/150?img=52', members: 135, level: 45, wins: 1050, server: 'VN-01' },
    { rank: 5, name: 'Thunder Strike', avatar: 'https://i.pravatar.cc/150?img=69', members: 130, level: 44, wins: 980, server: 'VN-03' },
  ]

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-400'
    if (rank === 2) return 'text-gray-300'
    if (rank === 3) return 'text-orange-400'
    return 'text-[#9aa0a6]'
  }

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-400" />
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-300" />
    if (rank === 3) return <Medal className="w-5 h-5 text-orange-400" />
    return <span className="text-[#9aa0a6]">#{rank}</span>
  }

  return (
    <>
      {/* Feed Header with Tabs */}
      <div className="section-padding border-b border-[#2d333b] bg-[rgba(10,14,23,0.95)] backdrop-blur-xl sticky top-[57px] z-10">
        <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
          <Trophy className="w-5 h-5 md:w-6 md:h-6 text-[#ff6b35]" />
          <h1 className="heading-page">{t.rankingsTitle}</h1>
        </div>
        <div className="flex gap-2 md:gap-3 lg:gap-4 border-b border-[#2d333b] overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-1.5 md:gap-2 tab-text px-3 md:px-4 py-2 md:py-2.5 lg:py-3 border-b-2 transition-all whitespace-nowrap
                  ${activeTab === tab.id
                    ? 'text-[#ff6b35] border-[#ff6b35]'
                    : 'text-[#9aa0a6] border-transparent hover:text-[#e8eaed]'
                  }
                `}
              >
                <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Season Info Banner */}
      <div className="bg-gradient-to-br from-[#1a1f2e] to-[#0a0e17] border-b border-[#2d333b] section-padding">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1 md:mb-2">
              <Star className="w-4 h-4 md:w-5 md:h-5 text-[#ff6b35]" />
              <h2 className="heading-section">{t.seasonInfo}</h2>
            </div>
            <p className="text-body-secondary">{t.updateInfo}</p>
          </div>
          <div className="text-right">
            <div className="number-large">125.000₫</div>
            <div className="text-meta">{t.totalPrize}</div>
          </div>
        </div>
      </div>

      {/* Rankings Content */}
      {activeTab === 'players' && (
        <div>
          {topPlayers.map((player) => (
            <div
              key={player.rank}
              className="bg-[#151922] border-b border-[#2d333b] card-padding hover:bg-[#1c2128] transition-colors"
            >
              <div className="flex items-center gap-3 md:gap-4">
                {/* Rank */}
                <div className={`w-10 md:w-12 flex items-center justify-center text-xl md:text-2xl font-bold ${getRankColor(player.rank)}`}>
                  {getRankIcon(player.rank)}
                </div>

                {/* Avatar */}
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#2d333b]">
                  <img src={player.avatar} alt={player.name} className="w-full h-full object-cover" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 md:gap-2 mb-0.5 md:mb-1">
                    <h3 className="heading-card truncate">{player.name}</h3>
                    <span className="text-caption px-1.5 py-0.5 md:px-2 bg-[rgba(255,107,53,0.1)] border border-[rgba(255,107,53,0.3)] text-[#ff6b35] font-bold rounded whitespace-nowrap">
                      {player.badge}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 md:gap-4 text-meta">
                    <span>{t.level} {player.level}</span>
                    <span>•</span>
                    <span className="truncate">{player.games} {t.games}</span>
                  </div>
                </div>

                {/* Points */}
                <div className="text-right">
                  <div className="number-medium">{player.points.toLocaleString()}</div>
                  <div className="text-meta">{t.points}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'games' && (
        <div>
          {topGames.map((game) => (
            <div
              key={game.rank}
              className="bg-[#151922] border-b border-[#2d333b] card-padding hover:bg-[#1c2128] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3 md:gap-4">
                {/* Rank */}
                <div className={`w-10 md:w-12 flex items-center justify-center text-xl md:text-2xl font-bold ${getRankColor(game.rank)}`}>
                  {getRankIcon(game.rank)}
                </div>

                {/* Thumbnail */}
                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl bg-gradient-to-br ${game.gradient} flex-shrink-0`} />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="heading-card mb-0.5 md:mb-1 truncate">{game.title}</h3>
                  <div className="flex items-center gap-2 md:gap-4 text-meta flex-wrap">
                    <span>⭐ {game.rating}/5</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="truncate">{game.players} {t.players}</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="text-success truncate">{game.revenue}</span>
                  </div>
                </div>

                {/* Trend */}
                <div className="flex items-center gap-1 text-success">
                  <TrendingUp className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span className="number-small">+{game.rank * 2}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'guilds' && (
        <div>
          {topGuilds.map((guild) => (
            <div
              key={guild.rank}
              className="bg-[#151922] border-b border-[#2d333b] card-padding hover:bg-[#1c2128] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3 md:gap-4">
                {/* Rank */}
                <div className={`w-10 md:w-12 flex items-center justify-center text-xl md:text-2xl font-bold ${getRankColor(guild.rank)}`}>
                  {getRankIcon(guild.rank)}
                </div>

                {/* Avatar */}
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl overflow-hidden flex-shrink-0 border-2 border-[#2d333b]">
                  <img src={guild.avatar} alt={guild.name} className="w-full h-full object-cover" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 md:gap-2 mb-0.5 md:mb-1">
                    <h3 className="heading-card truncate">{guild.name}</h3>
                    <span className="text-caption px-1.5 py-0.5 bg-[#1c2128] border border-[#2d333b] text-[#9aa0a6] font-semibold rounded whitespace-nowrap">
                      {guild.server}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 md:gap-4 text-meta flex-wrap">
                    <span>{t.level} {guild.level}</span>
                    <span className="hidden sm:inline">•</span>
                    <span>{guild.members} {t.members}</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="text-success">{guild.wins} {t.wins}</span>
                  </div>
                </div>

                {/* Join Button */}
                <button className="bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-black btn-text-primary px-3 md:px-4 py-1.5 md:py-2 rounded-full hover:translate-y-[-1px] transition-all whitespace-nowrap">
                  {t.join}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Load More */}
      <div className="flex justify-center section-padding">
        <button className="bg-[#1c2128] border border-[#2d333b] btn-text-primary px-5 md:px-6 py-2.5 md:py-3 rounded-full hover:border-[#ff6b35] hover:text-[#ff6b35] transition-all">
          {t.seeMore}
        </button>
      </div>
    </>
  )
}
