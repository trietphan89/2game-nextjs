# 🎮 Game Detail Page - Premium Redesign Specification

## 📋 Design Brief

**Role:** Senior UI/UX Designer (Game Storefronts Specialist)
**Objective:** Transform game detail page from cluttered 3-column layout to premium, immersive 2-column experience
**References:** Steam, Epic Games Store, GOG Galaxy
**Target:** Desktop users (1024px+)

---

## ❌ Current Problems

1. **3-Column Layout is Cramped**
   - Main content (media/trailer) squeezed by sidebars
   - Lack of visual hierarchy
   - No breathing room

2. **Legal/Compliance Text Takes "Prime Real Estate"**
   - Long legal text occupies right sidebar above the fold
   - Pushes important purchase actions down
   - Not user-focused

3. **No Immersive Feel**
   - Plain background
   - No atmospheric backdrop
   - Looks generic, not premium

4. **Purchase Flow Not Optimized**
   - Buy button buried in sidebar
   - No sticky behavior
   - Price not prominent enough

---

## ✅ Redesign Strategy

### **Layout Philosophy: "Content First, Commerce Second"**

```
┌─────────────────────────────────────────────────────────────┐
│                    IMMERSIVE HERO SECTION                   │
│         (Full-width backdrop blur with game artwork)        │
│                                                              │
│  ┌──────────────────────────┐  ┌──────────────────────┐   │
│  │   MEDIA GALLERY          │  │  STICKY SIDEBAR      │   │
│  │   (Video/Screenshots)    │  │  ┌────────────────┐  │   │
│  │   70% Width              │  │  │ Game Logo      │  │   │
│  │                          │  │  ├────────────────┤  │   │
│  │                          │  │  │ Price Card     │  │   │
│  │                          │  │  │ [BUY NOW]      │  │   │
│  │                          │  │  ├────────────────┤  │   │
│  └──────────────────────────┘  │  │ Meta Info      │  │   │
│                                 │  │ (Dev, Date)    │  │   │
│  ┌──────────────────────────┐  │  └────────────────┘  │   │
│  │   ABOUT THIS GAME        │  │      30% Width       │   │
│  │   (Description)          │  │      (Sticky)        │   │
│  └──────────────────────────┘  └──────────────────────┘   │
│                                                              │
│  ┌──────────────────────────┐                              │
│  │ SYSTEM REQUIREMENTS      │                              │
│  │ (Tabs: Min / Rec)        │                              │
│  └──────────────────────────┘                              │
└─────────────────────────────────────────────────────────────┘
│                    FOOTER SECTION                           │
│              (Legal, Compliance, Support)                   │
└─────────────────────────────────────────────────────────────┘
```

---

## 🏗️ HTML/Grid Structure

### **Main Container**
```tsx
<main className="relative">
  {/* Backdrop Hero */}
  <section className="hero-backdrop">
    {/* Background artwork with overlay */}
  </section>

  {/* Content Grid */}
  <div className="max-w-7xl mx-auto px-8 py-12">
    <div className="grid grid-cols-12 gap-8">

      {/* LEFT: Main Content (70%) */}
      <div className="col-span-8 space-y-8">
        {/* Media Gallery */}
        {/* About Game */}
        {/* System Requirements */}
      </div>

      {/* RIGHT: Sticky Sidebar (30%) */}
      <div className="col-span-4">
        <div className="sticky top-4 space-y-6">
          {/* Game Logo */}
          {/* Pricing Card */}
          {/* Meta Info */}
        </div>
      </div>

    </div>
  </div>

  {/* Footer with Legal */}
  <footer>
    {/* Legal/Compliance moved here */}
  </footer>
</main>
```

### **Grid Breakdown**
```css
grid-cols-12      /* 12-column grid system */
col-span-8        /* 8/12 = 66.67% ≈ 70% for content */
col-span-4        /* 4/12 = 33.33% ≈ 30% for sidebar */
gap-8             /* 32px gap between columns */
```

---

## 🎨 Component Design Specs

### 1. **IMMERSIVE HERO BACKDROP**

**Concept:** Game artwork as atmospheric background

```tsx
<section className="relative overflow-hidden">
  {/* Background Artwork - Blurred */}
  <div className="absolute inset-0 -z-10">
    <Image
      src="/game-artwork.jpg"
      className="w-full h-full object-cover scale-110 blur-2xl opacity-30"
    />
    {/* Dark Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17]/80 via-[#0a0e17]/95 to-[#0a0e17]" />
  </div>

  {/* Content on top */}
  <div className="relative z-10">
    {/* Grid layout here */}
  </div>
</section>
```

