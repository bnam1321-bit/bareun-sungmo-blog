'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
    return (
        <header className="site-header">
            <div className="header-container">
                {/* Logo */}
                <Link href="/" className="logo">
                    <Image
                        src="/logo.svg"
                        alt="더바른성모내과"
                        width={200}
                        height={50}
                        priority
                        className="logo-image"
                    />
                </Link>

                {/* Navigation */}
                <nav className="main-nav">
                    <Link href="/blog" className="nav-link">건강정보</Link>
                    <a href="https://map.naver.com/p/search/더바른성모내과의원" target="_blank" rel="noopener noreferrer" className="nav-link">오시는 길</a>
                </nav>
            </div>
        </header>
    );
}
