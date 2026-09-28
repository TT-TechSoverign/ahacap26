import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Mini Split Remote Control Not Working? Troubleshooting Oahu | Affordable Home A/C'
    },
    description: 'Mini split not responding to remote control? Test infrared transmitters, reset child locks, locate emergency manual run buttons, or get $175 receiver board diagnosis in Oahu. CT-36775 licensed.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/mini-split-remote-control-not-working',
    },
    openGraph: {
        title: 'Mini Split Remote Control Not Working? Troubleshooting Oahu | Affordable Home A/C',
        description: 'Mini split not responding to remote control? Test infrared transmitters, reset child locks, locate emergency manual run buttons, or get $175 receiver board diagnosis in Oahu. CT-36775 licensed.',
        url: 'https://www.affordablehome-ac.com/mini-split-remote-control-not-working',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'Mini Split Remote Control Troubleshooting Oahu Hawaii',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Mini Split Remote Control Not Working? Troubleshooting Oahu | Affordable Home A/C',
        description: 'Mini split not responding to remote control? Test infrared transmitters, reset child locks, locate emergency manual run buttons, or get $175 receiver board diagnosis in Oahu. CT-36775 licensed.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
};

const remoteFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How can I test if my mini split remote is actually emitting an infrared signal?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Open your smartphone camera, point the top infrared diode of the remote directly into the camera lens, and press any button. If the remote is working, you will see a bright purple/white pulsing light on your phone screen that is invisible to the naked human eye."
            }
        },
        {
            "@type": "Question",
            "name": "How do I turn on my mini split if the remote is completely dead or lost?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Lift open the front plastic intake grille of the indoor air handler. On the right-hand side, look for a small recessed button labeled 'Emergency Operation,' 'Auto,' or 'Manual Run.' Pressing this button will force the unit to run in standard cooling mode at 72°F."
            }
        },
        {
            "@type": "Question",
            "name": "What if the remote emits IR light but the mini split still doesn't beep or turn on?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "This usually indicates a failed infrared receiver photo-diode on the indoor display printed circuit board (PCB) or a loss of low-voltage DC communication from the main control board. Our $175 diagnostic service pinpoints board-level faults."
            }
        }
    ]
};

export default function RemoteNotWorkingLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(remoteFaqSchema) }}
            />
            {children}
        </>
    );
}
