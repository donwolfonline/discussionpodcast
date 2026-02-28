'use client';

import { useState } from 'react';
import styles from './page.module.css';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
    const { t } = useLanguage();
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        inquiryType: 'general',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            setFormState({ name: '', email: '', inquiryType: 'general', message: '' });
        }, 1500);
    };

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.infoColumn}>
                        <div className={styles.badge}>{t('contact.badge')}</div>
                        <h1 className={styles.title}>{t('contact.title')} <br /><span className={styles.highlight}>{t('contact.highlight')}</span></h1>
                        <p className={styles.subtitle}>{t('contact.subtitle')}</p>

                        <div className={styles.contactDetails}>
                            <div className={styles.detailItem}>
                                <h3>{t('contact.media_title')}</h3>
                                <p>press@discussionspodcast.com</p>
                            </div>
                            <div className={styles.detailItem}>
                                <h3>{t('contact.partners_title')}</h3>
                                <p>partners@discussionspodcast.com</p>
                            </div>
                            <div className={styles.detailItem}>
                                <h3>{t('contact.location_title')}</h3>
                                <p style={{ whiteSpace: 'pre-line' }}>{t('contact.location')}</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.formColumn}>
                        <form className={styles.form} onSubmit={handleSubmit}>
                            {isSubmitted ? (
                                <div className={styles.successState}>
                                    <div className={styles.successIcon}>✓</div>
                                    <h3>{t('contact.success_title')}</h3>
                                    <p>{t('contact.success_msg')}</p>
                                    <button
                                        type="button"
                                        className={styles.resetBtn}
                                        onClick={() => setIsSubmitted(false)}
                                    >
                                        {t('contact.send_another')}
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className={styles.inputGroup}>
                                        <label htmlFor="name">{t('contact.name_label')}</label>
                                        <input
                                            type="text"
                                            id="name"
                                            required
                                            value={formState.name}
                                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                            placeholder={t('contact.name_placeholder')}
                                        />
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label htmlFor="email">{t('contact.email_label')}</label>
                                        <input
                                            type="email"
                                            id="email"
                                            required
                                            value={formState.email}
                                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                            placeholder={t('contact.email_placeholder')}
                                        />
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label htmlFor="inquiry">{t('contact.inquiry_label')}</label>
                                        <div className={styles.selectWrapper}>
                                            <select
                                                id="inquiry"
                                                value={formState.inquiryType}
                                                onChange={(e) => setFormState({ ...formState, inquiryType: e.target.value })}
                                            >
                                                <option value="general">{t('contact.opt_general')}</option>
                                                <option value="guest">{t('contact.opt_guest')}</option>
                                                <option value="press">{t('contact.opt_press')}</option>
                                                <option value="partnership">{t('contact.opt_sponsor')}</option>
                                            </select>
                                            <svg className={styles.selectIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label htmlFor="message">{t('contact.msg_label')}</label>
                                        <textarea
                                            id="message"
                                            required
                                            rows={5}
                                            value={formState.message}
                                            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                            placeholder={t('contact.msg_placeholder')}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className={`${styles.submitBtn} ${isSubmitting ? styles.submitting : ''}`}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? t('contact.submitting') : `${t('contact.submit')} →`}
                                    </button>
                                </>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
