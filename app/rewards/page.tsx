'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Gift, Trophy, Star, Crown, Zap, Award, TrendingUp,
  Flame, Target, Users, Calendar, Filter, ChevronRight,
  Check, Lock, Sparkles
} from 'lucide-react'
import { useLanguage } from '@/app/layout'

// ============================================================================
// MOCK DATA
// ============================================================================

const mockUserStats = {
  level: 42,
  currentXP: 8750,
  nextLevelXP: 10000,
  totalXP: 125000,
  currentStreak: 12,
  longestStreak: 28,
  questsCompleted: 156,
  totalRewards: 43,
}

const mockDailyQuests = [
  {
    id: 1,
    title: 'Cyberpunk 2077 - Complete Main Quest',
    description: 'Complete any main story mission in Night City',
    reward: 350,
    xp: 200,
    progress: 1,
    total: 1,
    completed: true,
    thumbnail: '🎸',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/vi/9/9f/Cyberpunk_2077_box_art.jpg',
    category: 'daily',
  },
  {
    id: 2,
    title: 'Valorant - Win 3 Ranked Matches',
    description: 'Win 3 competitive matches in Valorant',
    reward: 450,
    xp: 250,
    progress: 2,
    total: 3,
    completed: false,
    thumbnail: '🎯',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/b/ba/Valorant_cover.jpg',
    category: 'daily',
  },
  {
    id: 3,
    title: 'Genshin Impact - Daily Commissions',
    description: 'Complete all 4 daily commissions in Teyvat',
    reward: 300,
    xp: 180,
    progress: 3,
    total: 4,
    completed: false,
    thumbnail: '💎',
    imageUrl: 'https://image.api.playstation.com/vulcan/ap/rnd/202508/2602/30935168a0f21b6710dc2bd7bb37c23ed937fb9fa747d84c.png',
    category: 'daily',
  },
  {
    id: 4,
    title: 'Elden Ring - Defeat 10 Bosses',
    description: 'Slay 10 bosses in the Lands Between',
    reward: 600,
    xp: 400,
    progress: 7,
    total: 10,
    completed: false,
    thumbnail: '⚔️',
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BMWNlMDBiYzYtMWMyMC00Zjc5LTlhMjItMjRlMzBmYmVkOGM0XkEyXkFqcGc@._V1_QL75_UY281_CR4,0,190,281_.jpg',
    category: 'daily',
  },
]

const mockSocialMissions = [
  {
    id: 11,
    title: 'League of Legends - Reach Gold Rank',
    description: 'Climb to Gold rank in ranked solo queue',
    reward: 2000,
    xp: 1200,
    progress: 3,
    total: 5,
    completed: false,
    thumbnail: '🎭',
    imageUrl: 'https://i.imgur.com/I9JF3mh.jpeg',
    category: 'social',
  },
  {
    id: 12,
    title: 'Minecraft - Build Epic Structure',
    description: 'Create and share a mega-build with community',
    reward: 1200,
    xp: 600,
    progress: 1,
    total: 1,
    completed: false,
    thumbnail: '🧱',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/vi/4/48/%E1%BA%A2nh_b%C3%ACa_Minecraft.png',
    category: 'social',
  },
  {
    id: 13,
    title: 'PUBG Mobile - Squad Victory x20',
    description: 'Win 20 squad matches with friends',
    reward: 1500,
    xp: 800,
    progress: 15,
    total: 20,
    completed: false,
    thumbnail: '🎖️',
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BODQzNzJjY2QtY2Y2YS00OWJmLTlkZWMtMmNmMmE2NTg1MjQzXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    category: 'social',
  },
]

