import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-100 via-purple-50 to-pink-50" />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/30" />
      
      <div className="relative z-10 min-h-screen">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-20 animate-fadeIn">
            <h1 className="text-7xl md:text-8xl font-bold mb-6">
              <span className="text-transparent bg-clip-text gradient-brand">
                ともだち
              </span>
              <br />
              <span className="text-4xl md:text-5xl text-gray-800 font-normal">
                コレクション
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
              大切なぬいぐるみたちとの思い出を
              <br className="hidden md:block" />
              美しく記録・共有するプラットフォーム
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 max-w-6xl mx-auto">
            <div className="glass rounded-2xl p-8 card-hover animate-slideIn" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-brand-400 to-brand-600 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-2xl">🧸</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                コレクション管理
              </h3>
              <p className="text-gray-600 leading-relaxed">
                写真、名前、入手場所、思い出のエピソードまで、
                大切な情報を美しく整理
              </p>
            </div>

            <div className="glass rounded-2xl p-8 card-hover animate-slideIn" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-2xl">📸</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                思い出アルバム
              </h3>
              <p className="text-gray-600 leading-relaxed">
                旅行や日常の写真を整理して、
                ストーリーとして残せます
              </p>
            </div>

            <div className="glass rounded-2xl p-8 card-hover animate-slideIn" style={{ animationDelay: '0.3s' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-2xl">💝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                つながる喜び
              </h3>
              <p className="text-gray-600 leading-relaxed">
                同じ趣味を持つ仲間と出会い、
                素敵な思い出を共有
              </p>
            </div>
          </div>

          <div className="text-center space-y-4 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login" className="btn-primary text-lg px-8 py-4 rounded-2xl inline-flex items-center justify-center gap-2 group">
                今すぐはじめる
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link href="/stuffed-animals" className="btn-secondary text-lg px-8 py-4 rounded-2xl inline-flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                コレクションを見る
              </Link>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              登録無料・すぐに使える
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}