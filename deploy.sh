#!/bin/bash

echo "🚀 2GAME.VN Deployment Script"
echo "=============================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "${YELLOW}📦 Installing dependencies...${NC}"
    npm install
    if [ $? -ne 0 ]; then
        echo "${RED}❌ npm install failed${NC}"
        exit 1
    fi
    echo "${GREEN}✅ Dependencies installed${NC}"
    echo ""
fi

# Build
echo "${YELLOW}🔨 Building static files...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo "${RED}❌ Build failed${NC}"
    exit 1
fi

echo ""
echo "${GREEN}✅ Build successful!${NC}"
echo ""
echo "📁 Static files location: ./out/"
echo ""
echo "🎯 Deployment Options:"
echo ""
echo "1️⃣  Test locally:"
echo "   npx serve out"
echo "   Open: http://localhost:3000"
echo ""
echo "2️⃣  Deploy to Vercel:"
echo "   vercel --prod"
echo ""
echo "3️⃣  Deploy to Netlify:"
echo "   netlify deploy --prod --dir=out"
echo ""
echo "4️⃣  Copy to web server:"
echo "   cp -r out/* /var/www/html/"
echo ""
echo "5️⃣  Replace old HTML files:"
echo "   cp -r out/* /home/dev/"
echo ""
echo "${GREEN}🎉 Ready to deploy!${NC}"
