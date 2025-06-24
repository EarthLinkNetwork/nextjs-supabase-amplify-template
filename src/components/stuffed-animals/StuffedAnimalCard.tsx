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
    <Link href={`/stuffed-animals/${stuffedAnimal.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        <div className="aspect-w-16 aspect-h-12 bg-gray-200">
          <img
            src={stuffedAnimal.mainImage || '/images/placeholder.jpg'}
            alt={stuffedAnimal.name}
            className="w-full h-48 object-cover"
          />
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold text-gray-800">{stuffedAnimal.name}</h3>
            {!stuffedAnimal.isPublic && (
              <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
                非公開
              </span>
            )}
          </div>
          
          <p className="text-sm text-gray-600 mb-3">
            {formatDate(stuffedAnimal.familyDate)}に家族になりました
          </p>
          
          {stuffedAnimal.location.name && (
            <p className="text-sm text-gray-500 mb-3 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {stuffedAnimal.location.name}
            </p>
          )}
          
          {stuffedAnimal.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {stuffedAnimal.tags.map(tag => (
                <span
                  key={tag}
                  className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}