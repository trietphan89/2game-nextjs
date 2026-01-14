'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Save, X } from 'lucide-react'
import Link from 'next/link'

interface Event {
  id: string
  title: string
  slug: string
  description: string
  type: 'TOURNAMENT' | 'COMMUNITY' | 'LAUNCH' | 'WORKSHOP'
  status: 'UPCOMING' | 'LIVE' | 'ENDED' | 'CANCELLED'
  startDate: string
  endDate: string
  registrationDeadline?: string
  maxParticipants?: number
  prize?: string
  rules?: string
  thumbnail: string
  coverImage: string
}

export default function EditEventPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState('')
  const [event, setEvent] = useState<Event | null>(null)

  useEffect(() => {
    fetchEvent()
  }, [])

  const fetchEvent = async () => {
    const token = localStorage.getItem('authToken')
    if (!token) {
      router.push('/login')
      return
    }

    try {
      const response = await fetch(`/api/admin/events/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setEvent(data.data.event)
      } else {
        setError('Failed to load event')
      }
    } catch (err) {
      console.error('Fetch event error:', err)
      setError('An error occurred while loading the event')
    } finally {
      setFetching(false)
    }
  }

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
      setError('You must be logged in to edit an event')
      setLoading(false)
      return
    }

    try {
      const response = await fetch(`/api/admin/events/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(eventData),
      })

      const data = await response.json()

      if (response.ok) {
        alert('Event updated successfully!')
        router.push('/admin/events')
      } else {
        setError(data.error || 'Failed to update event')
      }
    } catch (err) {
      console.error('Update event error:', err)
      setError('An error occurred while updating the event')
    } finally {
      setLoading(false)
    }
  }

  const formatDateTimeLocal = (dateString: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day}T${hours}:${minutes}`
  }

  if (fetching) {
    return (
      <div className="p-4 lg:p-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-gray-400">Loading event...</div>
      </div>
    )
  }

  if (error && !event) {
    return (
      <div className="p-4 lg:p-8">
        <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400">
          {error}
        </div>
        <Link
          href="/admin/events"
          className="mt-4 inline-flex items-center gap-2 text-gray-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Events
        </Link>
      </div>
    )
  }

  if (!event) return null

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
          <h1 className="text-3xl font-bold text-white">Edit Event</h1>
          <p className="text-gray-400">Update event information</p>
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
                defaultValue={event.title}
                className="w-full px-4 py-2 bg-[#1c2128] border border-[#2d333b] rounded-lg text-white focus:outline-none focus:border-[#ff6b35] transition-colors"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Slug <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="slug"
                required
                defaultValue={event.slug}
                className="w-full px-4 py-2 bg-[#1c2128] border border-[#2d333b] rounded-lg text-white focus:outline-none focus:border-[#ff6b35] transition-colors"
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
                defaultValue={event.description}
                className="w-full px-4 py-2 bg-[#1c2128] border border-[#2d333b] rounded-lg text-white focus:outline-none focus:border-[#ff6b35] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Type <span className="text-red-400">*</span>
              </label>
              <select
                name="type"
                required
                defaultValue={event.type}
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
                defaultValue={event.status}
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
                defaultValue={formatDateTimeLocal(event.startDate)}
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
                defaultValue={formatDateTimeLocal(event.endDate)}
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
                defaultValue={event.registrationDeadline ? formatDateTimeLocal(event.registrationDeadline) : ''}
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
                defaultValue={event.maxParticipants}
                className="w-full px-4 py-2 bg-[#1c2128] border border-[#2d333b] rounded-lg text-white focus:outline-none focus:border-[#ff6b35] transition-colors"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Prize Pool
              </label>
              <input
                type="text"
                name="prize"
                defaultValue={event.prize}
                className="w-full px-4 py-2 bg-[#1c2128] border border-[#2d333b] rounded-lg text-white focus:outline-none focus:border-[#ff6b35] transition-colors"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Rules
              </label>
              <textarea
                name="rules"
                rows={4}
                defaultValue={event.rules}
                className="w-full px-4 py-2 bg-[#1c2128] border border-[#2d333b] rounded-lg text-white focus:outline-none focus:border-[#ff6b35] transition-colors"
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
                defaultValue={event.thumbnail}
                className="w-full px-4 py-2 bg-[#1c2128] border border-[#2d333b] rounded-lg text-white focus:outline-none focus:border-[#ff6b35] transition-colors"
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
                defaultValue={event.coverImage}
                className="w-full px-4 py-2 bg-[#1c2128] border border-[#2d333b] rounded-lg text-white focus:outline-none focus:border-[#ff6b35] transition-colors"
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
            {loading ? 'Updating...' : 'Update Event'}
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
