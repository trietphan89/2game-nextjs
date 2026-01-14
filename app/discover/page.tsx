'use client'

import { useState } from 'react'
import GameCard from '@/components/GameCard'
import { SlidersHorizontal, Grid, List } from 'lucide-react'
import { useLanguage } from '@/app/layout'

const allGames = [
  // ============== GAMES FROM RITOKEY.COM ==============
  {
    id: 'hollow-knight-silksong',
    title: 'Hollow Knight: Silksong',
    genre: 'Adventure',
    price: '749.000₫',
    rating: 4.9,
    coverImage: 'https://ex.hqwg.pro/storage/upload/service-config-Wi8xTjBUcHVpbm9rV001cVQ5MXFyUT09/44534/images/photo_2025-09-26_11-13-51.jpg',
    coverGradient: 'bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-800',
    category: 'RPG',
    releaseDate: '2024',
  },
  {
    id: 'elden-ring-shadow-erdtree',
    title: 'ELDEN RING Shadow of the Erdtree',
    genre: 'Action RPG',
    price: '1.999.000₫',
    originalPrice: '2.199.000₫',
    discount: '10%',
    rating: 4.8,
    coverImage: 'https://ex.hqwg.pro/storage/upload/images/el.webp',
    coverGradient: 'bg-gradient-to-br from-yellow-600 via-orange-700 to-gray-900',
    category: 'RPG',
    releaseDate: '2024',
  },
  {
    id: 'dying-light-2',
    title: 'Dying Light 2 Stay Human',
    genre: 'Action',
    price: '1.499.000₫',
    originalPrice: '1.999.000₫',
    discount: '25%',
    rating: 4.6,
    coverImage: 'https://ex.hqwg.pro/storage/upload/service-config-Wi8xTjBUcHVpbm9rV001cVQ5MXFyUT09/44559/images/Dying%20Light%202%20Stay%20Human%20Digital%20Extras%20Edition%20thump.webp',
    coverGradient: 'bg-gradient-to-br from-orange-600 via-red-700 to-gray-900',
    category: 'Action',
    releaseDate: '2022',
  },
  {
    id: 'dragon-ball-fighterz',
    title: 'Dragon Ball FighterZ',
    genre: 'Fighting',
    price: '374.000₫',
    originalPrice: '1.499.000₫',
    discount: '75%',
    rating: 4.7,
    coverImage: 'https://ex.hqwg.pro/storage/upload/service-config-Wi8xTjBUcHVpbm9rV001cVQ5MXFyUT09/44557/images/ezgif_com-webp-maker%20-%202025-10-03T144104_942.webp',
    coverGradient: 'bg-gradient-to-br from-orange-500 via-yellow-600 to-red-700',
    category: 'Action',
    releaseDate: '2018',
  },
  {
    id: 'dragon-ball-sparking-zero',
    title: 'DRAGON BALL: Sparking! ZERO',
    genre: 'Fighting',
    price: '2.124.000₫',
    originalPrice: '2.499.000₫',
    discount: '15%',
    rating: 4.8,
    coverImage: 'https://ex.hqwg.pro/storage/upload/service-config-Wi8xTjBUcHVpbm9rV001cVQ5MXFyUT09/44698/images/DRAGON%20BALL_%20Sparking!%20ZERO%20Ultimate%20Edition%20thump(1).webp',
    coverGradient: 'bg-gradient-to-br from-blue-600 via-orange-500 to-yellow-400',
    category: 'Action',
    releaseDate: '2024',
  },
  {
    id: 'hollow-knight',
    title: 'Hollow Knight',
    genre: 'Adventure',
    price: '374.000₫',
    rating: 4.9,
    coverImage: 'https://ex.hqwg.pro/storage/upload/service-config-Wi8xTjBUcHVpbm9rV001cVQ5MXFyUT09/44695/images/Hollow%20Knigh%20thump.webp',
    coverGradient: 'bg-gradient-to-br from-gray-800 via-blue-600 to-purple-700',
    category: 'RPG',
    releaseDate: '2017',
  },
  {
    id: 'marvels-spider-man',
    title: "Marvel's Spider-Man",
    genre: 'Action',
    price: '1.499.000₫',
    originalPrice: '1.874.000₫',
    discount: '20%',
    rating: 4.8,
    coverImage: 'https://ex.hqwg.pro/storage/upload/service-config-Wi8xTjBUcHVpbm9rV001cVQ5MXFyUT09/44652/images/Thumb%20Marvel_s%20Spider-Man.png',
    coverGradient: 'bg-gradient-to-br from-red-600 via-blue-700 to-gray-900',
    category: 'Action',
    releaseDate: '2022',
  },
  {
    id: 'sekiro-shadows-die-twice',
    title: 'Sekiro Shadows Die Twice',
    genre: 'Action',
    price: '749.000₫',
    originalPrice: '1.499.000₫',
    discount: '50%',
    rating: 4.7,
    coverImage: 'https://ex.hqwg.pro/storage/upload/service-config-Wi8xTjBUcHVpbm9rV001cVQ5MXFyUT09/44575/images/Sekiro%20Shadows%20Die%20Twice%20thump.webp',
    coverGradient: 'bg-gradient-to-br from-red-700 via-gray-800 to-black',
    category: 'Action',
    releaseDate: '2019',
  },
  {
    id: 'tcg-card-shop-simulator',
    title: 'TCG Card Shop Simulator',
    genre: 'Simulation',
    price: '499.000₫',
    originalPrice: '554.000₫',
    discount: '10%',
    rating: 4.5,
    coverImage: 'https://ex.hqwg.pro/storage/upload/service-config-Wi8xTjBUcHVpbm9rV001cVQ5MXFyUT09/44576/images/TCG%20Card%20Shop%20Simulator%20thump.webp',
    coverGradient: 'bg-gradient-to-br from-purple-600 via-pink-500 to-red-600',
    category: 'Simulation',
    releaseDate: '2024',
  },
  {
    id: 'cities-skylines-2',
    title: 'Cities: Skylines II - Ultimate Edition',
    genre: 'Strategy',
    price: '1.799.000₫',
    originalPrice: '2.249.000₫',
    discount: '20%',
    rating: 4.3,
    coverImage: 'https://ex.hqwg.pro/storage/upload/service-config-Wi8xTjBUcHVpbm9rV001cVQ5MXFyUT09/44696/images/Thumb(4).png',
    coverGradient: 'bg-gradient-to-br from-blue-500 via-cyan-600 to-green-600',
    category: 'Strategy',
    releaseDate: '2023',
  },
  {
    id: 'split-fiction',
    title: 'Split Fiction',
    genre: 'Adventure',
    price: '999.000₫',
    rating: 4.6,
    coverImage: 'https://ex.hqwg.pro/storage/upload/service-config-Wi8xTjBUcHVpbm9rV001cVQ5MXFyUT09/44555/images/Split%20Fiction%20thump.webp',
    coverGradient: 'bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-500',
    category: 'Action',
    releaseDate: '2024',
  },
  {
    id: 'kingdom-come-deliverance-2',
    title: 'Kingdom Come: Deliverance II',
    genre: 'RPG',
    price: '1.999.000₫',
    rating: 4.7,
    coverImage: 'https://ex.hqwg.pro/storage/upload/service-config-Wi8xTjBUcHVpbm9rV001cVQ5MXFyUT09/44542/images/Kingdom%20Come.png',
    coverGradient: 'bg-gradient-to-br from-gray-700 via-brown-600 to-yellow-700',
    category: 'RPG',
    releaseDate: '2024',
  },
  {
    id: 'diablo-4',
    title: 'Diablo® IV',
    genre: 'Action RPG',
    price: '1.399.000₫',
    originalPrice: '1.999.000₫',
    discount: '30%',
    rating: 4.4,
    coverImage: 'https://ex.hqwg.pro/storage/upload/images/Diablo%204%20Thump.webp',
    coverGradient: 'bg-gradient-to-br from-red-800 via-orange-700 to-black',
    category: 'RPG',
    releaseDate: '2023',
  },
  {
    id: 'tainted-grail',
    title: 'Tainted Grail: The Fall of Avalon',
    genre: 'RPG',
    price: '449.000₫',
    originalPrice: '749.000₫',
    discount: '40%',
    rating: 4.2,
    coverImage: 'https://ex.hqwg.pro/storage/upload/images/tainted%20grail%20thump.webp',
    coverGradient: 'bg-gradient-to-br from-green-700 via-teal-800 to-gray-900',
    category: 'RPG',
    releaseDate: '2023',
  },
  {
    id: 'nba-2k23',
    title: 'NBA 2K23',
    genre: 'Sports',
    price: '599.000₫',
    originalPrice: '1.499.000₫',
    discount: '60%',
    rating: 4.1,
    coverImage: 'https://ex.hqwg.pro/storage/upload/service-config-Wi8xTjBUcHVpbm9rV001cVQ5MXFyUT09/44917/images/Thump%20nba%202k23.webp',
    coverGradient: 'bg-gradient-to-br from-blue-700 via-red-600 to-orange-500',
    category: 'Sports',
    releaseDate: '2022',
  },
  // ============== ORIGINAL GAMES ==============
  {
    id: 'genshin-impact',
    title: 'Genshin Impact',
    genre: 'RPG',
    price: 'Miễn phí',
    rating: 4.8,
    coverImage: 'https://image.api.playstation.com/vulcan/ap/rnd/202508/2602/30935168a0f21b6710dc2bd7bb37c23ed937fb9fa747d84c.png',
    coverGradient: 'bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500',
    category: 'RPG',
    releaseDate: '2020',
  },
  {
    id: 'pubg-mobile',
    title: 'PUBG Mobile',
    genre: 'Battle Royale',
    price: 'Miễn phí',
    rating: 4.5,
    coverImage: 'https://m.media-amazon.com/images/M/MV5BODQzNzJjY2QtY2Y2YS00OWJmLTlkZWMtMmNmMmE2NTg1MjQzXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    coverGradient: 'bg-gradient-to-br from-orange-600 via-gray-800 to-black',
    category: 'Action',
    releaseDate: '2018',
  },
  {
    id: 'honkai-star-rail',
    title: 'Honkai: Star Rail',
    genre: 'RPG',
    price: 'Miễn phí',
    rating: 4.6,
    coverImage: 'https://image.api.playstation.com/vulcan/ap/rnd/202308/1103/8c3ce3611a4bb187418bb5e24924a055ba33d3046a7aaacb.png',
    coverGradient: 'bg-gradient-to-br from-yellow-500 via-red-600 to-gray-900',
    category: 'RPG',
    releaseDate: '2023',
  },
  {
    id: 'league-of-legends',
    title: 'League of Legends',
    genre: 'MOBA',
    price: 'Miễn phí',
    rating: 4.7,
    coverImage: 'https://i.imgur.com/I9JF3mh.jpeg',
    coverGradient: 'bg-gradient-to-br from-red-600 via-orange-500 to-yellow-400',
    category: 'Strategy',
    releaseDate: '2009',
  },
  {
    id: 'valorant',
    title: 'Valorant',
    genre: 'FPS',
    price: 'Miễn phí',
    rating: 4.6,
    coverImage: 'https://upload.wikimedia.org/wikipedia/en/b/ba/Valorant_cover.jpg',
    coverGradient: 'bg-gradient-to-br from-red-600 via-black to-gray-900',
    category: 'Action',
    releaseDate: '2020',
  },
  {
    id: 'minecraft',
    title: 'Minecraft',
    genre: 'Sandbox',
    price: '599.000₫',
    rating: 4.8,
    coverImage: 'https://upload.wikimedia.org/wikipedia/vi/4/48/%E1%BA%A2nh_b%C3%ACa_Minecraft.png',
    coverGradient: 'bg-gradient-to-br from-green-600 via-lime-500 to-green-400',
    category: 'Simulation',
    releaseDate: '2011',
  },
  {
    id: 'black-myth-wukong',
    title: 'Black Myth: Wukong',
    genre: 'Action RPG',
    price: '1.199.000₫',
    originalPrice: '1.399.000₫',
    discount: '14%',
    rating: 4.9,
    coverImage: 'https://assets-prd.ignimgs.com/2024/08/18/blackmyth-1723969364570.jpg',
    coverGradient: 'bg-gradient-to-br from-orange-600 via-red-500 to-yellow-500',
    category: 'RPG',
    releaseDate: '2024',
  },
  {
    id: 'cyberpunk-2077',
    title: 'Cyberpunk 2077',
    genre: 'Action',
    price: '1.299.000₫',
    originalPrice: '1.799.000₫',
    discount: '28%',
    rating: 4.6,
    coverImage: 'https://upload.wikimedia.org/wikipedia/vi/9/9f/Cyberpunk_2077_box_art.jpg',
    coverGradient: 'bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700',
    category: 'Action',
    releaseDate: '2020',
  },
  {
    id: 'elden-ring',
    title: 'Elden Ring',
    genre: 'Action RPG',
    price: '1.499.000₫',
    rating: 4.9,
    coverImage: 'https://m.media-amazon.com/images/M/MV5BMWNlMDBiYzYtMWMyMC00Zjc5LTlhMjItMjRlMzBmYmVkOGM0XkEyXkFqcGc@._V1_QL75_UY281_CR4,0,190,281_.jpg',
    coverGradient: 'bg-gradient-to-br from-gray-800 via-yellow-600 to-orange-500',
    category: 'Action',
    releaseDate: '2022',
  },
  {
    id: 'lies-of-p',
    title: 'Lies of P',
    genre: 'Action',
    price: '899.000₫',
    rating: 4.7,
    coverImage: 'https://upload.wikimedia.org/wikipedia/en/d/de/Lies_of_p_cover_art.jpg',
    coverGradient: 'bg-gradient-to-br from-gray-700 via-purple-800 to-blue-900',
    category: 'Action',
    releaseDate: '2023',
  },
  {
    id: 'baldurs-gate-3',
    title: "Baldur's Gate 3",
    genre: 'RPG',
    price: '1.399.000₫',
    rating: 4.9,
    coverImage: 'https://image.api.playstation.com/vulcan/ap/rnd/202302/2321/ba706e54d68d10a0eb6ab7c36cdad9178c58b7fb7bb03d28.png',
    coverGradient: 'bg-gradient-to-br from-purple-900 via-red-700 to-orange-500',
    category: 'RPG',
    releaseDate: '2023',
  },
  {
    id: 'the-witcher-3',
    title: 'The Witcher 3: Wild Hunt',
    genre: 'RPG',
    price: '299.000₫',
    originalPrice: '699.000₫',
    discount: '57%',
    rating: 4.9,
    coverImage: 'https://upload.wikimedia.org/wikipedia/vi/e/e2/Bia_TheWitcher3.jpg',
    coverGradient: 'bg-gradient-to-br from-gray-800 via-red-900 to-black',
    category: 'RPG',
    releaseDate: '2015',
  },
  {
    id: 'forza-horizon-5',
    title: 'Forza Horizon 5',
    genre: 'Racing',
    price: '1.199.000₫',
    rating: 4.8,
    coverImage: 'https://upload.wikimedia.org/wikipedia/en/8/86/Forza_Horizon_5_cover_art.jpg',
    coverGradient: 'bg-gradient-to-br from-yellow-500 via-orange-500 to-red-600',
    category: 'Sports',
    releaseDate: '2021',
  },
  {
    id: 'monster-hunter-world',
    title: 'Monster Hunter World',
    genre: 'Action RPG',
    price: '699.000₫',
    rating: 4.7,
    coverImage: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1b/Monster_Hunter_World_cover_art.jpg/250px-Monster_Hunter_World_cover_art.jpg',
    coverGradient: 'bg-gradient-to-br from-green-600 via-emerald-500 to-teal-400',
    category: 'RPG',
    releaseDate: '2018',
  },
  {
    id: 'red-dead-redemption-2',
    title: 'Red Dead Redemption 2',
    genre: 'Action',
    price: '1.199.000₫',
    rating: 4.8,
    coverImage: 'https://image.api.playstation.com/cdn/UP1004/CUSA03041_00/Hpl5MtwQgOVF9vJqlfui6SDB5Jl4oBSq.png',
    coverGradient: 'bg-gradient-to-br from-orange-800 via-red-700 to-yellow-600',
    category: 'Action',
    releaseDate: '2019',
  },
  {
    id: 'star-wars-outlaws',
    title: 'Star Wars Outlaws',
    genre: 'Action Adventure',
    price: '1.599.000₫',
    rating: 4.5,
    coverImage: 'https://game.intel.com/wp-content/uploads/2024/04/Star-Wars-Outlaws.png',
    coverGradient: 'bg-gradient-to-br from-blue-900 via-purple-800 to-black',
    category: 'Action',
    releaseDate: '2024',
  },
  {
    id: 'street-fighter-6',
    title: 'Street Fighter 6',
    genre: 'Fighting',
    price: '1.299.000₫',
    rating: 4.7,
    coverImage: 'https://upload.wikimedia.org/wikipedia/en/9/94/Street_Fighter_6_box_art.jpg',
    coverGradient: 'bg-gradient-to-br from-red-600 via-purple-700 to-blue-800',
    category: 'Action',
    releaseDate: '2023',
  },
  {
    id: 'apex-legends',
    title: 'Apex Legends',
    genre: 'Battle Royale',
    price: 'Miễn phí',
    rating: 4.6,
    coverImage: 'https://upload.wikimedia.org/wikipedia/en/d/db/Apex_legends_cover.jpg',
    coverGradient: 'bg-gradient-to-br from-orange-600 via-red-700 to-purple-800',
    category: 'Action',
    releaseDate: '2019',
  },
]

