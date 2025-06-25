import Link from 'next/link'
import { StuffedAnimal } from '@/types'
import { SvgIcon } from '@/components/ui/SvgIcon'

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
    <Link href={`/stuffed-animals/${stuffedAnimal.id}`} className="group block">
      <div className="relative h-full">
        {/* Hover Glow Effect */}
        <div className="absolute -inset-0.5 gradient-brand rounded-2xl opacity-0 group-hover:opacity-75 blur-xl transition-opacity duration-500" />
        
        <div className="relative h-full bg-white rounded-2xl overflow-hidden transform transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-2xl border border-gray-100/50">
          <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100">
            <img
              src={stuffedAnimal.mainImage || '/images/placeholder.jpg'}
              alt={stuffedAnimal.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            {/* Overlay gradient on hover */}
            <div className="absolute inset-0 gradient-overlay opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
            {!stuffedAnimal.isPublic && (
              <div className="absolute top-3 right-3">
                <div className="glass-dark px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                  <SvgIcon size="sm">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </SvgIcon>
                  <span className="text-xs font-medium">非公開</span>
                </div>
              </div>
            )}  
          </div>
          
          <div className="p-5 lg:p-6">
            <h3 className="text-lg lg:text-xl font-display font-semibold text-gray-900 mb-3 group-hover:text-brand-600 transition-colors">
              {stuffedAnimal.name}
            </h3>
            
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
              <SvgIcon size="base" className="text-gray-400">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </SvgIcon>
              {formatDate(stuffedAnimal.familyDate)}
            </div>
            
            {stuffedAnimal.location.name && (
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <SvgIcon size="base" className="text-gray-400">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </SvgIcon>
                <span className="truncate">{stuffedAnimal.location.name}</span>
              </div>
            )}
            
            {stuffedAnimal.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {stuffedAnimal.tags.slice(0, 3).map(tag => (
                  <span
                    key={tag}
                    className="inline-block text-xs bg-gradient-to-r from-brand-50 to-purple-50 text-brand-700 px-3 py-1 rounded-full font-medium transform group-hover:scale-105 transition-transform"
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
      </div>
    </Link>
  )
}