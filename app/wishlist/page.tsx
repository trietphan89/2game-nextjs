'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, ShoppingCart, Trash2, Star } from 'lucide-react'
import { useLanguage } from '@/app/layout'

export default function WishlistPage() {
  const { t } = useLanguage()
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 'phoenix-story',
      title: 'Phoenix Story: Awakening',
      genre: 'RPG, Fantasy, Multiplayer',
      price: '149.000₫',
      originalPrice: '199.000₫',
      discount: '25%',
      rating: 4.8,
      coverGradient: 'bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500',
      addedDate: '2024-12-20',
    },
    {
      id: 'magic-quest',
      title: 'Magic Quest Online',
      genre: 'MMORPG, Fantasy',
      price: '159.000₫',
      originalPrice: '199.000₫',
      discount: '20%',
      rating: 4.9,
      coverGradient: 'bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-500',
      addedDate: '2024-12-18',
    },
    {
      id: 'cyber-legends',
      title: 'Cyber Legends 2077',
      genre: 'Action, Sci-Fi, Open World',
      price: '129.000₫',
      originalPrice: '179.000₫',
      discount: '28%',
      rating: 4.6,
      coverGradient: 'bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700',
      addedDate: '2024-12-15',
    },
  ])

  const removeFromWishlist = (id: string) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id))
  }

  const totalValue = wishlistItems.reduce((acc, item) => {
    const price = parseInt(item.price.replace(/[^\d]/g, ''))
    return acc + (isNaN(price) ? 0 : price)
  }, 0)

  const totalSavings = wishlistItems.reduce((acc, item) => {
    if (!item.originalPrice) return acc
    const original = parseInt(item.originalPrice.replace(/[^\d]/g, ''))
    const current = parseInt(item.price.replace(/[^\d]/g, ''))
    return acc + (original - current)
  }, 0)

  return (
    <>
      <main className="max-w-7xl mx-auto px-3 md:px-4 pb-20 md:pb-8">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-6 h-6 md:w-8 md:h-8 text-primary fill-primary" />
            <h1 className="text-2xl md:text-3xl font-bold">{t.wishlistTitle}</h1>
          </div>
          <p className="text-sm md:text-base text-gray-400">
            {wishlistItems.length} {t.gamesWaiting}
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          /* Empty State */
          <div className="bg-dark-secondary border border-border-primary rounded-xl p-12 text-center">
            <div className="text-6xl mb-4">💔</div>
            <h3 className="text-xl font-bold mb-2">{t.wishlistEmpty}</h3>
            <p className="text-gray-400 mb-6">{t.wishlistEmptyDesc}</p>
            <Link
              href="/discover"
              className="inline-block px-6 py-3 bg-gradient-primary hover:opacity-90 text-black font-bold rounded-xl transition-opacity"
            >
              {t.exploreGames}
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
            {/* Wishlist Items */}
            <div className="lg:col-span-2 space-y-3 md:space-y-4">
              {wishlistItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-dark-secondary border border-border-primary rounded-xl p-3 md:p-4 hover:border-primary transition-colors group"
                >
                  <div className="flex gap-3 md:gap-4">
                    {/* Cover */}
                    <Link
                      href={`/game/${item.id}`}
                      className={`w-24 h-24 md:w-32 md:h-32 ${item.coverGradient} rounded-lg flex-shrink-0 group-hover:scale-105 transition-transform`}
                    />

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <Link href={`/game/${item.id}`}>
                        <h3 className="font-bold text-sm md:text-base mb-1 group-hover:text-primary transition-colors line-clamp-1">
                          {item.title}
                        </h3>
                      </Link>
                      <p className="text-xs md:text-sm text-gray-400 mb-2 line-clamp-1">{item.genre}</p>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-3">
                        <Star className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs md:text-sm font-semibold">{item.rating}</span>
                      </div>

                      {/* Price & Actions */}
                      <div className="flex items-end justify-between gap-2">
                        <div>
                          {item.discount && (
                            <div className="flex items-center gap-2 mb-1">
                              <span className="px-2 py-0.5 bg-primary text-black text-xs font-bold rounded">
                                -{item.discount}
                              </span>
                              <span className="text-xs text-gray-500 line-through">{item.originalPrice}</span>
                            </div>
                          )}
                          <div className="text-base md:text-lg font-bold text-primary">{item.price}</div>
                        </div>

                        <div className="flex gap-2">
                          <button className="p-2 bg-dark-elevated border border-border-primary hover:border-primary rounded-lg transition-colors">
                            <ShoppingCart className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => removeFromWishlist(item.id)}
                            className="p-2 bg-dark-elevated border border-red-500/50 hover:bg-red-500/10 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Sidebar */}
            <div className="space-y-4">
              {/* Wishlist Stats */}
              <div className="bg-dark-secondary border border-border-primary rounded-xl p-4 md:p-5">
                <h3 className="font-bold mb-4">{t.overview}</h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">{t.totalGames}</span>
                    <span className="font-semibold">{wishlistItems.length}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">{t.totalValue}</span>
                    <span className="font-semibold">{totalValue.toLocaleString()}₫</span>
                  </div>

                  {totalSavings > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">{t.totalSavings}</span>
                      <span className="font-semibold text-green-400">-{totalSavings.toLocaleString()}₫</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-border-primary my-4" />

                <button className="w-full py-3 bg-gradient-primary hover:opacity-90 text-black font-bold rounded-xl transition-opacity flex items-center justify-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  {t.buyAll}
                </button>
              </div>

              {/* Tips */}
              <div className="bg-dark-secondary border border-border-primary rounded-xl p-4">
                <h4 className="font-bold text-sm mb-3">💡 {t.tips}</h4>
                <ul className="space-y-2 text-xs text-gray-400">
                  <li>• {t.wishlistTips.tip1}</li>
                  <li>• {t.wishlistTips.tip2}</li>
                  <li>• {t.wishlistTips.tip3}</li>
                </ul>
              </div>

              {/* Share Wishlist */}
              <div className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/30 rounded-xl p-4">
                <h4 className="font-bold text-sm mb-2">{t.shareWishlist}</h4>
                <p className="text-xs text-gray-400 mb-3">
                  {t.shareWishlistDesc}
                </p>
                <button className="w-full py-2 bg-dark-elevated border border-border-primary hover:border-primary rounded-lg text-sm font-semibold transition-colors">
                  {t.createShareLink}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  )
}
