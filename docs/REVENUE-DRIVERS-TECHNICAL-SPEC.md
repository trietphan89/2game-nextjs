# Revenue Drivers & Technical Implementation Spec
## 2GAME.SPACE - Monetization Technical Documentation

**Version:** 1.0
**Date:** January 5, 2026
**Owner:** Product & Engineering Teams
**Related Docs:** BRD-2GAME-VN.md, PRD-2GAME-VN.md

---

## 📊 EXECUTIVE SUMMARY

This document provides detailed technical specifications for implementing all **8 revenue streams** identified in the BRD, with projected total Year 1 revenue of **$1.54M - $1.67M**.

### Quick Reference: Revenue Streams by Priority

| Priority | Revenue Stream | Year 1 Target | Implementation Status |
|----------|---------------|---------------|---------------------|
| 🔴 **CRITICAL** | Game Sales Commission | $700K-$825K | Q1 2026 - In Progress |
| 🔴 **CRITICAL** | Transaction Fees | $50K | Q1 2026 - In Progress |
| 🔴 **HIGH** | Creator Affiliate Program | $330K | Q1 2026 - 70% Complete |
| 🔴 **HIGH** | Premium Subscriptions | $1.008M | Q2 2026 - Not Started |
| 🟢 **CRITICAL** | Cloud Gaming | $492K | Q3 2026 - Not Started |
| 🟡 **MEDIUM** | IAP Commission | $144K | Q2 2026 - Not Started |
| 🟡 **MEDIUM** | Developer Publishing | $120K | Q2 2026 - 60% Complete |
| 🟡 **LOW** | Advertising | $111.6K | Q3 2026 - Not Started |

---

## 💰 REVENUE STREAM #1: GAME SALES COMMISSION

### Financial Target
- **Year 1 Revenue:** $700K - $825K (45% of total)
- **Commission Rate:** 15-20% depending on game type
- **Target GMV:** $4.5M

### Technical Requirements

#### 1.1 Shopping Cart System

**Database Schema:**
```prisma
model Cart {
  id        String   @id @default(cuid())
  userId    String   @unique
  user      User     @relation(fields: [userId], references: [id])
  items     CartItem[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model CartItem {
  id        String   @id @default(cuid())
  cartId    String
  cart      Cart     @relation(fields: [cartId], references: [id])
  gameId    String
  game      Game     @relation(fields: [gameId], references: [id])
  quantity  Int      @default(1)
  price     Float    // Price at time of adding
  discount  Float    @default(0)

  @@unique([cartId, gameId])
}
```

**API Endpoints:**
```typescript
// Add to cart
POST /api/cart/items
Body: { gameId: string, quantity?: number }
Response: { cart: Cart, message: string }

// Get cart
GET /api/cart
Response: { cart: Cart, subtotal: number, discount: number, total: number }

// Update quantity
PATCH /api/cart/items/:itemId
Body: { quantity: number }
Response: { cart: Cart }

// Remove from cart
DELETE /api/cart/items/:itemId
Response: { success: boolean }

// Clear cart
DELETE /api/cart
Response: { success: boolean }
```

**Implementation Files:**
```
/app/api/cart/route.ts           - GET, DELETE cart
/app/api/cart/items/route.ts     - POST add item
/app/api/cart/items/[id]/route.ts - PATCH, DELETE item
/app/cart/page.tsx               - Shopping cart UI
/components/cart/CartSidebar.tsx - Floating cart widget
/components/cart/CartItem.tsx    - Cart item component
/lib/cart.ts                     - Cart business logic
```

---

#### 1.2 Bundle Pricing Engine

**Algorithm:**
```typescript
interface BundleRule {
  id: string
  name: string // "3 for 2", "Buy 2 Get 10% off"
  type: 'quantity_based' | 'game_collection' | 'publisher_bundle'

  // Quantity based (3 for 2)
  minQuantity?: number
  freeQuantity?: number

  // Percentage discount
  discountPercent?: number

  // Specific games
  gameIds?: string[]

  // Time limited
  startDate?: Date
  endDate?: Date

  // Targeting
  targetUserTypes?: ('new' | 'returning' | 'vip')[]
  maxUsesPerUser?: number
}

// Bundle calculation logic
function calculateBundleDiscount(
  cartItems: CartItem[],
  bundles: BundleRule[]
): number {
  let totalDiscount = 0

  for (const bundle of bundles) {
    if (bundle.type === 'quantity_based') {
      const eligibleItems = cartItems.length
      const sets = Math.floor(eligibleItems / bundle.minQuantity)
      const freeItems = sets * bundle.freeQuantity
      const cheapestItems = cartItems
        .sort((a, b) => a.price - b.price)
        .slice(0, freeItems)
      totalDiscount += cheapestItems.reduce((sum, item) => sum + item.price, 0)
    }

    // Other bundle types...
  }

  return totalDiscount
}
```

