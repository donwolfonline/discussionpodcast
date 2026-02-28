'use client';

import Image from 'next/image';
import styles from './page.module.css';
import lamaImg from '../../public/lama-actual.png';
import { useLanguage } from '../context/LanguageContext';

export default function Host() {
    const { t } = useLanguage();


    return (
        <main className={styles.main}>
            <section className={styles.hero}>
                <div className={styles.heroGrid}>
                    <div className={styles.heroContent}>
                        <div className={styles.badge}>{t('host.badge')}</div>
                        <h1 className={styles.title}>{t('host.name')}<br /><span className={styles.highlight}>{t('host.name_highlight')}</span></h1>
                        <p className={styles.subtitle}>{t('host.subtitle')}</p>
                        <div className={styles.heroActions}>
                            <a href="https://www.instagram.com/lama.lha/" target="_blank" rel="noopener noreferrer" className={styles.primaryBtn}>
                                {t('host.follow')}
                            </a>
                        </div>
                    </div>
                    <div className={styles.heroImageWrap}>
                        <div className={styles.imageGlow} />
                        <div className={styles.imageContainer}>
                            <Image
                                src={lamaImg}
                                alt="Lama Alhamawi - Host of Discussions Podcast"
                                fill
                                priority
                                className={styles.hostImage}
                                placeholder="blur"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.bioSection}>
                <div className={styles.container}>
                    <div className={styles.bioGrid}>
                        <div className={styles.bioText}>
                            <h2>{t('host.journey_title')}</h2>
                            <p>{t('host.journey_p1')}</p>
                            <p>
                                {t('host.journey_p2')}
                            </p>
                            <p>{t('host.journey_p3')}</p>
                        </div>
                        <div className={styles.features}>
                            <h3>{t('host.featured_across')}</h3>
                            <ul className={styles.featureList}>
                                <li><span className={styles.bullet}></span> {t('host.feat1')}</li>
                                <li><span className={styles.bullet}></span> {t('host.feat2')}</li>
                                <li><span className={styles.bullet}></span> {t('host.feat3')}</li>
                                <li><span className={styles.bullet}></span> {t('host.feat4')}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
