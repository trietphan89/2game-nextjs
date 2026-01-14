'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Cloud, CheckCircle, Sparkles } from 'lucide-react'
import { useLanguage } from '@/app/layout'
import VideoBackground from '@/components/cloud/VideoBackground'
import CloudGameGrid from '@/components/cloud/CloudGameGrid'
import PlayButton from '@/components/cloud/PlayButton'
import { mockCloudGames } from '@/lib/mockCloudGames'

// ============================================================================
// HERO SECTION - Cinematic Video Background
// ============================================================================

function CinematicHero() {
  const { t } = useLanguage()

  return (
    <VideoBackground
      fallbackImage="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&h=1080&fit=crop&q=80"
      overlayOpacity={0.75}
      className="min-h-[70vh] lg:min-h-[80vh] flex items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center px-4 max-w-5xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 lg:px-4 py-1.5 lg:py-2 bg-white/5 backdrop-blur-md border border-[#ff6b35]/30 rounded-full mb-6 lg:mb-8"
        >
          <Sparkles className="w-3 h-3 lg:w-4 lg:h-4 text-[#ff6b35]" />
          <span className="text-xs lg:text-sm font-bold text-[#ff6b35] uppercase tracking-wider leading-none">
            {t.cloud?.noDownloads || 'No Downloads Required'}
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-4xl lg:text-6xl font-black text-white leading-tight mb-4 lg:mb-6"
          style={{
            textShadow: '0 4px 20px rgba(0,0,0,0.8), 0 0 40px rgba(255,107,53,0.3)',
          }}
        >
          Instant Play.
          <br />
          <span className="bg-gradient-to-r from-[#ff6b35] to-[#f7931e] bg-clip-text text-transparent">
            No Downloads.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-base lg:text-lg text-gray-300 max-w-3xl mx-auto mb-8 lg:mb-12"
        >
          {t.cloud?.heroSubtitle || 'Stream AAA games instantly on any device. No high-end PC required. Play anywhere, anytime.'}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center items-center mb-6 lg:mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-6 lg:px-8 py-2.5 lg:py-3 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] rounded-full text-white font-bold text-sm lg:text-base overflow-hidden shadow-2xl shadow-[#ff6b35]/40"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#f7931e] to-[#ff6b35] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center gap-2 leading-none">
              <PlayButton size="sm" variant="ghost" />
              {t.cloud?.playInBrowser || 'Start Playing Free'}
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 lg:px-8 py-2.5 lg:py-3 bg-white/5 backdrop-blur-md border-2 border-white/20 rounded-full text-white font-semibold text-sm lg:text-base hover:bg-white/10 hover:border-[#ff6b35]/50 transition-all"
          >
            {t.cloud?.startFreeTrial || 'Learn More'}
          </motion.button>
        </motion.div>

        {/* Features List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-wrap gap-6 lg:gap-8 justify-center text-xs lg:text-sm text-gray-400"
        >
          {[
            t.cloud?.noHighEndPC || 'No High-End PC Required',
            t.cloud?.worksOnMobile || 'Works on Mobile & Tablet',
            t.cloud?.ultraLowLatency || 'Ultra-Low Latency < 20ms',
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + i * 0.1 }}
              className="flex items-center gap-1.5 lg:gap-2"
            >
              <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 text-[#3fb950]" />
              <span className="leading-none">{feature}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </VideoBackground>
  )
}

// ============================================================================
// GAME LIBRARY - Cinematic Grid
// ============================================================================

function CinematicGameLibrary() {
  const { t } = useLanguage()
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const categories = [
    { id: 'all', label: t.cloud?.gameLibrary || 'All Games' },
    { id: 'newReleases', label: t.cloud?.categories?.newReleases || 'New Releases' },
    { id: 'topAAA', label: t.cloud?.categories?.topAAA || 'AAA Titles' },
    { id: 'freeToPlay', label: t.cloud?.categories?.freeToPlay || 'Free to Play' },
    { id: 'indieGems', label: t.cloud?.categories?.indieGems || 'Indie Gems' },
  ]

  const filteredGames =
    activeCategory === 'all'
      ? mockCloudGames
      : mockCloudGames.filter((g) => g.category === activeCategory)

  return (
    <section className="bg-[#0a0a0a] py-16 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-8 lg:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl lg:text-3xl font-bold text-white mb-2 lg:mb-4"
          >
            Game Library
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm lg:text-base text-gray-400"
          >
            Instant access to hundreds of games. Click and play.
          </motion.p>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 lg:gap-3 mb-8 lg:mb-10 overflow-x-auto pb-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#ff6b35]/30">
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveCategory(cat.id)}
              className={`
                px-4 lg:px-6 py-2 lg:py-2.5 rounded-full font-semibold whitespace-nowrap transition-all text-xs lg:text-sm
                ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-black shadow-lg shadow-[#ff6b35]/30'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10'
                }
              `}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>

        {/* Games Grid - 2 COLUMNS Gallery Layout */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <CloudGameGrid games={filteredGames} />
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// FINAL CTA SECTION
// ============================================================================

function FinalCTA() {
  const { t } = useLanguage()

  return (
    <section className="bg-gradient-to-b from-[#0a0a0a] via-[#1a1f2e] to-[#0a0a0a] py-12 lg:py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 lg:mb-6">
          Ready to Play?
        </h2>
        <p className="text-base lg:text-lg text-gray-400 mb-8 lg:mb-10 max-w-2xl mx-auto">
          Join thousands of gamers streaming with 2GAME Cloud. No downloads, no limits.
        </p>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-8 lg:px-10 py-2.5 lg:py-3 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-white font-bold text-sm lg:text-base rounded-full shadow-2xl shadow-[#ff6b35]/40"
        >
          Get Started Free
        </motion.button>

        {/* Trust Indicators */}
        <div className="mt-8 lg:mt-12 flex flex-wrap justify-center gap-6 lg:gap-8 text-xs lg:text-sm text-gray-500">
          <div className="flex items-center gap-1.5 lg:gap-2">
            <CheckCircle className="w-3 h-3 lg:w-4 lg:h-4 text-[#3fb950]" />
            <span className="leading-none">No Credit Card Required</span>
          </div>
          <div className="flex items-center gap-1.5 lg:gap-2">
            <CheckCircle className="w-3 h-3 lg:w-4 lg:h-4 text-[#3fb950]" />
            <span className="leading-none">Cancel Anytime</span>
          </div>
          <div className="flex items-center gap-1.5 lg:gap-2">
            <CheckCircle className="w-3 h-3 lg:w-4 lg:h-4 text-[#3fb950]" />
            <span className="leading-none">1000+ Games</span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function CloudGamingPage() {
  const { t } = useLanguage()

  return (
    <div className="bg-[#0a0a0a]">
      {/* Sticky Header */}
      <div className="px-4 py-2.5 lg:py-3 border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl sticky top-[57px] z-40">
        <div className="flex items-center gap-2 lg:gap-3 max-w-7xl mx-auto">
          <Cloud className="w-4 h-4 lg:w-5 lg:h-5 text-[#ff6b35]" />
          <h1 className="text-sm lg:text-base font-bold text-white leading-none">
            {t.cloudGamingTitle || 'Cloud Gaming'}
          </h1>
          <div className="ml-auto">
            <span className="px-2.5 lg:px-3 py-1 lg:py-1.5 bg-gradient-to-r from-[#ff6b35]/20 to-[#f7931e]/20 border border-[#ff6b35]/30 rounded-full text-[10px] lg:text-xs font-bold text-[#ff6b35] leading-none">
              POWERED BY 2GAME
            </span>
          </div>
        </div>
      </div>

      {/* Cinematic Hero */}
      <CinematicHero />

      {/* Game Library */}
      <CinematicGameLibrary />

      {/* Final CTA */}
      <FinalCTA />
    </div>
  )
}
