'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Check, Plus, Smartphone, Monitor, Users } from 'lucide-react'
import { useLanguage } from './layout'
import { usePlatform } from '@/lib/contexts/PlatformContext'

export default function Home() {
  const [activeTab, setActiveTab] = useState('forYou')
  const { t } = useLanguage()
  const { platform } = usePlatform()

  // Memoize tabs to prevent recreating on every render
  const tabs = useMemo(() => [
    { id: 'forYou', label: t.tabs.forYou },
    { id: 'trending', label: t.tabs.trending },
    { id: 'new', label: t.tabs.newReleases },
    { id: 'freeToPlay', label: t.tabs.freeToPlay },
  ], [t])

  // All games with platform information
  const allGames = [
    {
      id: 'cyberpunk-2077',
      title: 'Cyberpunk 2077',
      platforms: ['pc'],
      tags: ['RPG', 'Open World', 'verified'],
      rating: '4.8/5',
      downloads: '2.5M players',
      description: 'Epic futuristic RPG with stunning graphics. Explore Night City in this immersive open-world adventure with multiple story paths.',
      price: '1.299.000₫',
      badge: 'AAA Title',
      gradient: 'from-purple-600 to-purple-800',
      image: 'https://upload.wikimedia.org/wikipedia/vi/9/9f/Cyberpunk_2077_box_art.jpg',
    },
    {
      id: 'valorant',
      title: 'Valorant',
      platforms: ['pc'],
      tags: ['FPS', 'Tactical', 'verified'],
      rating: '4.7/5',
      downloads: '15M players',
      description: 'Join millions in the ultimate 5v5 tactical shooter. Ranked matches, seasonal rewards, and exclusive agent skins available!',
      price: 'FREE',
      badge: 'Top Esports',
      gradient: 'from-blue-600 to-cyan-500',
      image: 'https://upload.wikimedia.org/wikipedia/en/b/ba/Valorant_cover.jpg',
      buttonText: 'Play Free',
    },
    {
      id: 'genshin-impact',
      title: 'Genshin Impact',
      platforms: ['android', 'ios', 'pc'],
      tags: ['Action RPG', 'Open World', 'verified'],
      rating: '4.9/5',
      downloads: '50M+ players',
      description: 'Step into Teyvat, a vast world teeming with life and flowing with elemental energy. Premium gacha system with Vietnamese payment support.',
      price: 'FREE',
      badge: 'Editor\'s Choice',
      gradient: 'from-amber-500 to-orange-600',
      image: 'https://image.api.playstation.com/vulcan/ap/rnd/202508/2602/30935168a0f21b6710dc2bd7bb37c23ed937fb9fa747d84c.png',
      buttonText: 'Play Free',
    },
    {
      id: 'black-myth-wukong',
      title: 'Black Myth: Wukong',
      platforms: ['pc'],
      tags: ['Action RPG', 'Souls-like', 'verified'],
      rating: '4.9/5',
      downloads: '1.2M players',
      description: 'Experience the epic Chinese mythology action RPG. Battle through stunning environments as the legendary Monkey King with incredible combat.',
      price: '1.199.000₫',
      badge: 'New AAA',
      gradient: 'from-slate-700 to-red-600',
      image: 'https://assets-prd.ignimgs.com/2024/08/18/blackmyth-1723969364570.jpg',
      buttonText: 'Buy Now',
    },
    {
      id: 'elden-ring',
      title: 'Elden Ring',
      platforms: ['pc'],
      tags: ['Action RPG', 'Open World', 'verified'],
      rating: '4.9/5',
      downloads: '850k players',
      description: 'Award-winning souls-like action RPG. Explore the Lands Between in this epic adventure from FromSoftware. GOTY Edition available.',
      price: '1.399.000₫',
      badge: 'GOTY Winner',
      gradient: 'from-pink-500 to-yellow-400',
      image: 'https://m.media-amazon.com/images/M/MV5BMWNlMDBiYzYtMWMyMC00Zjc5LTlhMjItMjRlMzBmYmVkOGM0XkEyXkFqcGc@._V1_QL75_UY281_CR4,0,190,281_.jpg',
    },
    {
      id: 'league-of-legends',
      title: 'League of Legends',
      platforms: ['pc'],
      tags: ['MOBA', 'Competitive', 'verified'],
      rating: '4.7/5',
      downloads: '8.5M players',
      description: 'Vietnam\'s #1 MOBA game. Free to play with seasonal battle passes and exclusive skins. Join the largest esports community!',
      price: 'FREE',
      badge: 'Top MOBA',
      gradient: 'from-fuchsia-600 to-red-500',
      image: 'https://i.imgur.com/I9JF3mh.jpeg',
      buttonText: 'Play Free',
    },
    {
      id: 'pubg-mobile',
      title: 'PUBG MOBILE',
      platforms: ['android', 'ios'],
      tags: ['Battle Royale', 'Mobile', 'verified'],
      rating: '4.5/5',
      downloads: '20M downloads',
      description: 'The original battle royale on mobile. 100-player matches, realistic graphics. Top-up UC with MoMo, ZaloPay, or bank transfer.',
      price: 'FREE',
      badge: 'Top Mobile',
      gradient: 'from-orange-600 to-yellow-500',
      image: 'https://m.media-amazon.com/images/M/MV5BODQzNzJjY2QtY2Y2YS00OWJmLTlkZWMtMmNmMmE2NTg1MjQzXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
      buttonText: 'Play Free',
    },
    {
      id: 'baldurs-gate-3',
      title: 'Baldur\'s Gate 3',
      platforms: ['pc'],
      tags: ['RPG', 'Turn-Based', 'verified'],
      rating: '4.9/5',
      downloads: '1.8M players',
      description: 'Hop aboard the Astral Express and experience epic D&D adventures. Stunning graphics and engaging story with multiplayer co-op.',
      price: '1.199.000₫',
      badge: 'GOTY 2023',
      gradient: 'from-indigo-600 to-purple-700',
      image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/header.jpg',
      buttonText: 'Buy Now',
    },
    {
      id: 'forza-horizon-5',
      title: 'Forza Horizon 5',
      platforms: ['pc'],
      tags: ['Racing', 'Open World', 'verified'],
      rating: '4.8/5',
      downloads: '6M players',
      description: 'The ultimate open-world racing experience. Drive legendary cars in Mexico. Stunning graphics with Vietnamese payment support.',
      price: '899.000₫',
      badge: 'Best Racing',
      gradient: 'from-red-600 to-pink-500',
      image: 'https://upload.wikimedia.org/wikipedia/en/8/86/Forza_Horizon_5_cover_art.jpg',
      buttonText: 'Buy Now',
    },
  ]

  // Filter games based on platform
  const filteredGames = useMemo(() => {
    if (platform === 'all') return allGames
    if (platform === 'mobile') {
      return allGames.filter(game =>
        game.platforms.includes('android') || game.platforms.includes('ios')
      )
    }
    if (platform === 'pc') {
      return allGames.filter(game => game.platforms.includes('pc'))
    }
    return allGames
  }, [platform, allGames])

  // Get platform stats
  const platformStats = useMemo(() => {
    return {
      mobile: allGames.filter(g =>
        g.platforms.includes('android') || g.platforms.includes('ios')
      ).length,
      pc: allGames.filter(g => g.platforms.includes('pc')).length,
      all: allGames.length,
    }
  }, [allGames])

  return (
    <>
      {/* Feed Header with Tabs */}
      <div className="section-padding border-b border-[#2d333b] bg-[rgba(10,14,23,0.95)] backdrop-blur-xl sticky top-[57px] z-10">
        <h1 className="heading-page mb-3 md:mb-4">{t.discoverGames}</h1>

        {/* Category Tabs */}
        <div className="flex gap-2 md:gap-3 lg:gap-4 border-b border-[#2d333b] overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                tab-text px-3 md:px-4 py-2 md:py-2.5 lg:py-3 border-b-2 transition-all whitespace-nowrap
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

      {/* Platform Info Banner */}
      {platform !== 'all' && (
        <div className="bg-[#1c2128] border-b border-[#2d333b] card-padding">
          <div className="flex items-center gap-2 text-body-secondary">
            {platform === 'mobile' && (
              <>
                <Smartphone className="w-4 h-4 text-[#3fb950]" />
                <span className="text-[#e8eaed]">
                  Showing <span className="font-bold text-[#ff6b35]">{filteredGames.length}</span> Mobile games
                </span>
                <span className="text-[#9aa0a6]">• Android & iOS compatible</span>
              </>
            )}
            {platform === 'pc' && (
              <>
                <svg className="w-4 h-4 text-[#58a6ff]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v2H8v2h8v-2h-2v-2h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H3V4h18v12z"/>
                </svg>
                <span className="text-[#e8eaed]">
                  Showing <span className="font-bold text-[#ff6b35]">{filteredGames.length}</span> PC games
                </span>
                <span className="text-[#9aa0a6]">• Windows, macOS & Linux</span>
              </>
            )}
          </div>
        </div>
      )}

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-br from-[#1a1f2e] to-[#0a0e17] border-b border-[#2d333b] section-padding overflow-hidden">
        {/* Glow Effect */}
        <div className="absolute -top-1/2 -right-1/5 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(255,107,53,0.15)_0%,transparent_70%)] rounded-full" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 md:gap-2 bg-[rgba(255,107,53,0.1)] border border-[rgba(255,107,53,0.3)] text-[#ff6b35] px-2 py-1 md:px-3 md:py-1.5 rounded-full text-caption md:text-meta font-semibold mb-3 md:mb-4">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#ff6b35] rounded-full animate-pulse" />
            <span>Vietnam's #1 Gaming Social Network</span>
          </div>
          <h2 className="hero-title mb-2">
            Connect. Create. Compete.
          </h2>
          <p className="hero-description mb-4 md:mb-6">
            Join 2.5M+ gamers sharing clips, guides, and epic moments. Discover games, build your community, and level up together.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 md:gap-3 lg:gap-4">
            <Link href="/community" className="bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-black btn-text-primary px-4 py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 rounded-full hover:translate-y-[-2px] transition-all shadow-[0_0_20px_rgba(255,107,53,0.3)] hover:shadow-[0_0_30px_rgba(255,107,53,0.5)] text-center">
              Join Community →
            </Link>
            <button className="bg-[#1c2128] text-[#e8eaed] btn-text-primary px-4 py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 rounded-full border border-[#2d333b] hover:bg-[#242b36] hover:border-[#444c56] transition-all">
              Explore Games
            </button>
          </div>
        </div>
      </div>

      {/* Game Cards */}
      {filteredGames.map((game, index) => (
        <article
          key={game.id}
          onClick={() => window.location.href = `/game/${game.id}/`}
          className="bg-[#151922] border-b border-[#2d333b] card-padding hover:bg-[#1c2128] transition-colors cursor-pointer"
        >
          <div className="flex gap-3 md:gap-4 mb-3 md:mb-4">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg md:rounded-xl overflow-hidden flex-shrink-0">
              {game.image ? (
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className={`w-full h-full bg-gradient-to-br ${game.gradient}`} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="heading-card mb-1 truncate">{game.title}</h3>
              <div className="flex gap-1.5 md:gap-2 flex-wrap text-meta mb-1">
                {game.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-caption md:text-meta px-2 py-0.5 md:px-2.5 md:py-1 rounded-lg border ${
                      tag === 'verified'
                        ? 'bg-[rgba(59,185,80,0.1)] border-[#3fb950] text-[#3fb950]'
                        : 'bg-[#1c2128] border-[#2d333b]'
                    }`}
                  >
                    {tag === 'verified' ? '✓ Verified' : tag}
                  </span>
                ))}
                {/* Platform badges */}
                <span className="text-caption md:text-meta px-2 py-0.5 md:px-2.5 md:py-1 rounded-lg border bg-[#1c2128] border-[#2d333b] flex items-center gap-1">
                  {game.platforms.map((p, i) => (
                    <span key={p}>
                      {p === 'android' && <Smartphone className="w-3 h-3 text-[#3fb950]" />}
                      {p === 'ios' && (
                        <svg className="w-3 h-3 text-[#58a6ff]" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                        </svg>
                      )}
                      {p === 'pc' && <Monitor className="w-3 h-3 text-[#9aa0a6]" />}
                    </span>
                  ))}
                </span>
              </div>
              <div className="flex items-center gap-2 md:gap-4 mt-1 text-meta">
                <span>⭐ {game.rating}</span>
                <span>•</span>
                <span className="truncate">{game.downloads}</span>
              </div>
            </div>
          </div>

          <p className="text-body-secondary leading-relaxed mb-3 md:mb-4 line-clamp-2">
            {game.description}
          </p>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="flex gap-2 w-full sm:w-auto">
              <button className="bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-black btn-text-primary px-4 py-2 rounded-full hover:translate-y-[-1px] transition-all shadow-[0_4px_12px_rgba(255,107,53,0.3)] flex-1 sm:flex-initial">
                {game.buttonText || `Buy ${game.price}`}
              </button>
              <button className="bg-[#1c2128] border border-[#2d333b] btn-text-secondary px-3 py-2 rounded-full hover:border-[#ff6b35] hover:text-[#ff6b35] transition-all whitespace-nowrap">
                + Wishlist
              </button>
            </div>
            <div className="flex items-center gap-3 sm:flex-col sm:items-end w-full sm:w-auto justify-between sm:justify-start">
              <span className="number-medium">{game.price}</span>
              <span className="text-caption text-[#3fb950] bg-[rgba(59,185,80,0.1)] px-2 py-0.5 rounded-lg">
                {game.badge}
              </span>
            </div>
          </div>
        </article>
      ))}

      {/* No games found */}
      {filteredGames.length === 0 && (
        <div className="bg-[#151922] border-b border-[#2d333b] px-4 py-12 text-center">
          <div className="text-[#9aa0a6] mb-2">
            No {platform === 'mobile' ? 'mobile' : 'PC'} games available at the moment
          </div>
          <button
            onClick={() => {}}
            className="text-[#ff6b35] hover:underline text-sm"
          >
            View all games
          </button>
        </div>
      )}

      {/* Community Highlights Banner */}
      <div className="bg-gradient-to-br from-[#1c2128] to-[#151922] border-b border-[#2d333b] px-4 py-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff6b35] to-[#f7931e] flex items-center justify-center">
            <Users className="w-5 h-5 text-black" />
          </div>
          <div>
            <div className="text-base font-bold mb-0.5">Gaming Social Platform</div>
            <div className="text-sm text-[#9aa0a6]">Where Vietnamese Gamers Connect</div>
          </div>
        </div>
        <p className="text-sm text-[#9aa0a6] mb-4 leading-relaxed">
          Share your epic moments, discover pro guides, join tournaments, and connect with 2.5M+ gamers. Create content, build your following, and earn rewards!
        </p>
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-[#151922] border border-[#2d333b] rounded-xl p-3 text-center">
            <div className="text-lg font-bold text-[#ff6b35] mb-1">150K+</div>
            <div className="text-xs text-[#9aa0a6]">Daily Posts</div>
          </div>
          <div className="bg-[#151922] border border-[#2d333b] rounded-xl p-3 text-center">
            <div className="text-lg font-bold text-[#3fb950] mb-1">10K+</div>
            <div className="text-xs text-[#9aa0a6]">Creators</div>
          </div>
          <div className="bg-[#151922] border border-[#2d333b] rounded-xl p-3 text-center">
            <div className="text-lg font-bold text-[#58a6ff] mb-1">500+</div>
            <div className="text-xs text-[#9aa0a6]">Events/Month</div>
          </div>
        </div>
        <div className="flex gap-3">
          <Link href="/community" className="bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-black px-6 py-3 rounded-3xl font-semibold text-sm hover:translate-y-[-2px] transition-all shadow-[0_0_20px_rgba(255,107,53,0.3)] text-center flex-1">
            Join Community
          </Link>
          <Link href="/creator" className="bg-[#1c2128] text-[#e8eaed] px-6 py-3 rounded-3xl font-semibold text-sm border border-[#2d333b] hover:bg-[#242b36] transition-all text-center flex-1">
            Become Creator
          </Link>
        </div>
      </div>

      {/* Load More */}
      <div className="flex justify-center py-8">
        <button className="flex items-center gap-2 bg-[#1c2128] border border-[#2d333b] px-6 py-3 rounded-3xl font-semibold hover:border-[#ff6b35] hover:text-[#ff6b35] transition-all">
          <Plus className="w-5 h-5" />
          <span>Load More Games</span>
        </button>
      </div>
    </>
  )
}
