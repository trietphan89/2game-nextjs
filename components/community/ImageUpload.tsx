'use client'

import React, { useRef, useState } from 'react'
import { X, Image as ImageIcon, Upload } from 'lucide-react'
import { validateImages, processImages } from '@/lib/utils/imageUpload'

interface ImageUploadProps {
  images: string[]
  onChange: (images: string[]) => void
  maxImages?: number
}

export default function ImageUpload({ images, onChange, maxImages = 10 }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    setError(null)
    const fileArray = Array.from(files)

    // Validate images
    const validation = validateImages(fileArray, images.length)
    if (!validation.valid) {
      setError(validation.error || 'Invalid images')
      return
    }

    setIsUploading(true)
    try {
      // Process and convert to base64
      const base64Images = await processImages(fileArray, true)
      onChange([...images, ...base64Images])
    } catch (err) {
      setError('Failed to process images. Please try again.')
      console.error('Image processing error:', err)
    } finally {
      setIsUploading(false)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFiles(e.dataTransfer.files)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files)
    // Reset input value to allow selecting the same file again
    e.target.value = ''
  }

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    onChange(newImages)
  }

  const openFileBrowser = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-3">
      {/* Drag and Drop Area */}
      {images.length < maxImages && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={openFileBrowser}
          className={`
            relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer
            transition-all duration-200
            ${
              isDragging
                ? 'border-[#ff6b35] bg-[#ff6b35]/10'
                : 'border-[#2d333b] bg-[#1c2128] hover:border-[#ff6b35]/50 hover:bg-[#1c2128]/80'
            }
            ${isUploading ? 'pointer-events-none opacity-50' : ''}
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />

          <div className="flex flex-col items-center gap-2">
            {isUploading ? (
              <>
                <div className="w-12 h-12 rounded-full border-4 border-[#2d333b] border-t-[#ff6b35] animate-spin" />
                <p className="text-sm text-[#9aa0a6]">Processing images...</p>
              </>
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-[#ff6b35]/10 flex items-center justify-center">
                  <Upload className="w-6 h-6 text-[#ff6b35]" />
                </div>
                <div>
                  <p className="text-sm text-[#e8eaed] font-medium">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-[#9aa0a6] mt-1">
                    JPG, PNG, GIF, WebP (Max 5MB each, up to {maxImages} images)
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-lg overflow-hidden bg-[#1c2128] border border-[#2d333b] group"
            >
              <img
                src={image}
                alt={`Upload ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/70 flex items-center justify-center
                  opacity-0 group-hover:opacity-100 transition-opacity duration-200
                  hover:bg-red-500"
                aria-label="Remove image"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Image Counter */}
      {images.length > 0 && (
        <div className="flex items-center justify-between text-xs text-[#9aa0a6]">
          <div className="flex items-center gap-1">
            <ImageIcon className="w-4 h-4" />
            <span>
              {images.length} / {maxImages} images
            </span>
          </div>
          {images.length >= maxImages && (
            <span className="text-[#ff6b35]">Maximum images reached</span>
          )}
        </div>
      )}
    </div>
  )
}
