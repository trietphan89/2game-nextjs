#!/bin/bash

echo "🚀 Starting 2GAME.VN Website..."
echo ""

# Check if build exists
if [ ! -d "out" ]; then
    echo "❌ Build not found! Running build first..."
    npm run build
fi

# Check if port 3000 is already in use
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Port 3000 is already in use"
    echo "Killing existing process..."
    lsof -ti:3000 | xargs kill -9
    sleep 2
fi

echo "✅ Starting server on http://localhost:3000"
echo "✅ Also accessible via http://2game.space:3000 (if DNS configured)"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npx serve out -l 3000
