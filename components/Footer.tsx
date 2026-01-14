'use client'

import { Check, Shield } from 'lucide-react'
import { useLanguage } from '@/app/layout'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-[#0a0e17] border-t border-[#2d333b] mt-8">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] rounded-lg flex items-center justify-center font-semibold text-black text-xl">
                2G
              </div>
              <div>
                <div className="text-lg font-semibold tracking-tight text-gray-100">2GAME.VN</div>
                <div className="text-[10px] text-gray-400">Powered by Wetaps</div>
              </div>
            </div>
            <p className="text-sm text-gray-300 font-normal max-w-md mb-4">
              {t.footer.platformDesc}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium text-sm tracking-tight text-gray-100 mb-4">{t.footer.complianceLegal}</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              <a href="#" className="text-gray-300 font-normal hover:text-[#ff6b35] transition-colors">
                {t.footer.termsOfService}
              </a>
              <a href="#" className="text-gray-300 font-normal hover:text-[#ff6b35] transition-colors">
                {t.footer.privacyPolicy}
              </a>
              <a href="#" className="text-gray-300 font-normal hover:text-[#ff6b35] transition-colors">
                {t.footer.ugcGuidelines}
              </a>
              <a href="#" className="text-gray-300 font-normal hover:text-[#ff6b35] transition-colors">
                {t.footer.complianceReport}
              </a>
              <a href="#" className="text-gray-300 font-normal hover:text-[#ff6b35] transition-colors col-span-2">
                {t.footer.license}
              </a>
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-medium text-sm tracking-tight text-gray-100 mb-4">{t.footer.supportCenter}</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              <a href="#" className="text-gray-300 font-normal hover:text-[#ff6b35] transition-colors">
                {t.footer.supportCenter}
              </a>
              <a href="#" className="text-gray-300 font-normal hover:text-[#ff6b35] transition-colors">
                {t.footer.contact}
              </a>
              <a href="#" className="text-gray-300 font-normal hover:text-[#ff6b35] transition-colors">
                {t.footer.faq}
              </a>
            </div>
          </div>
        </div>

        {/* Compliance Badges */}
        <div className="border-t border-[#2d333b] pt-6 mb-6">
          <div className="flex flex-col md:flex-row gap-3 mb-4">
            <div className="flex items-center gap-2 text-xs text-green-400">
              <Check className="w-4 h-4 flex-shrink-0" />
              <span>{t.footer.governmentApproved}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-green-400">
              <Shield className="w-4 h-4 flex-shrink-0" />
              <span>{t.footer.fullCompliance}</span>
            </div>
          </div>

          {/* Legal Info */}
          <div className="text-[10px] text-gray-400 leading-relaxed mb-4">
            <div className="font-medium mb-1">{t.footer.operatingLicense}</div>
            <div>• {t.footer.license1}</div>
            <div>• {t.footer.license2}</div>
            <div>• {t.footer.license3}</div>
            <div>• {t.footer.license4}</div>
          </div>

          {/* Company Info */}
          <div className="text-[10px] text-gray-400 leading-relaxed mb-4">
            <div className="font-medium mb-1">{t.footer.companyName}</div>
            <div><strong>{t.footer.address}:</strong> {t.footer.addressDetail}</div>
            <div><strong>{t.footer.phone}:</strong> {t.footer.phoneNumber}</div>
            <div><strong>{t.footer.responsible}:</strong> {t.footer.responsibleName}</div>
          </div>
        </div>

        {/* Certification Logos */}
        <div className="flex items-center justify-center gap-6 border-t border-[#2d333b] pt-6 pb-4">
          <a
            href="https://tinnhiemmang.vn/danh-ba-tin-nhiem/2gamevn-1677207763"
            target="_blank"
            rel="noopener noreferrer"
            className="block opacity-80 hover:opacity-100 transition-opacity"
          >
            <img
              src="https://tinnhiemmang.vn/handle_cert?id=tinnhiemmang.vn"
              alt="Tin Nhiem Mang"
              className="h-12 w-auto brightness-90"
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
              className="h-12 w-auto"
              style={{ filter: 'brightness(0.9) contrast(1.1)' }}
            />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center text-[10px] text-gray-400 border-t border-[#2d333b] pt-4">
          {t.footer.copyright}
        </div>
      </div>
    </footer>
  )
}
