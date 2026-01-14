'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  icon?: ReactNode
  action?: ReactNode
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

/**
 * SectionHeader - Design System Component for Section Titles
 *
 * Usage:
 * <SectionHeader
 *   title="Featured Games"
 *   subtitle="Discover the best games this week"
 *   icon={<Star />}
 *   action={<ViewAllButton />}
 * />
 */
export default function SectionHeader({
  title,
  subtitle,
  icon,
  action,
  size = 'md',
  className = '',
}: SectionHeaderProps) {
  // ============================================================================
  // SIZE VARIANTS (COMPACT)
  // ============================================================================
  const titleSizes = {
    sm: 'text-lg',      // 18px
    md: 'text-xl',      // 20px
    lg: 'text-2xl',     // 24px
  }

  const subtitleSizes = {
    sm: 'text-xs',      // 12px
    md: 'text-sm',      // 14px
    lg: 'text-base',    // 16px
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`
        flex items-center justify-between
        mb-4
        ${className}
      `}
    >
      {/* Left Side: Icon + Title + Subtitle */}
      <div className="flex items-center gap-3">
        {/* Icon */}
        {icon && (
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-primary text-white">
            {icon}
          </div>
        )}

        {/* Title & Subtitle */}
        <div>
          <h2 className={`
            ${titleSizes[size]}
            font-semibold
            text-text-primary
            tracking-tight
          `}>
            {title}
          </h2>

          {subtitle && (
            <p className={`
              ${subtitleSizes[size]}
              text-text-secondary
              mt-0.5
            `}>
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right Side: Action */}
      {action && (
        <div className="flex items-center">
          {action}
        </div>
      )}
    </motion.div>
  )
}
