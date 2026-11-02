import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '진료 안내 및 보유 장비 | 더바른성모내과의원 (검단신도시 아라동)',
    description: '인천 서구 검단신도시 아라동 더바른성모내과의원 진료과목(위·대장내시경, 국가건강검진, 5대암검진, 만성질환, 초음파, 여의사 진료) 및 보유 정밀 장비(올림푸스 CV-290, 삼성 메디슨 V7, Pinkview 유방촬영기), 진료시간 안내.',
};

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-stone-50 py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl font-black text-stone-900 mb-6 drop-shadow-sm">
                        더바른성모내과의원 진료 안내
                    </h1>
                    <p className="text-lg sm:text-xl text-stone-600 font-medium max-w-3xl mx-auto leading-relaxed">
                        인천광역시 서구 검단신도시(아라동) 더바른성모내과의원은 소화기내과 전문의 2인(여성 전문의 상주)이 대학병원급 정밀 장비로 정확하고 세심하게 진료합니다.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {/* 위내시경 / 대장내시경 */}
                    <section className="bg-white rounded-3xl p-8 shadow-md hover-lift border border-stone-100">
                        <div className="w-16 h-16 rounded-2xl bg-stone-100 border border-stone-200 flex items-center justify-center text-3xl mb-6 shadow-sm">
                            🔬
                        </div>
                        <h2 className="text-2xl font-bold text-stone-900 mb-3 tracking-tight">위·대장내시경 및 당일 용종절제술</h2>
                        <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                            소화기내과 분과전문의가 직접 <strong>올림푸스(Olympus) CV-290 고해상도 내시경</strong>으로 위염, 역류성식도염, 위궤양, 대장용종 및 조기 암 병변을 정밀 진단하며, 발견된 대장 용종은 당일 절제술(One-stop)까지 시행합니다. CO2 무통 가스 주입 시스템을 통해 검사 후 복부 팽만감과 통증을 최소화합니다.
                        </p>
                    </section>

                    {/* 건강검진 */}
                    <section className="bg-white rounded-3xl p-8 shadow-md hover-lift border border-stone-100">
                        <div className="w-16 h-16 rounded-2xl bg-stone-100 border border-stone-200 flex items-center justify-center text-3xl mb-6 shadow-sm">
                            🏥
                        </div>
                        <h2 className="text-2xl font-bold text-stone-900 mb-3 tracking-tight">국가건강검진 · 5대 암검진 · 채용검진</h2>
                        <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                            국민건강보험공단 지정 검진기관으로서 일반 건강검진, 생애전환기 검진, 5대 암검진(위암·대장암·간암·유방암·자궁경부암) 및 공무원·일반 채용 신체검사를 체계적으로 진행합니다. 여성 소화기내과 전문의가 상주하여 여성 암검진도 안심하고 받으실 수 있습니다.
                        </p>
                    </section>

                    {/* 만성질환 관리 */}
                    <section className="bg-white rounded-3xl p-8 shadow-md hover-lift border border-stone-100">
                        <div className="w-16 h-16 rounded-2xl bg-stone-100 border border-stone-200 flex items-center justify-center text-3xl mb-6 shadow-sm">
                            💊
                        </div>
                        <h2 className="text-2xl font-bold text-stone-900 mb-3 tracking-tight">만성질환 클리닉 (고혈압·당뇨·고지혈증)</h2>
                        <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                            고혈압, 당뇨병, 이상지질혈증(고지혈증), 지방간, 대사증후군, 갑상선 기능 이상, 골다공증 등 지속적인 관리가 필수적인 만성질환에 대해 정기 혈액·소변 검사와 합병증 추적 관찰, 개인별 맞춤 약물 처방 및 식습관 가이드를 제공합니다.
                        </p>
                    </section>

                    {/* 초음파 진료 */}
                    <section className="bg-white rounded-3xl p-8 shadow-md hover-lift border border-stone-100">
                        <div className="w-16 h-16 rounded-2xl bg-stone-100 border border-stone-200 flex items-center justify-center text-3xl mb-6 shadow-sm">
                            📡
                        </div>
                        <h2 className="text-2xl font-bold text-stone-900 mb-3 tracking-tight">정밀 초음파 및 유방검진 클리닉</h2>
                        <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                            고해상도 초음파 진단기 <strong>삼성 메디슨 V7</strong>을 통해 상복부(간·담낭·담도·췌장·신장), 갑상선, 유방, 경동맥 초음파를 정밀 시행하며, 디지털 유방촬영 장치 <strong>Pinkview-BT / Pinkview-UPS(DR system)</strong>로 치밀유방 및 미세석회화까지 세밀하게 진단합니다.
                        </p>
                    </section>

                    {/* 수액 치료 */}
                    <section className="bg-white rounded-3xl p-8 shadow-md hover-lift border border-stone-100">
                        <div className="w-16 h-16 rounded-2xl bg-stone-100 border border-stone-200 flex items-center justify-center text-3xl mb-6 shadow-sm">
                            💉
                        </div>
                        <h2 className="text-2xl font-bold text-stone-900 mb-3 tracking-tight">수액 클리닉 및 성인 예방접종</h2>
                        <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                            만성 피로, 면역력 저하, 감기·장염 등 급성기 질환 회복을 돕는 개인 맞춤형 영양·비타민 수액 치료와 독감, 대상포진, 폐렴구균, A형·B형 간염 등 필수 성인 예방접종을 시행합니다.
                        </p>
                    </section>

                    {/* 비만 클리닉 */}
                    <section className="bg-white rounded-3xl p-8 shadow-md hover-lift border border-stone-100">
                        <div className="w-16 h-16 rounded-2xl bg-stone-100 border border-stone-200 flex items-center justify-center text-3xl mb-6 shadow-sm">
                            ⚖️
                        </div>
                        <h2 className="text-2xl font-bold text-stone-900 mb-3 tracking-tight">비만 및 대사 클리닉</h2>
                        <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                            단순 체중 감량을 넘어 내장지방, 지방간, 인슐린 저항성 등 내과적 대사 상태를 정밀하게 분석하여 안전하고 건강한 체중 감량 프로그램을 설계합니다.
                        </p>
                    </section>
                </div>

                {/* 진료 시간 및 오시는 길 */}
                <section className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-stone-100">
                    <h2 className="text-3xl font-bold text-stone-900 mb-8 text-center tracking-tight">진료 시간 및 위치 안내</h2>
                    <div className="max-w-2xl mx-auto space-y-4">
                        <div className="flex justify-between py-3 border-b border-stone-100">
                            <span className="font-semibold text-stone-700">평일 (월~금)</span>
                            <span className="text-stone-600">08:00 ~ 18:00</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-stone-100">
                            <span className="font-semibold text-stone-700">점심시간</span>
                            <span className="text-stone-600">13:00 ~ 14:00</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-stone-100">
                            <span className="font-semibold text-amber-700">토요일</span>
                            <span className="text-stone-600">08:00 ~ 14:00 (점심시간 없음)</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-stone-100">
                            <span className="font-semibold text-red-500">일요일 / 공휴일</span>
                            <span className="text-red-500 font-bold">휴진</span>
                        </div>
                        <div className="flex justify-between py-3">
                            <span className="font-semibold text-stone-700">주소 (소재지)</span>
                            <span className="text-stone-600 text-right">인천광역시 서구 이음3로 149 위너스 프라자 5층</span>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-stone-500 mb-6">
                            ※ 진료 시간은 사정에 따라 변경될 수 있습니다. 내원 전 문의 바랍니다.
                        </p>
                        <a
                            href="tel:032-568-8275"
                            className="inline-flex items-center px-8 py-4 bg-stone-800 text-white rounded-full font-bold hover:bg-stone-900 transition-all hover:scale-105 shadow-md"
                        >
                            📞 032-568-8275 전화 문의하기
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
}
