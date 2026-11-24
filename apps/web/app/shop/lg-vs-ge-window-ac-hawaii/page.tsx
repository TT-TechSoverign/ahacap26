'use client';

import React from 'react';
import { OahuPillarPageBody, OahuPillarPageProps } from '@/components/OahuPillarPageBody';

const PAGE_DATA: OahuPillarPageProps = {
    breadcrumbs: [
        { name: 'Shop Window ACs', href: '/shop' },
        { name: 'LG vs. GE Window & Wall AC Comparison' },
    ],
    badge: 'Waipahu Engineering Comparison • Window Opening vs. 26" Condo Wall Sleeve',
    h1Main: 'LG vs. GE Air Conditioners Hawaii',
    h1Highlight: 'Window Sash vs. 26" Condo Sleeve Guide',
    leadParagraph:
        'We exclusively stock LG and GE at our Waipahu warehouse because each brand dominates a distinct Hawaii architectural application. Use this engineering breakdown to avoid the #1 costly condo mistake (putting a side-vented window unit inside a solid concrete wall sleeve) and select the quietest, lowest-kWh unit for your exact Oahu room.',
    primaryCta: {
        label: 'Compare All 16 LG & GE Models Live',
        href: '/shop',
    },
    phoneEventLabel: 'LG vs GE Guide Call',
    table: {
        id: 'lg-vs-ge-hawaii-engineering-table',
        eyebrow: 'HEAD-TO-HEAD ARCHITECTURAL & EFFICIENCY MATRIX',
        heading: 'LG Dual Inverter vs. LG Cool+Heat vs. GE 26" Built-In',
        intro: 'Compare airflow ventilation geometry, Oahu acoustic ratings, HECO efficiency, manufacturer warranty terms, and $45 Hawaii Energy rebate eligibility across all four product families stocked in Waipahu:',
        caption: 'Engineering comparison of LG Dual Inverter, LG Universal Fit Cool+Heat, LG Standard, and GE AJCQ 26-inch Built-In air conditioners.',
        columns: [
            'Product Family',
            'Mounting Opening',
            'Condenser Airflow',
            'Noise & CEER',
            'Factory Warranty',
            'Price & $45 Rebate',
        ],
        rows: [
            {
                rowHeader: 'LG Dual Inverter (6k–23.5k BTU)',
                cells: [
                    'Jalousie, Slider & Sash Windows',
                    'Side + Top Louvers (Must Clear Wall)',
                    '44–47 dB • 14.5–15.5 CEER',
                    '1-Yr Parts & Labor (10-Yr Comp)',
                    '$560–$1,025 (All 7 Get $45 Rebate)',
                ],
                highlight: true,
            },
            {
                rowHeader: 'GE AJCQ12AXXWA 12k R-32 Inv',
                cells: [
                    'True 26" Thru-the-Wall Condo Sleeve',
                    '100% Rear-Breathing Solid Sides',
                    '48 dB Quiet • 10.5 CEER',
                    '2-Yr Full / 5-Yr Sealed System',
                    '$1,200 (Qualifies for $45 Rebate)',
                ],
                highlight: true,
            },
            {
                rowHeader: 'GE AJCQ08AWJ / AJCQ10AWJ',
                cells: [
                    'True 26" Thru-the-Wall Condo Sleeve',
                    '100% Rear-Breathing Solid Sides',
                    '54–55 dB • 10.6 CEER',
                    '2-Yr Full / 5-Yr Sealed System',
                    '$1,000–$1,100 (Standard Rotary)',
                ],
                highlight: false,
            },
            {
                rowHeader: 'LG Cool + Heat (18k & 23k HRSM)',
                cells: [
                    'Large Windows or 26" Wall Sleeves',
                    'Universal Fit Slide-Out Chassis',
                    '54–55 dB • 10.4–10.9 CEER',
                    '1-Yr Parts & Labor',
                    '$925–$1,200 (230V NEMA 6-20P)',
                ],
                highlight: false,
            },
            {
                rowHeader: 'LG Standard Gold Fin (8k & 12k)',
                cells: [
                    'Jalousie, Slider & Sash Windows',
                    'Side + Top Louvers (Window Mount)',
                    '52 dB • 12.0 CEER',
                    '1-Yr Parts & Labor',
                    '$395–$625 (Best Budget 115V Value)',
                ],
                highlight: false,
            },
        ],
        footnote:
            'Need a replacement metal wall box for a rusted Honolulu condo cutout? We also stock the heavy-gauge galvanized steel GE RAB26A 26-inch wall sleeve ($275) in Waipahu.',
    },
    deepDiveEyebrow: 'OAHU WINDOW VS. CONDO WALL SLEEVE PHYSICS',
    deepDiveHeading: '4 Rules That Decide Between LG and GE in Hawaii',
    deepDiveIntro:
        'Before comparing BTU numbers or WiFi apps, inspect the wall or window where your air conditioner sits. These four engineering rules prevent overheating, AOAO violations, and excess HECO bills:',
    cards: [
        {
            code: '01',
            title: 'Rule #1: Side-Vented Window Chassis vs. Rear-Breathing 26" Sleeve',
            paragraphs: [
                'LG Dual Inverter and LG Standard window units pull cool outdoor air through side cabinet louvers and exhaust heat out the rear. When mounted in a window frame (jalousie, slider, or double-hung), those side louvers project cleanly outdoors.',
                'Inside a 16-to-20-inch-deep concrete condo wall sleeve in Waikiki, Ala Moana, Makiki, or Salt Lake, solid wall concrete covers side louvers — suffocating a window AC. GE AJCQ Built-In units feature unperforated solid steel sides and dedicated rear intake/exhaust Divider Baffles engineered specifically for 26-inch sleeves.',
            ],
            bullets: [
                'Window opening -> Choose LG Dual Inverter or LG Standard',
                'Enclosed 26" wall sleeve -> Choose GE AJCQ Built-In (+ RAB26A sleeve if rusted)',
            ],
        },
        {
            code: '02',
            title: 'Rule #2: Acoustic & HECO Efficiency Winner in Windows — LG Dual Inverter',
            paragraphs: [
                'When your opening is a window rather than a wall sleeve, LG Dual Inverter wins on acoustics, energy savings, and price. Its twin-rotary variable-speed compressor whispers at 44 dB on low and achieves up to 15.5 CEER.',
                'At HECO’s ~44.2¢/kWh electricity rate, upgrading a single-wall Oahu bedroom or living room to an LG Dual Inverter (such as the 12k LW1222IVSM at $745 or 14k 115V LW1522FVSM at $785) saves up to 40% on cooling kWh and earns the $45 Hawaii Energy rebate.',
            ],
            bullets: [
                '44 dB sleep mode + LG ThinQ® smartphone energy monitoring',
                'Gold Fin™ anti-corrosion condenser coating for coastal Oahu air',
            ],
        },
        {
            code: '03',
            title: 'Rule #3: Quiet Condo Wall-Sleeve Breakthrough — GE AJCQ12AXXWA R-32 Inverter',
            paragraphs: [
                'Historically, Honolulu condo owners with 26-inch wall sleeves were stuck with loud fixed-speed 230V wall units. GE solved both pain points with the AJCQ12AXXWA ($1,200): a true 26-inch solid-side built-in powered by a variable-speed R-32 inverter (6,100–12,400 BTU/h) on a standard 115V / 15A household plug.',
                'Because it meets ENERGY STAR criteria for through-the-wall units, the GE AJCQ12AXXWA is the ONLY 26-inch condo wall unit in our catalog that qualifies for the $45 Hawaii Energy cash rebate ($1,155 net) while dropping wall-sleeve noise down to 48 dB.',
            ],
            bullets: [
                'Plugs into standard 115V / 15A condo wall receptacles (NEMA 5-15P)',
                'Built-in SmartHQ™ WiFi + 2-Year Full / 5-Year Sealed System GE warranty',
            ],
        },
        {
            code: '04',
            title: 'Rule #4: Upcountry Heating & Rental Budget Scenarios',
            paragraphs: [
                'Live in chilly winter microclimates like Mililani Mauka, Wahiawa, Nuuanu, Tantalus, or upper Manoa? The LG Cool + Heat series (LW8023HRSM 115V, LW1823HRSM 230V, LW2423HRSM 230V) adds electric strip heating alongside summer cooling.',
                'Outfitting a guest bedroom or rental turnover on a tight upfront budget? The LG LW8024RD 8,000 BTU ($395) and LW1217ERSM1 12,000 BTU WiFi ($625) deliver genuine LG Gold Fin reliability at entry-level Waipahu warehouse pricing.',
            ],
            bullets: [
                'Upcountry cool + heat: LG HRSM series ($650–$1,200)',
                'Entry-price window cooling: LG LW8024RD ($395) & LW1217ERSM1 ($625)',
            ],
        },
    ],
    checklist: {
        eyebrow: '2-MINUTE BRAND SELECTION CHECKLIST',
        heading: 'Unsure Whether Your Opening Needs LG or GE?',
        description:
            'Check these four visual cues — or text/call (808) 488-1111 to schedule a $0 Free In-Home Estimate anywhere on Oahu:',
        items: [
            'Look at the sides of your existing unit: If it sits inside a metal box embedded in a solid wall with no glass window sashes, order a GE 26" AJCQ Built-In.',
            'If your unit sits between jalousie glass louvers, sliding glass tracks, or wood/vinyl window sashes where the cabinet sides stick outdoors, order an LG Dual Inverter or LG Standard.',
            'Check your wall outlet: Standard 3 parallel/vertical blades = 115V 15A (fits LG up to 14k BTU & all 3 GE AJCQ models); tandem/T-blade = 208/230V (fits LG 18k–23.5k BTU).',
            'Inspect existing 26" condo metal sleeves for rust perforation along the bottom pan — add a GE RAB26A galvanized sleeve ($275) if corroded.',
        ],
        relatedLinks: [
            { label: 'All 12 In-Stock LG Window ACs Oahu', href: '/shop/in-stock-lg-window-ac-oahu' },
            { label: 'GE 26" Built-In Condo Wall AC Guide', href: '/shop/ge-built-in-wall-ac-oahu' },
            { label: '26" Wall Sleeve Dimensions & RAB26A Guide', href: '/shop/26-inch-wall-sleeve-ac-dimensions-rab26a-oahu' },
            { label: '$0 Free Oahu Installation Estimate', href: '/window-ac-installation' },
        ],
    },
    faqsHeading: 'LG vs. GE Window & Wall AC Hawaii FAQs',
    faqs: [
        {
            q: 'Can I put a standard LG Dual Inverter window AC inside a 26-inch concrete condo wall sleeve?',
            a: 'No—standard LG Dual Inverter window ACs draw condenser air through side and top cabinet louvers. Sliding a side-vented window chassis inside a solid concrete or wood condo wall sleeve blocks condenser airflow, causing hot exhaust air to recirculate and trip thermal overload. For enclosed 26-inch wall sleeves, choose a solid-side rear-breathing GE AJCQ Built-In (such as the GE AJCQ12AXXWA R-32 Inverter or AJCQ08AWJ).',
        },
        {
            q: 'When is LG Dual Inverter better than GE for an Oahu home?',
            a: "For any true window installation—Hawaiian jalousie glass louvers, horizontal sliding windows, or double-hung wood/vinyl sash frames—LG Dual Inverter is our #1 choice: quieter sleep operation (44 dB vs. 48–55 dB), higher energy efficiency (14.5–15.5 CEER vs. 10.5–10.6 CEER on HECO's 44.2¢/kWh grid), lower upfront cost ($560–$1,025), and capacities up to 23,500 BTU.",
        },
        {
            q: 'Do both LG Dual Inverter and GE Built-In inverter models qualify for the $45 Hawaii Energy rebate?',
            a: 'Yes, on qualifying ENERGY STAR inverter models! All 7 LG Dual Inverter models (LW6023IVSM–LW2422IVSM) and the 12,000 BTU GE AJCQ12AXXWA R-32 Variable-Speed Built-In Inverter ($1,200) qualify for the $45 Hawaii Energy cash rebate. Non-inverter GE AJCQ08AWJ/AJCQ10AWJ and LG Standard/Cool+Heat units do not carry the $45 rebate.',
        },
        {
            q: 'What warranty difference exists between LG and GE units at your Waipahu warehouse?',
            a: 'LG Window ACs carry a 1-Year Parts & Labor manufacturer warranty (with 10-year compressor coverage on Dual Inverter models), while GE AJCQ 26-inch Built-In Through-the-Wall units carry an upgraded 2-Year Full Parts & Labor plus 5-Year Sealed Refrigerant System manufacturer warranty.',
        },
    ],
    quickShopModelIds: [4, 15, 5, 13],
    quickShopTitle: 'Shop Flagship LG Window & GE 26" Built-In Units ($560–$1,200)',
    quickShopSubheading: 'Both LG and GE lines physically stocked at our Waipahu warehouse for pickup or $50 Oahu delivery.',
    eeatTopicTitle: 'LG vs. GE Window & 26-Inch Wall Sleeve Air Conditioner Oahu Engineering Guide',
    reviewsTitle: 'Oahu Homeowner & Condo Resident LG & GE Reviews',
    reviewsSubtitle: '4.9-Star verified installations across single-wall homes, jalousie windows & Honolulu condo sleeves',
};

export default function LgVsGeWindowAcHawaiiPage() {
    return (
        <main className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[92px] md:pt-[180px] pb-36 lg:pb-24">
            <OahuPillarPageBody {...PAGE_DATA} />
        </main>
    );
}
