'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './page.module.css';
import { useLanguage } from '../context/LanguageContext';

// Feed posts — YouTube cards use real public thumbnail images
const mockPosts = [
    {
        id: 1,
        platform: 'youtube',
        account: '@DiscussionsOfficialShow',
        avatar: 'Y',
        avatarColor: '#ff0000',
        time: '2h ago',
        caption: 'Mohammed Alhagbani | A Leader In The Sports Industry 🏆 Full episode — watch now!',
        likes: '12.7K',
        comments: '891',
        videoId: 'AeleIvjWPUA',
        url: 'https://www.youtube.com/watch?v=AeleIvjWPUA',
        quote: '',
    },
    {
        id: 2,
        platform: 'instagram',
        account: '@discussions_official',
        avatar: 'D',
        avatarColor: 'linear-gradient(135deg, #e8c97a, #c4a55a)',
        time: '5h ago',
        caption: 'New episode is LIVE 🎙️ We sat down with one of the most impactful voices in the region. Link in bio!',
        likes: '3.4K',
        comments: '218',
        videoId: '',
        url: 'https://www.instagram.com/discussions_official/',
        quote: '',
    },
    {
        id: 3,
        platform: 'youtube',
        account: '@DiscussionsOfficialShow',
        avatar: 'Y',
        avatarColor: '#ff0000',
        time: '1d ago',
        caption: 'Discussions × The Mo Show Crossover — Energy you can\'t miss ⚡️',
        likes: '9.4K',
        comments: '562',
        videoId: 'KJMn_2sm0_s',
        url: 'https://www.youtube.com/watch?v=KJMn_2sm0_s',
        quote: '',
    },
    {
        id: 4,
        platform: 'instagram',
        account: '@lama.lha',
        avatar: 'L',
        avatarColor: 'linear-gradient(135deg, #f0ede8, #d4d0c5)',
        time: '2d ago',
        caption: 'Grateful for every conversation that challenges me to grow 🌱 Season highlights coming soon.',
        likes: '8.1K',
        comments: '443',
        videoId: '',
        url: 'https://www.instagram.com/lama.lha/',
        quote: '"The most authentic conversations create the most lasting impact."',
    },
    {
        id: 5,
        platform: 'youtube',
        account: '@DiscussionsOfficialShow',
        avatar: 'Y',
        avatarColor: '#ff0000',
        time: '3d ago',
        caption: 'Gabi & Yousef | The Dynamic Duo — creativity, hustle, and heart 🎯',
        likes: '7.8K',
        comments: '445',
        videoId: 'kHvhrkd2OTY',
        url: 'https://www.youtube.com/watch?v=kHvhrkd2OTY',
        quote: '',
    },
    {
        id: 6,
        platform: 'instagram',
        account: '@discussions_official',
        avatar: 'D',
        avatarColor: 'linear-gradient(135deg, #e8c97a, #c4a55a)',
        time: '4d ago',
        caption: '"Success is not final, failure is not fatal." — Episode 87 💬',
        likes: '5.9K',
        comments: '307',
        videoId: '',
        url: 'https://www.instagram.com/discussions_official/',
        quote: '"Success is not final, failure is not fatal. It is the courage to continue that counts."',
    },
];

function useCountUp(target: number, duration: number = 1500, start: boolean = false) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!start) return;
        let startTime: number | null = null;
        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [start, target, duration]);

    return count;
}

function StatCounter({ value, label, started }: { value: number; label: string; started: boolean }) {
    const count = useCountUp(value, 1500, started);
    const display = value >= 1000 ? `${(count / 1000).toFixed(count >= 1000 ? 1 : 0)}K` : count.toString();
    return (
        <div className={styles.stat}>
            <span className={styles.statValue}>{display}+</span>
            <span className={styles.statLabel}>{label}</span>
        </div>
    );
}

// Instagram SVG icon
const IgIcon = ({ size = 28 }: { size?: number }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
);

// YouTube SVG icon
const YtIcon = ({ size = 28 }: { size?: number }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
    </svg>
);

// Heart icon
const HeartIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width={14} height={14}>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
);

// Comment icon
const CommentIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={14} height={14}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);

// External arrow
const ArrowIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width={20} height={20}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
);

interface SocialCardProps {
    title: string;
    handle: string;
    url: string;
    platform: 'instagram-podcast' | 'instagram-host' | 'youtube';
    stats: { followers: number; posts: number; label1: string; label2: string };
    delay: number;
}

