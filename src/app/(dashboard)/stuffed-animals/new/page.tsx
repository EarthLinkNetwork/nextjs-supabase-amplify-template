'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabaseDataService } from '@/lib/supabase/dataService'
import { createClient } from '@/lib/supabase/client'
import { StuffedAnimalForm } from '@/components/stuffed-animals/StuffedAnimalForm'

export default function NewStuffedAnimalPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/login')
        return
      }
      
      await supabaseDataService.stuffedAnimals.create({
        ...data,
        userId: user.id,
      })
      router.push('/stuffed-animals')
    } catch (error) {
      console.error('Error creating stuffed animal:', error)
      alert('エラーが発生しました。もう一度お試しください。')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">新しいともだちを登録</h1>
            <p className="text-gray-600">大切なともだちの情報を記録しましょう</p>
          </div>
          <div className="glass rounded-2xl p-8">
            <StuffedAnimalForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
          </div>
        </div>
      </div>
    </div>
  )
}