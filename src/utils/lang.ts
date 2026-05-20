const NAMES: Record<string, string> = {
    en: 'English',
    de: 'German',
    fr: 'French',
    es: 'Spanish',
    it: 'Italian',
    pt: 'Portuguese',
    nl: 'Dutch',
    pl: 'Polish',
    ru: 'Russian',
    uk: 'Ukrainian',
    sv: 'Swedish',
    no: 'Norwegian',
    fi: 'Finnish',
    da: 'Danish',
    cs: 'Czech',
    ja: 'Japanese',
    zh: 'Chinese',
    ko: 'Korean',
    ar: 'Arabic',
    he: 'Hebrew',
    hi: 'Hindi',
    bn: 'Bengali',
    tr: 'Turkish',
    fa: 'Persian',
    th: 'Thai',
    vi: 'Vietnamese',
    id: 'Indonesian',
    ms: 'Malay',
    tl: 'Tagalog',
    el: 'Greek',
    ro: 'Romanian',
    hu: 'Hungarian',
    bg: 'Bulgarian',
    sr: 'Serbian',
    hr: 'Croatian',
    sk: 'Slovak',
    sl: 'Slovenian',
    et: 'Estonian',
    lv: 'Latvian',
    lt: 'Lithuanian',
    ca: 'Catalan',
    eu: 'Basque',
    gl: 'Galician',
    is: 'Icelandic',
    ga: 'Irish',
    cy: 'Welsh',
    af: 'Afrikaans',
    sw: 'Swahili',
    az: 'Azerbaijani',
    kk: 'Kazakh',
    uz: 'Uzbek',
    ka: 'Georgian',
    hy: 'Armenian',
    sq: 'Albanian',
    mk: 'Macedonian',
    be: 'Belarusian',
    ce: 'Chechen',
    ta: 'Tamil',
    te: 'Telugu',
    mr: 'Marathi',
    ml: 'Malayalam',
    ur: 'Urdu',
    pa: 'Punjabi',
};

export const langName = (code: string): string => {
    if (code.startsWith('wikt:')) {
        const sub = code.slice(5);
        return `${NAMES[sub] ?? sub} (wiktionary)`;
    }
    if (code === 'commons') return 'Wikimedia Commons';
    if (code === 'wikidata') return 'Wikidata';
    if (code === 'meta') return 'Meta-Wiki';
    return NAMES[code] ?? code;
};

const hueFromCode = (code: string): number => {
    let h = 0;
    for (let i = 0; i < code.length; i++) {
        h = (h * 31 + code.charCodeAt(i)) >>> 0;
    }
    return h % 360;
};

export const langColor = (code: string): string => {
    const h = hueFromCode(code);
    return `hsl(${h}, 70%, 60%)`;
};

export const langColorSoft = (code: string): string => {
    const h = hueFromCode(code);
    return `hsla(${h}, 70%, 60%, 0.2)`;
};
