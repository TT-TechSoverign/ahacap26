import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: '$50 Oahu Window AC Delivery Service | Waipahu Warehouse Direct',
    },
    description: 'Flat $50 Window AC delivery across 15 Oahu municipalities from our Waipahu warehouse ($395–$1,200 LG & GE units in stock). $0 Estimate • (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/window-ac-delivery-service-oahu',
    },
    openGraph: {
        title: '$50 Oahu Window AC Delivery Service | Waipahu Warehouse Direct',
        description: 'Flat $50 Window AC delivery across 15 Oahu municipalities from our Waipahu warehouse ($395–$1,200 LG & GE units in stock). $0 Estimate • (808) 488-1111.',
        url: 'https://www.affordablehome-ac.com/window-ac-delivery-service-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp',
                width: 1600,
                height: 1000,
                alt: 'Oahu Flat-Rate $50 Window AC Delivery Service from Waipahu Warehouse',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: '$50 Oahu Window AC Delivery Service | Waipahu Warehouse Direct',
        description: 'Flat $50 Window AC delivery across 15 Oahu municipalities from our Waipahu warehouse ($395–$1,200 LG & GE units in stock). $0 Estimate • (808) 488-1111.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp'],
    },
};

const deliveryFaqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'How much does window AC delivery cost on Oahu and which areas are covered?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'We charge a flat $50 delivery fee across 15 primary Oahu residential municipalities — including Waipahu, Kapolei, Ewa Beach, Pearl City, Aiea, Mililani, Kunia, Salt Lake, Honolulu, Makiki, Manoa, Kaimuki, Hawaii Kai, Kailua, and Kaneohe. Standard $50 curbside delivery excludes North Shore, Waianae, Waikiki, and Waimanalo (customers in those areas can use Free Waipahu Warehouse Pickup by appointment at 94-150 Leoleo St #203).',
            },
        },
        {
            '@type': 'Question',
            name: 'How quickly is an in-stock LG or GE window AC delivered?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Units in stock at our Waipahu warehouse are typically dispatched within 24 to 48 hours after online checkout. Our dispatch desk calls you directly to confirm a convenient 2-hour arrival window.',
            },
        },
        {
            '@type': 'Question',
            name: 'How do I schedule installation if I also want my new window AC mounted?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'We never bundle hidden installation fees at checkout. Simply request a $0 Free In-Home Estimate by appointment on our Window AC Installation page or call (808) 488-1111 — our Oahu cooling specialists lay protective floor drop cloths and provide an upfront itemized quote for your exact jalousie, slider, or 26-inch wall sleeve opening.',
            },
        },
        {
            '@type': 'Question',
            name: 'Can I pick up my window AC for free at your Waipahu warehouse instead?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. Warehouse pickup at 94-150 Leoleo St. #203, Waipahu, HI 96797 is 100% free ($0) by appointment, and our team loads the factory-sealed carton upright into your truck, van, or SUV.',
            },
        },
    ],
};

const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.affordablehome-ac.com' },
        { '@type': 'ListItem', position: 2, name: 'Oahu Window AC Shop', item: 'https://www.affordablehome-ac.com/shop' },
        { '@type': 'ListItem', position: 3, name: '$50 Oahu Window AC Delivery Service', item: 'https://www.affordablehome-ac.com/window-ac-delivery-service-oahu' },
    ],
};

const deliveryServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://www.affordablehome-ac.com/window-ac-delivery-service-oahu#service',
    name: '$50 Flat-Rate Oahu Window AC Delivery Service (Waipahu Warehouse Direct)',
    serviceType: 'Window Air Conditioner Local Delivery & Fulfillment',
    url: 'https://www.affordablehome-ac.com/window-ac-delivery-service-oahu',
    image: [
        'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp',
        'https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp',
    ],
    description: 'Flat $50 upright HVAC delivery across 15 Oahu residential municipalities from our Waipahu warehouse (excludes North Shore, Waianae, Waikiki & Waimanalo).',
    provider: {
        '@type': 'HVACBusiness',
        '@id': 'https://www.affordablehome-ac.com/window-ac-delivery-service-oahu#localbusiness',
        parentOrganization: { '@id': 'https://www.affordablehome-ac.com/#hvacbusiness' },
        name: 'Affordable Home A/C',
        image: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp',
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            reviewCount: '142',
            bestRating: '5',
            worstRating: '1',
        },
        url: 'https://www.affordablehome-ac.com',
        telephone: '+1-808-488-1111',
        priceRange: '$395 - $1,200',
        slogan: 'Waipahu Warehouse Direct • Insured Oahu Cooling Specialists • Est. 2005',
        address: {
            '@type': 'PostalAddress',
            streetAddress: '94-150 Leoleo St. #203',
            addressLocality: 'Waipahu',
            addressRegion: 'HI',
            postalCode: '96797',
            addressCountry: 'US',
        },
    },
    areaServed: { '@type': 'AdministrativeArea', name: 'Oahu, Hawaii' },
    hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Oahu Window AC Fulfillment Options',
        itemListElement: [
            {
                '@type': 'Offer',
                itemOffered: { '@type': 'Service', name: 'Flat-Rate Oahu Curbside Delivery (15 Covered Municipalities)' },
                price: '50.00',
                priceCurrency: 'USD',
            },
            {
                '@type': 'Offer',
                itemOffered: { '@type': 'Service', name: 'Waipahu Warehouse Pickup by Appointment (94-150 Leoleo St #203)' },
                price: '0.00',
                priceCurrency: 'USD',
            },
        ],
    },
};

export default function WindowAcDeliveryServiceLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(deliveryFaqSchema).replace(/</g, '\\u003c') }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(deliveryServiceSchema).replace(/</g, '\\u003c') }}
            />
            {children}
        </>
    );
}
