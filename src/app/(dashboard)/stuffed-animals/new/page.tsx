'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { dataService } from '@/lib/dataService'
import { StuffedAnimalForm } from '@/components/stuffed-animals/StuffedAnimalForm'

export default function NewStuffedAnimalPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true)
    try {
      await dataService.stuffedAnimals.create({
        ...data,
        userId: 'user1', // TODO: 実際のユーザーIDを使用
      })
      router.push('/stuffed-animals')
    } catch (error) {
      console.error('Error creating stuffed animal:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">新しいともだちを登録</h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <StuffedAnimalForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </div>
      </div>
    </div>
  )
}