**Key Classes:**
- `blur-2xl` - Heavy blur for artwork
- `opacity-30` - Subtle visibility
- `scale-110` - Prevent blur edge artifacts
- Dual gradient overlay for depth

---

### 2. **MEDIA GALLERY (70% Column)**

**Layout:**
```tsx
<div className="space-y-4">
  {/* Main Video/Image */}
  <div className="aspect-video relative rounded-xl overflow-hidden group">
    <video className="w-full h-full object-cover" />
    {/* Play button overlay */}
  </div>

  {/* Thumbnails Row */}
  <div className="grid grid-cols-5 gap-3">
    {screenshots.map(img => (
      <div className="aspect-video rounded-lg overflow-hidden cursor-pointer
                      border-2 border-transparent hover:border-[#ff6b35]
                      transition-all hover:scale-105">
        <img src={img} />
      </div>
    ))}
  </div>
</div>
```

**Specs:**
- Main video: `aspect-video` (16:9) + `rounded-xl`
- Thumbnails: 5 columns, `rounded-lg`, interactive hover
- Border highlight on hover: `border-[#ff6b35]`

---

### 3. **STICKY PRICING SIDEBAR (30% Column)**

**Sticky Behavior:**
```tsx
<div className="col-span-4">
  <div className="sticky top-4 space-y-6">
    {/* Content stays in view while scrolling */}
  </div>
</div>
```

**Component Structure:**

#### A. Game Logo
```tsx
<div className="bg-[#151922] border border-[#2d333b] rounded-2xl p-6
                flex items-center justify-center">
  <img src="/game-logo.png" className="w-full max-w-[200px] h-auto" />
</div>
```

#### B. Pricing Card (THE MONEY MAKER)
```tsx
<div className="bg-gradient-to-br from-[#151922] to-[#0a0e17]
                border border-[#ff6b35]/30 rounded-2xl p-6
                shadow-2xl shadow-[#ff6b35]/10">

  {/* Discount Badge */}
  <div className="absolute -top-3 right-4 bg-gradient-to-r from-[#ff6b35] to-[#f7931e]
                  text-white text-sm font-bold px-4 py-1.5 rounded-full">
    -25% OFF
  </div>

  {/* Price */}
  <div className="mb-6">
    <div className="flex items-baseline gap-3 mb-2">
      <span className="text-4xl font-bold text-white">149.000₫</span>
      <span className="text-xl text-gray-500 line-through">199.000₫</span>
    </div>
    <p className="text-sm text-gray-400">Special Edition</p>
  </div>

  {/* Primary CTA */}
  <button className="w-full h-14 bg-gradient-to-r from-[#ff6b35] to-[#f7931e]
                     text-white font-bold text-base uppercase tracking-wide
                     rounded-xl shadow-xl shadow-[#ff6b35]/40
                     hover:shadow-2xl hover:shadow-[#ff6b35]/60
                     hover:scale-[1.02] active:scale-[0.98]
                     transition-all duration-300">
    🛒 MUA NGAY
  </button>

  {/* Secondary Actions */}
  <div className="grid grid-cols-2 gap-3 mt-3">
    <button className="h-12 bg-[#0a0e17] border border-[#2d333b]
                       hover:border-[#ff6b35] text-gray-300 hover:text-white
                       font-semibold rounded-lg transition-all">
      ❤️ Wishlist
    </button>
    <button className="h-12 bg-[#0a0e17] border border-[#2d333b]
                       hover:border-[#ff6b35] text-gray-300 hover:text-white
                       font-semibold rounded-lg transition-all">
      🔗 Share
    </button>
  </div>
</div>
```

**Design Decisions:**
- **Price font size**: `text-4xl` (36px) - Can't miss it!
- **Buy button height**: `h-14` (56px) - Fat finger friendly
- **Uppercase tracking**: Professional, call-to-action style
- **Gradient border**: `border-[#ff6b35]/30` - Premium feel
- **Shadow layers**: Multiple shadows for depth

#### C. Meta Info Card
```tsx
<div className="bg-[#151922] border border-[#2d333b] rounded-2xl p-6">
  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
    Game Information
  </h3>

  <div className="space-y-3 text-sm">
    {/* Developer */}
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-[#0a0e17] flex items-center justify-center">
        <Building className="w-4 h-4 text-[#ff6b35]" />
      </div>
      <div>
        <div className="text-gray-400 text-xs">Developer</div>
        <div className="text-gray-100 font-medium">Phoenix Studios</div>
      </div>
    </div>

    {/* Release Date */}
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-[#0a0e17] flex items-center justify-center">
        <Calendar className="w-4 h-4 text-[#ff6b35]" />
      </div>
      <div>
        <div className="text-gray-400 text-xs">Release Date</div>
        <div className="text-gray-100 font-medium">Q1 2025</div>
      </div>
    </div>

    {/* Platform */}
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-[#0a0e17] flex items-center justify-center">
        <Monitor className="w-4 h-4 text-[#ff6b35]" />
      </div>
      <div>
        <div className="text-gray-400 text-xs">Platform</div>
        <div className="text-gray-100 font-medium">Windows PC</div>
      </div>
    </div>
  </div>
</div>
```

