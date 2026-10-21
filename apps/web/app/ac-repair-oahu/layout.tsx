import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Window AC Repair & Troubleshooting Oahu | $0 Clean-vs-Replace Estimate | Affordable Home A/C'
    },
    description: 'LG or GE window AC blowing warm air, leaking water, or tripping breakers on Oahu? Book a $0 Clean-vs-Replace assessment, deep coil cleaning, or same-day Waipahu replacement ($395–$1,200). Call (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/ac-repair-oahu',
    },
    openGraph: {
        title: 'Window AC Repair & Troubleshooting Oahu | $0 Clean-vs-Replace Estimate | Affordable Home A/C',
        description: 'LG or GE window AC blowing warm air, leaking water, or tripping breakers on Oahu? Book a $0 Clean-vs-Replace assessment, deep coil cleaning, or same-day Waipahu replacement ($395–$1,200). Call (808) 488-1111.',
        url: 'https://www.affordablehome-ac.com/ac-repair-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'Window AC Repair & Clean-vs-Replace Assessment Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Window AC Repair & Troubleshooting Oahu | $0 Clean-vs-Replace Estimate | Affordable Home A/C',
        description: 'LG or GE window AC blowing warm air, leaking water, or tripping breakers on Oahu? Book a $0 Clean-vs-Replace assessment, deep coil cleaning, or same-day Waipahu replacement ($395–$1,200). Call (808) 488-1111.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
};

export default function AcRepairOahuLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

