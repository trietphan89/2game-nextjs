# 🚀 Deployment Guide - 2GAME.VN

## 📦 Thay Thế Website HTML Cũ

### Bước 1: Backup Đã Hoàn Tất ✅
File HTML cũ đã được backup tại: `/home/dev/html-backup/`

### Bước 2: Build Static Files

```bash
# Navigate to Next.js project
cd /home/dev/2game-nextjs

# Install dependencies (nếu chưa cài)
npm install

# Build static HTML files
npm run build
```

Sau khi build, static files sẽ ở folder `out/`

### Bước 3: Deploy Static Files

#### Option 1: Replace HTML files locally
```bash
# Copy built files to replace old HTML
cp -r /home/dev/2game-nextjs/out/* /home/dev/

# Hoặc tạo symlink
ln -s /home/dev/2game-nextjs/out /home/dev/public
```

#### Option 2: Deploy to Vercel (Recommended) ⭐
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd /home/dev/2game-nextjs
vercel

# Follow prompts:
# - Login to Vercel
# - Link project
# - Deploy
```

URL: `https://2game-vietnam.vercel.app`

#### Option 3: Deploy to Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build & Deploy
npm run build
netlify deploy --prod --dir=out
```

#### Option 4: Deploy to GitHub Pages
```bash
# 1. Create GitHub repo
# 2. Push code
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/2game-vietnam.git
git push -u origin main

# 3. Enable GitHub Pages
# Go to repo Settings > Pages > Source: main branch, /out folder
```

#### Option 5: Traditional Web Server (Apache/Nginx)
```bash
# Build static files
npm run build

# Copy to web server root
cp -r /home/dev/2game-nextjs/out/* /var/www/html/

# Or for Apache
cp -r /home/dev/2game-nextjs/out/* /var/www/html/2game/

# Configure .htaccess for clean URLs (if needed)
```

### Bước 4: Verify Deployment

1. **Check Home Page**: Open `/` or `index.html`
2. **Check Game Detail**: Open `/game/phoenix-story/`
3. **Test Mobile**: Use browser DevTools mobile view
4. **Test Responsive**: Resize browser window

---

## 🌐 Production Build Files

Sau khi `npm run build`, folder `out/` sẽ có:

```
out/
├── index.html              # Home page
├── game/
│   └── phoenix-story/
│       └── index.html      # Game detail page
├── _next/
│   ├── static/             # CSS, JS bundles
│   └── ...
├── 404.html                # Error page
└── ...
```

## 🔧 Configuration for Production

### Environment Variables (Optional)
Create `.env.production`:
```env
NEXT_PUBLIC_SITE_URL=https://2game.vn
NEXT_PUBLIC_API_URL=https://api.2game.vn
```

### Custom Domain
1. **Vercel**:
   - Go to project settings
   - Add domain: `2game.vn`
   - Configure DNS

2. **Traditional Server**:
   - Point domain to server IP
   - Configure virtual host
   - Add SSL certificate

---

## 🆚 Comparison: Old vs New

| Feature | Old HTML | New Next.js |
|---------|----------|-------------|
| Files | 2 HTML files | Static export |
| Size | 178KB | Optimized chunks |
| Responsive | ❌ Broken | ✅ Perfect |
| Performance | Slow | ⚡ Fast |
| SEO | Basic | ✅ Optimized |
| Maintenance | Hard | ✅ Easy |

---

## 📱 Testing Checklist

Before going live, test:

- [ ] Home page loads correctly
- [ ] Game detail page works
- [ ] Mobile view (≤768px)
- [ ] Tablet view (768-1024px)
- [ ] Desktop view (>1024px)
- [ ] All links work
- [ ] Images load
- [ ] Buttons clickable
- [ ] Navigation works
- [ ] Footer displays

---

## 🔄 Update Process

To update content in the future:

```bash
# 1. Edit files in /home/dev/2game-nextjs
# 2. Rebuild
npm run build

# 3. Redeploy
# For Vercel:
vercel --prod

# For static server:
cp -r out/* /var/www/html/
```

---

## 🎯 Recommended Deployment

**For Production: Vercel** ⭐

Why Vercel?
- ✅ Free for personal projects
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Zero configuration
- ✅ Auto deploy on git push
- ✅ Custom domains
- ✅ Analytics

Deploy command:
```bash
cd /home/dev/2game-nextjs
npm install -g vercel
vercel
```

That's it! Your site will be live at `https://2game-vietnam.vercel.app`

---

## 📞 Support

Need help?
- Next.js Docs: https://nextjs.org/docs
- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com

---

**Built with ❤️ for Vietnamese gamers**
