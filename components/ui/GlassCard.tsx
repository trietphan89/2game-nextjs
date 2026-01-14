'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  variant?: 'default' | 'elevated' | 'hover'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  hoverable?: boolean
}

/**
 * GlassCard - Design System Component with Glassmorphism Effect
 *
 * Usage:
 * <GlassCard variant="elevated" padding="md">
 *   <h3>Content</h3>
 * </GlassCard>
 */
export default function GlassCard({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  onClick,
  hoverable = false,
}: GlassCardProps) {
  // ============================================================================
  // VARIANT STYLES (Glassmorphism Effect)
  // ============================================================================
  const variants = {
    default: `
      bg-dark-elevated/80
      backdrop-blur-md
      border border-border-primary
    `,
    elevated: `
      bg-gradient-glass
      backdrop-blur-xl
      border border-border-primary/50
      shadow-card
    `,
    hover: `
      bg-dark-elevated/80
      backdrop-blur-md
      border border-border-primary
      hover:border-primary-500/50
      hover:shadow-hover
      hover:-translate-y-1
    `,
  }

  // ============================================================================
  // PADDING STYLES
  // ============================================================================
  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-card',
    lg: 'p-6',
  }

  // ============================================================================
  // HOVERABLE STYLES
  // ============================================================================
  const hoverableStyles = hoverable || onClick
    ? 'cursor-pointer transition-all duration-smooth'
    : ''

  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      whileHover={hoverable ? { y: -4, scale: 1.01 } : {}}
      className={`
        ${variants[variant]}
        ${paddings[padding]}
        ${hoverableStyles}
        rounded-card
        overflow-hidden
        ${className}
      `}
    >
      {/* Glass Shimmer Effect */}
      {variant === 'elevated' && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50 pointer-events-none" />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}