**Database Schema:**
```prisma
model BundleRule {
  id                String   @id @default(cuid())
  name              String
  description       String?
  type              BundleType

  // Quantity rules
  minQuantity       Int?
  freeQuantity      Int?
  discountPercent   Float?

  // Game targeting
  gameIds           String[]
  publisherIds      String[]
  genreIds          String[]

  // Time constraints
  startDate         DateTime?
  endDate           DateTime?

  // Usage limits
  maxUsesPerUser    Int?
  maxTotalUses      Int?
  currentUses       Int      @default(0)

  // Targeting
  targetUserTypes   String[]
  minimumPurchase   Float?

  active            Boolean  @default(true)
  priority          Int      @default(0) // Higher = applied first

  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}

enum BundleType {
  QUANTITY_BASED      // Buy X Get Y free
  PERCENTAGE_DISCOUNT // Buy 2+ get 10% off
  FIXED_DISCOUNT      // $10 off when you buy 3
  GAME_COLLECTION     // Specific games bundle
  PUBLISHER_BUNDLE    // All games from publisher
  GENRE_BUNDLE        // All RPG games
}
```

**Implementation:**
```
/app/api/bundles/route.ts           - List active bundles
/app/api/bundles/calculate/route.ts - Calculate bundle discount for cart
/app/api/admin/bundles/route.ts     - CRUD bundle rules (admin)
/lib/bundles/calculator.ts          - Bundle calculation engine
/lib/bundles/rules.ts               - Bundle rule validation
/components/bundles/BundleBadge.tsx - "3 for 2" badge on game cards
/components/bundles/BundleModal.tsx - Bundle details modal
```

---

#### 1.3 Regional Pricing System

**Database Schema:**
```prisma
model Game {
  // ... existing fields
  basePrice        Float  // USD base price
  regionalPrices   RegionalPrice[]
}

model RegionalPrice {
  id        String   @id @default(cuid())
  gameId    String
  game      Game     @relation(fields: [gameId], references: [id])

  region    String   // 'VN', 'TH', 'ID', 'PH'
  price     Float    // Local currency
  currency  String   // 'VND', 'THB', 'IDR', 'PHP'

  // Auto-calculated from base price + region multiplier
  priceMultiplier Float @default(1.0)

  @@unique([gameId, region])
}

model RegionPricing {
  id              String   @id @default(cuid())
  region          String   @unique
  currency        String
  exchangeRate    Float    // USD to local currency
  priceMultiplier Float    // 0.7 = 30% cheaper than USD

  // Examples:
  // VN: priceMultiplier = 0.75 (25% cheaper)
  // TH: priceMultiplier = 0.80 (20% cheaper)
  // ID: priceMultiplier = 0.70 (30% cheaper)

  updatedAt       DateTime @updatedAt
}
```

**Pricing Logic:**
```typescript
function calculateRegionalPrice(
  baseUsdPrice: number,
  userRegion: string
): { price: number, currency: string, discount: number } {
  const regionConfig = await getRegionPricing(userRegion)

  const localPrice = baseUsdPrice * regionConfig.exchangeRate * regionConfig.priceMultiplier
  const roundedPrice = roundToLocalCurrency(localPrice, regionConfig.currency)

  const usdEquivalent = baseUsdPrice
  const discountPercent = (1 - regionConfig.priceMultiplier) * 100

  return {
    price: roundedPrice,
    currency: regionConfig.currency,
    discount: discountPercent
  }
}

function roundToLocalCurrency(price: number, currency: string): number {
  switch (currency) {
    case 'VND':
      return Math.round(price / 1000) * 1000 // Round to 1,000 VND
    case 'THB':
      return Math.round(price)
    case 'IDR':
      return Math.round(price / 100) * 100 // Round to 100 IDR
    default:
      return Math.round(price * 100) / 100
  }
}
```

---

#### 1.4 Flash Sales System

**Database Schema:**
```prisma
model FlashSale {
  id          String   @id @default(cuid())
  name        String
  description String?

  // Games included
  games       FlashSaleGame[]

  // Timing
  startTime   DateTime
  endTime     DateTime

  // Display
  bannerUrl   String?
  badgeText   String?  // "FLASH SALE", "24H ONLY"
  badgeColor  String?

  // Limits
  maxQuantity Int?     // Total units available
  soldCount   Int      @default(0)

  active      Boolean  @default(true)
  featured    Boolean  @default(false)

  createdAt   DateTime @default(now())
}

model FlashSaleGame {
  id          String   @id @default(cuid())
  flashSaleId String
  flashSale   FlashSale @relation(fields: [flashSaleId], references: [id])
  gameId      String
  game        Game     @relation(fields: [gameId], references: [id])

  discountPercent Float // 50, 70, 90
  maxQuantity     Int?  // Per-game limit
  soldCount       Int   @default(0)

  @@unique([flashSaleId, gameId])
}
```

