'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Save, X } from 'lucide-react'
import Link from 'next/link'

export default function CreateGamePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const formData = new FormData(e.currentTarget)

    const gameData = {
      title: formData.get('title') as string,
      slug: formData.get('slug') as string,
      description: formData.get('description') as string,
      shortDescription: formData.get('shortDescription') as string,
      category: formData.get('category') as string,
      developer: formData.get('developer') as string,
      publisher: formData.get('publisher') as string,
      releaseDate: formData.get('releaseDate') as string,
      price: parseFloat(formData.get('price') as string),
      discount: parseInt(formData.get('discount') as string) || 0,
      thumbnail: formData.get('thumbnail') as string,
      coverImage: formData.get('coverImage') as string,
      videoUrl: formData.get('videoUrl') as string || undefined,
      systemRequirements: {
        os: formData.get('os') as string,
        processor: formData.get('processor') as string,
        memory: formData.get('memory') as string,
        graphics: formData.get('graphics') as string,
        storage: formData.get('storage') as string,
      },
      tags: (formData.get('tags') as string).split(',').map(tag => tag.trim()).filter(Boolean),
      features: (formData.get('features') as string).split('\n').map(f => f.trim()).filter(Boolean),
      screenshots: (formData.get('screenshots') as string).split('\n').map(s => s.trim()).filter(Boolean),
      isFeatured: formData.get('isFeatured') === 'on',
      status: formData.get('status') as string,
    }

    const token = localStorage.getItem('authToken')
    if (!token) {
      setError('You must be logged in to create a game')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/admin/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(gameData),
      })

      const data = await response.json()

      if (response.ok) {
        alert('Game created successfully!')
        router.push('/admin/games')
      } else {
        setError(data.error || 'Failed to create game')
      }
    } catch (err) {
      console.error('Create game error:', err)
      setError('An error occurred while creating the game')
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
          href="/admin/games"
          className="p-2 text-gray-400 hover:text-white hover:bg-[#1c2128] rounded-lg transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white">Create New Game</h1>
          <p className="text-gray-400">Add a new game to the platform</p>
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
                placeholder="e.g. Counter-Strike 2"
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
                placeholder="e.g. counter-strike-2"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Short Description <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="shortDescription"
                required
                maxLength={200}
                className="w-full px-4 py-2 bg-[#1c2128] border border-[#2d333b] rounded-lg text-white focus:outline-none focus:border-[#ff6b35] transition-colors"
                placeholder="Brief description (max 200 chars)"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Full Description <span className="text-red-400">*</span>
              </label>
              <textarea
                name="description"
                required
                rows={6}
                className="w-full px-4 py-2 bg-[#1c2128] border border-[#2d333b] rounded-lg text-white focus:outline-none focus:border-[#ff6b35] transition-colors"
                placeholder="Detailed game description..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Category <span className="text-red-400">*</span>
              </label>
              <select
                name="category"
                required
                className="w-full px-4 py-2 bg-[#1c2128] border border-[#2d333b] rounded-lg text-white focus:outline-none focus:border-[#ff6b35] transition-colors"
              >
                <option value="">Select Category</option>
                <option value="ACTION">Action</option>
                <option value="ADVENTURE">Adventure</option>
                <option value="RPG">RPG</option>
                <option value="STRATEGY">Strategy</option>
                <option value="SIMULATION">Simulation</option>
                <option value="SPORTS">Sports</option>
                <option value="RACING">Racing</option>
                <option value="SHOOTER">Shooter</option>
                <option value="PUZZLE">Puzzle</option>
                <option value="HORROR">Horror</option>
                <option value="FIGHTING">Fighting</option>
                <option value="PLATFORMER">Platformer</option>
                <option value="MMO">MMO</option>
                <option value="CASUAL">Casual</option>
                <option value="INDIE">Indie</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Status <span className="text-red-400">*</span>
              </label>
              <select
                name="status"
                defaultValue="ACTIVE"
                className="w-full px-4 py-2 bg-[#1c2128] border border-[#2d333b] rounded-lg text-white focus:outline-none focus:border-[#ff6b35] transition-colors"
              >
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
                <option value="COMING_SOON">Coming Soon</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Developer <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="developer"
                required
                className="w-full px-4 py-2 bg-[#1c2128] border border-[#2d333b] rounded-lg text-white focus:outline-none focus:border-[#ff6b35] transition-colors"
                placeholder="e.g. Valve Corporation"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Publisher <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="publisher"
                required
                className="w-full px-4 py-2 bg-[#1c2128] border border-[#2d333b] rounded-lg text-white focus:outline-none focus:border-[#ff6b35] transition-colors"
                placeholder="e.g. Valve Corporation"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Release Date <span className="text-red-400">*</span>
              </label>
              <input
                type="date"
                name="releaseDate"
                required
                className="w-full px-4 py-2 bg-[#1c2128] border border-[#2d333b] rounded-lg text-white focus:outline-none focus:border-[#ff6b35] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Price (USD) <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                name="price"
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-2 bg-[#1c2128] border border-[#2d333b] rounded-lg text-white focus:outline-none focus:border-[#ff6b35] transition-colors"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Discount (%)
              </label>
              <input
                type="number"
                name="discount"
                min="0"
                max="100"
                defaultValue="0"
                className="w-full px-4 py-2 bg-[#1c2128] border border-[#2d333b] rounded-lg text-white focus:outline-none focus:border-[#ff6b35] transition-colors"
                placeholder="0"
              />
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-400">
                <input
                  type="checkbox"
                  name="isFeatured"
                  className="w-4 h-4 rounded bg-[#1c2128] border-[#2d333b] text-[#ff6b35] focus:ring-[#ff6b35] focus:ring-offset-0"
                />
                Featured Game
              </label>
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

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Video URL (YouTube/Trailer)
              </label>
              <input
                type="url"
                name="videoUrl"
                className="w-full px-4 py-2 bg-[#1c2128] border border-[#2d333b] rounded-lg text-white focus:outline-none focus:border-[#ff6b35] transition-colors"
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Screenshots (one URL per line)
              </label>
              <textarea
                name="screenshots"
                rows={4}
                className="w-full px-4 py-2 bg-[#1c2128] border border-[#2d333b] rounded-lg text-white focus:outline-none focus:border-[#ff6b35] transition-colors"
                placeholder="https://example.com/screenshot1.jpg&#10;https://example.com/screenshot2.jpg"
              />
            </div>
          </div>
        </div>

        {/* System Requirements */}
        <div className="bg-[#151922] border border-[#2d333b] rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">System Requirements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Operating System <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="os"
                required
                className="w-full px-4 py-2 bg-[#1c2128] border border-[#2d333b] rounded-lg text-white focus:outline-none focus:border-[#ff6b35] transition-colors"
                placeholder="e.g. Windows 10 64-bit"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Processor <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="processor"
                required
                className="w-full px-4 py-2 bg-[#1c2128] border border-[#2d333b] rounded-lg text-white focus:outline-none focus:border-[#ff6b35] transition-colors"
                placeholder="e.g. Intel Core i5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Memory (RAM) <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="memory"
                required
                className="w-full px-4 py-2 bg-[#1c2128] border border-[#2d333b] rounded-lg text-white focus:outline-none focus:border-[#ff6b35] transition-colors"
                placeholder="e.g. 8 GB RAM"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Graphics <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="graphics"
                required
                className="w-full px-4 py-2 bg-[#1c2128] border border-[#2d333b] rounded-lg text-white focus:outline-none focus:border-[#ff6b35] transition-colors"
                placeholder="e.g. NVIDIA GTX 1060"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Storage <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="storage"
                required
                className="w-full px-4 py-2 bg-[#1c2128] border border-[#2d333b] rounded-lg text-white focus:outline-none focus:border-[#ff6b35] transition-colors"
                placeholder="e.g. 50 GB available space"
              />
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-[#151922] border border-[#2d333b] rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Additional Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                name="tags"
                className="w-full px-4 py-2 bg-[#1c2128] border border-[#2d333b] rounded-lg text-white focus:outline-none focus:border-[#ff6b35] transition-colors"
                placeholder="e.g. multiplayer, fps, competitive"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Features (one per line)
              </label>
              <textarea
                name="features"
                rows={4}
                className="w-full px-4 py-2 bg-[#1c2128] border border-[#2d333b] rounded-lg text-white focus:outline-none focus:border-[#ff6b35] transition-colors"
                placeholder="Online multiplayer&#10;Cloud saves&#10;Controller support"
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
            {loading ? 'Creating...' : 'Create Game'}
          </button>
          <Link
            href="/admin/games"
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
