'use client'

import type { Metadata } from 'next'
import './globals.css'
import { Be_Vietnam_Pro } from 'next/font/google'
import { useState, createContext, useContext, useEffect } from 'react'
import Header from '@/components/Header'
import LeftSidebar from '@/components/LeftSidebar'
import RightSidebar from '@/components/RightSidebar'
import Footer from '@/components/Footer'
import MobileBottomNav from '@/components/MobileBottomNav'
import MobileDrawer from '@/components/MobileDrawer'
import { Language, translations } from '@/lib/translations'
import { AuthProvider } from '@/lib/contexts/AuthContext'
import { PlatformProvider } from '@/lib/contexts/PlatformContext'
import { PostModalProvider } from '@/lib/contexts/PostModalContext'
import CreatePostModal from '@/components/community/CreatePostModal'

// Configure Be Vietnam Pro font
const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-be-vietnam',
  display: 'swap',
})

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: typeof translations.en
}

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: translations.en,
})

export const useLanguage = () => useContext(LanguageContext)

// SEO Metadata for each language
const seoMetadata = {
  en: {
    title: '2GAME.SPACE - Vietnam\'s Premier Gaming Social Platform | Connect, Share, Play',
    description: 'Join Vietnam\'s largest gaming social network. Connect with gamers, share gameplay, discover new games, create content, and build your gaming community. Free to join!',
    keywords: 'gaming social network, game community Vietnam, gaming platform, gamer social media, game content creators, esports community, gaming network, share gameplay, game streaming, Vietnamese gamers, UGC gaming, cloud gaming Vietnam',
    ogTitle: '2GAME.SPACE - Gaming Social Platform for Vietnamese Gamers',
    ogDescription: 'Connect with millions of gamers. Share gameplay, create content, discover games, and build your gaming community on Vietnam\'s #1 gaming social network.',
  },
  vi: {
    title: '2GAME.SPACE - Mạng Xã Hội Game Số 1 Việt Nam | Kết Nối Game Thủ',
    description: 'Tham gia mạng xã hội game lớn nhất Việt Nam. Kết nối game thủ, chia sẻ gameplay, khám phá game mới, tạo nội dung và xây dựng cộng đồng gaming. Miễn phí!',
    keywords: 'mạng xã hội game, cộng đồng game thủ Việt Nam, nền tảng gaming, mạng xã hội game thủ, content creator game, cộng đồng esports, chia sẻ gameplay, stream game, game thủ Việt Nam, cloud gaming, UGC gaming',
    ogTitle: '2GAME.SPACE - Mạng Xã Hội Game Cho Game Thủ Việt',
    ogDescription: 'Kết nối với hàng triệu game thủ. Chia sẻ gameplay, tạo nội dung, khám phá game mới và xây dựng cộng đồng gaming trên mạng xã hội game #1 Việt Nam.',
  },
  cn: {
    title: '2GAME.SPACE - 越南顶级游戏社交平台 | 连接玩家',
    description: '加入越南最大的游戏社交网络。连接玩家，分享游戏玩法，发现新游戏，创作内容，建立您的游戏社区。免费注册！',
    keywords: '游戏社交网络, 越南游戏社区, 游戏平台, 游戏玩家社交, 游戏内容创作者, 电竞社区, 游戏网络, 分享游戏, 游戏直播, 越南玩家, UGC游戏, 云游戏',
    ogTitle: '2GAME.SPACE - 越南游戏玩家社交平台',
    ogDescription: '与数百万玩家连接。分享游戏玩法，创作内容，发现新游戏，在越南#1游戏社交网络上建立您的游戏社区。',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [language, setLanguage] = useState<Language>('en')
  const [mounted, setMounted] = useState(false)

  // Load language from localStorage on client-side mount
  useEffect(() => {
    setMounted(true)
    const savedLanguage = localStorage.getItem('2game-language') as Language
    if (savedLanguage && ['en', 'vi', 'cn'].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Persist language changes to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('2game-language', language)
      // Update document title and meta tags
      document.title = seoMetadata[language].title
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute('content', seoMetadata[language].description)
      }
      const metaKeywords = document.querySelector('meta[name="keywords"]')
      if (metaKeywords) {
        metaKeywords.setAttribute('content', seoMetadata[language].keywords)
      }
      // Update Open Graph tags
      const ogTitle = document.querySelector('meta[property="og:title"]')
      if (ogTitle) {
        ogTitle.setAttribute('content', seoMetadata[language].ogTitle)
      }
      const ogDescription = document.querySelector('meta[property="og:description"]')
      if (ogDescription) {
        ogDescription.setAttribute('content', seoMetadata[language].ogDescription)
      }
    }
  }, [language, mounted])

  const currentSEO = seoMetadata[language]
  const langMap = { en: 'en', vi: 'vi-VN', cn: 'zh-CN' }

  return (
    <html lang={langMap[language]}>
      <head>
        {/* Favicons */}
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23ff6b35;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23f7931e;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100' height='100' rx='20' fill='url(%23grad)'/%3E%3Ctext x='50' y='70' font-family='Arial,sans-serif' font-size='45' font-weight='bold' text-anchor='middle' fill='%23000000'%3E2G%3C/text%3E%3C/svg%3E" />
        <link rel="apple-touch-icon" sizes="180x180" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23ff6b35;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23f7931e;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100' height='100' rx='20' fill='url(%23grad)'/%3E%3Ctext x='50' y='70' font-family='Arial,sans-serif' font-size='45' font-weight='bold' text-anchor='middle' fill='%23000000'%3E2G%3C/text%3E%3C/svg%3E" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ff6b35" />

        <link href="https://fonts.googleapis.com/css2?family=Material+Icons" rel="stylesheet" />

        {/* Dynamic SEO Title & Description */}
        <title>{currentSEO.title}</title>
        <meta name="description" content={currentSEO.description} />
        <meta name="keywords" content={currentSEO.keywords} />

        {/* Hreflang Tags for Multilingual SEO */}
        <link rel="alternate" hrefLang="en" href="https://2game.space/?lang=en" />
        <link rel="alternate" hrefLang="vi-VN" href="https://2game.space/?lang=vi" />
        <link rel="alternate" hrefLang="zh-CN" href="https://2game.space/?lang=cn" />
        <link rel="alternate" hrefLang="x-default" href="https://2game.space/" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="2GAME.SPACE" />
        <meta property="og:url" content="https://2game.space/" />
        <meta property="og:title" content={currentSEO.ogTitle} />
        <meta property="og:description" content={currentSEO.ogDescription} />
        <meta property="og:image" content="https://2game.space/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content={langMap[language]} />

        {/* Twitter / X */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@2gamespace" />
        <meta name="twitter:url" content="https://2game.space/" />
        <meta name="twitter:title" content={currentSEO.ogTitle} />
        <meta name="twitter:description" content={currentSEO.ogDescription} />
        <meta name="twitter:image" content="https://2game.space/og-image.jpg" />

        {/* Additional SEO */}
        <meta name="author" content="2GAME.SPACE" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href="https://2game.space/" />

        {/* Structured Data - Organization */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "2GAME.SPACE",
          "alternateName": "2GAME",
          "url": "https://2game.space",
          "logo": "https://2game.space/logo.png",
          "description": currentSEO.description,
          "foundingDate": "2020",
          "sameAs": [
            "https://facebook.com/2gamevn",
            "https://twitter.com/2gamespace",
            "https://youtube.com/@2gamevn"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Customer Service",
            "email": "support@2game.vn",
            "availableLanguage": ["Vietnamese", "English", "Chinese"]
          }
        })}} />

        {/* Structured Data - WebSite */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "2GAME.SPACE",
          "url": "https://2game.space",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://2game.space/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          },
          "inLanguage": [langMap[language]]
        })}} />

        {/* Structured Data - SocialMediaPosting */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SocialMediaPosting",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://2game.space"
          },
          "headline": currentSEO.ogTitle,
          "description": currentSEO.ogDescription,
          "sharedContent": {
            "@type": "WebPage",
            "headline": "Gaming Social Platform",
            "url": "https://2game.space"
          }
        })}} />
      </head>
      <body className={`${beVietnamPro.variable} min-h-screen bg-[#0a0e17] text-[#e8eaed] antialiased font-sans`}>
        <AuthProvider>
          <PlatformProvider>
            <PostModalProvider>
              <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
                <CreatePostModal />
                <Header onMenuClick={() => setDrawerOpen(true)} />
                <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

                {/* Desktop 3-Column Layout */}
                <div className="hidden lg:flex max-w-[1440px] mx-auto">
                  <LeftSidebar />

                  {/* Main Feed */}
                  <main className="flex-1 max-w-[640px] border-r border-[#2d333b]">
                    {children}
                  </main>

                  <RightSidebar />
                </div>

                {/* Mobile Single Column Layout */}
                <div className="block lg:hidden">
                  <main className="pb-20">
                    {children}
                  </main>
                  <MobileBottomNav />
                </div>

                {/* Footer - Show only on mobile (RightSidebar has footer on desktop) */}
                <div className="lg:hidden">
                  <Footer />
                </div>
              </LanguageContext.Provider>
            </PostModalProvider>
          </PlatformProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
