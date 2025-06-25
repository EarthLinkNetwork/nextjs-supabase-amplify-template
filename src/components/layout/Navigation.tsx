'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { SvgIcon } from '@/components/ui/SvgIcon'

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
    <nav className="sticky top-0 z-50 glass-premium border-b border-white/10">
      <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          <div className="flex items-center space-x-8 lg:space-x-12">
            <Link href="/" className="flex items-center space-x-2 lg:space-x-4 group">
              <div className="relative">
                <div className="absolute inset-0 gradient-brand rounded-xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
                <div className="relative w-10 h-10 lg:w-12 lg:h-12 gradient-brand rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-glow-sm">
                  <span className="text-white text-lg lg:text-2xl">🧸</span>
                </div>
              </div>
              <div>
                <h1 className="text-lg lg:text-2xl font-display font-bold text-gray-900 group-hover:text-brand-600 transition-colors">
                  ともだちコレクション
                </h1>
                <p className="hidden lg:block text-xs text-gray-500 -mt-1">Premium Stuffed Animal Collection</p>
              </div>
            </Link>
            
            {user && (
              <div className="hidden md:flex items-center space-x-1">
                {navItems.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative px-5 py-2.5 text-sm font-medium rounded-xl transition-all ${
                      pathname.startsWith(item.href)
                        ? 'text-brand-700'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {pathname.startsWith(item.href) && (
                      <div className="absolute inset-0 bg-gradient-to-r from-brand-100 to-purple-100 rounded-xl" />
                    )}
                    <span className="relative">{item.label}</span>
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
                  className="relative group flex items-center gap-2 px-5 py-2.5 text-white text-sm font-medium rounded-xl overflow-hidden"
                >
                  <div className="absolute inset-0 gradient-brand" />
                  <div className="absolute inset-0 gradient-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative flex items-center gap-2">
                  <SvgIcon size="base">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </SvgIcon>
                    新規登録
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-xl hover:bg-gray-100/50 backdrop-blur transition-all"
                >
                  ログアウト
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="relative group px-6 py-2.5 text-white text-sm font-medium rounded-xl overflow-hidden"
              >
                <div className="absolute inset-0 gradient-brand" />
                <div className="absolute inset-0 gradient-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative">ログイン</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}