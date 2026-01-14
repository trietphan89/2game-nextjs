'use client'

import { motion } from 'framer-motion'
import { Play } from 'lucide-react'

interface PlayButtonProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'primary' | 'secondary' | 'ghost'
  onClick?: () => void
  className?: string
  label?: string
  showLabel?: boolean
}

const sizeClasses = {
  sm: 'w-10 h-10',
  md: 'w-14 h-14',
  lg: 'w-20 h-20',
  xl: 'w-28 h-28',
}

const iconSizes = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
}

export default function PlayButton({
  size = 'lg',
  variant = 'primary',
  onClick,
  className = '',
  label = 'Play Now',
  showLabel = false,
}: PlayButtonProps) {
  const baseClasses = 'rounded-full flex items-center justify-center transition-all cursor-pointer'

  const variantClasses = {
    primary: 'bg-gradient-to-r from-[#ff6b35] to-[#f7931e] shadow-lg shadow-[#ff6b35]/50 hover:shadow-xl hover:shadow-[#ff6b35]/70',
    secondary: 'bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20',
    ghost: 'bg-black/60 backdrop-blur-sm border border-white/30 hover:bg-black/80',
  }

  const button = (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      <Play className={`${iconSizes[size]} text-white`} fill="currentColor" />
    </motion.button>
  )

  if (showLabel) {
    return (
      <div className="flex flex-col items-center gap-3">
        {button}
        <span className="text-sm font-semibold text-white">{label}</span>
      </div>
    )
  }

  return button
}
