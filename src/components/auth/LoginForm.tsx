'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      router.push('/dashboard')
    }

    setIsLoading(false)
  }

  const handleSignUp = async () => {
    setIsLoading(true)
    setError(null)

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      console.error('SignUp error:', error)
      setError(error.message)
    } else {
      setError('確認メールを送信しました。メールをご確認ください。')
    }

    setIsLoading(false)
  }

  return (
    <div className="w-full">
      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            メールアドレス
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            パスワード
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
          />
        </div>

        {error && (
          <div className="rounded-xl bg-red-50 border border-red-100 p-4">
            <p className="text-sm text-red-600 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </p>
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 flex justify-center py-3 px-4 gradient-brand text-white font-medium rounded-xl hover:shadow-lg transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {isLoading ? '処理中...' : 'ログイン'}
          </button>
          <button
            type="button"
            onClick={handleSignUp}
            disabled={isLoading}
            className="flex-1 flex justify-center py-3 px-4 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:opacity-50"
          >
            新規登録
          </button>
        </div>
      </form>
    </div>
  )
}