# 🚀 Hướng Dẫn Deployment & Auto-Start cho 2GAME.VN

## 📋 Mục Lục
1. [PM2 Process Manager (Khuyến Nghị)](#pm2-setup)
2. [Systemd Service (Phương án dự phòng)](#systemd-setup)
3. [Kiểm tra và Monitoring](#monitoring)

---

## 🔥 PHƯƠNG ÁN 1: PM2 Process Manager (KHUYẾN NGHỊ)

PM2 là công cụ quản lý process Node.js mạnh mẽ nhất hiện nay.

### Bước 1: Cài đặt PM2

```bash
# Cài đặt PM2 globally
npm install -g pm2

# Kiểm tra version
pm2 -v
```

### Bước 2: Build ứng dụng

```bash
cd /home/dev/2game-nextjs
npm run build
```

### Bước 3: Khởi động ứng dụng với PM2

```bash
# Khởi động bằng ecosystem config
pm2 start ecosystem.config.js

# HOẶC khởi động trực tiếp
pm2 start npm --name "2game-nextjs" -- start
```

### Bước 4: Cấu hình Auto-Start khi khởi động hệ thống

```bash
# Tạo startup script (chỉ chạy 1 lần duy nhất)
pm2 startup

# QUAN TRỌNG: Copy và chạy lệnh mà PM2 gợi ý
# Ví dụ: sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u dev --hp /home/dev

# Sau khi chạy lệnh trên, lưu danh sách process hiện tại
pm2 save

# Verify startup được cấu hình đúng
systemctl status pm2-dev
```

### Bước 5: Các lệnh quản lý thường dùng

```bash
# Xem danh sách process
pm2 list
pm2 ls

# Xem logs realtime
pm2 logs 2game-nextjs

# Xem logs với số dòng cụ thể
pm2 logs 2game-nextjs --lines 100

# Xem monitoring dashboard
pm2 monit

# Restart ứng dụng
pm2 restart 2game-nextjs

# Stop ứng dụng
pm2 stop 2game-nextjs

# Delete khỏi PM2
pm2 delete 2game-nextjs

# Xem thông tin chi tiết
pm2 show 2game-nextjs

# Reload sau khi update code
pm2 reload 2game-nextjs
```

### Bước 6: Update code và deploy

```bash
# Khi có code mới
git pull origin main
npm install
npm run build
pm2 reload 2game-nextjs

# PM2 sẽ tự động restart nếu app crash
```

### Kiểm tra Auto-Start

```bash
# Reboot server để test
sudo reboot

# Sau khi reboot, SSH vào và kiểm tra
pm2 list
# Ứng dụng phải tự động chạy
```

---

## ⚙️ PHƯƠNG ÁN 2: Systemd Service (DỰ PHÒNG)

Nếu không muốn dùng PM2, có thể dùng systemd service.

### Bước 1: Tạo service file

```bash
sudo nano /etc/systemd/system/2game-nextjs.service
```

Paste nội dung sau (đã có trong `2game-nextjs.service.template`):

```ini
[Unit]
Description=2GAME.VN Next.js Application
Documentation=https://nextjs.org/docs
After=network.target

[Service]
Type=simple
User=dev
WorkingDirectory=/home/dev/2game-nextjs
Environment="NODE_ENV=production"
Environment="PORT=3000"
ExecStart=/usr/bin/npm start
Restart=always
RestartSec=10
StandardOutput=append:/home/dev/2game-nextjs/logs/systemd-out.log
StandardError=append:/home/dev/2game-nextjs/logs/systemd-error.log

NoNewPrivileges=true
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

### Bước 2: Kích hoạt service

```bash
# Reload systemd để nhận service mới
sudo systemctl daemon-reload

# Enable auto-start
sudo systemctl enable 2game-nextjs.service

# Start service
sudo systemctl start 2game-nextjs.service

# Kiểm tra status
sudo systemctl status 2game-nextjs.service
```

### Bước 3: Quản lý service

```bash
# Restart service
sudo systemctl restart 2game-nextjs.service

# Stop service
sudo systemctl stop 2game-nextjs.service

# Xem logs
sudo journalctl -u 2game-nextjs.service -f

# Xem logs với số dòng cụ thể
sudo journalctl -u 2game-nextjs.service -n 100

# Disable auto-start
sudo systemctl disable 2game-nextjs.service
```

---

## 📊 Monitoring & Troubleshooting

### Kiểm tra port đang sử dụng

```bash
# Kiểm tra port 3000
sudo lsof -i :3000

# Hoặc dùng netstat
sudo netstat -tulpn | grep :3000
```

### Kiểm tra logs

```bash
# PM2 logs
pm2 logs 2game-nextjs --lines 200

# Systemd logs
sudo journalctl -u 2game-nextjs.service --since "1 hour ago"

# Application logs
tail -f /home/dev/2game-nextjs/logs/pm2-out.log
tail -f /home/dev/2game-nextjs/logs/pm2-error.log
```

### Kill process nếu bị treo

```bash
# Tìm process
ps aux | grep node

# Kill process
kill -9 <PID>

# Hoặc kill tất cả node process
pkill -f node
```

---

## 🎯 SO SÁNH PM2 vs Systemd

| Tính năng | PM2 | Systemd |
|-----------|-----|---------|
| Auto-restart khi crash | ✅ | ✅ |
| Auto-start khi boot | ✅ | ✅ |
| Cluster mode (multi-core) | ✅ | ❌ |
| Web monitoring dashboard | ✅ | ❌ |
| Zero-downtime reload | ✅ | ❌ |
| Dễ sử dụng | ✅✅ | ⚠️ |
| Log management | ✅✅ | ✅ |

**Khuyến nghị:** Dùng PM2 cho Node.js apps vì có nhiều tính năng hơn.

---

## 🔐 Security Best Practices

1. **Firewall**: Chỉ mở port cần thiết
```bash
sudo ufw allow 3000/tcp
sudo ufw enable
```

2. **Nginx Reverse Proxy**: Dùng Nginx làm reverse proxy thay vì expose trực tiếp port 3000

3. **Environment Variables**: Đảm bảo `.env` không commit lên Git

4. **SSL/TLS**: Cài đặt Let's Encrypt certificate

---

## ✅ Checklist Deployment

- [ ] Build ứng dụng thành công (`npm run build`)
- [ ] PM2 đã cài đặt và cấu hình
- [ ] Auto-start đã được thiết lập (`pm2 startup` + `pm2 save`)
- [ ] Test reboot server
- [ ] Logs được ghi đúng vị trí
- [ ] Firewall đã mở port
- [ ] Nginx reverse proxy (optional)
- [ ] SSL certificate (optional)

---

**Cập nhật lần cuối:** 2025-12-27
**Tác giả:** Claude Code Assistant
