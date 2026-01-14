'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  Gamepad2,
  Calendar,
  TrendingUp,
  Activity,
  DollarSign,
} from 'lucide-react'

interface DashboardStats {
  totalUsers: number
  totalGames: number
  totalEvents: number
  activeUsers: number
  revenue: number
  growth: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalGames: 0,
    totalEvents: 0,
    activeUsers: 0,
    revenue: 0,
    growth: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch dashboard stats
    const fetchStats = async () => {
      const token = localStorage.getItem('authToken')

      if (!token) return

      try {
        // For now, using mock data
        // In production, you would call actual API endpoints
        setTimeout(() => {
          setStats({
            totalUsers: 12543,
            totalGames: 342,
            totalEvents: 28,
            activeUsers: 8921,
            revenue: 125000000,
            growth: 23.5,
          })
          setLoading(false)
        }, 500)
      } catch (error) {
        console.error('Fetch stats error:', error)
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      change: '+12.5%',
    },
    {
      title: 'Total Games',
      value: stats.totalGames.toLocaleString(),
      icon: Gamepad2,
      color: 'from-purple-500 to-purple-600',
      change: '+8 new',
    },
    {
      title: 'Active Events',
      value: stats.totalEvents.toLocaleString(),
      icon: Calendar,
      color: 'from-orange-500 to-orange-600',
      change: '+3 this week',
    },
    {
      title: 'Active Users (24h)',
      value: stats.activeUsers.toLocaleString(),
      icon: Activity,
      color: 'from-green-500 to-green-600',
      change: '+15.2%',
    },
    {
      title: 'Revenue (VNĐ)',
      value: `${(stats.revenue / 1000000).toFixed(1)}M`,
      icon: DollarSign,
      color: 'from-yellow-500 to-yellow-600',
      change: '+' + stats.growth + '%',
    },
    {
      title: 'Growth Rate',
      value: stats.growth + '%',
      icon: TrendingUp,
      color: 'from-pink-500 to-pink-600',
      change: 'vs last month',
    },
  ]

  if (loading) {
    return (
      <div className="p-8">
        <div className="text-white">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome back! Here's what's happening with 2GAME today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#151922] border border-[#2d333b] rounded-xl p-6 hover:border-[#ff6b35]/50 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-green-400">{stat.change}</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-400">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Games */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-[#151922] border border-[#2d333b] rounded-xl p-6"
        >
          <h2 className="text-xl font-bold text-white mb-4">Recent Games</h2>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 bg-[#1c2128] rounded-lg hover:bg-[#242b36] transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white truncate">
                    Game Title {i}
                  </div>
                  <div className="text-xs text-gray-400">Added 2 hours ago</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-[#151922] border border-[#2d333b] rounded-xl p-6"
        >
          <h2 className="text-xl font-bold text-white mb-4">Upcoming Events</h2>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 bg-[#1c2128] rounded-lg hover:bg-[#242b36] transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-600 to-red-500 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white truncate">
                    Tournament Event {i}
                  </div>
                  <div className="text-xs text-gray-400">Starting in {i} days</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
