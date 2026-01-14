# 🚀 Quick Setup - Auto Restart Services

## Chạy các lệnh sau (cần sudo password):

### Bước 1: Clean và Build (5 phút)

```bash
# Xóa build cũ (thuộc root)
sudo rm -rf /home/dev/2game-nextjs/.next
sudo rm -rf /home/agentadmin/claude-agent/2game-admin/.next

# Build frontend
cd /home/dev/2game-nextjs
npm run build

# Build backend
cd /home/agentadmin/claude-agent/2game-admin
npm run build
```

### Bước 2: Cài đặt Services (1 phút)

```bash
# Copy service files
sudo cp /home/dev/2game-nextjs/2game-nextjs.service.template /etc/systemd/system/2game-frontend.service
sudo cp /home/agentadmin/claude-agent/2game-admin/2game-admin.service /etc/systemd/system/2game-backend.service

# Reload systemd
sudo systemctl daemon-reload

# Enable auto-start on boot
sudo systemctl enable 2game-frontend.service
sudo systemctl enable 2game-backend.service

# Start services
sudo systemctl start 2game-frontend.service
sudo systemctl start 2game-backend.service
```

### Bước 3: Kiểm tra

```bash
# Xem status
sudo systemctl status 2game-frontend
sudo systemctl status 2game-backend

# Hoặc dùng script
cd /home/dev/2game-nextjs
./manage-services.sh status
```

## URLs sau khi setup:

- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:30001/admin

## ✅ Done!

Từ giờ website sẽ tự động:
- ✅ Khởi động khi server reboot
- ✅ Restart khi crash (sau 10 giây)
- ✅ Ghi logs vào systemd

---

## Hoặc chạy 1 lệnh (Recommended):

```bash
cd /home/dev/2game-nextjs
sudo bash setup-services.sh
```

Nhập password khi được hỏi, script sẽ làm tất cả tự động!
