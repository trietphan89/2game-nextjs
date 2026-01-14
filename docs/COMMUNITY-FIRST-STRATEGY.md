# Community-First Growth Strategy
## 2GAME.SPACE - Chiến Lược Tăng Trưởng Cộng Đồng

**Version:** 1.0
**Date:** January 5, 2026
**Owner:** Growth & Community Teams
**Status:** Active - Phase 1 Implementation

---

## 🎯 STRATEGIC SHIFT: COMMUNITY-FIRST APPROACH

### Tại Sao Community-First?

**Old Approach (Rejected):**
❌ Launch cloud gaming → Attract users → Build community
❌ High upfront infrastructure cost
❌ No user base to justify investment

**New Approach (Approved):**
✅ Build community → Engage users → Monetize through content & ads
✅ Low upfront cost (content + UGC platform)
✅ Organic growth through Vietnamese game developers & publishers
✅ Revenue từ XTV Network advertising

---

## 📊 REVISED REVENUE MODEL (COMMUNITY-FIRST)

### Phase 1: Community Building (Q1-Q2 2026)

| Revenue Stream | Year 1 Target | Strategy | Priority |
|---------------|---------------|----------|----------|
| 🎮 **Game Sales Commission** | $500K | Onboard Vietnamese devs + International publishers | 🔴 **CRITICAL** |
| 📺 **XTV Network Advertising** | $350K | Integrate streaming + Ad revenue from game publishers | 🔴 **CRITICAL** |
| 💬 **User-Generated Content (UGC)** | $150K | Forums, reviews, guides, mods marketplace | 🔴 **HIGH** |
| 🎯 **Sponsored Content** | $200K | Game publisher promotions, launch events | 🔴 **HIGH** |
| 💳 **Transaction Fees** | $50K | Payment processing markup | 🟡 **MEDIUM** |
| **TOTAL PHASE 1** | **$1.25M** | **Focus: Grow to 500K MAU** | |

### Phase 2: Monetization Expansion (Q3-Q4 2026)

*Deploy ONLY when:*
- ✅ 500K+ Monthly Active Users
- ✅ 100+ Vietnamese games published
- ✅ 50+ International titles distributed
- ✅ Active community (10K+ daily forum posts)

| Revenue Stream | Deployment Trigger |
|---------------|-------------------|
| 🎥 **Creator Affiliate Program** | 500K MAU + 1,000 active content creators |
| ☁️ **Cloud Gaming** | 1M MAU + Partnership with ISPs |
| 💎 **Premium Subscriptions** | 500K MAU + proven value proposition |

---

## 🚀 PHASE 1 IMPLEMENTATION PLAN

### Milestone 1: Game Store Foundation (Week 1-4)

#### 1.1 Vietnamese Game Developer Onboarding

**Target: 50 Vietnamese indie games by end of Q1**

**Onboarding Flow:**
```
1. Developer applies via /developer portal
2. Submit game + metadata + screenshots
3. KYC verification (Business license, Tax ID)
4. Admin review (3-5 business days)
5. Game published → Revenue share starts
```

**Revenue Share Model:**
```typescript
interface RevenueShare {
  // For Vietnamese developers
  vietnameseDevs: {
    platformCommission: '15%',  // Lower than Steam's 30%
    developerRevenue: '85%',

    // Incentives for early adopters
    earlyAdopterBonus: {
      first50Games: '10% commission (90% to dev)', // First 50 games
      duration: '6 months',
      totalCost: '$25K subsidy'
    }
  }

  // For international publishers
  internationalPublishers: {
    platformCommission: '20%',
    publisherRevenue: '80%'
  }
}
```

**Top Priority Vietnamese Game Categories:**
1. **Mobile Games** (68% market share)
   - Casual games
   - Puzzle games
   - Hyper-casual

2. **PC Indie Games**
   - RPGs
   - Strategy
   - Visual Novels

3. **Educational Games**
   - Kids learning
   - Language learning
   - Skill development

**Developer Acquisition Tactics:**
```
✅ Partnership with game development schools (Arena Multimedia, FPT, RMIT)
✅ Sponsor hackathons & game jams
✅ Vietnamese Game Developer Association (VGDA) partnership
✅ DevTalk Vietnam community outreach
✅ Facebook Groups: "Vietnam Game Developer", "Unity Vietnam"
```

