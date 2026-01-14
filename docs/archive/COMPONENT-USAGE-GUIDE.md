# 📦 CreatorFilters Component - Hướng Dẫn Sử Dụng

## 🎯 Overview

Component `CreatorFilters.tsx` là một **fully-functional React component** được viết bằng **Next.js 14 + TypeScript + Tailwind CSS** cho phần Filter và Sorting của trang Creator Center.

---

## ✨ Tính Năng

### ✅ Filter Bar (3 Dropdowns + 1 Button)
- **Category Filter** (Thể loại) - Icon: Gamepad2 🎮
- **Commission Type Filter** (Loại hoa hồng) - Icon: Percent %
- **Region Filter** (Khu vực) - Icon: Globe 🌍
- **Apply Filter Button** - Icon: Filter 🔍

### ✅ Sort Tabs (4 Tabs với Counter)
- **Tất Cả** (200+)
- **Hoa Hồng Cao** (45)
- **Mới Ra Mắt** (12)
- **Phổ Biến** (89)

### ✅ Features
- ✅ **Pixel-Perfect Alignment**: Tất cả inputs đều `h-12` (48px)
- ✅ **Outlined Style**: Nền trong suốt, viền mỏng
- ✅ **Underline Tabs**: Gạch chân + glow effect khi active
- ✅ **Responsive**: Desktop (horizontal), Mobile (vertical)
- ✅ **State Management**: `useState` cho filters & active tab
- ✅ **Smooth Animations**: Framer Motion `layoutId`
- ✅ **Type Safety**: Full TypeScript types

---

## 🚀 Cách Sử Dụng

### Bước 1: Import Component

Trong file `app/creator/page.tsx`, thêm import:

```tsx
import CreatorFilters from '@/components/CreatorFilters'
```

### Bước 2: Sử dụng trong JSX

Thay thế code filter cũ bằng:

```tsx
export default function CreatorCenterPage() {
  return (
    <>
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#2d333b]">
        <h1>Creator Center</h1>
      </div>

      {/* Hero Section */}
      <div className="px-4 py-12">
        {/* ... */}
      </div>

      {/* ===== FILTERS SECTION ===== */}
      <div className="px-4 py-8 border-b border-[#2d333b]">
        <CreatorFilters />
      </div>

      {/* Campaign Cards Grid */}
      <div className="px-4 py-8">
        {/* ... */}
      </div>
    </>
  )
}
```

---

## 🔧 Customization Options

### 1. Thay đổi Filter Options

Chỉnh sửa trong component `CreatorFilters.tsx`:

```tsx
// Category options
<select>
  <option value="">Tất cả thể loại</option>
  <option value="custom">Your Custom Category</option>
  {/* Thêm option ở đây */}
</select>
```

### 2. Thay đổi Sort Tabs

```tsx
const sortTabs: SortTab[] = [
  { key: 'all', label: 'Tất Cả', count: '200+' },
  { key: 'custom', label: 'Custom Tab', count: '99' }, // Add new tab
]
```

### 3. Connect với API

Chỉnh sửa handler `handleApplyFilters`:

```tsx
const handleApplyFilters = async () => {
  // Call API
  const response = await fetch('/api/campaigns/filter', {
    method: 'POST',
    body: JSON.stringify(filters)
  })
  
  const data = await response.json()
  // Update parent component state
  onFilterChange?.(data)
}
```

### 4. Expose State ra Parent Component

Nếu cần parent component biết filter state:

```tsx
// In CreatorFilters.tsx
interface Props {
  onFilterChange?: (filters: FilterState) => void
  onSortChange?: (sortKey: SortKey) => void
}

export default function CreatorFilters({ onFilterChange, onSortChange }: Props) {
  // ...
  
  const handleFilterChange = (field: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [field]: value }
    setFilters(newFilters)
    onFilterChange?.(newFilters) // Notify parent
  }
}
```

Usage:
```tsx
<CreatorFilters 
  onFilterChange={(filters) => console.log('Filters changed:', filters)}
  onSortChange={(sort) => console.log('Sort changed:', sort)}
/>
```

---

## 🎨 Styling Guide

