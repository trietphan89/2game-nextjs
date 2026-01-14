'use client'

import { useState } from 'react'
import { useLanguage } from '@/app/layout'
import { usePostModal } from '@/lib/contexts/PostModalContext'
import {
  Star,
  Heart,
  Share2,
  Gamepad2,
  Globe,
  Zap,
  Users,
  Calendar,
  Monitor,
  ShoppingCart,
  Building,
  Tag,
  Play,
  Check,
  MessageCircle,
} from 'lucide-react'

export default function GameDetailPage({ params }: { params: { id: string } }) {
  const { t } = useLanguage()
  const { openModal } = usePostModal()
  const [currentScreenshot, setCurrentScreenshot] = useState(0)
  const [activeTab, setActiveTab] = useState<'windows' | 'mac'>('windows')

  const screenshots = [
    { color: 'from-blue-600 via-purple-500 to-pink-500' },
    { color: 'from-green-600 via-teal-500 to-blue-500' },
    { color: 'from-yellow-600 via-orange-500 to-red-500' },
    { color: 'from-pink-600 via-purple-500 to-indigo-500' },
  ]

  const systemRequirements = {
    windows: {
      minimum: [
        { label: 'OS', value: 'Windows 10 64-bit' },
        { label: 'Processor', value: 'Intel i5-6600K / AMD Ryzen 5 1600' },
        { label: 'Memory', value: '8 GB RAM' },
        { label: 'Graphics', value: 'NVIDIA GTX 1060 6GB / AMD RX 580' },
        { label: 'Storage', value: '50 GB available space' },
      ],
      recommended: [
        { label: 'OS', value: 'Windows 11 64-bit' },
        { label: 'Processor', value: 'Intel i7-8700K / AMD Ryzen 7 3700X' },
        { label: 'Memory', value: '16 GB RAM' },
        { label: 'Graphics', value: 'NVIDIA RTX 3060 Ti / AMD RX 6700 XT' },
        { label: 'Storage', value: '50 GB SSD' },
      ],
    },
    mac: {
      minimum: [
        { label: 'OS', value: 'macOS 11 Big Sur' },
        { label: 'Processor', value: 'Apple M1 / Intel Core i5' },
        { label: 'Memory', value: '8 GB RAM' },
        { label: 'Graphics', value: 'Apple M1 GPU / AMD Radeon Pro 5500M' },
        { label: 'Storage', value: '50 GB available space' },
      ],
      recommended: [
        { label: 'OS', value: 'macOS 13 Ventura or later' },
        { label: 'Processor', value: 'Apple M2 Pro / Intel Core i7' },
        { label: 'Memory', value: '16 GB RAM' },
        { label: 'Graphics', value: 'Apple M2 Pro GPU / AMD Radeon Pro 6800' },
        { label: 'Storage', value: '50 GB SSD' },
      ],
    },
  }

  return (
    <div className="flex flex-col gap-4 py-4">
      {/* ===== BLOCK A: HERO MEDIA ===== */}
      <section>
                {/* Main Video/Trailer */}
                <div className="aspect-video bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 rounded-xl overflow-hidden relative group mb-3">
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all duration-300 cursor-pointer">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform border-4 border-white/20">
                      <Play className="w-8 h-8 text-white ml-1" fill="white" strokeWidth={0} />
                    </div>
                  </div>
                </div>

                {/* Screenshot Thumbnails */}
                <div className="grid grid-cols-4 gap-3">
                  {screenshots.map((screenshot, idx) => (
                    <div
                      key={idx}
                      className={`aspect-video bg-gradient-to-br ${screenshot.color} rounded-lg cursor-pointer transition-all
                                  ${currentScreenshot === idx
                                    ? 'ring-2 ring-[#ff6b35] ring-offset-2 ring-offset-[#0a0e17]'
                                    : 'hover:scale-105 opacity-80 hover:opacity-100'}`}
                      onClick={() => setCurrentScreenshot(idx)}
                    />
                  ))}
                </div>
              </section>

              {/* ===== BLOCK B: ABOUT THIS GAME ===== */}
              <section className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4">
                <h2 className="text-sm font-semibold text-white mb-2 leading-tight">{t.aboutThisGame}</h2>
                <div className="text-gray-300 text-xs leading-relaxed space-y-2">
                  <p>
                    <strong className="text-white">Phoenix Story: Awakening</strong> is an epic fantasy RPG that combines stunning next-generation visuals with deep, meaningful storytelling. Journey through a mystical world filled with ancient secrets, powerful enemies, and legendary treasures waiting to be discovered.
                  </p>
                  <p>
                    Set in the breathtaking realm of Aetheria, you'll take on the role of the Phoenix Guardian, a hero destined to restore balance to a world torn apart by corruption. Your choices will shape the destiny of entire civilizations, and every decision carries weight.
                  </p>
                  <p>
                    Experience an adventure that spans over 100 hours of content, featuring a branching narrative with multiple endings, deep character relationships, and a living, breathing world that reacts to your actions.
                  </p>
                </div>
              </section>

              {/* ===== PURCHASE & INFO SECTION ===== */}
              <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">

                {/* Purchase Card */}
                <div className="lg:col-span-1">
                  <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
                    {/* Game Logo */}
                    <div className="flex justify-center mb-3">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center">
                        <Gamepad2 className="w-8 h-8 text-white" strokeWidth={1.5} />
                      </div>
                    </div>

                    {/* Game Title */}
                    <h1 className="text-base font-semibold text-white text-center mb-1 leading-tight">
                      Phoenix Story: Awakening
                    </h1>
                    <p className="text-gray-400 text-center text-xs mb-3">{t.specialEdition}</p>

                    {/* Price Tag */}
                    <div className="bg-gray-800/50 rounded-lg p-2.5 mb-2.5">
                      <div className="flex items-baseline justify-center gap-2 mb-1">
                        <span className="text-lg font-bold text-white">149.000₫</span>
                        <span className="text-xs text-gray-500 line-through">199.000₫</span>
                      </div>
                      <div className="text-center">
                        <span className="inline-block px-2.5 py-0.5 bg-green-500/20 text-green-400 text-xs font-bold rounded-full">
                          {t.save} 25%
                        </span>
                      </div>
                    </div>

                    {/* Buttons */}
                    <button className="w-full h-9 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] hover:from-[#ff6b35]/90 hover:to-[#f7931e]/90 text-white font-semibold text-xs rounded-lg shadow-lg shadow-[#ff6b35]/30 hover:shadow-xl hover:shadow-[#ff6b35]/50 transition-all duration-300 flex items-center justify-center gap-1.5 mb-2">
                      <ShoppingCart className="w-3.5 h-3.5" strokeWidth={2.5} />
                      <span>{t.buyNow}</span>
                    </button>

                    <button className="w-full h-8 bg-transparent border border-gray-600 hover:border-[#ff6b35] text-gray-300 hover:text-white font-medium text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 mb-2">
                      <Heart className="w-3 h-3" strokeWidth={2} />
                      <span>{t.addToWishlist}</span>
                    </button>

                    <button
                      onClick={() => openModal({
                        type: 'game',
                        gameId: params.id,
                        gameName: 'Phoenix Story: Awakening',
                        prefillContent: 'Just discovered Phoenix Story: Awakening! ',
                      })}
                      className="w-full h-8 bg-[#ff6b35]/10 border border-[#ff6b35]/30 hover:border-[#ff6b35] text-[#ff6b35] hover:text-white font-medium text-xs rounded-lg transition-all flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle className="w-3 h-3" strokeWidth={2} />
                      <span>Share Your Thoughts</span>
                    </button>

                    {/* Pre-order Perks */}
                    <div className="mt-3 bg-gray-800/30 rounded-lg p-2.5">
                      <h4 className="text-xs font-bold text-white mb-2 flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-green-400" />
                        {t.preorderBonuses}
                      </h4>
                      <ul className="space-y-1.5 text-xs text-gray-400">
                        <li className="flex items-start gap-2">
                          <Check className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                          <span>Phoenix Skin Pack (5 exclusive skins)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                          <span>500 2GAME Points</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                          <span>Early access (3 days before release)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                          <span>10,000 in-game gold</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Game Info */}
                <div className="lg:col-span-2">
                  <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{t.gameInformation}</h3>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                      <div className="flex justify-between items-center py-2 border-b border-gray-800">
                        <span className="text-gray-400 text-xs">{t.developer}</span>
                        <span className="text-white font-medium text-xs">Phoenix Studios</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-800">
                        <span className="text-gray-400 text-xs">{t.publisher}</span>
                        <span className="text-white font-medium text-xs">2GAME Publishing</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-800">
                        <span className="text-gray-400 text-xs">{t.releaseDate}</span>
                        <span className="text-white font-medium text-xs">Q1 2025</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-800">
                        <span className="text-gray-400 text-xs">{t.genre}</span>
                        <span className="text-white font-medium text-xs">Action RPG</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-800">
                        <span className="text-gray-400 text-xs">{t.platform}</span>
                        <span className="text-white font-medium text-xs">PC, macOS</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-800">
                        <span className="text-gray-400 text-xs">{t.playersOnline}</span>
                        <span className="text-green-400 font-bold text-xs">45,238</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-400 text-xs">{t.rating}</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                          <span className="text-white font-medium text-xs">4.8/5.0</span>
                          <span className="text-gray-500 text-xs">(2.5K)</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <button className="w-full h-8 bg-transparent border border-gray-600 hover:border-[#ff6b35] text-gray-300 hover:text-white font-medium text-xs rounded-lg transition-all flex items-center justify-center gap-1.5">
                          <Share2 className="w-3 h-3" strokeWidth={2} />
                          <span>{t.shareThisGame}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </section>

              {/* ===== BLOCK C: KEY FEATURES ===== */}
              <section className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4">
                <h2 className="text-sm font-semibold text-white mb-3 leading-tight">{t.keyFeatures}</h2>

                <div className="space-y-3">
                  {/* Feature Row 1 */}
                  <div className="flex gap-2.5 items-start">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#ff6b35] to-[#f7931e] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Gamepad2 className="w-4 h-4 text-white" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xs font-semibold text-white mb-0.5 leading-tight">{t.gameDetailFeatures.combatSystem}</h3>
                      <p className="text-gray-400 text-xs leading-relaxed">
                        {t.gameDetailFeatures.combatDesc}
                      </p>
                    </div>
                  </div>

                  {/* Feature Row 2 */}
                  <div className="flex gap-2.5 items-start">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#ff6b35] to-[#f7931e] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Globe className="w-4 h-4 text-white" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xs font-semibold text-white mb-0.5 leading-tight">{t.gameDetailFeatures.openWorld}</h3>
                      <p className="text-gray-400 text-xs leading-relaxed">
                        {t.gameDetailFeatures.openWorldDesc}
                      </p>
                    </div>
                  </div>

                  {/* Feature Row 3 */}
                  <div className="flex gap-2.5 items-start">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#ff6b35] to-[#f7931e] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4 text-white" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xs font-semibold text-white mb-0.5 leading-tight">{t.gameDetailFeatures.multiplayer}</h3>
                      <p className="text-gray-400 text-xs leading-relaxed">
                        {t.gameDetailFeatures.multiplayerDesc}
                      </p>
                    </div>
                  </div>

                  {/* Feature Row 4 */}
                  <div className="flex gap-2.5 items-start">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#ff6b35] to-[#f7931e] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Zap className="w-4 h-4 text-white" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xs font-semibold text-white mb-0.5 leading-tight">{t.gameDetailFeatures.engine}</h3>
                      <p className="text-gray-400 text-xs leading-relaxed">
                        {t.gameDetailFeatures.engineDesc}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* ===== BLOCK D: SYSTEM REQUIREMENTS (COMPACT TABLE) ===== */}
              <section className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4">
                <h2 className="text-sm font-semibold text-white mb-2 leading-tight">{t.systemRequirements}</h2>

                {/* Platform Tabs */}
                <div className="flex gap-3 mb-4 border-b border-gray-700">
                  <button
                    className={`pb-2 px-3 text-sm font-semibold transition-all relative
                                ${activeTab === 'windows'
                                  ? 'text-[#ff6b35]'
                                  : 'text-gray-400 hover:text-gray-200'}`}
                    onClick={() => setActiveTab('windows')}
                  >
                    <Monitor className="w-3.5 h-3.5 inline mr-1.5" />
                    Windows
                    {activeTab === 'windows' && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#ff6b35] to-[#f7931e]" />
                    )}
                  </button>
                  <button
                    className={`pb-2 px-3 text-sm font-semibold transition-all relative
                                ${activeTab === 'mac'
                                  ? 'text-[#ff6b35]'
                                  : 'text-gray-400 hover:text-gray-200'}`}
                    onClick={() => setActiveTab('mac')}
                  >
                    <Monitor className="w-3.5 h-3.5 inline mr-1.5" />
                    macOS
                    {activeTab === 'mac' && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#ff6b35] to-[#f7931e]" />
                    )}
                  </button>
                </div>

                {/* Specs Table - Compact Grid */}
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Minimum */}
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{t.minimum}</h3>
                    <div className="space-y-2">
                      {systemRequirements[activeTab].minimum.map((spec, idx) => (
                        <div key={idx} className="flex justify-between items-baseline text-xs">
                          <span className="text-gray-400 font-medium">{spec.label}</span>
                          <span className="text-gray-200 text-right font-semibold ml-3 text-xs">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommended */}
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{t.recommended}</h3>
                    <div className="space-y-2">
                      {systemRequirements[activeTab].recommended.map((spec, idx) => (
                        <div key={idx} className="flex justify-between items-baseline text-xs">
                          <span className="text-gray-400 font-medium">{spec.label}</span>
                          <span className="text-gray-200 text-right font-semibold ml-3 text-xs">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

      {/* ===== MOBILE STICKY ACTION BAR ===== */}
      <div className="lg:hidden fixed bottom-[72px] left-0 right-0 z-40 bg-gray-900/95 backdrop-blur-xl border-t border-gray-700 px-4 py-2.5">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="text-xs text-gray-400 mb-0.5">{t.price}</div>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-white">149.000₫</span>
              <span className="text-xs text-gray-500 line-through">199.000₫</span>
            </div>
          </div>
          <button className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-white font-bold text-sm rounded-lg shadow-lg shadow-[#ff6b35]/40 active:scale-95 transition-transform">
            <ShoppingCart className="w-4 h-4" strokeWidth={2.5} />
            <span>{t.buyNow}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