---

#### 1.2 International Publisher Partnerships

**Target: 20 international titles by end of Q1**

**Priority Publishers:**
1. **Indie Publishers** (easier to negotiate)
   - Devolver Digital
   - Team17
   - Humble Games
   - Raw Fury

2. **Asian Publishers** (regional advantage)
   - Tencent Games
   - NetEase
   - Garena
   - VNG Corporation

3. **AA Publishers**
   - Paradox Interactive
   - Focus Entertainment
   - THQ Nordic

**Partnership Model:**
```typescript
interface PublisherDeal {
  // Revenue share
  platformCommission: '20%',
  publisherRevenue: '80%',

  // Marketing support
  marketingPackage: {
    homepageBanner: 'Free for first 3 months',
    socialMediaPromotion: 'Included',
    communityEvents: 'Game launch events',
    xtvNetworkFeature: 'Streamer partnerships'
  },

  // Regional benefits
  regionalPricing: 'Vietnam-specific pricing (20-30% lower)',
  localPayments: 'MoMo, ZaloPay, Banking',
  vietnameseSupport: 'Community management + CS'
}
```

**Outreach Strategy:**
```
Week 1-2: Research + Contact list (100 publishers)
Week 3-4: Cold email campaign + LinkedIn outreach
Week 5-6: Follow-up + Pitch decks
Week 7-8: Negotiate contracts + Close first 5 deals
```

---

### Milestone 2: Community Engagement Platform (Week 5-8)

#### 2.1 Forums & Discussion System

**Database Schema:**
```prisma
model Forum {
  id          String   @id @default(cuid())
  name        String   // "General Discussion", "Game Help", "Trading"
  slug        String   @unique
  description String?
  icon        String?

  // Hierarchy
  parentId    String?
  parent      Forum?   @relation("Subforum", fields: [parentId], references: [id])
  subforums   Forum[]  @relation("Subforum")

  // Threads
  threads     Thread[]

  // Stats
  threadCount Int      @default(0)
  postCount   Int      @default(0)

  // Permissions
  viewPermission  ForumPermission @default(PUBLIC)
  postPermission  ForumPermission @default(AUTHENTICATED)

  // Moderation
  moderators  User[]   @relation("ForumModerator")

  order       Int      @default(0)
  active      Boolean  @default(true)
  createdAt   DateTime @default(now())
}

enum ForumPermission {
  PUBLIC         // Anyone can view
  AUTHENTICATED  // Must be logged in
  VIP            // VIP members only
  MODERATOR      // Moderators only
}

model Thread {
  id          String   @id @default(cuid())
  forumId     String
  forum       Forum    @relation(fields: [forumId], references: [id])

  // Author
  authorId    String
  author      User     @relation("ThreadAuthor", fields: [authorId], references: [id])

  // Content
  title       String
  content     String   @db.Text

  // Thread type
  type        ThreadType @default(DISCUSSION)

  // Tags
  tags        String[]
  gameId      String?  // If game-specific thread
  game        Game?    @relation(fields: [gameId], references: [id])

  // Stats
  views       Int      @default(0)
  posts       Post[]
  postCount   Int      @default(0)

  // Status
  pinned      Boolean  @default(false)
  locked      Boolean  @default(false)

  // Last activity
  lastPostAt  DateTime @default(now())
  lastPostBy  String?

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([forumId, lastPostAt])
  @@index([gameId])
}

enum ThreadType {
  DISCUSSION
  QUESTION
  GUIDE
  NEWS
  POLL
  TRADING
}

model Post {
  id          String   @id @default(cuid())
  threadId    String
  thread      Thread   @relation(fields: [threadId], references: [id])

  // Author
  authorId    String
  author      User     @relation("PostAuthor", fields: [authorId], references: [id])

  // Content
  content     String   @db.Text

  // Rich content
  attachments String[] // Image URLs
  videos      String[]

  // Interactions
  upvotes     Int      @default(0)
  downvotes   Int      @default(0)

  // Reply tracking
  replyToId   String?
  replyTo     Post?    @relation("PostReply", fields: [replyToId], references: [id])
  replies     Post[]   @relation("PostReply")

  // Moderation
  edited      Boolean  @default(false)
  editedAt    DateTime?
  deleted     Boolean  @default(false)
  deletedAt   DateTime?

  createdAt   DateTime @default(now())

  @@index([threadId, createdAt])
  @@index([authorId])
}
```

