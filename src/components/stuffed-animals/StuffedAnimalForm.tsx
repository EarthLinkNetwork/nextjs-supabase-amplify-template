'use client'

import { useState } from 'react'
import { Location } from '@/types'

interface StuffedAnimalFormProps {
  onSubmit: (data: any) => void
  isSubmitting: boolean
  initialData?: any
}

export function StuffedAnimalForm({ onSubmit, isSubmitting, initialData }: StuffedAnimalFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    familyDate: initialData?.familyDate || new Date().toISOString().split('T')[0],
    location: {
      name: initialData?.location?.name || '',
      address: initialData?.location?.address || '',
      latitude: initialData?.location?.latitude || undefined,
      longitude: initialData?.location?.longitude || undefined,
    } as Location,
    description: initialData?.description || '',
    tags: initialData?.tags?.join(', ') || '',
    isPublic: initialData?.isPublic ?? true,
    mainImage: initialData?.mainImage || '',
    images: initialData?.images || []
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    if (name.startsWith('location.')) {
      const locationField = name.split('.')[1]
      setFormData(prev => ({
        ...prev,
        location: {
          ...prev.location,
          [locationField]: value
        }
      }))
    } else if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const submitData = {
      ...formData,
      familyDate: new Date(formData.familyDate),
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      images: formData.images.length > 0 ? formData.images : [formData.mainImage]
    }
    
    onSubmit(submitData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            ともだちの名前 *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="くまちゃん"
          />
        </div>

        <div>
          <label htmlFor="familyDate" className="block text-sm font-medium text-gray-700 mb-2">
            家族になった日 *
          </label>
          <input
            type="date"
            id="familyDate"
            name="familyDate"
            value={formData.familyDate}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="mainImage" className="block text-sm font-medium text-gray-700 mb-2">
          メイン写真URL *
        </label>
        <input
          type="text"
          id="mainImage"
          name="mainImage"
          value={formData.mainImage}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          手に入れた場所
        </label>
        <div className="space-y-3">
          <input
            type="text"
            name="location.name"
            value={formData.location.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="場所の名前（例：東京ディズニーランド）"
          />
          <input
            type="text"
            name="location.address"
            value={formData.location.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="住所（例：千葉県浦安市舞浜1-1）"
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          説明
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="このともだちについて教えてください"
        />
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
          タグ（カンマ区切り）
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="くま, 茶色, ディズニー"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="isPublic"
          name="isPublic"
          checked={formData.isPublic}
          onChange={handleChange}
          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
        />
        <label htmlFor="isPublic" className="ml-2 block text-sm text-gray-700">
          公開する
        </label>
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          キャンセル
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-md hover:from-pink-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
        >
          {isSubmitting ? '登録中...' : '登録する'}
        </button>
      </div>
    </form>
  )
}