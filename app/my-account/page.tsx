"use client"

import * as React from "react"
import {
  User,
  Edit,
  Gamepad2,
  Trophy,
  Clock,
  Wallet,
  Zap,
  Settings,
  Bell,
  Star,
  Cloud,
  PlayCircle,
  ChevronRight,
  Gift,
  Heart,
  Library,
  LogOut,
  Plus,
  ShoppingCart,
  Download,
  Lock,
  Mail,
  Shield,
  CreditCard,
  TrendingUp,
} from "lucide-react"

export default function MyAccountPage() {
  const [activeSection, setActiveSection] = React.useState('overview')

  // Mock user data
  const userData = {
    name: "ProGamer_VN",
    username: "@progamer",
    email: "progamer@2game.vn",
    avatar: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=200&h=200&fit=crop",
    level: 47,
    xp: 3240,
    xpToNext: 5000,
    coins: 15240,
    gems: 340,
    rank: "Diamond",
    gamesOwned: 24,
    achievements: 142,
    playtime: 487,
    cloudHours: 124,
    friends: 89,
    winRate: 68,
  }

  // Library games with real images
  const libraryGames = [
    {
      id: 1,
      title: "Cyberpunk 2077",
      image: "https://upload.wikimedia.org/wikipedia/vi/9/9f/Cyberpunk_2077_box_art.jpg",
      lastPlayed: "2 giờ trước",
      playtime: 42,
      progress: 65,
    },
    {
      id: 2,
      title: "Valorant",
      image: "https://upload.wikimedia.org/wikipedia/en/b/ba/Valorant_cover.jpg",
      lastPlayed: "5 giờ trước",
      playtime: 128,
      progress: 80,
    },
    {
      id: 3,
      title: "Genshin Impact",
      image: "https://image.api.playstation.com/vulcan/ap/rnd/202508/2602/30935168a0f21b6710dc2bd7bb37c23ed937fb9fa747d84c.png",
      lastPlayed: "1 ngày trước",
      playtime: 234,
      progress: 92,
    },
    {
      id: 4,
      title: "Black Myth: Wukong",
      image: "https://assets-prd.ignimgs.com/2024/08/18/blackmyth-1723969364570.jpg",
      lastPlayed: "2 ngày trước",
      playtime: 56,
      progress: 48,
    },
    {
      id: 5,
      title: "Elden Ring",
      image: "https://m.media-amazon.com/images/M/MV5BMWNlMDBiYzYtMWMyMC00Zjc5LTlhMjItMjRlMzBmYmVkOGM0XkEyXkFqcGc@._V1_QL75_UY281_CR4,0,190,281_.jpg",
      lastPlayed: "3 ngày trước",
      playtime: 167,
      progress: 75,
    },
    {
      id: 6,
      title: "League of Legends",
      image: "https://i.imgur.com/I9JF3mh.jpeg",
      lastPlayed: "1 tuần trước",
      playtime: 342,
      progress: 100,
    },
  ]

  // Wishlist games with real images
  const wishlistGames = [
    {
      id: 1,
      title: "Red Dead Redemption 2",
      image: "https://upload.wikimedia.org/wikipedia/vi/4/44/Red_Dead_Redemption_II.jpg",
      price: 1299000,
      originalPrice: 1499000,
      discount: 13,
    },
    {
      id: 2,
      title: "Baldur's Gate 3",
      image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/header.jpg",
      price: 1199000,
      originalPrice: 1399000,
      discount: 14,
    },
    {
      id: 3,
      title: "Forza Horizon 5",
      image: "https://upload.wikimedia.org/wikipedia/en/8/86/Forza_Horizon_5_cover_art.jpg",
      price: 899000,
      originalPrice: 1099000,
      discount: 18,
    },
    {
      id: 4,
      title: "Minecraft",
      image: "https://upload.wikimedia.org/wikipedia/vi/4/48/%E1%BA%A2nh_b%C3%ACa_Minecraft.png",
      price: 599000,
      originalPrice: 699000,
      discount: 14,
    },
  ]

  const accountNavLinks = [
    { id: 'overview', label: "Tổng Quan", icon: User },
    { id: 'library', label: "Thư Viện", icon: Library, count: 24 },
    { id: 'wishlist', label: "Wishlist", icon: Heart, count: 12 },
    { id: 'wallet', label: "Ví", icon: Wallet },
    { id: 'achievements', label: "Thành Tựu", icon: Trophy, count: 142 },
  ]

  const recentActivity = [
    { id: 1, title: "Chơi Cyberpunk 2077", time: "2 giờ trước", icon: Gamepad2, color: "text-blue-400" },
    { id: 2, title: "Đạt thành tựu 'Legendary Warrior'", time: "5 giờ trước", icon: Trophy, color: "text-[#f7931e]" },
    { id: 3, title: "Mua Elden Ring - Deluxe Edition", time: "1 ngày trước", icon: Gift, color: "text-purple-400" },
    { id: 4, title: "Thêm Red Dead Redemption 2 vào wishlist", time: "2 ngày trước", icon: Star, color: "text-pink-400" },
  ]

  return (
    <>
      {/* NAVIGATION TABS */}
      <div className="sticky top-[57px] z-40 bg-[#151922] border-b border-[#2d333b] w-full">
        <div className="w-full max-w-6xl mx-auto">
          <div className="relative">
            {/* Scroll hint gradient */}
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#151922] to-transparent pointer-events-none z-10 md:hidden"></div>

            <div className="flex overflow-x-auto scrollbar-hide">
              {accountNavLinks.map((link) => {
                const Icon = link.icon
                const isActive = activeSection === link.id
                return (
                  <button
                    key={link.id}
                    onClick={() => setActiveSection(link.id)}
                    className={`
                      relative flex items-center gap-1.5 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex-shrink-0
                      ${isActive
                        ? 'text-[#ff6b35] border-b-2 border-[#ff6b35]'
                        : 'text-[#9aa0a6] border-b-2 border-transparent hover:text-[#e8eaed]'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                    {link.count && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-[#ff6b35] text-black' : 'bg-[#1c2128] text-[#9aa0a6]'}`}>
                        {link.count}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="w-full max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">

        {/* OVERVIEW TAB */}
        {activeSection === 'overview' && (
          <>
            {/* Profile Card */}
            <div className="bg-[#151922] border border-[#2d333b] rounded-lg p-3 sm:p-4 mb-3 sm:mb-4 w-full">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="relative">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden ring-2 ring-[#2d333b]">
                    <img
                      src={userData.avatar}
                      alt={userData.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[#3fb950] rounded-full border-2 border-[#151922]"></div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-base sm:text-lg font-bold text-[#e8eaed] truncate">{userData.name}</h2>
                    <span className="px-2 py-0.5 rounded-lg text-[9px] sm:text-[10px] font-bold uppercase bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-black whitespace-nowrap">
                      {userData.rank}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[#9aa0a6]">
                    <span>Level {userData.level}</span>
                    <span>•</span>
                    <span>{userData.xp} / {userData.xpToNext} XP</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 h-1.5 bg-[#1c2128] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#ff6b35] to-[#f7931e] rounded-full transition-all"
                  style={{ width: `${(userData.xp / userData.xpToNext) * 100}%` }}
                />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="bg-[#151922] border border-[#2d333b] rounded-lg p-3 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#e8eaed] mb-0.5">{userData.gamesOwned}</div>
                <p className="text-[10px] sm:text-xs text-[#9aa0a6]">Games</p>
              </div>
              <div className="bg-[#151922] border border-[#2d333b] rounded-lg p-3 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#e8eaed] mb-0.5">{userData.achievements}</div>
                <p className="text-[10px] sm:text-xs text-[#9aa0a6]">Achievements</p>
              </div>
              <div className="bg-[#151922] border border-[#2d333b] rounded-lg p-3 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#e8eaed] mb-0.5">{userData.playtime}h</div>
                <p className="text-[10px] sm:text-xs text-[#9aa0a6]">Playtime</p>
              </div>
              <div className="bg-[#151922] border border-[#2d333b] rounded-lg p-3 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#ff6b35] mb-0.5">{userData.winRate}%</div>
                <p className="text-[10px] sm:text-xs text-[#9aa0a6]">Win Rate</p>
              </div>
            </div>

            {/* Wallet Preview */}
            <div className="bg-[#151922] border border-[#2d333b] rounded-lg p-3 sm:p-4 mb-3 sm:mb-4 w-full">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#ff6b35]/10 flex items-center justify-center">
                      <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff6b35]" />
                    </div>
                    <div>
                      <p className="text-[9px] text-[#9aa0a6] uppercase">G-Coins</p>
                      <p className="text-lg sm:text-xl font-bold text-[#e8eaed]">{userData.coins.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-pink-500/10 flex items-center justify-center">
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500" />
                    </div>
                    <div>
                      <p className="text-[9px] text-[#9aa0a6] uppercase">Gems</p>
                      <p className="text-lg sm:text-xl font-bold text-[#e8eaed]">{userData.gems}</p>
                    </div>
                  </div>
                </div>

                <button className="bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-black px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold hover:translate-y-[-1px] transition-all shadow-lg">
                  Nạp Tiền
                </button>
              </div>
            </div>

            {/* Cloud Gaming */}
            <div className="bg-[#151922] border border-[#2d333b] rounded-lg p-3 sm:p-4 mb-3 sm:mb-4 w-full">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#58a6ff]/10 flex items-center justify-center">
                    <Cloud className="w-5 h-5 sm:w-6 sm:h-6 text-[#58a6ff]" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#e8eaed]">Cloud Gaming</h3>
                    <p className="text-xs text-[#9aa0a6]">{userData.cloudHours}h còn lại • Ultra HD 4K</p>
                  </div>
                </div>
                <button className="bg-[#1c2128] border border-[#2d333b] text-[#e8eaed] px-4 py-2 rounded-lg text-xs sm:text-sm font-medium hover:border-[#58a6ff] hover:text-[#58a6ff] transition-all flex items-center gap-2">
                  <PlayCircle className="w-4 h-4" />
                  Chơi Ngay
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-[#151922] border border-[#2d333b] rounded-lg p-3 sm:p-4 w-full">
              <h3 className="text-sm sm:text-base font-bold text-[#e8eaed] mb-2 sm:mb-3">Hoạt Động Gần Đây</h3>
              <div className="space-y-1.5 sm:space-y-2">
                {recentActivity.map((activity) => {
                  const Icon = activity.icon
                  return (
                    <div
                      key={activity.id}
                      className="flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-lg bg-[#1c2128] hover:bg-[#242b36] transition-colors cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#0a0e17] flex items-center justify-center flex-shrink-0">
                        <Icon className={`w-4 h-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[#e8eaed] text-xs sm:text-sm truncate">{activity.title}</p>
                        <p className="text-[10px] sm:text-xs text-[#9aa0a6]">{activity.time}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#444c56] flex-shrink-0" />
                    </div>
                  )
                })}
              </div>
            </div>

            {/* User Settings */}
            <div className="bg-[#151922] border border-[#2d333b] rounded-lg p-3 sm:p-4 w-full">
              <h3 className="text-sm sm:text-base font-bold text-[#e8eaed] mb-2 sm:mb-3">Cài Đặt Người Dùng</h3>
              <div className="space-y-1.5 sm:space-y-2">
                <button
                  onClick={() => window.location.href = '/my-account/settings'}
                  className="w-full flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-lg bg-[#1c2128] hover:bg-[#242b36] transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#0a0e17] flex items-center justify-center flex-shrink-0">
                    <Settings className="w-4 h-4 text-[#9aa0a6]" />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-[#e8eaed] text-xs sm:text-sm">Cài đặt tài khoản</p>
                    <p className="text-[10px] sm:text-xs text-[#9aa0a6]">Quản lý thông tin cá nhân</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#444c56] flex-shrink-0" />
                </button>

                <button
                  onClick={() => alert('Tính năng thông báo đang được phát triển')}
                  className="w-full flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-lg bg-[#1c2128] hover:bg-[#242b36] transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#0a0e17] flex items-center justify-center flex-shrink-0">
                    <Bell className="w-4 h-4 text-[#9aa0a6]" />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-[#e8eaed] text-xs sm:text-sm">Thông báo</p>
                    <p className="text-[10px] sm:text-xs text-[#9aa0a6]">Cài đặt thông báo và email</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#444c56] flex-shrink-0" />
                </button>

                <button
                  onClick={() => alert('Tính năng bảo mật đang được phát triển')}
                  className="w-full flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-lg bg-[#1c2128] hover:bg-[#242b36] transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#0a0e17] flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-[#3fb950]" />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-[#e8eaed] text-xs sm:text-sm">Bảo mật</p>
                    <p className="text-[10px] sm:text-xs text-[#9aa0a6]">Mật khẩu và xác thực 2 bước</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#444c56] flex-shrink-0" />
                </button>

                <button
                  onClick={async () => {
                    if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
                      try {
                        await fetch('/api/auth/logout', { method: 'POST' })
                        window.location.href = '/'
                      } catch (error) {
                        alert('Có lỗi xảy ra khi đăng xuất')
                      }
                    }
                  }}
                  className="w-full flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-lg bg-[#1c2128] hover:bg-[#2d1a1a] transition-colors border border-transparent hover:border-red-900/50"
                >
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
                    <LogOut className="w-4 h-4 text-red-400" />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-red-400 text-xs sm:text-sm font-medium">Đăng xuất</p>
                    <p className="text-[10px] sm:text-xs text-[#9aa0a6]">Thoát khỏi tài khoản</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-red-400/50 flex-shrink-0" />
                </button>
              </div>
            </div>
          </>
        )}

        {/* LIBRARY TAB */}
        {activeSection === 'library' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[#e8eaed]">Thư Viện Game</h2>
              <select className="bg-[#1c2128] border border-[#2d333b] text-[#e8eaed] px-3 py-2 rounded-lg text-sm">
                <option>Tất cả</option>
                <option>Đã chơi gần đây</option>
                <option>Chưa chơi</option>
              </select>
            </div>
            {libraryGames.map(game => (
              <div key={game.id} className="bg-[#151922] border border-[#2d333b] rounded-lg p-3 flex items-center gap-3 hover:border-[#ff6b35] transition-all">
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[#e8eaed] font-semibold mb-1">{game.title}</h3>
                  <p className="text-xs text-[#9aa0a6] mb-2">Chơi lần cuối: {game.lastPlayed}</p>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 flex-1 bg-[#1c2128] rounded-full overflow-hidden">
                      <div className="h-full bg-[#ff6b35] rounded-full" style={{width: `${game.progress}%`}}></div>
                    </div>
                    <span className="text-xs text-[#9aa0a6]">{game.playtime}h</span>
                  </div>
                </div>
                <button className="bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-black px-4 py-2 rounded-lg text-sm font-semibold hover:translate-y-[-1px] transition-all">
                  Chơi
                </button>
              </div>
            ))}
          </div>
        )}

        {/* WISHLIST TAB */}
        {activeSection === 'wishlist' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[#e8eaed]">Wishlist của tôi</h2>
              <span className="text-sm text-[#9aa0a6]">{wishlistGames.length} games</span>
            </div>
            {wishlistGames.map(game => (
              <div key={game.id} className="bg-[#151922] border border-[#2d333b] rounded-lg p-3 flex items-center gap-3 hover:border-[#ff6b35] transition-all">
                <div className="w-24 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[#e8eaed] font-semibold mb-1">{game.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-[#ff6b35]">{game.price.toLocaleString()}₫</span>
                    <span className="text-xs text-[#9aa0a6] line-through">{game.originalPrice.toLocaleString()}₫</span>
                    <span className="px-2 py-0.5 bg-[#ff6b35] text-black text-xs font-bold rounded">-{game.discount}%</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-black px-4 py-2 rounded-lg text-sm font-semibold hover:translate-y-[-1px] transition-all">
                    Mua
                  </button>
                  <button className="bg-[#1c2128] border border-[#2d333b] text-[#e8eaed] px-3 py-2 rounded-lg hover:border-[#ff6b35] transition-all">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* WALLET TAB */}
        {activeSection === 'wallet' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-gradient-to-br from-[#ff6b35] to-[#f7931e] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-black" />
                  <p className="text-sm font-medium text-black/70">G-Coins</p>
                </div>
                <p className="text-3xl font-bold text-black mb-3">15,240</p>
                <button className="w-full bg-black/20 text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-black/30 transition-all">
                  Nạp thêm
                </button>
              </div>
              <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-white" />
                  <p className="text-sm font-medium text-white/70">Gems</p>
                </div>
                <p className="text-3xl font-bold text-white mb-3">340</p>
                <button className="w-full bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white/30 transition-all">
                  Đổi Gems
                </button>
              </div>
            </div>

            <div className="bg-[#151922] border border-[#2d333b] rounded-lg p-4">
              <h3 className="text-base font-bold text-[#e8eaed] mb-3">Lịch sử giao dịch</h3>
              <div className="space-y-2">
                {[
                  { type: 'purchase', title: 'Mua Elden Ring', amount: '-1.299.000₫', date: '1 ngày trước' },
                  { type: 'topup', title: 'Nạp G-Coins', amount: '+5.000.000₫', date: '3 ngày trước' },
                  { type: 'purchase', title: 'Mua Battle Pass', amount: '-299.000₫', date: '5 ngày trước' },
                ].map((tx, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-[#1c2128] rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${tx.type === 'purchase' ? 'bg-red-500/10' : 'bg-green-500/10'}`}>
                        {tx.type === 'purchase' ? <ShoppingCart className="w-5 h-5 text-red-400" /> : <Plus className="w-5 h-5 text-green-400" />}
                      </div>
                      <div>
                        <p className="text-[#e8eaed] text-sm font-medium">{tx.title}</p>
                        <p className="text-xs text-[#9aa0a6]">{tx.date}</p>
                      </div>
                    </div>
                    <p className={`text-sm font-bold ${tx.type === 'purchase' ? 'text-red-400' : 'text-green-400'}`}>{tx.amount}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ACHIEVEMENTS TAB */}
        {activeSection === 'achievements' && (
          <div className="space-y-4">
            <div className="bg-[#151922] border border-[#2d333b] rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-[#e8eaed]">Tiến độ</h3>
                <span className="text-sm text-[#9aa0a6]">142 / 200</span>
              </div>
              <div className="h-2 bg-[#1c2128] rounded-full overflow-hidden mb-2">
                <div className="h-full bg-gradient-to-r from-[#ff6b35] to-[#f7931e] rounded-full" style={{width: '71%'}}></div>
              </div>
              <p className="text-xs text-[#9aa0a6]">71% hoàn thành</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: 'Legendary Warrior', desc: 'Đạt level 50', icon: Trophy, progress: 47, total: 50, unlocked: false },
                { title: 'Game Master', desc: 'Sở hữu 50 games', icon: Gamepad2, progress: 24, total: 50, unlocked: false },
                { title: 'Speed Runner', desc: 'Hoàn thành 10 games trong 1 tháng', icon: Clock, progress: 10, total: 10, unlocked: true },
                { title: 'Social Butterfly', desc: 'Có 100 bạn bè', icon: User, progress: 89, total: 100, unlocked: false },
              ].map((ach, i) => {
                const Icon = ach.icon
                return (
                  <div key={i} className={`bg-[#151922] border rounded-lg p-4 ${ach.unlocked ? 'border-[#f7931e]' : 'border-[#2d333b]'}`}>
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${ach.unlocked ? 'bg-[#f7931e]/20' : 'bg-[#2d333b]'}`}>
                        <Icon className={`w-6 h-6 ${ach.unlocked ? 'text-[#f7931e]' : 'text-[#9aa0a6]'}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-[#e8eaed] font-semibold mb-1">{ach.title}</h4>
                        <p className="text-xs text-[#9aa0a6]">{ach.desc}</p>
                      </div>
                    </div>
                    {ach.unlocked ? (
                      <div className="flex items-center gap-2 text-[#f7931e] text-sm font-medium">
                        <Trophy className="w-4 h-4" />
                        <span>Đã mở khóa</span>
                      </div>
                    ) : (
                      <div>
                        <div className="h-1.5 bg-[#1c2128] rounded-full overflow-hidden mb-1">
                          <div className="h-full bg-[#ff6b35] rounded-full" style={{width: `${(ach.progress/ach.total)*100}%`}}></div>
                        </div>
                        <p className="text-xs text-[#9aa0a6]">{ach.progress} / {ach.total}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

      </main>
    </>
  )
}
