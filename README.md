# 🎮 2GAME.SPACE - Vietnamese Gaming Platform

Modern gaming platform built with Next.js 16, featuring game discovery, community features, and user profiles.

## 🚀 Features

### Core Features
- **Game Discovery** - Browse 30+ games with filters, sorting, and search
- **User Accounts** - Profile management, settings, and user stats
- **Community** - Social posts, comments, and user interactions
- **Rankings** - Player and game leaderboards
- **Rewards System** - Points, missions, and achievements
- **Events** - Gaming tournaments and community events

### Additional Features
- **Cloud Gaming** - Browse cloud gaming options
- **XTV Streaming** - Live streaming platform
- **Creator Tools** - Content creator dashboard
- **Developer Portal** - Game developer resources

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1.1 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Firebase Auth
- **Deployment**: PM2 Process Manager

## 📦 Installation

### Prerequisites
- Node.js 20+
- PostgreSQL database
- Firebase project (for authentication)

### Setup

1. **Clone repository**
```bash
git clone https://github.com/trietphan89/2game-nextjs.git
cd 2game-nextjs
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment**
```bash
cp .env.example .env
# Edit .env with your credentials
```

Required environment variables:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXT_PUBLIC_FIREBASE_*` - Firebase configuration

4. **Initialize database**
```bash
npx prisma generate
npx prisma db push
```

5. **Start development server**
```bash
npm run dev
```

Visit http://localhost:3000

## 🏗️ Project Structure

```
2game-nextjs/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── discover/          # Game discovery page
│   ├── my-account/        # User account pages
│   ├── community/         # Community features
│   └── ...
├── components/            # React components
│   ├── GameCard.tsx
│   ├── LeftSidebar.tsx
│   ├── RightSidebar.tsx
│   └── ...
├── lib/                   # Utilities and configs
│   ├── prisma.ts         # Database client
│   ├── translations.ts   # i18n translations
│   └── ...
├── prisma/               # Database schema
├── public/               # Static assets
└── docs/                 # Documentation
```

## 📝 Key Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with featured games |
| `/discover` | Browse all games with filters |
| `/my-account` | User profile and settings |
| `/community` | Social feed and posts |
| `/rankings` | Player and game leaderboards |
| `/events` | Gaming events and tournaments |
| `/rewards` | Rewards and missions |
| `/cloud` | Cloud gaming options |
| `/xtv` | Streaming platform |

## 🎨 Design System

- **Colors**: Dark theme with zinc/gray palette
- **Primary**: Yellow (#FFC107)
- **Typography**: System fonts with Geist Sans fallback
- **Components**: Modular, reusable React components
- **Responsive**: Mobile-first design

## 🔧 Development

### Build for production
```bash
npm run build
npm start
```

### Run with PM2
```bash
pm2 start ecosystem.config.js
pm2 logs
```

### Database migrations
```bash
npx prisma migrate dev
npx prisma studio  # Open database GUI
```

## 📚 Documentation

- [Setup Guide](docs/SETUP.md)
- [Design System](docs/DESIGN_SYSTEM.md)
- [Deployment Guide](docs/DEPLOYMENT-GUIDE.md)
- [Firebase Setup](docs/FIREBASE_SETUP.md)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is proprietary software. All rights reserved.

## 🌐 Links

- **Website**: https://www.2game.space
- **GitHub**: https://github.com/trietphan89/2game-nextjs

## 📧 Contact

For inquiries: trietphan89@github.com

---

Built with ❤️ by the 2GAME team
