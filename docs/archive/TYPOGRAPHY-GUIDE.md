# 2GAME Typography System Guide

## 📐 Overview

Hệ thống typography được thiết kế mobile-first với responsive breakpoints, đảm bảo giao diện đẹp và dễ đọc trên mọi thiết bị.

## 🎯 Design Principles

1. **Mobile-First**: Font sizes nhỏ hơn trên mobile, tăng dần trên desktop
2. **Readability**: Line-height và spacing tối ưu cho khả năng đọc
3. **Consistency**: Dùng classes chuẩn thay vì hard-code sizes
4. **Hierarchy**: Phân cấp rõ ràng giữa headings, body, và metadata

---

## 📝 Typography Classes

### 1. HEADINGS (Tiêu đề)

#### `.heading-page` - Page Titles
Tiêu đề chính của trang
- Mobile: 18px (text-lg)
- Desktop: 24px (text-2xl)
- Weight: Bold
- Usage: `<h1 className="heading-page">Discover Games</h1>`

#### `.heading-section` - Section Titles
Tiêu đề sections trong trang
- Mobile: 16px (text-base)
- Desktop: 20px (text-xl)
- Weight: Bold
- Usage: `<h2 className="heading-section">Season Information</h2>`

#### `.heading-card` - Card Titles
Tiêu đề của cards/items
- Mobile: 14px (text-sm)
- Desktop: 16px (text-base)
- Weight: Semibold
- Usage: `<h3 className="heading-card">Phoenix Story</h3>`

#### `.heading-small` - Small Labels
Labels, badge headings
- Mobile: 12px (text-xs)
- Desktop: 14px (text-sm)
- Weight: Semibold
- Usage: `<h4 className="heading-small">Rewards</h4>`

---

### 2. BODY TEXT (Nội dung)

#### `.text-body` - Primary Text
Text chính, paragraphs
- Mobile: 14px (text-sm)
- Desktop: 16px (text-base)
- Line-height: relaxed
- Usage: `<p className="text-body">Game description text</p>`

#### `.text-body-secondary` - Secondary Text
Mô tả, descriptions
- Mobile: 12px (text-xs)
- Desktop: 14px (text-sm)
- Color: #9aa0a6
- Line-height: relaxed
- Usage: `<p className="text-body-secondary">Additional info</p>`

#### `.text-meta` - Metadata
Thông tin phụ, timestamps, stats
- Mobile: 10px (text-[10px])
- Desktop: 12px (text-xs)
- Color: #9aa0a6
- Usage: `<span className="text-meta">2 hours ago</span>`

#### `.text-caption` - Captions
Text rất nhỏ cho labels, badges
- Mobile: 9px (text-[9px])
- Desktop: 10px (text-[10px])
- Color: #6e7681
- Usage: `<span className="text-caption">NEW</span>`

---

### 3. BUTTONS (Nút bấm)

#### `.btn-text-primary` - Primary Buttons
Nút chính (Buy Now, Submit, etc)
- Mobile: 12px (text-xs)
- Desktop: 14px (text-sm)
- Weight: Semibold
- Usage: `<button className="btn-text-primary">Buy Now</button>`

#### `.btn-text-secondary` - Secondary Buttons
Nút phụ (Cancel, Back, etc)
- Mobile: 10px (text-[10px])
- Desktop: 12px (text-xs)
- Weight: Medium
- Usage: `<button className="btn-text-secondary">Cancel</button>`

#### `.tab-text` - Tab Buttons
Text cho navigation tabs
- Mobile: 12px (text-xs)
- Desktop: 16px (text-base)
- Weight: Semibold
- Usage: `<button className="tab-text">Trending</button>`

---

### 4. NUMBERS & STATS (Số liệu)

#### `.number-large` - Large Numbers
Số lớn, prices, main stats
- Mobile: 20px (text-xl)
- Desktop: 32px (text-3xl)
- Weight: Bold
- Color: #ff6b35
- Usage: `<span className="number-large">149.000₫</span>`

#### `.number-medium` - Medium Numbers
Secondary stats
- Mobile: 16px (text-base)
- Desktop: 20px (text-xl)
- Weight: Bold
- Color: #ff6b35
- Usage: `<span className="number-medium">125,000</span>`

#### `.number-small` - Small Numbers
Counters, badges
- Mobile: 12px (text-xs)
- Desktop: 14px (text-sm)
- Weight: Semibold
- Usage: `<span className="number-small">+15%</span>`

---

### 5. SPACING (Khoảng cách)

#### `.section-padding` - Section Padding
Padding cho sections lớn
- Mobile: px-3 py-3 (12px)
- Desktop: px-6 py-6 (24px)
- Usage: `<div className="section-padding">...</div>`

#### `.card-padding` - Card Padding
Padding cho cards/items
- Mobile: px-3 py-3 (12px)
- Desktop: px-4 py-4 (16px)
- Usage: `<article className="card-padding">...</article>`

#### `.compact-padding` - Compact Padding
Padding gọn cho elements nhỏ
- Mobile: px-2 py-2 (8px)
- Desktop: px-3 py-2.5 (12px 10px)
- Usage: `<div className="compact-padding">...</div>`

---

### 6. SPECIAL CLASSES

