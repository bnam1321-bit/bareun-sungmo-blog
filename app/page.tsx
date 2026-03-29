import { getAllPosts } from '@/lib/blog';
import Link from 'next/link';
import TypographicCover from '@/app/components/TypographicCover';

export const metadata = {
  title: '건강정보 | 더바른성모내과',
  description: '더바른성모내과에서 전하는 올바른 건강 정보입니다.',
};

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Premium Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDEzNGgxMnYxMkgzNnptMjQgMGgxMnYxMkg2MHpNMTIgMTQ2aDEydjEySDEyem0yNCAwaDEydjEySDM2em0yNCAwaDEydjEySDYweiIvPjwvZz48L2c+PC9zdmc+')] opacity-10"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
              <span className="text-sm font-semibold">🏥 전문의가 전하는 의학정보</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent break-keep leading-tight sm:leading-snug lg:leading-normal">
              인천 서구 당하동에 위치한<br />
              소화기 내과 전문의 진료 의원<br />
              더바른성모내과
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed break-keep mt-4">
              위·대장내시경, 건강검진, 만성질환 관리까지<br className="hidden sm:block" /> 정확한 진단과 따뜻한 진료로 함께합니다.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-8">
        {posts.length === 0 ? (
          <div className="text-center py-32">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-100 to-purple-100 mb-8 shadow-lg">
              <span className="text-5xl">📝</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">준비중입니다</h3>
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
                      <div className="px-3 py-1.5 bg-black/40 backdrop-blur-md text-white rounded-full text-xs font-semibold">
                        {post.date}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-black text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-5 line-clamp-3 leading-relaxed">
                      {post.description}
                    </p>

                    {/* Read More Button */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-blue-600 text-sm font-bold group-hover:translate-x-2 transition-transform inline-flex items-center gap-2">
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
      </div>
    </div>
  );
}
