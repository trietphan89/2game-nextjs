#!/bin/bash

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  🎮 2GAME.VN - Website Server"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Navigate to project
cd /home/dev/2game-nextjs

# Kill existing process
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "⚠️  Stopping existing server..."
    lsof -ti:3000 | xargs kill -9 2>/dev/null
    sleep 2
fi

echo "🚀 Starting Next.js Dev Server..."
echo ""
echo "  📍 Local:  http://localhost:3000"
echo "  📍 IPv4:   http://127.0.0.1:3000"
echo ""
echo "  🔥 Hot Reload: ENABLED"
echo "  🎨 Responsive: Mobile + Desktop"
echo "  📱 Pages: Home, Discover, Game Detail, Wishlist, Profile"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "  Press Ctrl+C to stop"
echo ""

# Start server
npm run dev
