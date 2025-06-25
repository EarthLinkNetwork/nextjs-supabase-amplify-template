'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    checkUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const navItems = [
    { href: '/stuffed-animals', label: 'コレクション' },
    { href: '/timeline', label: 'タイムライン' },
    { href: '/trips', label: '旅行' },
    { href: '/groups', label: 'グループ' },
  ]

  return (
    <nav className="glass sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 gradient-brand rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">🧸</span>
              </div>
              <span className="text-xl font-bold text-gray-900 group-hover:text-brand-600 transition-colors">
                ともだちコレクション
              </span>
            </Link>
            
            {user && (
              <div className="hidden md:flex items-center space-x-1">
                {navItems.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                      pathname.startsWith(item.href)
                        ? 'bg-brand-100 text-brand-700'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <Link
                  href="/stuffed-animals/new"
                  className="flex items-center gap-2 px-4 py-2 gradient-brand text-white text-sm font-medium rounded-xl hover:shadow-lg transition-all hover:-translate-y-0.5"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  新規登録
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-all"
                >
                  ログアウト
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="px-5 py-2 gradient-brand text-white text-sm font-medium rounded-xl hover:shadow-lg transition-all hover:-translate-y-0.5"
              >
                ログイン
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}