**Gamification:**
```typescript
interface ForumGamification {
  // User levels
  levels: {
    Newbie: '0-10 posts',
    Member: '11-50 posts',
    Active: '51-200 posts',
    Veteran: '201-500 posts',
    Legend: '500+ posts'
  },

  // Badges
  badges: {
    firstPost: 'Welcome to 2GAME!',
    helpfulMember: '50+ upvoted posts',
    guideWriter: 'Posted 5+ guides',
    bugHunter: 'Reported 10+ valid bugs',
    earlyAdopter: 'Joined in first month',
    vip: 'VIP subscriber'
  },

  // Reputation system
  reputation: {
    postCreated: +1,
    postUpvoted: +5,
    postDownvoted: -2,
    guidePublished: +50,
    helpfulAnswer: +10
  }
}
```

**Implementation:**
```
/app/community/page.tsx                     - Forum homepage
/app/community/[forumSlug]/page.tsx         - Forum threads list
/app/community/[forumSlug]/[threadId]/page.tsx - Thread detail + posts
/app/api/community/forums/route.ts          - List forums
/app/api/community/threads/route.ts         - Create, list threads
/app/api/community/posts/route.ts           - Create, update, delete posts
/components/community/ForumCard.tsx         - Forum display card
/components/community/ThreadCard.tsx        - Thread list item
/components/community/PostCard.tsx          - Post display
/components/community/RichTextEditor.tsx    - Post editor with markdown
/lib/community/permissions.ts               - Permission checking
/lib/community/moderation.ts                - Auto-moderation (spam detection)
```

---

#### 2.2 User Reviews & Ratings System

**Database Schema:**
```prisma
model GameReview {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  gameId      String
  game        Game     @relation(fields: [gameId], references: [id])

  // Rating (1-5 stars)
  rating      Int      // 1, 2, 3, 4, 5

  // Review content
  title       String?
  content     String   @db.Text

  // Playtime verification
  hoursPlayed Float?   // User's playtime when review written
  verified    Boolean  @default(false) // Verified purchase

  // Media
  screenshots String[] // User's screenshots

  // Helpfulness
  helpful     Int      @default(0) // Upvotes
  unhelpful   Int      @default(0) // Downvotes

  // Status
  edited      Boolean  @default(false)
  editedAt    DateTime?

  // Moderation
  flagged     Boolean  @default(false)
  flagCount   Int      @default(0)
  approved    Boolean  @default(true)

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@unique([userId, gameId]) // One review per user per game
  @@index([gameId, rating])
}

model ReviewHelpful {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  reviewId  String
  review    GameReview @relation(fields: [reviewId], references: [id])

  helpful   Boolean  // true = helpful, false = unhelpful

  createdAt DateTime @default(now())

  @@unique([userId, reviewId])
}
```

**Review Incentives:**
```typescript
interface ReviewRewards {
  // Points for writing reviews
  reviewBonus: {
    firstReview: 100,      // First review ever
    detailedReview: 50,    // 200+ characters
    withScreenshots: 25,   // Includes screenshots
    helpfulReview: 10      // Per upvote received
  },

  // Badges
  badges: {
    critic: 'Written 10+ reviews',
    topReviewer: 'Top 100 most helpful reviewers',
    earlyReviewer: 'Reviewed game within 24h of release'
  },

  // Visibility boost
  featured: {
    criteria: 'rating >= 4, helpful >= 10, length >= 200 chars',
    placement: 'Featured on game detail page'
  }
}
```

---

#### 2.3 User-Generated Content (UGC) Marketplace

**Content Types:**
```typescript
interface UGCContent {
  guides: {
    types: ['Tutorial', 'Strategy Guide', 'Walkthrough', 'Tips & Tricks'],
    pricing: 'Free or Paid (10K-50K VND)',
    revenue: 'Creator 70% / Platform 30%'
  },

  mods: {
    types: ['Gameplay Mod', 'Cosmetic Mod', 'UI Mod', 'Sound Mod'],
    pricing: 'Free or Paid (20K-100K VND)',
    revenue: 'Creator 70% / Platform 30%'
  },

  assets: {
    types: ['Character Skins', 'Maps', 'Sound Packs', 'Icon Packs'],
    pricing: 'Free or Paid (5K-50K VND)',
    revenue: 'Creator 70% / Platform 30%'
  },

  videos: {
    types: ['Gameplay', 'Review', 'Tutorial', 'Montage'],
    monetization: 'XTV Network ad revenue share'
  }
}
```

