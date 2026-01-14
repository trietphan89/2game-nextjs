'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Sparkles, TrendingUp, DollarSign, Users, BarChart3,
  Gamepad2, Star, Filter, ArrowUpRight, Check, Zap,
  ShoppingBag, Link2, Eye, Target, Award, Wallet,
  Settings, Copy, ExternalLink, Calendar, Trophy,
  Gift, MessageCircle, Share2, Globe, Percent, MapPin
} from 'lucide-react'
import CreatorFilters from '@/components/CreatorFilters'
import { useLanguage } from '@/app/layout'

type DashboardTab = 'profile' | 'campaigns' | 'storefront' | 'wallet'

export default function CreatorCenterPage() {
  const { t } = useLanguage()
  // Mock auth state - in production, use AuthContext
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [activeDashboardTab, setActiveDashboardTab] = useState<DashboardTab>('profile')

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.12
      }
    }
  }

  return (
    <>
      {/* Header */}
      <div className="px-4 py-3 lg:py-4 border-b border-[#2d333b] bg-[rgba(10,14,23,0.95)] backdrop-blur-xl sticky top-[57px] z-10">
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 h-5 lg:w-6 lg:h-6 text-[#ff6b35]" />
          <h1 className="text-base lg:text-xl font-semibold tracking-tight text-gray-100">{t.creatorCenterTitle}</h1>
        </div>
      </div>

      {/* ===== PHẦN 1: HERO & VALUE PROPOSITION ===== */}
      <div className="px-4 py-12 lg:py-20 border-b border-[#2d333b] relative overflow-hidden">
        {/* Background decoration */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.08, 0.05] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-br from-[#ff6b35] to-[#f7931e] pointer-events-none"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center space-y-8 relative z-10"
        >
          {/* Headline - Dual Purpose */}
          <div className="space-y-4">
            <h2
              className="text-3xl lg:text-5xl font-semibold tracking-tight text-gray-100 leading-tight"
              dangerouslySetInnerHTML={{ __html: t.creator.heroTitle }}
            />
            <p
              className="text-base lg:text-lg text-gray-300 font-normal max-w-2xl mx-auto leading-relaxed"
              dangerouslySetInnerHTML={{ __html: t.creator.heroDesc }}
            />
          </div>

          {/* Quick Stats for Credibility */}
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-12 pt-4">
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-semibold text-[#ff6b35]">2,500+</div>
              <div className="text-sm text-gray-400">{t.creator.activeCreators}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-semibold text-[#ff6b35]">50%</div>
              <div className="text-sm text-gray-400">{t.creator.maxRevenueShare}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-semibold text-[#ff6b35]">15M₫+</div>
              <div className="text-sm text-gray-400">{t.creator.avgCommission}</div>
            </div>
          </div>

          {/* CTA Button */}
          {!isLoggedIn && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="pt-6"
            >
              <button
                onClick={() => setIsLoggedIn(true)}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] hover:from-[#ff6b35]/90 hover:to-[#f7931e]/90 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(255,107,53,0.4)]"
              >
                <span className="text-base font-semibold text-white">{t.creator.joinCreatorNetwork}</span>
                <ArrowUpRight className="w-5 h-5 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" strokeWidth={2} />
              </button>
              <p className="text-xs text-gray-400 mt-3">{t.creator.freeSignup}</p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* ===== PHẦN 2: ENHANCED DASHBOARD (Post-Login Only) ===== */}
      {isLoggedIn && (
        <div className="px-4 py-12 lg:py-16 border-b border-[#2d333b]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            {/* Dashboard Header */}
            <div className="text-center space-y-3">
              <h2 className="text-2xl lg:text-4xl font-semibold tracking-tight text-gray-100">
                {t.creator.yourDashboard}
              </h2>
              <p className="text-sm lg:text-base text-gray-300 font-normal max-w-2xl mx-auto">
                {t.creator.dashboardDesc}
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex justify-center overflow-x-auto">
              <div className="inline-flex items-center bg-[#151922] border border-[#2d333b] rounded-full p-1 min-w-max">
                {[
                  { key: 'profile' as DashboardTab, label: t.creator.myProfile, icon: Users },
                  { key: 'campaigns' as DashboardTab, label: t.creator.myCampaigns, icon: Target },
                  { key: 'storefront' as DashboardTab, label: t.creator.myStorefront, icon: ShoppingBag },
                  { key: 'wallet' as DashboardTab, label: t.creator.walletPayouts, icon: Wallet },
                ].map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActiveDashboardTab(tab.key)}
                      className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                        activeDashboardTab === tab.key
                          ? 'text-white'
                          : 'text-gray-300 hover:text-gray-100'
                      }`}
                    >
                      {activeDashboardTab === tab.key && (
                        <motion.div
                          layoutId="activeDashboardTab"
                          className="absolute inset-0 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] rounded-full"
                          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <Icon className="w-4 h-4 relative z-10" strokeWidth={2} />
                      <span className="relative z-10">{tab.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Tab Content */}
            <div className="min-h-[500px]">
              {/* TAB 1: MY PROFILE */}
              {activeDashboardTab === 'profile' && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  {/* Profile Card */}
                  <div className="bg-[#151922] border border-[#2d333b] rounded-xl p-6 lg:p-8">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Avatar Section */}
                      <div className="flex flex-col items-center lg:items-start gap-4">
                        <div className="relative group">
                          <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-[#ff6b35]">
                            <img
                              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop"
                              alt="Creator Avatar"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#0a0e17] border-2 border-[#2d333b] rounded-full flex items-center justify-center hover:bg-[#151922] transition-colors">
                            <Settings className="w-4 h-4 text-gray-300" strokeWidth={2} />
                          </button>
                        </div>
                        <button className="px-4 py-2 bg-[#0a0e17] border border-[#2d333b] rounded-lg text-sm font-medium text-gray-300 hover:border-[#ff6b35] hover:text-gray-100 transition-all">
                          {t.creator.changeAvatar}
                        </button>
                      </div>

                      {/* Profile Info */}
                      <div className="flex-1 space-y-4">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                          <div>
                            <h3 className="text-2xl font-semibold tracking-tight text-gray-100">Vietnamese Creator</h3>
                            <p className="text-sm text-gray-400">@vietnamesecreator • {t.creator.joinedFrom} 1/2025</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Trophy className="w-5 h-5 text-[#ff6b35]" strokeWidth={2} />
                            <div>
                              <div className="text-sm font-medium text-gray-100">{t.creator.creatorLevel} 3</div>
                              <div className="text-xs text-gray-400">Rising Star</div>
                            </div>
                          </div>
                        </div>

                        {/* Creator Tier Badge - NEW */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#ff6b35]/10 to-[#f7931e]/10 border border-[#ff6b35]/30 rounded-full flex-wrap">
                          <Award className="w-4 h-4 text-[#ff6b35] flex-shrink-0" strokeWidth={2} />
                          <span className="text-sm font-medium text-[#ff6b35]">{t.creator.tier}: {t.creator.risingStarLv3}</span>
                          <span className="text-xs text-gray-400 hidden sm:inline">• 850/1000 XP {t.creator.xpToNextLevel}</span>
                        </div>

                        {/* Bio */}
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-gray-100">{t.creator.bio}</h4>
                          <p className="text-sm text-gray-300 font-normal leading-relaxed">
                            Gaming content creator chuyên về Battle Royale và MOBA. Yêu thích chia sẻ gameplay,
                            tips & tricks với cộng đồng game thủ Việt Nam.
                          </p>
                          <button className="text-sm text-[#ff6b35] hover:text-[#f7931e] font-medium flex items-center gap-1">
                            <span>{t.creator.editBio}</span>
                            <ArrowUpRight className="w-3 h-3" strokeWidth={2} />
                          </button>
                        </div>

                        {/* Social Links */}
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-gray-100">{t.creator.socialChannels}</h4>
                          <div className="flex flex-wrap gap-2">
                            <a href="#" className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0a0e17] border border-[#2d333b] rounded-lg text-xs font-medium text-gray-300 hover:border-[#ff6b35] hover:text-gray-100 transition-all">
                              <MessageCircle className="w-3.5 h-3.5" strokeWidth={2} />
                              <span>YouTube: 12.5K subs</span>
                              <ExternalLink className="w-3 h-3" strokeWidth={2} />
                            </a>
                            <a href="#" className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0a0e17] border border-[#2d333b] rounded-lg text-xs font-medium text-gray-300 hover:border-[#ff6b35] hover:text-gray-100 transition-all">
                              <Share2 className="w-3.5 h-3.5" strokeWidth={2} />
                              <span>TikTok: 45K followers</span>
                              <ExternalLink className="w-3 h-3" strokeWidth={2} />
                            </a>
                            <button className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#0a0e17] border border-[#2d333b] border-dashed rounded-lg text-xs font-medium text-gray-400 hover:border-[#ff6b35] hover:text-gray-300 transition-all">
                              <span>{t.creator.addNewChannel}</span>
                            </button>
                          </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-[#2d333b]">
                          <div className="text-center sm:text-left">
                            <div className="text-xl sm:text-2xl font-semibold text-gray-100">24</div>
                            <div className="text-[10px] sm:text-xs text-gray-400 leading-tight">{t.creator.campaignsJoined}</div>
                          </div>
                          <div className="text-center sm:text-left">
                            <div className="text-xl sm:text-2xl font-semibold text-gray-100">850</div>
                            <div className="text-[10px] sm:text-xs text-gray-400 leading-tight">{t.creator.totalConversions}</div>
                          </div>
                          <div className="text-center sm:text-left">
                            <div className="text-xl sm:text-2xl font-semibold text-[#3fb950]">12.5M₫</div>
                            <div className="text-[10px] sm:text-xs text-gray-400 leading-tight">{t.creator.earningsThisMonth}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Level Progress */}
                  <div className="bg-[#151922] border border-[#2d333b] rounded-xl p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-100">{t.creator.levelUpProgress}</h4>
                        <span className="text-xs text-gray-400">850/1000 XP (85%)</span>
                      </div>
                      <div className="relative h-2 bg-[#0a0e17] rounded-full overflow-hidden">
                        <motion.div
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#ff6b35] to-[#f7931e]"
                          initial={{ width: 0 }}
                          animate={{ width: '85%' }}
                          transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                        />
                      </div>
                      <p className="text-xs text-gray-400">
                        {t.creator.xpRemainingFull.replace('{xp}', '150')}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 2: MY CAMPAIGNS */}
              {activeDashboardTab === 'campaigns' && (
                <motion.div
                  key="campaigns"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  {/* Active Campaigns Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight text-gray-100">Chiến Dịch Đang Hoạt Động</h3>
                      <p className="text-sm text-gray-400">Bạn đang tham gia 5 campaigns</p>
                    </div>
                    <button className="px-4 py-2 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity whitespace-nowrap">
                      Tìm Campaign Mới
                    </button>
                  </div>

                  {/* Campaign Performance Cards */}
                  <div className="space-y-4">
                    {[
                      {
                        game: 'PUBG Mobile',
                        status: 'active',
                        commission: '10%',
                        type: 'Revenue Share',
                        clicks: '2,450',
                        conversions: '245',
                        revenue: '12.5M₫',
                        earned: '1.25M₫',
                        trackingLink: 'https://2game.vn/ref/vnc-pubg-2025',
                        img: 'https://m.media-amazon.com/images/M/MV5BODQzNzJjY2QtY2Y2YS00OWJmLTlkZWMtMmNmMmE2NTg1MjQzXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
                      },
                      {
                        game: 'Cyberpunk 2077',
                        status: 'active',
                        commission: '50%',
                        type: 'Revenue Share',
                        clicks: '850',
                        conversions: '42',
                        revenue: '8.4M₫',
                        earned: '4.2M₫',
                        trackingLink: 'https://2game.vn/ref/vnc-cyber-2025',
                        img: 'https://upload.wikimedia.org/wikipedia/vi/9/9f/Cyberpunk_2077_box_art.jpg',
                      },
                      {
                        game: 'Forza Horizon 5',
                        status: 'active',
                        commission: '2.500₫',
                        type: 'CPA',
                        clicks: '1,200',
                        conversions: '180',
                        revenue: 'N/A',
                        earned: '450K₫',
                        trackingLink: 'https://2game.vn/ref/vnc-racing-2025',
                        img: 'https://upload.wikimedia.org/wikipedia/en/8/86/Forza_Horizon_5_cover_art.jpg',
                      },
                    ].map((campaign, idx) => (
                      <div key={idx} className="bg-[#151922] border border-[#2d333b] rounded-xl p-5 hover:border-[#ff6b35]/50 transition-all duration-300">
                        <div className="space-y-4">
                          {/* Campaign Header */}
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3 flex-1">
                              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                <img src={campaign.img} alt={campaign.game} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-2 flex-wrap">
                                  <h4 className="text-lg font-medium tracking-tight text-gray-100">{campaign.game}</h4>
                                  <span className="px-2 py-0.5 bg-[#3fb950]/10 border border-[#3fb950]/30 text-[#3fb950] text-[10px] font-semibold rounded-full uppercase">
                                    Active
                                  </span>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-gray-400">
                                  <span>{campaign.type}</span>
                                  <span>•</span>
                                  <span className="text-[#ff6b35] font-medium">{campaign.commission} commission</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Performance Metrics */}
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
                            <div className="bg-[#0a0e17] border border-[#2d333b] rounded-lg p-2 sm:p-3">
                              <div className="text-xs text-gray-400 mb-1">Clicks</div>
                              <div className="text-base sm:text-lg font-semibold text-gray-100">{campaign.clicks}</div>
                            </div>
                            <div className="bg-[#0a0e17] border border-[#2d333b] rounded-lg p-2 sm:p-3">
                              <div className="text-xs text-gray-400 mb-1">Conversions</div>
                              <div className="text-base sm:text-lg font-semibold text-gray-100">{campaign.conversions}</div>
                            </div>
                            <div className="bg-[#0a0e17] border border-[#2d333b] rounded-lg p-2 sm:p-3">
                              <div className="text-xs text-gray-400 mb-1">Revenue</div>
                              <div className="text-base sm:text-lg font-semibold text-gray-100">{campaign.revenue}</div>
                            </div>
                            <div className="bg-[#0a0e17] border border-[#2d333b] rounded-lg p-2 sm:p-3">
                              <div className="text-xs text-gray-400 mb-1">Bạn Kiếm Được</div>
                              <div className="text-base sm:text-lg font-semibold text-[#3fb950]">{campaign.earned}</div>
                            </div>
                          </div>

                          {/* Tracking Link */}
                          <div className="space-y-2 pt-2 border-t border-[#2d333b]">
                            <div className="text-xs text-gray-400">Tracking Link Của Bạn</div>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 min-w-0 bg-[#0a0e17] border border-[#2d333b] rounded-lg px-3 py-2 text-xs text-gray-300 font-mono break-all sm:truncate">
                                {campaign.trackingLink}
                              </div>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <button className="px-3 py-2 bg-[#0a0e17] border border-[#2d333b] rounded-lg hover:border-[#ff6b35] transition-colors">
                                  <Copy className="w-4 h-4 text-gray-300" strokeWidth={2} />
                                </button>
                                <button className="px-3 py-2 bg-[#0a0e17] border border-[#2d333b] rounded-lg hover:border-[#ff6b35] transition-colors">
                                  <ExternalLink className="w-4 h-4 text-gray-300" strokeWidth={2} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Campaign Tips */}
                  <div className="bg-gradient-to-r from-[#ff6b35]/10 to-[#f7931e]/10 border border-[#ff6b35]/30 rounded-xl p-5">
                    <div className="flex items-start gap-3">
                      <Zap className="w-5 h-5 text-[#ff6b35] flex-shrink-0 mt-0.5" strokeWidth={2} />
                      <div className="space-y-1">
                        <h4 className="text-sm font-medium text-gray-100">Mẹo Tăng Conversion</h4>
                        <p className="text-xs text-gray-300">
                          Chia sẻ tracking link trong video description, livestream chat và social media posts để tối đa hóa clicks.
                          Sử dụng custom thumbnail và clear CTA để tăng conversion rate.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 3: MY STOREFRONT */}
              {activeDashboardTab === 'storefront' && (
                <motion.div
                  key="storefront"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  {/* Storefront Header */}
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight text-gray-100">Cửa Hàng Của Bạn</h3>
                      <p className="text-sm text-gray-400">Tùy chỉnh shop game của bạn trên 2Game</p>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <button className="px-4 py-2 bg-[#0a0e17] border border-[#2d333b] rounded-lg text-sm font-medium text-gray-300 hover:border-[#ff6b35] hover:text-gray-100 transition-all flex items-center gap-2">
                        <Eye className="w-4 h-4" strokeWidth={2} />
                        <span className="hidden sm:inline">Preview Shop</span>
                        <span className="sm:hidden">Preview</span>
                      </button>
                      <button className="px-4 py-2 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity whitespace-nowrap">
                        Publish Changes
                      </button>
                    </div>
                  </div>

                  {/* Storefront Link */}
                  <div className="bg-[#151922] border border-[#2d333b] rounded-xl p-5">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-[#ff6b35]" strokeWidth={2} />
                        <h4 className="text-sm font-medium text-gray-100">Link Cửa Hàng Của Bạn</h4>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                        <div className="flex-1 min-w-0 bg-[#0a0e17] border border-[#2d333b] rounded-lg px-3 sm:px-4 py-3 text-xs sm:text-sm text-gray-100 font-mono break-all sm:truncate">
                          https://2game.vn/shop/vietnamesecreator
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button className="px-3 sm:px-4 py-3 bg-[#0a0e17] border border-[#2d333b] rounded-lg hover:border-[#ff6b35] transition-colors">
                            <Copy className="w-4 h-4 text-gray-300" strokeWidth={2} />
                          </button>
                          <button className="px-3 sm:px-4 py-3 bg-[#0a0e17] border border-[#2d333b] rounded-lg hover:border-[#ff6b35] transition-colors">
                            <ExternalLink className="w-4 h-4 text-gray-300" strokeWidth={2} />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400">Chia sẻ link này với cộng đồng của bạn để họ mua game trực tiếp từ shop của bạn.</p>
                    </div>
                  </div>

                  {/* Storefront Customization */}
                  <div className="bg-[#151922] border border-[#2d333b] rounded-xl p-4 sm:p-6">
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-medium text-gray-100 mb-3">Tùy Chỉnh Giao Diện</h4>
                        <div className="space-y-3">
                          <div>
                            <label className="text-xs text-gray-400 mb-1 block">Banner Shop (1200x400px)</label>
                            <div className="relative h-32 bg-[#0a0e17] border border-[#2d333b] rounded-lg overflow-hidden hover:border-[#ff6b35] transition-colors cursor-pointer group">
                              <img
                                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=400&fit=crop&q=80"
                                alt="Shop Banner"
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <div className="text-center px-4">
                                  <Settings className="w-6 h-6 text-white mx-auto mb-2" strokeWidth={1.5} />
                                  <p className="text-xs text-white">Click để thay đổi banner</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <label className="text-xs text-gray-400 mb-1 block">Mô Tả Shop (hiển thị trên top)</label>
                            <textarea
                              className="w-full bg-[#0a0e17] border border-[#2d333b] rounded-lg px-3 py-2 text-sm text-gray-100 placeholder:text-gray-500 focus:outline-none focus:border-[#ff6b35] transition-colors resize-none"
                              rows={3}
                              placeholder="Ví dụ: Chào mừng đến shop game của Vietnamese Creator! Tìm game deals tốt nhất và hỗ trợ kênh của mình 🎮"
                              defaultValue="Chào mừng đến shop game của Vietnamese Creator! Tìm game deals tốt nhất và hỗ trợ kênh của mình 🎮"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-[#2d333b]">
                        <h4 className="text-sm font-medium text-gray-100 mb-3">Games Đang Bán (8 games)</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                          {[
                            { name: 'PUBG Mobile', price: '149.000₫', sales: 45, img: 'https://m.media-amazon.com/images/M/MV5BODQzNzJjY2QtY2Y2YS00OWJmLTlkZWMtMmNmMmE2NTg1MjQzXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },
                            { name: 'Cyberpunk 2077', price: '299.000₫', sales: 12, img: 'https://upload.wikimedia.org/wikipedia/vi/9/9f/Cyberpunk_2077_box_art.jpg' },
                            { name: 'Valorant', price: '99.000₫', sales: 28, img: 'https://upload.wikimedia.org/wikipedia/en/b/ba/Valorant_cover.jpg' },
                            { name: 'Elden Ring', price: '199.000₫', sales: 35, img: 'https://m.media-amazon.com/images/M/MV5BMWNlMDBiYzYtMWMyMC00Zjc5LTlhMjItMjRlMzBmYmVkOGM0XkEyXkFqcGc@._V1_QL75_UY281_CR4,0,190,281_.jpg' },
                          ].map((game, idx) => (
                            <div key={idx} className="bg-[#0a0e17] border border-[#2d333b] rounded-lg p-3 hover:border-[#ff6b35]/50 transition-all w-full">
                              <div className="aspect-square bg-gradient-to-br from-[#ff6b35]/20 to-[#f7931e]/20 rounded-lg mb-2 overflow-hidden">
                                <img src={game.img} alt={game.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="text-xs font-medium text-gray-100 truncate break-words">{game.name}</div>
                              <div className="text-xs text-gray-400">{game.price}</div>
                              <div className="text-[10px] text-[#3fb950] mt-1">{game.sales} sales</div>
                            </div>
                          ))}
                        </div>
                        <button className="w-full mt-3 px-4 py-2.5 bg-[#0a0e17] border border-[#2d333b] border-dashed rounded-lg text-sm font-medium text-gray-400 hover:border-[#ff6b35] hover:text-gray-300 transition-all min-h-[44px]">
                          + Thêm Game Mới Vào Shop
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 4: WALLET & PAYOUTS */}
              {activeDashboardTab === 'wallet' && (
                <motion.div
                  key="wallet"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  {/* Wallet Overview */}
                  <div className="bg-gradient-to-br from-[#ff6b35] to-[#f7931e] rounded-xl p-5 sm:p-6 text-white">
                    <div className="flex items-center gap-3 mb-6">
                      <Wallet className="w-6 h-6 flex-shrink-0" strokeWidth={2} />
                      <div>
                        <div className="text-sm opacity-90">Tổng Thu Nhập</div>
                        <div className="text-2xl sm:text-3xl font-semibold">42.750.000₫</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 sm:gap-4">
                      <div className="text-center sm:text-left">
                        <div className="text-[10px] sm:text-xs opacity-75 mb-1">Pending</div>
                        <div className="text-base sm:text-xl font-semibold">12.5M₫</div>
                      </div>
                      <div className="text-center sm:text-left">
                        <div className="text-[10px] sm:text-xs opacity-75 mb-1 leading-tight">Sẵn Sàng Rút</div>
                        <div className="text-base sm:text-xl font-semibold">8.2M₫</div>
                      </div>
                      <div className="text-center sm:text-left">
                        <div className="text-[10px] sm:text-xs opacity-75 mb-1">Đã Rút</div>
                        <div className="text-base sm:text-xl font-semibold">22.05M₫</div>
                      </div>
                    </div>
                    <button className="w-full mt-6 px-4 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition-colors min-h-[44px]">
                      Yêu Cầu Rút Tiền (8.2M₫)
                    </button>
                  </div>

                  {/* Earnings Breakdown */}
                  <div className="bg-[#151922] border border-[#2d333b] rounded-xl p-6">
                    <h4 className="text-sm font-medium text-gray-100 mb-4">Nguồn Thu Nhập (Tháng Này)</h4>
                    <div className="space-y-3">
                      {[
                        { source: 'Revenue Share (PUBG Mobile)', amount: '4.2M₫', percentage: 34, color: 'from-orange-500 to-yellow-500' },
                        { source: 'Revenue Share (Cyber Realm)', amount: '3.8M₫', percentage: 30, color: 'from-cyan-500 to-purple-600' },
                        { source: 'CPA Campaigns', amount: '2.5M₫', percentage: 20, color: 'from-red-500 to-pink-500' },
                        { source: 'Storefront Sales', amount: '2.0M₫', percentage: 16, color: 'from-emerald-500 to-teal-600' },
                      ].map((item, idx) => (
                        <div key={idx}>
                          <div className="flex items-center justify-between text-sm mb-2 gap-2">
                            <span className="text-gray-300 text-xs sm:text-sm truncate">{item.source}</span>
                            <span className="text-gray-100 font-medium flex-shrink-0">{item.amount}</span>
                          </div>
                          <div className="h-1.5 bg-[#0a0e17] rounded-full overflow-hidden">
                            <div
                              className={`h-full bg-gradient-to-r ${item.color}`}
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Payout History */}
                  <div className="bg-[#151922] border border-[#2d333b] rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-medium text-gray-100">Lịch Sử Rút Tiền</h4>
                      <button className="text-xs text-[#ff6b35] hover:text-[#f7931e] font-medium">Xem tất cả</button>
                    </div>
                    <div className="space-y-3">
                      {[
                        { date: '15/01/2025', amount: '15.5M₫', method: 'MoMo', status: 'completed', txId: '#TX2025011501' },
                        { date: '01/01/2025', amount: '6.55M₫', method: 'Bank Transfer', status: 'completed', txId: '#TX2025010101' },
                        { date: '15/12/2024', amount: '8.2M₫', method: 'MoMo', status: 'completed', txId: '#TX2024121501' },
                      ].map((payout, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 bg-[#0a0e17] border border-[#2d333b] rounded-lg">
                          <div className="flex items-center gap-3 min-w-0">
                            <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" strokeWidth={2} />
                            <div className="min-w-0">
                              <div className="text-sm font-medium text-gray-100">{payout.amount}</div>
                              <div className="text-xs text-gray-400 truncate">{payout.date} • {payout.method}</div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between sm:flex-col sm:items-end sm:justify-start gap-2 sm:gap-1">
                            <span className="inline-block px-2 py-0.5 bg-[#3fb950]/10 border border-[#3fb950]/30 text-[#3fb950] text-[10px] font-semibold rounded-full uppercase">
                              {payout.status}
                            </span>
                            <div className="text-[10px] text-gray-500">{payout.txId}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="bg-[#151922] border border-[#2d333b] rounded-xl p-6">
                    <h4 className="text-sm font-medium text-gray-100 mb-4">Phương Thức Thanh Toán</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-[#0a0e17] border border-[#2d333b] rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center font-semibold text-white text-sm">
                            M
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-100">MoMo</div>
                            <div className="text-xs text-gray-400">098****5678 (Mặc định)</div>
                          </div>
                        </div>
                        <Check className="w-5 h-5 text-[#3fb950]" strokeWidth={2} />
                      </div>
                      <button className="w-full px-4 py-3 bg-[#0a0e17] border border-[#2d333b] border-dashed rounded-lg text-sm font-medium text-gray-400 hover:border-[#ff6b35] hover:text-gray-300 transition-all">
                        + Thêm Phương Thức Thanh Toán
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* ===== PHẦN 3: EXPLORE CAMPAIGNS HUB ===== */}
      <div className="px-4 py-12 lg:py-20 border-b border-[#2d333b] bg-gradient-to-b from-[#0a0e17] to-[#151922]/50">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[1400px] mx-auto space-y-12"
        >
          {/* Section Header */}
          <div className="text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#ff6b35]/10 to-[#f7931e]/10 border border-[#ff6b35]/20 rounded-full"
            >
              <Star className="w-4 h-4 text-[#ff6b35]" strokeWidth={2} />
              <span className="text-sm font-medium text-[#ff6b35]">200+ Campaigns</span>
            </motion.div>
            <h2 className="text-3xl lg:text-5xl font-semibold tracking-tight text-gray-100">
              Khám Phá Chiến Dịch
            </h2>
            <p className="text-base lg:text-lg text-gray-300 font-normal max-w-2xl mx-auto leading-relaxed">
              Tìm kiếm và tham gia các chiến dịch quảng bá game với mức hoa hồng hấp dẫn.
            </p>
          </div>

          {/* Advanced Search & Filters Bar */}
          <div className="bg-[#151922]/60 backdrop-blur-sm border border-[#2d333b] rounded-2xl p-6 shadow-xl">
            {/* Search Input */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Tìm kiếm campaign theo tên game, thể loại, nhà phát hành..."
                className="w-full bg-[#0a0e17] border border-[#2d333b] rounded-xl py-4 px-5 pl-12 text-sm text-gray-100 placeholder:text-gray-500 focus:outline-none focus:border-[#ff6b35] focus:ring-2 focus:ring-[#ff6b35]/20 transition-all"
              />
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={2} />
            </div>

            {/* Filters & Sorting - Using CreatorFilters Component */}
            <CreatorFilters />
          </div>

          {/* Campaign Cards Grid - Redesigned */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"
          >
            {[
              {
                title: 'PUBG Mobile',
                category: 'Battle Royale',
                commission: '10%',
                commissionType: 'Revenue Share',
                region: 'Việt Nam',
                gradient: 'from-orange-500 to-yellow-500',
                hot: true,
                description: 'Game mobile phổ biến nhất Việt Nam với mức hoa hồng ổn định và player base khổng lồ.',
                img: 'https://m.media-amazon.com/images/M/MV5BODQzNzJjY2QtY2Y2YS00OWJmLTlkZWMtMmNmMmE2NTg1MjQzXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
              },
              {
                title: 'Black Myth: Wukong',
                category: 'Action RPG',
                commission: '50%',
                commissionType: 'Revenue Share',
                region: 'Toàn Cầu',
                gradient: 'from-cyan-500 to-purple-600',
                hot: true,
                description: 'Bom tấn AAA mới với commission cực cao. Cơ hội vàng cho early adopters.',
                img: 'https://assets-prd.ignimgs.com/2024/08/18/blackmyth-1723969364570.jpg',
              },
              {
                title: "Baldur's Gate 3",
                category: 'RPG',
                commission: '100 Keys',
                commissionType: 'Game Keys',
                region: 'Toàn Cầu',
                gradient: 'from-emerald-500 to-teal-600',
                hot: true,
                description: 'Nhận game keys miễn phí để tặng cộng đồng. Build audience nhanh chóng.',
                img: 'https://image.api.playstation.com/vulcan/ap/rnd/202302/2321/ba706e54d68d10a0eb6ab7c36cdad9178c58b7fb7bb03d28.png',
              },
              {
                title: 'Forza Horizon 5',
                category: 'Racing',
                commission: '2.500₫',
                commissionType: 'CPA',
                region: 'Đông Nam Á',
                gradient: 'from-red-500 to-pink-500',
                hot: false,
                description: 'Kiếm tiền nhanh với mô hình CPA. Mỗi người chơi đăng ký = 2.500₫.',
                img: 'https://upload.wikimedia.org/wikipedia/en/8/86/Forza_Horizon_5_cover_art.jpg',
              },
              {
                title: 'Valorant',
                category: 'FPS',
                commission: '15%',
                commissionType: 'Revenue Share',
                region: 'Việt Nam',
                gradient: 'from-purple-500 to-red-500',
                hot: false,
                description: 'FPS cạnh tranh hàng đầu với cộng đồng game thủ đông đảo.',
                img: 'https://upload.wikimedia.org/wikipedia/en/b/ba/Valorant_cover.jpg',
              },
              {
                title: 'Genshin Impact',
                category: 'Action RPG',
                commission: '12%',
                commissionType: 'Revenue Share',
                region: 'Toàn Cầu',
                gradient: 'from-blue-500 to-purple-500',
                hot: true,
                description: 'Game gacha phổ biến với doanh thu khủng. In-app purchase commission cao.',
                img: 'https://image.api.playstation.com/vulcan/ap/rnd/202508/2602/30935168a0f21b6710dc2bd7bb37c23ed937fb9fa747d84c.png',
              },
              {
                title: 'League of Legends',
                category: 'MOBA',
                commission: '8%',
                commissionType: 'Revenue Share',
                region: 'Toàn Cầu',
                gradient: 'from-yellow-500 to-orange-500',
                hot: false,
                description: 'MOBA huyền thoại với player base lớn nhất thế giới.',
                img: 'https://i.imgur.com/I9JF3mh.jpeg',
              },
              {
                title: 'Elden Ring',
                category: 'Action RPG',
                commission: '3.000₫',
                commissionType: 'CPA',
                region: 'Toàn Cầu',
                gradient: 'from-gray-500 to-yellow-500',
                hot: false,
                description: 'Soulslike đỉnh cao với fanbase hardcore. CPA ổn định.',
                img: 'https://m.media-amazon.com/images/M/MV5BMWNlMDBiYzYtMWMyMC00Zjc5LTlhMjItMjRlMzBmYmVkOGM0XkEyXkFqcGc@._V1_QL75_UY281_CR4,0,190,281_.jpg',
              },
              {
                title: 'Minecraft',
                category: 'Sandbox',
                commission: '150 Keys',
                commissionType: 'Game Keys',
                region: 'Toàn Cầu',
                gradient: 'from-green-500 to-emerald-500',
                hot: true,
                description: 'Game phổ biến nhất mọi thời đại. Tặng keys để build loyalty.',
                img: 'https://upload.wikimedia.org/wikipedia/vi/4/48/%E1%BA%A2nh_b%C3%ACa_Minecraft.png',
              },
            ].map((campaign, idx) => (
              <motion.div
                key={idx}
                variants={fadeIn}
                className="group relative h-full"
              >
                {/* Hover Glow Effect */}
                <div className="absolute -inset-[1px] bg-gradient-to-r from-[#ff6b35] to-[#f7931e] rounded-xl opacity-0 group-hover:opacity-25 blur-lg transition-all duration-500" />

                {/* Card Container */}
                <div className="relative h-full flex flex-col bg-[#151922] border border-[#2d333b] rounded-xl overflow-hidden hover:border-[#ff6b35]/60 hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-[#ff6b35]/20">

                  {/* Thumbnail Section - Fixed Aspect Ratio */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-[#0a0e17]">
                    {/* Game Thumbnail */}
                    <img
                      src={campaign.img}
                      alt={campaign.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Dark Overlay for Better Text Contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    {/* Hot Badge - Improved */}
                    {campaign.hot && (
                      <div className="absolute top-2 right-2 z-10">
                        <div className="px-2.5 py-1 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-white text-[10px] font-bold uppercase tracking-wide rounded-md shadow-lg flex items-center gap-1">
                          <Zap className="w-3 h-3" strokeWidth={3} fill="currentColor" />
                          <span>HOT</span>
                        </div>
                      </div>
                    )}

                    {/* Commission Badge - Redesigned with Better Visual */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent pt-10 pb-2.5 px-3">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-gradient-to-r from-[#3fb950] to-[#2ea043] rounded-lg shadow-xl backdrop-blur-sm">
                        <DollarSign className="w-4 h-4 text-white" strokeWidth={3} />
                        <span className="text-white font-bold text-sm">{campaign.commission}</span>
                      </div>
                      <div className="text-[10px] text-gray-300 mt-1 font-semibold uppercase tracking-wide opacity-90">{campaign.commissionType}</div>
                    </div>
                  </div>

                  {/* Content Section - Improved Spacing */}
                  <div className="flex-1 flex flex-col p-4 space-y-3">
                    {/* Title - More Compact */}
                    <h3 className="text-base font-bold tracking-tight text-gray-100 line-clamp-2 leading-snug">
                      {campaign.title}
                    </h3>

                    {/* Tags - Smaller & Tighter */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#0a0e17] border border-[#2d333b] rounded-md text-[10px] font-semibold text-gray-300 uppercase tracking-wide">
                        <Gamepad2 className="w-2.5 h-2.5" strokeWidth={2.5} />
                        {campaign.category}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#0a0e17] border border-[#2d333b] rounded-md text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
                        <Globe className="w-2.5 h-2.5" strokeWidth={2.5} />
                        {campaign.region}
                      </span>
                    </div>

                    {/* Description - Smaller Font */}
                    <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 flex-1">
                      {campaign.description}
                    </p>

                    {/* CTA Button - Modern Design */}
                    <button className="w-full px-4 py-2.5 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] hover:from-[#ff6b35]/90 hover:to-[#f7931e]/90 text-white rounded-lg font-bold text-xs uppercase tracking-wide transition-all duration-300 flex items-center justify-center gap-1.5 shadow-lg shadow-[#ff6b35]/30 hover:shadow-[#ff6b35]/50 hover:scale-[1.02] active:scale-[0.98]">
                      <span>Tham Gia</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" strokeWidth={3} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Results Count & View All CTA - Redesigned */}
          <div className="flex flex-col items-center gap-4 pt-6">
            <div className="text-xs text-gray-500 font-medium">
              Hiển thị <span className="font-bold text-[#ff6b35]">4</span> / <span className="font-bold text-gray-300">200+</span> chiến dịch
            </div>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#151922]/80 backdrop-blur-sm border border-[#2d333b] hover:border-[#ff6b35] hover:bg-[#1c2128] rounded-lg text-sm font-bold text-gray-300 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#ff6b35]/20 group hover:scale-105">
              <span>Xem Tất Cả</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" strokeWidth={2.5} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* ===== PHẦN 4: ONBOARDING GUIDE (In Dashboard Context) ===== */}
      <div className="px-4 py-12 lg:py-16 border-b border-[#2d333b]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8"
        >
          {/* Section Header */}
          <div className="text-center space-y-3">
            <h2 className="text-2xl lg:text-4xl font-semibold tracking-tight text-gray-100">
              Hướng Dẫn Bắt Đầu
            </h2>
            <p className="text-sm lg:text-base text-gray-300 font-normal max-w-2xl mx-auto">
              Làm theo 3 bước đơn giản để bắt đầu kiếm tiền từ đam mê game của bạn.
            </p>
          </div>

          {/* 3-Step Guide */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {[
              {
                step: 'BƯỚC 1',
                icon: Users,
                title: 'Hoàn Thiện Profile',
                desc: 'Cập nhật avatar, bio và liên kết các kênh social media của bạn để xây dựng uy tín.',
                action: 'Đến My Profile',
                actionTab: 'profile' as DashboardTab,
              },
              {
                step: 'BƯỚC 2',
                icon: Target,
                title: 'Chọn Campaign',
                desc: 'Duyệt qua danh sách campaigns và chọn những game phù hợp với audience của bạn.',
                action: 'Khám Phá Campaigns',
                actionTab: null,
              },
              {
                step: 'BƯỚC 3',
                icon: ShoppingBag,
                title: 'Setup Storefront',
                desc: 'Tùy chỉnh cửa hàng game của bạn và bắt đầu chia sẻ tracking links để kiếm hoa hồng.',
                action: 'Setup Shop',
                actionTab: 'storefront' as DashboardTab,
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b35]/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative backdrop-blur-sm bg-[#151922]/80 border border-[#2d333b] rounded-xl p-6 hover:border-[#ff6b35]/50 transition-all duration-500">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#ff6b35] tracking-wider">{item.step}</span>
                      <item.icon className="w-8 h-8 text-[#ff6b35]" strokeWidth={1.5} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium tracking-tight text-gray-100">{item.title}</h3>
                      <p className="text-sm text-gray-300 font-normal leading-relaxed">{item.desc}</p>
                    </div>
                    {item.actionTab ? (
                      <button
                        onClick={() => {
                          setIsLoggedIn(true)
                          setActiveDashboardTab(item.actionTab!)
                          window.scrollTo({ top: 0, behavior: 'smooth' })
                        }}
                        className="inline-flex items-center gap-1 text-sm text-[#ff6b35] hover:text-[#f7931e] font-medium"
                      >
                        <span>{item.action}</span>
                        <ArrowUpRight className="w-3 h-3" strokeWidth={2} />
                      </button>
                    ) : (
                      <button className="inline-flex items-center gap-1 text-sm text-[#ff6b35] hover:text-[#f7931e] font-medium">
                        <span>{item.action}</span>
                        <ArrowUpRight className="w-3 h-3" strokeWidth={2} />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer CTA */}
      <div className="px-4 py-12 bg-[#151922] text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-3"
        >
          <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight text-gray-100">
            Bắt Đầu Kiếm Tiền Hôm Nay
          </h3>
          <p className="text-sm text-gray-300 font-normal max-w-md mx-auto">
            Tham gia hàng ngàn Creator đang xây dựng thu nhập thụ động từ đam mê game.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {!isLoggedIn ? (
            <button
              onClick={() => setIsLoggedIn(true)}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] hover:from-[#ff6b35]/90 hover:to-[#f7931e]/90 rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(255,107,53,0.5)]"
            >
              <span className="text-base font-semibold text-white">Tạo Tài Khoản Creator</span>
              <Sparkles className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" strokeWidth={2} />
            </button>
          ) : (
            <button
              onClick={() => {
                setActiveDashboardTab('campaigns')
                window.scrollTo({ top: 400, behavior: 'smooth' })
              }}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] hover:from-[#ff6b35]/90 hover:to-[#f7931e]/90 rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(255,107,53,0.5)]"
            >
              <span className="text-base font-semibold text-white">Xem Campaigns Của Tôi</span>
              <ArrowUpRight className="w-5 h-5 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" strokeWidth={2} />
            </button>
          )}
          <p className="text-xs text-gray-400 mt-3">Miễn phí mãi mãi • Hỗ trợ 24/7</p>
        </motion.div>
      </div>
    </>
  )
}
