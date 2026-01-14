'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Users,
  Trophy,
} from 'lucide-react'
import Link from 'next/link'

interface Event {
  id: string
  title: string
  slug: string
  type: 'TOURNAMENT' | 'COMMUNITY' | 'LAUNCH' | 'WORKSHOP'
  status: 'UPCOMING' | 'LIVE' | 'ENDED' | 'CANCELLED'
  startDate: string
  endDate: string
  maxParticipants?: number
  currentParticipants: number
  prize?: string
  createdAt: string
  _count?: {
    registrations: number
  }
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchEvents()
  }, [page, search, filterType, filterStatus])

  const fetchEvents = async () => {
    const token = localStorage.getItem('authToken')
    if (!token) return

    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...(search && { search }),
        ...(filterType !== 'all' && { type: filterType }),
        ...(filterStatus !== 'all' && { status: filterStatus }),
      })

      const response = await fetch(`/api/admin/events?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setEvents(data.data.events)
        setTotalPages(data.data.pagination.totalPages)
      }
    } catch (error) {
      console.error('Fetch events error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return

    const token = localStorage.getItem('authToken')
    if (!token) return

    try {
      const response = await fetch(`/api/admin/events/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        alert('Event deleted successfully')
        fetchEvents()
      } else {
        alert('Failed to delete event')
      }
    } catch (error) {
      console.error('Delete event error:', error)
      alert('Failed to delete event')
    }
  }

  const getTypeColor = (type: string) => {
    const colors = {
      TOURNAMENT: 'bg-purple-500/20 border-purple-500/50 text-purple-400',
      COMMUNITY: 'bg-blue-500/20 border-blue-500/50 text-blue-400',
      LAUNCH: 'bg-orange-500/20 border-orange-500/50 text-orange-400',
      WORKSHOP: 'bg-green-500/20 border-green-500/50 text-green-400',
    }
    return colors[type as keyof typeof colors] || colors.COMMUNITY
  }

  const getStatusColor = (status: string) => {
    const colors = {
      UPCOMING: 'bg-blue-500/20 border-blue-500/50 text-blue-400',
      LIVE: 'bg-green-500/20 border-green-500/50 text-green-400',
      ENDED: 'bg-gray-500/20 border-gray-500/50 text-gray-400',
      CANCELLED: 'bg-red-500/20 border-red-500/50 text-red-400',
    }
    return colors[status as keyof typeof colors] || colors.UPCOMING
  }

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Events Management</h1>
          <p className="text-gray-400">Manage tournaments, community events, and workshops</p>
        </div>
        <Link
          href="/admin/events/create"
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#ff6b35]/50 transition-all"
        >
          <Plus className="w-5 h-5" />
          Create Event
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-6 space-y-4">
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[#151922] border border-[#2d333b] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b35] transition-colors"
          />
        </div>

        {/* Type & Status Filters */}
        <div className="flex flex-wrap gap-3">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 bg-[#151922] border border-[#2d333b] rounded-lg text-white focus:outline-none focus:border-[#ff6b35] transition-colors"
          >
            <option value="all">All Types</option>
            <option value="TOURNAMENT">Tournament</option>
            <option value="COMMUNITY">Community</option>
            <option value="LAUNCH">Launch</option>
            <option value="WORKSHOP">Workshop</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-[#151922] border border-[#2d333b] rounded-lg text-white focus:outline-none focus:border-[#ff6b35] transition-colors"
          >
            <option value="all">All Status</option>
            <option value="UPCOMING">Upcoming</option>
            <option value="LIVE">Live</option>
            <option value="ENDED">Ended</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Events Table */}
      <div className="bg-[#151922] border border-[#2d333b] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#1c2128] border-b border-[#2d333b]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Participants
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2d333b]">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    Loading...
                  </td>
                </tr>
              ) : events.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    No events found
                  </td>
                </tr>
              ) : (
                events.map((event) => (
                  <tr key={event.id} className="hover:bg-[#1c2128] transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-semibold text-white">{event.title}</div>
                        <div className="text-xs text-gray-400">{event.slug}</div>
                        {event.prize && (
                          <div className="flex items-center gap-1 mt-1">
                            <Trophy className="w-3 h-3 text-yellow-400" />
                            <span className="text-xs text-yellow-400">{event.prize}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 border text-xs rounded-md ${getTypeColor(event.type)}`}>
                        {event.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-300">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(event.startDate).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          to {new Date(event.endDate).toLocaleDateString()}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-white font-medium">
                          {event.currentParticipants}
                          {event.maxParticipants && ` / ${event.maxParticipants}`}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 border text-xs rounded-md ${getStatusColor(event.status)}`}>
                        {event.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/events/${event.slug}`}
                          target="_blank"
                          className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/events/edit/${event.id}`}
                          className="p-2 text-gray-400 hover:text-orange-400 hover:bg-orange-500/10 rounded-lg transition-all"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(event.id)}
                          className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-[#2d333b] flex items-center justify-between">
            <div className="text-sm text-gray-400">
              Page {page} of {totalPages}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 text-gray-400 hover:text-white hover:bg-[#1c2128] rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 text-gray-400 hover:text-white hover:bg-[#1c2128] rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