---

### 4. **ABOUT THIS GAME (Content Body)**

**Max Width for Readability:**
```tsx
<section className="bg-[#151922] border border-[#2d333b] rounded-2xl p-8">
  <h2 className="text-3xl font-bold text-white mb-6">About This Game</h2>

  {/* Prose container limits line width for better readability */}
  <div className="prose prose-invert prose-lg max-w-none">
    <p className="text-gray-300 leading-relaxed">
      Phoenix Story: Awakening is an epic fantasy RPG...
    </p>
  </div>
</section>
```

**Typography:**
- Line height: `leading-relaxed` (1.625)
- Font size: `text-base` to `text-lg` (16-18px)
- Color: `text-gray-300` for body text
- Max line length: Naturally limited by 70% column width

---

### 5. **SYSTEM REQUIREMENTS (TABS)**

**Tab Implementation:**
```tsx
<section className="bg-[#151922] border border-[#2d333b] rounded-2xl p-8">
  <h2 className="text-3xl font-bold text-white mb-6">System Requirements</h2>

  {/* Tab Headers */}
  <div className="flex gap-4 mb-6 border-b border-[#2d333b]">
    <button className={`pb-3 px-4 text-sm font-bold uppercase tracking-wide
                        relative transition-colors
                        ${activeTab === 'min'
                          ? 'text-[#ff6b35]'
                          : 'text-gray-400 hover:text-gray-200'}`}
            onClick={() => setActiveTab('min')}>
      Minimum
      {activeTab === 'min' && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5
                        bg-gradient-to-r from-[#ff6b35] to-[#f7931e]" />
      )}
    </button>

    <button className={/* Same for Recommended */}>
      Recommended
    </button>
  </div>

  {/* Tab Content */}
  <div className="bg-[#0a0e17] border border-[#2d333b] rounded-xl p-6">
    {activeTab === 'min' ? (
      <MinimumSpecs />
    ) : (
      <RecommendedSpecs />
    )}
  </div>
</section>
```

**Specs Display:**
```tsx
<div className="space-y-4">
  {[
    { label: 'OS', value: 'Windows 10 64-bit' },
    { label: 'Processor', value: 'Intel i5-6600K' },
    { label: 'Memory', value: '8 GB RAM' },
    { label: 'Graphics', value: 'GTX 1060 6GB' },
    { label: 'Storage', value: '50 GB' },
  ].map(spec => (
    <div className="flex justify-between items-baseline">
      <span className="text-gray-400 text-sm font-medium">{spec.label}:</span>
      <span className="text-gray-100 font-semibold text-right">{spec.value}</span>
    </div>
  ))}
</div>
```

---

### 6. **FOOTER (Legal/Compliance)**

**Moved from Sidebar:**
```tsx
<footer className="bg-[#0a0e17] border-t border-[#2d333b] mt-16">
  <div className="max-w-7xl mx-auto px-8 py-12">
    <div className="grid grid-cols-3 gap-8">

      {/* Legal */}
      <div>
        <h4 className="text-sm font-bold text-gray-400 uppercase mb-4">Legal</h4>
        <ul className="space-y-2 text-xs text-gray-500">
          <li>Terms of Service</li>
          <li>Privacy Policy</li>
          <li>Refund Policy</li>
        </ul>
      </div>

      {/* Support */}
      <div>
        <h4 className="text-sm font-bold text-gray-400 uppercase mb-4">Support</h4>
        <ul className="space-y-2 text-xs text-gray-500">
          <li>Help Center</li>
          <li>Contact Us</li>
          <li>Report a Problem</li>
        </ul>
      </div>

      {/* Compliance */}
      <div>
        <h4 className="text-sm font-bold text-gray-400 uppercase mb-4">Compliance</h4>
        <p className="text-xs text-gray-500 leading-relaxed">
          © 2025 2GAME.VN. All rights reserved...
        </p>
      </div>

    </div>
  </div>
</footer>
```

---

## 📐 Tailwind CSS Reference

