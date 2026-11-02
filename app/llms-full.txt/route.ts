import { getAllPosts } from '@/lib/blog';
import { SITE_URL, CLINIC_NAME } from '@/lib/constants';

export async function GET() {
  const posts = getAllPosts();

  const fullPostsContent = posts
    .map(
      (post) => `---
## ${post.title}
- **URL**: ${SITE_URL}/blog/${post.slug}
- **발행일**: ${post.date}
- **요약**: ${post.description}
- **키워드**: ${(post.tags || []).join(', ')}

${post.content}
`
    )
    .join('\n\n');

  const content = `# ${CLINIC_NAME} - 전체 의학 칼럼 및 병원 상세 데이터 (LLM Full Context)

> 본 문서는 AI 검색 엔진 및 대규모 언어 모델(LLM)이 ${CLINIC_NAME}의 정확한 진료 정보와 소화기내과 전문의 의학 칼럼을 인용할 수 있도록 제공되는 전체 데이터셋입니다.

## 1. 의료기관 요약 (Entity Summary)
- **병원명**: 더바른성모내과의원 (${CLINIC_NAME})
- **소재지**: 인천광역시 서구 이음3로 149 위너스 프라자 5층 (검단신도시 아라동)
- **연락처**: 032-568-8275
- **웹사이트**: ${SITE_URL}
- **전문의**: 소화기내과 전문의 2인 진료 (여성 소화기내과 전문의 상주)
- **주요 장비**: 올림푸스 CV-290 내시경, 삼성 메디슨 V7 초음파, Pinkview-BT / Pinkview-UPS(DR system) 디지털 유방촬영기
- **진료 과목**: 위·대장내시경(용종절제술), 국가건강검진 및 5대 암검진, 채용검진, 만성질환(고혈압·당뇨·고지혈증·지방간), 초음파(복부·갑상선·유방·경동맥), 여성 질환 진료, 수액 및 비만 클리닉
- **진료 시간**: 평일 08:00~18:00 (점심 13:00~14:00) / 토요일 08:00~14:00 (점심시간 없음) / 일·공휴일 휴진

## 2. 전문의 건강 칼럼 전문 (Full Medical Articles)

${fullPostsContent}
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