**Database Schema:**
```prisma
model UGCContent {
  id          String   @id @default(cuid())
  creatorId   String
  creator     User     @relation(fields: [creatorId], references: [id])

  // Content details
  type        UGCType
  title       String
  description String   @db.Text

  // Game association
  gameId      String?
  game        Game?    @relation(fields: [gameId], references: [id])

  // Files
  fileUrl     String   // Download URL (S3/R2)
  fileSize    BigInt   // Bytes
  thumbnailUrl String?
  previewUrls String[] // Screenshots/previews

  // Pricing
  price       Float    @default(0) // 0 = free

  // Stats
  downloads   Int      @default(0)
  views       Int      @default(0)
  rating      Float?
  reviewCount Int      @default(0)

  // Revenue (for paid content)
  totalRevenue Float   @default(0)

  // Status
  status      ContentStatus @default(PENDING)

  // Tags
  tags        String[]

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([gameId, type])
  @@index([creatorId])
}

enum UGCType {
  GUIDE
  MOD
  ASSET
  VIDEO
  SCREENSHOT
  SAVE_FILE
}

enum ContentStatus {
  PENDING   // Awaiting review
  APPROVED
  REJECTED
  DMCA      // Copyright claim
}

model UGCDownload {
  id          String   @id @default(cuid())
  contentId   String
  content     UGCContent @relation(fields: [contentId], references: [id])
  userId      String
  user        User     @relation(fields: [userId], references: [id])

  // Payment tracking (for paid content)
  paidAmount  Float?

  createdAt   DateTime @default(now())

  @@unique([contentId, userId])
}
```

**Revenue Projection:**
```typescript
const ugcRevenue = {
  // Conservative estimate
  year1: {
    activeCreators: 500,
    avgContentPerCreator: 3,
    totalContent: 1500,

    paid: {
      content: 300,               // 20% paid
      avgPrice: 30000,            // 30K VND
      avgDownloads: 50,
      revenue: 450000000,         // 450M VND
      platformShare: 135000000,   // 135M VND (30%)
      usd: 5400                   // $5.4K
    },

    free: {
      content: 1200,
      adRevenue: 144000000,       // 144M VND from XTV ads
      usd: 5760                   // $5.76K
    },

    total: '$11.16K/year Year 1'
  }
}
```

---

### Milestone 3: XTV Network Integration (Week 9-12)

#### 3.1 XTV Network Overview

**What is XTV Network?**
- Wetaps' streaming platform (competitor to YouTube Gaming, Facebook Gaming)
- Focus: Vietnamese gaming content
- Current status: Growing platform with monetization options

**Integration Benefits:**
```typescript
interface XTVIntegration {
  for2Game: {
    adRevenue: 'Share ad revenue from game-related streams',
    traffic: 'XTV viewers → 2GAME game sales',
    contentCreators: 'XTV streamers promote games',
    liveEvents: 'Game launches, tournaments on XTV'
  },

  forCreators: {
    monetization: 'Stream while playing 2GAME games',
    discovery: 'Featured on 2GAME homepage',
    rewards: 'Affiliate commissions from game sales',
    exclusive: 'Early access to new games'
  },

  forGamePublishers: {
    marketing: 'XTV influencer campaigns',
    launchEvents: 'Live stream game launches',
    tournaments: 'Esports tournaments on XTV',
    analytics: 'Stream viewership data'
  }
}
```

---

#### 3.2 Embedded XTV Player

