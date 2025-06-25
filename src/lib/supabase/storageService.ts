import { createClient } from '@/lib/supabase/client'

const BUCKET_NAME = 'stuffed-animals'

export const storageService = {
  async uploadImage(file: File, userId: string): Promise<string> {
    const supabase = createClient()
    
    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    
    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, file, {
        contentType: file.type,
        upsert: false
      })
    
    if (uploadError) {
      throw uploadError
    }
    
    const { data } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileName)
    
    return data.publicUrl
  },
  
  async deleteImage(imageUrl: string): Promise<void> {
    const supabase = createClient()
    
    // Extract file path from URL
    const urlParts = imageUrl.split(`/storage/v1/object/public/${BUCKET_NAME}/`)
    if (urlParts.length !== 2) {
      throw new Error('Invalid image URL')
    }
    
    const filePath = urlParts[1]
    
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filePath])
    
    if (error) {
      throw error
    }
  },
  
  async uploadMultipleImages(files: File[], userId: string): Promise<string[]> {
    const uploadPromises = files.map(file => this.uploadImage(file, userId))
    return Promise.all(uploadPromises)
  }
}