**Real-time Features:**
```typescript
// WebSocket for live updates
io.on('connection', (socket) => {
  socket.on('join-flash-sale', (saleId: string) => {
    socket.join(`sale-${saleId}`)
  })
})

// When someone purchases
async function onFlashSalePurchase(saleId: string, gameId: string) {
  // Update sold count
  await incrementSoldCount(saleId, gameId)

  // Broadcast to all viewers
  io.to(`sale-${saleId}`).emit('sale-updated', {
    gameId,
    remainingQuantity: await getRemainingQuantity(saleId, gameId)
  })
}

// Countdown timer
function FlashSaleCountdown({ endTime }: { endTime: Date }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(endTime))

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(endTime))
    }, 1000)

    return () => clearInterval(timer)
  }, [endTime])

  return (
    <div className="flash-sale-countdown">
      <span>{timeLeft.hours}h</span>
      <span>{timeLeft.minutes}m</span>
      <span>{timeLeft.seconds}s</span>
    </div>
  )
}
```

**Implementation:**
```
/app/api/flash-sales/route.ts                - List active sales
/app/api/flash-sales/[id]/route.ts           - Get sale details
/app/api/flash-sales/[id]/claim/route.ts     - Add sale game to cart
/app/api/admin/flash-sales/route.ts          - CRUD sales (admin)
/app/flash-sales/page.tsx                    - Flash sales landing page
/components/flash-sales/FlashSaleBanner.tsx  - Homepage banner
/components/flash-sales/FlashSaleCard.tsx    - Game card with timer
/components/flash-sales/CountdownTimer.tsx   - Countdown component
/lib/flash-sales/scheduler.ts               - Cron job to activate/deactivate sales
```

---

## 💰 REVENUE STREAM #2: CREATOR AFFILIATE PROGRAM

### Financial Target
- **Year 1 Revenue:** $330K (21% of total)
- **Target Creators:** 10,000 across 4 tiers
- **GMV:** $4.6M

### Technical Requirements

#### 2.1 Affiliate Link Tracking System

**Database Schema:**
```prisma
model AffiliateLink {
  id          String   @id @default(cuid())
  creatorId   String
  creator     CreatorProfile @relation(fields: [creatorId], references: [id])

  // Link details
  code        String   @unique // "triet123", "phananh"
  fullUrl     String   // "https://2game.space/c/triet123"

  // Tracking
  gameIds     String[] // Empty = all games
  campaignId  String?
  campaign    Campaign? @relation(fields: [campaignId], references: [id])

  // Stats
  clicks      Int      @default(0)
  conversions Int      @default(0)
  revenue     Float    @default(0)
  commission  Float    @default(0)

  // Status
  active      Boolean  @default(true)
  expiresAt   DateTime?

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model AffiliateClick {
  id              String   @id @default(cuid())
  affiliateLinkId String
  affiliateLink   AffiliateLink @relation(fields: [affiliateLinkId], references: [id])

  // Visitor info
  ipAddress       String
  userAgent       String
  referrer        String?
  country         String?
  city            String?

  // Session tracking
  sessionId       String   // Cookie-based
  fingerprint     String   // Browser fingerprint

  // Conversion tracking
  converted       Boolean  @default(false)
  orderId         String?
  order           Order?   @relation(fields: [orderId], references: [id])

  createdAt       DateTime @default(now())

  @@index([affiliateLinkId])
  @@index([sessionId])
}

model AffiliateCommission {
  id          String   @id @default(cuid())
  creatorId   String
  creator     CreatorProfile @relation(fields: [creatorId], references: [id])

  // Order reference
  orderId     String
  order       Order    @relation(fields: [orderId], references: [id])

  // Commission details
  orderTotal  Float    // Order total amount
  commissionRate Float // 5%, 7%, 10%, 15%
  commissionAmount Float

  // Payout tracking
  status      CommissionStatus @default(PENDING)
  payoutId    String?
  payout      Payout?  @relation(fields: [payoutId], references: [id])

  createdAt   DateTime @default(now())
  paidAt      DateTime?
}

enum CommissionStatus {
  PENDING    // Order completed, waiting to confirm
  CONFIRMED  // Confirmed, eligible for payout
  PAID       // Included in payout
  CANCELLED  // Order refunded
}
```