### **Layout Classes**
```css
/* Grid System */
grid-cols-12          /* 12-column grid */
col-span-8            /* Main content (70%) */
col-span-4            /* Sidebar (30%) */
gap-8                 /* 32px column gap */

/* Sticky Sidebar */
sticky                /* Position sticky */
top-4                 /* Offset from top (16px) */
self-start            /* Align to top */

/* Container */
max-w-7xl             /* Max width 1280px */
mx-auto               /* Center horizontally */
px-8                  /* Horizontal padding 32px */
py-12                 /* Vertical padding 48px */
```

### **Backdrop Blur Effect**
```css
/* Background Image */
blur-2xl              /* 40px blur radius */
opacity-30            /* 30% opacity */
scale-110             /* 110% scale (prevent edges) */
object-cover          /* Cover container */

/* Overlay Gradient */
bg-gradient-to-b      /* Top to bottom */
from-[#0a0e17]/80     /* Start: 80% opacity */
via-[#0a0e17]/95      /* Middle: 95% opacity */
to-[#0a0e17]          /* End: 100% opacity */
```

### **Pricing Card Premium Effects**
```css
/* Background */
bg-gradient-to-br     /* Diagonal gradient */
from-[#151922]        /* Dark start */
to-[#0a0e17]          /* Darker end */

/* Border Glow */
border                /* 1px border */
border-[#ff6b35]/30   /* Orange at 30% opacity */

/* Shadows (Multi-layer) */
shadow-2xl            /* Large shadow */
shadow-[#ff6b35]/10   /* Orange tint at 10% */

/* Hover Effects */
hover:shadow-2xl      /* Increase on hover */
hover:shadow-[#ff6b35]/60  /* Stronger glow */
hover:scale-[1.02]    /* Subtle scale up */
```

### **Button Styling**
```css
/* Primary CTA */
h-14                  /* Height 56px */
bg-gradient-to-r      /* Left to right gradient */
from-[#ff6b35]        /* Orange */
to-[#f7931e]          /* Yellow-orange */
text-base             /* 16px font */
font-bold             /* Bold weight */
uppercase             /* ALL CAPS */
tracking-wide         /* Letter spacing */
rounded-xl            /* 12px border radius */

/* Transitions */
transition-all        /* Animate all properties */
duration-300          /* 300ms duration */
```

---

## 🎯 Design Principles Applied

### **1. Visual Hierarchy**
- **Largest:** Price (text-4xl)
- **Large:** Section titles (text-3xl)
- **Medium:** Buy button (h-14, uppercase)
- **Small:** Meta info (text-sm)

### **2. Color Psychology**
- **Orange Gradient (#ff6b35 → #f7931e)**: Excitement, action, urgency
- **Dark Backgrounds (#0a0e17, #151922)**: Premium, focus on content
- **White Text**: High contrast, readability
- **Gray Hierarchy**: text-gray-100 → 300 → 400 → 500

### **3. Spacing Rhythm**
- **Large gaps**: gap-8 (32px) - Between major sections
- **Medium gaps**: gap-6 (24px) - Inside cards
- **Small gaps**: gap-3 (12px) - Between related items

### **4. Interactive Feedback**
- **Hover states**: Scale, glow, border color change
- **Active states**: Scale down (pressed effect)
- **Transitions**: 300ms smooth animations

---

## 🚀 Implementation Priority

### **Phase 1: Structure (Must Have)**
1. ✅ Convert to 12-column grid (col-span-8 + col-span-4)
2. ✅ Implement sticky sidebar (`sticky top-4`)
3. ✅ Move Legal/Compliance to footer
4. ✅ Add backdrop blur hero section

### **Phase 2: Components (Core)**
5. ✅ Build pricing card with prominent buy button
6. ✅ Create media gallery with thumbnails
7. ✅ Add game logo to sidebar top
8. ✅ Style meta info cards

### **Phase 3: Polish (Premium Feel)**
9. ✅ Add multi-layer shadows
10. ✅ Implement smooth transitions
11. ✅ Create tabs for system requirements
12. ✅ Fine-tune typography hierarchy

---

## 📊 Success Metrics

**Visual Quality:**
- ✅ Looks as premium as Steam/Epic
- ✅ Clear focus on media & purchase action
- ✅ No clutter, clean hierarchy

**User Experience:**
- ✅ Buy button always visible (sticky)
- ✅ Media takes center stage (70% width)
- ✅ Legal text doesn't distract

**Technical:**
- ✅ Responsive (works 1024px+)
- ✅ Performant (CSS-only effects)
- ✅ Maintainable (Tailwind utilities)

---

**Designed By:** Senior UI/UX Designer (Game Storefronts Specialist)
**Status:** Ready for Implementation
**Estimated Impact:** 🔥 Premium transformation
