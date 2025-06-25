'use client'

import { useState } from 'react'
import { Location } from '@/types'
import { SvgIcon } from '@/components/ui/SvgIcon'

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
      tags: formData.tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag),
      images: formData.images.length > 0 ? formData.images : [formData.mainImage]
    }
    
    onSubmit(submitData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-8">
        {/* 基本情報セクション */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">基本情報</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                ともだちの名前
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                placeholder="くまちゃん"
              />
            </div>

            <div>
              <label htmlFor="familyDate" className="block text-sm font-semibold text-gray-900 mb-2">
                家族になった日
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="date"
                id="familyDate"
                name="familyDate"
                value={formData.familyDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
              />
            </div>
          </div>
        </div>

        {/* 写真セクション */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">写真</h3>
          <div>
            <label htmlFor="mainImage" className="block text-sm font-semibold text-gray-900 mb-2">
              メイン写真URL
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              id="mainImage"
              name="mainImage"
              value={formData.mainImage}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>

        {/* 場所情報セクション */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">場所情報</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                手に入れた場所
              </label>
              <input
                type="text"
                name="location.name"
                value={formData.location.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                placeholder="場所の名前（例：東京ディズニーランド）"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                住所
              </label>
              <input
                type="text"
                name="location.address"
                value={formData.location.address}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                placeholder="住所（例：千葉県浦安市舞浜1-1）"
              />
            </div>
          </div>
        </div>

        {/* 詳細情報セクション */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">詳細情報</h3>
          <div className="space-y-6">
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-900 mb-2">
                説明
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all resize-none"
                placeholder="このともだちについて教えてください（思い出、特徴、エピソードなど）"
              />
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-semibold text-gray-900 mb-2">
                タグ（カンマ区切り）
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                placeholder="くま, 茶色, ディズニー"
              />
              <p className="mt-2 text-xs text-gray-500">タグを追加して、後で検索しやすくしましょう</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isPublic"
                  name="isPublic"
                  checked={formData.isPublic}
                  onChange={handleChange}
                  className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded"
                />
                <label htmlFor="isPublic" className="ml-3 block">
                  <span className="text-sm font-medium text-gray-900">公開設定</span>
                  <span className="text-xs text-gray-500 block mt-0.5">他のユーザーにも表示されるようになります</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-6 border-t border-gray-100">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-xl font-medium transition-all"
        >
          キャンセル
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-3 gradient-brand text-white rounded-xl font-medium hover:shadow-lg transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 inline-flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              登録中...
            </>
          ) : (
            <>
              <SvgIcon size="base">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </SvgIcon>
              登録する
            </>
          )}
        </button>
      </div>
    </form>
  )
}