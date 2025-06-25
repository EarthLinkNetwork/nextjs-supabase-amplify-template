'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { supabaseDataService } from '@/lib/supabase/dataService'
import { createClient } from '@/lib/supabase/client'
import { StuffedAnimal } from '@/types'
import { StuffedAnimalCard } from '@/components/stuffed-animals/StuffedAnimalCard'

export default function StuffedAnimalsPage() {
  const [stuffedAnimals, setStuffedAnimals] = useState<StuffedAnimal[]>([])
  const [filteredAnimals, setFilteredAnimals] = useState<StuffedAnimal[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [sortBy, setSortBy] = useState<'name' | 'date'>('date')
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'gallery'>('grid')
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    loadStuffedAnimals()
    
    // Animate on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(element => observer.observe(element));

    return () => {
      animateElements.forEach(element => observer.unobserve(element));
    };
  }, [])

  useEffect(() => {
    filterAndSortAnimals()
  }, [stuffedAnimals, searchTerm, selectedTag, sortBy])

  const loadStuffedAnimals = async () => {
    setIsLoading(true)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        const data = await supabaseDataService.stuffedAnimals.getAll(user.id)
        setStuffedAnimals(data)
      }
    } catch (error) {
      console.error('Error loading stuffed animals:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterAndSortAnimals = () => {
    let filtered = [...stuffedAnimals]

    if (searchTerm) {
      filtered = filtered.filter(animal =>
        animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        animal.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedTag) {
      filtered = filtered.filter(animal =>
        animal.tags.includes(selectedTag)
      )
    }

    filtered.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name)
      } else {
        return new Date(b.familyDate).getTime() - new Date(a.familyDate).getTime()
      }
    })

    setFilteredAnimals(filtered)
  }

  const allTags = Array.from(new Set(stuffedAnimals.flatMap(a => a.tags)))

  return (
    <div className="min-h-screen relative gradient-mesh">
      {/* Animated Background Layers for PC */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden lg:block hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-brand-200/20 to-transparent rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-radial from-purple-200/20 to-transparent rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div ref={containerRef} className="relative max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 lg:px-8 py-8 lg:py-16">
        {/* Premium Header Section */}
        <div className="animate-fadeIn mb-12 lg:mb-20">
          <div className="text-center lg:text-left mb-8 lg:mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-display mb-4">
              <span className="text-gradient text-shadow-premium">マイコレクション</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600">
              あなたの大切な
              <span className="font-semibold text-gradient mx-2">{stuffedAnimals.length}</span>
              体のともだちたち
            </p>
          </div>

          {/* Action Bar */}
          <div className="glass-premium rounded-3xl p-6 lg:p-8 backdrop-blur-2xl">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="flex flex-wrap gap-4">
                {/* View Mode Toggles - PC Only */}
                <div className="hidden lg:flex items-center gap-2 glass rounded-2xl p-2">
                  {[
                    { mode: 'grid', icon: '⚏', label: 'グリッド' },
                    { mode: 'list', icon: '☰', label: 'リスト' },
                    { mode: 'gallery', icon: '⊞', label: 'ギャラリー' }
                  ].map(({ mode, icon, label }) => (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode as any)}
                      className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                        viewMode === mode 
                          ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-lg' 
                          : 'hover:bg-white/50 text-gray-700'
                      }`}
                      title={label}
                    >
                      <span className="text-lg">{icon}</span>
                    </button>
                  ))}
                </div>

                {/* Stats Pills */}
                <div className="flex gap-3">
                  <div className="glass rounded-full px-6 py-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-sm font-medium">{filteredAnimals.length} 体表示中</span>
                  </div>
                  {selectedTag && (
                    <div className="gradient-border rounded-full px-6 py-3 flex items-center gap-2">
                      <span className="text-sm font-medium">{selectedTag}</span>
                      <button
                        onClick={() => setSelectedTag('')}
                        className="ml-1 hover:text-brand-600 transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <Link
                href="/stuffed-animals/new"
                className="group btn-primary text-lg lg:text-xl px-8 lg:px-10 py-4 lg:py-5 rounded-2xl inline-flex items-center gap-3 ambient-light"
              >
                <svg className="w-5 h-5 lg:w-6 lg:h-6 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>新しいともだちを登録</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Premium Filter Section */}
        <div className="glass-depth rounded-3xl p-8 lg:p-10 mb-12 lg:mb-16 animate-slideIn">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Search Input */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                検索
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="名前や説明で検索"
                  className="w-full px-6 py-4 pl-12 glass-premium border-0 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-500/20 transition-all text-lg"
                />
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Tag Filter */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                タグで絞り込み
              </label>
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="w-full px-6 py-4 glass-premium border-0 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-500/20 transition-all text-lg appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  backgroundSize: '1.5rem',
                }}
              >
                <option value="">すべてのタグ</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                並び替え
              </label>
              <div className="flex gap-3">
                {[
                  { value: 'date', label: '新着順', icon: '📅' },
                  { value: 'name', label: '名前順', icon: '🔤' }
                ].map(({ value, label, icon }) => (
                  <button
                    key={value}
                    onClick={() => setSortBy(value as any)}
                    className={`flex-1 px-6 py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 ${
                      sortBy === value
                        ? 'gradient-border bg-white shadow-lg scale-105'
                        : 'glass hover:scale-102 hover:shadow-md'
                    }`}
                  >
                    <span className="text-lg">{icon}</span>
                    <span className="font-medium">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        {isLoading ? (
          <div className="text-center py-32">
            <div className="relative inline-flex items-center justify-center">
              <div className="animate-spin rounded-full h-20 w-20 border-4 border-brand-200 border-t-brand-600"></div>
              <div className="absolute animate-ping rounded-full h-20 w-20 border-4 border-brand-400 opacity-20"></div>
            </div>
            <p className="text-gray-500 mt-6 text-xl">コレクションを読み込んでいます...</p>
          </div>
        ) : filteredAnimals.length === 0 ? (
          <div className="text-center py-32 animate-fadeIn">
            <div className="glass-premium rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <span className="text-6xl opacity-70">🧸</span>
            </div>
            <h3 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-4">
              {searchTerm || selectedTag ? '条件に一致するともだちが見つかりません' : 'まだともだちが登録されていません'}
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              {searchTerm || selectedTag ? '検索条件を変更してみてください' : '最初のともだちを追加して、コレクションを始めましょう'}
            </p>
            {!searchTerm && !selectedTag && (
              <Link
                href="/stuffed-animals/new"
                className="btn-primary text-lg px-8 py-4 rounded-2xl inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                最初のともだちを登録する
              </Link>
            )}
          </div>
        ) : (
          <>
            {/* Grid View */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                {filteredAnimals.map((animal, index) => (
                  <div
                    key={animal.id}
                    className="animate-on-scroll"
                    style={{ transitionDelay: `${index * 50}ms` }}
                    onMouseEnter={() => setHoveredCard(animal.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className={`relative transform transition-all duration-500 ${
                      hoveredCard === animal.id ? 'scale-105 z-10' : ''
                    }`}>
                      {hoveredCard === animal.id && (
                        <div className="absolute inset-0 bg-gradient-radial from-brand-400/20 to-transparent blur-2xl scale-150 animate-pulse" />
                      )}
                      <StuffedAnimalCard stuffedAnimal={animal} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* List View - PC Only */}
            {viewMode === 'list' && (
              <div className="space-y-4">
                {filteredAnimals.map((animal, index) => (
                  <div
                    key={animal.id}
                    className="glass-premium rounded-2xl p-6 lg:p-8 animate-on-scroll hover:scale-102 transition-all duration-300"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg">
                        {animal.imageUrls?.[0] ? (
                          <img
                            src={animal.imageUrls[0]}
                            alt={animal.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-brand-100 to-purple-100 flex items-center justify-center">
                            <span className="text-4xl">🧸</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{animal.name}</h3>
                        <p className="text-gray-600 mb-3">{animal.description || '説明なし'}</p>
                        <div className="flex flex-wrap gap-2">
                          {animal.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-brand-100 text-brand-700 rounded-full text-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500 mb-2">家族になった日</p>
                        <p className="font-medium">{new Date(animal.familyDate).toLocaleDateString('ja-JP')}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Gallery View - PC Only */}
            {viewMode === 'gallery' && (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                {filteredAnimals.map((animal, index) => (
                  <div
                    key={animal.id}
                    className="group relative aspect-square rounded-2xl overflow-hidden animate-on-scroll cursor-pointer"
                    style={{ transitionDelay: `${index * 30}ms` }}
                  >
                    {animal.imageUrls?.[0] ? (
                      <img
                        src={animal.imageUrls[0]}
                        alt={animal.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-brand-100 to-purple-100 flex items-center justify-center">
                        <span className="text-6xl">🧸</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-lg font-semibold mb-1">{animal.name}</h3>
                        <p className="text-sm opacity-90">{new Date(animal.familyDate).toLocaleDateString('ja-JP')}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}