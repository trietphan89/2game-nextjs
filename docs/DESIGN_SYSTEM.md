# 2GAME.SPACE - DESIGN SYSTEM DOCUMENTATION

## 📋 TABLE OF CONTENTS

1. [Typography](#typography)
2. [Colors](#colors)
3. [Spacing](#spacing)
4. [Components](#components)
5. [Best Practices](#best-practices)

---

## 🔤 TYPOGRAPHY

### Font Family
- **Primary**: Be Vietnam Pro (optimized for Vietnamese)
- **Monospace**: Fira Code (for code/numbers)

### Font Sizes (COMPACT SCALE)
```tsx
text-xs   → 12px (metadata, tags)
text-sm   → 14px (body text - DEFAULT)
text-base → 16px (emphasized body)
text-lg   → 18px (small headings)
text-xl   → 20px (H3 headings)
text-2xl  → 24px (H2 headings)
text-3xl  → 30px (H1 headings - MAX)
```

**⚠️ RULE**: NO font sizes above 30px. Keep it compact!

### Usage Examples
```tsx
// ✅ CORRECT - Compact & Scannable
<h1 className="text-2xl font-semibold">Game Title</h1>
<p className="text-sm text-text-secondary">Description</p>

// ❌ WRONG - Too large
<h1 className="text-6xl">Game Title</h1>
```

---

## 🎨 COLORS

### Brand Colors (Orange Accent)
```tsx
primary-500  → #FF6B35 (Main brand color)
primary-600  → #E55A2A (Hover state)
primary-700  → #CC4A1F (Active state)
```

### Dark Theme Layers (NO Pure Black!)
```tsx
dark          → #0D1117 (Main background)
dark-secondary → #161B22 (Elevated layer 1)
dark-elevated  → #1C2128 (Elevated layer 2)
dark-hover    → #21262D (Hover states)
dark-card     → #0A0E17 (Card backgrounds)
```

### Text Colors
```tsx
text-primary   → #E8EAED (Main text)
text-secondary → #9AA0A6 (Secondary text)
text-muted     → #6E7681 (Muted/disabled text)
text-accent    → #FF6B35 (Accent/links)
```

### Borders
```tsx
border-primary   → #30363D (Main borders)
border-secondary → #21262D (Subtle dividers)
border-accent    → #FF6B35 (Highlighted borders)
```

### Glassmorphism
```tsx
bg-glass-light   → rgba(255,255,255,0.05)
bg-glass-medium  → rgba(255,255,255,0.1)
bg-glass-dark    → rgba(0,0,0,0.3)
backdrop-blur-md → Apply glass effect
```

---

## 📏 SPACING & LAYOUT

### Standard Spacing
```tsx
p-tight    → 12px (tight spacing)
p-compact  → 16px (compact padding)
p-card     → 24px (card padding - STANDARD)
p-section  → 48px (section spacing)
```

### Border Radius
```tsx
rounded-tag    → 6px  (small tags/badges)
rounded-button → 8px  (buttons/inputs)
rounded-card   → 12px (cards/containers)
```

### Grid Layouts
```tsx
// ✅ COMPACT GRID (2-3 columns max)
<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

// ❌ AVOID (too many columns = cluttered)
<div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
```

---

## 🧩 COMPONENTS

### 1. PrimaryButton
```tsx
import { PrimaryButton } from '@/components/ui'

// Variants
<PrimaryButton variant="primary">Buy Now</PrimaryButton>
<PrimaryButton variant="outline">Learn More</PrimaryButton>
<PrimaryButton variant="ghost">Cancel</PrimaryButton>

// Sizes
<PrimaryButton size="sm">Small</PrimaryButton>
<PrimaryButton size="md">Medium</PrimaryButton>
<PrimaryButton size="lg">Large</PrimaryButton>
```

### 2. GlassCard
```tsx
import { GlassCard } from '@/components/ui'

<GlassCard variant="elevated" padding="md">
  <h3>Game Stats</h3>
  <p>Content here</p>
</GlassCard>

// Variants
variant="default"   → Basic glass card
variant="elevated"  → Glass card with shadow
variant="hover"     → Interactive hover effect
```

### 3. SectionHeader
```tsx
import { SectionHeader } from '@/components/ui'

<SectionHeader
  title="Featured Games"
  subtitle="Discover the best games"
  icon={<Star className="w-5 h-5" />}
  action={<ViewAllButton />}
  size="md"
/>
```

### 4. Tooltip
```tsx
import { Tooltip } from '@/components/ui'

// Basic usage
<Tooltip content="Download app for Windows and macOS">
  <button>Download PC</button>
</Tooltip>

// With custom position
<Tooltip content="Get mobile app" position="bottom">
  <button>Mobile App</button>
</Tooltip>

// Positions available
position="top"    → Above element (default)
position="bottom" → Below element
position="left"   → Left side
position="right"  → Right side

// Custom delay (ms)
<Tooltip content="Tooltip text" delay={500}>
```

---

## ✅ BEST PRACTICES

### 1. Micro-Interactions (Smooth Transitions)
```tsx
// ✅ Always add transitions
<button className="
  transition-all duration-smooth ease-smooth
  hover:-translate-y-1
  hover:shadow-hover
">

// ❌ Avoid instant changes
<button className="hover:bg-primary">
```

### 2. Glassmorphism Effect
```tsx
// ✅ Use for sticky elements (Navbar, Sidebar)
<nav className="
  bg-dark-elevated/80
  backdrop-blur-md
  border-b border-border-primary
">

// ✅ Use for cards
<div className="
  bg-gradient-glass
  backdrop-blur-xl
  rounded-card
">
```

### 3. Active States (Navigation)
```tsx
// ✅ Clear active indicator
<div className={`
  ${isActive ? 'bg-dark-hover border-l-4 border-primary-500' : ''}
  px-4 py-2
`}>

// ❌ Subtle active state (hard to see)
<div className={isActive ? 'bg-gray-900' : ''}>
```

### 4. Linear Flow (Content Layout)
```tsx
// ✅ 70-30 Split (Content-Sidebar)
<div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
  <main>{/* Main content */}</main>
  <aside className="sticky top-4">{/* Sidebar */}</aside>
</div>
```

### 5. Scannable Content
```tsx
// ✅ Group related info in compact blocks
<GlassCard variant="default" padding="sm">
  <div className="flex items-center justify-between">
    <span className="text-xs text-text-secondary">Price</span>
    <span className="text-sm font-semibold text-primary-500">$19.99</span>
  </div>
</GlassCard>

// ❌ Sprawling layout with too much whitespace
<div className="p-12">
  <h1 className="text-6xl mb-10">Price</h1>
  <p className="text-4xl">$19.99</p>
</div>
```

---

## 🚀 MIGRATION GUIDE

### Step 1: Update Imports
```tsx
// Old
import MyCustomButton from '@/components/MyCustomButton'

// New (Design System)
import { PrimaryButton, GlassCard, SectionHeader } from '@/components/ui'
```

### Step 2: Replace Custom Styles
```tsx
// Old
<button className="px-6 py-3 bg-orange-500 rounded-lg hover:bg-orange-600">

// New
<PrimaryButton variant="primary" size="md">
```

### Step 3: Apply Compact Typography
```tsx
// Old
<h1 className="text-5xl font-bold mb-8">

// New
<h1 className="text-2xl font-semibold mb-4">
```

---

## 📚 RESOURCES

- **Tailwind Config**: `/tailwind.config.js`
- **Components**: `/components/ui/`
- **Font Setup**: `/app/layout.tsx`

---

**Last Updated**: 2025-12-30
**Version**: 1.0.0