function SocialCard({ title, handle, url, platform, stats, delay }: SocialCardProps) {
    const [hovered, setHovered] = useState(false);
    const [ripple, setRipple] = useState<{ x: number; y: number; id: number } | null>(null);
    const cardRef = useRef<HTMLAnchorElement>(null);

    const handleClick = (e: React.MouseEvent) => {
        const rect = cardRef.current?.getBoundingClientRect();
        if (rect) {
            setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top, id: Date.now() });
            setTimeout(() => setRipple(null), 700);
        }
    };

    const isYouTube = platform === 'youtube';
    const isPodcastIg = platform === 'instagram-podcast';

    return (
        <a
            ref={cardRef}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.socialCard} ${styles[platform.replace('-', '_')]}`}
            style={{ animationDelay: `${delay}s` }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={handleClick}
        >
            {/* Ripple */}
            {ripple && (
                <span
                    className={styles.ripple}
                    style={{ left: ripple.x, top: ripple.y }}
                />
            )}

            {/* Animated background particles */}
            <div className={styles.cardBg} />
            <div className={styles.cardOrb} />

            {/* Platform badge */}
            <div className={styles.platformBadge}>
                {isYouTube ? <YtIcon size={16} /> : <IgIcon size={16} />}
                <span>{isYouTube ? 'YouTube' : 'Instagram'}</span>
            </div>

            {/* Main content */}
            <div className={styles.cardBody}>
                <div className={`${styles.cardIcon} ${isYouTube ? styles.ytIcon : styles.igIcon}`}>
                    {isYouTube ? <YtIcon size={36} /> : <IgIcon size={36} />}
                </div>

                <div className={styles.cardText}>
                    <h2 className={styles.cardTitle}>{title}</h2>
                    <p className={styles.cardHandle}>{handle}</p>
                </div>
            </div>

            {/* Stats row */}
            <div className={`${styles.statsRow} ${hovered ? styles.statsVisible : ''}`}>
                <StatCounter value={stats.followers} label={stats.label1} started={hovered} />
                <div className={styles.statDivider} />
                <StatCounter value={stats.posts} label={stats.label2} started={hovered} />
            </div>

            {/* CTA */}
            <div className={styles.cardCta}>
                <span>{isPodcastIg ? 'Follow Podcast' : isYouTube ? 'Subscribe' : 'Follow Host'}</span>
                <span className={styles.ctaArrow}><ArrowIcon /></span>
            </div>
        </a>
    );
}

function FeedCard({ post }: { post: typeof mockPosts[0] }) {
    const [liked, setLiked] = useState(false);
    const isYt = post.platform === 'youtube';
    const hasThumb = isYt && post.videoId;
    const hasQuote = !isYt && post.quote;

    return (
        <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.feedCard}
        >
            {/* Header */}
            <div className={styles.feedHeader}>
                <div
                    className={styles.feedAvatar}
                    style={{ background: post.avatarColor, color: isYt ? '#fff' : '#0a0a0a' }}
                >
                    {post.avatar}
                </div>
                <div className={styles.feedMeta}>
                    <span className={styles.feedAccount}>{post.account}</span>
                    <span className={styles.feedTime}>{post.time}</span>
                </div>
                <div className={`${styles.feedPlatformBadge} ${isYt ? styles.ytBadge : styles.igBadge}`}>
                    {isYt ? <YtIcon size={12} /> : <IgIcon size={12} />}
                </div>
            </div>

            {/* YouTube: real thumbnail */}
            {hasThumb && (
                <div className={styles.feedThumb}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={`https://img.youtube.com/vi/${post.videoId}/hqdefault.jpg`}
                        alt={post.caption}
                        className={styles.feedThumbImg}
                    />
                    <div className={styles.ytPlayOverlay}>
                        <div className={styles.ytPlayCircle}>
                            <YtIcon size={22} />
                        </div>
                    </div>
                </div>
            )}

            {/* Instagram: styled quote card */}
            {hasQuote && (
                <div className={styles.feedQuote}>
                    <span className={styles.feedQuoteMark}>&ldquo;</span>
                    <p className={styles.feedQuoteText}>{post.quote.replace(/^"|"$/g, '')}</p>
                </div>
            )}

            {/* Caption */}
            <p className={styles.feedCaption}>{post.caption}</p>

            {/* Footer */}
            <div className={styles.feedFooter}>
                <button
                    className={`${styles.feedLike} ${liked ? styles.liked : ''}`}
                    onClick={(e) => { e.preventDefault(); setLiked(l => !l); }}
                >
                    <HeartIcon />
                    <span>{post.likes}</span>
                </button>
                <div className={styles.feedComment}>
                    <CommentIcon />
                    <span>{post.comments}</span>
                </div>
            </div>
        </a>
    );
}

