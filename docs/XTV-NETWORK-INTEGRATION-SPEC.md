# XTV Network Integration - Technical Specification
## 2GAME.SPACE ↔ XTV Network Revenue Partnership

**Version:** 1.0
**Date:** January 5, 2026
**Owner:** Engineering & Partnerships Team
**Stakeholders:** 2GAME (Wetaps), XTV Network (Wetaps)

---

## 🎯 INTEGRATION OVERVIEW

### What is XTV Network?

**XTV Network** is Wetaps' live streaming platform for gaming content, positioned as Vietnam's answer to Twitch/YouTube Gaming.

**Key Stats (Current):**
- Platform: Web + Mobile (iOS/Android)
- Monthly Active Users: 500K+
- Daily Streamers: 1,000+
- Average Concurrent Viewers: 10K+
- Content Focus: Gaming (80%), Esports (15%), IRL (5%)

**Business Model:**
- Ad-supported (pre-roll, mid-roll ads)
- Streamer subscriptions (viewers pay streamers)
- Virtual gifts (viewers send tips)
- Sponsored content

---

## 💰 REVENUE OPPORTUNITY

### Integration Benefits for 2GAME

| Benefit | Impact | Revenue Potential |
|---------|--------|-------------------|
| **Ad Revenue Share** | XTV shares ad revenue from game-related streams | **$350K Year 1** |
| **Traffic Acquisition** | XTV viewers → 2GAME game buyers | 2% conversion = $200K GMV |
| **Content Marketing** | Free marketing via streamers | Save $50K in marketing spend |
| **Community Engagement** | Live streams increase DAU/MAU | +15% user retention |
| **Publisher Value** | Offer streaming as publisher benefit | Attract more publishers |

---

### Ad Revenue Model

```typescript
interface XTVAdRevenueShare {
  // How ads work
  adTypes: {
    preRoll: 'Before stream starts (5-15 seconds)',
    midRoll: 'During stream (every 30 minutes)',
    display: 'Banner ads on stream page',
    sponsoredSegment: 'Streamer mentions sponsor'
  },

  // Revenue calculation
  calculation: {
    impressions: 'Number of ad views',
    cpm: '50,000 VND per 1,000 impressions', // Vietnam CPM rate
    fillRate: '80%', // 80% of impressions get ads

    example: {
      stream: {
        viewers: 1000,
        duration: '3 hours',
        adsPerHour: 4,
        totalAds: 12
      },
      calculation: {
        impressions: '1,000 viewers × 12 ads = 12,000 impressions',
        revenue: '12,000 / 1,000 × 50,000 VND = 600,000 VND',
        fillRate: '600,000 × 80% = 480,000 VND actual',
        usd: '480,000 / 25,000 = $19.2'
      }
    }
  },

  // Revenue split
  revenueShare: {
    total: '100%',
    xtv: '50%',        // XTV Network platform
    twoGame: '30%',    // 2GAME (us!)
    streamer: '20%',   // Content creator

    conditions: {
      eligibility: 'Only for streams tagged with 2GAME games',
      minimum: 'Streamer must have >100 concurrent viewers',
      verification: 'Game must be listed on 2GAME store'
    }
  }
}
```

---

### Monthly Revenue Projection

**Conservative Estimate (Q1 2026):**
```typescript
const xtvRevenueForecast = {
  month1: {
    // Assumptions
    twoGameStreamers: 50,
    avgStreamsPerDay: 100,
    avgViewersPerStream: 500,
    avgDuration: 3,

    // Ad calculations
    dailyImpressions: 500000,      // 100 streams × 500 viewers × 10 ads
    monthlyImpressions: 15000000,  // 30 days
    cpm: 50000,
    fillRate: 0.8,

    totalAdRevenue: 600000000,     // 600M VND
    twoGameShare: 180000000,       // 30% = 180M VND
    usd: 7200,                     // ~$7.2K/month

    // Game sales from streams
    viewerConversions: {
      totalViewers: 1500000,       // 50K viewers/day × 30 days
      conversionRate: 0.02,        // 2%
      buyers: 30000,
      avgPurchase: 150000,         // 150K VND
      gmv: 4500000000,             // 4.5B VND
      commission: 675000000,       // 15% = 675M VND
      usd: 27000                   // $27K/month
    },

    totalMonthly: 34200,           // $7.2K + $27K = $34.2K
    totalYearly: 410400            // $34.2K × 12 = $410K
  },

  month6: {
    twoGameStreamers: 200,
    avgStreamsPerDay: 300,
    totalMonthly: 85500,           // $85.5K/month
    totalYearly: 1026000           // $1.026M/year
  }
}
```

