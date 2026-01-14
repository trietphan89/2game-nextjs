# Product Requirements Document (PRD)
## 2GAME.VN - Vietnamese Game Commerce Platform

**Version:** 1.0
**Date:** January 3, 2026
**Product Manager:** Wetaps Product Team
**Engineering Lead:** Wetaps Engineering Team

---

## TABLE OF CONTENTS

1. [Product Overview](#1-product-overview)
2. [Technical Architecture](#2-technical-architecture)
3. [Feature Specifications](#3-feature-specifications)
4. [User Stories](#4-user-stories)
5. [Technical Requirements](#5-technical-requirements)
6. [API Specifications](#6-api-specifications)
7. [Database Schema](#7-database-schema)
8. [UI/UX Specifications](#8-uiux-specifications)
9. [Testing Requirements](#9-testing-requirements)
10. [Deployment & DevOps](#10-deployment--devops)

---

## 1. PRODUCT OVERVIEW

### 1.1 Product Positioning

2GAME.VN is a **dual-sided marketplace platform** that connects:
- **Supply Side:** Game developers, publishers, content creators
- **Demand Side:** Vietnamese gamers seeking localized payment options

**Unique Value Propositions:**
1. **For Gamers:** Vietnamese payment methods, lower prices, local support
2. **For Creators:** Revenue share programs, creator tools, Vietnamese audience
3. **For Developers:** Low commission (15-20%), marketing support, local expertise

### 1.2 Product Scope

**In Scope (MVP - Q1 2026):**
- User authentication & authorization
- Game catalog browsing & discovery
- Shopping cart & checkout (Payment integration)
- My Account dashboard
- Creator Center (Dashboard + Affiliate links)
- Developer Center (Game submission)
- Admin CMS (Dashboard, Games management)
- Basic analytics

**Out of Scope (MVP):**
- Cloud gaming streaming
- Mobile applications
- Advanced analytics
- Web3/NFT features
- International expansion
- Live streaming (XTV Network)

### 1.3 Target Users

**Primary Personas:**

**1. Gamer Nguyễn (Age 22, Student)**
- Wants: Affordable games, Vietnamese payment, trusted platform
- Pain Points: Can't use credit cards, Steam pricing too high
- Success Metric: Purchases 3+ games/month

**2. Creator Anh (Age 25, Gaming YouTuber)**
- Wants: Earn passive income, easy affiliate links
- Pain Points: Limited Vietnamese monetization platforms
- Success Metric: Earns 10M+ VND/month

**3. Developer Minh (Age 30, Indie Game Dev)**
- Wants: Reach Vietnamese market, fair revenue share
- Pain Points: High Steam commission, no local marketing
- Success Metric: 10K+ downloads, 100M+ VND revenue

---

## 2. TECHNICAL ARCHITECTURE

### 2.1 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (Port 3000)                     │
│  Next.js 14 App Router + React 18 + Tailwind CSS           │
│  - User-facing website (Discover, Store, Profile)          │
│  - Creator Center (Dashboard, Campaigns, Storefront)       │
│  - Developer Center (Submission, Analytics)                │
│  - My Account (Profile, Settings, Multi-role)              │
└─────────────────────────────────────────────────────────────┘
                            ▲ │
                            │ │ REST API / GraphQL
                            │ ▼
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND API LAYER                         │
│  Next.js API Routes + tRPC (Type-safe APIs)                │
│  - Authentication (JWT + Refresh Tokens)                    │
│  - Game Management APIs                                     │
│  - Payment Gateway Integration                              │
│  - User/Creator/Developer APIs                              │
└─────────────────────────────────────────────────────────────┘
                            ▲ │
                            │ ▼
┌─────────────────────────────────────────────────────────────┐
│                   ADMIN CMS (Port 30001)                    │
│  Next.js 14 + Shadcn UI + TanStack Table                   │
│  - Dashboard (Metrics, Analytics)                           │
│  - Games Management (CRUD, Approval)                        │
│  - Transaction Management (Planned)                         │
│  - User/Partner Management (Planned)                        │
│  - System Settings (Planned)                                │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    DATA LAYER                                │
│  - PostgreSQL (Prisma ORM)                                  │
│  - Redis (Caching, Sessions, Queues)                        │
│  - S3/CloudFlare R2 (Game files, Assets)                   │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Technology Stack

**Frontend (Port 3000):**
```json
{
  "framework": "Next.js 14.0.4",
  "runtime": "React 18.2.0",
  "styling": "Tailwind CSS 3.3.6",
  "animations": "Framer Motion 12.23.26",
  "icons": "Lucide React 0.294.0",
  "forms": "React Hook Form + Zod",
  "state": "React Context + Local State",
  "language": "TypeScript 5.3.3"
}
```

**Backend Admin CMS (Port 30001):**
```json
{
  "framework": "Next.js 14.0.4",
  "ui": "Shadcn UI + Radix UI",
  "tables": "TanStack React Table 8.10.7",
  "charts": "Recharts 2.10.3",
  "styling": "Tailwind CSS 3.3.6",
  "language": "TypeScript 5.3.3"
}
```

**Backend APIs:**
```json
{
  "database": "PostgreSQL 15",
  "orm": "Prisma 7.2.0",
  "cache": "Redis 7.x",
  "auth": "JWT + bcryptjs",
  "validation": "Zod 4.2.1",
  "storage": "AWS S3 / Cloudflare R2"
}
```

**Infrastructure:**
```json
{
  "hosting": "Vercel (Frontend) / VPS (Backend)",
  "cdn": "Cloudflare",
  "monitoring": "Sentry + Vercel Analytics",
  "ci/cd": "GitHub Actions"
}
```

### 2.3 Deployment Architecture

**Production Environment:**
```
Frontend (3000):  https://www.2game.space
Admin CMS (30001): https://admin.2game.space (Internal only)
API: https://api.2game.space
CDN: Cloudflare (Global)
Database: PostgreSQL (Primary: Vietnam, Replica: Singapore)
Redis: ElastiCache (High availability)
```

**Development Environment:**
```
Frontend (3000):  http://localhost:3000
Admin CMS (30001): http://localhost:30001
API: http://localhost:3001
Database: Local PostgreSQL Docker
Redis: Local Redis Docker
```

---

## 3. FEATURE SPECIFICATIONS

### 3.1 FRONTEND (Port 3000)

#### Feature 3.1.1: Discover Feed
**Status:** ✅ 100% Complete

**Description:**
Homepage feed showing personalized game recommendations with tabs.

**User Flow:**
1. User lands on homepage
2. See hero banner with current campaign
3. Browse tabs: For You, Trending, New Releases, Free to Play
4. Click game card → Navigate to game detail page
5. Click "Buy Now" → Add to cart
6. Click "Wishlist" → Save for later

**UI Components:**
- Sticky tab navigation (For You, Trending, New, F2P)
- Hero banner with gradient background + CTA
- Game cards with:
  - Game thumbnail (gradient placeholder)
  - Title + Tags (RPG, Mobile, Verified)
  - Rating + Download count
  - Price + Badge (IAP, Bonus, etc.)
  - Buy Now + Wishlist buttons
- Loyalty Program banner
- Gift Card banner
- Load More button (pagination)

**Technical Implementation:**
```typescript
// File: /app/page.tsx
- Client component ("use client")
- Tab state management (useState)
- Memoized tab list (useMemo)
- Mock game data (to be replaced with API)
- Click handlers for navigation
```

**API Requirements:**
```
GET /api/games?tab={forYou|trending|new|freeToPlay}&page=1&limit=10
Response: { games: Game[], hasMore: boolean }
```

---

#### Feature 3.1.2: My Account
**Status:** ✅ 100% Complete (Just Built!)

**Description:**
User profile dashboard with Linear-inspired design. Supports multi-role users (End-user, Creator, Developer, Partner).

**User Flow:**
1. User clicks "Vietnamese User, 950 Points" in sidebar
2. Navigate to `/my-account`
3. See profile stats grid (Games Owned, Achievements, Playtime, Account Status)
4. Edit personal information
5. Navigate to Settings page
6. Switch roles if user has multiple roles

**UI Components:**
- **Top Navigation (Floating Bar):**
  - Logo + "My Account" label
  - Horizontal menu: Profile, Content (Creator), Developer, Partners, Settings
  - Search icon
  - Notification bell with animated dot
  - User dropdown menu with role badge

- **Profile Page Stats Grid (4 columns):**
  - Games Owned (24) - Active badge
  - Achievements (142) - Unlocked badge
  - Playtime (487h) - This Month badge
  - Account Status (VIP) - Verified badge

- **Profile Information Card:**
  - Personal details form (Name, Email, Phone, Location)
  - Icon + Input for each field
  - Edit/Save mode toggle
  - Calendar icon for member since date

- **Account Details Card:**
  - Member since date
  - Account type (Premium/VIP)
  - Username verification
  - Games library link

- **Security Settings Card:**
  - Password change
  - Last changed date
  - Change Password button

- **Settings Page:**
  - Notification preferences (Email, Game Updates, Promos, Community)
  - Privacy & Security (Password change, 2FA)
  - Appearance (Theme, Language)
  - Data & Privacy (Download data, Delete account)

**Design System (Linear-Inspired):**
```css
/* Colors */
--background: zinc-900
--card: zinc-900/50 (with backdrop-blur)
--text-primary: zinc-50
--text-secondary: zinc-400

/* Shadows (Instead of borders) */
shadow-linear-sm: 0 1px 2px rgba(0,0,0,0.25)
shadow-linear-md: 0 2px 8px rgba(0,0,0,0.25), 0 1px 2px rgba(0,0,0,0.15)
shadow-linear-lg: 0 4px 16px rgba(0,0,0,0.35), 0 2px 4px rgba(0,0,0,0.2)
shadow-linear-floating: 0 6px 20px rgba(0,0,0,0.3), 0 2px 6px rgba(0,0,0,0.2)

/* Typography */
h1: text-5xl font-bold (48px)
Metrics: text-4xl font-bold (36px)
Card titles: text-2xl (24px)
Body: text-base (16px)

/* Spacing */
Card padding: p-8 (32px)
Section gaps: gap-6 (24px)
Page spacing: space-y-12 (48px)

/* Components */
Button height: h-11 (44px)
Border radius: rounded-xl (12px) for cards, rounded-2xl (16px) for nav
```

**Technical Implementation:**
```
Files Created:
- /app/my-account/layout.tsx (TopNavigation wrapper)
- /app/my-account/page.tsx (Profile page)
- /app/my-account/settings/page.tsx (Settings page)
- /components/my-account/card.tsx
- /components/my-account/button.tsx
- /components/my-account/badge.tsx
- /components/my-account/input.tsx
- /components/my-account/label.tsx
- /components/my-account/top-navigation.tsx
- /lib/utils.ts (cn() helper + formatVND())

Updated Files:
- /components/LeftSidebar.tsx (Line 87: Link to /my-account)
- /components/MobileDrawer.tsx (Line 78: Link to /my-account)
- /tailwind.config.js (Added Linear shadow system)
```

**API Requirements:**
```
GET /api/user/profile
Response: {
  id, name, email, phone, location,
  stats: { gamesOwned, achievements, playtime, accountType },
  roles: ['end-user', 'content-creator'],
  memberSince: Date
}

PATCH /api/user/profile
Body: { name, email, phone, location }
Response: { success: boolean }

POST /api/user/password
Body: { currentPassword, newPassword }
Response: { success: boolean }
```

---

#### Feature 3.1.3: Creator Center
**Status:** ⚠️ 70% Complete (UI Done, Missing API Integration)

**Description:**
Dashboard for content creators to manage affiliate campaigns, track revenue, and build custom storefronts.

**Implemented Components:**
- [x] Hero section with creator stats (2,500+ creators, 50% revenue share, 15M₫ avg)
- [x] Dashboard tabs (Profile, Campaigns, Storefront, Wallet)
- [x] Profile tab with Creator Bio, Social Links, Verification badge
- [x] Campaigns tab skeleton (Active, Drafts, Ended filters)
- [x] Storefront builder UI
- [x] Wallet tab with earnings overview
- [x] "Start Creating" CTA button

**Missing Features (To Be Implemented):**
- [ ] **Campaign Creation Flow:**
  - Select games to promote
  - Generate affiliate links
  - Set commission tier
  - Create custom landing page
  - Schedule campaign dates

- [ ] **Analytics Dashboard:**
  - Click-through rate (CTR)
  - Conversion rate
  - Revenue per click
  - Top performing games
  - Geographic breakdown

- [ ] **Payout System:**
  - Minimum threshold: 500K VND
  - Payout request workflow
  - Payment method selection
  - Payout history

- [ ] **Content Library:**
  - Upload promotional banners
  - Video embed support
  - Asset preview & management

**User Flow:**
```
1. Creator lands on /creator
2. If not logged in: See hero → Click "Start Creating"
3. If logged in: See dashboard
4. Navigate to Campaigns tab
5. Click "Create Campaign" → Multi-step form
6. Step 1: Select games
7. Step 2: Configure commission split
8. Step 3: Customize landing page
9. Step 4: Generate links
10. Copy link → Share on social media
11. Track performance in Analytics
12. When earnings > 500K VND → Request payout
```

**Technical Requirements:**
```typescript
// Campaign Model
interface Campaign {
  id: string
  creatorId: string
  name: string
  games: string[] // Game IDs
  affiliateLink: string // Unique trackable URL
  commissionRate: number // 5-15%
  status: 'active' | 'draft' | 'ended'
  landingPageUrl?: string
  startDate: Date
  endDate?: Date
  stats: {
    clicks: number
    conversions: number
    revenue: number
  }
}

// Payout Model
interface Payout {
  id: string
  creatorId: string
  amount: number
  status: 'pending' | 'approved' | 'paid' | 'rejected'
  requestedAt: Date
  processedAt?: Date
  method: 'bank' | 'momo' | 'zalopay'
}
```

**API Endpoints:**
```
POST /api/creator/campaigns
GET /api/creator/campaigns
PATCH /api/creator/campaigns/:id
DELETE /api/creator/campaigns/:id

GET /api/creator/analytics?campaignId=xxx&dateRange=7d
Response: { clicks, conversions, revenue, topGames[] }

POST /api/creator/payouts
GET /api/creator/payouts
```

---

#### Feature 3.1.4: Developer Center
**Status:** ⚠️ 60% Complete (UI Done, Missing Submission Flow)

**Description:**
Portal for game developers to submit games, track sales, and manage distribution.

**Implemented Components:**
- [x] Dual-view toggle (Vietnamese Developers / International Partners)
- [x] Hero section with value proposition
- [x] Feature grid showcasing benefits
- [x] Success stories section
- [x] Resources & documentation links
- [x] CTA buttons ("Submit Game", "View Documentation")

**Missing Features (To Be Implemented):**
- [ ] **Game Submission Flow:**
  - Multi-step form (Game Info, Media, Pricing, Legal)
  - File uploads (Game build, Screenshots, Trailer)
  - Metadata: Title, Description, Genre, Tags, Age Rating
  - Pricing configuration (Regional pricing)
  - DRM integration options
  - Submit for review → Admin approval workflow

- [ ] **Sales Dashboard:**
  - Revenue chart (daily/weekly/monthly)
  - Download statistics
  - User demographics (age, location)
  - Retention metrics (D1, D7, D30)
  - Top countries/regions

- [ ] **KYC Verification:**
  - Upload ID documents
  - Business registration (for companies)
  - Tax information (W-8BEN, Tax ID)
  - Bank account verification
  - Admin review & approval

- [ ] **Developer API:**
  - Game analytics API
  - Achievement/Leaderboard API
  - DRM validation API
  - Webhook notifications (sales, updates)

**User Flow:**
```
1. Developer lands on /developer
2. Toggle to appropriate view (Vietnamese/International)
3. Click "Submit Game"
4. If not verified: Start KYC process
5. Upload documents → Wait for approval
6. Once approved: Access submission form
7. Step 1: Game Information (Title, Genre, Description)
8. Step 2: Media Upload (Build, Screenshots, Trailer)
9. Step 3: Pricing (Base price, Regional pricing, Discounts)
10. Step 4: Legal (License, Age Rating, Terms)
11. Submit → Pending Admin Review
12. Admin approves → Game published
13. Monitor sales in Dashboard
14. Request payout when > 500K VND revenue
```

**Technical Requirements:**
```typescript
// Game Submission Model
interface GameSubmission {
  id: string
  developerId: string
  status: 'draft' | 'pending_review' | 'approved' | 'rejected' | 'published'

  // Game Info
  title: string
  description: string
  genre: string[]
  tags: string[]
  ageRating: '3+' | '7+' | '12+' | '16+' | '18+'
  platforms: ('pc' | 'mobile' | 'web')[]

  // Media
  iconUrl: string
  screenshotUrls: string[]
  trailerUrl?: string
  gameBuildUrl: string // S3/R2 link

  // Pricing
  basePrice: number // VND
  regionalPricing?: Record<string, number>
  discountSchedule?: Discount[]

  // Legal
  licenseType: 'free' | 'paid' | 'freemium' | 'subscription'
  termsAccepted: boolean

  // Metadata
  createdAt: Date
  updatedAt: Date
  publishedAt?: Date
  rejectionReason?: string
}

// Developer KYC Model
interface DeveloperKYC {
  developerId: string
  status: 'pending' | 'verified' | 'rejected'

  personalInfo: {
    fullName: string
    idNumber: string
    idDocumentUrl: string
    address: string
  }

  businessInfo?: {
    companyName: string
    registrationNumber: string
    taxId: string
    businessLicenseUrl: string
  }

  paymentInfo: {
    method: 'bank' | 'momo' | 'zalopay'
    accountNumber: string
    accountName: string
    bankName?: string
  }

  verifiedAt?: Date
}
```

**API Endpoints:**
```
POST /api/developer/games (Submit game)
GET /api/developer/games (List developer's games)
PATCH /api/developer/games/:id (Update game)
DELETE /api/developer/games/:id (Delete draft)

GET /api/developer/analytics/sales?gameId=xxx&period=30d
GET /api/developer/analytics/downloads?gameId=xxx
GET /api/developer/analytics/demographics?gameId=xxx

POST /api/developer/kyc (Submit KYC)
GET /api/developer/kyc (Get KYC status)
PATCH /api/developer/kyc (Update KYC)

POST /api/developer/payouts (Request payout)
GET /api/developer/payouts (List payouts)
```

---

#### Feature 3.1.5: Shopping & Checkout (PLANNED)
**Status:** ❌ 0% Complete

**Required Features:**
- [ ] Shopping cart (add/remove items, quantity)
- [ ] Checkout page with order summary
- [ ] Payment method selection (MoMo, ZaloPay, Banking, Wetaps Balance)
- [ ] Payment gateway integration
- [ ] Order confirmation page
- [ ] Email receipt
- [ ] Download purchased games

**Payment Gateway Integration:**
```typescript
// Supported Payment Methods
type PaymentMethod =
  | 'momo'        // MoMo Wallet API
  | 'zalopay'     // ZaloPay API
  | 'banking'     // Bank transfer (manual)
  | 'wetaps'      // Wetaps Balance (internal)

// Payment Flow
1. User clicks "Checkout"
2. POST /api/cart/checkout → Create order
3. Select payment method
4. POST /api/payments/init → Get payment URL
5. Redirect to payment gateway
6. User completes payment
7. Payment gateway → Webhook callback
8. POST /api/payments/webhook → Verify & update order
9. Redirect to success page
10. Send email receipt
```

**Order Model:**
```typescript
interface Order {
  id: string
  userId: string
  items: OrderItem[]
  subtotal: number
  discount: number
  total: number
  paymentMethod: PaymentMethod
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  transactionId?: string
  createdAt: Date
  paidAt?: Date
}

interface OrderItem {
  gameId: string
  title: string
  price: number
  quantity: number
}
```

---

### 3.2 ADMIN CMS (Port 30001)

#### Feature 3.2.1: Dashboard
**Status:** ✅ 100% Complete

**Description:**
Overview dashboard with key metrics, sparkline charts, and recent transactions.

**Components:**
- [x] Hero section (Page title + description + quick actions)
- [x] Metrics grid (4 cards):
  - Total Revenue: 45,670,000 VND (+12.5%)
  - Active Users: 2,847 (+8.2%)
  - Games Listed: 1,247 (+3.1%)
  - Pending Payouts: 12,450,000 VND (-5.3%)
- [x] Sparkline charts (7-day trend visualization)
- [x] Recent Transactions table (5 latest transactions)
- [x] Live Updates badge + Refresh button
- [x] Export Report + New Entry buttons

**Metric Card Spec:**
```tsx
<MetricCard>
  - Icon (top-right, 10x10, rounded-xl, bg-white/5)
  - Title (uppercase, text-sm, text-zinc-500)
  - Value (text-4xl, font-bold, text-zinc-50)
  - Change indicator (badge with arrow, green/red)
  - Sparkline chart (h-20, area chart with gradient)
</MetricCard>
```

**Recent Transactions Table:**
```tsx
Columns:
- Transaction ID (monospace, text-xs, text-zinc-400)
- User (email)
- Type (Purchase/Top-up/Payout)
- Game/Service
- Amount (VND, right-aligned, bold)
- Status (Badge with icon: Completed/Pending/Failed)
- Time (relative: "2 minutes ago")

Features:
- Hover effect (bg-white/5)
- Click row → Navigate to transaction detail
- Status color coding (green/yellow/red)
```

**API Data Flow:**
```
GET /api/admin/metrics?period=7d
Response: {
  revenue: { value: 45670000, change: 12.5, trend: [30,35,32,40,38,45,47] },
  users: { value: 2847, change: 8.2, trend: [2100,2300,2500,2400,2600,2700,2847] },
  games: { value: 1247, change: 3.1, trend: [1180,1190,1200,1210,1220,1235,1247] },
  payouts: { value: 12450000, change: -5.3, trend: [15,14,13,14,13,12,12] }
}

GET /api/admin/transactions/recent?limit=5
Response: {
  transactions: [
    {
      id: "TXN-2024-001247",
      user: "nguyenvana@gmail.com",
      type: "Purchase",
      game: "Cyberpunk 2077",
      amount: 1290000,
      status: "completed",
      timestamp: "2024-01-03T10:00:00Z"
    },
    ...
  ]
}
```

---

#### Feature 3.2.2: Games Management
**Status:** ✅ 100% Complete

**Description:**
Full CRUD interface for managing game catalog with approval workflow.

**Components:**
- [x] Page header (Title + Description + "Add New Game" button)
- [x] Statistics cards (4 metrics):
  - Total Games: 1,247
  - Pending Review: 12
  - Published This Month: 87
  - Total Sales: 45,670,000 VND

- [x] Data Table with TanStack React Table:
  - Columns: Game ID, Title, Category, Price, Sales, Rating, Status, Actions
  - Sortable columns (click header)
  - Global search (filter by title)
  - Row selection (checkboxes)
  - Pagination (Previous/Next)
  - Filters button
  - Export button
  - Bulk delete (when rows selected)

- [x] Action buttons:
  - View (eye icon)
  - Edit (pencil icon)
  - Approve (checkmark - for pending games)
  - Reject (X - for pending games)
  - More (horizontal menu)

**Status Badge Colors:**
```tsx
Published: bg-green-500/10 text-green-400 (with checkmark icon)
Pending Review: bg-yellow-500/10 text-yellow-400 (with clock icon)
Rejected: bg-red-500/10 text-red-400 (with X icon)
```

**Mock Data:**
```json
[
  {
    "id": "GAME-001",
    "title": "Cyberpunk 2077",
    "developer": "CD Projekt RED",
    "category": "RPG",
    "price": 1290000,
    "sales": 847,
    "rating": 4.5,
    "status": "Published"
  },
  {
    "id": "GAME-002",
    "title": "Indie Adventure Game",
    "developer": "Small Studio VN",
    "category": "Adventure",
    "price": 150000,
    "sales": 0,
    "rating": null,
    "status": "Pending Review"
  }
]
```

**API Endpoints:**
```
GET /api/admin/games?page=1&limit=10&search=cyberpunk&status=published
POST /api/admin/games (Create new game)
PATCH /api/admin/games/:id (Update game)
DELETE /api/admin/games/:id (Delete game)
POST /api/admin/games/:id/approve (Approve pending game)
POST /api/admin/games/:id/reject (Reject pending game)
DELETE /api/admin/games/bulk (Bulk delete selected games)
GET /api/admin/games/export (Export CSV)
```

---

#### Feature 3.2.3: Transaction Management (PLANNED)
**Status:** ❌ 0% Complete

**Required Features:**
- [ ] Transaction list with advanced filters:
  - Filter by type (Purchase, Top-up, Payout)
  - Filter by status (Completed, Pending, Failed, Refunded)
  - Filter by date range
  - Filter by user email/ID
  - Filter by game
  - Filter by amount range

- [ ] Transaction detail view:
  - Full transaction details
  - User information
  - Game/service purchased
  - Payment method used
  - Payment gateway response
  - Timeline (Created → Processing → Completed)
  - Refund button (if eligible)

- [ ] Refund workflow:
  - Refund reason selection
  - Refund amount (full/partial)
  - Admin notes
  - Send notification to user
  - Update order status
  - Reverse payment to original method

- [ ] Export functionality:
  - Export filtered transactions to CSV
  - Include all transaction details
  - Support date range export for accounting

**Transaction Model:**
```typescript
interface Transaction {
  id: string
  type: 'purchase' | 'topup' | 'payout'
  userId: string
  userEmail: string

  // For purchases
  orderId?: string
  gameId?: string
  gameTitle?: string

  // Financial
  amount: number
  currency: 'VND'
  paymentMethod: PaymentMethod
  transactionFee: number
  netAmount: number

  // Status
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded'
  failureReason?: string
  refundReason?: string

  // Gateway
  gatewayTransactionId?: string
  gatewayResponse?: object

  // Timestamps
  createdAt: Date
  completedAt?: Date
  refundedAt?: Date
}
```

---

#### Feature 3.2.4: Payout Management (PLANNED)
**Status:** ❌ 0% Complete

**Required Features:**
- [ ] Pending payout queue:
  - List all pending payout requests
  - Show creator/developer info
  - Show KYC verification status
  - Show requested amount
  - Show requested date
  - Filter by role (Creator/Developer)
  - Sort by amount/date

- [ ] Payout approval workflow:
  - View payout request details
  - Verify KYC documents
  - Check fraud indicators
  - Approve or reject with reason
  - Batch approval (select multiple)
  - Send notification to requester

- [ ] Payment batch processing:
  - Select approved payouts
  - Generate payment batch file
  - Export to banking format
  - Mark as processing
  - Upload payment confirmation
  - Mark as paid

- [ ] Payout analytics:
  - Total payouts this month
  - Average payout amount
  - Top earners (creators/developers)
  - Payout success rate
  - Processing time metrics

**Payout Model:**
```typescript
interface Payout {
  id: string
  userId: string
  userRole: 'creator' | 'developer'
  userEmail: string

  // Financial
  amount: number
  currency: 'VND'
  method: 'bank' | 'momo' | 'zalopay'
  accountInfo: {
    accountNumber: string
    accountName: string
    bankName?: string
  }

  // Status
  status: 'pending' | 'approved' | 'processing' | 'paid' | 'rejected'
  reviewedBy?: string // Admin user ID
  rejectionReason?: string

  // KYC
  kycStatus: 'pending' | 'verified' | 'rejected'
  kycDocuments: string[]

  // Timestamps
  requestedAt: Date
  approvedAt?: Date
  paidAt?: Date

  // Batch
  batchId?: string // For bulk payment processing
}
```

---

#### Feature 3.2.5: User Management (PLANNED)
**Status:** ❌ 0% Complete

**Required Features:**

**A. Gamer CRM:**
- [ ] User list with search & filters:
  - Search by email, name, user ID
  - Filter by account type (Free, Premium, VIP)
  - Filter by registration date
  - Filter by last active date
  - Filter by total spent
  - Filter by status (Active, Suspended, Banned)

- [ ] User detail view:
  - Personal information
  - Account statistics (Games owned, Total spent, Loyalty points)
  - Purchase history
  - Login history
  - Support tickets
  - Moderation history

- [ ] Account actions:
  - Suspend account (with reason + duration)
  - Ban account (permanent)
  - Reset password
  - Add loyalty points
  - Upgrade to VIP
  - Send notification/email

- [ ] User segmentation:
  - Create user segments (High spenders, Inactive users, etc.)
  - Export segments for marketing
  - Send bulk emails to segments

**B. Partner Management:**
- [ ] Creator/Developer list:
  - Filter by role (Creator, Developer, Partner)
  - Filter by KYC status
  - Filter by revenue tier
  - Search by name, email, company

- [ ] Partner detail view:
  - Profile information
  - KYC documents with approval status
  - Revenue statistics
  - Published games (for developers)
  - Active campaigns (for creators)
  - Payout history
  - Contract documents

- [ ] KYC verification workflow:
  - View submitted documents
  - Verify ID/business registration
  - Check tax information
  - Approve or reject with feedback
  - Request additional documents

- [ ] Partnership management:
  - Set partnership tier (Bronze, Silver, Gold)
  - Adjust commission rates
  - Upload contract documents
  - Set revenue share split
  - Enable/disable partner features

**User Model:**
```typescript
interface User {
  id: string
  email: string
  name: string
  phone?: string

  // Account
  accountType: 'free' | 'premium' | 'vip'
  status: 'active' | 'suspended' | 'banned'
  suspensionReason?: string
  suspensionUntil?: Date

  // Roles (Multi-role support)
  roles: ('end-user' | 'content-creator' | 'developer' | 'partner')[]

  // Stats
  stats: {
    gamesOwned: number
    totalSpent: number
    loyaltyPoints: number
    achievements: number
    playtimeHours: number
  }

  // Timestamps
  createdAt: Date
  lastLoginAt: Date
  emailVerifiedAt?: Date

  // KYC (for creators/developers)
  kycStatus?: 'pending' | 'verified' | 'rejected'
  partnerTier?: 'bronze' | 'silver' | 'gold'
  commissionRate?: number
}
```

---

#### Feature 3.2.6: System Settings (PLANNED)
**Status:** ❌ 0% Complete

**Required Features:**

**A. Banner Management:**
- [ ] Banner list (Active, Scheduled, Ended)
- [ ] Create banner:
  - Upload image (Desktop, Mobile)
  - Set title + description
  - Add CTA button (text + link)
  - Set position (Hero, Sidebar, Footer)
  - Schedule start/end date
  - Set priority (for multiple banners)

- [ ] Banner analytics:
  - Impressions
  - Click-through rate
  - Conversions
  - A/B test results

**B. Permissions (RBAC):**
- [ ] Role management:
  - Super Admin (Full access)
  - Admin (All except system config)
  - Moderator (Content moderation only)
  - Viewer (Read-only analytics)

- [ ] Permission matrix:
  - Define permissions per role
  - Granular permissions (read/write/delete per module)
  - Audit log of permission changes

- [ ] User role assignment:
  - Assign roles to admin users
  - Invite new admins
  - Revoke admin access

**C. Cloud Library Management:**
- [ ] Game server list:
  - Server name, region, status
  - Capacity (CCU, CPU, RAM)
  - Deployed games
  - Monitoring metrics

- [ ] Add game to cloud library:
  - Upload game build
  - Configure streaming settings
  - Set quality presets (Low, Medium, High, Ultra)
  - Regional availability

- [ ] CDN configuration:
  - Configure CloudFlare R2
  - Set cache policies
  - Monitor bandwidth usage

---

## 4. USER STORIES

### 4.1 Gamer Stories

**US-G01: Browse Games**
```
As a gamer,
I want to browse the game catalog with filters,
So that I can find games I'm interested in.

Acceptance Criteria:
- Can see games in grid or list view
- Can filter by genre, platform, price range
- Can sort by popularity, price, rating, release date
- Can search by title or developer
- Pagination loads smoothly
```

**US-G02: Purchase Game**
```
As a gamer,
I want to purchase a game using MoMo,
So that I can play it without needing a credit card.

Acceptance Criteria:
- Can add game to cart
- Can proceed to checkout
- Can select MoMo as payment method
- Redirected to MoMo payment page
- Receive confirmation email after successful payment
- Game appears in my library
```

**US-G03: Manage Profile**
```
As a gamer,
I want to view my profile stats,
So that I can track my gaming achievements.

Acceptance Criteria:
- Can see total games owned
- Can see total achievements unlocked
- Can see total playtime
- Can see account type (Free/Premium/VIP)
- Can edit personal information
- Can change password
```

### 4.2 Creator Stories

**US-C01: Create Affiliate Campaign**
```
As a content creator,
I want to create an affiliate campaign for a game,
So that I can earn commission when my followers buy it.

Acceptance Criteria:
- Can select game to promote
- Can generate unique affiliate link
- Can customize landing page
- Can set campaign dates
- Can track clicks and conversions
- Can see estimated earnings
```

**US-C02: Request Payout**
```
As a content creator,
I want to request payout when I earn 500K VND,
So that I can withdraw my earnings.

Acceptance Criteria:
- Can view current balance
- Can see minimum payout threshold (500K VND)
- Can request payout if balance >= threshold
- Can select payment method (Bank, MoMo, ZaloPay)
- Receive notification when payout is processed
```

### 4.3 Developer Stories

**US-D01: Submit Game for Review**
```
As a game developer,
I want to submit my game for admin review,
So that it can be published on the platform.

Acceptance Criteria:
- Can upload game build
- Can add screenshots and trailer
- Can set pricing
- Can choose regional pricing
- Can submit for review
- Receive notification when approved/rejected
```

**US-D02: View Sales Analytics**
```
As a game developer,
I want to view sales analytics for my game,
So that I can understand my revenue.

Acceptance Criteria:
- Can see daily/weekly/monthly revenue chart
- Can see total downloads
- Can see user demographics
- Can see retention metrics (D1, D7, D30)
- Can export data to CSV
```

### 4.4 Admin Stories

**US-A01: Approve Game**
```
As an admin,
I want to approve a pending game submission,
So that it can be published on the platform.

Acceptance Criteria:
- Can view pending games list
- Can see game details (title, description, media)
- Can test game build
- Can approve or reject with reason
- Developer receives notification
- Approved game appears in catalog
```

**US-A02: Process Payout**
```
As an admin,
I want to process pending payout requests,
So that creators/developers receive their earnings.

Acceptance Criteria:
- Can view pending payouts queue
- Can verify KYC documents
- Can approve/reject payout
- Can batch process multiple payouts
- Can export payment file for banking
- Users receive notification when paid
```

---

## 5. TECHNICAL REQUIREMENTS

### 5.1 Database Schema (PostgreSQL + Prisma)

**Core Tables:**

```prisma
// User Management
model User {
  id                String   @id @default(cuid())
  email             String   @unique
  passwordHash      String
  name              String?
  phone             String?
  avatar            String?

  // Account
  accountType       AccountType @default(FREE)
  status            UserStatus  @default(ACTIVE)
  roles             Role[]

  // Stats
  gamesOwned        Int      @default(0)
  loyaltyPoints     Int      @default(0)
  totalSpent        Float    @default(0)

  // Timestamps
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  lastLoginAt       DateTime?
  emailVerifiedAt   DateTime?

  // Relations
  orders            Order[]
  reviews           Review[]
  wishlist          Wishlist[]
  creatorProfile    CreatorProfile?
  developerProfile  DeveloperProfile?
}

enum AccountType {
  FREE
  PREMIUM
  VIP
}

enum UserStatus {
  ACTIVE
  SUSPENDED
  BANNED
}

enum Role {
  END_USER
  CONTENT_CREATOR
  DEVELOPER
  PARTNER
  ADMIN
  SUPER_ADMIN
}

// Game Catalog
model Game {
  id               String   @id @default(cuid())
  title            String
  slug             String   @unique
  description      String   @db.Text
  genre            String[]
  tags             String[]
  platforms        Platform[]

  // Media
  iconUrl          String
  screenshots      String[]
  trailerUrl       String?

  // Pricing
  basePrice        Float
  discountPercent  Int      @default(0)
  currentPrice     Float

  // Metadata
  rating           Float?
  totalReviews     Int      @default(0)
  totalDownloads   Int      @default(0)
  totalRevenue     Float    @default(0)

  // Status
  status           GameStatus @default(DRAFT)
  ageRating        AgeRating  @default(EVERYONE)

  // Relations
  developerId      String
  developer        DeveloperProfile @relation(fields: [developerId], references: [id])
  orders           OrderItem[]
  reviews          Review[]

  // Timestamps
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
  publishedAt      DateTime?
}

enum Platform {
  PC
  MOBILE
  WEB
}

enum GameStatus {
  DRAFT
  PENDING_REVIEW
  APPROVED
  PUBLISHED
  REJECTED
  ARCHIVED
}

enum AgeRating {
  EVERYONE
  TEEN
  MATURE
  ADULTS_ONLY
}

// E-commerce
model Order {
  id              String      @id @default(cuid())
  userId          String
  user            User        @relation(fields: [userId], references: [id])

  // Financial
  subtotal        Float
  discount        Float       @default(0)
  total           Float

  // Payment
  paymentMethod   PaymentMethod
  paymentStatus   PaymentStatus @default(PENDING)
  transactionId   String?

  // Items
  items           OrderItem[]

  // Timestamps
  createdAt       DateTime    @default(now())
  paidAt          DateTime?
  refundedAt      DateTime?
}

model OrderItem {
  id              String      @id @default(cuid())
  orderId         String
  order           Order       @relation(fields: [orderId], references: [id])
  gameId          String
  game            Game        @relation(fields: [gameId], references: [id])

  price           Float
  quantity        Int         @default(1)
}

enum PaymentMethod {
  MOMO
  ZALOPAY
  BANKING
  WETAPS
}

enum PaymentStatus {
  PENDING
  PROCESSING
  PAID
  FAILED
  REFUNDED
}

// Creator System
model CreatorProfile {
  id              String      @id @default(cuid())
  userId          String      @unique
  user            User        @relation(fields: [userId], references: [id])

  // Profile
  bio             String?     @db.Text
  socialLinks     Json?
  verified        Boolean     @default(false)

  // Stats
  totalRevenue    Float       @default(0)
  totalClicks     Int         @default(0)
  totalConversions Int        @default(0)

  // Tier
  tier            CreatorTier @default(BRONZE)
  commissionRate  Float       @default(5) // Percentage

  // Relations
  campaigns       Campaign[]
  payouts         Payout[]

  // Timestamps
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
}

enum CreatorTier {
  BRONZE
  SILVER
  GOLD
  PLATINUM
}

model Campaign {
  id              String      @id @default(cuid())
  creatorId       String
  creator         CreatorProfile @relation(fields: [creatorId], references: [id])

  name            String
  affiliateLink   String      @unique
  games           String[]    // Game IDs

  // Stats
  clicks          Int         @default(0)
  conversions     Int         @default(0)
  revenue         Float       @default(0)

  // Status
  status          CampaignStatus @default(DRAFT)

  // Timestamps
  startDate       DateTime?
  endDate         DateTime?
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
}

enum CampaignStatus {
  DRAFT
  ACTIVE
  PAUSED
  ENDED
}

// Developer System
model DeveloperProfile {
  id              String      @id @default(cuid())
  userId          String      @unique
  user            User        @relation(fields: [userId], references: [id])

  // Company Info
  companyName     String?
  taxId           String?
  website         String?

  // KYC
  kycStatus       KYCStatus   @default(PENDING)
  kycDocuments    String[]

  // Stats
  totalRevenue    Float       @default(0)
  totalGames      Int         @default(0)
  totalDownloads  Int         @default(0)

  // Relations
  games           Game[]
  payouts         Payout[]

  // Timestamps
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
  verifiedAt      DateTime?
}

enum KYCStatus {
  PENDING
  VERIFIED
  REJECTED
}

// Payouts
model Payout {
  id              String      @id @default(cuid())

  // Creator or Developer
  creatorId       String?
  creator         CreatorProfile? @relation(fields: [creatorId], references: [id])
  developerId     String?
  developer       DeveloperProfile? @relation(fields: [developerId], references: [id])

  // Financial
  amount          Float
  method          PaymentMethod
  accountInfo     Json

  // Status
  status          PayoutStatus @default(PENDING)
  reviewedBy      String?     // Admin user ID
  rejectionReason String?

  // Timestamps
  requestedAt     DateTime    @default(now())
  approvedAt      DateTime?
  paidAt          DateTime?
}

enum PayoutStatus {
  PENDING
  APPROVED
  PROCESSING
  PAID
  REJECTED
}

// Additional Tables
model Review {
  id              String      @id @default(cuid())
  userId          String
  user            User        @relation(fields: [userId], references: [id])
  gameId          String
  game            Game        @relation(fields: [gameId], references: [id])

  rating          Int         // 1-5
  comment         String?     @db.Text
  helpful         Int         @default(0)

  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
}

model Wishlist {
  id              String      @id @default(cuid())
  userId          String
  user            User        @relation(fields: [userId], references: [id])
  gameId          String

  createdAt       DateTime    @default(now())

  @@unique([userId, gameId])
}
```

### 5.2 API Architecture

**API Layer: Next.js API Routes + tRPC**

```typescript
// /app/api/trpc/[trpc]/route.ts
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '@/server/routers/_app'

export const GET = (req: Request) => {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => ({}),
  })
}

export const POST = GET
```

**Router Structure:**
```
/server/routers/
  ├── _app.ts          (Root router)
  ├── auth.ts          (Login, Register, Logout)
  ├── games.ts         (Game CRUD, Search, Filters)
  ├── users.ts         (Profile, Settings, Roles)
  ├── creators.ts      (Campaigns, Analytics, Payouts)
  ├── developers.ts    (Game submission, Sales analytics, KYC)
  ├── orders.ts        (Cart, Checkout, Order history)
  ├── payments.ts      (Payment init, Webhook, Refunds)
  └── admin.ts         (Dashboard, Approvals, Management)
```

**Example Router:**
```typescript
// /server/routers/games.ts
import { z } from 'zod'
import { router, publicProcedure, protectedProcedure } from '../trpc'

export const gamesRouter = router({
  list: publicProcedure
    .input(z.object({
      page: z.number().min(1).default(1),
      limit: z.number().min(1).max(100).default(20),
      genre: z.string().optional(),
      platform: z.enum(['PC', 'MOBILE', 'WEB']).optional(),
      search: z.string().optional(),
      sortBy: z.enum(['popular', 'price', 'rating', 'newest']).default('popular'),
    }))
    .query(async ({ input, ctx }) => {
      const games = await ctx.prisma.game.findMany({
        where: {
          status: 'PUBLISHED',
          title: input.search ? { contains: input.search, mode: 'insensitive' } : undefined,
          genre: input.genre ? { has: input.genre } : undefined,
          platforms: input.platform ? { has: input.platform } : undefined,
        },
        orderBy: getOrderBy(input.sortBy),
        take: input.limit,
        skip: (input.page - 1) * input.limit,
        include: {
          developer: {
            select: { companyName: true, verified: true }
          }
        }
      })

      return { games, hasMore: games.length === input.limit }
    }),

  getById: publicProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.game.findUnique({
        where: { id: input },
        include: {
          developer: true,
          reviews: { take: 10, orderBy: { createdAt: 'desc' } }
        }
      })
    }),

  purchase: protectedProcedure
    .input(z.object({
      gameId: z.string(),
      paymentMethod: z.enum(['MOMO', 'ZALOPAY', 'BANKING', 'WETAPS'])
    }))
    .mutation(async ({ input, ctx }) => {
      // 1. Check if user already owns game
      // 2. Create order
      // 3. Initialize payment
      // 4. Return payment URL
    }),
})
```

---

## 6. API SPECIFICATIONS

### 6.1 Authentication APIs

**POST /api/auth/register**
```json
Request:
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "name": "John Doe"
}

Response (201):
{
  "user": {
    "id": "usr_abc123",
    "email": "user@example.com",
    "name": "John Doe",
    "roles": ["END_USER"]
  },
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc..."
}

Errors:
- 400: Email already exists
- 422: Invalid email format / Weak password
```

**POST /api/auth/login**
```json
Request:
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}

Response (200):
{
  "user": { ... },
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc..."
}

Errors:
- 401: Invalid credentials
- 403: Account suspended/banned
```

**POST /api/auth/refresh**
```json
Request:
{
  "refreshToken": "eyJhbGc..."
}

Response (200):
{
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc..."
}

Errors:
- 401: Invalid/expired refresh token
```

---

### 6.2 Game APIs

**GET /api/games**
```
Query Params:
- page: number (default: 1)
- limit: number (default: 20, max: 100)
- genre: string (RPG, Adventure, Strategy, etc.)
- platform: PC | MOBILE | WEB
- priceMin: number
- priceMax: number
- search: string
- sortBy: popular | price_asc | price_desc | rating | newest

Response (200):
{
  "games": [
    {
      "id": "gam_123",
      "title": "Cyberpunk 2077",
      "slug": "cyberpunk-2077",
      "description": "...",
      "iconUrl": "https://cdn.2game.vn/games/...",
      "basePrice": 1290000,
      "currentPrice": 1290000,
      "discountPercent": 0,
      "rating": 4.5,
      "totalDownloads": 847,
      "developer": {
        "companyName": "CD Projekt RED",
        "verified": true
      },
      "genre": ["RPG", "Action"],
      "platforms": ["PC"],
      "ageRating": "MATURE"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1247,
    "hasMore": true
  }
}
```

**GET /api/games/:id**
```
Response (200):
{
  "id": "gam_123",
  "title": "Cyberpunk 2077",
  // ... all game fields
  "reviews": [
    {
      "id": "rev_456",
      "userId": "usr_789",
      "userName": "John Doe",
      "rating": 5,
      "comment": "Amazing game!",
      "helpful": 42,
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "screenshots": ["url1", "url2"],
  "trailerUrl": "https://..."
}

Errors:
- 404: Game not found
```

---

### 6.3 Creator APIs

**POST /api/creator/campaigns**
```json
Request (Requires AUTH + CREATOR role):
{
  "name": "Summer Sale Campaign",
  "games": ["gam_123", "gam_456"],
  "startDate": "2024-07-01T00:00:00Z",
  "endDate": "2024-07-31T23:59:59Z"
}

Response (201):
{
  "id": "cam_789",
  "name": "Summer Sale Campaign",
  "affiliateLink": "https://2game.vn/c/abc123",
  "games": [...],
  "status": "ACTIVE",
  "stats": {
    "clicks": 0,
    "conversions": 0,
    "revenue": 0
  }
}
```

**GET /api/creator/analytics**
```
Query Params:
- campaignId: string (optional)
- dateRange: 7d | 30d | 90d | custom
- startDate: ISO8601 (if custom)
- endDate: ISO8601 (if custom)

Response (200):
{
  "overview": {
    "totalClicks": 1542,
    "totalConversions": 87,
    "totalRevenue": 15420000,
    "conversionRate": 5.6,
    "avgRevenuePerClick": 10000
  },
  "topGames": [
    {
      "gameId": "gam_123",
      "title": "Cyberpunk 2077",
      "clicks": 542,
      "conversions": 32,
      "revenue": 8520000
    }
  ],
  "timeline": [
    {
      "date": "2024-01-01",
      "clicks": 52,
      "conversions": 3,
      "revenue": 450000
    }
  ]
}
```

**POST /api/creator/payouts**
```json
Request (Requires AUTH + CREATOR role):
{
  "amount": 15000000,
  "method": "MOMO",
  "accountInfo": {
    "phoneNumber": "0901234567",
    "accountName": "Nguyen Van A"
  }
}

Response (201):
{
  "id": "pay_123",
  "amount": 15000000,
  "status": "PENDING",
  "requestedAt": "2024-01-03T10:00:00Z",
  "estimatedProcessingTime": "5-7 business days"
}

Errors:
- 400: Insufficient balance (< 500K VND)
- 403: KYC not verified
```

---

### 6.4 Developer APIs

**POST /api/developer/games**
```json
Request (Requires AUTH + DEVELOPER role):
{
  "title": "My Awesome Game",
  "description": "An epic adventure...",
  "genre": ["Adventure", "Puzzle"],
  "platforms": ["PC", "MOBILE"],
  "ageRating": "EVERYONE",
  "basePrice": 150000,
  "iconUrl": "https://cdn.2game.vn/uploads/...",
  "screenshots": ["url1", "url2"],
  "trailerUrl": "https://...",
  "gameBuildUrl": "https://cdn.2game.vn/builds/..."
}

Response (201):
{
  "id": "gam_new123",
  "status": "PENDING_REVIEW",
  "createdAt": "2024-01-03T10:00:00Z",
  "message": "Game submitted for review. You will be notified within 3-5 business days."
}

Errors:
- 403: KYC not verified
- 422: Invalid game data
```

**GET /api/developer/analytics/sales**
```
Query Params:
- gameId: string (required)
- period: 7d | 30d | 90d | all
- groupBy: day | week | month

Response (200):
{
  "gameId": "gam_123",
  "period": "30d",
  "summary": {
    "totalRevenue": 45670000,
    "totalDownloads": 847,
    "avgPrice": 53924,
    "refundRate": 2.1
  },
  "timeline": [
    {
      "date": "2024-01-01",
      "revenue": 1290000,
      "downloads": 28,
      "refunds": 1
    }
  ]
}
```

---

### 6.5 Admin APIs

**GET /api/admin/metrics**
```
Query Params:
- period: 7d | 30d | 90d

Response (200):
{
  "revenue": {
    "value": 45670000,
    "change": 12.5,
    "trend": [30, 35, 32, 40, 38, 45, 47]
  },
  "users": {
    "value": 2847,
    "change": 8.2,
    "trend": [2100, 2300, 2500, 2400, 2600, 2700, 2847]
  },
  "games": {
    "value": 1247,
    "change": 3.1,
    "trend": [1180, 1190, 1200, 1210, 1220, 1235, 1247]
  },
  "payouts": {
    "value": 12450000,
    "change": -5.3,
    "trend": [15, 14, 13, 14, 13, 12, 12]
  }
}
```

**POST /api/admin/games/:id/approve**
```json
Request (Requires ADMIN role):
{
  "notes": "Game approved. Great quality!"
}

Response (200):
{
  "gameId": "gam_123",
  "status": "APPROVED",
  "approvedAt": "2024-01-03T10:00:00Z",
  "approvedBy": "adm_456"
}
```

**POST /api/admin/games/:id/reject**
```json
Request (Requires ADMIN role):
{
  "reason": "Game contains prohibited content",
  "details": "Please review our content guidelines..."
}

Response (200):
{
  "gameId": "gam_123",
  "status": "REJECTED",
  "rejectedAt": "2024-01-03T10:00:00Z",
  "rejectedBy": "adm_456",
  "reason": "..."
}
```

---

## 7. DATABASE SCHEMA

(See Section 5.1 for full Prisma schema)

**Key Indexes:**
```sql
-- User lookups
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_roles ON users USING GIN(roles);

-- Game queries
CREATE INDEX idx_games_status ON games(status);
CREATE INDEX idx_games_genre ON games USING GIN(genre);
CREATE INDEX idx_games_platforms ON games USING GIN(platforms);
CREATE INDEX idx_games_price ON games(current_price);
CREATE INDEX idx_games_rating ON games(rating);

-- Orders
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

-- Performance indexes
CREATE INDEX idx_games_full_text ON games USING GIN(to_tsvector('english', title || ' ' || description));
```

**Migrations:**
```bash
# Create migration
npx prisma migrate dev --name init

# Apply to production
npx prisma migrate deploy

# Generate Prisma Client
npx prisma generate
```

---

## 8. UI/UX SPECIFICATIONS

### 8.1 Design System

**Color Palette:**
```css
/* Frontend (Port 3000) - Original Design */
--background: #0a0e17
--surface: #151922
--border: #2d333b
--text-primary: #e8eaed
--text-secondary: #9aa0a6
--text-muted: #6e7681
--accent-primary: #ff6b35
--accent-secondary: #f7931e
--success: #3fb950
--warning: #eab308
--error: #ef4444

/* Admin CMS (Port 30001) - Linear Design */
--background: #09090b (zinc-950) / #18181b (zinc-900)
--card: rgba(9, 9, 11, 0.5) with backdrop-blur
--border: #27272a (zinc-800)
--text-primary: #fafafa (zinc-50)
--text-secondary: #a1a1aa (zinc-400)
--text-muted: #71717a (zinc-500)

/* Shadows (Linear-inspired) */
--shadow-sm: 0 1px 2px rgba(0,0,0,0.25)
--shadow-md: 0 2px 8px rgba(0,0,0,0.25), 0 1px 2px rgba(0,0,0,0.15)
--shadow-lg: 0 4px 16px rgba(0,0,0,0.35), 0 2px 4px rgba(0,0,0,0.2)
--shadow-floating: 0 6px 20px rgba(0,0,0,0.3), 0 2px 6px rgba(0,0,0,0.2)
```

**Typography:**
```css
/* Headings */
h1: text-5xl (48px) font-bold
h2: text-3xl (30px) font-bold
h3: text-2xl (24px) font-semibold
h4: text-xl (20px) font-semibold

/* Body */
body: text-base (16px) font-normal
small: text-sm (14px)
xs: text-xs (12px)

/* Font Family */
font-sans: 'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
font-mono: 'Fira Code', 'Consolas', monospace
```

**Spacing:**
```css
/* Frontend Spacing */
tight: 12px
compact: 16px
card: 24px
section: 48px

/* Admin Spacing (Linear) */
xs: 4px
sm: 8px
md: 16px
lg: 24px
xl: 32px
2xl: 48px
```

**Border Radius:**
```css
/* Frontend */
button: 8px
card: 12px
input: 8px
full: 9999px (rounded-full)

/* Admin (Linear) */
button: 8px (rounded-lg)
card: 12px (rounded-xl)
nav: 16px (rounded-2xl)
```

### 8.2 Component Library

**Buttons:**
```tsx
<PrimaryButton>
  - bg-gradient-to-r from-[#ff6b35] to-[#f7931e]
  - text-black font-semibold
  - px-6 py-3 rounded-full
  - hover:translate-y-[-2px] shadow transition
</PrimaryButton>

<SecondaryButton>
  - bg-[#1c2128] border border-[#2d333b]
  - text-[#e8eaed]
  - hover:bg-[#242b36] hover:border-[#444c56]
</SecondaryButton>

<OutlineButton>
  - border-2 border-[#ff6b35]
  - text-[#ff6b35]
  - hover:bg-[#ff6b35] hover:text-black
</OutlineButton>
```

**Cards:**
```tsx
<GlassCard>
  - bg-dark-elevated/80 backdrop-blur-md
  - border border-border-primary
  - rounded-card p-card
  - hover:-translate-y-1 transition
</GlassCard>

<LinearCard> (Admin)
  - bg-zinc-900/50 backdrop-blur-sm
  - rounded-xl shadow-linear-md
  - hover:shadow-linear-lg transition
  - p-8
</LinearCard>
```

**Inputs:**
```tsx
<Input>
  - h-11 w-full rounded-lg
  - border border-white/10 bg-white/5
  - text-zinc-50 placeholder:text-zinc-500
  - focus:bg-white/10 focus:shadow-linear-sm
</Input>
```

**Badges:**
```tsx
<Badge variant="success">
  - bg-green-500/10 text-green-400
  - px-3 py-1 rounded-lg text-xs
</Badge>

<Badge variant="warning">
  - bg-yellow-500/10 text-yellow-400
</Badge>

<Badge variant="error">
  - bg-red-500/10 text-red-400
</Badge>
```

### 8.3 Responsive Design

**Breakpoints:**
```css
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Extra large */
```

**Mobile-First Approach:**
```tsx
// Default: Mobile styles
<div className="px-4 py-3">
  // Tablet and up
  <div className="lg:px-8 lg:py-4">
    // Desktop
    <div className="xl:max-w-7xl xl:mx-auto">
      ...
    </div>
  </div>
</div>
```

---

## 9. TESTING REQUIREMENTS

### 9.1 Unit Tests

**Coverage Target: 80%+**

```typescript
// Example: Game service tests
describe('GameService', () => {
  describe('createGame', () => {
    it('should create game with valid data', async () => {
      const gameData = {
        title: 'Test Game',
        description: 'Test description',
        basePrice: 100000,
        developerId: 'dev_123'
      }

      const game = await gameService.create(gameData)

      expect(game).toBeDefined()
      expect(game.status).toBe('DRAFT')
    })

    it('should reject game with invalid price', async () => {
      await expect(gameService.create({
        ...validGameData,
        basePrice: -100
      })).rejects.toThrow('Price must be positive')
    })
  })
})
```

**Test Coverage:**
- [ ] All API route handlers
- [ ] All business logic services
- [ ] All utility functions
- [ ] All React hooks
- [ ] Critical UI components

### 9.2 Integration Tests

```typescript
// Example: E2E purchase flow
describe('Purchase Flow', () => {
  it('should complete purchase with MoMo', async () => {
    // 1. Login as user
    const { token } = await api.post('/auth/login', credentials)

    // 2. Add game to cart
    await api.post('/cart', { gameId: 'gam_123' }, { headers: { Authorization: token } })

    // 3. Checkout
    const checkout = await api.post('/cart/checkout', { paymentMethod: 'MOMO' })
    expect(checkout.paymentUrl).toBeDefined()

    // 4. Simulate payment callback
    await api.post('/webhooks/momo', mockPaymentSuccess)

    // 5. Verify order status
    const order = await api.get(`/orders/${checkout.orderId}`)
    expect(order.paymentStatus).toBe('PAID')

    // 6. Verify game in library
    const library = await api.get('/user/library')
    expect(library.games).toContainEqual(expect.objectContaining({ id: 'gam_123' }))
  })
})
```

### 9.3 Performance Tests

**Load Testing (using k6):**
```javascript
import http from 'k6/http'
import { check, sleep } from 'k6'

export let options = {
  stages: [
    { duration: '2m', target: 100 },  // Ramp up to 100 users
    { duration: '5m', target: 100 },  // Stay at 100 users
    { duration: '2m', target: 200 },  // Ramp up to 200 users
    { duration: '5m', target: 200 },  // Stay at 200 users
    { duration: '2m', target: 0 },    // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests < 500ms
  },
}

export default function () {
  let response = http.get('https://www.2game.space/api/games')

  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  })

  sleep(1)
}
```

---

## 10. DEPLOYMENT & DEVOPS

### 10.1 Deployment Strategy

**Production Architecture:**
```
┌─────────────────────────────────────────┐
│  Cloudflare CDN + DDoS Protection       │
└─────────────────────────────────────────┘
                  │
┌─────────────────────────────────────────┐
│  Load Balancer (Nginx/CloudFlare LB)   │
└─────────────────────────────────────────┘
        │                    │
┌───────────────┐   ┌───────────────┐
│ Frontend      │   │ Admin CMS     │
│ (Vercel)      │   │ (VPS/EC2)     │
│ Port 3000     │   │ Port 30001    │
└───────────────┘   └───────────────┘
        │                    │
┌─────────────────────────────────────────┐
│  API Layer (Next.js API Routes)         │
│  (Vercel Serverless Functions)          │
└─────────────────────────────────────────┘
                  │
┌─────────────────────────────────────────┐
│  Database: PostgreSQL (RDS/Neon)        │
│  Cache: Redis (ElastiCache/Upstash)    │
│  Storage: S3/CloudFlare R2              │
└─────────────────────────────────────────┘
```

### 10.2 CI/CD Pipeline

**GitHub Actions Workflow:**
```yaml
name: Deploy Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test
      - run: npm run build

  deploy-frontend:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'

  deploy-admin:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to VPS
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            cd /var/www/2game-admin
            git pull origin main
            npm ci
            npm run build
            pm2 restart 2game-admin
```

### 10.3 Monitoring & Alerts

**Monitoring Stack:**
- **Application Monitoring:** Sentry (Errors & Performance)
- **Infrastructure:** Vercel Analytics + CloudFlare Analytics
- **Database:** PostgreSQL slow query log + pg_stat_statements
- **Uptime:** UptimeRobot (5-minute intervals)

**Alert Conditions:**
```yaml
Alerts:
  - name: High error rate
    condition: error_rate > 5%
    duration: 5 minutes
    notify: ops-team@2game.vn

  - name: Slow API response
    condition: p95_response_time > 1000ms
    duration: 10 minutes
    notify: ops-team@2game.vn

  - name: Database connection pool exhausted
    condition: db_connections > 80% max
    duration: 2 minutes
    notify: ops-team@2game.vn

  - name: Payment gateway failure
    condition: payment_success_rate < 95%
    duration: 5 minutes
    notify: finance-team@2game.vn
```

---

## APPENDICES

### Appendix A: Glossary

| Term | Definition |
|------|------------|
| **CCU** | Concurrent Users - Number of users online simultaneously |
| **GMV** | Gross Merchandise Value - Total transaction volume |
| **KYC** | Know Your Customer - Identity verification process |
| **Payout** | Payment from platform to creator/developer |
| **Top-up** | Adding balance to wallet |
| **tRPC** | TypeScript Remote Procedure Call - Type-safe API framework |
| **Prisma** | Next-generation ORM for TypeScript |
| **Shadcn UI** | Re-usable component library built on Radix UI |

### Appendix B: Third-Party Integrations

**Payment Gateways:**
- MoMo API Documentation: https://developers.momo.vn
- ZaloPay API Documentation: https://docs.zalopay.vn
- Vietnamese Banking Integration: NAPAS API

**Cloud Services:**
- Cloudflare R2 (CDN + Storage)
- Vercel (Frontend hosting)
- Sentry (Error tracking)
- SendGrid (Email)

### Appendix C: Security Checklist

- [ ] SSL/TLS enabled (HTTPS only)
- [ ] JWT tokens with short expiration (15min access, 7day refresh)
- [ ] Password hashing with bcrypt (cost factor 12)
- [ ] CORS properly configured
- [ ] Rate limiting on all endpoints (100 req/min per IP)
- [ ] SQL injection protection (Prisma parameterized queries)
- [ ] XSS protection (React auto-escaping + CSP headers)
- [ ] CSRF protection (SameSite cookies)
- [ ] Input validation (Zod schemas)
- [ ] File upload restrictions (size, type, virus scan)
- [ ] Payment webhook signature verification
- [ ] Secrets in environment variables (never in code)
- [ ] Database credentials rotated quarterly
- [ ] Regular security audits (quarterly)

---

**Document Control:**
- Version: 1.0
- Last Updated: January 3, 2026
- Next Review: February 1, 2026
- Owner: Product & Engineering Teams
- Contributors: Design, QA, DevOps Teams

---

## REVISION HISTORY

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-03 | Product Team | Initial PRD creation |
