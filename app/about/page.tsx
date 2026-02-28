'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import { useLanguage } from '../context/LanguageContext';

function InViewSection({ children, className = '' }: { children: React.ReactNode, className?: string }) {
    const [inView, setInView] = useState(false);
    return (
        <div
            ref={(el) => {
                if (!el) return;
                const observer = new IntersectionObserver(([entry]) => {
                    if (entry.isIntersecting) {
                        setInView(true);
                        observer.disconnect();
                    }
                }, { threshold: 0.1 });
                observer.observe(el);
            }}
            className={`${styles.inViewSection} ${inView ? styles.inViewVisible : ''} ${className}`}
        >
            {children}
        </div>
    );
}

export default function About() {
    const { t } = useLanguage();

    return (
        <main className={styles.main}>
            <section className={styles.hero}>
                <div className={styles.heroBg}>
                    <div className={styles.ring1} />
                    <div className={styles.ring2} />
                    <div className={styles.ring3} />
                </div>
                <div className={styles.heroContent}>
                    <InViewSection>
                        <h1 className={styles.title}>
                            {t('about.hero_title')} <span className={styles.highlight}>{t('about.hero_highlight')}</span>
                        </h1>
                        <p className={styles.subtitle}>{t('about.hero_sub')}</p>
                    </InViewSection>
                </div>
            </section>

            <section className={styles.contentSection}>
                <div className={styles.container}>
                    <div className={styles.grid}>
                        <InViewSection className={styles.textContent}>
                            <h2>{t('about.origin_title')}</h2>
                            <p>{t('about.origin_p1')}</p>
                            <p>{t('about.origin_p2')}</p>
                        </InViewSection>
                        <InViewSection className={styles.imageContent}>
                            <div className={styles.imageWrapper}>
                                <Image src="/logo.png" alt="Discussions Logo" width={400} height={130} className={styles.logoImg} />
                                <div className={styles.imageGlow} />
                            </div>
                        </InViewSection>
                    </div>
                </div>
            </section>

            <section className={styles.statsSection}>
                <div className={styles.container}>
                    <InViewSection>
                        <div className={styles.statsGrid}>
                            <div className={styles.statCard}>
                                <div className={styles.statNumber}>{t('about.stat1_num')}</div>
                                <div className={styles.statLabel}>{t('about.stat1_label')}</div>
                            </div>
                            <div className={styles.statCard}>
                                <div className={styles.statNumber}>{t('about.stat2_num')}</div>
                                <div className={styles.statLabel}>{t('about.stat2_label')}</div>
                            </div>
                            <div className={styles.statCard}>
                                <div className={styles.statNumber}>{t('about.stat3_num')}</div>
                                <div className={styles.statLabel}>{t('about.stat3_label')}</div>
                            </div>
                        </div>
                    </InViewSection>
                </div>
            </section>
        </main>
    );
}
