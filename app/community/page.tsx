'use client'

import { useState } from 'react'
import {
  MessageCircle, TrendingUp, Clock, Heart, MessageSquare, Share2, Bookmark, Eye,
  Image, Video, Award, Zap, Users, Trophy, Star, Play, FileText, Swords,
  Camera, Mic, ChevronDown, Filter, BarChart3, Target, Flame
} from 'lucide-react'
import { useLanguage } from '@/app/layout'
import InlinePostCreator from '@/components/community/InlinePostCreator'

export default function CommunityPage() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState('forYou')
  const [contentType, setContentType] = useState('all')
  const [showCreateMenu, setShowCreateMenu] = useState(false)

  const tabs = [
    { id: 'forYou', label: 'For You', icon: Zap },
    { id: 'trending', label: 'Trending', icon: Flame },
    { id: 'following', label: 'Following', icon: Users },
    { id: 'featured', label: 'Featured', icon: Star },
  ]

  const contentTypes = [
    { id: 'all', label: 'All Posts', icon: MessageCircle },
    { id: 'clips', label: 'Clips', icon: Play },
    { id: 'guides', label: 'Guides', icon: FileText },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'discussions', label: 'Discussions', icon: MessageSquare },
    { id: 'tournaments', label: 'Tournaments', icon: Trophy },
    { id: 'screenshots', label: 'Screenshots', icon: Camera },
  ]

  const posts = [
    {
      id: 1,
      author: 'ProGamer_VN',
      avatar: '🏆',
      avatarUrl: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=200&h=200&fit=crop',
      badge: 'Legendary Creator',
      badgeColor: 'from-yellow-600 to-orange-500',
      verified: true,
      level: 89,
      time: '2 giờ trước',
      type: 'clip',
      content: 'Vừa phá kỷ lục thế giới trong Phoenix Story! 🎉 Đánh bại boss cuối chỉ trong 3 phút 45 giây. Check out the insane combo at 2:15!',
      media: {
        type: 'video',
        thumbnail: 'gradient-from-purple-600-to-purple-800',
        mediaUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=800&fit=crop&q=80',
        duration: '4:32',
      },
      likes: 12500,
      comments: 892,
      shares: 456,
      views: 125000,
      bookmarks: 340,
      tags: ['Phoenix Story', 'Speedrun', 'World Record', 'Tutorial'],
      achievements: ['World Record Holder', 'Speed Demon'],
    },
    {
      id: 2,
      author: 'GameReviewVN',
      avatar: '📺',
      avatarUrl: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&h=200&fit=crop',
      badge: 'Content Creator',
      badgeColor: 'from-pink-600 to-red-500',
      verified: true,
      level: 75,
      time: '4 giờ trước',
      type: 'review',
      content: '⭐ FULL REVIEW: Battle Royale Legends Season 5\n\nMap mới cực đỉnh với dynamic weather system! Weapon balance được buff rất tốt, meta game thú vị hơn nhiều.\n\n✅ Pros:\n• New volcanic map with lava mechanics\n• Better weapon balance\n• Smooth 120fps on mobile\n\n❌ Cons:\n• Queue times increased\n• Some optimization issues\n\nRating: 9/10 ⭐',
      media: {
        type: 'image',
        thumbnail: 'gradient-from-fuchsia-600-to-red-500',
        mediaUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1200&h=800&fit=crop&q=80',
      },
      likes: 8900,
      comments: 1567,
      shares: 780,
      views: 89000,
      bookmarks: 234,
      tags: ['Review', 'Battle Royale', 'Season 5', 'Analysis'],
      rating: 9,
    },
    {
      id: 3,
      author: 'DragonKnight',
      avatar: '🐉',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop',
      badge: 'Guild Master',
      badgeColor: 'from-blue-600 to-cyan-500',
      verified: false,
      level: 82,
      time: '6 giờ trước',
      type: 'discussion',
      content: '🔥 GUILD RECRUITMENT: Dragon Alliance 🔥\n\nTop 10 guild đang tuyển thêm 15 members cho War Season!\n\n📋 Requirements:\n• Level 80+\n• Active Discord user\n• 20+ hours/week playtime\n• Tournament experience preferred\n\n💰 Benefits:\n• Weekly guild bonuses\n• Free tournament entries\n• Exclusive guild skins\n• Pro coaching sessions\n\nDM để join! Limited slots!',
      media: null,
      likes: 4560,
      comments: 2340,
      shares: 120,
      views: 45600,
      bookmarks: 890,
      tags: ['Guild', 'Recruitment', 'PvP', 'Competitive'],
    },
    {
      id: 4,
      author: 'MageSupreme',
      avatar: '🔮',
      avatarUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&h=200&fit=crop',
      badge: 'Theory Crafter',
      badgeColor: 'from-purple-600 to-indigo-500',
      verified: true,
      level: 95,
      time: '8 giờ trước',
      type: 'guide',
      content: '📖 ULTIMATE MAGE BUILD GUIDE - Patch 3.5\n\nMeta-breaking build tăng 40% damage + survivability cao!\n\n⚡ Core Stats:\n• INT: 350+\n• Crit Rate: 60%\n• CDR: 40%\n\n🎯 Skill Rotation:\n1. Frost Nova (CC)\n2. Arcane Missiles (x3)\n3. Meteor Strike\n4. Repeat\n\n📊 Best for:\n✓ Solo PvE farming\n✓ Raid DPS\n✓ 1v1 Arena\n\nFull detailed guide + video in comments! 👇',
      media: {
        type: 'image',
        thumbnail: 'gradient-from-violet-600-to-purple-800',
        mediaUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&h=800&fit=crop&q=80',
      },
      likes: 23400,
      comments: 4450,
      shares: 1890,
      views: 234000,
      bookmarks: 5670,
      tags: ['Guide', 'Mage Build', 'Meta', 'Tutorial', 'Patch 3.5'],
      achievements: ['Build Master', 'Top Contributor'],
    },
    {
      id: 5,
      author: '2GAME Official',
      avatar: '🎮',
      avatarUrl: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=200&h=200&fit=crop',
      badge: 'Official',
      badgeColor: 'from-orange-600 to-red-500',
      verified: true,
      level: 100,
      time: '10 giờ trước',
      type: 'tournament',
      content: '🏆 THÔNG BÁO CHÍNH THỨC 🏆\n\nPhoenix Story Championship 2025 is here!\n\n💰 Prize Pool: 500,000,000 VNĐ\n📅 Registration: 15/01 - 31/01/2025\n🎮 Format: 5v5 Team Battle\n📺 Live on 2GAME.TV\n\n🎁 Grand Prize:\n• 200M VNĐ\n• Gaming House sponsorship\n• Pro team contracts\n• Exclusive championship skins\n\n⚡ Early bird bonus: First 100 teams get free battle passes!\n\n🔗 Register now: link in bio',
      media: {
        type: 'image',
        thumbnail: 'gradient-from-purple-600-to-purple-800',
        mediaUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=800&fit=crop&q=80',
      },
      likes: 56700,
      comments: 7890,
      shares: 12340,
      views: 567000,
      bookmarks: 8900,
      tags: ['Tournament', 'Official', 'Championship', 'Prize Pool', 'Esports'],
      isPinned: true,
      isOfficial: true,
    },
    {
      id: 6,
      author: 'ClipMaster99',
      avatar: '🎬',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
      badge: 'Clip Creator',
      badgeColor: 'from-green-600 to-emerald-500',
      verified: false,
      level: 67,
      time: '12 giờ trước',
      type: 'clip',
      content: '🔥 INSANE 1v5 CLUTCH! 🔥\n\nLast man standing với 10 HP. Somehow pulled it off! 😤\n\n#BattleRoyale #Clutch #ProPlays',
      media: {
        type: 'video',
        thumbnail: 'gradient-from-red-600-to-orange-500',
        mediaUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&h=800&fit=crop&q=80',
        duration: '1:23',
      },
      likes: 34500,
      comments: 1230,
      shares: 2340,
      views: 345000,
      bookmarks: 1200,
      tags: ['Clip', 'Clutch', 'Battle Royale', 'Highlights'],
    },
  ]

  // Trending Topics
  const trendingTopics = [
    { tag: 'Phoenix Championship', posts: '12.5K', trend: '+245%' },
    { tag: 'Season 5 Meta', posts: '8.9K', trend: '+156%' },
    { tag: 'Mobile Gaming', posts: '5.6K', trend: '+89%' },
    { tag: 'Guild Wars', posts: '4.2K', trend: '+67%' },
    { tag: 'Speed Running', posts: '3.1K', trend: '+45%' },
  ]

  // Top Creators This Week
  const topCreators = [
    { rank: 1, name: 'ProGamer_VN', avatar: '🏆', avatarUrl: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=200&h=200&fit=crop', points: '45.2K', change: '+2.3K' },
    { rank: 2, name: 'GameReviewVN', avatar: '📺', avatarUrl: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&h=200&fit=crop', points: '38.9K', change: '+1.8K' },
    { rank: 3, name: 'MageSupreme', avatar: '🔮', avatarUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&h=200&fit=crop', points: '32.5K', change: '+1.5K' },
  ]

  return (
    <>
      {/* Feed Header with Tabs */}
      <div className="section-padding border-b border-[#2d333b] bg-[rgba(10,14,23,0.95)] backdrop-blur-xl sticky top-[57px] z-20">
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-[#ff6b35] to-[#f7931e] flex items-center justify-center">
              <Users className="w-4 h-4 md:w-5 md:h-5 text-black" />
            </div>
            <div>
              <h1 className="heading-page">Community</h1>
              <p className="text-caption md:text-meta text-[#9aa0a6]">2.5M+ active gamers</p>
            </div>
          </div>
          <button className="text-[#9aa0a6] hover:text-[#e8eaed] transition-colors">
            <Filter className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>

        <div className="flex gap-2 md:gap-3 lg:gap-4 border-b border-[#2d333b] overflow-x-auto scrollbar-hide pb-0">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-1.5 md:gap-2 tab-text px-3 md:px-4 py-2 md:py-2.5 lg:py-3 border-b-2 transition-all whitespace-nowrap
                  ${activeTab === tab.id
                    ? 'text-[#ff6b35] border-[#ff6b35]'
                    : 'text-[#9aa0a6] border-transparent hover:text-[#e8eaed]'
                  }
                `}
              >
                <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Content Type Filter */}
      <div className="bg-[#151922] border-b border-[#2d333b] px-3 md:px-4 py-2 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2">
          {contentTypes.map((type) => {
            const Icon = type.icon
            return (
              <button
                key={type.id}
                onClick={() => setContentType(type.id)}
                className={`
                  flex items-center gap-1.5 px-3 py-1.5 rounded-full text-caption md:text-meta whitespace-nowrap transition-all
                  ${contentType === type.id
                    ? 'bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-black font-semibold'
                    : 'bg-[#1c2128] border border-[#2d333b] text-[#9aa0a6] hover:border-[#ff6b35] hover:text-[#ff6b35]'
                  }
                `}
              >
                <Icon className="w-3 h-3 md:w-3.5 md:h-3.5" />
                <span>{type.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Create Post Section */}
      <div className="bg-[#151922] border-b border-[#2d333b] card-padding">
        <InlinePostCreator />
      </div>

      {/* Trending Topics Bar */}
      <div className="bg-[#1c2128] border-b border-[#2d333b] px-3 md:px-4 py-3">
        <div className="flex items-center gap-2 mb-2">
          <Flame className="w-4 h-4 text-[#ff6b35]" />
          <span className="text-meta font-semibold">Trending Now</span>
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {trendingTopics.map((topic) => (
            <button
              key={topic.tag}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#151922] border border-[#2d333b] hover:border-[#ff6b35] transition-all whitespace-nowrap group"
            >
              <span className="text-caption md:text-meta text-[#e8eaed] group-hover:text-[#ff6b35]">
                #{topic.tag}
              </span>
              <span className="text-caption text-[#3fb950]">{topic.trend}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Posts Feed */}
      {posts.map((post) => (
        <article
          key={post.id}
          className="bg-[#151922] border-b border-[#2d333b] card-padding hover:bg-[#1c2128] transition-colors relative group"
        >
          {/* Pinned Badge */}
          {post.isPinned && (
            <div className="flex items-center gap-1.5 md:gap-2 text-[#ff6b35] text-meta font-semibold mb-3 bg-[rgba(255,107,53,0.1)] border border-[rgba(255,107,53,0.3)] px-3 py-1.5 rounded-lg inline-flex">
              <Target className="w-3.5 h-3.5" />
              <span>Pinned Post</span>
            </div>
          )}

          {/* Post Header */}
          <div className="flex items-start gap-2 md:gap-3 mb-3">
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 overflow-hidden ring-2 ring-[#2d333b]">
                {post.avatarUrl ? (
                  <img
                    src={post.avatarUrl}
                    alt={post.author}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center heading-small">
                    {post.avatar}
                  </div>
                )}
              </div>
              {post.verified && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#3fb950] border-2 border-[#151922] flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="heading-card truncate">{post.author}</h3>
                <span className={`text-caption px-2 py-0.5 bg-gradient-to-r ${post.badgeColor} text-white font-bold rounded whitespace-nowrap`}>
                  {post.badge}
                </span>
                <span className="text-caption px-2 py-0.5 bg-[#1c2128] border border-[#2d333b] text-[#9aa0a6] rounded">
                  Lv.{post.level}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-meta text-[#9aa0a6]">{post.time}</p>
                {post.achievements && (
                  <div className="flex items-center gap-1">
                    {post.achievements.map((achievement, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-1 text-caption bg-[rgba(255,215,0,0.1)] border border-[rgba(255,215,0,0.3)] text-[#ffd700] px-1.5 py-0.5 rounded"
                        title={achievement}
                      >
                        <Trophy className="w-3 h-3" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <button className="text-[#9aa0a6] hover:text-[#e8eaed] transition-colors opacity-0 group-hover:opacity-100">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
            </button>
          </div>

          {/* Content Type Badge */}
          <div className="flex items-center gap-2 mb-2">
            {post.type === 'clip' && (
              <span className="flex items-center gap-1 text-caption px-2 py-1 bg-[rgba(139,92,246,0.1)] border border-[rgba(139,92,246,0.3)] text-[#8b5cf6] rounded-lg font-semibold">
                <Play className="w-3 h-3" />
                Gaming Clip
              </span>
            )}
            {post.type === 'guide' && (
              <span className="flex items-center gap-1 text-caption px-2 py-1 bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.3)] text-[#3b82f6] rounded-lg font-semibold">
                <FileText className="w-3 h-3" />
                Guide
              </span>
            )}
            {post.type === 'review' && (
              <span className="flex items-center gap-1 text-caption px-2 py-1 bg-[rgba(251,191,36,0.1)] border border-[rgba(251,191,36,0.3)] text-[#fbbf24] rounded-lg font-semibold">
                <Star className="w-3 h-3" />
                Review {post.rating && `• ${post.rating}/10`}
              </span>
            )}
            {post.type === 'tournament' && (
              <span className="flex items-center gap-1 text-caption px-2 py-1 bg-[rgba(255,107,53,0.1)] border border-[rgba(255,107,53,0.3)] text-[#ff6b35] rounded-lg font-semibold">
                <Trophy className="w-3 h-3" />
                Tournament
              </span>
            )}
            {post.isOfficial && (
              <span className="flex items-center gap-1 text-caption px-2 py-1 bg-[rgba(255,107,53,0.1)] border border-[rgba(255,107,53,0.3)] text-[#ff6b35] rounded-lg font-semibold">
                ⚡ Official
              </span>
            )}
          </div>

          {/* Post Content */}
          <p className="text-body-secondary leading-relaxed mb-3 whitespace-pre-line">{post.content}</p>

          {/* Post Media */}
          {post.media && (
            <div className="relative w-full rounded-xl overflow-hidden mb-3 group/media cursor-pointer">
              {post.media.mediaUrl ? (
                <img
                  src={post.media.mediaUrl}
                  alt="Post media"
                  className={`w-full ${post.media.type === 'video' ? 'h-64 md:h-80' : 'h-48 md:h-64'} object-cover`}
                />
              ) : (
                <div className={`w-full ${post.media.type === 'video' ? 'h-64 md:h-80' : 'h-48 md:h-64'} bg-gradient-to-br ${post.media.thumbnail}`} />
              )}
              {post.media.type === 'video' && (
                <>
                  <div className="absolute inset-0 bg-black/20 group-hover/media:bg-black/10 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[rgba(255,107,53,0.9)] backdrop-blur-sm flex items-center justify-center group-hover/media:scale-110 transition-transform shadow-[0_0_30px_rgba(255,107,53,0.5)]">
                      <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="white" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white text-caption px-2 py-1 rounded-lg font-semibold">
                    {post.media.duration}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Post Tags */}
          <div className="flex gap-1.5 md:gap-2 mb-3 flex-wrap">
            {post.tags.map((tag) => (
              <button
                key={tag}
                className="text-caption md:text-meta px-2 md:px-2.5 py-1 bg-[#1c2128] border border-[#2d333b] text-[#58a6ff] rounded-lg hover:border-[#58a6ff] hover:bg-[rgba(88,166,255,0.1)] transition-colors cursor-pointer"
              >
                #{tag}
              </button>
            ))}
          </div>

          {/* Post Stats */}
          <div className="flex items-center gap-4 md:gap-6 py-2 border-y border-[#2d333b] text-meta text-[#9aa0a6]">
            <div className="flex items-center gap-1.5">
              <Eye className="w-4 h-4" />
              <span className="font-semibold">{(post.views / 1000).toFixed(1)}K</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-[#ff6b6b]" />
              <span className="font-semibold">{post.likes.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-[#58a6ff]" />
              <span className="font-semibold">{post.comments}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Share2 className="w-4 h-4 text-[#3fb950]" />
              <span className="font-semibold">{post.shares}</span>
            </div>
            <div className="flex items-center gap-1.5 ml-auto">
              <Bookmark className="w-4 h-4 text-[#fbbf24]" />
              <span className="font-semibold">{post.bookmarks}</span>
            </div>
          </div>

          {/* Post Actions */}
          <div className="flex items-center gap-1 md:gap-2 pt-3">
            <button className="flex-1 flex items-center justify-center gap-1.5 md:gap-2 py-2 md:py-2.5 rounded-xl hover:bg-[rgba(255,107,107,0.1)] transition-colors btn-text-secondary group/like">
              <Heart className="w-4 h-4 group-hover/like:text-[#ff6b6b] group-hover/like:fill-[#ff6b6b] transition-all" />
              <span className="hidden sm:inline group-hover/like:text-[#ff6b6b]">Like</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-1.5 md:gap-2 py-2 md:py-2.5 rounded-xl hover:bg-[rgba(88,166,255,0.1)] transition-colors btn-text-secondary group/comment">
              <MessageSquare className="w-4 h-4 group-hover/comment:text-[#58a6ff] transition-all" />
              <span className="hidden sm:inline group-hover/comment:text-[#58a6ff]">Comment</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-1.5 md:gap-2 py-2 md:py-2.5 rounded-xl hover:bg-[rgba(59,185,80,0.1)] transition-colors btn-text-secondary group/share">
              <Share2 className="w-4 h-4 group-hover/share:text-[#3fb950] transition-all" />
              <span className="hidden sm:inline group-hover/share:text-[#3fb950]">Share</span>
            </button>
            <button className="p-2 md:p-2.5 rounded-xl hover:bg-[rgba(251,191,36,0.1)] transition-colors group/bookmark">
              <Bookmark className="w-4 h-4 text-[#9aa0a6] group-hover/bookmark:text-[#fbbf24] group-hover/bookmark:fill-[#fbbf24] transition-all" />
            </button>
          </div>
        </article>
      ))}

      {/* Community Stats Banner */}
      <div className="bg-gradient-to-br from-[#1c2128] to-[#151922] border-b border-[#2d333b] section-padding">
        <div className="text-center mb-4">
          <h3 className="heading-card mb-1">Join the Movement</h3>
          <p className="text-body-secondary">Be part of Vietnam's largest gaming community</p>
        </div>
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          <div className="bg-[#151922] border border-[#2d333b] rounded-xl p-3 md:p-4 text-center">
            <div className="text-xl md:text-2xl font-bold text-[#ff6b35] mb-1">2.5M+</div>
            <div className="text-caption md:text-meta text-[#9aa0a6]">Gamers</div>
          </div>
          <div className="bg-[#151922] border border-[#2d333b] rounded-xl p-3 md:p-4 text-center">
            <div className="text-xl md:text-2xl font-bold text-[#3fb950] mb-1">150K+</div>
            <div className="text-caption md:text-meta text-[#9aa0a6]">Daily Posts</div>
          </div>
          <div className="bg-[#151922] border border-[#2d333b] rounded-xl p-3 md:p-4 text-center">
            <div className="text-xl md:text-2xl font-bold text-[#58a6ff] mb-1">10K+</div>
            <div className="text-caption md:text-meta text-[#9aa0a6]">Creators</div>
          </div>
        </div>
      </div>

      {/* Load More */}
      <div className="flex justify-center section-padding">
        <button className="flex items-center gap-2 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-black btn-text-primary px-6 md:px-8 py-3 md:py-3.5 rounded-full hover:translate-y-[-2px] transition-all shadow-[0_4px_12px_rgba(255,107,53,0.3)] font-semibold">
          <ChevronDown className="w-5 h-5" />
          <span>Load More Posts</span>
        </button>
      </div>
    </>
  )
}