**Technical Implementation:**
```typescript
// Game Detail Page - Live Streams Section
<section className="live-streams">
  <h2>Live Now - Playing {game.title}</h2>

  <div className="stream-grid">
    {liveStreams.map(stream => (
      <XTVStreamCard
        key={stream.id}
        streamId={stream.xtvStreamId}
        streamerName={stream.streamer.name}
        viewers={stream.viewerCount}
        thumbnail={stream.thumbnailUrl}
      />
    ))}
  </div>
</section>

// XTV Embed Component
function XTVPlayer({ streamId }: { streamId: string }) {
  return (
    <iframe
      src={`https://xtv.wetaps.com/embed/${streamId}`}
      width="100%"
      height="500px"
      allowFullScreen
      allow="autoplay; encrypted-media"
    />
  )
}
```

**Database Schema:**
```prisma
model XTVStream {
  id          String   @id @default(cuid())

  // XTV reference
  xtvStreamId String   @unique
  xtvChannelId String

  // Streamer
  streamerId  String
  streamer    User     @relation(fields: [streamerId], references: [id])

  // Game being played
  gameId      String?
  game        Game?    @relation(fields: [gameId], references: [id])

  // Stream details
  title       String
  thumbnailUrl String

  // Stats
  viewerCount Int      @default(0)
  peakViewers Int      @default(0)

  // Status
  isLive      Boolean  @default(true)

  // Timestamps
  startedAt   DateTime @default(now())
  endedAt     DateTime?

  @@index([gameId, isLive])
  @@index([streamerId])
}

model XTVAdRevenue {
  id          String   @id @default(cuid())

  // Stream reference
  streamId    String
  stream      XTVStream @relation(fields: [streamId], references: [id])

  // Game that was promoted
  gameId      String
  game        Game     @relation(fields: [gameId], references: [id])

  // Revenue details
  impressions Int      // Ad views
  clicks      Int      // Ad clicks
  revenue     Float    // VND

  // Revenue split
  xtvShare    Float    // 50%
  twoGameShare Float   // 30%
  streamerShare Float  // 20%

  // Period
  date        DateTime

  @@index([gameId, date])
}
```

---

#### 3.3 XTV Ad Revenue Model

**Revenue Share Structure:**
```typescript
interface XTVRevenueShare {
  // Ad revenue from game-related streams
  adRevenue: {
    total: '100%',
    split: {
      xtv: '50%',        // XTV Network platform
      twoGame: '30%',    // 2GAME platform (us!)
      streamer: '20%'    // Content creator
    }
  },

  // Game sales from stream traffic
  salesCommission: {
    streamerReferral: '5%',  // Streamer gets 5% of game sales
    twoGame: '15%'            // 2GAME takes 15% (total 20%)
  },

  // Example calculation
  example: {
    scenario: 'Streamer with 1,000 viewers plays Game X for 2 hours',
    adImpressions: 50000,
    cpm: 50000,              // 50K VND per 1000 impressions
    totalAdRevenue: 2500000, // 2.5M VND

    split: {
      xtv: 1250000,          // 1.25M VND
      twoGame: 750000,       // 750K VND (ours!)
      streamer: 500000       // 500K VND
    },

    gameSales: {
      viewers: 1000,
      conversionRate: '2%',
      buyers: 20,
      avgGamePrice: 200000,  // 200K VND
      totalSales: 4000000,   // 4M VND

      commission: {
        streamer: 200000,    // 5% = 200K VND
        twoGame: 600000      // 15% = 600K VND (ours!)
      }
    },

    total2GameRevenue: 1350000 // 750K + 600K = 1.35M VND per stream
  }
}
```

**Monthly Revenue Projection:**
```typescript
const xtvRevenueProjection = {
  month1: {
    activeStreamers: 50,
    avgStreamsPerDay: 100,
    avgViewersPerStream: 500,
    avgStreamDuration: 3, // hours

    adRevenue: {
      dailyImpressions: 500000,      // 100 streams × 500 viewers × 10 ads
      monthlyImpressions: 15000000,  // 30 days
      cpm: 50000,                    // 50K VND
      totalRevenue: 750000000,       // 750M VND
      twoGameShare: 225000000,       // 30% = 225M VND
      usd: 9000                      // ~$9K
    },

    salesCommission: {
      dailyConversions: 20,          // 2% of 1000 viewers
      monthlyConversions: 600,
      avgPurchase: 200000,           // 200K VND
      totalSales: 120000000,         // 120M VND
      commission: 18000000,          // 15% = 18M VND
      usd: 720                       // ~$720
    },

    totalMonthly: '$9,720',
    totalYearly: '$116,640'
  },

  month6: {
    activeStreamers: 200,
    monthlyRevenue: '$38,880',
    yearlyProjection: '$466,560'
  }
}
```

---

#### 3.4 XTV Integration Features

**Feature 1: "Go Live" Button**
```typescript
// Game Detail Page
<button
  onClick={() => startXTVStream(game.id)}
  className="btn-primary"
