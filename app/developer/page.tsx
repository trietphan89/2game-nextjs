'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/app/layout'

type ViewType = 'vietnamese' | 'international'

export default function DeveloperCenterPage() {
  const { t } = useLanguage()
  const [view, setView] = useState<ViewType>('vietnamese')

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <>
      {/* Header */}
      <div className="px-4 py-3 lg:py-4 border-b border-[#2d333b] bg-[rgba(10,14,23,0.95)] backdrop-blur-xl sticky top-[57px] z-10">
        <div className="flex items-center gap-3">
          <Code className="w-5 h-5 lg:w-6 lg:h-6 text-[#ff6b35]" />
          <h1 className="text-base lg:text-xl font-semibold tracking-tight text-gray-100">{t.developerCenter}</h1>
        </div>
      </div>

      {/* Hero Section */}
      <div className="px-4 py-12 lg:py-16 border-b border-[#2d333b]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-5xl font-semibold tracking-tight text-gray-100">
              Bridging Game Innovation
            </h2>
            <p className="text-base lg:text-lg text-gray-300 font-normal max-w-xl mx-auto leading-relaxed">
              Connecting developers to global knowledge and local opportunities.
            </p>
          </div>

          {/* Segmented Control Toggle - Styled to match website theme */}
          <div className="flex justify-center pt-4">
            <div className="inline-flex items-center bg-[#151922] border border-[#2d333b] rounded-full p-1">
              <button
                onClick={() => setView('vietnamese')}
                className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  view === 'vietnamese'
                    ? 'text-white'
                    : 'text-[#9aa0a6] hover:text-[#e8eaed]'
                }`}
              >
                {view === 'vietnamese' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] rounded-full"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">Vietnamese Developers</span>
              </button>
              <button
                onClick={() => setView('international')}
                className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  view === 'international'
                    ? 'text-white'
                    : 'text-[#9aa0a6] hover:text-[#e8eaed]'
                }`}
              >
                {view === 'international' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] rounded-full"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">International Partners</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Content Views */}
      <div className="px-4 py-8 lg:py-12">
        <AnimatePresence mode="wait">
          {view === 'vietnamese' && (
            <motion.div
              key="vietnamese"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-6"
            >
              {/* Intro Text */}
              <motion.p
                variants={fadeIn}
                className="text-center text-gray-300 text-sm font-normal mb-8"
              >
                Empowering your growth journey with resources and infrastructure.
              </motion.p>

              <div className="space-y-4">
                {/* Knowledge Hub Card */}
                <motion.div variants={fadeIn}>
                  <GlassCard>
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <span className="inline-block px-3 py-1 bg-[#151922] border border-[#2d333b] rounded-full text-xs font-medium text-gray-400 tracking-wide">
                            KNOWLEDGE
                          </span>
                          <h3 className="text-xl lg:text-2xl font-medium tracking-tight text-gray-100">Accelerator Program</h3>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#151922] border border-[#2d333b] flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                          </svg>
                        </div>
                      </div>

                      <p className="text-gray-300 text-sm font-normal leading-relaxed">
                        A mentorship initiative designed to equip you with industry insights, funding strategies,
                        and publisher networking. Focus on your growth journey.
                      </p>

                      <div className="pt-2 space-y-2">
                        <Feature>Industry insights & education</Feature>
                        <Feature>Funding strategies</Feature>
                        <Feature>Publisher networking</Feature>
                        <Feature>Growth mentorship</Feature>
                      </div>

                      <a
                        href="https://accelerator.xsolla.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 text-sm text-[#ff6b35] hover:text-[#f7931e] transition-colors pt-2"
                      >
                        <span>Learn more</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" strokeWidth={1.5} />
                      </a>
                    </div>
                  </GlassCard>
                </motion.div>

                {/* Publisher Solutions Card */}
                <motion.div variants={fadeIn}>
                  <GlassCard>
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <span className="inline-block px-3 py-1 bg-[#151922] border border-[#2d333b] rounded-full text-xs font-medium text-gray-400 tracking-wide">
                            OPERATIONS
                          </span>
                          <h3 className="text-xl lg:text-2xl font-medium tracking-tight text-gray-100">Publisher Solutions</h3>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#151922] border border-[#2d333b] flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                          </svg>
                        </div>
                      </div>

                      <p className="text-gray-300 text-sm font-normal leading-relaxed">
                        Establish your commercial foundation. Operational tools designed to optimize resources
                        and streamline your game's monetization structure.
                      </p>

                      <div className="pt-2 space-y-2">
                        <Feature>Direct commerce infrastructure</Feature>
                        <Feature>Global payment integration</Feature>
                        <Feature>Revenue optimization tools</Feature>
                        <Feature>Analytics & insights</Feature>
                      </div>

                      <a
                        href="https://publisher.xsolla.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 text-sm text-[#ff6b35] hover:text-[#f7931e] transition-colors pt-2"
                      >
                        <span>Get started</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" strokeWidth={1.5} />
                      </a>
                    </div>
                  </GlassCard>
                </motion.div>
              </div>
            </motion.div>
          )}

          {view === 'international' && (
            <motion.div
              key="international"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-6"
            >
              {/* Intro Text */}
              <motion.p
                variants={fadeIn}
                className="text-center text-[#9aa0a6] text-sm font-light mb-8"
              >
                Simplifying market entry with comprehensive local support.
              </motion.p>

              <div className="space-y-4">
                {/* Market Access Card */}
                <motion.div variants={fadeIn}>
                  <GlassCard>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <span className="inline-block px-3 py-1 bg-[#151922] border border-[#2d333b] rounded-full text-xs font-medium text-[#9aa0a6] tracking-wide">
                          COMPLIANCE
                        </span>
                        <h3 className="text-xl font-light">Market Access</h3>
                      </div>

                      <p className="text-[#9aa0a6] text-sm font-light leading-relaxed">
                        Navigating local regulations can be complex. We provide the necessary framework
                        to launch your title in Vietnam with confidence.
                      </p>

                      <div className="pt-2 space-y-2">
                        <Feature>Licensing support</Feature>
                        <Feature>Regulatory guidance</Feature>
                        <Feature>Compliance framework</Feature>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>

                {/* Payment Accessibility Card */}
                <motion.div variants={fadeIn}>
                  <GlassCard>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <span className="inline-block px-3 py-1 bg-[#151922] border border-[#2d333b] rounded-full text-xs font-medium text-[#9aa0a6] tracking-wide">
                          PAYMENTS
                        </span>
                        <h3 className="text-xl font-light">Local Connectivity</h3>
                      </div>

                      <p className="text-[#9aa0a6] text-sm font-light leading-relaxed">
                        Seamlessly integrated with 5+ local payment methods, ensuring your players have
                        the most convenient way to support your game.
                      </p>

                      <div className="pt-2 space-y-2">
                        <Feature>Local payment integration</Feature>
                        <Feature>Currency support</Feature>
                        <Feature>Player convenience</Feature>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>

                {/* Distribution Card */}
                <motion.div variants={fadeIn}>
                  <GlassCard>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <span className="inline-block px-3 py-1 bg-[#151922] border border-[#2d333b] rounded-full text-xs font-medium text-[#9aa0a6] tracking-wide">
                          DISTRIBUTION
                        </span>
                        <h3 className="text-xl font-light">Wetaps Store</h3>
                      </div>

                      <p className="text-[#9aa0a6] text-sm font-light leading-relaxed">
                        A dedicated channel to reach the Vietnamese player base effectively.
                      </p>

                      <div className="pt-2 space-y-2">
                        <Feature>Store integration</Feature>
                        <Feature>Local audience reach</Feature>
                        <Feature>Distribution support</Feature>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>

                {/* Contact CTA */}
                <motion.div variants={fadeIn} className="pt-6">
                  <div className="text-center">
                    <button className="group inline-flex items-center gap-3 px-8 py-3 bg-[#151922] hover:bg-[#1c2128] border border-[#2d333b] hover:border-[#ff6b35] rounded-full transition-all duration-300">
                      <span className="text-sm font-medium">Contact Partnership Team</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" strokeWidth={1.5} />
                    </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer CTA */}
      <div className="px-4 py-8 border-t border-[#2d333b] bg-[#151922]">
        <div className="text-center space-y-4">
          <p className="text-sm text-[#9aa0a6] font-light">
            Questions? We're here to help.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <a href="#" className="text-[#9aa0a6] hover:text-[#ff6b35] transition-colors">
              Contact
            </a>
            <span className="text-[#2d333b]">•</span>
            <a href="#" className="text-[#9aa0a6] hover:text-[#ff6b35] transition-colors">
              Developer Login
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

// Glass Card Component - Adapted to website theme
function GlassCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="group relative">
      <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b35]/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative backdrop-blur-sm bg-[#151922]/80 border border-[#2d333b] rounded-xl p-6 hover:border-[#ff6b35]/50 transition-all duration-500">
        {children}
      </div>
    </div>
  )
}

// Feature Item Component
function Feature({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-1 h-1 rounded-full bg-[#ff6b35]" />
      <span className="text-xs text-gray-300 font-normal">{children}</span>
    </div>
  )
}
