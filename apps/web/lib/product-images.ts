export const galleryAssets = {
    'lg-dual': [
        '/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-left-facing-1600x1000.webp',
        '/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-right-facing-1600x1000.webp',
        '/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-lcd-screen-front-1600x1000.webp',
        '/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-remote-1600x1000.webp',
        '/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-side-1600x1000.webp',
    ],
    'lg-universal': [
        '/assets/window-unit-images/lg-universal-fit-unit-photos-1600x1000/lg-universal-fit-through-the-wall-front-left-facing-1600x1000.webp',
        '/assets/window-unit-images/lg-universal-fit-unit-photos-1600x1000/lg-universal-fit-through-the-wall-front-right-facing-1600x1000.webp',
        '/assets/window-unit-images/lg-universal-fit-unit-photos-1600x1000/lg-universal-fit-through-the-wall-side-1600x1000.webp',
        '/assets/window-unit-images/lg-universal-fit-unit-photos-1600x1000/lg-universal-fit-through-the-wall-front-lcd-screen-1600x1000.webp',
        '/assets/window-unit-images/lg-universal-fit-unit-photos-1600x1000/lg-universal-fit-through-the-wall-back-1600x1000.webp',
    ],
    'lg-base': [
        '/assets/window-unit-images/lg-base-standard-units/lg-base-standard-lw8024rd-front-left-facing-1600x1000.webp',
        '/assets/window-unit-images/lg-base-standard-units/lg-base-standard-lw8024rd-front-filter-1600x1000.webp',
        '/assets/window-unit-images/lg-base-standard-units/lg-base-standard-lw8024rd-remote-1600x1000.webp',
        '/assets/window-unit-images/lg-base-standard-units/lg-base-standard-lw8024rd-back-1600x1000.webp',
        '/assets/window-unit-images/lg-base-standard-units/lg-base-standard-lw8024rd-front-left-facing-dimensions-1600x1000.webp',
    ],
    'ge-pro': [
        '/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-performance-series-front-lcd-screen-1600x1000.webp',
        '/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-performance-series-remote-1600x1000.webp',
    ],
    'ge-sleeve': [
        '/assets/window-unit-images/ge-units/rab26a-ge-lg-universal-casement-slider-1600x1000/RAB26A-wall-sleeve-front-left-facing.webp',
        '/assets/window-unit-images/ge-units/rab26a-ge-lg-universal-casement-slider-1600x1000/RAB26A-wall-sleeve-back.webp',
        '/assets/window-unit-images/ge-units/rab26a-ge-lg-universal-casement-slider-1600x1000/RAB26A-wall-sleeve-back-grille.webp',
    ]
};

// Map Product ID to specific Hero Image + Gallery Set Key
const productMap: Record<number, { hero: string, gallery: keyof typeof galleryAssets }> = {
    // LG Dual Inverter (IDs 1-7)
    1: { hero: '/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp', gallery: 'lg-dual' },
    2: { hero: '/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp', gallery: 'lg-dual' },
    3: { hero: '/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp', gallery: 'lg-dual' },
    4: { hero: '/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp', gallery: 'lg-dual' },
    5: { hero: '/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp', gallery: 'lg-dual' },
    6: { hero: '/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp', gallery: 'lg-dual' },
    7: { hero: '/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp', gallery: 'lg-dual' },

    // LG Universal Fit (IDs 8-10)
    8: { hero: '/assets/window-unit-images/lg-universal-fit-unit-photos-1600x1000/LW8023HRSM.webp', gallery: 'lg-universal' },
    9: { hero: '/assets/window-unit-images/lg-universal-fit-unit-photos-1600x1000/LW1823HRSM.webp', gallery: 'lg-universal' },
    10: { hero: '/assets/window-unit-images/lg-universal-fit-unit-photos-1600x1000/LW2423HRSM.webp', gallery: 'lg-universal' },

    // LG Base (Standard) (IDs 11-12)
    11: { hero: '/assets/window-unit-images/lg-base-standard-units/lg-base-standard-lw8024rd-front-1600x1000.webp', gallery: 'lg-base' },
    12: { hero: '/assets/window-unit-images/lg-base-standard-units/lg-base-standard-lw8024rd-front-1600x1000.webp', gallery: 'lg-base' },

    // GE Performance (IDs 13-15)
    13: { hero: '/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-performance-series-front-1600x1000.webp', gallery: 'ge-pro' },
    14: { hero: '/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-performance-series-front-1600x1000.webp', gallery: 'ge-pro' },
    15: { hero: '/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-performance-series-front-1600x1000.webp', gallery: 'ge-pro' },

    // GE Wall Case (ID 16)
    16: { hero: '/assets/window-unit-images/ge-units/rab26a-ge-lg-universal-casement-slider-1600x1000/RAB26A.webp', gallery: 'ge-sleeve' },
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
