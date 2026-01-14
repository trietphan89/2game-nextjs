import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { prisma } from './prisma'
import { UploadType } from './generated/prisma'

const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads')
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
]

export interface UploadResult {
  success: boolean
  error?: string
  url?: string
  upload?: any
}

/**
 * Validate uploaded file
 */
export function validateFile(file: File, type: UploadType): { valid: boolean; error?: string } {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit`,
    }
  }

  // Check file type
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed types: ${ALLOWED_IMAGE_TYPES.join(', ')}`,
    }
  }

  return { valid: true }
}

/**
 * Generate unique filename
 */
export function generateFilename(originalName: string): string {
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substring(2, 8)
  const extension = originalName.split('.').pop()
  return `${timestamp}-${randomString}.${extension}`
}

/**
 * Get upload directory path based on type
 */
export function getUploadPath(type: UploadType): string {
  const typeMap: Record<UploadType, string> = {
    AVATAR: 'avatars',
    POST_IMAGE: 'posts',
    GAME_COVER: 'games/covers',
    GAME_SCREENSHOT: 'games/screenshots',
    GUILD_AVATAR: 'guilds/avatars',
    GUILD_BANNER: 'guilds/banners',
    EVENT_BANNER: 'events',
    OTHER: 'other',
  }

  return join(UPLOAD_DIR, typeMap[type])
}

/**
 * Ensure directory exists
 */
export async function ensureDirectory(dirPath: string): Promise<void> {
  try {
    await mkdir(dirPath, { recursive: true })
  } catch (error) {
    // Directory might already exist, ignore error
  }
}

/**
 * Save uploaded file to disk
 */
export async function saveFile(
  file: File,
  type: UploadType,
  userId: string
): Promise<UploadResult> {
  try {
    // Validate file
    const validation = validateFile(file, type)
    if (!validation.valid) {
      return {
        success: false,
        error: validation.error,
      }
    }

    // Generate filename and paths
    const filename = generateFilename(file.name)
    const uploadPath = getUploadPath(type)
    await ensureDirectory(uploadPath)

    const filePath = join(uploadPath, filename)
    const relativePath = filePath.replace(join(process.cwd(), 'public'), '')
    const publicUrl = relativePath.replace(/\\/g, '/')

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filePath, buffer)

    // Save upload record to database
    const upload = await prisma.upload.create({
      data: {
        userId,
        filename,
        path: relativePath,
        url: publicUrl,
        mimeType: file.type,
        size: file.size,
        type,
      },
    })

    return {
      success: true,
      url: publicUrl,
      upload,
    }
  } catch (error) {
    console.error('File upload error:', error)
    return {
      success: false,
      error: 'Failed to upload file',
    }
  }
}

/**
 * Upload multiple files
 */
export async function saveFiles(
  files: File[],
  type: UploadType,
  userId: string
): Promise<UploadResult[]> {
  const results: UploadResult[] = []

  for (const file of files) {
    const result = await saveFile(file, type, userId)
    results.push(result)
  }

  return results
}

/**
 * Delete uploaded file
 */
export async function deleteFile(uploadId: string, userId: string): Promise<boolean> {
  try {
    const upload = await prisma.upload.findFirst({
      where: {
        id: uploadId,
        userId,
      },
    })

    if (!upload) {
      return false
    }

    // Delete from database
    await prisma.upload.delete({
      where: { id: uploadId },
    })

    // Optionally delete from filesystem
    // const fs = require('fs/promises')
    // const filePath = join(process.cwd(), 'public', upload.path)
    // await fs.unlink(filePath)

    return true
  } catch (error) {
    console.error('File deletion error:', error)
    return false
  }
}

/**
 * Get user's uploads
 */
export async function getUserUploads(
  userId: string,
  type?: UploadType,
  limit: number = 50
) {
  return prisma.upload.findMany({
    where: {
      userId,
      ...(type && { type }),
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: limit,
  })
}
