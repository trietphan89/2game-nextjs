# 🔄 REFACTORING GUIDE - 2GAME.SPACE

**Mission**: Transform existing pages to follow the Global Design System while maintaining 100% functional integrity.

---

## 📋 TABLE OF CONTENTS

1. [Refactoring Principles](#refactoring-principles)
2. [Step-by-Step Game Detail Page Refactor](#game-detail-page-refactor)
3. [Common Patterns to Replace](#common-patterns)
4. [Before & After Examples](#before-after-examples)
5. [Testing Checklist](#testing-checklist)

---

## 🎯 REFACTORING PRINCIPLES

### ✅ DO:
- **Replace** custom inline styles with Design System components
- **Reduce** font sizes to compact scale (max 30px)
- **Unify** spacing using `p-card`, `p-compact`, `gap-4`
- **Add** smooth transitions to all interactive elements
- **Apply** glassmorphism to elevated UI (nav, cards, sticky sidebar)

### ❌ DON'T:
- **Delete** any functionality or data flow
- **Remove** props, API calls, or state management
- **Change** component logic - only UI presentation
- **Break** existing routes or navigation

---

## 🎮 GAME DETAIL PAGE REFACTOR

### Current Issues (Before):
```tsx
// ❌ PROBLEM 1: Inline gradient backgrounds instead of Design System colors
<div className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500">

// ❌ PROBLEM 2: Hardcoded spacing (inconsistent)
<div className="px-6 py-6">
<div className="mb-3">
<div className="gap-5">

// ❌ PROBLEM 3: No Design System components
<button className="px-6 py-3 bg-orange-500 rounded-lg hover:bg-orange-600">
```

### Refactored Solution (After):

#### Step 1: Import Design System Components
```tsx
// Add at top of file
import { PrimaryButton, GlassCard, SectionHeader } from '@/components/ui'
```

#### Step 2: Replace Inline Buttons
```tsx
// ❌ BEFORE
<button className="px-6 py-3 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-white rounded-lg font-semibold hover:shadow-lg transition-all">
  Add to Cart
</button>

// ✅ AFTER
<PrimaryButton variant="primary" size="lg">
  Add to Cart
</PrimaryButton>
```

#### Step 3: Wrap Content Blocks in GlassCard
```tsx
// ❌ BEFORE
<section className="bg-[#161b22] border border-[#30363d] rounded-xl p-6">
  <h3 className="text-xl font-semibold mb-4">System Requirements</h3>
  {/* content */}
</section>

// ✅ AFTER
<GlassCard variant="elevated" padding="md">
  <SectionHeader title="System Requirements" size="md" />
  {/* content */}
</GlassCard>
```

#### Step 4: Fix Typography Scale
```tsx
// ❌ BEFORE (Too large headings)
<h1 className="text-4xl font-bold mb-2">Phoenix Story</h1>
<h2 className="text-3xl font-semibold">About This Game</h2>

// ✅ AFTER (Compact scale)
<h1 className="text-2xl font-semibold mb-2">Phoenix Story</h1>
<SectionHeader title="About This Game" size="md" />
```

#### Step 5: Standardize Spacing
```tsx
// ❌ BEFORE (Inconsistent)
<div className="px-6 py-6">
  <div className="mb-3">
    <div className="gap-5">

// ✅ AFTER (Design System)
<div className="p-card">
  <div className="mb-4">
    <div className="gap-4">
```

---

## 🔁 COMMON PATTERNS TO REPLACE

### Pattern 1: Custom Buttons → PrimaryButton

**Find:**
```tsx
<button className="px-* py-* bg-* rounded-* hover:*">
```

**Replace with:**
```tsx
<PrimaryButton variant="primary|secondary|outline|ghost" size="sm|md|lg">
```

---

### Pattern 2: Card Containers → GlassCard

**Find:**
```tsx
<div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6">
```

**Replace with:**
```tsx
<GlassCard variant="elevated" padding="md">
```

---

### Pattern 3: Section Titles → SectionHeader

**Find:**
```tsx
<div className="flex items-center justify-between mb-6">
  <h2 className="text-2xl font-bold">Title</h2>
  <button>View All</button>
</div>
```

**Replace with:**
```tsx
<SectionHeader
  title="Title"
  size="md"
  action={<PrimaryButton variant="ghost" size="sm">View All</PrimaryButton>}
/>
```

---

### Pattern 4: Hardcoded Colors → Design System Colors

**Find & Replace:**
```tsx
// Background colors
bg-[#0a0e17] → bg-dark
bg-[#161b22] → bg-dark-secondary
bg-[#1c2128] → bg-dark-elevated

// Text colors
text-[#e8eaed] → text-text-primary
text-[#9aa0a6] → text-text-secondary
text-[#6e7681] → text-text-muted

// Border colors
border-[#30363d] → border-border-primary
border-[#21262d] → border-border-secondary

// Brand colors
bg-[#ff6b35] → bg-primary-500
text-[#ff6b35] → text-primary-500
```

---

### Pattern 5: Large Font Sizes → Compact Scale

**Find & Replace:**
```tsx
text-5xl → text-2xl (H1 max)
text-4xl → text-xl (H2)
text-3xl → text-lg (H3)
text-2xl → text-base (emphasized body)
text-xl → text-sm (regular body)
```

---

## 📸 BEFORE & AFTER EXAMPLES

### Example A: Game Info Card

#### ❌ BEFORE
```tsx
<div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 mb-6">
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-2xl font-bold text-white">Game Information</h2>
  </div>
  <div className="grid grid-cols-2 gap-4">
    <div className="flex items-center gap-2">
      <Building className="w-5 h-5 text-[#9aa0a6]" />
      <div>
        <div className="text-xs text-[#6e7681]">Developer</div>
        <div className="text-sm font-semibold text-white">Phoenix Studios</div>
      </div>
    </div>
    {/* more items... */}
  </div>
  <button className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-white rounded-lg font-semibold hover:shadow-lg transition-all">
    Add to Wishlist
  </button>
</div>
```

#### ✅ AFTER
```tsx
<GlassCard variant="elevated" padding="md">
  <SectionHeader title="Game Information" size="md" />

  <div className="grid grid-cols-2 gap-4 mt-4">
    <div className="flex items-center gap-2">
      <Building className="w-5 h-5 text-text-secondary" />
      <div>
        <div className="text-xs text-text-muted">Developer</div>
        <div className="text-sm font-semibold text-text-primary">Phoenix Studios</div>
      </div>
    </div>
    {/* more items... */}
  </div>

  <PrimaryButton variant="outline" size="md" fullWidth className="mt-4">
    Add to Wishlist
  </PrimaryButton>
</GlassCard>
```

**Changes Made:**
1. ✅ Replaced custom card with `GlassCard`
2. ✅ Used `SectionHeader` for title
3. ✅ Applied Design System colors
4. ✅ Replaced custom button with `PrimaryButton`
5. ✅ Maintained all functionality (icons, data, grid layout)

---

### Example B: Purchase Section

#### ❌ BEFORE
```tsx
<div className="bg-[#0a0e17] border border-[#30363d] rounded-xl p-6">
  <div className="flex items-center justify-between mb-4">
    <div>
      <div className="text-xs text-[#6e7681] mb-1">Price</div>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-[#3fb950]">₫199,000</span>
        <span className="text-lg text-[#6e7681] line-through">₫299,000</span>
        <span className="px-2 py-0.5 bg-[#3fb950] text-black text-xs font-bold rounded">-33%</span>
      </div>
    </div>
  </div>
  <button className="w-full px-6 py-3 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
    <ShoppingCart className="w-5 h-5" />
    Mua ngay
  </button>
</div>
```

#### ✅ AFTER
```tsx
<GlassCard variant="elevated" padding="md">
  <div className="flex items-center justify-between mb-4">
    <div>
      <div className="text-xs text-text-muted mb-1">Price</div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-green-500">₫199,000</span>
        <span className="text-sm text-text-muted line-through">₫299,000</span>
        <span className="px-2 py-0.5 bg-green-500 text-black text-xs font-bold rounded-tag">-33%</span>
      </div>
    </div>
  </div>

  <PrimaryButton variant="primary" size="lg" fullWidth>
    <ShoppingCart className="w-5 h-5" />
    Mua ngay
  </PrimaryButton>
</GlassCard>
```

**Changes Made:**
1. ✅ GlassCard wrapper
2. ✅ Reduced price font size (3xl → 2xl)
3. ✅ Design System colors
4. ✅ PrimaryButton with icon support
5. ✅ Consistent border-radius (`rounded-tag`)

---

## ✅ TESTING CHECKLIST

After refactoring each page, verify:

### Functionality
- [ ] All buttons still trigger correct actions
- [ ] Forms submit properly
- [ ] Navigation links work
- [ ] Data fetching/API calls unchanged
- [ ] State management intact

### Visual Consistency
- [ ] No font sizes above 30px
- [ ] All spacing uses Design System (`p-card`, `gap-4`, etc.)
- [ ] Colors match Design System palette
- [ ] Hover states have smooth transitions
- [ ] Glass effect applied to elevated UI

### Responsive Design
- [ ] Mobile layout works (breakpoints: sm, md, lg)
- [ ] Touch targets are adequate (min 44px)
- [ ] Text remains readable on small screens

### Performance
- [ ] No new console errors
- [ ] Page loads without flicker
- [ ] Animations are smooth (60fps)

---

## 🚀 QUICK WINS (Start Here)

**Priority 1: High-Traffic Pages**
1. `/game/[id]` - Game Detail Page
2. `/` - Home/Discover Page
3. `/creator` - Creator Dashboard

**Priority 2: Global Components**
4. `Header.tsx` - Apply glassmorphism
5. `LeftSidebar.tsx` - Fix active states
6. `RightSidebar.tsx` - Compact spacing

**Priority 3: Secondary Pages**
7. `/rankings` - Data tables
8. `/community` - Post cards
9. `/events` - Event cards

---

## 📚 RESOURCES

- **Design System Docs**: `/DESIGN_SYSTEM.md`
- **Component Library**: `/components/ui/`
- **Tailwind Config**: `/tailwind.config.js`

---

**Last Updated**: 2025-12-30
**Version**: 1.0.0
