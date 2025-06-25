'use client';

import Link from "next/link";
import { SvgIcon } from '@/components/ui/SvgIcon';
import { useEffect, useRef } from 'react';

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax effect on scroll
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const parallaxElements = document.querySelectorAll('.parallax-element');
      
      parallaxElements.forEach((element, index) => {
        const speed = element.getAttribute('data-speed') || '0.5';
        const yPos = -(scrolled * parseFloat(speed));
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };

    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible', 'revealed');
        }
      });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.animate-on-scroll, .reveal-on-scroll');
    animateElements.forEach(element => observer.observe(element));

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      animateElements.forEach(element => observer.unobserve(element));
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden gradient-mesh">
      {/* Animated Background Layers */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 gradient-aurora opacity-30" />
        <div className="absolute top-0 -left-1/4 w-[150%] h-[150%] bg-gradient-radial from-brand-300/20 via-transparent to-transparent rounded-full blur-3xl parallax-element" data-speed="0.2" />
        <div className="absolute bottom-0 -right-1/4 w-[150%] h-[150%] bg-gradient-radial from-purple-300/20 via-transparent to-transparent rounded-full blur-3xl parallax-element" data-speed="0.3" />
      </div>

      {/* Premium Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center lg:py-20">
        <div className="w-full px-4 lg:px-8 2xl:px-12">
          <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
              {/* Left Content - Enhanced Typography and Effects */}
              <div className="lg:col-span-5 text-center lg:text-left">
                <div className="animate-fadeIn">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl font-display mb-6 lg:mb-8">
                    <span className="text-gradient text-shadow-premium inline-block">
                      ともだち
                    </span>
                    <span className="block lg:inline lg:ml-4 text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl text-gray-800 font-light mt-2 lg:mt-0">
                      コレクション
                    </span>
                  </h1>
                  
                  <p className="text-lg lg:text-xl 2xl:text-2xl text-gray-700 leading-relaxed mb-10 lg:mb-12 max-w-xl mx-auto lg:mx-0 font-light">
                    大切なぬいぐるみたちとの思い出を
                    <br className="hidden lg:block" />
                    美しく記録・共有する
                    <span className="font-medium text-gradient">プレミアム</span>
                    プラットフォーム
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center lg:justify-start mb-10">
                    <Link href="/login" className="group relative btn-primary text-lg lg:text-xl px-10 lg:px-12 py-5 lg:py-6 rounded-3xl inline-flex items-center justify-center gap-3 ambient-light">
                      <span className="relative z-10">今すぐはじめる</span>
                      <SvgIcon size="md" className="relative z-10 group-hover:translate-x-1 transition-transform">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </SvgIcon>
                    </Link>
                    
                    <Link href="/stuffed-animals" className="group gradient-border glass-premium text-gray-800 text-lg lg:text-xl px-10 lg:px-12 py-5 lg:py-6 inline-flex items-center justify-center gap-3 hover:scale-105 transition-all duration-300">
                      <SvgIcon size="md">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </SvgIcon>
                      <span>コレクションを見る</span>
                    </Link>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm text-gray-500 justify-center lg:justify-start">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span>登録無料</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span>すぐに使える</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Visual Content - Premium 3D Cards */}
              <div className="hidden lg:block lg:col-span-7">
                <div className="relative perspective-1000">
                  {/* Ambient glow background */}
                  <div className="absolute inset-0 bg-gradient-radial from-brand-400/30 via-brand-300/20 to-transparent blur-3xl scale-150 animate-pulse" />
                  
                  {/* 3D Card Grid */}
                  <div className="relative grid grid-cols-12 gap-6 p-8">
                    {/* Main Feature Card */}
                    <div className="col-span-6 row-span-2">
                      <div className="card-3d glass-depth rounded-3xl p-8 transform -rotate-3 hover:rotate-0 transition-all duration-700 hover:scale-105 float-animation">
                        <div className="card-3d-front">
                          <div className="aspect-square bg-gradient-to-br from-pink-100 via-purple-100 to-brand-100 rounded-2xl flex items-center justify-center mb-6 overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-radial from-white/50 to-transparent animate-shimmer" />
                            <span className="text-8xl z-10">🧸</span>
                          </div>
                          <h3 className="text-2xl font-semibold text-gray-800 mb-2">くまちゃん</h3>
                          <p className="text-gray-600 mb-4">2023.05.15 に仲間入り</p>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-brand-100 text-brand-700 rounded-full text-sm">東京</span>
                            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">お気に入り</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Stats Card */}
                    <div className="col-span-6">
                      <div className="glass-premium rounded-2xl p-6 transform rotate-2 hover:rotate-0 transition-all duration-500 hover:scale-105 neumorphic">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-brand-400 to-brand-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <span className="text-2xl">📊</span>
                          </div>
                          <span className="text-3xl font-bold text-gradient">24</span>
                        </div>
                        <h4 className="text-lg font-medium text-gray-800 mb-1">コレクション数</h4>
                        <p className="text-sm text-gray-600">今月 +3 体追加</p>
                      </div>
                    </div>

                    {/* Memory Card */}
                    <div className="col-span-6">
                      <div className="glass-premium rounded-2xl p-6 transform -rotate-2 hover:rotate-0 transition-all duration-500 hover:scale-105">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <span className="text-2xl">📍</span>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-gray-800">東京ディズニーランド</h4>
                            <p className="text-sm text-gray-600">最高の思い出の場所</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Community Card */}
                    <div className="col-span-6">
                      <div className="glass-premium rounded-2xl p-6 transform rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-105 float-delayed">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <span className="text-2xl">👥</span>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-gray-800">くまファミリー</h4>
                            <p className="text-sm text-gray-600">5体のなかま</p>
                          </div>
                        </div>
                        <div className="flex -space-x-2">
                          {['🧸', '🐻', '🐨', '🐼', '🐻‍❄️'].map((emoji, index) => (
                            <div key={index} className="w-10 h-10 bg-white rounded-full border-2 border-white shadow-md flex items-center justify-center">
                              <span className="text-lg">{emoji}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Activity Card */}
                    <div className="col-span-6">
                      <div className="glass-premium rounded-2xl p-6 transform -rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-105">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-800 mb-1">今日の活動</h4>
                            <p className="text-sm text-gray-600">写真を3枚追加</p>
                          </div>
                          <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                              <span className="text-xl">✨</span>
                            </div>
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section ref={featuresRef} className="relative py-20 lg:py-32">
        <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 lg:px-8 2xl:px-12">
          <div className="text-center mb-16 lg:mb-20 animate-on-scroll">
            <h2 className="text-4xl lg:text-5xl 2xl:text-6xl font-display text-gradient mb-6">
              プレミアム機能
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto">
              あなたの大切なコレクションを、最高の形で残すために
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Feature Card 1 */}
            <div className="reveal-on-scroll" style={{ transitionDelay: '0.1s' }}>
              <div className="glass-depth rounded-3xl p-8 lg:p-10 h-full card-hover ambient-light">
                <div className="w-16 h-16 lg:w-20 lg:h-20 gradient-border rounded-2xl flex items-center justify-center mb-6 lg:mb-8 mx-auto lg:mx-0">
                  <span className="text-3xl lg:text-4xl">🧸</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-4 text-center lg:text-left">
                  スマートコレクション
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed text-center lg:text-left">
                  AIが自動でタグ付けし、美しく整理。
                  写真、名前、入手場所、思い出のエピソードまで、
                  すべてを完璧に管理します。
                </p>
                <div className="mt-6 flex justify-center lg:justify-start">
                  <div className="inline-flex items-center gap-2 text-brand-600 font-medium">
                    <span>詳しく見る</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Card 2 */}
            <div className="reveal-on-scroll" style={{ transitionDelay: '0.2s' }}>
              <div className="glass-depth rounded-3xl p-8 lg:p-10 h-full card-hover ambient-light">
                <div className="w-16 h-16 lg:w-20 lg:h-20 gradient-border rounded-2xl flex items-center justify-center mb-6 lg:mb-8 mx-auto lg:mx-0">
                  <span className="text-3xl lg:text-4xl">📸</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-4 text-center lg:text-left">
                  インタラクティブアルバム
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed text-center lg:text-left">
                  3D効果とアニメーションで魅せる写真体験。
                  旅行や日常の写真をストーリーとして
                  美しく演出します。
                </p>
                <div className="mt-6 flex justify-center lg:justify-start">
                  <div className="inline-flex items-center gap-2 text-brand-600 font-medium">
                    <span>詳しく見る</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Card 3 */}
            <div className="reveal-on-scroll" style={{ transitionDelay: '0.3s' }}>
              <div className="glass-depth rounded-3xl p-8 lg:p-10 h-full card-hover ambient-light">
                <div className="w-16 h-16 lg:w-20 lg:h-20 gradient-border rounded-2xl flex items-center justify-center mb-6 lg:mb-8 mx-auto lg:mx-0">
                  <span className="text-3xl lg:text-4xl">💝</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-4 text-center lg:text-left">
                  グローバルコミュニティ
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed text-center lg:text-left">
                  世界中のコレクターとつながり、
                  素敵な思い出を共有。限定イベントや
                  交換会にも参加できます。
                </p>
                <div className="mt-6 flex justify-center lg:justify-start">
                  <div className="inline-flex items-center gap-2 text-brand-600 font-medium">
                    <span>詳しく見る</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Stats Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-50" />
        <div className="relative max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 lg:px-8 2xl:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { number: '50K+', label: 'アクティブユーザー', icon: '👥' },
              { number: '1M+', label: 'コレクション登録数', icon: '🧸' },
              { number: '4.9', label: 'ユーザー評価', icon: '⭐' },
              { number: '24/7', label: 'サポート体制', icon: '💬' }
            ].map((stat, index) => (
              <div key={index} className="text-center reveal-on-scroll" style={{ transitionDelay: `${index * 0.1}s` }}>
                <div className="glass-premium rounded-3xl p-6 lg:p-8 hover:scale-105 transition-all duration-300">
                  <div className="text-4xl mb-4">{stat.icon}</div>
                  <div className="text-4xl lg:text-5xl font-bold text-gradient mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}