const mockPartnerEvents = [
  {
    id: 21,
    title: 'Black Myth Wukong - Chapter Master',
    description: 'Complete all chapters and unlock secret ending',
    reward: 6000,
    xp: 3000,
    progress: 0,
    total: 1,
    completed: false,
    thumbnail: '🐒',
    imageUrl: 'https://assets-prd.ignimgs.com/2024/08/18/blackmyth-1723969364570.jpg',
    category: 'partner',
    endsIn: '5 days',
  },
  {
    id: 22,
    title: "Baldur's Gate 3 - Honor Mode Victory",
    description: 'Complete Honor Mode without party wipe',
    reward: 8000,
    xp: 4000,
    progress: 0,
    total: 1,
    completed: false,
    thumbnail: '🛡️',
    imageUrl: 'https://image.api.playstation.com/vulcan/ap/rnd/202302/2321/ba706e54d68d10a0eb6ab7c36cdad9178c58b7fb7bb03d28.png',
    category: 'partner',
    endsIn: '2 weeks',
  },
  {
    id: 23,
    title: 'Forza Horizon 5 - Speed Demon Challenge',
    description: 'Reach 400 km/h in any vehicle',
    reward: 4500,
    xp: 2500,
    progress: 0,
    total: 1,
    completed: false,
    thumbnail: '🏎️',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/8/86/Forza_Horizon_5_cover_art.jpg',
    category: 'partner',
    endsIn: '1 week',
  },
]

