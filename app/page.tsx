'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import { EPISODES } from './data/episodes';
import { useLanguage } from './context/LanguageContext';

function WaveBar({ index, mouseX }: { index: number, mouseX: number }) {
  const barRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  const baseHeight = useMemo(() => (Math.sin(index * 0.2) * 30 + 50), [index]);
  const baseDuration = useMemo(() => (0.8 + Math.abs(Math.cos(index)) * 0.4), [index]);

  useEffect(() => {
    if (!barRef.current) return;
    const rect = barRef.current.getBoundingClientRect();
    const barX = rect.left + rect.width / 2;
    const dist = Math.abs(mouseX - barX);
    setDistance(dist);
  }, [mouseX]);

  const influence = Math.max(0, 1 - distance / 400);
  const heightMultiplier = 1 + influence * 2;

  return (
    <div
      ref={barRef}
      className={styles.waveBar}
      style={{
        height: `${baseHeight * heightMultiplier}%`,
        animationDelay: `${index * 0.03}s`,
        animationDuration: `${baseDuration}s`,
        opacity: 0.3 + influence * 0.5,
        background: influence > 0.5 ? '#f0ede8' : '#e8c97a'
      }}
    />
  );
}

function SoundWave() {
  const [mouseX, setMouseX] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  if (!mounted) return <div className={styles.soundWaveContainer} />;

  return (
    <div className={styles.soundWaveContainer}>
      {[...Array(150)].map((_, i) => (
        <WaveBar key={i} index={i} mouseX={mouseX} />
      ))}
    </div>
  );
}

function AnimatedMission() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.missionSection} ref={ref}>
      <div className={styles.container}>
        <div className={`${styles.missionText} ${isVisible ? styles.missionInView : ''}`}>
          {t('home.mission')} <span className={styles.goldOutline}>{t('home.mission2')}</span>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [activePillar, setActivePillar] = useState<string | null>(null);
  const latestEpisode = EPISODES[0];
  const { t } = useLanguage();

  return (
    <main className={styles.main}>
      {/* Immersive Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.glow} />
          <SoundWave />
        </div>

        <div className={styles.heroContent}>
          <h1 className={styles.mainTitle}>
            {t('home.tagline')} <span className={styles.goldText}>{t('home.tagline2')}</span> {t('home.tagline3')}
          </h1>
          <p className={styles.mainSubtitle}>{t('home.subtitle')}</p>
          <div className={styles.scrollIndicator}>
            <div className={styles.mouse}>
              <div className={styles.wheel} />
            </div>
          </div>
        </div>
      </section>

      {/* The Pillars Portals */}
      <section className={styles.pillarsSection}>
        <div className={styles.pillarsContainer}>
          <Link href="/about"
            className={`${styles.pillar} ${activePillar === 'about' ? styles.pillarExpanded : ''}`}
            onMouseEnter={() => setActivePillar('about')}
            onMouseLeave={() => setActivePillar(null)}
          >
            <div className={styles.pillarBg}>
              <Image src="/hero-bg.png" alt="Mission Background" fill className={styles.pillarImg} />
              <div className={styles.pillarOverlay} />
            </div>
            <div className={styles.pillarContent}>
              <span className={styles.pillarIndex}>{t('home.pillar1.index')}</span>
              <h2 className={styles.pillarTitle}>{t('home.pillar1.title')}</h2>
              <p className={styles.pillarDescription}>{t('home.pillar1.desc')}</p>
              <div className={styles.pillarBtn}>{t('home.pillar1.cta')} &rarr;</div>
            </div>
          </Link>

          <Link href="/episodes"
            className={`${styles.pillar} ${activePillar === 'episodes' ? styles.pillarExpanded : ''}`}
            onMouseEnter={() => setActivePillar('episodes')}
            onMouseLeave={() => setActivePillar(null)}
          >
            <div className={styles.pillarBg}>
              <div className={styles.pillarOverlay} />
            </div>
            <div className={styles.pillarContent}>
              <span className={styles.pillarIndex}>{t('home.pillar2.index')}</span>
              <h2 className={styles.pillarTitle}>{t('home.pillar2.title')}</h2>
              <p className={styles.pillarDescription}>{t('home.pillar2.desc')}</p>
              <div className={styles.pillarBtn}>{t('home.pillar2.cta')} &rarr;</div>
            </div>
          </Link>

          <Link href="/host"
            className={`${styles.pillar} ${activePillar === 'host' ? styles.pillarExpanded : ''}`}
            onMouseEnter={() => setActivePillar('host')}
            onMouseLeave={() => setActivePillar(null)}
          >
            <div className={styles.pillarBg}>
              <Image src="/lama-actual.png" alt="Lama Alhamawi" fill className={styles.pillarImg} />
              <div className={styles.pillarOverlay} />
            </div>
            <div className={styles.pillarContent}>
              <span className={styles.pillarIndex}>{t('home.pillar3.index')}</span>
              <h2 className={styles.pillarTitle}>{t('home.pillar3.title')}</h2>
              <p className={styles.pillarDescription}>{t('home.pillar3.desc')}</p>
              <div className={styles.pillarBtn}>{t('home.pillar3.cta')} &rarr;</div>
            </div>
          </Link>
        </div>
      </section>

      {/* Latest Pulse - Minimal highlight */}
      <section className={styles.pulseSection}>
        <div className={styles.container}>
          <div className={styles.pulseHeader}>
            <div className={styles.pulseBadge}>{t('home.latest_badge')}</div>
            <h2 className={styles.pulseTitle}>{t('home.latest_title')} <span className={styles.goldText}>{t('home.latest_title2')}</span></h2>
          </div>

          <div className={styles.pulseCard}>
            <div className={styles.pulseVideoWrap}>
              <iframe
                src={`https://www.youtube.com/embed/${latestEpisode.id}?rel=0`}
                title={latestEpisode.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={styles.pulseIframe}
              />
            </div>
            <div className={styles.pulseInfo}>
              <h3>{latestEpisode.title}</h3>
              <p>{latestEpisode.episode}</p>
              <Link href="/episodes" className={styles.pulseViewAll}>{t('home.view_all')} &rarr;</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Mission High-Typography */}
      <AnimatedMission />
    </main>
  );
}