**Tracking Flow:**
```typescript
// 1. User clicks affiliate link
GET /c/:affiliateCode

// Server-side redirect handler
export async function GET(req: Request, { params }: { params: { affiliateCode: string } }) {
  const { affiliateCode } = params
  const link = await getAffiliateLink(affiliateCode)

  if (!link || !link.active) {
    return redirect('/')
  }

  // Create click record
  await createAffiliateClick({
    affiliateLinkId: link.id,
    ipAddress: req.headers['x-forwarded-for'],
    userAgent: req.headers['user-agent'],
    referrer: req.headers['referer'],
    fingerprint: generateFingerprint(req)
  })

  // Set tracking cookie (30 days)
  const sessionId = generateSessionId()
  setCookie('affiliate_session', sessionId, { maxAge: 30 * 24 * 60 * 60 })
  setCookie('affiliate_code', affiliateCode, { maxAge: 30 * 24 * 60 * 60 })

  // Redirect to homepage or specific game
  const redirectUrl = link.gameIds.length === 1
    ? `/game/${link.gameIds[0]}`
    : '/'

  return redirect(redirectUrl)
}

// 2. When user makes purchase
async function onOrderCompleted(order: Order) {
  const affiliateCode = getCookie('affiliate_code')
  const sessionId = getCookie('affiliate_session')

  if (!affiliateCode || !sessionId) return

  // Find affiliate click
  const click = await findAffiliateClick({
    sessionId,
    converted: false
  })

  if (!click) return

  // Mark as converted
  await updateAffiliateClick(click.id, {
    converted: true,
    orderId: order.id
  })

  // Calculate commission
  const creator = await getCreator(click.affiliateLink.creatorId)
  const commissionRate = creator.commissionRate / 100 // 5% -> 0.05
  const commissionAmount = order.total * commissionRate

  // Create commission record
  await createAffiliateCommission({
    creatorId: creator.id,
    orderId: order.id,
    orderTotal: order.total,
    commissionRate: creator.commissionRate,
    commissionAmount,
    status: 'PENDING'
  })

  // Update creator stats
  await incrementCreatorStats(creator.id, {
    totalConversions: 1,
    totalRevenue: order.total,
    totalCommission: commissionAmount
  })
}
```

---

#### 2.2 Custom Creator Storefront

**Database Schema:**
```prisma
model CreatorStorefront {
  id          String   @id @default(cuid())
  creatorId   String   @unique
  creator     CreatorProfile @relation(fields: [creatorId], references: [id])

  // URL
  slug        String   @unique // "triet", "phananh"
  customDomain String?  @unique // "shop.trietphan.com"

  // Branding
  displayName String
  bio         String?  @db.Text
  logoUrl     String?
  bannerUrl   String?
  themeColor  String?  // Hex color

  // Social links
  youtube     String?
  facebook    String?
  tiktok      String?
  instagram   String?

  // Featured content
  featuredGames String[] // Game IDs
  collections    StorefrontCollection[]

  // SEO
  metaTitle       String?
  metaDescription String?

  // Analytics
  views       Int      @default(0)
  uniqueVisitors Int   @default(0)

  active      Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model StorefrontCollection {
  id            String   @id @default(cuid())
  storefrontId  String
  storefront    CreatorStorefront @relation(fields: [storefrontId], references: [id])

  name          String   // "My Favorite RPGs", "Best Budget Games"
  description   String?
  gameIds       String[]

  order         Int      @default(0)

  createdAt     DateTime @default(now())
}
```

**Storefront Page:**
```typescript
// /app/shop/[creatorSlug]/page.tsx
export default async function CreatorStorefrontPage({
  params
}: {
  params: { creatorSlug: string }
}) {
  const storefront = await getCreatorStorefront(params.creatorSlug)

  if (!storefront || !storefront.active) {
    notFound()
  }

  const featuredGames = await getGamesByIds(storefront.featuredGames)
  const collections = await getStorefrontCollections(storefront.id)

  return (
    <div className="storefront-page" style={{ '--theme-color': storefront.themeColor }}>
      {/* Hero banner */}
      <div className="storefront-hero">
        <img src={storefront.bannerUrl} alt="" />
        <div className="creator-info">
          <img src={storefront.logoUrl} alt={storefront.displayName} className="avatar" />
          <h1>{storefront.displayName}</h1>
          <p>{storefront.bio}</p>

          {/* Social links */}
          <div className="social-links">
            {storefront.youtube && <a href={storefront.youtube}><YouTubeIcon /></a>}
            {storefront.facebook && <a href={storefront.facebook}><FacebookIcon /></a>}
          </div>
        </div>
      </div>

      {/* Featured games */}
      <section className="featured-games">
        <h2>Featured Games</h2>
        <div className="game-grid">
          {featuredGames.map(game => (
            <GameCard
              key={game.id}
              game={game}
              affiliateCode={storefront.creator.affiliateCode}
            />
          ))}
        </div>
      </section>

      {/* Collections */}
      {collections.map(collection => (
        <section key={collection.id} className="collection">
          <h2>{collection.name}</h2>
          <p>{collection.description}</p>
          <GameGrid gameIds={collection.gameIds} affiliateCode={storefront.creator.affiliateCode} />
        </section>
      ))}
    </div>
  )
}
```