#### `.hero-title` - Hero Text
Tiêu đề lớn cho landing sections
- Mobile: 20px (text-xl)
- Desktop: 36px (text-4xl)
- Weight: Extrabold
- Gradient: from-white to-[#9aa0a6]
- Usage: `<h1 className="hero-title">Welcome to 2GAME</h1>`

#### `.hero-description` - Hero Description
Mô tả hero sections
- Mobile: 14px (text-sm)
- Desktop: 18px (text-lg)
- Color: #9aa0a6
- Line-height: relaxed
- Usage: `<p className="hero-description">Best gaming platform</p>`

#### `.text-emphasis` - Emphasized Text
Text nhấn mạnh
- Color: #ff6b35
- Weight: Semibold
- Usage: `<span className="text-emphasis">Important</span>`

#### `.text-success` - Success Text
Text thành công
- Color: #3fb950
- Weight: Medium
- Usage: `<span className="text-success">Completed</span>`

#### `.text-error` - Error Text
Text lỗi
- Color: #ef4444
- Weight: Medium
- Usage: `<span className="text-error">Failed</span>`

---

## 🎨 Utility Classes

### Scrollbar Hide
```html
<div className="overflow-x-auto scrollbar-hide">
  <!-- Content with hidden scrollbar -->
</div>
```

### Line Clamp
```html
<p className="line-clamp-2">
  Long text that will be truncated after 2 lines...
</p>
```

---

## 📱 Responsive Breakpoints

```css
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
```

### Usage Example
```html
<h1 className="text-lg md:text-xl lg:text-2xl">
  Responsive heading
</h1>
```

---

## ✅ Best Practices

### DO ✓
```html
<!-- Use typography classes -->
<h1 className="heading-page">Title</h1>
<p className="text-body-secondary">Description</p>
<button className="btn-text-primary">Action</button>

<!-- Combine with responsive utilities -->
<div className="section-padding">
  <h2 className="heading-section mb-3 md:mb-4">Section</h2>
</div>

<!-- Use truncate for long text -->
<h3 className="heading-card truncate">Very Long Game Title</h3>
```

### DON'T ✗
```html
<!-- Don't hard-code sizes -->
<h1 className="text-[18px] font-bold">Title</h1>

<!-- Don't mix inconsistent spacing -->
<div className="px-4 py-2 lg:px-8 lg:py-12">

<!-- Don't skip responsive classes -->
<p className="text-sm">Always same size</p>
```

---

## 🎯 Common Patterns

### Page Header
```html
<div className="section-padding border-b border-[#2d333b] sticky top-[57px] z-10">
  <h1 className="heading-page mb-3 md:mb-4">Page Title</h1>
  <div className="flex gap-2 md:gap-3 lg:gap-4">
    <button className="tab-text">Tab 1</button>
    <button className="tab-text">Tab 2</button>
  </div>
</div>
```

### Game Card
```html
<article className="card-padding hover:bg-[#1c2128] transition-colors">
  <div className="flex gap-3 md:gap-4">
    <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg" />
    <div className="flex-1 min-w-0">
      <h3 className="heading-card truncate">Game Title</h3>
      <p className="text-meta">⭐ 4.8/5</p>
    </div>
  </div>
  <p className="text-body-secondary line-clamp-2 mb-3 md:mb-4">
    Game description that gets truncated...
  </p>
  <div className="flex gap-2">
    <button className="btn-text-primary px-4 py-2 rounded-full">
      Buy Now
    </button>
    <span className="number-medium">149.000₫</span>
  </div>
</article>
```

### Community Post
```html
<article className="card-padding">
  <div className="flex gap-2 md:gap-3 mb-2 md:mb-3">
    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full" />
    <div className="flex-1 min-w-0">
      <h3 className="heading-card truncate">Author Name</h3>
      <p className="text-meta">2 hours ago</p>
    </div>
  </div>
  <p className="text-body-secondary leading-relaxed">
    Post content here...
  </p>
</article>
```

---

## 🔧 Customization

Để thay đổi typography system, chỉnh sửa file:
- `/styles/typography.css` - Main typography classes
- `/app/globals.css` - Custom utilities

---

## 📊 Typography Scale

| Class | Mobile | Desktop | Use Case |
|-------|--------|---------|----------|
| `.hero-title` | 20px | 36px | Hero sections |
| `.heading-page` | 18px | 24px | Page titles |
| `.heading-section` | 16px | 20px | Section titles |
| `.heading-card` | 14px | 16px | Card titles |
| `.text-body` | 14px | 16px | Body text |
| `.text-body-secondary` | 12px | 14px | Descriptions |
| `.text-meta` | 10px | 12px | Metadata |
| `.text-caption` | 9px | 10px | Captions |

---

## 🎨 Color System

| Class | Color | Hex |
|-------|-------|-----|
| Primary text | Default | #e8eaed |
| Secondary text | `.text-body-secondary` | #9aa0a6 |
| Muted text | `.text-meta` | #6e7681 |
| Accent | `.text-emphasis` | #ff6b35 |
| Success | `.text-success` | #3fb950 |
| Error | `.text-error` | #ef4444 |

---

**Created by:** 2GAME Development Team
**Last Updated:** January 2026
**Version:** 1.0
