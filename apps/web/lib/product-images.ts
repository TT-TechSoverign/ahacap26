
export const imageMap: { [key: string]: string[] } = {
    'ge': [
        '/assets/window-unit-images/ge-units/ge-front-full-1.jpg',
        '/assets/window-unit-images/ge-units/ge-front-left-closeup-2.jpg',
        '/assets/window-unit-images/ge-units/ge-remote-3.jpg',
    ],
    'lg-dual': [
        '/assets/window-unit-images/lg-units/LG LW6023IVS-front.webp',
        '/assets/window-unit-images/lg-units/LG LW6023IVSM-front-lcd.webp',
        '/assets/window-unit-images/lg-units/LG LW6023IVSM-front-left-facing.webp',
        '/assets/window-unit-images/lg-units/LG LW6023IVSM-front-rt-facing.webp',
        '/assets/window-unit-images/lg-units/LG LW6023IVSM-full-side.webp',
        '/assets/window-unit-images/lg-units/LG LW6023IVSM-remote.jpg.webp',
    ],
    'lg-smart': [
        '/assets/window-unit-images/lg-units/LG LW8023HRSM-front.jpg',
        '/assets/window-unit-images/lg-units/LG LW8023HRSM-front-lcd.jpg',
        '/assets/window-unit-images/lg-units/LG LW8023HRSM-front-left-facing.jpg',
        '/assets/window-unit-images/lg-units/LG LW8023HRSM-front-rt-facing.jpg',
        '/assets/window-unit-images/lg-units/LG LW8023HRSM-full-side.jpg',
        '/assets/window-unit-images/lg-units/LG LW8023HRSM-full-top.jpg',
    ]
};

export const getProductImages = (pid: number) => {
    if (pid >= 1 && pid <= 3) return imageMap['ge'];
    if (pid >= 4 && pid <= 10) return imageMap['lg-dual'];
    if (pid >= 11 && pid <= 13) return imageMap['lg-smart'];
    return [];
};