const mockRewards = [
  {
    id: 1,
    title: 'Cyberpunk 2077 - Johnny Silverhand Outfit',
    description: 'Iconic rocker outfit with legendary stats',
    cost: 5000,
    stock: 45,
    maxStock: 100,
    rarity: 'legendary',
    category: 'skins',
    image: '🎸',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/vi/9/9f/Cyberpunk_2077_box_art.jpg',
    limited: true,
  },
  {
    id: 2,
    title: 'Valorant - Elderflame Vandal',
    description: 'Legendary dragon-themed weapon skin with VFX',
    cost: 4500,
    stock: 78,
    maxStock: 150,
    rarity: 'legendary',
    category: 'skins',
    image: '🔥',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/b/ba/Valorant_cover.jpg',
    limited: false,
  },
  {
    id: 3,
    title: 'Genshin Impact - 6480 Primogems',
    description: 'Premium currency for wishes and characters',
    cost: 3200,
    stock: 234,
    maxStock: 500,
    rarity: 'epic',
    category: 'currency',
    image: '💎',
    imageUrl: 'https://image.api.playstation.com/vulcan/ap/rnd/202508/2602/30935168a0f21b6710dc2bd7bb37c23ed937fb9fa747d84c.png',
    limited: false,
  },
  {
    id: 4,
    title: 'Elden Ring - Legendary Weapon Pack',
    description: 'Collection of mythical weapons and ashes',
    cost: 5500,
    stock: 56,
    maxStock: 120,
    rarity: 'legendary',
    category: 'skins',
    image: '⚔️',
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BMWNlMDBiYzYtMWMyMC00Zjc5LTlhMjItMjRlMzBmYmVkOGM0XkEyXkFqcGc@._V1_QL75_UY281_CR4,0,190,281_.jpg',
    limited: true,
  },
  {
    id: 5,
    title: 'Black Myth Wukong - Mythical Staff Skin',
    description: 'Divine Ruyi Jingu Bang transformation',
    cost: 6000,
    stock: 34,
    maxStock: 80,
    rarity: 'legendary',
    category: 'skins',
    image: '🐒',
    imageUrl: 'https://assets-prd.ignimgs.com/2024/08/18/blackmyth-1723969364570.jpg',
    limited: true,
  },
  {
    id: 6,
    title: 'League of Legends - Ultimate Skin Bundle',
    description: 'Premium ultimate skin with unique animations',
    cost: 4800,
    stock: 123,
    maxStock: 250,
    rarity: 'epic',
    category: 'skins',
    image: '🎭',
    imageUrl: 'https://i.imgur.com/I9JF3mh.jpeg',
    limited: false,
  },
  {
    id: 7,
    title: 'Minecraft - Ultimate Builder Pack',
    description: 'Exclusive blocks, skins, and texture packs',
    cost: 2800,
    stock: 456,
    maxStock: 800,
    rarity: 'rare',
    category: 'skins',
    image: '🧱',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/vi/4/48/%E1%BA%A2nh_b%C3%ACa_Minecraft.png',
    limited: false,
  },
  {
    id: 8,
    title: "Baldur's Gate 3 - Legendary Armor Set",
    description: 'Epic armor collection for your party',
    cost: 5200,
    stock: 67,
    maxStock: 150,
    rarity: 'legendary',
    category: 'skins',
    image: '🛡️',
    imageUrl: 'https://image.api.playstation.com/vulcan/ap/rnd/202302/2321/ba706e54d68d10a0eb6ab7c36cdad9178c58b7fb7bb03d28.png',
    limited: true,
  },
  {
    id: 9,
    title: 'PUBG Mobile - Elite Royal Pass Season',
    description: 'Complete season pass with exclusive rewards',
    cost: 3500,
    stock: 189,
    maxStock: 400,
    rarity: 'epic',
    category: 'exclusive',
    image: '🎖️',
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BODQzNzJjY2QtY2Y2YS00OWJmLTlkZWMtMmNmMmE2NTg1MjQzXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    limited: false,
  },
  {
    id: 10,
    title: 'Forza Horizon 5 - Car Pass Ultimate',
    description: '50+ premium vehicles and customization',
    cost: 4200,
    stock: 98,
    maxStock: 200,
    rarity: 'epic',
    category: 'exclusive',
    image: '🏎️',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/8/86/Forza_Horizon_5_cover_art.jpg',
    limited: false,
  },
  {
    id: 11,
    title: 'The Witcher 3 - Witcher Gear Pack',
    description: 'Complete Grandmaster Witcher armor sets',
    cost: 4600,
    stock: 87,
    maxStock: 180,
    rarity: 'legendary',
    category: 'skins',
    image: '🐺',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/vi/e/e2/Bia_TheWitcher3.jpg',
    limited: false,
  },
  {
    id: 12,
    title: 'Apex Legends - Heirloom Shards x150',
    description: 'Unlock any heirloom weapon skin of choice',
    cost: 7500,
    stock: 23,
    maxStock: 50,
    rarity: 'legendary',
    category: 'currency',
    image: '💀',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/d/db/Apex_legends_cover.jpg',
    limited: true,
  },
  {
    id: 13,
    title: 'Terra Nil - Eco Pioneer Pack',
    description: 'Exclusive ecosystem restoration tools',
    cost: 2400,
    stock: 234,
    maxStock: 500,
    rarity: 'rare',
    category: 'exclusive',
    image: '🌱',
    imageUrl: 'https://cdn.xsolla.net/image-proxy/rs:fit:3840:0/f:webp/quality:100/storage/mall-bucket-prod/cms/SHRlWtG6DcJiq-RyJRzdm.webp@webp',
    limited: false,
  },
  {
    id: 14,
    title: 'Raji: Ancient Epic - Divine Weapon Pack',
    description: 'Blessed weapons from Hindu gods',
    cost: 3800,
    stock: 112,
    maxStock: 250,
    rarity: 'epic',
    category: 'skins',
    image: '🗡️',
    imageUrl: 'https://cdn.xsolla.net/image-proxy/rs:fit:3840:0/f:webp/quality:100/storage/mall-bucket-prod/cms/G4tDZKnz4BbUEwmHniqOt.webp@webp',
    limited: false,
  },
  {
    id: 15,
    title: 'Honkai Star Rail - Stellar Jade x8000',
    description: 'Premium pulls for limited characters',
    cost: 3400,
    stock: 267,
    maxStock: 600,
    rarity: 'epic',
    category: 'currency',
    image: '⭐',
    imageUrl: 'https://image.api.playstation.com/vulcan/ap/rnd/202308/1103/8c3ce3611a4bb187418bb5e24924a055ba33d3046a7aaacb.png',
    limited: false,
  },
  {
    id: 16,
    title: 'Premium Gaming Headset',
    description: '7.1 Surround Sound RGB Gaming Headset',
    cost: 12000,
    stock: 12,
    maxStock: 20,
    rarity: 'legendary',
    category: 'items',
    image: '🎧',
    imageUrl: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=800&q=80',
    limited: true,
  },
  {
    id: 17,
    title: '1.000.000₫ Game Credit',
    description: 'Use to purchase any game on the platform',
    cost: 8000,
    stock: 45,
    maxStock: 100,
    rarity: 'epic',
    category: 'currency',
    image: '💰',
    imageUrl: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=800&q=80',
    limited: false,
  },
]

// ============================================================================
// USER STATS COMPONENT - Gamification Dashboard
// ============================================================================

