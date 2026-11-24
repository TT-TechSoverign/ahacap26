'use client';

import React from 'react';
import { OahuPillarPageBody, OahuPillarPageProps } from '@/components/OahuPillarPageBody';

const PAGE_DATA: OahuPillarPageProps = {
    breadcrumbs: [
        { name: 'Shop Window ACs', href: '/shop' },
        { name: 'In-Stock LG Window ACs Oahu' },
    ],
    badge: 'Waipahu Warehouse On-Island Stock • Zero Mainland Freight Wait',
    h1Main: 'In-Stock LG Window ACs on Oahu',
    h1Highlight: 'All 12 Waipahu Models ($395–$1,200)',
    leadParagraph:
        'Finding genuine factory-sealed LG Dual Inverter, LG Cool+Heat, and LG Standard window air conditioners physically on Oahu can be difficult when mainland online listings either decline Hawaii ocean shipping or take weeks in transit. At Affordable Home A/C, we warehouse all 12 LG capacities (6,000 to 23,500 BTU) right here at 94-150 Leoleo St. #203 in Waipahu — ready for free local pickup by appointment, $50 flat-rate Oahu delivery, or $0 Free Estimate installation.',
    primaryCta: {
        label: 'Browse Live LG Inventory & Stock Counts',
        href: '/shop',
    },
    phoneEventLabel: 'In-Stock LG Oahu Hub Call',
    table: {
        id: 'oahu-12-model-lg-inventory-matrix',
        eyebrow: 'COMPLETE 12-MODEL LG WAIPAHU SPECIFICATION LEDGER',
        heading: 'Every LG Window AC Series Stocked on Oahu Side-by-Side',
        intro: 'Compare all 12 LG models across our Dual Inverter ($45 Hawaii Energy Rebate), Universal Fit Cool+Heat, and Standard Gold Fin series — including exact electrical plugs, window opening minimums, and Island Microclimate™ room sizing:',
        caption: 'Master specification table of all 12 LG window air conditioners carried at Affordable Home A/C in Waipahu, Oahu.',
        columns: [
            'LG Model & MPN',
            'Waipahu Price & Rebate',
            'Oahu Real Sq. Ft.',
            'Plug / Voltage',
            'Window Min (W x H)',
            'Sound / CEER',
        ],
        rows: [
            {
                rowHeader: 'LG 6,000 BTU Dual Inv (LW6023IVSM)',
                cells: ['$560 ($515 net w/ $45 Rebate)', 'Up to 220 sq. ft. (260 AHAM)', '115V / 15A (5-15P)', '22"W x 13"H', '44 dB • 15.5 CEER'],
                highlight: false,
            },
            {
                rowHeader: 'LG 8,000 BTU Dual Inv (LW8022IVSM)',
                cells: ['$595 ($550 net w/ $45 Rebate)', 'Up to 280 sq. ft. (350 AHAM)', '115V / 15A (5-15P)', '22"W x 13"H', '44 dB • 15.5 CEER'],
                highlight: false,
            },
            {
                rowHeader: 'LG 10,000 BTU Dual Inv (LW1022IVSM)',
                cells: ['$650 ($605 net w/ $45 Rebate)', 'Up to 330 sq. ft. (450 AHAM)', '115V / 15A (5-15P)', '22"W x 13"H', '44 dB • 15.0 CEER'],
                highlight: true,
            },
            {
                rowHeader: 'LG 12,000 BTU Dual Inv (LW1222IVSM)',
                cells: ['$745 ($700 net w/ $45 Rebate)', 'Up to 380 sq. ft. (550 AHAM)', '115V / 15A (5-15P)', '27"W x 16"H', '44 dB • 15.0 CEER'],
                highlight: true,
            },
            {
                rowHeader: 'LG 14,000 BTU Dual Inv (LW1522FVSM)',
                cells: ['$785 ($740 net w/ $45 Rebate)', 'Up to 450 sq. ft. (700 AHAM)', '115V / 15A (5-15P)', '27"W x 16"H', '44 dB • 15.0 CEER'],
                highlight: true,
            },
            {
                rowHeader: 'LG 18,000 BTU Dual Inv (LW1822IVSM)',
                cells: ['$925 ($880 net w/ $45 Rebate)', 'Up to 600 sq. ft. (1,000 AHAM)', '208/230V 15A (6-15P)', '29"W x 18"H', '44 dB • 14.7 CEER'],
                highlight: false,
            },
            {
                rowHeader: 'LG 23,500 BTU Dual Inv (LW2422IVSM)',
                cells: ['$1,025 ($980 net w/ $45 Rebate)', 'Up to 900 sq. ft. (1,500 AHAM)', '208/230V 15A (6-15P)', '29"W x 18"H', '47 dB • 14.5 CEER'],
                highlight: false,
            },
            {
                rowHeader: 'LG 7,600 BTU Cool+Heat (LW8023HRSM)',
                cells: ['$650 (Dual Climate • No Rebate)', 'Up to 220 sq. ft. (330 AHAM)', '115V / 15A (5-15P)', '22"W x 13"H', '52 dB • 11.0 CEER'],
                highlight: false,
            },
            {
                rowHeader: 'LG 18,000 BTU Cool+Heat (LW1823HRSM)',
                cells: ['$925 (Cool+Heat • 26" Univ Fit)', 'Up to 600 sq. ft. (1,000 AHAM)', '208/230V 20A (6-20P)', '29"W / 26" Sleeve', '54 dB • 10.9 CEER'],
                highlight: false,
            },
            {
                rowHeader: 'LG 23,000 BTU Cool+Heat (LW2423HRSM)',
                cells: ['$1,200 (Cool+Heat • 26" Univ Fit)', 'Up to 850 sq. ft. (1,400 AHAM)', '208/230V 20A (6-20P)', '29"W / 26" Sleeve', '55 dB • 10.4 CEER'],
                highlight: false,
            },
            {
                rowHeader: 'LG 8,000 BTU Standard (LW8024RD)',
                cells: ['$395 (Lowest Oahu Entry Price)', 'Up to 250 sq. ft. (350 AHAM)', '115V / 15A (5-15P)', '22"W x 13"H', '52 dB • 12.0 CEER'],
                highlight: false,
            },
            {
                rowHeader: 'LG 12,000 BTU Standard WiFi (LW1217ERSM1)',
                cells: ['$625 (115V ThinQ Value)', 'Up to 380 sq. ft. (550 AHAM)', '115V / 15A (5-15P)', '27"W x 16"H', '52 dB • 12.0 CEER'],
                highlight: false,
            },
        ],
        footnote:
            'Only the 7 ENERGY STAR certified LG Dual Inverter models (LW6023IVSM through LW2422IVSM) qualify for the $45 Hawaii Energy cash rebate. Live per-unit Waipahu stock quantities update in real time on /shop.',
    },
    deepDiveEyebrow: 'WHY OAHU HOMEOWNERS CHOOSE ON-ISLAND LG INVENTORY',
    deepDiveHeading: '4 Advantages of Buying LG Direct from Our Waipahu Warehouse',
    deepDiveIntro:
        'When an Oahu bedroom or living room AC fails during trade-wind lulls or Kona humidity, waiting weeks for ocean freight is not an option. Here is how our local Waipahu LG staging solves every step:',
    cards: [
        {
            code: '01',
            title: 'Physically On Oahu Today — Zero Mainland Freight Uncertainty',
            paragraphs: [
                'Many mainland e-commerce marketplaces display LG Dual Inverter models online until checkout, only to restrict Hawaii zip codes or quote multi-week ocean container transit with high freight damage rates.',
                'Every in-stock LG unit on our site is already inspected, factory-sealed, and staged on pallets inside our Waipahu distribution center (94-150 Leoleo St. #203). Reserve online for free pickup by appointment or $50 flat-rate Oahu delivery.',
            ],
            bullets: [
                'Pre-inspected factory-sealed cartons in Waipahu, HI 96797',
                'Same-day / next-day appointment pickup or $50 Oahu delivery',
            ],
        },
        {
            code: '02',
            title: 'Up to 14,000 BTU (LW1522FVSM) on a Standard 115V Wall Outlet',
            paragraphs: [
                'Older Oahu single-wall homes in Kaimuki, Kaneohe, Pearl City, and Waipahu rarely have dedicated 230V circuits in living areas. Traditional 14k+ BTU window units forced homeowners into costly electrical panel upgrades.',
                'LG engineered the Dual Inverter 14,000 BTU LW1522FVSM ($785, or $740 net after the $45 Hawaii Energy Rebate) to run safely on a normal 115V / 15-Amp 3-prong household plug while cooling up to 450 sq. ft. of uninsulated Hawaii space.',
            ],
            bullets: [
                '5 Dual Inverter capacities (6k, 8k, 10k, 12k & 14k) use 115V plugs',
                '18k & 23.5k models use 208/230V (licensed electrician referral available)',
            ],
        },
        {
            code: '03',
            title: '44 dB Whisper-Quiet Sleep Mode & HECO 44.2¢/kWh Relief',
            paragraphs: [
                'Conventional fixed-speed rotary compressors slam on and off with a jarring metallic thump all night. LG Dual Inverter twin-rotary compressors ramp smoothly down to 25% output once your room reaches set temperature — operating as quiet as 44 dB (library quiet).',
                'At Hawaiian Electric’s ~44.2¢/kWh residential rate, that variable-speed 14.5–15.5 CEER efficiency cuts cooling electricity consumption by up to 40% (~$424.32/yr savings) and unlocks the $45 Hawaii Energy cash rebate.',
            ],
            bullets: [
                'Official AHAC Version 4 $45 Hawaii Energy Rebate PDF included on IDs 1–7',
                'Built-in LG ThinQ® WiFi app scheduling & real-time kWh tracking',
            ],
        },
        {
            code: '04',
            title: 'Gold Fin™ Salt-Air Shield & Custom Hawaiian Jalousie Installation',
            paragraphs: [
                'Salt-laden trade winds in Kailua, Ewa Beach, Hawaii Kai, and Waianae rapidly pit bare aluminum condenser fins. LG’s anti-corrosive Gold Fin™ condenser coating extends heat-exchanger life in coastal Oahu microclimates.',
                'Need turnkey installation? Request a $0 Free In-Home Estimate (By Appointment First, zero upfront payment). Our technicians custom-fit LG chassis into Hawaiian jalousie glass louvers, horizontal sliders, and wood sash frames with mandatory floor drop-cloth protection.',
            ],
            bullets: [
                '$0 Free In-Home Estimate with zero upfront deposit barrier',
                '6 & 12-month on-site antimicrobial coil cleaning support across Oahu',
            ],
        },
    ],
    checklist: {
        eyebrow: '60-SECOND OAHU LG BUYER CHECKLIST',
        heading: 'How to Reserve the Exact Right LG Unit Today',
        description:
            'Confirm these four quick details before checking out online — or call our Waipahu team at (808) 488-1111 and we will verify your window and outlet in two minutes:',
        items: [
            'Check your mounting opening: Window frames (jalousie, slider, double-hung) fit all LG Dual Inverter & Standard units; solid 26-inch concrete condo wall sleeves require GE AJCQ Built-In or LG 18k/23k Universal Fit.',
            'Measure clear window width: 22"+ fits 6k, 8k & 10k LG models; 27"+ fits 12k & 14k LG models; 29"+ fits 18k & 23.5k LG models.',
            'Verify outlet prongs: Standard 3-prong 115V (NEMA 5-15R) supports up to 14,000 BTU (LW1522FVSM); 18k–23.5k units require 208/230V (NEMA 6-15R or 6-20R).',
            'Choose fulfillment at checkout: Free ($0) Waipahu Warehouse Pickup by Appointment or $50 flat-rate Oahu curbside delivery.',
        ],
        relatedLinks: [
            { label: 'LG Dual Inverter Deep-Dive Guide', href: '/shop/lg-dual-inverter-guide' },
            { label: 'LG vs. GE Window & 26" Wall AC Guide', href: '/shop/lg-vs-ge-window-ac-hawaii' },
            { label: 'LG Standard Budget Series ($395–$625)', href: '/shop/lg-standard-budget-window-ac-oahu' },
            { label: '$45 Hawaii Energy Rebate Eligibility', href: '/hawaii-energy-rebate' },
        ],
    },
    faqsHeading: 'In-Stock LG Window AC Oahu FAQs',
    faqs: [
        {
            q: 'Where can I buy an LG Dual Inverter window air conditioner in stock on Oahu today?',
            a: 'Affordable Home A/C stocks factory-sealed LG Dual Inverter, LG Cool+Heat, and LG Standard window air conditioners ($395 to $1,200) directly at our central Waipahu warehouse (94-150 Leoleo St. #203, Waipahu, HI 96797). Order online at affordablehome-ac.com/shop or call (808) 488-1111 for free Waipahu pickup by appointment or $50 flat-rate Oahu delivery—with zero multi-week mainland freight delays.',
        },
        {
            q: 'Which LG window ACs in your Waipahu warehouse plug into a normal 115V household outlet?',
            a: "Eight of our twelve LG models run on a standard 115V / 15-Amp 3-prong wall outlet (NEMA 5-15P) with zero 230V electrical rewiring: the LG Dual Inverter 6k (LW6023IVSM), 8k (LW8022IVSM), 10k (LW1022IVSM), 12k (LW1222IVSM), and 14k (LW1522FVSM — Oahu's highest-capacity 115V unit), plus the LG 7.6k Cool+Heat (LW8023HRSM) and LG Standard 8k (LW8024RD) and 12k (LW1217ERSM1).",
        },
        {
            q: 'Which LG window ACs qualify for the $45 Hawaii Energy cash rebate?',
            a: 'All seven ENERGY STAR certified LG Dual Inverter models (LW6023IVSM, LW8022IVSM, LW1022IVSM, LW1222IVSM, LW1522FVSM, LW1822IVSM, and LW2422IVSM) qualify for the $45 Hawaii Energy cash rebate. Standard rotary (LW8024RD, LW1217ERSM1) and Cool+Heat (LW8023HRSM, LW1823HRSM, LW2423HRSM) units do not carry the inverter rebate.',
        },
        {
            q: 'Can your team install my LG window AC into Hawaiian jalousie glass louvers?',
            a: 'Yes. Request a $0 Free In-Home Estimate (By Appointment First, zero upfront deposit) and our insured Oahu cooling specialists will measure your opening, remove necessary jalousie glass slats, fabricate weather-tight infill panels, install exterior support brackets when needed, and protect your floors with drop cloths.',
        },
    ],
    quickShopModelIds: [4, 5, 3, 11],
    quickShopTitle: 'Order Popular In-Stock Waipahu LG Models Online ($395–$785)',
    quickShopSubheading: 'Real-time Waipahu warehouse stock. Free pickup by appointment or $50 flat Oahu delivery.',
    eeatTopicTitle: 'Complete 12-Model In-Stock LG Window AC Oahu Inventory & Buyer Guide',
    reviewsTitle: 'Verified Oahu Homeowner LG Window AC Reviews',
    reviewsSubtitle: 'See why Oahu families choose Waipahu warehouse-direct LG Dual Inverter & Standard units',
};

export default function InStockLgWindowAcOahuPage() {
    return (
        <main className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[92px] md:pt-[180px] pb-36 lg:pb-24">
            <OahuPillarPageBody {...PAGE_DATA} />
        </main>
    );
}
