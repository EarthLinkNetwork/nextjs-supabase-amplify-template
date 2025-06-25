'use client'

import { useState, useEffect } from 'react'
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

  useEffect(() => {
    loadStuffedAnimals()
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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">マイコレクション</h1>
            <p className="text-gray-600">全{stuffedAnimals.length}体のともだち</p>
          </div>
          <Link
            href="/stuffed-animals/new"
            className="btn-primary inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            新しいともだちを登録
          </Link>
        </div>

        <div className="glass rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                検索
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="名前や説明で検索"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                タグで絞り込み
              </label>
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
              >
                <option value="">すべて</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                並び替え
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'date')}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
              >
                <option value="date">家族になった日（新しい順）</option>
                <option value="name">名前順</option>
              </select>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-200 border-t-brand-600"></div>
            </div>
            <p className="text-gray-500 mt-4">読み込み中...</p>
          </div>
        ) : filteredAnimals.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl opacity-50">🧸</span>
            </div>
            <p className="text-gray-500 mb-4 text-lg">
              {searchTerm || selectedTag ? '条件に一致するともだちが見つかりません' : 'まだともだちが登録されていません'}
            </p>
            {!searchTerm && !selectedTag && (
              <Link
                href="/stuffed-animals/new"
                className="text-brand-600 hover:text-brand-700 font-medium"
              >
                最初のともだちを登録する →
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAnimals.map(animal => (
              <StuffedAnimalCard key={animal.id} stuffedAnimal={animal} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}