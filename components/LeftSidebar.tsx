'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Compass, BarChart2, MessageCircle, ShoppingBag, Tv,
  Calendar, Gift, Cloud, Pencil, Code, Edit3
} from 'lucide-react'
import { useLanguage } from '@/app/layout'
import { Language } from '@/lib/translations'
import { usePostModal } from '@/lib/contexts/PostModalContext'

export default function LeftSidebar() {
  const { language, setLanguage, t } = useLanguage()
  const pathname = usePathname()
  const [langOpen, setLangOpen] = useState(false)
  const { openModal } = usePostModal()

  const languages = [
    { code: 'EN', flag: '🇬🇧', name: 'English', key: 'en' as Language },
    { code: 'VN', flag: '🇻🇳', name: 'Tiếng Việt', key: 'vi' as Language },
    { code: 'CN', flag: '🇨🇳', name: '中文', key: 'cn' as Language },
  ]

  const currentLang = languages.find(lang => lang.key === language) || languages[0]

  const navItems = [
    { href: '/', icon: Compass, label: t.discover },
    { href: '/rankings', icon: BarChart2, label: t.rankings },
    { href: '/community', icon: MessageCircle, label: t.community },
    { href: '/discover', icon: ShoppingBag, label: t.store },
    { href: '/xtv', icon: Tv, label: t.xtvNetwork, badge: t.badges.live },
    { href: '/events', icon: Calendar, label: t.events },
    { href: '/rewards', icon: Gift, label: t.rewards, badge: t.badges.new },
    { href: '/cloud', icon: Cloud, label: t.cloudGaming, badge: t.badges.beta },
    { href: '/creator', icon: Pencil, label: t.creatorCenter },
    { href: '/developer', icon: Code, label: t.developerCenter },
  ]

  return (
    <aside className="w-[280px] border-r border-[#2d333b] px-4 py-4 h-[calc(100vh-57px)] overflow-y-auto flex flex-col gap-2 sticky top-[57px]">
      {/* Navigation Items */}
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon
          // Normalize paths by removing trailing slashes for comparison
          const normalizedPathname = pathname === '/' ? '/' : pathname.replace(/\/$/, '')
          const normalizedHref = item.href === '/' ? '/' : item.href.replace(/\/$/, '')
          const isActive = normalizedPathname === normalizedHref
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-4 px-4 py-3 rounded-3xl text-[15px] font-medium transition-all
                ${isActive
                  ? 'bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-black font-semibold'
                  : 'hover:bg-[#242b36] text-gray-300'
                }
              `}
            >
              <Icon className="w-6 h-6 flex-shrink-0" />
              <span>{item.label}</span>
              {item.badge && (
                <span className={`
                  ml-auto text-[10px] px-2 py-0.5 rounded-xl font-bold uppercase
                  ${item.badge === 'Live' ? 'bg-[#f85149] text-white' : ''}
                  ${item.badge === 'New' ? 'bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-black' : ''}
                  ${item.badge === 'Beta' ? 'bg-[#58a6ff] text-white' : ''}
                `}>
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Post Button - Desktop Only */}
      <button
        onClick={() => openModal()}
        className="hidden lg:flex mt-4 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-black px-4 py-3.5 rounded-3xl font-semibold text-base transition-all hover:translate-y-[-2px] shadow-[0_0_20px_rgba(255,107,53,0.4)] hover:shadow-[0_0_30px_rgba(255,107,53,0.6)] items-center justify-center gap-2"
      >
        <Edit3 className="w-4 h-4" />
        <span>{t.postSomething}</span>
      </button>

      {/* Footer Section */}
      <div className="mt-auto pt-4 border-t border-[#2d333b]">
        {/* User Card */}
        <Link href="/my-account" className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#242b36] transition-colors cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white font-semibold flex-shrink-0">
            VN
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium tracking-tight text-gray-100 truncate">Vietnamese User</div>
            <div className="text-xs text-[#3fb950]">950 Points</div>
          </div>
        </Link>

        {/* Language Dropdown */}
        <div className="relative mt-2">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="w-full flex items-center gap-2 px-3 py-2 bg-[#1c2128] border border-[#2d333b] rounded-lg text-sm hover:bg-[#242b36] hover:border-[#444c56] transition-all"
          >
            <span className="w-5 h-5 flex items-center justify-center text-base">{currentLang.flag}</span>
            <span className="text-sm font-medium text-gray-100">{currentLang.code}</span>
            <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 10l5 5 5-5z"/>
            </svg>
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
                    ${currentLang.key === lang.key ? 'bg-[rgba(255,107,53,0.1)] text-[#ff6b35]' : 'hover:bg-[#242b36] text-gray-300'}
                  `}
                >
                  <span className="w-5 h-5 flex items-center justify-center text-base">{lang.flag}</span>
                  <span className="text-sm font-medium">{lang.code}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
