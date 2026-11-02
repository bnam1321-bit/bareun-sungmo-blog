import { getAllPosts } from '@/lib/blog';
import Link from 'next/link';
import TypographicCover from '@/app/components/TypographicCover';

export const metadata = {
  title: '더바른성모내과의원 | 인천 서구 검단신도시 아라동 소화기내과 전문의·건강검진·내시경',
  description: '인천 서구 검단신도시 아라동 더바른성모내과의원. 소화기내과 전문의 2인(여성 전문의 상주) 진료, 올림푸스 CV-290 위·대장내시경, 삼성 메디슨 V7 초음파, 국가건강검진·5대암검진, 고혈압·당뇨·고지혈증 만성질환.',
};

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Premium Hero Header */}
      <div className="relative overflow-hidden text-white bg-stone-900 bg-[url('/images/clinic-interior.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-[2px]"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-36">
          <div className="text-center">
            <div className="inline-flex items-center px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full mb-8 border border-white/20 shadow-lg">
              <span className="text-sm font-bold text-stone-50 tracking-wide">🏥 소화기내과 전문의 2인 진료 · 여성 전문의 상주</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-8 text-white break-keep leading-tight sm:leading-snug lg:leading-normal drop-shadow-lg">
              검단신도시 아라동<br />
              더바른성모내과의원
            </h1>
            <p className="text-lg sm:text-xl text-stone-200 max-w-3xl mx-auto leading-relaxed break-keep mt-4 font-medium drop-shadow">
              위·대장내시경, 국가건강검진·5대암검진, 초음파, 만성질환 관리까지<br className="hidden sm:block" /> 소화기내과 전문의의 정확한 진단과 세심한 진료로 함께합니다.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-stone-50 to-transparent"></div>
      </div>

      {/* Clinic Key Highlights Section (Semantic Entity Overview for LLM & Users) */}
      <section aria-label="더바른성모내과의원 핵심 진료 안내" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
        <div className="bg-white rounded-3xl shadow-md border border-stone-200/80 p-6 sm:p-8">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="border-b md:border-b-0 md:border-r border-stone-100 pb-4 md:pb-0 md:pr-6">
              <h2 className="text-base font-black text-stone-900 mb-2 flex items-center gap-2">
                <span>🔬</span> 정밀 위·대장내시경 & 당일 용종절제
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed">
                대학병원급 고해상도 내시경 <strong>올림푸스 CV-290</strong>과 CO2 무통 가스를 활용하여 소화기내과 전문의 2인이 직접 미세 병변 확인 및 당일 용종절제술을 시행합니다.
              </p>
            </div>
            <div className="border-b md:border-b-0 md:border-r border-stone-100 pb-4 md:pb-0 md:pr-6">
              <h2 className="text-base font-black text-stone-900 mb-2 flex items-center gap-2">
                <span>👩‍⚕️</span> 여성 전문의 상주 & 정밀 초음파·유방검진
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed">
                여성 소화기내과 전문의가 상주하며, <strong>삼성 메디슨 V7 초음파</strong>와 <strong>Pinkview-BT / Pinkview-UPS(DR)</strong> 유방촬영 장치로 유방·갑상선·복부 검진을 편안하게 받으실 수 있습니다.
              </p>
            </div>
            <div>
              <h2 className="text-base font-black text-stone-900 mb-2 flex items-center gap-2">
                <span>🏥</span> 국가건강검진·5대암검진 & 만성질환
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed">
                인천 서구 검단신도시(아라동 이음3로 149 위너스프라자 5층)에서 공단 국가검진, 5대 암검진, 채용검진 및 고혈압·당뇨·고지혈증·지방간 맞춤 진료를 제공합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section aria-label="전문의 건강정보 칼럼 목록" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900">소화기내과 전문의 건강 칼럼</h2>
            <p className="text-stone-600 text-sm sm:text-base mt-1">건강검진, 소화기질환, 만성질환에 대한 정확한 의학 정보를 전해드립니다.</p>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-32">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-stone-100 mb-8 shadow-sm border border-stone-200">
              <span className="text-5xl">📝</span>
            </div>
            <h3 className="text-xl font-bold text-stone-800 mb-3">준비중입니다</h3>
            <p className="text-gray-500 text-lg">곧 유익한 건강정보를 만나보실 수 있습니다.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <article
                  className="h-full bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50 hover:scale-[1.02] hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Typographic Cover */}
                  <div className="relative h-56 w-full">
                    <TypographicCover
                      title={post.title}
                      tags={post.tags}
                      slug={post.slug}
                    />
                    {/* Date Badge */}
                    <div className="absolute bottom-4 right-4 z-10">
                      <time dateTime={post.date} className="px-3 py-1.5 bg-black/40 backdrop-blur-md text-white rounded-full text-xs font-semibold">
                        {post.date}
                      </time>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-black text-stone-900 mb-3 line-clamp-2 group-hover:text-amber-700 transition-colors leading-tight tracking-tight">
                      {post.title}
                    </h3>
                    <p className="text-stone-600 text-sm mb-5 line-clamp-3 leading-relaxed">
                      {post.description}
                    </p>

                    {/* Read More Button */}
                    <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                      <span className="text-amber-700 text-sm font-bold group-hover:translate-x-2 transition-transform inline-flex items-center gap-2">
                        자세히 보기
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
