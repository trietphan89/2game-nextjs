# 🚀 Quick Setup Guide - 2GAME.VN Next.js

## Step-by-Step Installation

### 1. Navigate to Project
```bash
cd /home/dev/2game-nextjs
```

### 2. Install Dependencies
```bash
npm install
```

This will install:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Lucide React (icons)

### 3. Start Development Server
```bash
npm run dev
```

### 4. Open Browser
Navigate to: **http://localhost:3000**

## ✅ What You'll See

### Home Page (/)
- Hero section with featured game
- Trending Games grid (6 games)
- New Releases grid (4 games)
- Coming Soon section
- Fully responsive mobile/desktop

### Game Detail Page (/game/phoenix-story)
- Game header with cover, title, rating
- Media gallery (video + screenshots)
- About This Game section with icons
- Pre-order bonus box
- Local payment info
- System requirements
- Right sidebar with:
  - Price card
  - Game stats
  - Developer info
  - Age rating

## 📱 Test Responsive Design

1. **Desktop View**: Open normally
2. **Mobile View**:
   - Press F12 (DevTools)
   - Click device toolbar icon
   - Select "iPhone 12 Pro" or any mobile device
   - Refresh page

## 🎨 Customization

### Change Colors
Edit `tailwind.config.js`:
```js
colors: {
  primary: {
    DEFAULT: '#FF6B35',  // Change this
  }
}
```

### Change Content
Edit pages directly:
- Home: `app/page.tsx`
- Game Detail: `app/game/[id]/page.tsx`

### Add New Game
In `app/page.tsx`, add to `trendingGames` array:
```typescript
{
  id: 'your-game-slug',
  title: 'Your Game Name',
  genre: 'Genre, Tags',
  price: '149.000₫',
  rating: 4.8,
  coverGradient: 'bg-gradient-to-br from-purple-600 to-pink-500',
}
```

## 🔧 Common Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run lint
```

## 📂 File Locations

| What | Where |
|------|-------|
| Home page | `app/page.tsx` |
| Game detail | `app/game/[id]/page.tsx` |
| Header | `components/Header.tsx` |
| Footer | `components/Footer.tsx` |
| Styles | `app/globals.css` |
| Config | `tailwind.config.js` |

## 🐛 Troubleshooting

### Port 3000 already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

### Module not found
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors
```bash
# Restart TypeScript server in VS Code
Cmd/Ctrl + Shift + P -> "TypeScript: Restart TS Server"
```

## 🌟 Key Features Working

✅ Responsive header (desktop + mobile)
✅ Language switcher (VI, EN, CN)
✅ Platform switcher (Android/iOS)
✅ Game cards with hover effects
✅ Mobile bottom navigation
✅ Game detail page fully functional
✅ All sections responsive
✅ Optimized font sizes for mobile
✅ Touch-friendly buttons
✅ Clean, modern UI

## 📞 Need Help?

Check:
1. **README.md** - Full documentation
2. **Next.js Docs** - https://nextjs.org/docs
3. **Tailwind Docs** - https://tailwindcss.com/docs

---

**Total build time**: ~5 minutes from scratch
**No HTML/CSS conflicts**: Everything is component-based
**100% Responsive**: Tested on all screen sizes
