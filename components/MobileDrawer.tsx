'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X } from 'lucide-react'
import { useLanguage } from '@/app/layout'
import { Language } from '@/lib/translations'

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const pathname = usePathname()
  const { language, setLanguage, t } = useLanguage()
  const [langOpen, setLangOpen] = useState(false)

  const languages = [
    { code: 'EN', flag: '🇬🇧', name: 'English', key: 'en' as Language },
    { code: 'VN', flag: '🇻🇳', name: 'Tiếng Việt', key: 'vi' as Language },
    { code: 'CN', flag: '🇨🇳', name: '中文', key: 'cn' as Language },
  ]

  const currentLang = languages.find(lang => lang.key === language) || languages[0]

  const navItems = [
    { href: '/', icon: 'dashboard', label: t.discover },
    { href: '/rankings', icon: 'leaderboard', label: t.rankings },
    { href: '/community', icon: 'forum', label: t.community },
    { href: '/discover', icon: 'store', label: t.store },
    { href: '/xtv', icon: 'live_tv', label: t.xtvNetwork, badge: t.badges.live, badgeColor: 'bg-red-500' },
    { href: '/events', icon: 'event', label: t.events },
    { href: '/rewards', icon: 'card_giftcard', label: t.rewards, badge: t.badges.new, badgeColor: 'bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-black' },
    { href: '/cloud', icon: 'cloud', label: t.cloudGaming, badge: t.badges.beta, badgeColor: 'bg-[#58a6ff]' },
    { href: '/creator', icon: 'edit', label: t.creatorCenter },
    { href: '/developer', icon: 'code', label: t.developerCenter },
  ]

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`
          fixed top-0 left-0 h-full w-[280px] bg-[#0a0e17] z-50 lg:hidden
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          border-r border-[#2d333b] overflow-y-auto
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#2d333b]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] rounded-lg flex items-center justify-center font-extrabold text-black text-sm">
              2G
            </div>
            <div className="text-sm font-bold">2GAME.VN</div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#1c2128] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Card */}
        <div className="p-4 border-b border-[#2d333b]">
          <Link href="/my-account" onClick={onClose} className="flex items-center gap-3 p-3 bg-[#151922] rounded-xl hover:bg-[#1c2128] transition-colors">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center text-white font-bold flex-shrink-0">
              VN
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold truncate">Vietnamese User</div>
              <div className="text-xs text-[#3fb950]">950 Points</div>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="p-3">
          {navItems.map((item) => {
            // Normalize paths by removing trailing slashes for comparison
            const normalizedPathname = pathname === '/' ? '/' : pathname.replace(/\/$/, '')
            const normalizedHref = item.href === '/' ? '/' : item.href.replace(/\/$/, '')
            const isActive = normalizedPathname === normalizedHref
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-3 py-3 rounded-xl text-[15px] font-medium transition-all mb-1
                  ${isActive
                    ? 'bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-black font-semibold'
                    : 'hover:bg-[#1c2128] text-[#e8eaed]'
                  }
                `}
              >
                <span className="material-icons text-xl">{item.icon}</span>
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className={`
                    text-[10px] px-2 py-0.5 rounded-lg font-bold uppercase
                    ${item.badgeColor}
                  `}>
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Language Switcher */}
        <div className="p-4 border-t border-[#2d333b] mt-auto">
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="w-full flex items-center gap-2 px-3 py-2.5 bg-[#1c2128] border border-[#2d333b] rounded-lg text-sm hover:bg-[#242b36] hover:border-[#444c56] transition-all"
            >
              <span className="w-5 h-5 flex items-center justify-center text-base">{currentLang.flag}</span>
              <span className="text-sm font-semibold flex-1 text-left">{currentLang.name}</span>
              <span className="material-icons text-sm">expand_more</span>
            </button>

            {/* Language Menu */}
            {langOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-[#1c2128] border border-[#2d333b] rounded-lg shadow-[0_8px_24px_rgba(0,0,0,0.7)] overflow-hidden">
                {languages.map((lang) => (
                  <div
                    key={lang.key}
                    onClick={() => {
                      setLanguage(lang.key)
                      setLangOpen(false)
                    }}
                    className={`
                      flex items-center gap-2 px-3 py-2.5 text-sm cursor-pointer transition-colors
                      ${currentLang.key === lang.key ? 'bg-[rgba(255,107,53,0.1)] text-[#ff6b35]' : 'hover:bg-[#242b36]'}
                    `}
                  >
                    <span className="w-5 h-5 flex items-center justify-center text-base">{lang.flag}</span>
                    <span className="text-sm font-semibold">{lang.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="p-4 border-t border-[#2d333b] text-center">
          <div className="text-[10px] text-[#6e7681]">
            © 2025 2GAME.VN
          </div>
          <div className="text-[10px] text-[#6e7681]">
            Powered by Wetaps
          </div>
        </div>
      </div>
    </>
  )
}
