import Link from 'next/link'
import { StuffedAnimal } from '@/types'

interface StuffedAnimalCardProps {
  stuffedAnimal: StuffedAnimal
}

export function StuffedAnimalCard({ stuffedAnimal }: StuffedAnimalCardProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <Link href={`/stuffed-animals/${stuffedAnimal.id}`} className="group">
      <div className="bg-white rounded-2xl overflow-hidden card-hover border border-gray-100">
        <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200">
          <img
            src={stuffedAnimal.mainImage || '/images/placeholder.jpg'}
            alt={stuffedAnimal.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {!stuffedAnimal.isPublic && (
            <div className="absolute top-3 right-3">
              <span className="inline-flex items-center gap-1 text-xs bg-gray-900/70 backdrop-blur text-white px-2 py-1 rounded-lg">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                非公開
              </span>
            </div>
          )}
        </div>
        
        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors">
            {stuffedAnimal.name}
          </h3>
          
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatDate(stuffedAnimal.familyDate)}
          </div>
          
          {stuffedAnimal.location.name && (
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="truncate">{stuffedAnimal.location.name}</span>
            </div>
          )}
          
          {stuffedAnimal.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {stuffedAnimal.tags.slice(0, 3).map(tag => (
                <span
                  key={tag}
                  className="text-xs bg-brand-50 text-brand-700 px-2.5 py-1 rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
              {stuffedAnimal.tags.length > 3 && (
                <span className="text-xs text-gray-500 px-2 py-1">
                  +{stuffedAnimal.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}