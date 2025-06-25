'use client'

import { SvgIcon } from '@/components/ui/SvgIcon'

export default function DebugPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">SVG Debug Page</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-lg font-semibold mb-4">Test SVG Icons</h2>
          
          <div className="space-y-4">
            <div className="border border-gray-300 p-4 bg-gray-50">
              <p className="mb-2">SVG with w-4 h-4 (old method):</p>
              <svg className="w-4 h-4 bg-red-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            
            <div className="border border-gray-300 p-4 bg-gray-50">
              <p className="mb-2">SVG with SvgIcon wrapper (new method):</p>
              <SvgIcon size="base" className="bg-red-100">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </SvgIcon>
            </div>
            
            <div className="border border-gray-300 p-4 bg-gray-50">
              <p className="mb-2">SVG with inline style width/height:</p>
              <svg style={{ width: '16px', height: '16px' }} className="bg-blue-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            
            <div className="border border-gray-300 p-4 bg-gray-50">
              <p className="mb-2">SVG in flex container:</p>
              <div className="flex items-center gap-2 bg-green-100 p-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>テキスト</span>
              </div>
            </div>
            
            <div className="border border-gray-300 p-4 bg-gray-50">
              <p className="mb-2">Button with SVG (old):</p>
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg">
                <span>ボタン</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
            
            <div className="border border-gray-300 p-4 bg-gray-50">
              <p className="mb-2">Button with SvgIcon (new):</p>
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg">
                <span>ボタン</span>
                <SvgIcon size="base">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </SvgIcon>
              </button>
            </div>
            
            <div className="border border-gray-300 p-4 bg-gray-50">
              <p className="mb-2">All sizes with SvgIcon:</p>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <SvgIcon size="sm" className="bg-blue-100">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </SvgIcon>
                  <p className="text-xs mt-1">sm (12px)</p>
                </div>
                <div className="text-center">
                  <SvgIcon size="base" className="bg-green-100">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </SvgIcon>
                  <p className="text-xs mt-1">base (16px)</p>
                </div>
                <div className="text-center">
                  <SvgIcon size="md" className="bg-yellow-100">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </SvgIcon>
                  <p className="text-xs mt-1">md (20px)</p>
                </div>
                <div className="text-center">
                  <SvgIcon size="lg" className="bg-red-100">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </SvgIcon>
                  <p className="text-xs mt-1">lg (24px)</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-lg font-semibold mb-4">Container Sizes</h2>
          <div className="space-y-2">
            <div className="bg-gray-100 p-4">
              <p>Screen width: <span className="font-mono">{typeof window !== 'undefined' ? window.innerWidth : 'N/A'}px</span></p>
            </div>
            <div className="bg-gray-100 p-4">
              <p>This container width: <span className="font-mono">100%</span></p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}