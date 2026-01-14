#!/bin/bash

echo "🚀 Starting 2GAME.VN Website Server..."
echo ""

# Stop any existing server on port 3000
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Stopping existing server on port 3000..."
    lsof -ti:3000 | xargs kill -9 2>/dev/null
    sleep 2
fi

# Check if build exists
if [ ! -d "out" ]; then
    echo "❌ Build not found! Running build first..."
    npm run build
fi

echo "✅ Starting server..."
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  🌐 Website đang chạy tại:"
echo ""
echo "     http://localhost:3000"
echo "     http://127.0.0.1:3000"
echo ""
echo "  📱 Test các trang:"
echo "     Home:     http://localhost:3000/"
echo "     Discover: http://localhost:3000/discover/"
echo "     Game:     http://localhost:3000/game/phoenix-story/"
echo "     Wishlist: http://localhost:3000/wishlist/"
echo "     Profile:  http://localhost:3000/profile/"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "  ⏹  Nhấn Ctrl+C để dừng server"
echo ""

# Start server on all interfaces (IPv4 + IPv6)
npx serve out -l tcp://0.0.0.0:3000
