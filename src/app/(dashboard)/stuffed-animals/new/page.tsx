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
      <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 lg:px-8 py-8 lg:py-12">
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-10">
          {/* 左側: ガイド（PC版のみ） */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <h2 className="text-lg lg:text-xl font-bold text-gray-900 mb-5">登録のヒント</h2>
              
              <div className="space-y-6">
                <div className="glass rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">📸</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">写真の撮り方</h3>
                      <p className="text-sm text-gray-600">明るい場所で、ぬいぐるみ全体が写るように撮影しましょう</p>
                    </div>
                  </div>
                </div>
                
                <div className="glass rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">📍</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">場所の記録</h3>
                      <p className="text-sm text-gray-600">どこで出会ったか記録すると、思い出がより鮮明に</p>
                    </div>
                  </div>
                </div>
                
                <div className="glass rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">🏷️</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">タグの活用</h3>
                      <p className="text-sm text-gray-600">種類、色、サイズなどでタグ付けすると検索しやすくなります</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 右側: フォーム */}
          <div className="lg:col-span-2">
            <div className="mb-6 lg:mb-8">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">新しいともだちを登録</h1>
              <p className="text-sm md:text-base lg:text-lg text-gray-600">大切なともだちの情報を記録しましょう</p>
            </div>
            <div className="glass rounded-xl lg:rounded-2xl p-6 lg:p-8">
              <StuffedAnimalForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}