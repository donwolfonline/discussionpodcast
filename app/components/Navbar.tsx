'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
    const [navScrolled, setNavScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const { lang, toggleLang, t } = useLanguage();

    useEffect(() => {
        const handleScroll = () => setNavScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path: string) => pathname === path;
    const isRtl = lang === 'ar';

    return (
        <>
            <nav className={`${styles.nav} ${navScrolled ? styles.navScrolled : ''}`}>
                <div className={styles.navInner}>
                    <Link href="/" className={styles.navLogo}>
                        <Image src="/logo.png" alt="Discussions" width={220} height={32} className={styles.navLogoImg} />
                    </Link>
                    <div className={styles.navLinks}>
                        <Link href="/" className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}>{t('nav.home')}</Link>
                        <Link href="/about" className={`${styles.navLink} ${isActive('/about') ? styles.active : ''}`}>{t('nav.about')}</Link>
                        <Link href="/episodes" className={`${styles.navLink} ${isActive('/episodes') ? styles.active : ''}`}>{t('nav.episodes')}</Link>
                        <Link href="/host" className={`${styles.navLink} ${isActive('/host') ? styles.active : ''}`}>{t('nav.host')}</Link>
                        <Link href="/connect" className={`${styles.navLink} ${isActive('/connect') ? styles.active : ''}`}>{t('nav.connect')}</Link>
                        <Link href="/contact" className={`${styles.navLink} ${isActive('/contact') ? styles.active : ''}`}>{t('nav.contact')}</Link>
                    </div>
                    <div className={styles.navActions}>
                        <a
                            href="https://www.youtube.com/@DiscussionsOfficialShow"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.navCta}
                        >
                            {t('nav.subscribe')}
                        </a>
                        <button
                            className={styles.langToggle}
                            onClick={toggleLang}
                            aria-label="Toggle language"
                        >
                            {isRtl ? 'EN' : 'عربي'}
                        </button>
                    </div>
                    <button
                        className={styles.mobileMenuBtn}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className={`${styles.hamburger} ${mobileMenuOpen ? styles.hamburgerOpen : ''}`}>
                            <span /><span /><span />
                        </span>
                    </button>
                </div>
                {mobileMenuOpen && (
                    <div className={styles.mobileMenu}>
                        <Link href="/" className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>{t('nav.home')}</Link>
                        <Link href="/about" className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>{t('nav.about')}</Link>
                        <Link href="/episodes" className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>{t('nav.episodes')}</Link>
                        <Link href="/host" className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>{t('nav.host')}</Link>
                        <Link href="/connect" className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>{t('nav.connect')}</Link>
                        <Link href="/contact" className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>{t('nav.contact')}</Link>
                        <button
                            className={styles.mobileLangToggle}
                            onClick={() => { toggleLang(); setMobileMenuOpen(false); }}
                        >
                            {isRtl ? 'Switch to English' : 'التبديل إلى العربية'}
                        </button>
                        <a
                            href="https://www.youtube.com/@DiscussionsOfficialShow"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.mobileCta}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {t('nav.subscribe_mobile')}
                        </a>
                    </div>
                )}
            </nav>
        </>
    );
}
