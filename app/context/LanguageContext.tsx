'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
    lang: Language;
    toggleLang: () => void;
    t: (key: string) => string;
}

const translations = {
    en: {
        // Nav
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.episodes': 'Episodes',
        'nav.host': 'Host',
        'nav.connect': 'Connect',
        'nav.contact': 'Contact',
        'nav.subscribe': 'Subscribe',
        'nav.subscribe_mobile': 'Subscribe on YouTube',
        // Footer
        'footer.rights': '© 2026 Discussions Podcast. All rights reserved.',
        // Home
        'home.tagline': 'Where Impact',
        'home.tagline2': 'Meets',
        'home.tagline3': 'Authenticity',
        'home.subtitle': 'Unfiltered conversations with the leaders shaping our world.',
        'home.pillar1.index': '01',
        'home.pillar1.title': 'OUR MISSION',
        'home.pillar1.desc': 'Discover the "Why" behind Discussions.',
        'home.pillar1.cta': 'Explore About',
        'home.pillar2.index': '02',
        'home.pillar2.title': 'THE ARCHIVE',
        'home.pillar2.desc': 'Watch the latest episodes and highlights.',
        'home.pillar2.cta': 'Watch Now',
        'home.pillar3.index': '03',
        'home.pillar3.title': 'YOUR HOST',
        'home.pillar3.desc': 'Meet Lama Alhamawi and her journey.',
        'home.pillar3.cta': 'Meet Lama',
        'home.latest_badge': 'Latest Episode',
        'home.latest_title': 'Catch Up with',
        'home.latest_title2': 'Impact',
        'home.view_all': 'View all episodes',
        'home.mission': 'AUTHENTICITY. IMPACT.',
        'home.mission2': 'GROWTH.',
        // About
        'about.hero_title': "Let's Make Some",
        'about.hero_highlight': 'Impact',
        'about.hero_sub': "Discussions isn't just a podcast. It's a platform for leaders, visionaries, and boundary-pushers to share the unfiltered truth behind their success.",
        'about.origin_title': 'The Origin Story',
        'about.origin_p1': "Founded by Lama Alhamawi, Discussions began with a simple premise: real growth happens when we strip away the PR talking points and have genuine conversations about the hardships, failures, and breakthroughs that define a career.",
        'about.origin_p2': "What started as a passion project quickly evolved into a premier destination for life and career advice, drawing listeners from across the globe who are hungry for authenticity.",
        'about.stat1_num': '100+',
        'about.stat1_label': 'Episodes Released',
        'about.stat2_num': '50k+',
        'about.stat2_label': 'Global Listeners',
        'about.stat3_num': 'Top 10',
        'about.stat3_label': 'Career Podcasts',
        // Episodes
        'episodes.title': 'Explore the',
        'episodes.highlight': 'Archive',
        'episodes.subtitle': 'Dive into our collection of authentic conversations with leaders and visionaries.',
        'episodes.search_placeholder': 'Search episodes...',
        'episodes.empty': 'No episodes found matching',
        'episodes.watch_btn': 'Watch Episode',
        'episodes.close_btn': '✕ Close',
        // Host
        'host.badge': 'Your Host',
        'host.name': 'Lama',
        'host.name_highlight': 'Alhamawi',
        'host.subtitle': 'Journalist, Philanthropist, and the voice behind Discussions. Committed to bringing the most authentic and impactful career stories to the forefront.',
        'host.follow': 'Follow @lama.lha',
        'host.journey_title': 'The Journey',
        'host.journey_p1': "Lama's career is defined by a relentless pursuit of truth and connection. As a prominent figure in media and journalism, she has spent years interviewing industry giants, political figures, and cultural icons.",
        'host.journey_p2': "With Discussions, she pivots the spotlight onto the process rather than just the outcome. Through deep, unfiltered conversations, she explores the grit, the failures, and the critical decisions that shape true leaders.",
        'host.journey_p3': "Beyond the microphone, Lama is deeply involved in philanthropic efforts and continues to break boundaries in regions worldwide, advocating for women in media and sports.",
        'host.featured_across': 'Roles & Titles',
        'host.feat1': 'Founder & Host of @discussions_official',
        'host.feat2': 'Co-Chairwoman @saudibritishwomen',
        'host.feat3': 'Head of Diplomacy @arabnews',
        'host.feat4': 'Media Advisory Board @psu_ruh',
        // Connect
        'connect.title': 'Stay',
        'connect.highlight': 'Connected',
        'connect.subtitle': 'Join our community across all platforms for the latest episodes, behind-the-scenes content, and daily inspiration.',
        'connect.podcast_ig': 'Podcast Instagram',
        'connect.host_ig': 'Host Instagram',
        'connect.youtube': 'YouTube Channel',
        // Contact
        'contact.badge': 'Get In Touch',
        'contact.title': "Let's start a",
        'contact.highlight': 'Discussion',
        'contact.subtitle': "Whether you're interested in being a guest, exploring sponsorship opportunities, or just want to say hello—we're all ears.",
        'contact.media_title': 'Media & PR Inquiries',
        'contact.partners_title': 'Partnerships',
        'contact.location_title': 'Location',
        'contact.location': 'Based in Saudi Arabia\nBroadcasting Worldwide',
        'contact.name_label': 'Full Name',
        'contact.name_placeholder': 'Jane Doe',
        'contact.email_label': 'Email Address',
        'contact.email_placeholder': 'jane@example.com',
        'contact.inquiry_label': 'Inquiry Type',
        'contact.opt_general': 'General Question',
        'contact.opt_guest': 'Guest Pitch',
        'contact.opt_press': 'Press & Media',
        'contact.opt_sponsor': 'Sponsorship',
        'contact.msg_label': 'Your Message',
        'contact.msg_placeholder': "Tell us what's on your mind...",
        'contact.submit': 'Send Message',
        'contact.submitting': 'Sending...',
        'contact.success_title': 'Message Sent',
        'contact.success_msg': 'Thanks for reaching out. Our team will get back to you within 48 hours.',
        'contact.send_another': 'Send another message',
    },
    ar: {
        // Nav
        'nav.home': 'الرئيسية',
        'nav.about': 'عن البودكاست',
        'nav.episodes': 'الحلقات',
        'nav.host': 'المضيفة',
        'nav.connect': 'تواصل',
        'nav.contact': 'اتصل بنا',
        'nav.subscribe': 'اشترك',
        'nav.subscribe_mobile': 'اشترك على يوتيوب',
        // Footer
        'footer.rights': '© 2026 بودكاست نقاشات. جميع الحقوق محفوظة.',
        // Home
        'home.tagline': 'حيث يلتقي التأثير',
        'home.tagline2': 'بـ',
        'home.tagline3': 'الأصالة',
        'home.subtitle': 'محادثات صريحة وحقيقية مع القادة الذين يصنعون العالم من حولنا.',
        'home.pillar1.index': '٠١',
        'home.pillar1.title': 'رسالتنا',
        'home.pillar1.desc': 'اكتشف الـ"لماذا" خلف نقاشات.',
        'home.pillar1.cta': 'اعرف أكثر',
        'home.pillar2.index': '٠٢',
        'home.pillar2.title': 'أرشيف الحلقات',
        'home.pillar2.desc': 'شاهد أحدث الحلقات والمقاطع المميزة.',
        'home.pillar2.cta': 'شاهد الآن',
        'home.pillar3.index': '٠٣',
        'home.pillar3.title': 'المضيفة',
        'home.pillar3.desc': 'تعرف على لمى الحامواي ومسيرتها.',
        'home.pillar3.cta': 'تعرف على لمى',
        'home.latest_badge': 'أحدث حلقة',
        'home.latest_title': 'تابع',
        'home.latest_title2': 'التأثير',
        'home.view_all': 'عرض جميع الحلقات',
        'home.mission': 'أصالة. تأثير.',
        'home.mission2': 'نمو.',
        // About
        'about.hero_title': 'لنصنع',
        'about.hero_highlight': 'تأثيراً',
        'about.hero_sub': "نقاشات ليس مجرد بودكاست. إنه منصة للقادة والرؤيويين ومن يكسرون الحواجز لمشاركة الحقيقة غير المصفاة خلف نجاحاتهم.",
        'about.origin_title': 'قصة البداية',
        'about.origin_p1': "تأسس نقاشات على يد لمى الحامواي بفكرة بسيطة: النمو الحقيقي يحدث عندما نتجاوز الخطاب التسويقي ونخوض محادثات حقيقية حول الصعاب والإخفاقات والانتصارات التي تصنع المسيرة المهنية.",
        'about.origin_p2': "ما بدأ كمشروع شغف تطور بسرعة إلى وجهة رائدة لنصائح الحياة والمهنة، تستقطب مستمعين من حول العالم يتعطشون للأصالة.",
        'about.stat1_num': '+١٠٠',
        'about.stat1_label': 'حلقة منشورة',
        'about.stat2_num': '+٥٠ألف',
        'about.stat2_label': 'مستمع حول العالم',
        'about.stat3_num': 'أفضل ١٠',
        'about.stat3_label': 'بودكاست مهني',
        // Episodes
        'episodes.title': 'استكشف',
        'episodes.highlight': 'الأرشيف',
        'episodes.subtitle': 'اغمر في مجموعتنا من المحادثات الأصيلة مع القادة والرؤيويين.',
        'episodes.search_placeholder': 'ابحث عن حلقة...',
        'episodes.empty': 'لم يتم العثور على حلقات تطابق',
        'episodes.watch_btn': 'شاهد الحلقة',
        'episodes.close_btn': '✕ إغلاق',
        // Host
        'host.badge': 'المضيفة',
        'host.name': 'لمى',
        'host.name_highlight': 'الحامواي',
        'host.subtitle': 'صحفية وإنسانية، الصوت خلف نقاشات. ملتزمة بتقديم أصدق وأقوى قصص المسيرة المهنية.',
        'host.follow': 'تابع @lama.lha',
        'host.journey_title': 'المسيرة',
        'host.journey_p1': "تتمحور مسيرة لمى حول السعي الدؤوب للحقيقة والتواصل الإنساني. بصفتها شخصية بارزة في الإعلام والصحافة، قضت سنوات في إجراء مقابلات مع عمالقة الصناعة والشخصيات السياسية والأيقونات الثقافية.",
        'host.journey_p2': "مع نقاشات، تنقل لمى الضوء إلى العملية لا مجرد النتيجة. من خلال محادثات عميقة وصادقة، تستكشف العزيمة والإخفاقات والقرارات المصيرية التي تصنع القادة الحقيقيين.",
        'host.journey_p3': "خارج الميكروفون، تنخرط لمى بعمق في جهود إنسانية وتواصل كسر الحواجز في مختلف أنحاء العالم، داعيةً للمرأة في الإعلام والرياضة.",
        'host.featured_across': 'المناصب والألقاب',
        'host.feat1': 'مؤسِّسة ومضيفة @discussions_official',
        'host.feat2': 'نائبة رئيسة @saudibritishwomen',
        'host.feat3': 'رئيسة الدبلوماسية @arabnews',
        'host.feat4': 'مجلس الاستشارات الإعلامية @psu_ruh',
        // Connect
        'connect.title': 'ابقَ',
        'connect.highlight': 'متواصلاً',
        'connect.subtitle': 'انضم إلى مجتمعنا عبر جميع المنصات لمتابعة أحدث الحلقات والمحتوى خلف الكواليس والإلهام اليومي.',
        'connect.podcast_ig': 'إنستغرام البودكاست',
        'connect.host_ig': 'إنستغرام المضيفة',
        'connect.youtube': 'قناة يوتيوب',
        // Contact
        'contact.badge': 'تواصل معنا',
        'contact.title': 'لنبدأ',
        'contact.highlight': 'نقاشاً',
        'contact.subtitle': "سواء كنت مهتماً بالانضمام ضيفاً، أو استكشاف فرص الرعاية، أو مجرد تحية—نحن بكل سرور.",
        'contact.media_title': 'استفسارات الإعلام والعلاقات العامة',
        'contact.partners_title': 'الشراكات',
        'contact.location_title': 'الموقع',
        'contact.location': 'مقرنا في المملكة العربية السعودية\nبث عالمي',
        'contact.name_label': 'الاسم الكامل',
        'contact.name_placeholder': 'محمد العبدالله',
        'contact.email_label': 'البريد الإلكتروني',
        'contact.email_placeholder': 'example@example.com',
        'contact.inquiry_label': 'نوع الاستفسار',
        'contact.opt_general': 'سؤال عام',
        'contact.opt_guest': 'طلب ضيف',
        'contact.opt_press': 'الإعلام والصحافة',
        'contact.opt_sponsor': 'الرعاية',
        'contact.msg_label': 'رسالتك',
        'contact.msg_placeholder': 'أخبرنا بما يدور في بالك...',
        'contact.submit': 'أرسل الرسالة',
        'contact.submitting': 'جاري الإرسال...',
        'contact.success_title': 'تم إرسال الرسالة',
        'contact.success_msg': 'شكراً للتواصل. سيرد فريقنا عليك خلال ٤٨ ساعة.',
        'contact.send_another': 'أرسل رسالة أخرى',
    },
};

const LanguageContext = createContext<LanguageContextType>({
    lang: 'en',
    toggleLang: () => { },
    t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [lang, setLang] = useState<Language>(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('lang');
            if (stored === 'ar' || stored === 'en') return stored;
        }
        return 'en';
    });

    const toggleLang = () => {
        const next = lang === 'en' ? 'ar' : 'en';
        setLang(next);
        localStorage.setItem('lang', next);
        document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = next;
    };

    useEffect(() => {
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
    }, [lang]);

    const t = (key: string): string => {
        const dict = translations[lang] as Record<string, string>;
        return dict[key] ?? translations['en'][key as keyof typeof translations['en']] ?? key;
    };

    return (
        <LanguageContext.Provider value={{ lang, toggleLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}