### Height Consistency (KEY!)

Tất cả input fields và button đều **PHẢI có `h-12`** (48px):

```tsx
className="h-12 ..."  // ✅ Correct
className="py-3 ..."  // ❌ Wrong (variable height)
```

### Color Palette

```css
Primary Orange: #ff6b35
Secondary Orange: #f7931e
Border Gray: #6b7280 (gray-700)
Background Transparent: transparent
Text Gray: #9ca3af (gray-400)
Badge Background: #151922
```

### Icon Positioning

Icons **PHẢI** được căn giữa chính xác:

```tsx
className="absolute left-4 top-1/2 -translate-y-1/2 ..."
```

### Underline Effect

Active tab có 2 layers:
1. **Solid line**: `h-0.5` gradient orange
2. **Glow layer**: Same + `blur-md opacity-60`

---

## 📱 Responsive Behavior

### Desktop (≥ 1024px)
```css
lg:flex-row  /* Filter bar: Horizontal */
gap-3        /* Equal spacing between elements */
```

### Mobile (< 1024px)
```css
flex-col     /* Filter bar: Vertical stack */
w-full       /* Full width buttons */
```

### Tablet Scrolling
```css
overflow-x-auto  /* Sort tabs scroll horizontally */
scrollbar-hide   /* Hide scrollbar visually */
```

---

## 🔍 TypeScript Types

```typescript
// Sort tab keys
type SortKey = 'all' | 'high-commission' | 'new' | 'popular'

// Filter state
interface FilterState {
  category: string
  commissionType: string
  region: string
}

// Sort tab definition
interface SortTab {
  key: SortKey
  label: string
  count: string
}
```

---

## ⚡ Performance Tips

1. **Memoization** (nếu có nhiều re-renders):
```tsx
import { useMemo, useCallback } from 'react'

const handleFilterChange = useCallback((field, value) => {
  // ...
}, [])
```

2. **Debounce Filter Changes** (nếu gọi API):
```tsx
import { useDebounce } from 'use-debounce'

const [debouncedFilters] = useDebounce(filters, 500)

useEffect(() => {
  // Call API with debouncedFilters
}, [debouncedFilters])
```

---

## 🐛 Common Issues & Solutions

### Issue 1: Misalignment của Icons

**Vấn đề:** Icon không nằm giữa input

**Giải pháp:** Đảm bảo có đầy đủ classes:
```tsx
className="absolute left-4 top-1/2 -translate-y-1/2"
```

### Issue 2: Select Arrow bị overlap với Icon

**Vấn đề:** Custom arrow va chạm với icon

**Giải pháp:** Tăng `pr-10` cho select:
```tsx
className="pl-11 pr-10"  // Left padding for icon, right for arrow
```

### Issue 3: Underline không smooth

**Vấn đề:** Animation bị giật

**Giải pháp:** Kiểm tra `layoutId` phải unique:
```tsx
layoutId="sortUnderline"  // Must be unique across page
```

---

## ✅ Checklist Before Deploy

- [ ] All inputs have `h-12` class
- [ ] Icons aligned with `top-1/2 -translate-y-1/2`
- [ ] Custom dropdown arrows implemented
- [ ] Active tab shows underline + glow
- [ ] Responsive on mobile (flex-col)
- [ ] Button scales on hover (`hover:scale-[1.02]`)
- [ ] TypeScript has no errors
- [ ] Console logs removed from production

---

## 📦 Dependencies

```json
{
  "dependencies": {
    "react": "^18.x",
    "framer-motion": "^11.x",
    "lucide-react": "^0.x",
    "clsx": "^2.x"
  }
}
```

---

## 🎓 Best Practices

1. **Never use py-* for height consistency** - Always use `h-12`
2. **Use clsx for conditional classes** - More readable than template strings
3. **Keep state local** - Only lift state if parent needs it
4. **Use layoutId** - For smooth Framer Motion transitions
5. **Pointer-events-none on icons** - Prevents click blocking

---

**File Location:** `/components/CreatorFilters.tsx`  
**Last Updated:** 2025-12-27  
**Author:** Claude Code - Senior Next.js Engineer
