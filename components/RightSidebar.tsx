'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Check, Shield } from 'lucide-react'
import { useLanguage } from '@/app/layout'

export default function RightSidebar() {
  const { t } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)

  const trendingGames = [
    [
      { rank: 1, title: 'Liên Quân Mobile', players: '2.5M players', gradient: 'from-purple-600 to-purple-800' },
      { rank: 2, title: 'Genshin Impact', players: '1.8M players', gradient: 'from-pink-500 to-yellow-400' },
    ],
    [
      { rank: 3, title: 'PUBG Mobile', players: '1.2M players', gradient: 'from-purple-600 to-purple-800' },
      { rank: 4, title: 'Free Fire', players: '980K players', gradient: 'from-blue-400 to-cyan-400' },
    ],
    [
      { rank: 5, title: 'Mobile Legends', players: '850K players', gradient: 'from-green-400 to-teal-400' },
      { rank: 1, title: 'Liên Quân Mobile', players: '2.5M players', gradient: 'from-purple-600 to-purple-800' },
    ],
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % trendingGames.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + trendingGames.length) % trendingGames.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <aside className="w-[300px] px-4 py-4 flex flex-col gap-4 h-[calc(100vh-57px)] overflow-y-auto sticky top-[57px] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#2d333b] hover:scrollbar-thumb-[#ff6b35]">
      {/* Trending Games Carousel */}
      <div className="bg-[#151922] border border-[#2d333b] rounded-xl overflow-hidden">
        <div className="px-3 py-2 border-b border-[#2d333b] flex items-center justify-between">
          <h3 className="text-xs font-bold">{t.trendingGames}</h3>
          <div className="flex gap-1">
            {trendingGames.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`
                  h-1 rounded-full transition-all
                  ${currentSlide === idx ? 'w-4 bg-[#ff6b35]' : 'w-1 bg-[#2d333b] hover:bg-[#9aa0a6]'}
                `}
              />
            ))}
          </div>
        </div>

        {/* Carousel */}
        <div className="px-3 py-2">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {trendingGames.map((slide, slideIdx) => (
                <div key={slideIdx} className="min-w-full flex flex-col gap-1">
                  {slide.map((game) => (
                    <div
                      key={game.rank + game.title}
                      className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-[#1c2128] transition-all cursor-pointer group"
                    >
                      <div className="w-4 h-4 flex items-center justify-center text-[#ff6b35] font-bold text-[10px] flex-shrink-0">
                        #{game.rank}
                      </div>
                      <div className={`w-7 h-7 rounded bg-gradient-to-br ${game.gradient} flex-shrink-0 group-hover:scale-110 transition-transform`} />
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] font-semibold truncate leading-tight">{game.title}</div>
                        <div className="text-[9px] text-[#9aa0a6] leading-tight">{game.players}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons - Below Games */}
          <div className="flex items-center justify-center gap-2 mt-2 pt-2 border-t border-[#2d333b]">
            <button
              onClick={prevSlide}
              className="w-6 h-6 rounded-full bg-[#1c2128] border border-[#2d333b] flex items-center justify-center hover:bg-[#ff6b35] hover:border-[#ff6b35] transition-all disabled:opacity-50"
              disabled={currentSlide === 0}
            >
              <ChevronLeft className="w-3 h-3" />
            </button>
            <span className="text-[10px] text-[#9aa0a6] min-w-[40px] text-center">
              {currentSlide + 1} / {trendingGames.length}
            </span>
            <button
              onClick={nextSlide}
              className="w-6 h-6 rounded-full bg-[#1c2128] border border-[#2d333b] flex items-center justify-center hover:bg-[#ff6b35] hover:border-[#ff6b35] transition-all disabled:opacity-50"
              disabled={currentSlide === trendingGames.length - 1}
            >
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer Widget */}
      <div className="bg-[#151922] border border-[#2d333b] rounded-2xl p-3">
        {/* Platform Description */}
        <p className="text-xs text-[#9aa0a6] leading-snug mb-3">
          {t.footer.platformDesc}
        </p>

        {/* Compliance & Legal */}
        <h4 className="text-xs font-bold mb-2">{t.footer.complianceLegal}</h4>
        <div className="grid grid-cols-2 gap-1.5 text-xs text-[#9aa0a6] mb-3">
          <a href="#" className="hover:text-[#ff6b35] transition-colors truncate">{t.footer.termsOfService}</a>
          <a href="#" className="hover:text-[#ff6b35] transition-colors truncate">{t.footer.privacyPolicy}</a>
          <a href="#" className="hover:text-[#ff6b35] transition-colors truncate">{t.footer.ugcGuidelines}</a>
          <a href="#" className="hover:text-[#ff6b35] transition-colors truncate">{t.footer.complianceReport}</a>
          <a href="#" className="hover:text-[#ff6b35] transition-colors truncate col-span-2">{t.footer.license}</a>
        </div>

        {/* Support Center */}
        <h4 className="text-xs font-bold mb-2">{t.footer.supportCenter}</h4>
        <div className="grid grid-cols-2 gap-1.5 text-xs text-[#9aa0a6] mb-3">
          <a href="#" className="hover:text-[#ff6b35] transition-colors truncate">{t.footer.supportCenter}</a>
          <a href="#" className="hover:text-[#ff6b35] transition-colors truncate">{t.footer.contact}</a>
          <a href="#" className="hover:text-[#ff6b35] transition-colors truncate">{t.footer.faq}</a>
        </div>

        {/* Compliance Badges */}
        <div className="flex flex-col gap-1.5 mb-3">
          <div className="flex items-center gap-1.5 text-xs text-green-400">
            <Check className="w-3.5 h-3.5" />
            <span>{t.footer.governmentApproved}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-green-400">
            <Shield className="w-3.5 h-3.5" />
            <span>{t.footer.fullCompliance}</span>
          </div>
        </div>

        {/* Legal Info */}
        <div className="text-[10px] text-[#6e7681] leading-snug mb-2">
          <div className="font-semibold mb-1">{t.footer.operatingLicense}</div>
          <div className="mb-0.5">• {t.footer.license1}</div>
          <div className="mb-0.5">• {t.footer.license2}</div>
          <div className="mb-0.5">• {t.footer.license3}</div>
          <div>• {t.footer.license4}</div>
        </div>

        {/* Company Info */}
        <div className="text-[10px] text-[#6e7681] leading-snug border-t border-[#2d333b] pt-2 mb-2">
          <div className="font-semibold mb-0.5">{t.footer.companyName}</div>
          <div className="mb-0.5"><strong>{t.footer.address}:</strong> {t.footer.addressDetail}</div>
          <div className="mb-0.5"><strong>{t.footer.phone}:</strong> {t.footer.phoneNumber}</div>
          <div><strong>{t.footer.responsible}:</strong> {t.footer.responsibleName}</div>
        </div>

        {/* Certification Logos */}
        <div className="flex items-center justify-center gap-3 border-t border-[#2d333b] pt-2 mb-2">
          <a
            href="https://tinnhiemmang.vn/danh-ba-tin-nhiem/2gamevn-1677207763"
            target="_blank"
            rel="noopener noreferrer"
            className="block opacity-80 hover:opacity-100 transition-opacity"
          >
            <img
              src="https://tinnhiemmang.vn/handle_cert?id=tinnhiemmang.vn"
              alt="Tin Nhiem Mang"
              className="h-8 w-auto"
              style={{ filter: 'brightness(0.9) contrast(1.1)' }}
            />
          </a>
          <a
            href="https://www.dmca.com/Protection/Status.aspx?ID=2game.vn"
            target="_blank"
            rel="noopener noreferrer"
            className="block opacity-80 hover:opacity-100 transition-opacity"
          >
            <img
              src="https://images.dmca.com/Badges/dmca_protected_sml_120m.png?ID=2game.vn"
              alt="DMCA Protected"
              className="h-8 w-auto"
              style={{ filter: 'brightness(0.9) contrast(1.1)' }}
            />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center text-[10px] text-[#6e7681] border-t border-[#2d333b] pt-2">
          {t.footer.copyright}
        </div>
      </div>
    </aside>
  )
}
