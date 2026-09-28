import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'No Power to AC Unit in Hawaii? Breaker & Disconnect Checks | Affordable Home A/C'
    },
    description: 'AC unit completely dead with no power or display lights in Hawaii? Check circuit breakers, outdoor disconnect switches, float switches, and LCDI plugs. CT-36775 licensed.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/no-power-to-ac-unit-hawaii',
    },
    openGraph: {
        title: 'No Power to AC Unit in Hawaii? Breaker & Disconnect Checks | Affordable Home A/C',
        description: 'AC unit completely dead with no power or display lights in Hawaii? Check circuit breakers, outdoor disconnect switches, float switches, and LCDI plugs. CT-36775 licensed.',
        url: 'https://www.affordablehome-ac.com/no-power-to-ac-unit-hawaii',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'No Power to AC Unit Hawaii Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'No Power to AC Unit in Hawaii? Breaker & Disconnect Checks | Affordable Home A/C',
        description: 'AC unit completely dead with no power or display lights in Hawaii? Check circuit breakers, outdoor disconnect switches, float switches, and LCDI plugs. CT-36775 licensed.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
};

const noPowerFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Why is my air conditioner completely dead with no display lights or sound?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "When an AC has zero power, the most common causes are a tripped 2-pole circuit breaker in your electrical service panel, a blown low-voltage fuse on the indoor control board, a tripped condensate overflow safety switch, or a blown fuse inside the outdoor disconnect box."
            }
        },
        {
            "@type": "Question",
            "name": "How does a clogged drain line cause the AC to lose all power?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Modern mini split systems and high-efficiency window units incorporate a float safety switch. When water backs up in the drain pan, the switch floats upward and cuts the 24V or 12V control circuit, killing all power to prevent water damage to your drywall."
            }
        },
        {
            "@type": "Question",
            "name": "What should I do if the circuit breaker trips immediately when I reset it?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Never force a breaker to stay in the ON position or repeatedly reset it. An instantaneous trip signifies a hard direct short to ground in the compressor windings, an inverter power transistor failure, or a melted electrical whip."
            }
        }
    ]
};

export default function NoPowerAcLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(noPowerFaqSchema) }}
            />
            {children}
        </>
    );
}