**Implementation:**
```
/app/api/creator/storefront/route.ts              - GET, PUT storefront
/app/api/creator/storefront/collections/route.ts  - CRUD collections
/app/shop/[creatorSlug]/page.tsx                  - Public storefront
/app/creator/storefront/edit/page.tsx             - Storefront editor (creator)
/components/creator/StorefrontBuilder.tsx         - Drag-drop builder UI
/components/creator/StorefrontPreview.tsx         - Live preview
```

---

## 💰 REVENUE STREAM #3: CLOUD GAMING SUBSCRIPTIONS

### Financial Target
- **Year 1 Revenue:** $492K (32% of total)
- **Target Users:** 57,000 (50K free, 5K basic, 2K pro)

### Technical Requirements

#### 3.1 Subscription Management

**Database Schema:**
```prisma
model Subscription {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])

  // Plan details
  plan        SubscriptionPlan
  status      SubscriptionStatus

  // Billing
  priceAtSubscription Float  // Lock in price
  billingCycle   BillingCycle
  currentPeriodStart DateTime
  currentPeriodEnd   DateTime

  // Payment
  paymentMethod   PaymentMethod
  lastPaymentId   String?
  nextBillingDate DateTime

  // Cancellation
  cancelAtPeriodEnd Boolean @default(false)
  canceledAt        DateTime?
  cancelReason      String?

  // Trial
  trialEnd          DateTime?

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([userId])
  @@index([status])
}

enum SubscriptionPlan {
  FREE_TIER        // Ad-supported, 480p
  BASIC_99K        // 1080p, no ads
  PRO_199K         // 4K, priority queue, exclusive games
}

enum SubscriptionStatus {
  ACTIVE
  PAST_DUE       // Payment failed
  CANCELED
  UNPAID
  TRIALING
}

enum BillingCycle {
  MONTHLY
  QUARTERLY     // 10% discount
  YEARLY        // 20% discount
}

model SubscriptionInvoice {
  id              String   @id @default(cuid())
  subscriptionId  String
  subscription    Subscription @relation(fields: [subscriptionId], references: [id])

  amount          Float
  status          InvoiceStatus

  // Payment
  paymentIntentId String?
  paidAt          DateTime?

  // Billing period
  periodStart     DateTime
  periodEnd       DateTime

  // PDF invoice
  invoiceUrl      String?

  createdAt       DateTime @default(now())
}

enum InvoiceStatus {
  DRAFT
  OPEN
  PAID
  VOID
  UNCOLLECTIBLE
}
```

**Subscription Flow:**
```typescript
// 1. Subscribe to plan
POST /api/subscriptions
Body: {
  plan: 'BASIC_99K' | 'PRO_199K',
  billingCycle: 'MONTHLY' | 'QUARTERLY' | 'YEARLY',
  paymentMethod: 'MOMO' | 'ZALOPAY' | 'BANKING',
  paymentDetails: { ... }
}

async function createSubscription(userId: string, data: SubscriptionData) {
  // Calculate trial end (7 days for Pro)
  const trialEnd = data.plan === 'PRO_199K'
    ? addDays(new Date(), 7)
    : null

  // Calculate first billing date
  const firstBillingDate = trialEnd || new Date()
  const periodEnd = addMonths(firstBillingDate, data.billingCycle === 'MONTHLY' ? 1 : data.billingCycle === 'QUARTERLY' ? 3 : 12)

  // Create subscription
  const subscription = await db.subscription.create({
    data: {
      userId,
      plan: data.plan,
      status: trialEnd ? 'TRIALING' : 'ACTIVE',
      priceAtSubscription: getPlanPrice(data.plan, data.billingCycle),
      billingCycle: data.billingCycle,
      currentPeriodStart: firstBillingDate,
      currentPeriodEnd: periodEnd,
      paymentMethod: data.paymentMethod,
      nextBillingDate: periodEnd,
      trialEnd
    }
  })

  // If no trial, charge immediately
  if (!trialEnd) {
    await chargeSubscription(subscription.id)
  }

  return subscription
}

// 2. Recurring billing (cron job)
async function processSubscriptionBilling() {
  const dueSubscriptions = await db.subscription.findMany({
    where: {
      nextBillingDate: { lte: new Date() },
      status: 'ACTIVE'
    }
  })

  for (const sub of dueSubscriptions) {
    try {
      await chargeSubscription(sub.id)

      // Update next billing date
      await db.subscription.update({
        where: { id: sub.id },
        data: {
          currentPeriodStart: sub.nextBillingDate,
          currentPeriodEnd: addMonths(sub.nextBillingDate, getBillingMonths(sub.billingCycle)),
          nextBillingDate: addMonths(sub.nextBillingDate, getBillingMonths(sub.billingCycle))
        }
      })
    } catch (error) {
      // Payment failed - mark as past due
      await db.subscription.update({
        where: { id: sub.id },
        data: { status: 'PAST_DUE' }
      })

      // Send payment failed email
      await sendPaymentFailedEmail(sub.userId)

      // Retry after 3 days
      await scheduleRetryPayment(sub.id, addDays(new Date(), 3))
    }
  }
}

// 3. Cancel subscription
async function cancelSubscription(subscriptionId: string, immediate: boolean = false) {
  if (immediate) {
    // Cancel immediately
    await db.subscription.update({
      where: { id: subscriptionId },
      data: {
        status: 'CANCELED',
        canceledAt: new Date()
      }
    })
  } else {
    // Cancel at end of period
    await db.subscription.update({
      where: { id: subscriptionId },
      data: {
        cancelAtPeriodEnd: true,
        canceledAt: new Date()
      }
    })
  }
}
```

