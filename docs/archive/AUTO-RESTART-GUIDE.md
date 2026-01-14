# 🚀 2GAME.VN Auto-Restart Setup Guide

Hướng dẫn cấu hình website tự động khởi động lại khi server reboot hoặc gặp lỗi.

## 📋 Tổng quan

Sau khi setup xong, hai service sẽ tự động:
- ✅ Khởi động khi server boot
- ✅ Tự động restart khi bị crash/lỗi (chờ 10 giây rồi restart)
- ✅ Ghi log vào systemd journal

## 🎯 Cấu hình hiện tại

| Service | Port | Path | Service Name |
|---------|------|------|--------------|
| **Frontend** (2GAME.VN) | 3000 | `/home/dev/2game-nextjs` | `2game-frontend.service` |
| **Backend** (Admin CMS) | 30001 | `/home/agentadmin/claude-agent/2game-admin` | `2game-backend.service` |

## 🔧 Cách cài đặt

### Bước 1: Chạy script setup

```bash
cd /home/dev/2game-nextjs
./setup-services.sh
```

Script này sẽ:
1. Xóa các build artifacts cũ (thuộc root)
2. Build production cho frontend
3. Build production cho backend
4. Cài đặt systemd service files
5. Enable auto-start on boot
6. Khởi động cả hai services

**⏱ Thời gian:** Khoảng 2-3 phút

### Bước 2: Kiểm tra

Sau khi script chạy xong, kiểm tra:

```bash
# Xem status
./manage-services.sh status

# Hoặc dùng systemctl
sudo systemctl status 2game-frontend
sudo systemctl status 2game-backend
```

## 🎮 Quản lý Services

### Sử dụng script quản lý (Recommended)

```bash
cd /home/dev/2game-nextjs

# Xem status
./manage-services.sh status

# Start tất cả
./manage-services.sh start

# Stop tất cả
./manage-services.sh stop

# Restart tất cả
./manage-services.sh restart

# Xem logs
./manage-services.sh logs
```

### Sử dụng systemctl trực tiếp

```bash
# Start/Stop/Restart individual services
sudo systemctl start 2game-frontend
sudo systemctl stop 2game-frontend
sudo systemctl restart 2game-frontend

sudo systemctl start 2game-backend
sudo systemctl stop 2game-backend
sudo systemctl restart 2game-backend

# Xem status
sudo systemctl status 2game-frontend
sudo systemctl status 2game-backend

# Xem logs realtime
sudo journalctl -u 2game-frontend -f
sudo journalctl -u 2game-backend -f

# Xem logs 100 dòng gần nhất
sudo journalctl -u 2game-frontend -n 100
sudo journalctl -u 2game-backend -n 100

# Disable auto-start (nếu không muốn tự động khởi động)
sudo systemctl disable 2game-frontend
sudo systemctl disable 2game-backend
```

## 🔍 Troubleshooting

### Service không start được

```bash
# Xem log chi tiết
sudo journalctl -u 2game-frontend -n 50
sudo journalctl -u 2game-backend -n 50

# Kiểm tra file service
cat /etc/systemd/system/2game-frontend.service
cat /etc/systemd/system/2game-backend.service

# Reload daemon và restart
sudo systemctl daemon-reload
sudo systemctl restart 2game-frontend
sudo systemctl restart 2game-backend
```

### Port bị chiếm

```bash
# Kiểm tra process nào đang dùng port
sudo lsof -i :3000
sudo lsof -i :30001

# Kill process (nếu cần)
sudo kill -9 <PID>
```

### Build bị lỗi

```bash
# Xóa node_modules và reinstall
cd /home/dev/2game-nextjs
rm -rf node_modules .next
npm install
npm run build

cd /home/agentadmin/claude-agent/2game-admin
rm -rf node_modules .next
npm install
npm run build
```

## 🧪 Test Auto-Restart

### Test 1: Crash recovery

```bash
# Kill process để test auto-restart
sudo systemctl status 2game-frontend  # Lấy PID
sudo kill -9 <PID>

# Đợi 10 giây, service sẽ tự restart
sleep 10
sudo systemctl status 2game-frontend  # Kiểm tra đã restart chưa
```

### Test 2: Reboot

```bash
# Reboot server
sudo reboot

# Sau khi server boot lại, kiểm tra
sudo systemctl status 2game-frontend
sudo systemctl status 2game-backend
```

Cả hai service nên ở trạng thái `active (running)`.

## 📊 Monitoring

### Xem logs liên tục

```bash
# Terminal 1: Frontend logs
sudo journalctl -u 2game-frontend -f

# Terminal 2: Backend logs
sudo journalctl -u 2game-backend -f
```

### Kiểm tra uptime

```bash
sudo systemctl status 2game-frontend | grep Active
sudo systemctl status 2game-backend | grep Active
```

## 🔐 Security Notes

- Services chạy với user `dev` (không phải root)
- `NoNewPrivileges=true` - Không thể escalate privileges
- `PrivateTmp=true` - Sử dụng /tmp riêng biệt
- Logs được ghi vào systemd journal và file riêng

## 📝 Files đã tạo

```
/home/dev/2game-nextjs/
├── 2game-nextjs.service.template  # Frontend service template
├── setup-services.sh              # Script cài đặt
├── manage-services.sh             # Script quản lý
└── AUTO-RESTART-GUIDE.md          # File này

/home/agentadmin/claude-agent/2game-admin/
└── 2game-admin.service            # Backend service file

/etc/systemd/system/
├── 2game-frontend.service         # Installed service
└── 2game-backend.service          # Installed service
```

## ✅ Checklist sau khi setup

- [ ] Chạy `./setup-services.sh` thành công
- [ ] Frontend accessible tại http://localhost:3000
- [ ] Backend accessible tại http://localhost:30001/admin
- [ ] `sudo systemctl status 2game-frontend` hiển thị `active (running)`
- [ ] `sudo systemctl status 2game-backend` hiển thị `active (running)`
- [ ] Test reboot: Services tự động start lại
- [ ] Test crash recovery: Kill process, tự động restart sau 10s

## 🆘 Support

Nếu gặp vấn đề:
1. Kiểm tra logs: `sudo journalctl -u 2game-frontend -n 100`
2. Kiểm tra build: `cd /home/dev/2game-nextjs && npm run build`
3. Kiểm tra permissions: `ls -la /home/dev/2game-nextjs/.next`
4. Reload daemon: `sudo systemctl daemon-reload`

---

**Created by:** Claude Code
**Date:** 2026-01-01