>
  <XTVIcon /> Go Live on XTV
</button>

async function startXTVStream(gameId: string) {
  // 1. Check if user has XTV account
  const xtvAccount = await checkXTVAccount(userId)

  if (!xtvAccount) {
    // Redirect to XTV signup with pre-fill
    window.location.href = `https://xtv.wetaps.com/signup?ref=2game&game=${gameId}`
    return
  }

  // 2. Create stream on XTV
  const stream = await xtvAPI.createStream({
    title: `Playing ${game.title} on 2GAME`,
    gameId: gameId,
    tags: ['gaming', '2game', game.genre]
  })

  // 3. Track in our database
  await db.xtvStream.create({
    data: {
      xtvStreamId: stream.id,
      streamerId: userId,
      gameId,
      title: stream.title,
      isLive: true
    }
  })

  // 4. Open XTV streaming software
  window.open(`xtv://start-stream/${stream.id}`, '_blank')
}
```

**Feature 2: Live Stream Discovery**
```typescript
// Homepage - Live Streams Widget
<section className="homepage-live">
  <h2>🔴 Live Now</h2>

  <div className="stream-carousel">
    {topStreams.map(stream => (
      <StreamCard
        key={stream.id}
        thumbnail={stream.thumbnailUrl}
        streamer={stream.streamer}
        game={stream.game}
        viewers={stream.viewerCount}
        onClick={() => watchStream(stream)}
      />
    ))}
  </div>
</section>

// Click → Opens XTV embedded player
function watchStream(stream: XTVStream) {
  // Option 1: Modal overlay
  openModal(
    <XTVPlayer streamId={stream.xtvStreamId} />
  )

  // Option 2: Redirect to XTV
  window.location.href = `https://xtv.wetaps.com/watch/${stream.xtvStreamId}`
}
```

**Feature 3: Streamer Dashboard**
```typescript
// /app/creator/xtv-dashboard/page.tsx
export default function XTVDashboard() {
  const stats = useXTVStats()

  return (
    <div className="xtv-dashboard">
      <h1>XTV Streaming Stats</h1>

      <div className="stats-grid">
        <Stat
          label="Total Streams"
          value={stats.totalStreams}
          change="+12.5%"
        />
        <Stat
          label="Total Views"
          value={stats.totalViews}
          change="+8.2%"
        />
        <Stat
          label="Ad Revenue (This Month)"
          value={formatVND(stats.adRevenue)}
          change="+15.3%"
        />
        <Stat
          label="Game Sales Commission"
          value={formatVND(stats.salesCommission)}
          change="+22.1%"
        />
      </div>

      <StreamHistory streams={stats.recentStreams} />
      <RevenueChart data={stats.revenueByMonth} />
    </div>
  )
}
```

---

### Milestone 4: Game Publisher Marketing Tools (Week 13-16)

#### 4.1 Publisher Dashboard

**Features:**
```typescript
interface PublisherDashboard {
  analytics: {
    totalSales: number,
    revenue: number,
    downloads: number,
    pageViews: number,
    conversionRate: number,

    // Demographics
    userDemographics: {
      age: Record<string, number>,
      gender: Record<string, number>,
      location: Record<string, number>
    },

    // Traffic sources
    trafficSources: {
      organic: number,
      social: number,
      xtvStreams: number,
      affiliates: number
    }
  },

  marketing: {
    // Homepage banner
    bannerSlots: {
      hero: 'Available slots: 2/week',
      sidebar: 'Available slots: 7/week',
      footer: 'Available slots: 14/week'
    },

    // Featured placement
    featuredGame: {
      homepage: '1 day = 100K VND',
      categoryPage: '1 day = 50K VND',
      searchResults: '1 day = 30K VND'
    },

    // XTV campaigns
    xtvInfluencer: {
      packages: [
        { tier: 'Micro (1K-10K followers)', price: '500K VND' },
        { tier: 'Mid (10K-100K followers)', price: '2M VND' },
        { tier: 'Macro (100K+ followers)', price: '10M VND' }
      ]
    },

    // Community events
    events: {
      gameLaunchEvent: '1M VND (includes XTV live stream)',
      weeklyTournament: '500K VND',
      monthlyContest: '2M VND'
    }
  },

