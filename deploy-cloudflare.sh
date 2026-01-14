#!/bin/bash

# Deploy script for Cloudflare Pages
# Usage: ./deploy-cloudflare.sh

echo "🚀 2GAME.VN - Cloudflare Deployment Script"
echo "=========================================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git not initialized. Run 'git init' first."
    exit 1
fi

# Check if remote is set
if ! git remote get-url origin &> /dev/null; then
    echo "⚠️  No git remote found."
    echo "Please add GitHub remote:"
    echo "  git remote add origin https://github.com/YOUR_USERNAME/2game-nextjs.git"
    exit 1
fi

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo "📝 Uncommitted changes detected. Committing..."
    git add .
    read -p "Enter commit message: " commit_msg
    git commit -m "$commit_msg"
fi

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push origin main || git push origin master

echo ""
echo "✅ Code pushed to GitHub!"
echo ""
echo "📋 Next steps:"
echo "1. Go to https://dash.cloudflare.com/"
echo "2. Navigate to Workers & Pages → Create application → Pages"
echo "3. Connect your GitHub repository"
echo "4. Configure build settings:"
echo "   - Framework preset: Next.js"
echo "   - Build command: npm run build"
echo "   - Build output directory: .next"
echo ""
echo "5. Add environment variables (IMPORTANT!):"
echo "   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDBpJG9wGAtYLdjsiTTr7yMG9U384om_M4"
echo "   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=game-demo-c2462.firebaseapp.com"
echo "   NEXT_PUBLIC_FIREBASE_PROJECT_ID=game-demo-c2462"
echo "   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=game-demo-c2462.firebasestorage.app"
echo "   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=340012279238"
echo "   NEXT_PUBLIC_FIREBASE_APP_ID=1:340012279238:web:a5a0f975c463ba4c55fec7"
echo "   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-VJ2Y88YHM6"
echo ""
echo "6. Click 'Save and Deploy'"
echo ""
echo "7. After deployment, add custom domain: 2game.space"
echo ""
echo "8. Update Firebase authorized domains:"
echo "   https://console.firebase.google.com/project/game-demo-c2462/authentication/settings"
echo "   Add: 2game.space and www.2game.space"
echo ""
echo "📖 Full guide: See CLOUDFLARE_DEPLOY.md"
