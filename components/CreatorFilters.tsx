'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Gamepad2, Percent, Globe, Filter } from 'lucide-react'
import clsx from 'clsx'

// ==================== TYPES ====================
type SortKey = 'all' | 'high-commission' | 'new' | 'popular'

interface SortTab {
  key: SortKey
  label: string
  count: string
}

interface FilterState {
  category: string
  commissionType: string
  region: string
}

// ==================== COMPONENT ====================
export default function CreatorFilters() {
  // State Management
  const [activeSort, setActiveSort] = useState<SortKey>('all')
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    commissionType: '',
    region: ''
  })

  // Sort Tabs Data
  const sortTabs: SortTab[] = [
    { key: 'all', label: 'Tất Cả', count: '200+' },
    { key: 'high-commission', label: 'Hoa Hồng Cao', count: '45' },
    { key: 'new', label: 'Mới Ra Mắt', count: '12' },
    { key: 'popular', label: 'Phổ Biến', count: '89' },
  ]

  // Handlers
  const handleFilterChange = (field: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }))
  }

  const handleApplyFilters = () => {
    console.log('Applying filters:', filters)
    // TODO: Implement filter logic (API call, state update, etc.)
  }

  return (
    <div className="w-full space-y-8">
      {/* ==================== PART 1: FILTER BAR ==================== */}
      <div className="w-full">
        <div className="flex flex-col lg:flex-row gap-3 w-full">
          {/* Category Dropdown */}
          <div className="relative flex-1">
            <Gamepad2 
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none z-10" 
              strokeWidth={2} 
            />
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className={clsx(
                // Fixed height for alignment
                'h-12 w-full',
                // Outlined style
                'bg-transparent border border-gray-700 hover:border-[#ff6b35]/50',
                // Focus states
                'focus:outline-none focus:border-[#ff6b35] focus:ring-2 focus:ring-[#ff6b35]/20',
                // Spacing & typography
                'pl-11 pr-10 text-sm text-gray-100',
                // Border radius
                'rounded-lg',
                // Transitions
                'transition-all duration-200',
                // Remove default arrow
                'appearance-none cursor-pointer'
              )}
            >
              <option value="">Tất cả thể loại</option>
              <option value="battle-royale">Battle Royale</option>
              <option value="mmorpg">MMORPG</option>
              <option value="rpg">RPG</option>
              <option value="fps">FPS</option>
              <option value="moba">MOBA</option>
            </select>
            {/* Custom Arrow */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Commission Type Dropdown */}
          <div className="relative flex-1">
            <Percent 
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none z-10" 
              strokeWidth={2} 
            />
            <select
              value={filters.commissionType}
              onChange={(e) => handleFilterChange('commissionType', e.target.value)}
              className={clsx(
                'h-12 w-full',
                'bg-transparent border border-gray-700 hover:border-[#ff6b35]/50',
                'focus:outline-none focus:border-[#ff6b35] focus:ring-2 focus:ring-[#ff6b35]/20',
                'pl-11 pr-10 text-sm text-gray-100',
                'rounded-lg',
                'transition-all duration-200',
                'appearance-none cursor-pointer'
              )}
            >
              <option value="">Loại hoa hồng</option>
              <option value="revenue-share">Revenue Share</option>
              <option value="cpa">CPA</option>
              <option value="game-keys">Game Keys</option>
              <option value="hybrid">Hybrid</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Region Dropdown */}
          <div className="relative flex-1">
            <Globe 
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none z-10" 
              strokeWidth={2} 
            />
            <select
              value={filters.region}
              onChange={(e) => handleFilterChange('region', e.target.value)}
              className={clsx(
                'h-12 w-full',
                'bg-transparent border border-gray-700 hover:border-[#ff6b35]/50',
                'focus:outline-none focus:border-[#ff6b35] focus:ring-2 focus:ring-[#ff6b35]/20',
                'pl-11 pr-10 text-sm text-gray-100',
                'rounded-lg',
                'transition-all duration-200',
                'appearance-none cursor-pointer'
              )}
            >
              <option value="">Khu vực</option>
              <option value="vietnam">Việt Nam</option>
              <option value="global">Toàn Cầu</option>
              <option value="sea">Đông Nam Á</option>
              <option value="asia">Châu Á</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Apply Filter Button */}
          <button
            onClick={handleApplyFilters}
            className={clsx(
              // Fixed height to match inputs
              'h-12',
              // Width
              'w-full lg:w-auto px-6',
              // Background & colors
              'bg-gradient-to-r from-[#ff6b35] to-[#f7931e]',
              'hover:from-[#ff6b35]/90 hover:to-[#f7931e]/90',
              'text-white font-semibold text-sm',
              // Border radius
              'rounded-lg',
              // Shadow
              'shadow-lg shadow-[#ff6b35]/25 hover:shadow-[#ff6b35]/40',
              // Transitions & interactions
              'transition-all duration-300',
              'hover:scale-[1.02] active:scale-[0.98]',
              // Layout
              'flex items-center justify-center gap-2',
              // Ensure text doesn't wrap
              'whitespace-nowrap'
            )}
          >
            <Filter className="w-4 h-4" strokeWidth={2.5} />
            <span>Lọc Kết Quả</span>
          </button>
        </div>
      </div>

      {/* ==================== PART 2: SORT TABS ==================== */}
      <div className="w-full">
        <div className="flex justify-center overflow-x-auto pb-2 scrollbar-hide">
          <div className="inline-flex items-stretch gap-1">
            {sortTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveSort(tab.key)}
                className={clsx(
                  // Base styles
                  'relative px-5 py-3',
                  'text-sm font-semibold',
                  'transition-all duration-300',
                  'flex items-center gap-2',
                  // Conditional text color
                  activeSort === tab.key ? 'text-[#ff6b35]' : 'text-gray-400 hover:text-gray-200'
                )}
              >
                {/* Label */}
                <span className="relative z-10">{tab.label}</span>

                {/* Count Badge */}
                <span
                  className={clsx(
                    'relative z-10',
                    'px-2 py-0.5 rounded-full',
                    'text-[10px] font-bold',
                    'border transition-all',
                    activeSort === tab.key
                      ? 'bg-[#ff6b35]/15 text-[#ff6b35] border-[#ff6b35]/30'
                      : 'bg-[#151922] text-gray-500 border-[#2d333b]'
                  )}
                >
                  {tab.count}
                </span>

                {/* Underline Glow Effect (Active Only) */}
                {activeSort === tab.key && (
                  <>
                    {/* Solid underline */}
                    <motion.div
                      layoutId="sortUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#ff6b35] to-[#f7931e]"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                    {/* Glow layer */}
                    <motion.div
                      layoutId="sortGlow"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] blur-md opacity-60"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  </>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hide scrollbar utility */}
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
