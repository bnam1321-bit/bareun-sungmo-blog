import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { Metadata } from 'next';
import Link from 'next/link';
import { CLINIC_NAME, SITE_URL } from '@/lib/constants';
import EditDeleteButtons from './EditDeleteButtons';

type Props = {
    params: Promise<{ slug: string }>;
};

// 본문 마크다운에서 Q&A 항목을 추출하여 Schema.org FAQPage 구조화 데이터로 변환
function extractFaqsFromMarkdown(markdown: string): { question: string; answer: string }[] {
    const faqs: { question: string; answer: string }[] = [];
    // 패턴: **Q1: 질문...** \n A: 답변... 또는 **Q. 질문...**
    const qaRegex = /\*\*Q\d*[:.]?\s*([^\n*]+)\*\*\s*\n+\s*(?:\*\*A\d*[:.]?\*\*|A\d*[:.])\s*([^\n]+(?:\n(?!\*\*Q|\n## )[^\n]+)*)/g;
    let match;
    while ((match = qaRegex.exec(markdown)) !== null) {
        const question = match[1].trim();
        const answer = match[2].replace(/\*\*/g, '').trim();
        if (question && answer) {
            faqs.push({ question, answer });
        }
    }
    return faqs;
}

// 동적 라우트 생성을 위한 함수 (빌드 시점에 페이지 생성)
export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

// SEO & GEO(LLM) 메타데이터 생성
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return {
            title: '페이지를 찾을 수 없습니다.',
        };
    }

    return {
        title: `${post.title} | ${CLINIC_NAME}`,
        description: post.description,
        keywords: [
            ...(post.tags || []),
            CLINIC_NAME,
            '더바른성모내과의원',
            '인천서구내과',
            '검단신도시내과',
            '아라동내과',
            '인천 서구 내과',
            '인천서구건강검진',
            '인천서구위내시경',
            '인천서구대장내시경',
            '소화기내과전문의'
        ],
        authors: [{ name: `${CLINIC_NAME} 소화기내과 전문의 의료진`, url: SITE_URL }],
        alternates: {
            canonical: `${SITE_URL}/blog/${post.slug}`,
        },
        openGraph: {
            title: post.title,
            description: post.description,
            type: 'article',
            publishedTime: post.date,
            url: `${SITE_URL}/blog/${post.slug}`,
            siteName: CLINIC_NAME,
            authors: [`${CLINIC_NAME} 소화기내과 전문의`],
            locale: 'ko_KR',
            images: [
                {
                    url: post.coverImage || '/images/og-default.jpg',
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
        },
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const allPosts = getAllPosts();
    const relatedPosts = allPosts
        .filter((p) => p.slug !== post.slug)
        .slice(0, 4);

    const extractedFaqs = extractFaqsFromMarkdown(post.content);

    // LLM 및 검색 엔진 최적화를 위한 복합 JSON-LD (@graph: MedicalWebPage + BlogPosting + BreadcrumbList + FAQPage)
    const graphItems: Record<string, unknown>[] = [
        {
            '@type': ['MedicalWebPage', 'BlogPosting'],
            '@id': `${SITE_URL}/blog/${post.slug}#article`,
            mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': `${SITE_URL}/blog/${post.slug}`,
            },
            headline: post.title,
            name: post.title,
            description: post.description,
            datePublished: post.date,
            dateModified: post.date,
            inLanguage: 'ko-KR',
            keywords: (post.tags || []).join(', '),
             medicalAudience: {
                '@type': 'MedicalAudience',
                audienceType: 'Patient',
            },
            author: {
                '@type': 'MedicalClinic',
                '@id': `${SITE_URL}/#clinic`,
                name: '더바른성모내과의원 (소화기내과 전문의 2인 진료)',
                url: SITE_URL,
                telephone: '+82-32-568-8275',
                address: {
                    '@type': 'PostalAddress',
                    streetAddress: '인천광역시 서구 이음3로 149 위너스 프라자 5층',
                    addressLocality: '서구',
                    addressRegion: '인천광역시',
                    postalCode: '22724',
                    addressCountry: 'KR',
                },
            },
            reviewedBy: {
                '@type': 'Organization',
                name: '더바른성모내과의원 소화기내과 전문의 의료진',
                url: SITE_URL,
            },
            publisher: {
                '@type': 'MedicalClinic',
                '@id': `${SITE_URL}/#clinic`,
                name: '더바른성모내과의원',
                url: SITE_URL,
            },
        },
        {
            '@type': 'BreadcrumbList',
            '@id': `${SITE_URL}/blog/${post.slug}#breadcrumb`,
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    name: '홈',
                    item: SITE_URL,
                },
                {
                    '@type': 'ListItem',
                    position: 2,
                    name: '건강정보 칼럼',
                    item: `${SITE_URL}/blog`,
                },
                {
                    '@type': 'ListItem',
                    position: 3,
                    name: post.title,
                    item: `${SITE_URL}/blog/${post.slug}`,
                },
            ],
        },
    ];

    if (extractedFaqs.length > 0) {
        graphItems.push({
            '@type': 'FAQPage',
            '@id': `${SITE_URL}/blog/${post.slug}#faq`,
            mainEntity: extractedFaqs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: faq.answer,
                },
            })),
        });
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': graphItems,
    };

    return (
        <div className="min-h-screen gradient-bg">
            {/* 구조화 데이터 삽입 (MedicalWebPage + BlogPosting + FAQPage + BreadcrumbList) */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Back Navigation */}
            <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <Link href="/blog" className="inline-flex items-center text-sm text-stone-600 hover:text-amber-700 transition-colors">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        블로그 목록으로
                    </Link>
                    <span className="text-xs text-stone-400">
                        인천 서구 검단신도시 아라동 · 더바른성모내과의원 의학칼럼
                    </span>
                </div>
            </nav>

            <article
                itemScope
                itemType="https://schema.org/MedicalWebPage"
                className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
            >
                {/* Article Header */}
                <header className="mb-10">
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span className="px-4 py-2 bg-stone-700 text-white rounded-full text-sm font-bold shadow-md">
                            {post.tags?.[0] || '건강정보'}
                        </span>
                        <time
                            dateTime={post.date}
                            itemProp="datePublished"
                            className="text-gray-500 text-sm flex items-center"
                        >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {post.date}
                        </time>
                        <span className="text-xs text-stone-500 bg-stone-100 px-3 py-1 rounded-full">
                            의학 자문 및 집필: 더바른성모내과의원 소화기내과 전문의
                        </span>
                    </div>

                    <h1
                        itemProp="headline"
                        className="text-3xl sm:text-5xl font-black text-gray-900 leading-tight mb-6"
                    >
                        {post.title}
                    </h1>

                    {post.description && (
                        <section
                            aria-label="핵심 요약"
                            itemProp="abstract"
                            className="bg-amber-50/70 border-l-4 border-amber-600 rounded-r-2xl p-5 sm:p-6 text-stone-800"
                        >
                            <p className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">
                                📌 전문의 핵심 요약 (Executive Summary)
                            </p>
                            <p className="text-lg leading-relaxed font-medium">
                                {post.description}
                            </p>
                        </section>
                    )}
                </header>

                {/* Article Content */}
                <div
                    itemProp="mainContentOfPage"
                    className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 mb-12"
                >
                    <div className="prose prose-lg prose-amber max-w-none
                        prose-headings:font-bold prose-headings:text-stone-900
                        prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-stone-200
                        prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                        prose-p:text-stone-700 prose-p:leading-relaxed prose-p:mb-6
                        prose-a:text-amber-700 prose-a:no-underline hover:prose-a:underline
                        prose-strong:text-stone-900 prose-strong:font-bold
                        prose-ul:my-6 prose-li:my-2
                        prose-code:bg-stone-50 prose-code:text-amber-800 prose-code:px-2 prose-code:py-1 prose-code:rounded
                    ">
                        <ReactMarkdown>{post.content}</ReactMarkdown>
                    </div>
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                    <section aria-label="관련 키워드" className="mb-12">
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {/* Author & Clinic Entity Box (LLM Entity Grounding) */}
                <section
                    aria-label="진료 기관 및 작성자 정보"
                    className="bg-stone-50 rounded-3xl p-8 sm:p-10 mb-12 border border-stone-200"
                >
                    <div className="flex items-start gap-4 mb-6">
                        <div className="w-16 h-16 rounded-full bg-stone-200 flex items-center justify-center text-3xl font-bold shadow-sm">
                            🏥
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-1">더바른성모내과의원 (인천 서구 검단신도시 아라동)</h2>
                            <p className="text-gray-600 text-sm">소화기내과 전문의 2인 진료 · 여성 전문의 상주</p>
                        </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-6 text-sm sm:text-base">
                        더바른성모내과의원은 인천광역시 서구 검단신도시(아라동)에서 위·대장내시경(올림푸스 CV-290), 정밀 초음파(삼성 메디슨 V7), 유방검진(Pinkview-BT/UPS), 국가건강검진·5대암검진 및 고혈압·당뇨·고지혈증 등 만성질환을 체계적으로 진료합니다.
                    </p>
                    <dl className="grid sm:grid-cols-2 gap-4 text-sm mb-6 bg-white p-5 rounded-2xl border border-stone-100">
                        <div>
                            <dt className="font-bold text-stone-900 mb-1">📍 오시는 길 (주소)</dt>
                            <dd className="text-gray-700">인천광역시 서구 이음3로 149 위너스 프라자 5층</dd>
                        </div>
                        <div>
                            <dt className="font-bold text-stone-900 mb-1">📞 대표 전화</dt>
                            <dd className="text-gray-700">032-568-8275</dd>
                        </div>
                        <div>
                            <dt className="font-bold text-stone-900 mb-1">⏰ 진료 시간</dt>
                            <dd className="text-gray-700">평일 08:00~18:00 (점심 13:00~14:00) / 토요일 08:00~14:00</dd>
                        </div>
                        <div>
                            <dt className="font-bold text-stone-900 mb-1">🩺 주요 진료과목</dt>
                            <dd className="text-gray-700">위·대장내시경, 국가건강검진, 초음파, 만성질환, 여의사 진료</dd>
                        </div>
                    </dl>

                    <EditDeleteButtons
                        slug={post.slug}
                        initialTitle={post.title}
                        initialDescription={post.description}
                        initialTags={post.tags}
                        initialContent={post.content}
                    />
                </section>

                {/* Related Posts for Internal Linking */}
                {relatedPosts.length > 0 && (
                    <section aria-label="함께 읽으면 좋은 건강 칼럼" className="bg-white rounded-3xl p-8 sm:p-10 shadow-md border border-stone-100">
                        <h2 className="text-2xl font-bold text-stone-900 mb-6">
                            함께 읽으면 도움이 되는 건강 칼럼
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {relatedPosts.map((rel) => (
                                <Link
                                    key={rel.slug}
                                    href={`/blog/${rel.slug}`}
                                    className="block p-5 rounded-2xl border border-stone-100 hover:border-amber-500 hover:bg-amber-50/30 transition-all"
                                >
                                    <span className="text-xs font-semibold text-amber-700 block mb-1">
                                        {rel.date}
                                    </span>
                                    <h3 className="font-bold text-stone-900 line-clamp-2 mb-2">
                                        {rel.title}
                                    </h3>
                                    <p className="text-xs text-stone-600 line-clamp-2">
                                        {rel.description}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </article>
        </div>
    );
}
