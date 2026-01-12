import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./context/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "primary": "#00AEEF", // Keeping consistent with Landing Page Blue
                "accent": "#39B54A",
                "background-light": "#f5f8f8",
                "background-dark": "#0b1120", // Landing Page Dark
                "surface-dark": "#161b22", // New Shop Surface
                "border-dark": "#2d333b",  // New Shop Border
                "charcoal": "#1a1f2e",
                // Keeping legacy matches just in case, but mapped effectively
                navy: "#0b1120",
                cyan: "#00AEEF",
            },
            fontFamily: {
                "display": ["var(--font-inter)", "sans-serif"],
                "header": ["var(--font-oswald)", "sans-serif"],
                "sans": ["var(--font-inter)", "sans-serif"], // Default fallback
            },
            borderRadius: {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "full": "9999px"
            },
            boxShadow: {
                'glow': '0 0 20px rgba(0, 174, 239, 0.15)',
            }
        },
    },
    plugins: [],
};
export default config;
