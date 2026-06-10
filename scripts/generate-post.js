const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { format } = require('date-fns');
const { SYSTEM_PROMPT, KEYWORDS, CLINIC_INFO } = require('./prompts');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Google Gemini 설정
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function generatePost() {
    console.log('🤖 AI(Gemini) 의사선생님이 글을 쓸 준비를 하고 있습니다...');

    if (!process.env.GOOGLE_API_KEY) {
        console.error('❌ GOOGLE_API_KEY가 없습니다. .env 파일을 확인해주세요.');
        process.exit(1);
    }

    // 1. 기존 글 확인 및 주제 선정
    const postsDir = path.join(__dirname, '../content/posts');
    const existingTitles = [];

    if (fs.existsSync(postsDir)) {
        const files = fs.readdirSync(postsDir);
        files.forEach(file => {
            if (file.endsWith('.md')) {
                const content = fs.readFileSync(path.join(postsDir, file), 'utf-8');
                const match = content.match(/title: "(.*)"/);
                if (match) {
                    existingTitles.push(match[1]);
                }
            }
        });
    }

    console.log(`📚 기존 작성된 글: ${existingTitles.length}개`);

    let topic = "";

    // 명령줄 인수로 주제가 전달되면 해당 주제 사용
    if (process.argv[2]) {
        topic = process.argv[2];
        console.log(`🎯 지정된 주제: [${topic}]`);
    } else {
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
            const topicPrompt = `
            당신은 내과 병원 블로그 마케터입니다.
            기존에 작성된 블로그 글 제목들은 다음과 같습니다:
            ${JSON.stringify(existingTitles)}
    
            위 주제들과 겹치지 않는, 내과 환자들에게 유용한 새로운 건강 정보 주제 1가지만 추천해주세요.
            - 반드시 **건강검진**(국가건검, 5대암검진, 채용검진 등), **소화기질환**(위염, 식도염, 대장염, 용종, 내시경 등), **만성질환**(고혈압, 당뇨병, 고지혈증, 지방간, 대사증후군 등) 중 한 가지 범주에 해당하는 주제여야 합니다.
            출력 형식: 주제만 텍스트로 출력 (예: "겨울철 노로바이러스 장염의 증상과 예방")
            명확하고 구체적인 주제를 선정하세요.
            `;

            const result = await model.generateContent(topicPrompt);
            topic = result.response.text().trim().replace(/"/g, '');
            console.log(`💡 AI 추천 주제: [${topic}]`);
        } catch (e) {
            console.error("❌ 주제 생성 실패, 기본 리스트 사용", e);
            const healthTopics = [
                '위대장내시경 검사가 필요한 소화불량 증상',
                '당뇨병 초기 증상과 예방을 위한 식이요법',
                '대장용종의 위험성과 대장내시경 검사 주기',
                '고혈압 환자의 계절별 혈압 관리법',
                '지방간 예방을 위한 올바른 생활 습관',
                '고지혈증과 이상지질혈증의 관리 가이드',
                '국가 건강검진 항목과 위암 예방',
                '역류성 식도염의 증상과 생활 속 치료법',
                '대사증후군 자가진단과 예방을 위한 운동법',
                '위내시경 검사 전 주의사항과 준비 절차'
            ];
            topic = healthTopics[Math.floor(Math.random() * healthTopics.length)];
            console.log(`📝 랜덤 선택 주제: [${topic}]`);
        }
    }

    // KST 기준으로 날짜 설정 (UTC+9)
    const kstDate = new Date(new Date().getTime() + 9 * 60 * 60 * 1000);
    const today = format(kstDate, 'yyyy-MM-dd');

    // 주제에 따른 맞춤형 장비 안내 동적 바인딩 (번갈아가며 노출 및 중복 배제)
    let equipmentInstruction = "";
    const lowerTopic = topic.toLowerCase();
    
    if (lowerTopic.includes('내시경') || lowerTopic.includes('위염') || lowerTopic.includes('식도염') || lowerTopic.includes('장염') || lowerTopic.includes('용종') || lowerTopic.includes('대장') || lowerTopic.includes('위암')) {
        equipmentInstruction = `## 🏥 의료 장비 강조 지시사항 (선택 노출)
- 본 주제는 소화기계 질환/내시경검사와 밀접하므로, 본문 내시경 관련 내용 서술 시 더바른성모내과의 주요 강점 장비인 **올림푸스 CV-290 내시경**을 언급하며 고해상도 화질과 정밀함 등의 강점을 1회 자연스럽게 포함하십시오. 타 장비(초음파, 유방촬영기)는 이번 본문에 절대 언급하지 마십시오.`;
    } else if (lowerTopic.includes('초음파') || lowerTopic.includes('지방간') || lowerTopic.includes('간경변') || lowerTopic.includes('갑상선') || lowerTopic.includes('경동맥') || lowerTopic.includes('심장')) {
        equipmentInstruction = `## 🏥 의료 장비 강조 지시사항 (선택 노출)
- 본 주제는 초음파 검사와 밀접하므로, 본문 초음파 검사 관련 내용 서술 시 더바른성모내과의 주요 강점 장비인 **삼성 메디슨 V7 초음파**의 정밀 진단 기능과 선명함 등의 강점을 1회 자연스럽게 포함하십시오. 타 장비(내시경, 유방촬영기)는 이번 본문에 절대 언급하지 마십시오.`;
    } else if (lowerTopic.includes('유방') || lowerTopic.includes('유방암') || lowerTopic.includes('촬영') || lowerTopic.includes('여성검진') || lowerTopic.includes('유방촬영')) {
        equipmentInstruction = `## 🏥 의료 장비 강조 지시사항 (선택 노출)
- 본 주제는 유방 진단과 밀접하므로, 본문 유방 진단 관련 내용 서술 시 더바른성모내과의 프리미엄 유방촬영 장비인 **Pinkview-BT** 및 **Pinkview-UPS(DR system)**의 정밀함과 환자 촬영 편의성 등의 강점을 1회 자연스럽게 포함하십시오. 타 장비(내시경, 초음파)는 이번 본문에 절대 언급하지 마십시오.`;
    } else {
        // 일반 건강검진 및 만성질환 주제의 경우 3가지 장비 중 하나를 번갈아가며(날짜 기준) 자연스럽게 노출
        const equipments = [
            `## 🏥 의료 장비 강조 지시사항 (선택 노출)
- 정밀 검사의 중요성을 강조할 때, 필요한 경우 더바른성모내과의 주요 장비 중 하나인 **올림푸스 CV-290 내시경**을 연계하여 1회 자연스럽게 언급하십시오. 타 장비는 생략하여 홍보가 과다하거나 반복 노출되지 않도록 하십시오.`,
            `## 🏥 의료 장비 강조 지시사항 (선택 노출)
- 정밀 진단의 중요성을 강조할 때, 필요한 경우 더바른성모내과의 주요 장비 중 하나인 **삼성 메디슨 V7 초음파**를 연계하여 1회 자연스럽게 언급하십시오. 타 장비는 생략하여 홍보가 과다하거나 반복 노출되지 않도록 하십시오.`,
            `## 🏥 의료 장비 강조 지시사항 (선택 노출)
- 여성 건강검진의 중요성을 강조할 때, 필요한 경우 더바른성모내과의 주요 장비 중 하나인 **Pinkview-BT** 및 **Pinkview-UPS(DR system) 유방촬영장치**를 연계하여 1회 자연스럽게 언급하십시오. 타 장비는 생략하여 홍보가 과다하거나 반복 노출되지 않도록 하십시오.`
        ];
        const selectedIndex = new Date().getDate() % 3;
        equipmentInstruction = equipments[selectedIndex];
    }

    // 2. 글 작성 (Updated Gemini API)
    let content = "";

    // 재시도 로직 추가
    const MAX_RETRIES = 3;
    let lastError = null;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            console.log(`🚀 Gemini 2.5 Pro 모델로 글 작성 시도 (${attempt}/${MAX_RETRIES})...`);
            const model = genAI.getGenerativeModel({
                model: "gemini-2.5-pro",
                generationConfig: {
                    temperature: 0.7,
                    topP: 0.8,
                    topK: 40,
                    maxOutputTokens: 8192,
                }
            });

            const fullPrompt = `${SYSTEM_PROMPT}
 
## 입력된 주제
- **주제**: "${topic}"
- **타겟**: 해당 증상으로 고민하는 환자, 가족, 건강에 관심있는 일반인
- **핵심 키워드**: ${KEYWORDS.join(', ')}

${equipmentInstruction}

## 👩‍⚕️ 여성 질환/안심 검진 관련 특별 지시사항 (SEO)
- 만약 위 주제(topic)가 **여성 질환**(방광염, 갑상선, 폐경, 골다공증 등)이나 **여성 건강검진**(유방초음파, 갑상선초음파 등)과 관련되어 있다면, 본문에 반드시 **"여성 소화기내과 전문의(여의사)가 상주하여 여성 환자분들이 더 편안하고 세심하게 진료/검사받을 수 있다"**는 내용을 자연스럽게 포함하세요.
- 여성 질환 관련 주제일 경우, 하단 tags 배열에 "검단신도시여의사", "아라동여의사내과" 태그를 추가해 주세요.

## 출력 요구사항

**반드시 다음 Frontmatter로 시작:**
---
title: "(매력적이고 검색 최적화된 제목)"
date: "${today}"
description: "(160자 이내 SEO 최적화 설명)"
tags: ["검단신도시내과", "아라동내과", "검단신도시 아라동 내과", "주제관련태그1", "주제관련태그2"]
author: "더바른성모내과"
coverImage: ""
---

**그 다음 본문을 다음 구조로 작성:**

## (H2: 감성적이고 공감되는 제목)

(도입부: 환자의 일상적인 상황으로 시작하여 공감대 형성, 200-300자)

## 증상

(환자가 경험할 수 있는 구체적인 증상들을 불렛 포인트로 나열)

## 원인

(의학적으로 정확한 원인 설명, 위험 요인 명시)

## 치료 및 관리

(치료 방법, 골든 타임, 생활 습관 개선 방법)

## 예방 및 주의사항

(예방 방법, 주의사항, 합병증 예방)

## 자주 묻는 질문 (Q&A)

**Q1: (환자들이 실제로 궁금해하는 질문)**
A: (구체적이고 도움되는 답변)

**Q2: (치료나 검사 관련 질문)**
A: (전문적이지만 이해하기 쉬운 답변)

**Q3: (예방이나 관리 관련 질문)**
A: (실천 가능한 조언)

## 마무리

(요점 요약, 자연스러운 진료 권유)

${CLINIC_INFO}

---

> 💡 **중요 안내**  
> 본 정보는 일반적인 건강 가이드이며, 개인의 상태에 따라 다를 수 있습니다.  
> 정확한 진단과 치료를 위해서는 반드시 전문의와 상담하시기 바랍니다.

## 주의사항
- 의료광고법을 철저히 준수할 것
- 치료 효과 보장 표현 금지
- '최고', '최상' 등 최상급 표현 금지
- 단정적 표현 대신 "~ 도움이 됩니다", "~ 권장됩니다" 사용
- 부작용과 주의사항을 반드시 포함
- 본문은 반드시 3,000자 이상 작성할 것 (핵심 정보를 충분히 포함)
`;

            const result = await model.generateContent(fullPrompt);
            const response = await result.response;
            content = response.text();
            console.log("✨ Gemini 2.5 Pro 작성 성공!");
            console.log(`📄 생성된 글 길이: ${content.length}자`);
            break; // 성공하면 루프 종료

        } catch (apiError) {
            lastError = apiError;
            console.error(`❌ Gemini API 오류 (시도 ${attempt}/${MAX_RETRIES}):`, apiError.message);

            if (attempt < MAX_RETRIES) {
                console.log(`⏳ ${attempt * 2}초 후 재시도...`);
                await new Promise(resolve => setTimeout(resolve, attempt * 2000));
            }
        }
    }

    // 모든 재시도 실패 시 Fallback
    if (!content) {
        console.error('📋 모든 재시도 실패. Fallback 콘텐츠 생성...');
        console.error('📋 마지막 에러:', JSON.stringify(lastError, null, 2));

        // 주제별 맞춤 컨텐츠 생성 (Fallback)
        const topicContent = generateTopicContent(topic);
        content = `---
title: "${topic}"
date: "${today}"
description: "${topicContent.description}"
tags: ${JSON.stringify(topicContent.tags)}
author: "더바른성모내과"
coverImage: ""
---

${topicContent.content}

---

> 💡 **중요 안내**  
> 본 정보는 일반적인 건강 가이드이며, 개인의 상태에 따라 다를 수 있습니다.  
> 정확한 진단과 치료를 위해서는 반드시 전문의와 상담하시기 바랍니다.
`;
    }

    // 3. 이미지 설정 (SEO 및 OG 태그용)
    const stockImages = ['consultation.jpg', 'equipment.jpg', 'wellness.jpg', 'lab.jpg'];
    const randomStock = stockImages[Math.floor(Math.random() * stockImages.length)];
    const imagePath = `/images/stock/${randomStock}`;

    console.log(`🖼️ SEO/OG용 커버 이미지 메타데이터 설정: ${imagePath}`);

    if (content.includes('coverImage:')) {
        content = content.replace(/coverImage: ""/, `coverImage: "${imagePath}"`);
    }

    // 4. 파일 저장

    // SEO 최적화된 Slug 생성을 위한 추가 요청
    let slug = "";
    try {
        const slugModel = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
        const slugPrompt = `
        블로그 글 제목: "${topic}"
        
        위 제목을 바탕으로 검색 엔진 최적화(SEO)에 유리한 영문 URL Slug를 만들어주세요.
        - 규칙: 소문자, 하이픈(-) 연결, 특수문자 제거
        - 예시: "겨울철 독감 예방" -> "preventing-winter-flu-symptoms"
        - 출력: 슬러그만 출력 (다른 텍스트 없이)
        `;
        const slugResult = await slugModel.generateContent(slugPrompt);
        slug = slugResult.response.text().trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
        console.log(`🔗 생성된 Slug: ${slug}`);
    } catch (e) {
        console.error("Slug 생성 실패, 타임스탬프로 대체", e);
        slug = Math.random().toString(36).substring(7);
    }

    const filename = `${today}-${slug}.md`;
    const postsDirLink = path.join(__dirname, '../content/posts');

    if (!fs.existsSync(postsDirLink)) {
        fs.mkdirSync(postsDirLink, { recursive: true });
    }

    fs.writeFileSync(path.join(postsDirLink, filename), content || "");
    console.log(`✅ 글 작성 완료: content/posts/${filename}`);
}

function generateTopicContent(topic) {
    const defaultContent = {
        description: `전문의가 알려주는 ${topic.split(' ')[0]} 건강 가이드입니다.`,
        tags: ['건강정보', '내과', '진료안내'],
        content: `## ${topic}\n\n**더바른성모내과**입니다.\n\n(본문 생성 실패로 인한 기본 템플릿입니다.)`
    };
    return defaultContent;
}

generatePost();
