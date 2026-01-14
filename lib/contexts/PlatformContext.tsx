'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type Platform = 'mobile' | 'pc' | 'all'

interface PlatformContextType {
  platform: Platform
  setPlatform: (platform: Platform) => void
}

const PlatformContext = createContext<PlatformContextType>({
  platform: 'all',
  setPlatform: () => {},
})

export const usePlatform = () => useContext(PlatformContext)

export function PlatformProvider({ children }: { children: ReactNode }) {
  const [platform, setPlatform] = useState<Platform>('all')

  return (
    <PlatformContext.Provider value={{ platform, setPlatform }}>
      {children}
    </PlatformContext.Provider>
  )
}
