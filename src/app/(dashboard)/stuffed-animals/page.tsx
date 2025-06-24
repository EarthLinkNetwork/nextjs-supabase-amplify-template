'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { dataService } from '@/lib/dataService'
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
      const data = await dataService.stuffedAnimals.getAll('user1')
      setStuffedAnimals(data)
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">ともだちコレクション</h1>
          <Link
            href="/stuffed-animals/new"
            className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-md hover:from-pink-600 hover:to-purple-700 transition-colors"
          >
            新しいともだちを登録
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                タグで絞り込み
              </label>
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="date">家族になった日（新しい順）</option>
                <option value="name">名前順</option>
              </select>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">読み込み中...</p>
          </div>
        ) : filteredAnimals.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">
              {searchTerm || selectedTag ? '条件に一致するともだちが見つかりません' : 'まだともだちが登録されていません'}
            </p>
            {!searchTerm && !selectedTag && (
              <Link
                href="/stuffed-animals/new"
                className="text-purple-600 hover:text-purple-700"
              >
                最初のともだちを登録する
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAnimals.map(animal => (
              <StuffedAnimalCard key={animal.id} stuffedAnimal={animal} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}