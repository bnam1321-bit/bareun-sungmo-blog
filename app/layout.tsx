import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import FloatingBar from "./components/FloatingBar";
import Footer from "./components/Footer";

// LLM 및 검색 엔진 지식 그래프용 복합 구조화 데이터 (Schema.org JSON-LD @graph)
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["MedicalClinic", "Physician", "LocalBusiness"],
      "@id": "https://thebareunmedb.co.kr/#clinic",
      "name": "더바른성모내과의원",
      "alternateName": ["더바른성모내과", "검단신도시 더바른성모내과", "아라동 더바른성모내과"],
      "description": "인천광역시 서구 검단신도시(아라동) 소재 소화기내과 전문의 2인 진료(여성 전문의 상주) 내과 의원. 올림푸스 CV-290 위·대장내시경, 삼성 메디슨 V7 초음파, Pinkview 디지털 유방촬영기를 통한 국가건강검진, 5대 암검진, 만성질환(고혈압·당뇨·고지혈증) 정밀 진료.",
      "image": "https://thebareunmedb.co.kr/logo.png",
      "url": "https://thebareunmedb.co.kr",
      "telephone": "+82-32-568-8275",
      "priceRange": "KRW",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "인천광역시 서구 이음3로 149 위너스 프라자 5층",
        "addressLocality": "서구",
        "addressRegion": "인천광역시",
        "postalCode": "22724",
        "addressCountry": "KR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 37.5945,
        "longitude": 126.7155
      },
      "areaServed": [
        { "@type": "Place", "name": "인천광역시 서구" },
        { "@type": "Place", "name": "검단신도시" },
        { "@type": "Place", "name": "아라동" },
        { "@type": "Place", "name": "원당동" },
        { "@type": "Place", "name": "당하동" }
      ],
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "08:00",
          "closes": "18:00",
          "description": "점심시간 13:00 ~ 14:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Saturday",
          "opens": "08:00",
          "closes": "14:00",
          "description": "점심시간 없이 진료"
        }
      ],
      "medicalSpecialty": [
        "Gastroenterologic",
        "InternalMedicine",
        "PrimaryCare"
      ],
      "availableService": [
        {
          "@type": "MedicalProcedure",
          "name": "위·대장내시경 및 당일 용종절제술",
          "description": "올림푸스 CV-290 고해상도 내시경 및 CO2 무통 대장내시경을 이용한 소화기내과 전문의 정밀 내시경"
        },
        {
          "@type": "MedicalProcedure",
          "name": "국가건강검진 및 5대 암검진·채용검진",
          "description": "국민건강보험공단 일반검진, 위암·대장암·간암·유방암·자궁경부암 검진 및 공무원·일반 채용신체검사"
        },
        {
          "@type": "MedicalProcedure",
          "name": "고해상도 초음파 및 여성 안심 클리닉",
          "description": "삼성 메디슨 V7 초음파 및 Pinkview-BT/UPS 디지털 유방촬영기를 이용한 복부·갑상선·유방·경동맥 정밀 검사 (여성 소화기내과 전문의 상주)"
        },
        {
          "@type": "MedicalTherapy",
          "name": "만성질환 클리닉",
          "description": "고혈압, 당뇨병, 고지혈증(이상지질혈증), 지방간, 대사증후군, 골다공증 맞춤형 약물 및 생활습관 관리"
        }
      ],
      "knowsAbout": [
        "위내시경",
        "대장내시경",
        "대장용종절제술",
        "국가건강검진",
        "5대암검진",
        "복부초음파",
        "갑상선초음파",
        "유방초음파",
        "유방촬영술",
        "고혈압",
        "당뇨병",
        "고지혈증",
        "역류성식도염",
        "만성위염",
        "과민성대장증후군"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://thebareunmedb.co.kr/#website",
      "url": "https://thebareunmedb.co.kr",
      "name": "더바른성모내과의원 공식 건강정보 블로그",
      "publisher": {
        "@id": "https://thebareunmedb.co.kr/#clinic"
      },
      "inLanguage": "ko-KR"
    }
  ]
};

// Noto Sans KR - 한글 최적화 웹폰트
const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: '--font-noto',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://thebareunmedb.co.kr'),
  title: {
    default: "더바른성모내과의원 | 인천 서구 검단신도시 아라동 소화기내과 전문의 진료",
    template: "%s | 더바른성모내과의원"
  },
  description: "인천 서구 검단신도시 아라동 더바른성모내과의원(이음3로 149 위너스프라자 5층). 소화기내과 전문의 2인(여의사 상주) 진료, 올림푸스 CV-290 위·대장내시경, 삼성 메디슨 V7 초음파, 국가건강검진·5대암검진, 고혈압·당뇨·고지혈증 만성질환 클리닉.",
  keywords: [
    "더바른성모내과",
    "더바른성모내과의원",
    "검단신도시내과",
    "아라동내과",
    "인천서구내과",
    "검단신도시 아라동 내과",
    "검단내시경",
    "아라동위내시경",
    "아라동대장내시경",
    "검단건강검진",
    "아라동여의사내과",
    "소화기내과전문의"
  ],
  alternates: {
    canonical: "https://thebareunmedb.co.kr",
    types: {
      "text/plain": [
        { url: "/llms.txt", title: "LLM Summary Context" },
        { url: "/llms-full.txt", title: "LLM Full Medical Articles Context" }
      ]
    }
  },
  verification: {
    google: "Kti6u_KVwzoXu8XguSwioLLWT-lO5VtCZTIJF88rZm4",
    other: {
      "naver-site-verification": ["326f5ca989317f002a62da6b3d667111a44e5ac2"]
    }
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Context Summary" />
        <link rel="alternate" type="text/plain" href="/llms-full.txt" title="LLM Full Context" />
      </head>
      <body className={`${notoSansKR.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main>
          {children}
        </main>
        <Footer />
        <FloatingBar />
      </body>
    </html>
  );
}
