'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { SvgIcon } from '@/components/ui/SvgIcon'
import type { StuffedAnimal } from '@/types'

export default function StuffedAnimalDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [stuffedAnimal, setStuffedAnimal] = useState<StuffedAnimal | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    const fetchStuffedAnimal = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('stuffed_animals')
        .select('*')
        .eq('id', params.id)
        .single()

      if (error) {
        console.error('Error fetching stuffed animal:', error)
        router.push('/stuffed-animals')
        return
      }

      setStuffedAnimal(data)
      setLoading(false)
    }

    fetchStuffedAnimal()
  }, [params.id, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
        <div className="animate-float">
          <div className="w-16 h-16 gradient-brand rounded-2xl animate-pulse" />
        </div>
      </div>
    )
  }

  if (!stuffedAnimal) {
    return null
  }

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-mesh">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-delayed" />
      </div>

      <div className="relative z-10 max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 lg:px-8 py-8 lg:py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8">
          <Link href="/stuffed-animals" className="text-gray-500 hover:text-gray-700 transition-colors">
            コレクション
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">{stuffedAnimal.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
          {/* Left: Image Gallery */}
          <div className="space-y-6">
            <div className="relative group">
              <div className="absolute -inset-4 gradient-brand rounded-3xl opacity-10 blur-2xl group-hover:opacity-20 transition-opacity" />
              <div className="relative aspect-square rounded-2xl overflow-hidden glass-premium">
                <img
                  src={stuffedAnimal.images[activeImage] || stuffedAnimal.mainImage}
                  alt={stuffedAnimal.name}
                  className="w-full h-full object-cover"
                />
                {!stuffedAnimal.isPublic && (
                  <div className="absolute top-4 right-4">
                    <div className="glass-dark px-3 py-1.5 rounded-full flex items-center gap-2">
                      <SvgIcon size="sm" className="text-white">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </SvgIcon>
                      <span className="text-xs font-medium">非公開</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Image Thumbnails */}
            {stuffedAnimal.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {stuffedAnimal.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative aspect-square rounded-xl overflow-hidden transition-all ${
                      activeImage === index 
                        ? 'ring-2 ring-brand-500 scale-95' 
                        : 'hover:scale-95 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${stuffedAnimal.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4">
                {stuffedAnimal.name}
              </h1>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <SvgIcon size="base" className="text-gray-400">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </SvgIcon>
                  <span>家族になった日: {formatDate(stuffedAnimal.familyDate)}</span>
                </div>
              </div>
            </div>

            {/* Location */}
            {stuffedAnimal.location.name && (
              <div className="glass-premium rounded-2xl p-6 hover:scale-[1.02] transition-transform">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <SvgIcon size="base" className="text-brand-600">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </SvgIcon>
                  出会いの場所
                </h3>
                <p className="text-lg font-medium text-gray-900">{stuffedAnimal.location.name}</p>
                {stuffedAnimal.location.address && (
                  <p className="text-sm text-gray-500 mt-1">{stuffedAnimal.location.address}</p>
                )}
              </div>
            )}

            {/* Description */}
            {stuffedAnimal.description && (
              <div className="glass-subtle rounded-2xl p-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">ストーリー</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {stuffedAnimal.description}
                </p>
              </div>
            )}

            {/* Tags */}
            {stuffedAnimal.tags.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">タグ</h3>
                <div className="flex flex-wrap gap-2">
                  {stuffedAnimal.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-gradient-to-r from-brand-50 to-purple-50 text-brand-700 rounded-full text-sm font-medium hover:scale-105 transition-transform cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4 pt-6">
              <Link
                href={`/stuffed-animals/${stuffedAnimal.id}/edit`}
                className="btn-premium flex-1 text-center"
              >
                編集する
              </Link>
              <button
                onClick={() => router.push('/stuffed-animals')}
                className="px-6 py-3 glass-subtle rounded-xl font-medium hover:scale-[1.02] transition-all"
              >
                戻る
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}