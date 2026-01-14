'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Save, X } from 'lucide-react'
import Link from 'next/link'

export default function CreateEventPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const formData = new FormData(e.currentTarget)

    const eventData = {
      title: formData.get('title') as string,
      slug: formData.get('slug') as string,
      description: formData.get('description') as string,
      type: formData.get('type') as string,
      status: formData.get('status') as string,
      startDate: new Date(formData.get('startDate') as string).toISOString(),
      endDate: new Date(formData.get('endDate') as string).toISOString(),
      maxParticipants: formData.get('maxParticipants') ? parseInt(formData.get('maxParticipants') as string) : undefined,
      prize: formData.get('prize') as string || undefined,
      rules: formData.get('rules') as string || undefined,
      registrationDeadline: formData.get('registrationDeadline')
        ? new Date(formData.get('registrationDeadline') as string).toISOString()
        : undefined,
      thumbnail: formData.get('thumbnail') as string,
      coverImage: formData.get('coverImage') as string,
    }

    const token = localStorage.getItem('authToken')
    if (!token) {
      setError('You must be logged in to create an event')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/admin/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(eventData),
      })

      const data = await response.json()

      if (response.ok) {
        alert('Event created successfully!')
        router.push('/admin/events')
      } else {
        setError(data.error || 'Failed to create event')
      }
    } catch (err) {
      console.error('Create event error:', err)
      setError('An error occurred while creating the event')
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    const slugInput = document.getElementById('slug') as HTMLInputElement
    if (slugInput && !slugInput.value) {
      slugInput.value = slug
    }
  }

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/events"
          className="p-2 text-gray-400 hover:text-white hover:bg-[#1c2128] rounded-lg transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white">Create New Event</h1>
          <p className="text-gray-400">Add a new event to the platform</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-[#151922] border border-[#2d333b] rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="title"
                required
                onChange={generateSlug}
                className="w-full px-4 py-2 bg-[#1c2128] border border-[#2d333b] rounded-lg text-white focus:outline-none focus:border-[#ff6b35] transition-colors"
                placeholder="e.g. Summer Championship 2024"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Slug <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                required
                className="w-full px-4 py-2 bg-[#1c2128] border border-[#2d333b] rounded-lg text-white focus:outline-none focus:border-[#ff6b35] transition-colors"
                placeholder="e.g. summer-championship-2024"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Description <span className="text-red-400">*</span>
              </label>
              <textarea
                name="description"
                required
                rows={6}
                className="w-full px-4 py-2 bg-[#1c2128] border border-[#2d333b] rounded-lg text-white focus:outline-none focus:border-[#ff6b35] transition-colors"
                placeholder="Detailed event description..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Type <span className="text-red-400">*</span>
              </label>
              <select
                name="type"
                required
                defaultValue="TOURNAMENT"
                className="w-full px-4 py-2 bg-[#1c2128] border border-[#2d333b] rounded-lg text-white focus:outline-none focus:border-[#ff6b35] transition-colors"
              >
                <option value="TOURNAMENT">Tournament</option>
                <option value="COMMUNITY">Community</option>
                <option value="LAUNCH">Launch</option>
                <option value="WORKSHOP">Workshop</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Status <span className="text-red-400">*</span>
              </label>
              <select
                name="status"
                defaultValue="UPCOMING"
                className="w-full px-4 py-2 bg-[#1c2128] border border-[#2d333b] rounded-lg text-white focus:outline-none focus:border-[#ff6b35] transition-colors"
              >
                <option value="UPCOMING">Upcoming</option>
                <option value="LIVE">Live</option>
                <option value="ENDED">Ended</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Start Date <span className="text-red-400">*</span>
              </label>
              <input
                type="datetime-local"
                name="startDate"
                required
                className="w-full px-4 py-2 bg-[#1c2128] border border-[#2d333b] rounded-lg text-white focus:outline-none focus:border-[#ff6b35] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                End Date <span className="text-red-400">*</span>
              </label>
              <input
                type="datetime-local"
                name="endDate"
                required
                className="w-full px-4 py-2 bg-[#1c2128] border border-[#2d333b] rounded-lg text-white focus:outline-none focus:border-[#ff6b35] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Registration Deadline
              </label>
              <input
                type="datetime-local"
                name="registrationDeadline"
                className="w-full px-4 py-2 bg-[#1c2128] border border-[#2d333b] rounded-lg text-white focus:outline-none focus:border-[#ff6b35] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Max Participants
              </label>
              <input
                type="number"
                name="maxParticipants"
                min="1"
                className="w-full px-4 py-2 bg-[#1c2128] border border-[#2d333b] rounded-lg text-white focus:outline-none focus:border-[#ff6b35] transition-colors"
                placeholder="Leave empty for unlimited"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Prize Pool
              </label>
              <input
                type="text"
                name="prize"
                className="w-full px-4 py-2 bg-[#1c2128] border border-[#2d333b] rounded-lg text-white focus:outline-none focus:border-[#ff6b35] transition-colors"
                placeholder="e.g. $10,000 Cash Prize"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Rules
              </label>
              <textarea
                name="rules"
                rows={4}
                className="w-full px-4 py-2 bg-[#1c2128] border border-[#2d333b] rounded-lg text-white focus:outline-none focus:border-[#ff6b35] transition-colors"
                placeholder="Event rules and regulations..."
              />
            </div>
          </div>
        </div>

        {/* Media */}
        <div className="bg-[#151922] border border-[#2d333b] rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Media</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Thumbnail URL <span className="text-red-400">*</span>
              </label>
              <input
                type="url"
                name="thumbnail"
                required
                className="w-full px-4 py-2 bg-[#1c2128] border border-[#2d333b] rounded-lg text-white focus:outline-none focus:border-[#ff6b35] transition-colors"
                placeholder="https://example.com/thumbnail.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Cover Image URL <span className="text-red-400">*</span>
              </label>
              <input
                type="url"
                name="coverImage"
                required
                className="w-full px-4 py-2 bg-[#1c2128] border border-[#2d333b] rounded-lg text-white focus:outline-none focus:border-[#ff6b35] transition-colors"
                placeholder="https://example.com/cover.jpg"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#ff6b35]/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-5 h-5" />
            {loading ? 'Creating...' : 'Create Event'}
          </button>
          <Link
            href="/admin/events"
            className="flex items-center gap-2 px-6 py-3 bg-[#1c2128] text-white font-semibold rounded-lg hover:bg-[#2d333b] transition-all"
          >
            <X className="w-5 h-5" />
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
