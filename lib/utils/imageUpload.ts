// Image upload utility functions

const MAX_IMAGE_SIZE = 5 * 1024 * 1024 // 5MB in bytes
const MAX_IMAGES = 10
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']

export interface ImageValidationResult {
  valid: boolean
  error?: string
}

/**
 * Validate a single image file
 */
export function validateImage(file: File): ImageValidationResult {
  // Check file type
  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file type. Only JPG, PNG, GIF, and WebP images are allowed.',
    }
  }

  // Check file size
  if (file.size > MAX_IMAGE_SIZE) {
    return {
      valid: false,
      error: `File size exceeds 5MB limit. (${(file.size / 1024 / 1024).toFixed(2)}MB)`,
    }
  }

  return { valid: true }
}

/**
 * Validate multiple images
 */
export function validateImages(files: File[], currentCount: number = 0): ImageValidationResult {
  // Check total count
  if (currentCount + files.length > MAX_IMAGES) {
    return {
      valid: false,
      error: `Maximum ${MAX_IMAGES} images allowed. You have ${currentCount} and are trying to add ${files.length} more.`,
    }
  }

  // Validate each file
  for (const file of files) {
    const result = validateImage(file)
    if (!result.valid) {
      return result
    }
  }

  return { valid: true }
}

/**
 * Convert image file to base64 string
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
}

/**
 * Compress and resize image if needed
 */
export function compressImage(file: File, maxWidth: number = 1920, quality: number = 0.8): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e) => {
      const img = new Image()
      img.src = e.target?.result as string
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let width = img.width
        let height = img.height

        // Resize if width exceeds maxWidth
        if (width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }

        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext('2d')
        ctx?.drawImage(img, 0, 0, width, height)

        // Convert to base64
        const compressedBase64 = canvas.toDataURL(file.type, quality)
        resolve(compressedBase64)
      }
      img.onerror = reject
    }
    reader.onerror = reject
  })
}

/**
 * Process multiple image files
 */
export async function processImages(files: File[], compress: boolean = true): Promise<string[]> {
  const promises = files.map((file) => {
    if (compress) {
      return compressImage(file)
    }
    return fileToBase64(file)
  })

  return Promise.all(promises)
}

/**
 * Get image dimensions from file
 */
export function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e) => {
      const img = new Image()
      img.src = e.target?.result as string
      img.onload = () => {
        resolve({ width: img.width, height: img.height })
      }
      img.onerror = reject
    }
    reader.onerror = reject
  })
}