export default function DiscoverPage() {
  const { t } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedPrice, setSelectedPrice] = useState('All')
  const [sortBy, setSortBy] = useState('Popular')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)

  const categories = [t.all, 'RPG', 'Action', 'Strategy', 'Sports', 'Simulation']
  const priceRanges = [t.priceAll, t.priceFree, t.priceUnder100k, t.price100to150k, t.price150to200k, t.price200plus]
  const sortOptions = [t.sortPopular, t.sortNewest, t.sortPriceLowHigh, t.sortPriceHighLow, t.sortRating]

  const filteredGames = allGames
    .filter(game => selectedCategory === 'All' || game.category === selectedCategory)
    .filter(game => {
      if (selectedPrice === 'All') return true
      if (selectedPrice === 'Free') return game.price === 'Miễn phí'
      // Add price filtering logic
      return true
    })

  return (
    <>
      <main className="max-w-7xl mx-auto px-3 md:px-4 pb-20 md:pb-8">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{t.discoverPageTitle}</h1>
          <p className="text-sm md:text-base text-gray-400">
            {t.discoverPageDesc.replace('{count}', allGames.length.toString())}
          </p>
        </div>

        {/* Filters Bar */}
        <div className="bg-dark-secondary border border-border-primary rounded-xl p-3 md:p-4 mb-4 md:mb-6">
          <div className="flex items-center justify-between gap-3 mb-3 md:mb-0">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-dark-elevated border border-border-primary rounded-lg text-sm"
            >
              <SlidersHorizontal className="w-4 h-4" />
              {t.filters}
            </button>

            {/* Desktop Filters */}
            <div className="hidden md:flex items-center gap-3 flex-1 flex-wrap">
              {/* Category */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 bg-dark-elevated border border-border-primary rounded-lg text-sm focus:outline-none focus:border-primary"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              {/* Price */}
              <select
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                className="px-4 py-2 bg-dark-elevated border border-border-primary rounded-lg text-sm focus:outline-none focus:border-primary"
              >
                {priceRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-dark-elevated border border-border-primary rounded-lg text-sm focus:outline-none focus:border-primary"
              >
                {sortOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* View Toggle */}
            <div className="flex gap-1 bg-dark-elevated border border-border-primary rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'grid' ? 'bg-primary text-black' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'list' ? 'bg-primary text-black' : 'text-gray-400 hover:text-white'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mobile Filters Dropdown */}
          {showFilters && (
            <div className="md:hidden mt-3 space-y-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 bg-dark-elevated border border-border-primary rounded-lg text-sm"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{t.category}: {cat}</option>
                ))}
              </select>

              <select
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                className="w-full px-4 py-2 bg-dark-elevated border border-border-primary rounded-lg text-sm"
              >
                {priceRanges.map(range => (
                  <option key={range} value={range}>{t.price}: {range}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 bg-dark-elevated border border-border-primary rounded-lg text-sm"
              >
                {sortOptions.map(option => (
                  <option key={option} value={option}>{t.sortBy}: {option}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-gray-400">
          {t.showingGames.replace('{count}', filteredGames.length.toString())}
        </div>

        {/* Games Grid */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {filteredGames.map((game) => (
              <GameCard key={game.id} {...game} />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredGames.map((game) => (
              <div
                key={game.id}
                className="bg-dark-secondary border border-border-primary rounded-xl p-4 hover:border-primary transition-colors"
              >
                <div className="flex gap-4">
                  <div className={`w-24 h-24 md:w-32 md:h-32 ${game.coverGradient} rounded-lg flex-shrink-0`} />
                  <div className="flex-1">
                    <h3 className="font-bold text-base md:text-lg mb-1">{game.title}</h3>
                    <p className="text-xs md:text-sm text-gray-400 mb-2">{game.genre}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-gray-500">⭐ {game.rating}</span>
                      {game.discount && (
                        <span className="px-2 py-0.5 bg-primary text-black text-xs font-bold rounded">
                          -{game.discount}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {game.originalPrice && (
                        <span className="text-xs text-gray-500 line-through">{game.originalPrice}</span>
                      )}
                      <span className="text-base md:text-lg font-bold text-primary">{game.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  )
}
