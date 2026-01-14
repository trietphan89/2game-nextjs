'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface PrimaryButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

/**
 * PrimaryButton - Design System Component
 *
 * Usage:
 * <PrimaryButton variant="primary" size="md">Click me</PrimaryButton>
 * <PrimaryButton variant="outline" size="sm">Small Outline</PrimaryButton>
 */
export default function PrimaryButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  className = '',
  type = 'button',
}: PrimaryButtonProps) {
  // ============================================================================
  // VARIANT STYLES
  // ============================================================================
  const variants = {
    primary: `
      bg-gradient-primary text-white
      hover:shadow-hover hover:scale-105
      active:scale-95
    `,
    secondary: `
      bg-dark-elevated text-text-primary border border-border-primary
      hover:bg-dark-hover hover:border-primary-500
      active:bg-dark-secondary
    `,
    ghost: `
      bg-transparent text-text-primary
      hover:bg-dark-hover
      active:bg-dark-elevated
    `,
    outline: `
      bg-transparent text-primary-500 border-2 border-primary-500
      hover:bg-primary-500 hover:text-white
      active:bg-primary-600
    `,
  }

  // ============================================================================
  // SIZE STYLES
  // ============================================================================
  const sizes = {
    sm: 'px-3 py-1.5 text-xs rounded-button',
    md: 'px-4 py-2 text-sm rounded-button',
    lg: 'px-6 py-3 text-base rounded-button',
  }

  // ============================================================================
  // DISABLED STYLES
  // ============================================================================
  const disabledStyles = disabled
    ? 'opacity-50 cursor-not-allowed pointer-events-none'
    : 'cursor-pointer'

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      transition={{ duration: 0.15, ease: 'easeInOut' }}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabledStyles}
        font-medium
        transition-all duration-smooth ease-smooth
        flex items-center justify-center gap-2
        ${className}
      `}
    >
      {children}
    </motion.button>
  )
}
