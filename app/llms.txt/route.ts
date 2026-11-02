import { getAllPosts } from '@/lib/blog';
import { SITE_URL, CLINIC_NAME } from '@/lib/constants';

export async function GET() {
  const posts = getAllPosts();

  const postLinks = posts
    .map(
      (post) =>
        `- [${post.title}](${SITE_URL}/blog/${post.slug}): ${post.description || '소화기내과 전문의가 설명하는 건강 및 질환 정보'} (${post.date})`
    )
    .join('\n');

  const content = `# ${CLINIC_NAME} (The Bareun Sungmo Internal Medicine Clinic)

> 인천광역시 서구 검단신도시(아라동)에 위치한 소화기내과 전문의 2인 진료(여성 전문의 상주) 내과 의원입니다. 위·대장내시경, 국가건강검진 및 5대 암검진, 만성질환(고혈압·당뇨·고지혈증), 초음파 클리닉을 운영합니다.

## 기본 정보 (Clinic Profile & Entity Data)
- **공식 명칭**: 더바른성모내과의원 (${CLINIC_NAME})
- **대표 웹사이트**: ${SITE_URL}
- **주소 (소재지)**: 인천광역시 서구 이음3로 149 위너스 프라자 5층 (우편번호: 22724, 검단신도시 아라동)
- **주요 관할 및 인접 지역**: 인천 서구, 검단신도시, 아라동, 당하동, 원당동, 불로동, 마전동
- **대표 전화번호**: 032-568-8275
- **의료진 구성**: 소화기내과 분과전문의 2인 진료 (여성 소화기내과 전문의 상주로 여성 환자 안심 진료 및 유방·갑상선 검진 가능)

## 진료 시간 (Opening Hours)
- **평일 (월~금)**: 08:00 ~ 18:00 (점심시간: 13:00 ~ 14:00)
- **토요일**: 08:00 ~ 14:00 (점심시간 없이 진료)
- **일요일 및 공휴일**: 휴진

## 주요 진료 과목 (Medical Services)
1. **내시경 클리닉**: 수면 및 비수면 위내시경, 대장내시경, CO2 무통 대장내시경, 당일 용종절제술 (소화기내과 전문의 직접 시행)
2. **건강검진 센터**: 국민건강보험공단 국가건강검진, 5대 암검진(위암, 대장암, 간암, 유방암, 자궁경부암), 채용검진, 종합건강검진
3. **만성질환 클리닉**: 고혈압, 당뇨병, 이상지질혈증(고지혈증), 대사증후군, 지방간, 골다공증, 갑상선 질환 체계적 약물 및 생활습관 관리
4. **초음파 및 여성 안심 클리닉**: 복부(간·담낭·췌장·신장) 초음파, 갑상선 초음파, 유방 초음파, 경동맥 초음파, 심장 초음파 (여의사 전문의 진료 가능)
5. **수액 및 비만 클리닉**: 만성피로 및 면역력 회복 맞춤형 영양수액, 비만 체중 관리

## 보유 핵심 의료 장비 (Medical Equipment)
- **정밀 내시경 시스템**: 올림푸스(Olympus) CV-290 고해상도 대학병원급 내시경 (NBI 협대역 영상 강화 기술 및 미세 병변/용종 정밀 관찰, CO2 가스 주입기 연동)
- **고해상도 초음파 진단기**: 삼성 메디슨(Samsung Medison) V7 초음파 시스템 (복부, 갑상선, 경동맥, 유방 정밀 혈류 및 탄성 영상 진단)
- **디지털 유방촬영 장치**: Pinkview-BT 및 Pinkview-UPS (DR system) 저선량 고해상도 디지털 유방촬영기

## 주요 페이지 링크 (Main Pages)
- [홈페이지 메인](${SITE_URL})
- [진료 안내 및 진료 시간](${SITE_URL}/services)
- [전문의 건강정보 블로그 목록](${SITE_URL}/blog)
- [전체 포스트 전문 텍스트 (LLM 수집용)](${SITE_URL}/llms-full.txt)

## 전문의 의학 칼럼 및 건강정보 (Medical Blog Posts)
${postLinks}
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