function UserStats() {
  const { t } = useLanguage()
  const stats = mockUserStats
  const xpPercentage = (stats.currentXP / stats.nextLevelXP) * 100

  return (
    <div className="bg-gradient-to-br from-[#1a1f2e] via-[#0a0e17] to-[#1a1f2e] border-b border-[#2d333b]/50 p-4 lg:p-6 relative overflow-hidden isolate">
      {/* Background Glow Effect - Constrained for mobile */}
      <div className="absolute top-0 right-0 w-48 h-48 lg:w-96 lg:h-96 bg-[#ff6b35]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-48 h-48 lg:w-96 lg:h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="relative z-0">
        {/* Top Row - Level & XP */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-4 mb-4 lg:mb-6">
          {/* Level Card */}
          <div className="bg-gradient-to-br from-[#ff6b35]/20 to-[#f7931e]/10 backdrop-blur-xl border border-[#ff6b35]/30 rounded-2xl p-3 lg:p-4">
            <div className="flex items-center gap-2 lg:gap-3">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-[#ff6b35] to-[#f7931e] rounded-xl flex items-center justify-center flex-shrink-0">
                <Crown className="w-5 h-5 lg:w-6 lg:h-6 text-black" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] lg:text-xs text-[#9aa0a6] uppercase tracking-wide truncate">{t.rewardsLevel}</p>
                <p className="text-2xl lg:text-3xl font-bold text-white">{stats.level}</p>
              </div>
            </div>
          </div>

          {/* XP Progress Card */}
          <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/10 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-3 lg:p-4 lg:col-span-2">
            <div className="flex items-center justify-between mb-2 gap-2">
              <div className="flex items-center gap-1 lg:gap-2 min-w-0">
                <Sparkles className="w-4 h-4 lg:w-5 lg:h-5 text-purple-400 flex-shrink-0" />
                <p className="text-[10px] lg:text-xs text-[#9aa0a6] uppercase tracking-wide truncate">{t.rewardsXpProgress}</p>
              </div>
              <p className="text-[10px] lg:text-sm text-white font-semibold whitespace-nowrap">
                {stats.currentXP.toLocaleString()} / {stats.nextLevelXP.toLocaleString()} XP
              </p>
            </div>
            <div className="relative w-full h-2 lg:h-3 bg-[#1c2128] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${xpPercentage}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
            </div>
          </div>
        </div>

        {/* Bottom Row - Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard
            icon={<Flame className="w-5 h-5 text-orange-400" />}
            label={t.rewardsCurrentStreak}
            value={`${stats.currentStreak} ${t.rewardsDays}`}
            bgClass="from-orange-500/20 to-red-500/10"
            borderClass="border-orange-500/30"
          />
          <StatCard
            icon={<Target className="w-5 h-5 text-green-400" />}
            label={t.rewardsQuestsCompleted}
            value={stats.questsCompleted}
            bgClass="from-green-500/20 to-emerald-500/10"
            borderClass="border-green-500/30"
          />
          <StatCard
            icon={<Trophy className="w-5 h-5 text-yellow-400" />}
            label={t.rewardsTotalRewards}
            value={stats.totalRewards}
            bgClass="from-yellow-500/20 to-amber-500/10"
            borderClass="border-yellow-500/30"
          />
          <StatCard
            icon={<Star className="w-5 h-5 text-blue-400" />}
            label={t.rewardsTotalXP}
            value={stats.totalXP.toLocaleString()}
            bgClass="from-blue-500/20 to-cyan-500/10"
            borderClass="border-blue-500/30"
          />
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon, label, value, bgClass, borderClass }: any) {
  return (
    <div className={`bg-gradient-to-br ${bgClass} backdrop-blur-xl border ${borderClass} rounded-xl p-3`}>
      <div className="flex items-center gap-1.5 mb-1">
        {icon}
        <p className="text-[10px] lg:text-xs text-[#9aa0a6] truncate">{label}</p>
      </div>
      <p className="text-lg lg:text-xl font-bold text-white truncate">{value}</p>
    </div>
  )
}

// ============================================================================
// QUEST CARD COMPONENT
// ============================================================================

function QuestCard({ quest }: { quest: any }) {
  const { t } = useLanguage()
  const progressPercentage = (quest.progress / quest.total) * 100
  const isCompleted = quest.completed

  return (
    <div className={`relative bg-gradient-to-br from-[#1a1f2e]/80 to-[#0a0e17]/80 backdrop-blur-xl border ${isCompleted ? 'border-[#3fb950]/50' : 'border-[#2d333b]/50'} rounded-2xl overflow-hidden group hover:border-[#ff6b35]/50 transition-all duration-300 ${isCompleted ? 'opacity-75' : ''}`}>
      {/* Hover Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#ff6b35]/0 via-[#ff6b35]/5 to-[#ff6b35]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Image Container - TOP */}
      <div className="relative w-full aspect-[16/9] bg-gradient-to-br from-[#1a1f2e] to-[#0a0e17] overflow-hidden">
        <img
          src={quest.imageUrl || '/placeholder-quest.jpg'}
          alt={quest.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges Overlay */}
        {quest.endsIn && (
          <div className="absolute top-2 right-2 lg:top-3 lg:right-3 px-2 py-1 lg:px-2.5 lg:py-1 bg-red-500/90 backdrop-blur-sm text-white text-[10px] lg:text-xs font-bold rounded-md">
            {quest.endsIn}
          </div>
        )}
        <div className="absolute top-2 left-2 lg:top-3 lg:left-3 px-2 py-1 lg:px-2.5 lg:py-1 bg-[#ff6b35]/90 backdrop-blur-sm text-white text-[10px] lg:text-xs font-bold rounded-md uppercase">
          {quest.category}
        </div>
      </div>

      {/* Content Container - EXACT HEIGHT */}
      <div className="p-4 relative z-10">
        {/* Title - EXACT 1 LINE */}
        <h3 className="text-sm lg:text-base font-bold text-white mb-2 line-clamp-1 leading-5 lg:leading-6 h-5 lg:h-6">
          {quest.title}
        </h3>

        {/* Description - EXACT 2 LINES */}
        <p className="text-xs lg:text-sm text-[#9aa0a6] mb-3 line-clamp-2 leading-4 lg:leading-[18px] h-8 lg:h-9">
          {quest.description}
        </p>

        {/* Rewards Row - EXACT HEIGHT */}
        <div className="flex items-center gap-3 mb-3 h-5 lg:h-6">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-[#ff6b35]" />
            <span className="text-xs lg:text-sm font-semibold text-[#ff6b35] leading-none">
              +{quest.reward}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-purple-400" />
            <span className="text-xs lg:text-sm font-semibold text-purple-400 leading-none">
              +{quest.xp} XP
            </span>
          </div>
        </div>

        {/* Progress Bar - EXACT HEIGHT ALWAYS */}
        <div className="mb-3 h-8 lg:h-9">
          {!isCompleted && (
            <>
              <div className="flex items-center justify-between text-[10px] lg:text-xs text-[#9aa0a6] mb-1.5 h-3 lg:h-3.5">
                <span className="leading-none">{t.progress}</span>
                <span className="font-semibold leading-none">{quest.progress}/{quest.total}</span>
              </div>
              <div className="relative w-full h-2 bg-[#1c2128] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#ff6b35] to-[#f7931e] rounded-full"
                />
              </div>
            </>
          )}
        </div>

        {/* Action Button - EXACT HEIGHT */}
        {isCompleted ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full h-9 lg:h-10 px-3 lg:px-4 bg-gradient-to-r from-[#3fb950] to-[#2ea043] text-white text-xs lg:text-sm font-semibold rounded-lg flex items-center justify-center gap-1.5 shadow-lg hover:shadow-[#3fb950]/50 transition-shadow"
          >
            <Check className="w-4 h-4" />
            {t.rewardsClaimReward}
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02 }}
            className="w-full h-9 lg:h-10 px-3 lg:px-4 bg-[#1a1f2e] border border-[#2d333b] text-white text-xs lg:text-sm font-semibold rounded-lg hover:border-[#ff6b35] transition-colors"
          >
            View Quest
          </motion.button>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// REWARD CARD COMPONENT - Glassmorphism
// ============================================================================

function RewardCard({ reward, userPoints }: { reward: any; userPoints: number }) {
  const { t } = useLanguage()
  const canAfford = userPoints >= reward.cost
  const stockPercentage = (reward.stock / reward.maxStock) * 100
  const isLowStock = stockPercentage < 30

  const getRarityGradient = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-orange-500/30 to-red-500/20'
      case 'epic': return 'from-purple-500/30 to-pink-500/20'
      case 'rare': return 'from-blue-500/30 to-cyan-500/20'
      default: return 'from-gray-500/30 to-slate-500/20'
    }
  }

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'border-orange-500/50'
      case 'epic': return 'border-purple-500/50'
      case 'rare': return 'border-blue-500/50'
      default: return 'border-gray-500/50'
    }
  }

  return (
    <div className={`relative bg-gradient-to-br ${getRarityGradient(reward.rarity)} backdrop-blur-xl border ${getRarityBorder(reward.rarity)} rounded-2xl overflow-hidden group cursor-pointer hover:scale-[1.02] transition-all duration-300`}>
      {/* Shimmer Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

      {/* Limited Badge */}
      {reward.limited && (
        <div className="absolute top-2 right-2 lg:top-3 lg:right-3 z-20 px-2 py-1 lg:px-2.5 lg:py-1 bg-red-500/90 backdrop-blur-sm text-white text-[10px] lg:text-xs font-bold rounded-md shadow-lg">
          {t.rewardsLimited}
        </div>
      )}

      <div className="relative z-10">
        {/* Image Container - aspect-[4/3] */}
        <div className="w-full aspect-[4/3] bg-gradient-to-br from-[#0a0e17] to-[#1a1f2e] overflow-hidden relative">
          <img
            src={reward.imageUrl || '/placeholder-reward.jpg'}
            alt={reward.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* Content Section */}
        <div className="p-4 relative z-10">
          {/* Title - EXACT 1 LINE */}
          <h3 className="text-sm lg:text-base font-bold text-white mb-2 line-clamp-1 leading-5 lg:leading-6 h-5 lg:h-6">
            {reward.title}
          </h3>

          {/* Description - EXACT 2 LINES */}
          <p className="text-xs lg:text-sm text-[#9aa0a6] mb-3 line-clamp-2 leading-4 lg:leading-[18px] h-8 lg:h-9">
            {reward.description}
          </p>

          {/* Stock Indicator - EXACT HEIGHT */}
          <div className="mb-3">
            <div className="flex items-center justify-between text-[10px] lg:text-xs text-[#9aa0a6] mb-1.5 h-3 lg:h-3.5">
              <span className="font-medium leading-none">
                {isLowStock ? t.rewardsLimited : t.rewardsInStock}
              </span>
              <span className="font-semibold leading-none">{reward.stock}/{reward.maxStock}</span>
            </div>
            <div className="w-full h-1.5 bg-[#1c2128] rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${isLowStock ? 'bg-gradient-to-r from-red-500 to-orange-500' : 'bg-gradient-to-r from-[#3fb950] to-[#2ea043]'}`}
                style={{ width: `${stockPercentage}%` }}
              />
            </div>
          </div>

          {/* Cost & Button Row - EXACT HEIGHT */}
          <div className="flex items-center justify-between gap-2.5">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 lg:w-5 lg:h-5 text-[#ff6b35]" />
              <span className="text-base lg:text-lg font-bold text-[#ff6b35] leading-none">
                {reward.cost.toLocaleString()}
              </span>
            </div>
            <motion.button
              whileHover={canAfford ? { scale: 1.05 } : {}}
              whileTap={canAfford ? { scale: 0.95 } : {}}
              disabled={!canAfford}
              className={`h-9 lg:h-10 px-3 lg:px-4 rounded-lg text-xs lg:text-sm font-semibold transition-all whitespace-nowrap ${canAfford ? 'bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-black hover:shadow-lg hover:shadow-[#ff6b35]/50' : 'bg-[#1c2128] text-[#6e7681] cursor-not-allowed'}`}
            >
              {canAfford ? t.redeemNow : <Lock className="w-3.5 h-3.5 lg:w-4 lg:h-4" />}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// MAIN REWARDS PAGE
// ============================================================================

export default function RewardsPage() {
  const { t } = useLanguage()
  const [questTab, setQuestTab] = useState<'daily' | 'social' | 'partner'>('daily')
  const [rewardFilter, setRewardFilter] = useState<string>('all')

  const userPoints = 12850

  const questTabs = [
    { id: 'daily' as const, label: t.rewardsDailyQuests, icon: Calendar },
    { id: 'social' as const, label: t.rewardsSocialMissions, icon: Users },
    { id: 'partner' as const, label: t.rewardsPartnerEvents, icon: Sparkles },
  ]

  const rewardFilters = [
    { id: 'all', label: t.rewardsAllRewards },
    { id: 'skins', label: t.rewardsSkins },
    { id: 'items', label: t.rewardsItems },
    { id: 'currency', label: t.rewardsCurrency },
    { id: 'exclusive', label: t.rewardsExclusive },
  ]

  const activeQuests = useMemo(() => {
    switch (questTab) {
      case 'daily':
        return mockDailyQuests
      case 'social':
        return mockSocialMissions
      case 'partner':
        return mockPartnerEvents
      default:
        return []
    }
  }, [questTab])

  const filteredRewards = useMemo(() => {
    if (rewardFilter === 'all') return mockRewards
    return mockRewards.filter(r => r.category === rewardFilter)
  }, [rewardFilter])

  return (
    <div className="overflow-x-hidden">
      {/* Header - No sticky */}
      <div className="px-4 py-3 lg:px-6 lg:py-4 border-b border-[#2d333b] bg-[#0a0e17]">
        <div className="flex items-center gap-3">
          <Gift className="w-5 h-5 lg:w-5 lg:h-5 text-[#ff6b35]" />
          <h1 className="text-base lg:text-lg font-bold">{t.rewardsTitle}</h1>
          <div className="ml-auto flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-[#ff6b35]/20 to-[#f7931e]/20 border border-[#ff6b35]/30 rounded-full">
            <Star className="w-4 h-4 text-[#ff6b35]" />
            <span className="text-sm font-bold text-white">{userPoints.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* User Stats Dashboard */}
      <UserStats />

      {/* Quests Section */}
      <div className="bg-[#0a0e17] border-b border-[#2d333b]/50 px-4 py-6 lg:px-6 lg:py-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center justify-between mb-5 lg:mb-6">
            <h2 className="text-base lg:text-lg font-bold text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-[#ff6b35]" />
              {t.missions}
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="text-xs text-[#ff6b35] font-semibold flex items-center gap-1"
            >
              {t.rewardsViewAll}
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Quest Tabs */}
          <div className="relative mb-6">
            {/* Fade indicators for mobile scroll */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#0a0e17] to-transparent z-10 pointer-events-none md:hidden" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#0a0e17] to-transparent z-10 pointer-events-none md:hidden" />

            {/* Tabs container */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
              {questTabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <motion.button
                    key={tab.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setQuestTab(tab.id)}
                    className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap flex items-center gap-2 transition-all ${questTab === tab.id ? 'bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-black' : 'bg-[#1a1f2e]/50 text-[#9aa0a6] hover:text-white border border-[#2d333b]'}`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </motion.button>
                )
              })}
            </div>
          </div>

          {/* Quest Cards */}
          <motion.div
            key={questTab}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-3.5 lg:gap-5"
          >
            <AnimatePresence mode="wait">
              {activeQuests.map((quest, index) => (
                <motion.div
                  key={quest.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <QuestCard quest={quest} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Rewards Shop Section */}
      <div className="bg-[#0a0e17] px-4 py-6 lg:px-6 lg:py-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center justify-between mb-5 lg:mb-6">
            <h2 className="text-base lg:text-lg font-bold text-white flex items-center gap-2">
              <Gift className="w-5 h-5 text-[#ff6b35]" />
              {t.rewardsTab}
            </h2>
          </div>

          {/* Reward Filters */}
          <div className="relative mb-6">
            {/* Fade indicators for mobile scroll */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#0a0e17] to-transparent z-10 pointer-events-none md:hidden" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#0a0e17] to-transparent z-10 pointer-events-none md:hidden" />

            {/* Filters container */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
              {rewardFilters.map((filter) => (
                <motion.button
                  key={filter.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setRewardFilter(filter.id)}
                  className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${rewardFilter === filter.id ? 'bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-black' : 'bg-[#1a1f2e]/50 text-[#9aa0a6] hover:text-white border border-[#2d333b]'}`}
                >
                  {filter.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Reward Grid - 2 Column Layout */}
          <motion.div
            key={rewardFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-3.5 lg:gap-5"
          >
            <AnimatePresence mode="wait">
              {filteredRewards.map((reward, index) => (
                <motion.div
                  key={reward.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <RewardCard reward={reward} userPoints={userPoints} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