---

## 🔌 TECHNICAL INTEGRATION

### Phase 1: Basic Integration (Week 1-2)

#### 1.1 XTV Player Embed

**Goal:** Embed XTV live streams on 2GAME game pages

**Implementation:**
```typescript
// Component: /components/xtv/XTVPlayer.tsx
'use client'

import { useEffect, useRef } from 'react'

interface XTVPlayerProps {
  streamId: string
  autoplay?: boolean
  muted?: boolean
  width?: string | number
  height?: string | number
}

export function XTVPlayer({
  streamId,
  autoplay = false,
  muted = true,
  width = '100%',
  height = 500
}: XTVPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    // Track stream view
    fetch('/api/xtv/track-view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ streamId })
    })
  }, [streamId])

  return (
    <div className="xtv-player-container">
      <iframe
        ref={iframeRef}
        src={`https://xtv.wetaps.com/embed/${streamId}?autoplay=${autoplay ? 1 : 0}&muted=${muted ? 1 : 0}`}
        width={width}
        height={height}
        frameBorder="0"
        allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
        allowFullScreen
        className="rounded-xl"
      />

      {/* Overlay with game info */}
      <div className="xtv-overlay">
        <button className="btn-primary">Buy Game</button>
      </div>
    </div>
  )
}
```

**Usage on Game Detail Page:**
```typescript
// /app/game/[slug]/page.tsx
export default async function GameDetailPage({ params }) {
  const game = await getGame(params.slug)
  const liveStreams = await getXTVLiveStreams(game.id)

  return (
    <div>
      {/* Game info */}
      <GameHeader game={game} />

      {/* Live streams section */}
      {liveStreams.length > 0 && (
        <section className="mt-12">
          <h2 className="text-3xl font-bold mb-6">
            🔴 Live Now - {liveStreams.length} streamers playing
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {liveStreams.map(stream => (
              <div key={stream.id} className="stream-card">
                <XTVPlayer streamId={stream.xtvStreamId} height={300} />

                <div className="stream-info p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={stream.streamer.avatar}
                      alt={stream.streamer.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">{stream.streamer.name}</h3>
                      <p className="text-sm text-gray-400">
                        {stream.viewerCount.toLocaleString()} viewers
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
```

---

#### 1.2 XTV API Integration

**API Endpoints Required:**

```typescript
// XTV Network API (provided by Wetaps)
interface XTVAPIEndpoints {
  // Get live streams for a game
  GET_LIVE_STREAMS: {
    url: 'https://api.xtv.wetaps.com/v1/streams/live',
    query: {
      game_id: string,        // 2GAME game ID
      limit: number,          // Default 10
      sort: 'viewers_desc'    // Sort by viewers
    },
    response: {
      streams: Array<{
        id: string,
        channel_id: string,
        title: string,
        thumbnail: string,
        viewer_count: number,
        started_at: string,
        streamer: {
          id: string,
          username: string,
          avatar: string,
          follower_count: number
        }
      }>,
      total: number
    }
  },

  // Get stream details
  GET_STREAM: {
    url: 'https://api.xtv.wetaps.com/v1/streams/{stream_id}',
    response: {
      stream: {
        id: string,
        status: 'live' | 'offline',
        game: {
          id: string,
          name: string,
          box_art_url: string
        },
        // ... other details
      }
    }
  },

  // Track stream view (for analytics)
  POST_VIEW: {
    url: 'https://api.xtv.wetaps.com/v1/streams/{stream_id}/views',
    body: {
      viewer_id: string,      // 2GAME user ID
      source: '2game_embed',  // Traffic source
      referrer: string        // Game page URL
    },
    response: {
      success: boolean
    }
  },

  // Get ad revenue data (admin only)
  GET_AD_REVENUE: {
    url: 'https://api.xtv.wetaps.com/v1/analytics/ad-revenue',
    query: {
      start_date: string,     // YYYY-MM-DD
      end_date: string,
      game_ids: string[]      // Filter by games
    },
    response: {
      total_impressions: number,
      total_revenue: number,  // VND
      breakdown: Array<{
        game_id: string,
        impressions: number,
        revenue: number
      }>
    }
  }
}
```

**Our API Wrapper:**
```typescript
// /lib/xtv/api.ts
import { cache } from 'react'

const XTV_API_URL = process.env.XTV_API_URL || 'https://api.xtv.wetaps.com/v1'
const XTV_API_KEY = process.env.XTV_API_KEY

export class XTVClient {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${XTV_API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${XTV_API_KEY}`,
        'Content-Type': 'application/json',
        ...options?.headers
      }
    })

    if (!response.ok) {
      throw new Error(`XTV API error: ${response.statusText}`)
    }

    return response.json()
  }

  // Get live streams for a game
  getLiveStreams = cache(async (gameId: string, limit = 10) => {
    return this.request<XTVLiveStreamsResponse>(
      `/streams/live?game_id=${gameId}&limit=${limit}&sort=viewers_desc`
    )
  })

  // Track stream view
  async trackView(streamId: string, viewerId: string, referrer: string) {
    return this.request(`/streams/${streamId}/views`, {
      method: 'POST',
      body: JSON.stringify({
        viewer_id: viewerId,
        source: '2game_embed',
        referrer
      })
    })
  }

  // Get ad revenue (admin only)
  async getAdRevenue(startDate: string, endDate: string, gameIds?: string[]) {
    const params = new URLSearchParams({
      start_date: startDate,
      end_date: endDate
    })

    if (gameIds) {
      gameIds.forEach(id => params.append('game_ids', id))
    }

    return this.request<XTVAdRevenueResponse>(
      `/analytics/ad-revenue?${params.toString()}`
    )
  }
}

export const xtvClient = new XTVClient()
```

---

#### 1.3 Database Schema

```prisma
// Track XTV streams on 2GAME
model XTVStream {
  id          String   @id @default(cuid())

  // XTV reference
  xtvStreamId String   @unique
  xtvChannelId String

  // Streamer (2GAME user)
  streamerId  String?
  streamer    User?    @relation(fields: [streamerId], references: [id])

  // Game being played
  gameId      String
  game        Game     @relation(fields: [gameId], references: [id])

  // Stream details
  title       String
  thumbnailUrl String?

  // Stats
  viewerCount    Int      @default(0)
  peakViewers    Int      @default(0)
  totalViews     Int      @default(0)
  avgWatchTime   Int      @default(0) // Seconds

  // Status
  status      XTVStreamStatus @default(LIVE)

  // Timestamps
  startedAt   DateTime @default(now())
  endedAt     DateTime?

  // Relations
  views       XTVStreamView[]
  purchases   XTVStreamPurchase[]

  @@index([gameId, status])
  @@index([streamerId])
  @@index([startedAt])
}

enum XTVStreamStatus {
  LIVE
  ENDED
  ERROR
}

// Track individual stream views
model XTVStreamView {
  id          String   @id @default(cuid())

  streamId    String
  stream      XTVStream @relation(fields: [streamId], references: [id])

  // Viewer
  userId      String?
  user        User?    @relation(fields: [userId], references: [id])

  // Session tracking
  sessionId   String   // Browser fingerprint
  ipAddress   String
  userAgent   String
  referrer    String?

  // Watch time
  startedAt   DateTime @default(now())
  endedAt     DateTime?
  duration    Int?     // Seconds

  @@index([streamId])
  @@index([userId])
}

// Track game purchases from stream traffic
model XTVStreamPurchase {
  id          String   @id @default(cuid())

  streamId    String
  stream      XTVStream @relation(fields: [streamId], references: [id])

  // Purchase
  orderId     String
  order       Order    @relation(fields: [orderId], references: [id])

  // Attribution
  viewSessionId String // Matches XTVStreamView.sessionId

  // Revenue
  orderAmount Float
  commission  Float    // 15% to 2GAME

  createdAt   DateTime @default(now())

  @@index([streamId])
  @@index([orderId])
}

// Track ad revenue from XTV
model XTVAdRevenue {
  id          String   @id @default(cuid())

  // Period
  date        DateTime // Daily aggregation
  gameId      String
  game        Game     @relation(fields: [gameId], references: [id])

  // Ad metrics
  impressions Int      @default(0)
  clicks      Int      @default(0)
  cpm         Float    // VND per 1000 impressions

  // Revenue (VND)
  totalRevenue     Float
  xtvShare         Float    // 50%
  twoGameShare     Float    // 30%
  streamerShare    Float    // 20%

  // Metadata
  streamCount Int      // Number of streams that day

  createdAt   DateTime @default(now())

  @@unique([date, gameId])
  @@index([gameId, date])
}
```

---

### Phase 2: Advanced Features (Week 3-4)

#### 2.1 "Go Live" Button

**Feature:** Allow 2GAME users to start streaming directly from game pages

```typescript
// Component: /components/xtv/GoLiveButton.tsx
'use client'

import { useState } from 'react'
import { XTVIcon } from './icons'

export function GoLiveButton({ game }: { game: Game }) {
  const [isConnecting, setIsConnecting] = useState(false)

  const handleGoLive = async () => {
    setIsConnecting(true)

    try {
      // 1. Check if user has XTV account
      const xtvAccount = await fetch('/api/xtv/check-account').then(r => r.json())

      if (!xtvAccount.connected) {
        // Redirect to XTV OAuth
        window.location.href = `/api/xtv/connect?game=${game.id}&redirect=${window.location.href}`
        return
      }

      // 2. Create stream on XTV
      const stream = await fetch('/api/xtv/create-stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gameId: game.id,
          title: `Playing ${game.title} on 2GAME`
        })
      }).then(r => r.json())

      // 3. Open streaming software
      // Option A: Deep link to XTV desktop app
      window.location.href = `xtv://start-stream/${stream.id}`

      // Option B: Open XTV web studio
      window.open(`https://xtv.wetaps.com/studio/stream/${stream.id}`, '_blank')

    } catch (error) {
      console.error('Failed to start stream:', error)
      alert('Failed to start stream. Please try again.')
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <button
      onClick={handleGoLive}
      disabled={isConnecting}
      className="btn-secondary flex items-center gap-2"
    >
      <XTVIcon className="w-5 h-5" />
      {isConnecting ? 'Connecting...' : 'Go Live on XTV'}
    </button>
  )
}
```

**API Endpoints:**
```typescript
// /app/api/xtv/connect/route.ts
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const gameId = searchParams.get('game')
  const redirect = searchParams.get('redirect')

  // Build XTV OAuth URL
  const oauthUrl = new URL('https://xtv.wetaps.com/oauth/authorize')
  oauthUrl.searchParams.set('client_id', process.env.XTV_CLIENT_ID!)
  oauthUrl.searchParams.set('redirect_uri', `${process.env.NEXT_PUBLIC_URL}/api/xtv/callback`)
  oauthUrl.searchParams.set('scope', 'stream:create stream:manage')
  oauthUrl.searchParams.set('state', JSON.stringify({ gameId, redirect }))

  return Response.redirect(oauthUrl.toString())
}

// /app/api/xtv/callback/route.ts
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')
  const state = JSON.parse(searchParams.get('state') || '{}')

  // Exchange code for access token
  const tokenResponse = await fetch('https://xtv.wetaps.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: process.env.XTV_CLIENT_ID,
      client_secret: process.env.XTV_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code'
    })
  }).then(r => r.json())

  // Store XTV access token for user
  await db.user.update({
    where: { id: getUserId(req) },
    data: {
      xtvAccessToken: tokenResponse.access_token,
      xtvRefreshToken: tokenResponse.refresh_token,
      xtvChannelId: tokenResponse.channel_id
    }
  })

  // Redirect back
  return Response.redirect(state.redirect || '/')
}

// /app/api/xtv/create-stream/route.ts
export async function POST(req: Request) {
  const { gameId, title } = await req.json()
  const userId = getUserId(req)

  const user = await db.user.findUnique({ where: { id: userId } })

  if (!user?.xtvAccessToken) {
    return Response.json({ error: 'XTV not connected' }, { status: 401 })
  }

  // Create stream on XTV
  const xtvStream = await fetch('https://api.xtv.wetaps.com/v1/streams', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${user.xtvAccessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title,
      game_id: gameId,
      tags: ['2game', 'gaming']
    })
  }).then(r => r.json())

  // Track in our database
  const stream = await db.xtvStream.create({
    data: {
      xtvStreamId: xtvStream.id,
      xtvChannelId: user.xtvChannelId!,
      streamerId: userId,
      gameId,
      title,
      status: 'LIVE'
    }
  })

  return Response.json({ stream })
}
```

---

#### 2.2 Streamer Dashboard

**Page:** `/app/creator/xtv/page.tsx`

```typescript
export default async function XTVDashboard() {
  const user = await getCurrentUser()
  const stats = await getXTVStats(user.id)

  return (
    <div className="xtv-dashboard max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold">XTV Streaming</h1>
          <p className="text-gray-400 mt-2">
            Earn revenue from streaming 2GAME games
          </p>
        </div>

        {user.xtvAccessToken ? (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm text-gray-400">Connected as</p>
              <p className="font-semibold">{user.xtvUsername}</p>
            </div>
            <button className="btn-secondary">
              Disconnect XTV
            </button>
          </div>
        ) : (
          <button className="btn-primary">
            Connect XTV Account
          </button>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard
          label="Total Streams"
          value={stats.totalStreams}
          change="+12.5%"
          icon={<VideoIcon />}
        />
        <StatCard
          label="Total Views"
          value={stats.totalViews.toLocaleString()}
          change="+8.2%"
          icon={<EyeIcon />}
        />
        <StatCard
          label="Ad Revenue (This Month)"
          value={formatVND(stats.adRevenue)}
          change="+15.3%"
          icon={<DollarIcon />}
        />
        <StatCard
          label="Game Sales Commission"
          value={formatVND(stats.salesCommission)}
          change="+22.1%"
          icon={<ShoppingIcon />}
        />
      </div>

      {/* Recent Streams */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Recent Streams</h2>

        <div className="space-y-4">
          {stats.recentStreams.map(stream => (
            <div key={stream.id} className="bg-zinc-900 rounded-xl p-6 flex items-center gap-6">
              <img
                src={stream.game.thumbnail}
                alt={stream.game.title}
                className="w-24 h-24 rounded-lg object-cover"
              />

              <div className="flex-1">
                <h3 className="font-semibold text-lg">{stream.title}</h3>
                <p className="text-gray-400 text-sm">
                  {stream.game.title} • {formatDate(stream.startedAt)}
                </p>

                <div className="flex items-center gap-6 mt-3 text-sm">
                  <div>
                    <span className="text-gray-400">Peak Viewers:</span>{' '}
                    <span className="font-semibold">{stream.peakViewers.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Duration:</span>{' '}
                    <span className="font-semibold">{formatDuration(stream.duration)}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Ad Revenue:</span>{' '}
                    <span className="font-semibold text-green-400">
                      {formatVND(stream.adRevenue)}
                    </span>
                  </div>
                </div>
              </div>

              <button className="btn-secondary">
                View Analytics
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Revenue Chart */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Revenue Over Time</h2>
        <RevenueChart data={stats.revenueByMonth} />
      </section>
    </div>
  )
}
```

---

### Phase 3: Analytics & Reporting (Week 5-6)

#### 3.1 Admin Analytics Dashboard

**Page:** `/app/admin/xtv-analytics/page.tsx`

```typescript
export default async function XTVAnalytics() {
  const stats = await getXTVAnalytics()

  return (
    <div className="admin-xtv-analytics">
      <h1 className="text-4xl font-bold mb-8">XTV Network Analytics</h1>

      {/* Overview Stats */}
      <div className="grid grid-cols-4 gap-6 mb-12">
        <MetricCard
          title="Total Streams (This Month)"
          value={stats.totalStreams}
          trend="+23.5%"
        />
        <MetricCard
          title="Total Ad Impressions"
          value={stats.totalImpressions.toLocaleString()}
          trend="+18.2%"
        />
        <MetricCard
          title="Total Ad Revenue"
          value={formatVND(stats.totalRevenue)}
          subtitle={`2GAME Share: ${formatVND(stats.twoGameShare)}`}
          trend="+31.8%"
        />
        <MetricCard
          title="Stream → Sale Conversion"
          value={`${stats.conversionRate.toFixed(2)}%`}
          trend="+0.3%"
        />
      </div>

      {/* Top Games by Stream Views */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Top Games by Stream Performance</h2>

        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="text-left p-4">Game</th>
              <th className="text-right p-4">Streams</th>
              <th className="text-right p-4">Total Views</th>
              <th className="text-right p-4">Avg Viewers</th>
              <th className="text-right p-4">Ad Revenue</th>
              <th className="text-right p-4">Game Sales</th>
            </tr>
          </thead>
          <tbody>
            {stats.topGames.map(game => (
              <tr key={game.id} className="border-b border-zinc-800/50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={game.thumbnail} className="w-12 h-12 rounded" />
                    <span className="font-semibold">{game.title}</span>
                  </div>
                </td>
                <td className="text-right p-4">{game.streamCount}</td>
                <td className="text-right p-4">{game.totalViews.toLocaleString()}</td>
                <td className="text-right p-4">{game.avgViewers}</td>
                <td className="text-right p-4 text-green-400">
                  {formatVND(game.adRevenue)}
                </td>
                <td className="text-right p-4 text-blue-400">
                  {formatVND(game.salesFromStreams)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Top Streamers */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Top Streamers</h2>

        <div className="grid grid-cols-3 gap-6">
          {stats.topStreamers.map(streamer => (
            <div key={streamer.id} className="bg-zinc-900 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={streamer.avatar}
                  alt={streamer.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-lg">{streamer.name}</h3>
                  <p className="text-sm text-gray-400">
                    {streamer.followerCount.toLocaleString()} followers
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Streams:</span>
                  <span className="font-semibold">{streamer.totalStreams}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Avg Viewers:</span>
                  <span className="font-semibold">{streamer.avgViewers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Revenue Generated:</span>
                  <span className="font-semibold text-green-400">
                    {formatVND(streamer.totalRevenue)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
```

---

## 📋 IMPLEMENTATION CHECKLIST

### Week 1: Basic Integration
- [ ] Get XTV API access credentials
- [ ] Implement XTV player embed component
- [ ] Fetch live streams for game pages
- [ ] Track stream views
- [ ] Add "Go Live" button (UI only, no connection)

### Week 2: OAuth & Stream Creation
- [ ] XTV OAuth flow
- [ ] Create stream API endpoint
- [ ] Store XTV tokens in database
- [ ] Test stream creation
- [ ] Deep link to XTV desktop app

### Week 3: Analytics Foundation
- [ ] Database schema for stream tracking
- [ ] Track stream views
- [ ] Track stream → game purchases
- [ ] Basic streamer dashboard

### Week 4: Revenue Tracking
- [ ] XTV ad revenue API integration
- [ ] Calculate revenue shares
- [ ] Store daily ad revenue data
- [ ] Display revenue in streamer dashboard

### Week 5: Admin Tools
- [ ] Admin analytics dashboard
- [ ] Top games by stream performance
- [ ] Top streamers report
- [ ] Revenue reports (CSV export)

### Week 6: Polish & Launch
- [ ] UI/UX improvements
- [ ] Mobile responsiveness
- [ ] Performance optimization
- [ ] Beta testing with 10 streamers
- [ ] Public launch

---

## 🎯 SUCCESS METRICS

### Integration Quality
- ✅ XTV player load time: <2 seconds
- ✅ OAuth success rate: >95%
- ✅ Stream creation success rate: >90%
- ✅ API uptime: >99.9%

### Business Metrics
- ✅ Month 1: 50 active streamers
- ✅ Month 3: 200 active streamers
- ✅ Stream → sale conversion: >2%
- ✅ Monthly ad revenue: >$7K

---

**Next Steps:**
1. Schedule kickoff meeting with XTV Network team
2. Request API documentation & credentials
3. Set up development environment
4. Begin Phase 1 implementation

**Contact:**
- XTV Network Team: xtv-dev@wetaps.com
- API Support: api-support@wetaps.com
