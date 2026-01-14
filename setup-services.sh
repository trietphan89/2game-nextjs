#!/bin/bash

echo "🚀 2GAME.VN - Setup Auto-Restart Services"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Clean build artifacts owned by root
echo -e "${YELLOW}[1/7]${NC} Cleaning old build artifacts..."
sudo rm -rf /home/dev/2game-nextjs/.next
sudo rm -rf /home/agentadmin/claude-agent/2game-admin/.next
echo -e "${GREEN}✓${NC} Cleaned"
echo ""

# Step 2: Build frontend
echo -e "${YELLOW}[2/7]${NC} Building frontend (2GAME.VN)..."
cd /home/dev/2game-nextjs
npm run build
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓${NC} Frontend built successfully"
else
    echo -e "${RED}✗${NC} Frontend build failed"
    exit 1
fi
echo ""

# Step 3: Build backend admin
echo -e "${YELLOW}[3/7]${NC} Building backend admin CMS..."
cd /home/agentadmin/claude-agent/2game-admin
npm run build
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓${NC} Backend built successfully"
else
    echo -e "${RED}✗${NC} Backend build failed"
    exit 1
fi
echo ""

# Step 4: Install frontend service
echo -e "${YELLOW}[4/7]${NC} Installing frontend systemd service..."
sudo cp /home/dev/2game-nextjs/2game-nextjs.service.template /etc/systemd/system/2game-frontend.service
sudo systemctl daemon-reload
echo -e "${GREEN}✓${NC} Frontend service installed"
echo ""

# Step 5: Install backend service
echo -e "${YELLOW}[5/7]${NC} Installing backend systemd service..."
sudo cp /home/agentadmin/claude-agent/2game-admin/2game-admin.service /etc/systemd/system/2game-backend.service
sudo systemctl daemon-reload
echo -e "${GREEN}✓${NC} Backend service installed"
echo ""

# Step 6: Enable services
echo -e "${YELLOW}[6/7]${NC} Enabling auto-start on boot..."
sudo systemctl enable 2game-frontend.service
sudo systemctl enable 2game-backend.service
echo -e "${GREEN}✓${NC} Services enabled"
echo ""

# Step 7: Start services
echo -e "${YELLOW}[7/7]${NC} Starting services..."

# Stop any running dev servers first
echo "  Stopping dev servers..."
pkill -f "next dev" 2>/dev/null || true
pkill -f "npm.*dev" 2>/dev/null || true
sleep 2

sudo systemctl start 2game-frontend.service
sudo systemctl start 2game-backend.service
sleep 3
echo -e "${GREEN}✓${NC} Services started"
echo ""

# Check status
echo "=========================================="
echo "📊 Service Status:"
echo "=========================================="
echo ""
echo "Frontend (2GAME.VN):"
sudo systemctl status 2game-frontend.service --no-pager -l | head -15
echo ""
echo "Backend (Admin CMS):"
sudo systemctl status 2game-backend.service --no-pager -l | head -15
echo ""

echo "=========================================="
echo "✅ Setup Complete!"
echo "=========================================="
echo ""
echo "🌐 URLs:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:30001/admin"
echo ""
echo "📝 Useful commands:"
echo "   sudo systemctl status 2game-frontend   # Check frontend status"
echo "   sudo systemctl status 2game-backend    # Check backend status"
echo "   sudo systemctl restart 2game-frontend  # Restart frontend"
echo "   sudo systemctl restart 2game-backend   # Restart backend"
echo "   sudo systemctl stop 2game-frontend     # Stop frontend"
echo "   sudo systemctl stop 2game-backend      # Stop backend"
echo ""
echo "📋 Logs:"
echo "   sudo journalctl -u 2game-frontend -f   # Follow frontend logs"
echo "   sudo journalctl -u 2game-backend -f    # Follow backend logs"
echo ""