  content: {
    // Press releases
    newsArticles: 'Publish on 2GAME news section',

    // Developer blogs
    blogPosts: 'Share development updates',

    // Community engagement
    ama: 'Schedule AMA (Ask Me Anything) sessions'
  }
}
```

---

## 📊 GROWTH METRICS & KPIs

### Phase 1 Targets (Q1-Q2 2026)

| Metric | Q1 Target | Q2 Target | How to Achieve |
|--------|-----------|-----------|----------------|
| **Monthly Active Users (MAU)** | 100K | 250K | Vietnamese game devs bring their audiences |
| **Daily Active Users (DAU)** | 20K | 60K | Forum engagement + XTV streams |
| **Games Published** | 50 VN + 20 Intl | 100 VN + 50 Intl | Developer outreach + publisher deals |
| **Forum Threads** | 5,000 | 15,000 | Gamification + rewards |
| **Forum Posts** | 25,000 | 100,000 | Active moderation + community events |
| **Game Reviews** | 10,000 | 40,000 | Review incentives (points, badges) |
| **XTV Streams (Daily)** | 100 | 300 | Streamer partnerships |
| **XTV Avg Viewers** | 500 | 1,500 | Featured placement + discovery |
| **UGC Content** | 500 | 2,000 | Marketplace + creator tools |

### Revenue Targets

| Q1 2026 | Q2 2026 | Q3 2026 | Q4 2026 | Year 1 Total |
|---------|---------|---------|---------|--------------|
| $150K | $300K | $450K | $600K | **$1.5M** |

**Breakdown by Source:**
- Game Sales (60%): $900K
- XTV Advertising (25%): $375K
- Sponsored Content (10%): $150K
- UGC Marketplace (3%): $45K
- Transaction Fees (2%): $30K

---

## 🎯 SUCCESS CRITERIA

### Must-Have Metrics (Phase 1)

✅ **100K MAU** by end of Q2 2026
✅ **50 Vietnamese games** published
✅ **20 international titles** onboarded
✅ **10,000+ daily forum posts**
✅ **100+ daily XTV streams** of 2GAME games
✅ **$300K monthly revenue** by end of Q2

### Quality Metrics

✅ **Forum engagement rate:** >15% (DAU/MAU)
✅ **Review quality:** Avg >4 stars, >200 chars
✅ **Stream-to-sale conversion:** >2%
✅ **UGC approval rate:** >80%
✅ **User retention (D7):** >40%

---

## 🚫 DELAYED TO PHASE 2

These features will ONLY launch when we hit **500K MAU**:

❌ Creator Affiliate Program
❌ Cloud Gaming
❌ Premium VIP Subscriptions
❌ Mobile Apps
❌ Advanced Analytics

**Rationale:**
- Need critical mass of users to justify infrastructure
- Community must be proven before monetizing heavily
- Focus: Grow organic engagement first

---

## 📋 IMPLEMENTATION CHECKLIST

### Week 1-4: Foundation
- [ ] Game publisher onboarding flow
- [ ] Vietnamese developer outreach campaign
- [ ] International publisher cold email templates
- [ ] Revenue share contract templates
- [ ] KYC/verification system

### Week 5-8: Community
- [ ] Forum system (database + UI)
- [ ] Review/rating system
- [ ] UGC marketplace
- [ ] Gamification (badges, levels)
- [ ] Moderation tools

### Week 9-12: XTV Integration
- [ ] XTV embedded player
- [ ] "Go Live" button integration
- [ ] Stream discovery feed
- [ ] Streamer dashboard
- [ ] Ad revenue tracking

### Week 13-16: Publisher Tools
- [ ] Publisher analytics dashboard
- [ ] Marketing tools (banners, featured placement)
- [ ] XTV influencer campaign manager
- [ ] Community event scheduler
- [ ] Press release CMS

---

**Next Steps:**
1. Review and approve this strategy
2. Assign teams to each milestone
3. Begin developer outreach (target: 50 games by Q1 end)
4. Set up XTV technical integration meeting with Wetaps team

**Questions to Address:**
- XTV API documentation available?
- Wetaps legal: Revenue share contract templates?
- Marketing: Budget for developer acquisition?
- Tech: Timeline for forum system implementation?
