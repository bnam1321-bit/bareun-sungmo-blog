'use client';

import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-24 md:pb-12 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Brand & Info */}
                    <div className="col-span-1 lg:col-span-2">
                        <Link href="/" className="inline-block mb-6">
                            <span className="text-2xl font-black text-gray-900">더바른성모내과</span>
                        </Link>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            검단신도시 아라동 주민 여러분의 건강 주치의.<br />
                            정확한 진단과 따뜻한 진료로 함께하겠습니다.
                        </p>
                        <div className="space-y-3 text-sm text-gray-600">
                            <div className="flex items-start">
                                <span className="font-bold w-16 shrink-0">주소</span>
                                <span>인천광역시 서구 이음3로 149 위너스 프라자 5층</span>
                            </div>
                            <div className="flex items-start">
                                <span className="font-bold w-16 shrink-0">전화</span>
                                <a href="tel:0507-1398-8277" className="hover:text-blue-600 transition-colors">0507-1398-8277</a>
                            </div>
                        </div>
                    </div>

                    {/* Clinic Hours - ID for Scrolling */}
                    <div id="clinic-hours" className="col-span-1 lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                            <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 text-blue-600">🕒</span>
                            진료시간 안내
                        </h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex justify-between items-start border-b border-gray-50 pb-2">
                                <span className="font-bold text-gray-800 w-20">평일</span>
                                <div className="text-right text-gray-600">
                                    <span className="block font-medium text-gray-900">08:00 - 18:00</span>
                                    <span className="text-xs text-gray-500">점심시간 13:00 - 14:00</span>
                                </div>
                            </li>
                            <li className="flex justify-between items-start border-b border-gray-50 pb-2">
                                <span className="font-bold text-blue-600 w-20">토요일</span>
                                <div className="text-right text-gray-600">
                                    <span className="block font-medium text-gray-900">08:00 - 14:00</span>
                                    <span className="text-xs text-gray-500">점심시간 없음</span>
                                </div>
                            </li>
                            <li className="flex justify-between items-center pt-1">
                                <span className="font-bold text-red-500 w-20">일/공휴일</span>
                                <div className="text-right">
                                    <span className="inline-block px-2 py-1 bg-red-50 text-red-600 rounded text-xs font-bold">휴진</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-200 pt-8 text-center text-xs text-gray-400">
                    <p>&copy; {new Date().getFullYear()} 더바른성모내과. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
