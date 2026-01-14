'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Compass, Heart, User, Edit3 } from 'lucide-react'
import { useLanguage } from '@/app/layout'
import { usePostModal } from '@/lib/contexts/PostModalContext'

export default function MobileBottomNav() {
  const pathname = usePathname()
  const { t } = useLanguage()
  const { openModal } = usePostModal()

  const navItems = [
    { href: '/', icon: Home, label: t.home },
    { href: '/discover', icon: Compass, label: t.discover },
    { href: '/wishlist', icon: Heart, label: t.wishlist },
    { href: '/my-account', icon: User, label: t.profile },
  ]

  return (
    <>
      {/* Floating Action Button (FAB) */}
      <button
        onClick={() => openModal()}
        className="lg:hidden fixed bottom-20 right-4 z-[100] w-14 h-14 rounded-full bg-gradient-to-r from-[#ff6b35] to-[#f7931e]
          shadow-[0_4px_20px_rgba(255,107,53,0.5)] hover:shadow-[0_6px_30px_rgba(255,107,53,0.7)]
          flex items-center justify-center transition-all hover:scale-110 active:scale-95"
        style={{
          position: 'fixed',
          bottom: '5rem',
          right: '1rem',
          zIndex: 100,
        }}
        aria-label="Create post"
      >
        <Edit3 className="w-6 h-6 text-black" />
      </button>

      {/* Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-dark-secondary/95 backdrop-blur-sm border-t border-border-primary">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
                  isActive
                    ? 'text-primary'
                    : 'text-gray-400 hover:text-white hover:bg-dark-elevated'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
