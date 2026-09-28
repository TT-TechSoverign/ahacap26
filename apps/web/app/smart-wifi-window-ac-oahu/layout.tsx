import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Smart Wi-Fi Window AC Oahu | LG ThinQ Remote Control | Affordable Home A/C'
    },
    description: 'Control your room temperature from anywhere on Oahu with smart Wi-Fi enabled LG Dual Inverter window air conditioners. Pre-cool your home before driving home from Honolulu. In stock in Waipahu.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/smart-wifi-window-ac-oahu',
    },
    openGraph: {
        title: 'Smart Wi-Fi Window AC Oahu | LG ThinQ Remote Control | Affordable Home A/C',
        description: 'Control your room temperature from anywhere on Oahu with smart Wi-Fi enabled LG Dual Inverter window air conditioners. Pre-cool your home before driving home from Honolulu. In stock in Waipahu.',
        url: 'https://www.affordablehome-ac.com/smart-wifi-window-ac-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'Smart WiFi Window AC Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Smart Wi-Fi Window AC Oahu | LG ThinQ Remote Control | Affordable Home A/C',
        description: 'Control your room temperature from anywhere on Oahu with smart Wi-Fi enabled LG Dual Inverter window air conditioners. Pre-cool your home before driving home from Honolulu. In stock in Waipahu.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
};

const smartWifiFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How does Wi-Fi smartphone control work on a window AC?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "LG Dual Inverter smart models connect directly to your home's 2.4 GHz Wi-Fi network. Using the free LG ThinQ mobile app on iOS or Android, you can power your unit on, adjust temperatures, change fan speeds, and set timers from anywhere on Oahu or across the world."
            }
        },
        {
            "@type": "Question",
            "name": "Can I connect the smart window AC to Google Assistant or Amazon Alexa?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! LG ThinQ integrates with Google Assistant and Amazon Alexa, allowing you to control your room cooling with voice commands like 'Hey Google, set bedroom AC to 72 degrees.'"
            }
        },
        {
            "@type": "Question",
            "name": "How does smart Wi-Fi scheduling help lower HECO electric bills?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "With smart scheduling, you can set your AC to turn off automatically when you leave for work in the morning and turn back on 15 minutes before you return, eliminating 8 to 10 hours of unnecessary daytime power consumption."
            }
        }
    ]
};

export default function SmartWifiAcLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(smartWifiFaqSchema) }}
            />
            {children}
        </>
    );
}
