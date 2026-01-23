export const galleryAssets = {
    'lg-dual': [
        '/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-left-facing-1600x1000.svg',
        '/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-right-facing-1600x1000.svg',
        '/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-lcd-screen-front-1600x1000.svg',
        '/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-remote-1600x1000.svg',
        '/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-side-1600x1000.svg',
    ],
    'lg-universal': [
        '/assets/window-unit-images/lg-universal-fit-unit-photos-1600x1000/lg-universal-fit-through-the-wall-front-left-facing-1600x1000.svg',
        '/assets/window-unit-images/lg-universal-fit-unit-photos-1600x1000/lg-universal-fit-through-the-wall-front-right-facing-1600x1000.svg',
        '/assets/window-unit-images/lg-universal-fit-unit-photos-1600x1000/lg-universal-fit-through-the-wall-side-1600x1000.svg',
        '/assets/window-unit-images/lg-universal-fit-unit-photos-1600x1000/lg-universal-fit-through-the-wall-front-lcd-screen-1600x1000.svg',
        '/assets/window-unit-images/lg-universal-fit-unit-photos-1600x1000/lg-universal-fit-through-the-wall-back-1600x1000.svg',
    ],
    'lg-base': [
        '/assets/window-unit-images/lg-base-standard-units/lg-base-standard-lw8024rd-front-left-facing-1600x1000.svg',
        '/assets/window-unit-images/lg-base-standard-units/lg-base-standard-lw8024rd-front-filter-1600x1000.svg',
        '/assets/window-unit-images/lg-base-standard-units/lg-base-standard-lw8024rd-remote-1600x1000.svg',
        '/assets/window-unit-images/lg-base-standard-units/lg-base-standard-lw8024rd-back-1600x1000.svg',
        '/assets/window-unit-images/lg-base-standard-units/lg-base-standard-lw8024rd-front-left-facing-dimensions-1600x1000.svg',
    ],
    'ge-pro': [
        '/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-performance-series-front-lcd-screen-1600x1000.svg',
        '/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-performance-series-remote-1600x1000.svg',
    ],
    'ge-sleeve': [
        '/assets/window-unit-images/ge-units/GE-RAB26A-wall-sleeve-front-left-facing.jpg',
        '/assets/window-unit-images/ge-units/GE-RAB26A-wall-sleeve-back.jpg',
        '/assets/window-unit-images/ge-units/GE-RAB26A-wall-sleeve-back-grille.jpg',
    ]
};

// Map Product ID to specific Hero Image + Gallery Set Key
const productMap: Record<number, { hero: string, gallery: keyof typeof galleryAssets }> = {
    // LG Dual Inverter (Model Specifics Deleted - Using Universal Series Front)
    4: { hero: '/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.svg', gallery: 'lg-dual' },
    5: { hero: '/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.svg', gallery: 'lg-dual' },
    6: { hero: '/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.svg', gallery: 'lg-dual' },
    7: { hero: '/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.svg', gallery: 'lg-dual' },
    8: { hero: '/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.svg', gallery: 'lg-dual' },
    9: { hero: '/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.svg', gallery: 'lg-dual' },
    10: { hero: '/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.svg', gallery: 'lg-dual' },

    // LG Universal Fit (Specifics Retained)
    11: { hero: '/assets/window-unit-images/lg-universal-fit-unit-photos-1600x1000/LW8023HRSM.svg', gallery: 'lg-universal' },
    12: { hero: '/assets/window-unit-images/lg-universal-fit-unit-photos-1600x1000/LW1823HRSM.svg', gallery: 'lg-universal' },
    13: { hero: '/assets/window-unit-images/lg-universal-fit-unit-photos-1600x1000/LW2423HRSM.svg', gallery: 'lg-universal' },

    // LG Base (Standard) - Using New Base Standard Assets on User Request
    14: { hero: '/assets/window-unit-images/lg-base-standard-units/lg-base-standard-lw8024rd-front-1600x1000.svg', gallery: 'lg-base' },
    15: { hero: '/assets/window-unit-images/lg-base-standard-units/lg-base-standard-lw8024rd-front-1600x1000.svg', gallery: 'lg-base' },
    16: { hero: '/assets/window-unit-images/lg-base-standard-units/lg-base-standard-lw8024rd-front-1600x1000.svg', gallery: 'lg-base' },

    // GE Performance (Specifics Deleted - Using Series Front)
    17: { hero: '/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-performance-series-front-1600x1000.svg', gallery: 'ge-pro' },
    18: { hero: '/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-performance-series-front-1600x1000.svg', gallery: 'ge-pro' },
    19: { hero: '/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-performance-series-front-1600x1000.svg', gallery: 'ge-pro' },

    // GE Wall Case
    21: { hero: '/assets/window-unit-images/ge-units/GE-RAB26A-wall-sleeve-front-no-backgrille.jpg', gallery: 'ge-sleeve' },
};

export const getProductImages = (pid: number): string[] => {
    const data = productMap[pid];
    if (!data) return [];

    // Return Hero + Gallery
    return [
        data.hero,
        ...galleryAssets[data.gallery]
    ];
};
