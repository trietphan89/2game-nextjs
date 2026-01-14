# Hướng Dẫn Deploy lên Cloudflare

## 🚀 OPTION 1: Cloudflare Pages (RECOMMENDED)

Cloudflare Pages sẽ tự động build và deploy Next.js app của bạn.

### Bước 1: Push code lên GitHub

```bash
# Tạo repo mới trên GitHub: https://github.com/new
# Đặt tên: 2game-nextjs (hoặc tên khác)

# Link với GitHub repo
git remote add origin https://github.com/YOUR_USERNAME/2game-nextjs.git
git branch -M main
git push -u origin main
```

### Bước 2: Deploy qua Cloudflare Pages

1. Đăng nhập Cloudflare Dashboard: https://dash.cloudflare.com/
2. Vào **Workers & Pages** → **Create application** → **Pages** tab
3. Click **Connect to Git**
4. Chọn GitHub repository: `2game-nextjs`
5. Configure build settings:
   ```
   Framework preset: Next.js
   Build command: npm run build
   Build output directory: .next
   ```

6. **Environment Variables** (QUAN TRỌNG!):
   Click **Add variable** và thêm tất cả biến từ file `.env`:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDBpJG9wGAtYLdjsiTTr7yMG9U384om_M4
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=game-demo-c2462.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=game-demo-c2462
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=game-demo-c2462.firebasestorage.app
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=340012279238
   NEXT_PUBLIC_FIREBASE_APP_ID=1:340012279238:web:a5a0f975c463ba4c55fec7
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-VJ2Y88YHM6
   DATABASE_URL=<your_database_url>
   JWT_SECRET=<your_jwt_secret>
   ```

7. Click **Save and Deploy**

8. Đợi build hoàn thành (~5-10 phút)

### Bước 3: Setup Custom Domain

1. Sau khi deploy xong, vào **Custom domains**
2. Click **Set up a custom domain**
3. Nhập: `www.2game.space`
4. Cloudflare sẽ tự động config DNS
5. Add thêm: `2game.space` (root domain)

### Bước 4: Update Firebase Authorized Domains

1. Vào Firebase Console: https://console.firebase.google.com/
2. Project **game-demo-c2462** → **Authentication** → **Settings** tab
3. Scroll xuống **Authorized domains**
4. Click **Add domain**
5. Thêm: `2game.space` và `www.2game.space`
6. Thêm cả Cloudflare Pages URL (vd: `2game.pages.dev`)

### Bước 5: Test

Truy cập: https://www.2game.space/register
→ Sẽ thấy button "Đăng ký với Google"!

---

## 🔧 OPTION 2: Cloudflare Tunnel (Expose Localhost)

Nếu bạn muốn expose localhost ra internet qua Cloudflare:

### Cài đặt cloudflared

```bash
# Ubuntu/Debian
wget -q https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared-linux-amd64.deb

# macOS
brew install cloudflare/cloudflare/cloudflared

# Windows
winget install --id Cloudflare.cloudflared
```

### Setup Tunnel

```bash
# Login
cloudflared tunnel login

# Tạo tunnel
cloudflared tunnel create 2game

# Tạo config file
cat > ~/.cloudflared/config.yml << EOF
tunnel: 2game
credentials-file: /root/.cloudflared/<tunnel-id>.json

ingress:
  - hostname: 2game.space
    service: http://localhost:3002
  - hostname: www.2game.space
    service: http://localhost:3002
  - service: http_status:404
EOF

# Route DNS
cloudflared tunnel route dns 2game 2game.space
cloudflared tunnel route dns 2game www.2game.space

# Run tunnel
cloudflared tunnel run 2game
```

### Auto-start on boot

```bash
# Install service
sudo cloudflared service install

# Start service
sudo systemctl start cloudflared
sudo systemctl enable cloudflared
```

---

## 🎯 OPTION 3: Build Static và Upload Manual

Nếu bạn muốn build local và upload:

### Build Production

```bash
# Stop dev server
npm run build

# Test production build local
npm start
# Hoặc
npx serve@latest out
```

### Upload qua Cloudflare Pages CLI

```bash
# Install Wrangler (Cloudflare CLI)
npm install -g wrangler

# Login
wrangler login

# Deploy
wrangler pages deploy .next --project-name=2game
```

---

## 📋 Checklist Sau Khi Deploy

- [ ] Website accessible tại https://2game.space
- [ ] Google Sign-In button hiển thị trên /register và /login
- [ ] Test đăng nhập bằng Google
- [ ] Check Firebase Console → Users → Có user mới
- [ ] Check Firestore → users collection → Có data
- [ ] Test trên nhiều devices/browsers
- [ ] SSL/HTTPS hoạt động (Cloudflare tự động)

---

## 🐛 Troubleshooting

### "Firebase unauthorized domain"
→ Thêm domain vào Firebase Console → Authentication → Authorized domains

### "Environment variables not found"
→ Check Cloudflare Pages settings → Environment variables
→ Rebuild project

### "Build failed"
→ Check build logs trong Cloudflare Pages dashboard
→ Ensure tất cả dependencies trong package.json

### Website không load
→ Check DNS settings trong Cloudflare
→ Đợi DNS propagate (~5-10 phút)

---

## 🔄 Update Code Sau Này

### Với Cloudflare Pages (Auto-deploy):
```bash
git add .
git commit -m "Your changes"
git push origin main
# Cloudflare tự động build và deploy!
```

### Với Cloudflare Tunnel:
```bash
# Code changes tự động reflect (dev server)
# Hoặc restart Next.js:
pm2 restart 2game
```

---

## 💡 Recommended: Cloudflare Pages

Tôi khuyên dùng **Cloudflare Pages** vì:
- ✅ Auto-deploy khi push code
- ✅ Free SSL/HTTPS
- ✅ Global CDN
- ✅ Preview deployments
- ✅ Rollback dễ dàng
- ✅ Không cần maintain server

**Hãy chọn Option 1 và làm theo từng bước!**
