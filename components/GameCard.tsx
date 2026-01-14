import Link from 'next/link'
import { Star } from 'lucide-react'

interface GameCardProps {
  id: string
  title: string
  genre: string
  price: string
  originalPrice?: string
  discount?: string
  rating: number
  coverGradient: string
  coverImage?: string
}

export default function GameCard({
  id,
  title,
  genre,
  price,
  originalPrice,
  discount,
  rating,
  coverGradient,
  coverImage,
}: GameCardProps) {
  return (
    <Link
      href={`/game/${id}`}
      className="group bg-dark-secondary border border-border-primary rounded-xl overflow-hidden hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Cover Image */}
      <div
        className={`relative h-40 md:h-48 overflow-hidden ${!coverImage ? coverGradient : 'bg-gray-900'}`}
      >
        {coverImage && (
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
        {discount && (
          <div className="absolute top-2 right-2 bg-primary text-black text-xs font-bold px-2 py-1 rounded-lg z-10">
            -{discount}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 md:p-4">
        <h3 className="font-bold text-sm md:text-base mb-1 line-clamp-1 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-xs text-gray-400 mb-2">{genre}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <Star className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-xs md:text-sm font-semibold">{rating.toFixed(1)}</span>
          <span className="text-xs text-gray-400">/ 5.0</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          {originalPrice && (
            <span className="text-xs text-gray-500 line-through">{originalPrice}</span>
          )}
          <span className="text-base md:text-lg font-bold text-primary">{price}</span>
        </div>
      </div>
    </Link>
  )
}
