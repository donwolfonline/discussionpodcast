'use client';

import { useState } from 'react';
import Image from 'next/image';
import { EPISODES } from '../data/episodes';
import styles from './page.module.css';
import { useLanguage } from '../context/LanguageContext';

export default function Episodes() {
    const [activeVideo, setActiveVideo] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const { t } = useLanguage();

    const filteredEpisodes = EPISODES.filter((ep) =>
        ep.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ep.episode.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main className={styles.main}>
            <section className={styles.hero}>
                <div className={styles.heroGlow} />
                <h1 className={styles.title}>
                    {t('episodes.title')} <span className={styles.highlight}>{t('episodes.highlight')}</span>
                </h1>
                <p className={styles.subtitle}>{t('episodes.subtitle')}</p>

                <div className={styles.searchContainer}>
                    <input
                        type="text"
                        placeholder={t('episodes.search_placeholder')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.searchInput}
                    />
                    <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </div>
            </section>

            <section className={styles.gridSection}>
                <div className={styles.container}>
                    {filteredEpisodes.length === 0 ? (
                        <div className={styles.emptyState}>{t('episodes.empty')} &ldquo;{searchQuery}&rdquo;</div>
                    ) : (
                        <div className={styles.episodesGrid}>
                            {filteredEpisodes.map((ep, i) => (
                                <div
                                    key={`${ep.id}-${i}`}
                                    className={`${styles.episodeCard} ${activeVideo === ep.id ? styles.episodeCardActive : ''}`}
                                    style={{ animationDelay: `${i * 0.05}s` }}
                                >
                                    {activeVideo === ep.id ? (
                                        <div className={styles.videoPlayer}>
                                            <iframe
                                                src={`https://www.youtube.com/embed/${ep.id}?autoplay=1&rel=0`}
                                                title={ep.title}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                className={styles.iframe}
                                            />
                                            <button
                                                className={styles.closeVideoBtn}
                                                onClick={() => setActiveVideo(null)}
                                            >
                                                {t('episodes.close_btn')}
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <div
                                                className={styles.episodeThumbnail}
                                                onClick={() => setActiveVideo(ep.id)}
                                                role="button"
                                                tabIndex={0}
                                                onKeyDown={(e) => e.key === 'Enter' && setActiveVideo(ep.id)}
                                            >
                                                <Image
                                                    src={`https://img.youtube.com/vi/${ep.id}/maxresdefault.jpg`}
                                                    alt={ep.title}
                                                    fill
                                                    className={styles.thumbImg}
                                                    onError={(e) => {
                                                        const img = e.currentTarget;
                                                        if (!img.src.includes('hqdefault')) {
                                                            img.src = `https://img.youtube.com/vi/${ep.id}/hqdefault.jpg`;
                                                        }
                                                    }}
                                                />
                                                <div className={styles.thumbOverlay} />
                                                <div className={styles.playBtn}>
                                                    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                                                        <path d="M8 5v14l11-7z" />
                                                    </svg>
                                                </div>
                                                <span className={styles.episodeBadge}>{ep.episode}</span>
                                            </div>
                                            <div className={styles.episodeInfo}>
                                                <h3 className={styles.episodeTitle}>{ep.title}</h3>
                                                <button
                                                    className={styles.watchBtn}
                                                    onClick={() => setActiveVideo(ep.id)}
                                                >
                                                    {t('episodes.watch_btn')} →
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
