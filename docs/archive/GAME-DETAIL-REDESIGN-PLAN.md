# 🎮 Game Detail Page Redesign - Desktop Layout

## 📋 Phân Tích Vấn Đề Hiện Tại

### ❌ **Vấn Đề:**

1. **Spacing Không Nhất Quán**
   - Padding: p-6, p-8, p-5, p-4 (lộn xộn)
   - Gap: gap-8, gap-6, gap-4, gap-3 (thiếu hệ thống)
   - Margin: Không có quy chuẩn rõ ràng

2. **Border Radius Lẫn Lộn**
   - rounded-2xl (16px)
   - rounded-xl (12px)
   - rounded-lg (8px)
   - Không có logic rõ ràng khi nào dùng cái nào

3. **Colors & Backgrounds**
   - bg-[#151922] - Dark card
   - bg-[#0a0e17] - Darker card
   - Sử dụng không nhất quán

4. **Layout Structure**
   - Hero Section: 2 columns (OK)
   - Main Content: 2/3 + 1/3 columns
   - Sidebar quá hẹp trên desktop lớn

5. **Typography**
   - Font sizes: text-3xl, text-2xl, text-lg, text-base, text-sm, text-xs
   - Line heights không consistent
   - Font weights: bold, semibold, medium, normal (lộn xộn)

---

## ✅ **Giải Pháp: Design System Nhất Quán**

### 1. **Spacing Scale (Tailwind-based)**
```css
Container Padding: p-8        /* 32px - Main sections */
Card Padding:      p-6        /* 24px - Cards */
Small Padding:     p-4        /* 16px - Compact elements */

Section Gap:       gap-8      /* 32px - Between major sections */
Card Gap:          gap-6      /* 24px - Between cards */
Element Gap:       gap-4      /* 16px - Between elements */
```

### 2. **Border Radius Hierarchy**
```css
Large Containers:  rounded-2xl  /* 16px - Hero, Main sections */
Cards:             rounded-xl   /* 12px - Info cards */
Small Elements:    rounded-lg   /* 8px - Buttons, badges */
```

### 3. **Color Palette**
```css
Primary Background:  bg-[#0a0e17]   /* Page background */
Card Background:     bg-[#151922]   /* All cards */
Nested Card:         bg-[#0a0e17]   /* Cards inside cards */
Border:              border-[#2d333b] /* All borders */
```

### 4. **Typography Scale**
```css
Page Title:    text-4xl lg:text-5xl font-bold       /* 36-48px */
Section Title: text-2xl lg:text-3xl font-bold       /* 24-30px */
Card Title:    text-lg font-bold                    /* 18px */
Body Text:     text-base text-gray-300              /* 16px */
Small Text:    text-sm text-gray-400                /* 14px */
Tiny Text:     text-xs text-gray-500                /* 12px */
```

### 5. **Layout Grid (Desktop)**
```
┌──────────────────────────────────────────┐
│           HERO SECTION                   │
│  ┌─────────────┐  ┌──────────────┐      │
│  │   Media     │  │  Game Info   │      │
│  │ Showcase    │  │  & Actions   │      │
│  │  (50%)      │  │   (50%)      │      │
│  └─────────────┘  └──────────────┘      │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│         MAIN CONTENT SECTION             │
│  ┌──────────────┐  ┌───────────┐        │
│  │    About     │  │ Developer │        │
│  │    Game      │  │   Card    │        │
│  │   (60%)      │  │           │        │
│  ├──────────────┤  ├───────────┤        │
│  │   System     │  │   Stats   │        │
│  │Requirements  │  │           │        │
│  │              │  ├───────────┤        │
│  │              │  │Age Rating │        │
│  └──────────────┘  └───────────┘        │
│                            (40%)         │
└──────────────────────────────────────────┘
```

**Grid Ratio:** 3:2 thay vì 2:1 (cân đối hơn)

---

## 🎨 **Implementation Plan**

### HERO SECTION
- **Container:** max-w-7xl, px-8, py-12 lg:py-16
- **Grid:** grid-cols-1 lg:grid-cols-2 gap-8
- **Border:** border-b border-[#2d333b]

**Left: Media Showcase**
- Video container: aspect-video, rounded-2xl
- Screenshots: grid-cols-4, gap-3, rounded-xl

**Right: Game Info**
- Title: text-4xl lg:text-5xl font-bold
- Rating badges: rounded-xl, px-4 py-2
- Stats grid: grid-cols-2 lg:grid-cols-4, gap-4
- Price card: rounded-2xl, p-6
- CTA buttons: rounded-xl, consistent sizing

### MAIN CONTENT
- **Container:** max-w-7xl, px-8, py-12
- **Grid:** grid-cols-1 lg:grid-cols-5 gap-8
- **Left:** lg:col-span-3 (60%)
- **Right:** lg:col-span-2 (40%)

**Left Column**
- About Game: bg-[#151922], rounded-2xl, p-8
  - Feature cards: bg-[#0a0e17], rounded-xl, p-6
- System Requirements: bg-[#151922], rounded-2xl, p-8
  - Specs cards: bg-[#0a0e17], rounded-xl, p-6

**Right Column (Sticky Sidebar)**
- position: lg:sticky, top-8
- Developer card: bg-[#151922], rounded-2xl, p-6
- Stats card: bg-[#151922], rounded-2xl, p-6
- Age rating: bg-[#151922], rounded-2xl, p-6

---

## 🔧 **Technical Changes**

### 1. Standardize All Paddings
```tsx
// Containers
className="p-8"

// Cards
className="p-6"

// Nested elements
className="p-4"
```

### 2. Standardize All Gaps
```tsx
// Section-level
className="gap-8"

// Card-level
className="gap-6"

// Element-level
className="gap-4"
```

### 3. Standardize Border Radius
```tsx
// Main sections
className="rounded-2xl"

// Cards
className="rounded-xl"

// Buttons, badges
className="rounded-lg"
```

### 4. Layout Grid Adjustment
```tsx
// Old: lg:grid-cols-3
// New: lg:grid-cols-5

// Left content
className="lg:col-span-3"  // 60%

// Right sidebar
className="lg:col-span-2"  // 40%
```

### 5. Sticky Sidebar
```tsx
<div className="lg:sticky lg:top-8 space-y-6">
  {/* Developer, Stats, Age Rating */}
</div>
```

---

## 📊 Before/After Comparison

| Element | Before | After |
|---------|--------|-------|
| **Hero Padding** | py-8 lg:py-16 | py-12 lg:py-16 |
| **Hero Gap** | gap-8 lg:gap-12 | gap-8 |
| **Main Padding** | py-8 lg:py-12 | py-12 |
| **Main Grid** | 2:1 (66% + 33%) | 3:2 (60% + 40%) |
| **Card Padding** | p-6 lg:p-8 | p-8 (consistent) |
| **Border Radius** | Mixed | Standardized |
| **Sidebar** | Static | Sticky |

---

## ✅ Expected Results

1. **Visual Consistency** - Tất cả spacing theo design system
2. **Better Balance** - Grid 3:2 cân đối hơn 2:1
3. **Improved UX** - Sticky sidebar khi scroll
4. **Cleaner Look** - Border radius nhất quán
5. **Professional** - Typography hierarchy rõ ràng

---

**Status:** Ready to implement
**File:** `/app/game/[id]/page.tsx`
