'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Search,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Mail,
  User,
  CheckCircle,
  XCircle,
  Star,
  Award,
} from 'lucide-react'

interface User {
  id: string
  email: string
  username: string
  displayName: string
  avatar?: string
  role: 'USER' | 'CREATOR' | 'DEVELOPER' | 'MODERATOR' | 'ADMIN'
  points: number
  level: number
  isVerified: boolean
  createdAt: string
  _count?: {
    posts: number
    wishlist: number
    library: number
  }
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [filterVerified, setFilterVerified] = useState('all')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [page, search, filterRole, filterVerified])

  const fetchUsers = async () => {
    const token = localStorage.getItem('authToken')
    if (!token) return

    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...(search && { search }),
        ...(filterRole !== 'all' && { role: filterRole }),
        ...(filterVerified !== 'all' && { verified: filterVerified }),
      })

      const response = await fetch(`/api/admin/users?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setUsers(data.data.users)
        setTotalPages(data.data.pagination.totalPages)
      }
    } catch (error) {
      console.error('Fetch users error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return

    const token = localStorage.getItem('authToken')
    if (!token) return

    try {
      const response = await fetch(`/api/admin/users/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        alert('User deleted successfully')
        fetchUsers()
      } else {
        const data = await response.json()
        alert(data.error || 'Failed to delete user')
      }
    } catch (error) {
      console.error('Delete user error:', error)
      alert('Failed to delete user')
    }
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setShowEditModal(true)
  }

  const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingUser) return

    const token = localStorage.getItem('authToken')
    if (!token) return

    const formData = new FormData(e.currentTarget)
    const updateData = {
      role: formData.get('role') as string,
      isVerified: formData.get('isVerified') === 'true',
      points: parseInt(formData.get('points') as string),
      level: parseInt(formData.get('level') as string),
    }

    try {
      const response = await fetch(`/api/admin/users/${editingUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      })

      if (response.ok) {
        alert('User updated successfully')
        setShowEditModal(false)
        setEditingUser(null)
        fetchUsers()
      } else {
        const data = await response.json()
        alert(data.error || 'Failed to update user')
      }
    } catch (error) {
      console.error('Update user error:', error)
      alert('Failed to update user')
    }
  }

  const getRoleColor = (role: string) => {
    const colors = {
      ADMIN: 'bg-red-500/20 border-red-500/50 text-red-400',
      MODERATOR: 'bg-orange-500/20 border-orange-500/50 text-orange-400',
      DEVELOPER: 'bg-purple-500/20 border-purple-500/50 text-purple-400',
      CREATOR: 'bg-blue-500/20 border-blue-500/50 text-blue-400',
      USER: 'bg-gray-500/20 border-gray-500/50 text-gray-400',
    }
    return colors[role as keyof typeof colors] || colors.USER
  }

  const getRoleIcon = (role: string) => {
    const icons = {
      ADMIN: ShieldAlert,
      MODERATOR: ShieldCheck,
      DEVELOPER: Shield,
      CREATOR: Award,
      USER: User,
    }
    const Icon = icons[role as keyof typeof icons] || User
    return <Icon className="w-3 h-3" />
  }

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Users Management</h1>
          <p className="text-gray-400">Manage users, roles, and permissions</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 space-y-4">
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[#151922] border border-[#2d333b] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b35] transition-colors"
          />
        </div>

        {/* Role & Verification Filters */}
        <div className="flex flex-wrap gap-3">
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2 bg-[#151922] border border-[#2d333b] rounded-lg text-white focus:outline-none focus:border-[#ff6b35] transition-colors"
          >
            <option value="all">All Roles</option>
            <option value="USER">User</option>
            <option value="CREATOR">Creator</option>
            <option value="DEVELOPER">Developer</option>
            <option value="MODERATOR">Moderator</option>
            <option value="ADMIN">Admin</option>
          </select>

          <select
            value={filterVerified}
            onChange={(e) => setFilterVerified(e.target.value)}
            className="px-4 py-2 bg-[#151922] border border-[#2d333b] rounded-lg text-white focus:outline-none focus:border-[#ff6b35] transition-colors"
          >
            <option value="all">All Status</option>
            <option value="true">Verified</option>
            <option value="false">Unverified</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#151922] border border-[#2d333b] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#1c2128] border-b border-[#2d333b]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Points/Level
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2d333b]">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                    Loading...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-[#1c2128] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.username}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff6b35] to-[#f7931e] flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                              {user.username.substring(0, 2).toUpperCase()}
                            </span>
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-semibold text-white">{user.displayName}</div>
                          <div className="text-xs text-gray-400">@{user.username}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-300">{user.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 border text-xs rounded-md flex items-center gap-1 w-fit ${getRoleColor(user.role)}`}>
                        {getRoleIcon(user.role)}
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="flex items-center gap-1 text-sm text-white">
                          <Star className="w-3 h-3 text-yellow-400" />
                          <span className="font-medium">{user.points}</span>
                        </div>
                        <div className="text-xs text-gray-400">Level {user.level}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {user.isVerified ? (
                        <span className="flex items-center gap-1 text-xs text-green-400">
                          <CheckCircle className="w-4 h-4" />
                          Verified
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <XCircle className="w-4 h-4" />
                          Unverified
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-400">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(user)}
                          className="p-2 text-gray-400 hover:text-orange-400 hover:bg-orange-500/10 rounded-lg transition-all"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
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

      {/* Edit Modal */}
      {showEditModal && editingUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#151922] border border-[#2d333b] rounded-xl p-6 max-w-md w-full"
          >
            <h2 className="text-xl font-bold text-white mb-4">Edit User</h2>
            <form onSubmit={handleUpdateUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Username</label>
                <input
                  type="text"
                  value={editingUser.username}
                  disabled
                  className="w-full px-4 py-2 bg-[#1c2128] border border-[#2d333b] rounded-lg text-gray-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Role</label>
                <select
                  name="role"
                  defaultValue={editingUser.role}
                  className="w-full px-4 py-2 bg-[#1c2128] border border-[#2d333b] rounded-lg text-white focus:outline-none focus:border-[#ff6b35]"
                >
                  <option value="USER">User</option>
                  <option value="CREATOR">Creator</option>
                  <option value="DEVELOPER">Developer</option>
                  <option value="MODERATOR">Moderator</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Verification Status</label>
                <select
                  name="isVerified"
                  defaultValue={editingUser.isVerified.toString()}
                  className="w-full px-4 py-2 bg-[#1c2128] border border-[#2d333b] rounded-lg text-white focus:outline-none focus:border-[#ff6b35]"
                >
                  <option value="true">Verified</option>
                  <option value="false">Unverified</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Points</label>
                <input
                  type="number"
                  name="points"
                  defaultValue={editingUser.points}
                  min="0"
                  className="w-full px-4 py-2 bg-[#1c2128] border border-[#2d333b] rounded-lg text-white focus:outline-none focus:border-[#ff6b35]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Level</label>
                <input
                  type="number"
                  name="level"
                  defaultValue={editingUser.level}
                  min="1"
                  max="99"
                  className="w-full px-4 py-2 bg-[#1c2128] border border-[#2d333b] rounded-lg text-white focus:outline-none focus:border-[#ff6b35]"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#ff6b35]/50 transition-all"
                >
                  Update User
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false)
                    setEditingUser(null)
                  }}
                  className="flex-1 px-6 py-3 bg-[#1c2128] text-white font-semibold rounded-lg hover:bg-[#2d333b] transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}
