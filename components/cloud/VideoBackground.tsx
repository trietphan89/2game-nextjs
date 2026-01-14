'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface VideoBackgroundProps {
  videoUrl?: string
  fallbackImage: string
  overlayOpacity?: number
  className?: string
  children?: React.ReactNode
}

export default function VideoBackground({
  videoUrl,
  fallbackImage,
  overlayOpacity = 0.7,
  className = '',
  children,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [useVideo, setUseVideo] = useState(!!videoUrl)

  useEffect(() => {
    if (videoRef.current && useVideo) {
      videoRef.current.play().catch(() => {
        // If video fails to play, fall back to image
        setUseVideo(false)
      })
    }
  }, [useVideo])

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Video or Image Background */}
      <div className="absolute inset-0">
        {useVideo && videoUrl ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              onLoadedData={() => setIsVideoLoaded(true)}
              className={`w-full h-full object-cover transition-opacity duration-1000 ${
                isVideoLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
            {/* Fallback image while video loads */}
            {!isVideoLoaded && (
              <img
                src={fallbackImage}
                alt="Background"
                className="w-full h-full object-cover"
              />
            )}
          </>
        ) : (
          <img
            src={fallbackImage}
            alt="Background"
            className="w-full h-full object-cover"
          />
        )}

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/50 via-[#0a0a0a]/70 to-[#0a0a0a]"
          style={{ opacity: overlayOpacity }}
        />

        {/* Cyberpunk Scan Lines Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_50%,rgba(255,107,53,0.03)_50%)] bg-[length:100%_4px] animate-pulse opacity-20" />

        {/* Vignette Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,10,10,0.8)_100%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
