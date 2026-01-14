'use client'

import { useState, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TooltipProps {
  children: ReactNode
  content: string | ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
  className?: string
}

/**
 * Tooltip - Design System Component
 *
 * Simple, elegant tooltip with glassmorphism effect
 *
 * Usage:
 * <Tooltip content="Click to download" position="bottom">
 *   <button>Download</button>
 * </Tooltip>
 */
export default function Tooltip({
  children,
  content,
  position = 'top',
  delay = 300,
  className = '',
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  let timeoutId: NodeJS.Timeout

  const handleMouseEnter = () => {
    timeoutId = setTimeout(() => {
      setIsVisible(true)
    }, delay)
  }

  const handleMouseLeave = () => {
    clearTimeout(timeoutId)
    setIsVisible(false)
  }

  // ============================================================================
  // POSITION STYLES
  // ============================================================================
  const positionStyles = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }

  // Animation variants based on position
  const animationVariants = {
    top: {
      initial: { opacity: 0, y: 5 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 5 },
    },
    bottom: {
      initial: { opacity: 0, y: -5 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -5 },
    },
    left: {
      initial: { opacity: 0, x: 5 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 5 },
    },
    right: {
      initial: { opacity: 0, x: -5 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -5 },
    },
  }

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger Element */}
      {children}

      {/* Tooltip Popup */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            {...animationVariants[position]}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={`
              absolute z-[9999] pointer-events-none
              ${positionStyles[position]}
              ${className}
            `}
          >
            {/* Glass Container */}
            <div className="
              px-3 py-2
              bg-dark-elevated/95
              backdrop-blur-xl
              border border-border-primary/50
              rounded-lg
              shadow-glass
              whitespace-nowrap
              max-w-xs
            ">
              {/* Arrow/Pointer */}
              <div className={`
                absolute w-2 h-2
                bg-dark-elevated/95
                border-border-primary/50
                rotate-45
                ${position === 'top' ? 'bottom-[-4px] left-1/2 -translate-x-1/2 border-b border-r' : ''}
                ${position === 'bottom' ? 'top-[-4px] left-1/2 -translate-x-1/2 border-t border-l' : ''}
                ${position === 'left' ? 'right-[-4px] top-1/2 -translate-y-1/2 border-r border-t' : ''}
                ${position === 'right' ? 'left-[-4px] top-1/2 -translate-y-1/2 border-l border-b' : ''}
              `} />

              {/* Content */}
              <div className="relative z-10 text-xs text-text-primary font-medium">
                {content}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
