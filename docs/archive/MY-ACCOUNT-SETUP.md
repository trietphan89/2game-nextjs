# My Account - Setup Guide

## ✅ Đã hoàn thành:

### 1. **Linear-Styled UI Components**
Tạo thư mục `/components/my-account/` với các components:
- ✅ `card.tsx` - Card với Linear shadows
- ✅ `button.tsx` - Buttons với height 11, rounded-lg
- ✅ `badge.tsx` - Badges borderless
- ✅ `input.tsx` - Inputs với Linear focus states
- ✅ `label.tsx` - Form labels
- ✅ `top-navigation.tsx` - Floating navigation bar

### 2. **My Account Pages**
- ✅ `/app/my-account/layout.tsx` - Layout với TopNavigation
- ✅ `/app/my-account/page.tsx` - Profile page
- ✅ `/app/my-account/settings/page.tsx` - Settings page

### 3. **User Profile Link**
- ✅ Đã thêm link vào "Vietnamese User, 950 Points" trong:
  - `LeftSidebar.tsx` (line 87)
  - `MobileDrawer.tsx` (line 78)

### 4. **Dependencies**
- ✅ Installed: `class-variance-authority`, `tailwind-merge`
- ✅ Created: `/lib/utils.ts` với `cn()` và `formatVND()`

---

## ⚠️ CẦN FIX - Permission Issue

Thư mục `.next` thuộc quyền root, cần chạy lệnh sau:

```bash
sudo chown -R dev:dev /home/dev/2game-nextjs/.next/
# Hoặc xóa và rebuild
sudo rm -rf /home/dev/2game-nextjs/.next/
```

Sau đó restart server:
```bash
cd /home/dev/2game-nextjs
npm run dev
```

---

## 📝 TODO - Auto Redirect Sau Login

### Vị trí cần implement:

**File:** `/app/login/page.tsx` (hiện tại thuộc quyền root, cần sudo để access)

### Code mẫu để thêm vào login success handler:

```typescript
// Trong login success handler
const handleLoginSuccess = () => {
  // ... existing login logic

  // Redirect to My Account
  router.push('/my-account')
}
```

### Hoặc sử dụng middleware:

**File:** `middleware.ts` (nếu chưa có)

```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get('auth-token')

  // Redirect to my-account after successful login
  if (isLoggedIn && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/my-account', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/login', '/register']
}
```

---

## 🎨 Design Features

- **Top Navigation Only** - Floating navbar với backdrop blur
- **Linear Shadows** - `shadow-linear-sm/md/lg/floating`
- **Softer Dark Mode** - zinc-900 base
- **Large Typography** - text-5xl headings, text-4xl values
- **Multi-Role Support** - Dropdown cho End-user, Creator, Developer, Partner

---

## 🔗 Access My Account

Sau khi fix permissions:
- URL: `http://localhost:3000/my-account`
- Click vào "Vietnamese User, 950 Points" trong sidebar/mobile drawer
- Auto redirect sau login (cần implement)

---

## 📂 File Structure

```
/home/dev/2game-nextjs/
├── app/
│   └── my-account/
│       ├── layout.tsx          # Layout với TopNavigation
│       ├── page.tsx            # Profile page
│       └── settings/
│           └── page.tsx        # Settings page
├── components/
│   └── my-account/
│       ├── card.tsx            # Linear Card
│       ├── button.tsx          # Linear Button
│       ├── badge.tsx           # Linear Badge
│       ├── input.tsx           # Linear Input
│       ├── label.tsx           # Form Label
│       └── top-navigation.tsx  # Floating Nav
└── lib/
    └── utils.ts                # cn() + formatVND()
```

---

## 🚀 Next Steps

1. **Fix permissions** - Chạy sudo chown hoặc sudo rm
2. **Restart server** - npm run dev
3. **Test My Account** - Click vào user profile hoặc visit `/my-account`
4. **Implement auto redirect** - Thêm code vào login success handler
5. **Optional:** Thêm role switcher nếu user có nhiều roles