**Implementation:**
```
/app/api/subscriptions/route.ts                - Create, list subscriptions
/app/api/subscriptions/[id]/route.ts           - Get, cancel subscription
/app/api/subscriptions/[id]/invoices/route.ts  - List invoices
/app/api/cron/billing/route.ts                 - Cron job for recurring billing
/app/settings/subscription/page.tsx            - Manage subscription UI
/components/subscriptions/PlanSelector.tsx     - Plan selection UI
/components/subscriptions/BillingHistory.tsx   - Invoice list
/lib/subscriptions/billing.ts                  - Billing logic
```

---

#### 3.2 Cloud Gaming Streaming Infrastructure

**Architecture:**
```
User's Browser (WebRTC Client)
    ↓
Load Balancer (CloudFlare)
    ↓
Signaling Server (WebSocket)
    ↓
Game Server Pool (Docker containers)
    ↓
GPU Instances (NVIDIA T4 / RTX 4000)
```

**Game Session Management:**
```prisma
model CloudGamingSession {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  gameId      String
  game        Game     @relation(fields: [gameId], references: [id])

  // Server allocation
  serverId    String
  serverIp    String
  serverPort  Int

  // Session details
  status      SessionStatus
  quality     StreamQuality

  // Usage tracking
  startedAt   DateTime @default(now())
  endedAt     DateTime?
  duration    Int?     // Seconds

  // Billing
  subscriptionId String?
  subscription   Subscription? @relation(fields: [subscriptionId], references: [id])

  @@index([userId])
  @@index([status])
}

enum SessionStatus {
  QUEUED
  ALLOCATING
  RUNNING
  ENDED
  ERROR
}

enum StreamQuality {
  LOW_480P     // Free tier
  MEDIUM_720P
  HIGH_1080P   // Basic tier
  ULTRA_4K     // Pro tier
}
```

**Session Allocation Logic:**
```typescript
async function allocateGameSession(userId: string, gameId: string): Promise<CloudGamingSession> {
  // 1. Check user subscription
  const subscription = await getUserSubscription(userId)

  if (!subscription || subscription.status !== 'ACTIVE') {
    throw new Error('No active subscription')
  }

  // 2. Determine quality based on plan
  const quality = getQualityForPlan(subscription.plan)

  // 3. Find available server
  const server = await findAvailableServer({
    region: getUserRegion(userId), // Prefer Vietnam servers
    minGpuMemory: getGpuRequirement(gameId, quality)
  })

  if (!server) {
    // Add to queue
    return await addToQueue(userId, gameId, quality)
  }

  // 4. Allocate Docker container
  const container = await docker.createContainer({
    image: `2game/game-${gameId}:latest`,
    env: {
      QUALITY: quality,
      USER_ID: userId,
      SESSION_ID: generateSessionId()
    },
    resources: {
      memory: getMemoryRequirement(gameId),
      gpus: 1
    }
  })

  await container.start()

  // 5. Get WebRTC connection details
  const connectionInfo = await getContainerConnectionInfo(container.id)

  // 6. Create session record
  const session = await db.cloudGamingSession.create({
    data: {
      userId,
      gameId,
      serverId: server.id,
      serverIp: connectionInfo.ip,
      serverPort: connectionInfo.port,
      status: 'RUNNING',
      quality,
      subscriptionId: subscription.id
    }
  })

  return session
}

// WebRTC signaling
io.on('connection', (socket) => {
  socket.on('start-game', async (data: { sessionId: string }) => {
    const session = await getSession(data.sessionId)

    // Send WebRTC offer
    const offer = await generateWebRTCOffer(session.serverIp, session.serverPort)
    socket.emit('webrtc-offer', offer)
  })

  socket.on('webrtc-answer', async (data: { sessionId: string, answer: RTCSessionDescription }) => {
    await forwardAnswerToGameServer(data.sessionId, data.answer)
  })

  socket.on('ice-candidate', async (data: { sessionId: string, candidate: RTCIceCandidate }) => {
    await forwardICECandidate(data.sessionId, data.candidate)
  })
})
```

