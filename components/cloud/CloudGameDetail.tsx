'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  Play,
  ArrowLeft,
  Star,
  Users,
  Calendar,
  Gamepad2,
  Wifi,
  Shield,
  ChevronRight,
} from 'lucide-react'
import type { CloudGame } from '@/lib/mockCloudGames'

interface CloudGameDetailProps {
  game: CloudGame
}

export default function CloudGameDetail({ game }: CloudGameDetailProps) {
  const [currentScreenshot, setCurrentScreenshot] = useState(0)
  const [sessionStarting, setSessionStarting] = useState(false)
  const [countdown, setCountdown] = useState(3)

  const handlePlayNow = () => {
    setSessionStarting(true)
    let count = 3
    const interval = setInterval(() => {
      count--
      setCountdown(count)
      if (count === 0) {
        clearInterval(interval)
        setTimeout(() => {
          setSessionStarting(false)
          setCountdown(3)
        }, 1000)
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative">
      {/* ===== IMMERSIVE BACKDROP ===== */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${game.backdrop})` }}
        />
        <div className="absolute inset-0 backdrop-blur-xl bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-[#0a0a0a]" />
      </div>

      {/* ===== CONTENT ===== */}
      <div className="relative z-10">
        {/* Back Button */}
        <div className="px-4 lg:px-8 py-6">
          <Link
            href="/cloud"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-white/10 hover:border-[#ff6b35]/50 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-semibold">Back to Library</span>
          </Link>
        </div>

        {/* ===== HERO SECTION - CENTERED LAYOUT ===== */}
        <div className="px-4 py-12 md:py-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Game Logo/Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
                {game.title}
              </h1>

              {/* Meta Pills (Genre, Rating, Players) */}
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <span className="px-4 py-2 bg-[#ff6b35]/20 backdrop-blur-md border border-[#ff6b35]/50 rounded-full text-[#ff6b35] text-sm font-bold">
                  {game.genre}
                </span>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/20 rounded-full">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-white font-bold">{game.rating}</span>
                  <span className="text-gray-400 text-sm">/ 5.0</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/20 rounded-full text-gray-300 text-sm">
                  <Users className="w-4 h-4" />
                  <span className="font-semibold">{game.players} playing</span>
                </div>
              </div>
            </motion.div>

            {/* ===== PLAY BUTTON ===== */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePlayNow}
              className="w-full max-w-xl mx-auto h-12 md:h-14 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] rounded-xl text-white font-semibold text-base md:text-lg shadow-lg shadow-[#ff6b35]/40 hover:shadow-[#ff6b35]/60 transition-all"
            >
              <span className="flex items-center justify-center gap-2">
                <Play className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" />
                Chơi ngay
              </span>
            </motion.button>

            {/* Feature Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-3"
            >
              {['Không cài đặt', 'RTX ON', 'Hỗ trợ tay cầm', 'Cloud Saves'].map((badge, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3 py-2 bg-white/5 backdrop-blur-md border border-white/20 rounded-lg"
                >
                  <Shield className="w-4 h-4 text-[#3fb950]" />
                  <span className="text-xs md:text-sm font-semibold text-white">{badge}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ===== CONTENT SECTION - MAX-WIDTH CENTERED ===== */}
        <div className="px-4 pb-20">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-4">Giới thiệu game</h2>
              <p className="text-lg leading-loose text-gray-300">
                {game.longDescription}
              </p>
            </motion.div>

            {/* Screenshots Gallery - 2 COLUMNS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Ảnh chụp màn hình</h2>
              <div className="grid grid-cols-2 gap-4">
                {game.screenshots.map((screenshot, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.03 }}
                    className="aspect-video rounded-xl overflow-hidden cursor-pointer shadow-xl"
                  >
                    <img
                      src={screenshot}
                      alt={`Screenshot ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Game Information Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Thông tin game</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Ngày phát hành</span>
                  </div>
                  <div className="text-white font-bold">{game.releaseDate}</div>
                </div>

                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <Gamepad2 className="w-4 h-4" />
                    <span className="text-sm">Nhà phát triển</span>
                  </div>
                  <div className="text-white font-bold text-sm">{game.developer}</div>
                </div>

                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <Play className="w-4 h-4" />
                    <span className="text-sm">Chi phí chơi</span>
                  </div>
                  <div className="text-[#ff6b35] font-bold">
                    {game.playCost > 0 ? `${game.playCost} G-Coins/giờ` : 'Miễn phí'}
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">Người chơi</span>
                  </div>
                  <div className="text-[#3fb950] font-bold">{game.players} online</div>
                </div>
              </div>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Tính năng nổi bật</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {game.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-300">
                    <ChevronRight className="w-5 h-5 text-[#ff6b35] flex-shrink-0 mt-0.5" />
                    <span className="text-base">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* System Requirements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Cấu hình máy chủ Cloud</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-gray-400">CPU:</span>
                  <span className="text-white font-semibold">{game.systemReqs.cpu}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-gray-400">GPU:</span>
                  <span className="text-white font-semibold">{game.systemReqs.gpu}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-gray-400">RAM:</span>
                  <span className="text-white font-semibold">{game.systemReqs.ram}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-400">Storage:</span>
                  <span className="text-white font-semibold">{game.systemReqs.storage}</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-white/10 text-sm text-gray-400 text-center">
                Không cần tải xuống - Chúng tôi xử lý tất cả phần cứng trên đám mây
              </div>
            </motion.div>
          </div>
        </div>

        {/* ===== STICKY MOBILE PLAY BUTTON ===== */}
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
        >
          <div className="bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-white/10 px-4 py-3">
            <button
              onClick={handlePlayNow}
              className="w-full py-3 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] rounded-xl text-white font-semibold text-base shadow-lg shadow-[#ff6b35]/40 flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" fill="currentColor" />
              Chơi ngay
            </button>
          </div>
        </motion.div>
      </div>

      {/* ===== SESSION STARTING OVERLAY ===== */}
      <AnimatePresence>
        {sessionStarting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center"
          >
            <div className="text-center space-y-8">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="space-y-4"
              >
                <Wifi className="w-16 h-16 text-[#ff6b35] mx-auto animate-pulse" />
                <h2 className="text-3xl font-bold text-white">Đang kết nối máy chủ...</h2>
                <p className="text-gray-400">Khởi tạo phiên chơi game đám mây</p>
              </motion.div>

              <motion.div
                key={countdown}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.5, opacity: 0 }}
                className="text-9xl font-black text-[#ff6b35]"
              >
                {countdown}
              </motion.div>

              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-[#3fb950] rounded-full animate-pulse" />
                  <span>Máy chủ: Việt Nam (12ms)</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-[#3fb950] rounded-full animate-pulse" />
                  <span>Chất lượng: 4K 120fps</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
