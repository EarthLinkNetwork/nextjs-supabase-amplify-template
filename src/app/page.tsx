import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-4xl">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-4">
            ともだちコレクション
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            大切なぬいぐるみたちとの思い出を記録・共有しよう
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">🧸</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">コレクション管理</h3>
              <p className="text-sm text-gray-600">
                ぬいぐるみの写真、名前、入手場所などを詳細に記録
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">📸</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">思い出の共有</h3>
              <p className="text-sm text-gray-600">
                旅行や日常の写真をタイムラインで共有
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">コミュニティ</h3>
              <p className="text-sm text-gray-600">
                同じ趣味を持つ仲間と交流しよう
              </p>
            </div>
          </div>
          
          <div className="space-x-4">
            <Link
              href="/login"
              className="inline-block px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-pink-600 hover:to-purple-700 transition duration-300"
            >
              はじめる
            </Link>
            <Link
              href="/stuffed-animals"
              className="inline-block px-8 py-3 bg-white border-2 border-purple-500 text-purple-600 font-semibold rounded-lg hover:bg-purple-50 transition duration-300"
            >
              コレクションを見る
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}