**Implementation:**
```
/app/api/cloud-gaming/sessions/route.ts       - Create, list sessions
/app/api/cloud-gaming/sessions/[id]/route.ts  - Get, end session
/app/api/cloud-gaming/queue/route.ts          - Queue management
/app/cloud/play/[gameId]/page.tsx             - Cloud gaming player
/components/cloud/CloudPlayer.tsx             - WebRTC player component
/components/cloud/QueueStatus.tsx             - Queue position UI
/lib/cloud-gaming/allocator.ts                - Server allocation logic
/lib/cloud-gaming/webrtc.ts                   - WebRTC helper
/services/docker-manager.ts                   - Docker API wrapper
/services/game-servers.ts                     - Game server pool manager
```

---

## 💰 REVENUE STREAM #4: PREMIUM SUBSCRIPTIONS (2GAME VIP)

### Financial Target
- **Year 1 Revenue:** $1.008M (65% of total)
- **Target Users:** 12,000 (10K Premium + 2K VIP)

### Technical Requirements

**Database Schema:**
```prisma
model VIPSubscription {
  id          String   @id @default(cuid())
  userId      String   @unique
  user        User     @relation(fields: [userId], references: [id])

  tier        VIPTier
  status      SubscriptionStatus

  // Benefits
  discountPercent     Int      // 10% or 20%
  monthlyFreeGames    Int      // 2 or 4
  cloudGamingIncluded Boolean
  cloudGamingTier     StreamQuality?

  // Billing
  pricePerMonth      Float
  billingCycle       BillingCycle
  nextBillingDate    DateTime

  // Free games tracking
  claimedGamesThisMonth String[]
  lastClaimResetDate    DateTime

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

enum VIPTier {
  PREMIUM_149K  // 10% discount, 2 free indie games, Basic cloud gaming
  VIP_299K      // 20% discount, 1 AAA + 3 indie, Pro cloud gaming, 24/7 support
}

model MonthlyFreeGame {
  id          String   @id @default(cuid())
  month       String   // "2026-01"
  tier        VIPTier

  // Games available
  games       MonthlyFreeGameSlot[]

  active      Boolean  @default(true)
  createdAt   DateTime @default(now())

  @@unique([month, tier])
}

model MonthlyFreeGameSlot {
  id              String   @id @default(cuid())
  monthlyFreeGameId String
  monthlyFreeGame   MonthlyFreeGame @relation(fields: [monthlyFreeGameId], references: [id])
  gameId          String
  game            Game     @relation(fields: [gameId], references: [id])

  slot            Int      // 1, 2, 3, 4
  gameType        String   // "AAA", "Indie"

  @@unique([monthlyFreeGameId, slot])
}
```

**Free Games Claiming:**
```typescript
// Claim monthly free game
POST /api/vip/claim-free-game
Body: { gameId: string }

async function claimMonthlyFreeGame(userId: string, gameId: string) {
  const vipSub = await getVIPSubscription(userId)

  if (!vipSub || vipSub.status !== 'ACTIVE') {
    throw new Error('No active VIP subscription')
  }

  // Check if already claimed max games this month
  const currentMonth = format(new Date(), 'yyyy-MM')
  const claimedCount = vipSub.claimedGamesThisMonth.length

  if (claimedCount >= vipSub.monthlyFreeGames) {
    throw new Error('Already claimed all free games for this month')
  }

  // Verify game is in monthly selection
  const monthlyGames = await getMonthlyFreeGames(currentMonth, vipSub.tier)
  if (!monthlyGames.games.find(g => g.gameId === gameId)) {
    throw new Error('Game not in monthly selection')
  }

  // Add game to user's library
  await addGameToLibrary(userId, gameId, {
    source: 'VIP_FREE_GAME',
    monthClaimed: currentMonth
  })

  // Update subscription
  await db.vipSubscription.update({
    where: { id: vipSub.id },
    data: {
      claimedGamesThisMonth: {
        push: gameId
      }
    }
  })

  return { success: true }
}

// Reset free games every month (cron job)
async function resetMonthlyFreeGames() {
  const currentMonth = format(new Date(), 'yyyy-MM')

  await db.vipSubscription.updateMany({
    where: {
      status: 'ACTIVE'
    },
    data: {
      claimedGamesThisMonth: [],
      lastClaimResetDate: new Date()
    }
  })
}
```