export default function Connect() {
    const [mounted, setMounted] = useState(false);
    const { t } = useLanguage();
    const feedRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 0);
        return () => clearTimeout(timer);
    }, []);

    // Auto-scroll the feed
    useEffect(() => {
        if (!mounted) return;
        const el = feedRef.current;
        if (!el) return;
        let frame: number;
        let pos = 0;
        const speed = 0.5;
        const scroll = () => {
            pos += speed;
            // Reset when past the halfway point (we duplicate posts)
            if (pos >= el.scrollWidth / 2) pos = 0;
            el.scrollLeft = pos;
            frame = requestAnimationFrame(scroll);
        };
        frame = requestAnimationFrame(scroll);

        // Pause on hover
        const pause = () => cancelAnimationFrame(frame);
        const resume = () => { frame = requestAnimationFrame(scroll); };
        el.addEventListener('mouseenter', pause);
        el.addEventListener('mouseleave', resume);

        return () => {
            cancelAnimationFrame(frame);
            el.removeEventListener('mouseenter', pause);
            el.removeEventListener('mouseleave', resume);
        };
    }, [mounted]);

    if (!mounted) return null;

    const socialCards: SocialCardProps[] = [
        {
            title: t('connect.podcast_ig'),
            handle: '@discussions_official',
            url: 'https://www.instagram.com/discussions_official/',
            platform: 'instagram-podcast',
            stats: { followers: 48000, posts: 320, label1: 'Followers', label2: 'Posts' },
            delay: 0.1,
        },
        {
            title: t('connect.host_ig'),
            handle: '@lama.lha',
            url: 'https://www.instagram.com/lama.lha/',
            platform: 'instagram-host',
            stats: { followers: 92000, posts: 540, label1: 'Followers', label2: 'Posts' },
            delay: 0.25,
        },
        {
            title: t('connect.youtube'),
            handle: '@DiscussionsOfficialShow',
            url: 'https://www.youtube.com/@DiscussionsOfficialShow',
            platform: 'youtube',
            stats: { followers: 65000, posts: 110, label1: 'Subscribers', label2: 'Videos' },
            delay: 0.4,
        },
    ];

    const allPosts = [...mockPosts, ...mockPosts]; // duplicate for seamless loop

    return (
        <main className={styles.main}>
            {/* Animated background orbs */}
            <div className={styles.bgOrb1} />
            <div className={styles.bgOrb2} />
            <div className={styles.bgOrb3} />

            {/* ===== HERO ===== */}
            <div className={styles.hero}>
                <div className={styles.heroBadge}>
                    <span className={styles.badgeDot} />
                    <span>Community Hub</span>
                </div>
                <h1 className={styles.heroTitle}>
                    {t('connect.title')}{' '}
                    <span className={styles.heroGradient}>{t('connect.highlight')}</span>
                </h1>
                <p className={styles.heroSub}>{t('connect.subtitle')}</p>

                {/* Platform pills */}
                <div className={styles.platformPills}>
                    <div className={styles.pill}><IgIcon size={14} /> Instagram</div>
                    <div className={styles.pill}><YtIcon size={14} /> YouTube</div>
                    <div className={styles.pill} style={{ color: '#e8c97a', borderColor: 'rgba(232,201,122,0.3)' }}>🎙️ Podcast</div>
                </div>
            </div>

            {/* ===== SOCIAL CARDS ===== */}
            <div className={styles.cardsSection}>
                <div className={styles.cardsGrid}>
                    {socialCards.map((card) => (
                        <SocialCard key={card.handle} {...card} />
                    ))}
                </div>
            </div>

            {/* ===== SOCIAL FEED ===== */}
            <div className={styles.feedSection}>
                <div className={styles.feedSectionHeader}>
                    <div className={styles.feedLiveIndicator}>
                        <span className={styles.liveDot} />
                        <span>Live Feed</span>
                    </div>
                    <h2 className={styles.feedTitle}>Latest From Our <span className={styles.heroGradient}>Community</span></h2>
                    <p className={styles.feedSubtitle}>Real-time updates across all our social platforms</p>
                </div>

                {/* Scrolling feed row */}
                <div className={styles.feedTrackWrapper}>
                    <div className={styles.feedFadeLLeft} />
                    <div className={styles.feedTrack} ref={feedRef}>
                        {allPosts.map((post, i) => (
                            <FeedCard key={`${post.id}-${i}`} post={post} />
                        ))}
                    </div>
                    <div className={styles.feedFadeRight} />
                </div>

                {/* Embedded YouTube latest video */}
                <div className={styles.embedsRow}>
                    <div className={styles.embedCard}>
                        <div className={styles.embedLabel}>
                            <YtIcon size={16} />
                            <span>Latest on YouTube</span>
                        </div>
                        <div className={styles.embedWrapper}>
                            <iframe
                                src="https://www.youtube.com/embed/AeleIvjWPUA"
                                title="Mohammed Alhagbani | A Leader In The Sports Industry — Discussions Podcast"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className={styles.embedIframe}
                            />
                        </div>
                    </div>

                    <div className={styles.embedCard}>
                        <div className={styles.embedLabel}>
                            <IgIcon size={16} />
                            <span>Latest on Instagram</span>
                        </div>
                        <div className={styles.embedWrapper}>
                            <iframe
                                src="https://www.instagram.com/discussions_official/embed"
                                title="Discussions Official Instagram"
                                allowFullScreen
                                className={styles.embedIframe}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
