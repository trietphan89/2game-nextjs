'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getGameBySlug } from '@/lib/mockCloudGames'
import CloudGameDetail from '@/components/cloud/CloudGameDetail'

export default function CloudGameDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const game = getGameBySlug(slug)

  if (!game) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Game Not Found</h1>
          <Link
            href="/cloud"
            className="text-[#ff6b35] hover:underline flex items-center gap-2 justify-center"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cloud Gaming
          </Link>
        </div>
      </div>
    )
  }

  return <CloudGameDetail game={game} />
}