**VIP Discount Application:**
```typescript
// Apply VIP discount at checkout
function calculateCheckoutTotal(cart: Cart, user: User) {
  const vipSub = user.vipSubscription
  let subtotal = cart.items.reduce((sum, item) => sum + item.price, 0)

  let discount = 0

  // Apply VIP discount
  if (vipSub && vipSub.status === 'ACTIVE') {
    discount = subtotal * (vipSub.discountPercent / 100)
  }

  // Apply bundle discounts
  const bundleDiscount = calculateBundleDiscount(cart.items)
  discount += bundleDiscount

  const total = subtotal - discount

  return {
    subtotal,
    vipDiscount: vipSub ? subtotal * (vipSub.discountPercent / 100) : 0,
    bundleDiscount,
    totalDiscount: discount,
    total
  }
}
```

**Implementation:**
```
/app/api/vip/subscribe/route.ts             - Subscribe to VIP
/app/api/vip/monthly-games/route.ts         - Get monthly free games
/app/api/vip/claim-free-game/route.ts       - Claim free game
/app/api/admin/vip/monthly-games/route.ts   - Set monthly games (admin)
/app/vip/page.tsx                           - VIP subscription landing
/app/vip/monthly-games/page.tsx             - Monthly free games selection
/components/vip/VIPBadge.tsx                - VIP badge component
/components/vip/MonthlyGameCard.tsx         - Free game claim card
/lib/vip/benefits.ts                        - VIP benefits calculator
```

---

## 💰 REVENUE STREAM #5-8: ADDITIONAL STREAMS

### Revenue Stream #5: IAP Commission
**Implementation:** Standard payment gateway integration with 15% commission tracking

### Revenue Stream #6: Developer Publishing
**Implementation:** Onboarding flow + marketing tools + managed service tier

### Revenue Stream #7: Advertising & Sponsorships
**Implementation:** Banner management system + sponsored content CMS

### Revenue Stream #8: Transaction Fees
**Implementation:** Payment gateway markup (1.5-2%) on top of gateway fees

---

## 📊 ANALYTICS & REPORTING

### Revenue Dashboard (Admin)

**Metrics to Track:**
```typescript
interface RevenueMetrics {
  // Overall
  totalRevenue: number
  gmv: number // Gross Merchandise Value

  // By stream
  byStream: {
    gameSales: number
    cloudGaming: number
    creators: number
    vip: number
    iap: number
    publishing: number
    advertising: number
    transactionFees: number
  }

  // Growth
  mom: number // Month-over-month %
  yoy: number // Year-over-year %

  // User metrics
  arppu: number // Average Revenue Per Paying User
  ltv: number   // Lifetime Value
  cac: number   // Customer Acquisition Cost

  // Conversion
  conversionRate: number
  cartAbandonmentRate: number
}
```

**Implementation:**
```
/app/api/admin/analytics/revenue/route.ts      - Revenue metrics API
/app/admin/analytics/revenue/page.tsx          - Revenue dashboard
/components/admin/RevenueChart.tsx             - Revenue charts
/components/admin/StreamBreakdown.tsx          - Stream breakdown
/lib/analytics/revenue.ts                      - Revenue calculation logic
```

---

## 🚀 IMPLEMENTATION ROADMAP

### Q1 2026 (Current) - CRITICAL REVENUE FOUNDATIONS

**Week 1-2:**
- ✅ Shopping Cart System
- ✅ Payment Gateway Integration (MoMo, ZaloPay)
- ✅ Order Management

**Week 3-4:**
- ✅ Affiliate Link Tracking
- ✅ Commission Calculation
- ✅ Payout Management

**Week 5-6:**
- ⏳ Bundle Pricing Engine
- ⏳ Regional Pricing
- ⏳ Flash Sales System

**Week 7-8:**
- Creator Storefront Builder
- VIP Subscription System
- Monthly Free Games

---

### Q2 2026 - SCALE & OPTIMIZE

**Month 1:**
- Cloud Gaming Beta (10 games)
- IAP Integration
- Developer Publishing Portal

**Month 2:**
- Advanced Analytics
- A/B Testing Framework
- Dynamic Pricing Engine

**Month 3:**
- Gift Card System
- Corporate Licensing
- Advertising Platform

---

### Q3 2026 - EXPAND & ENHANCE

- Cloud Gaming Full Launch (100+ games)
- Mobile Apps (iOS/Android)
- Esports Tournament Platform
- SEA Market Expansion

---

## 📈 SUCCESS METRICS

### Revenue KPIs

| Metric | Q1 Target | Q2 Target | Q3 Target | Q4 Target |
|--------|-----------|-----------|-----------|-----------|
| **Monthly Revenue** | $50K | $100K | $200K | $350K |
| **GMV** | $300K | $700K | $1.5M | $2.5M |
| **Paying Users** | 5K | 15K | 30K | 50K |
| **ARPPU** | $10 | $12 | $14 | $16 |
| **Conversion Rate** | 8% | 10% | 12% | 15% |

---

**Document Control:**
- Version: 1.0
- Last Updated: January 5, 2026
- Next Review: February 15, 2026
- Owner: Product & Engineering Teams
- Related Docs: BRD v2.0, PRD v1.0
