'use client';

import React from 'react';
import { OahuPillarPageBody, OahuPillarPageProps } from '@/components/OahuPillarPageBody';

const PAGE_DATA: OahuPillarPageProps = {
    "breadcrumbs": [
        {
            "name": "Shop Window ACs",
            "href": "/shop"
        },
        {
            "name": "$45 Hawaii Energy Rebate",
            "href": "/hawaii-energy-rebate"
        },
        {
            "name": "HECO Electricity Cost & Wattage Guide"
        }
    ],
    "badge": "Oahu HECO ~44.2¢/kWh Residential Rate Engineering • $45 Hawaii Energy Rebate",
    "h1Main": "Window AC HECO Electricity Cost",
    "h1Highlight": "Hawaii Wattage & Monthly Bill Matrix",
    "leadParagraph": "At roughly 44.2¢ per kilowatt-hour on Oahu — nearly 3x the mainland U.S. residential average — an aging 9.8 CEER window air conditioner can quietly cost more in Hawaiian Electric (HECO) bills every 14 months than the price of a brand-new machine. Use our Oahu utility engineering chart below to see real running watts, hourly cost, and 8-hour/night monthly HECO bills across 6,000 to 23,500 BTU units.",
    "primaryCta": {
        "label": "Shop High-CEER Rebate Models",
        "href": "/shop#rebate"
    },
    "phoneEventLabel": "HECO Cost Calculator Call",
    "table": {
        "id": "heco-window-ac-monthly-bill-table",
        "eyebrow": "OAHU HECO ~44.2¢/kWh OPERATING COST TABLE (8 HRS/DAY)",
        "heading": "Monthly HECO Bill: Dual Inverter vs. Old 9.8 CEER Unit",
        "intro": "Calculated using Oahu's ~44.2¢/kWh residential baseline across 240 cooling hours per month (8 hours nightly/afternoon duty cycle with variable-speed inverter modulation):",
        "caption": "Estimated running watts and monthly Hawaiian Electric (HECO) operating cost at 44.2 cents per kWh for LG Dual Inverter ACs versus legacy 9.8 CEER fixed-speed window units.",
        "columns": [
            "BTU Tier & Waipahu Model",
            "Avg Modulated Watts",
            "Dual Inverter HECO / Mo",
            "Old 9.8 CEER HECO / Mo",
            "Annual HECO Savings"
        ],
        "rows": [
            {
                "rowHeader": "6,000 BTU (LG LW6023IVSM • $560)",
                "cells": [
                    "~290W – 520W (15.5 CEER)",
                    "~$34 / mo",
                    "~$65 / mo (610W fixed)",
                    "~$372 / yr saved"
                ],
                "highlight": false
            },
            {
                "rowHeader": "8,000 BTU (LG LW8022IVSM • $595)",
                "cells": [
                    "~380W – 710W (15.5 CEER)",
                    "~$44 / mo",
                    "~$86 / mo (815W fixed)",
                    "~$504 / yr saved"
                ],
                "highlight": false
            },
            {
                "rowHeader": "10,000 BTU (LG LW1022IVSM • $650)",
                "cells": [
                    "~490W – 920W (15.0 CEER)",
                    "~$55 / mo",
                    "~$98 / mo (1,020W fixed)",
                    "~$516 / yr saved"
                ],
                "highlight": false
            },
            {
                "rowHeader": "12,000 BTU (LG LW1222IVSM • $745)",
                "cells": [
                    "~580W – 1,140W (15.0 CEER)",
                    "~$64 / mo",
                    "~$99+ / mo (1,225W fixed)",
                    "$424.32 / yr verified*"
                ],
                "highlight": true
            },
            {
                "rowHeader": "14,000 BTU (LG LW1522FVSM • $785)",
                "cells": [
                    "~710W – 1,350W (14.7 CEER)",
                    "~$78 / mo",
                    "~$126 / mo (1,430W fixed)",
                    "~$576 / yr saved"
                ],
                "highlight": false
            },
            {
                "rowHeader": "18k–23.5k BTU (LW1822 / LW2422)",
                "cells": [
                    "~960W – 2,050W (14.7/14.5 CEER)",
                    "~$106 – $138 / mo",
                    "~$175 – $228 / mo",
                    "~$820+ / yr saved"
                ],
                "highlight": true
            }
        ],
        "footnote": "*Annual $424.32/yr savings benchmark reflects replacing a 9.8 CEER legacy unit under Oahu's 3,200 kWh/yr Leeward/Central cooling load profile at $0.442/kWh — before adding your instant $45 Hawaii Energy cash rebate."
    },
    "deepDiveEyebrow": "HAWAII UTILITY THERMODYNAMICS",
    "deepDiveHeading": "Why Dual Inverters Slash Oahu Electric Bills Up to 40%",
    "deepDiveIntro": "Understanding CEER (Combined Energy Efficiency Ratio) and rotary modulation explains why variable-speed compressors pay for themselves faster in Hawaii than anywhere else in America:",
    "cards": [
        {
            "code": "01",
            "title": "Eliminating Hard-Start Inrush Current Spikes",
            "paragraphs": [
                "Traditional single-speed window ACs slam from 0% to 100% locked-rotor amperage 4 to 6 times every hour — pulling 1,100W to 1,400W at full blast, shutting off, letting humidity creep back up, and slamming back on.",
                "LG Dual Inverter and GE AJCQ12AXXWA R-32 Inverter compressors ramp smoothly down to 25%–35% speed once your bedroom hits 72°F–74°F, sipping 260W–480W like a ceiling fan plus laptop."
            ],
            "bullets": [
                "Zero lights flickering on older Honolulu & Pearl City 15A circuits",
                "44 dB whisper sleep operation at throttled RPM"
            ]
        },
        {
            "code": "02",
            "title": "R-32 Refrigerant Volumetric Heat Transfer",
            "paragraphs": [
                "Next-generation R-32 refrigerant carries roughly 10% higher latent heat per pound than legacy R-410A while cutting Global Warming Potential (GWP) by 68%.",
                "Less compressor mass-flow work per BTU means lower head pressure during 90°F Ewa Beach and Waipahu afternoons."
            ],
            "bullets": [
                "Up to 15.5 CEER on 6,000 & 8,000 BTU LG Dual Inverters",
                "15.0 CEER on 10,000 & 12,000 BTU LG Dual Inverters"
            ]
        },
        {
            "code": "03",
            "title": "How Dirty Coils Secretly Add 22%–30% to HECO Bills",
            "paragraphs": [
                "Even an ENERGY STAR inverter loses its efficiency edge if 12 months of Oahu salt air, gecko droppings, and trade-wind dust blanket the evaporator or condenser fins.",
                "A fouled coil forces the inverter to run at 85%–100% speed all night to hit setpoint — which is why annual deep coil cleaning pays for itself directly on your HECO statement."
            ],
            "bullets": [
                "Wash front mesh filter every 2–3 weeks with warm water",
                "Book professional coil foaming wash every 6–12 months"
            ]
        },
        {
            "code": "04",
            "title": "Stacking the $45 Hawaii Energy Cash Rebate + ThinQ Budgets",
            "paragraphs": [
                "Every qualifying ENERGY STAR LG Dual Inverter ($560–$1,025) and GE AJCQ12AXXWA ($1,200) includes our pre-approved Affordable Home A/C Version 4 Hawaii Energy rebate PDF for a $45 check back.",
                "Inside the free LG ThinQ app, you can also set a monthly kWh target so your AC automatically nudges into Energy Saver mode before crossing HECO Tier 2 billing thresholds."
            ],
            "bullets": [
                "9.4-month average payback when swapping a 10-year-old unit",
                "Live kWh tracking built into LG ThinQ & GE SmartHQ apps"
            ]
        }
    ],
    "checklist": {
        "eyebrow": "4 WAYS TO CUT YOUR WINDOW AC HECO BILL IMMEDIATELY",
        "heading": "Oahu Homeowner Energy-Saving Protocol",
        "description": "Combine high-CEER hardware with Hawaii-specific operating habits to keep monthly cooling bills low:",
        "items": [
            "Set overnight sleep temperature to 73°F–75°F in Low/Sleep inverter mode (each 1°F warmer saves ~3%–5% HECO kWh while still wringing out humidity).",
            "Seal jalousie louver perimeters with rigid UV acrylic infill and closed-cell foam instead of leaky cardboard or towels.",
            "Keep exterior rear/side condenser louvers shaded from direct west sun where HOA rules allow, without restricting 20+ inches of airflow clearance.",
            "Claim your $45 Hawaii Energy cash rebate within 90 days of purchase using your 12-digit HECO residential account number."
        ],
        "relatedLinks": [
            {
                "label": "Download $45 Hawaii Energy Rebate Guide",
                "href": "/hawaii-energy-rebate"
            },
            {
                "label": "Coil Cleaning Benefits for HECO Power Bills",
                "href": "/ac-coil-cleaning-benefits-power-bill"
            },
            {
                "label": "Inverter vs. Standard Window AC Comparison",
                "href": "/inverter-window-ac-vs-standard-hawaii"
            },
            {
                "label": "Browse All ENERGY STAR Window ACs",
                "href": "/energy-star-window-air-conditioners-hawaii"
            }
        ]
    },
    "faqsHeading": "Window AC HECO Electricity Cost FAQs",
    "faqs": [
        {
            "q": "How much does it cost per month to run a 12,000 BTU window AC in Hawaii?",
            "a": "At Hawaiian Electric's ~44.2¢/kWh Oahu residential rate, running an ENERGY STAR 12,000 BTU LG Dual Inverter (LW1222IVSM, 15.0 CEER) for 8 hours a day typically costs around $58 to $68 per month because the variable-speed compressor throttles down after initial pull-down. By contrast, an older 9.8 CEER fixed-speed 12,000 BTU unit often costs $95 to $110+ per month for the same room."
        },
        {
            "q": "How many watts does a 6,000 or 8,000 BTU LG Dual Inverter draw?",
            "a": "At full pull-down capacity, a 6,000 BTU LG LW6023IVSM draws roughly 520 watts (~4.5 amps at 115V), and an 8,000 BTU LW8022IVSM draws roughly 710 watts (~6.2 amps). Once the bedroom reaches temperature overnight, both throttle down into the 220W–380W range."
        },
        {
            "q": "Is it cheaper on HECO to leave an inverter window AC on 24/7 or turn it off when nobody is home?",
            "a": "In uninsulated single-wall Hawaii homes, turning the unit OFF while the house is empty for 6+ hours—and using LG ThinQ Wi-Fi to turn it on 20 minutes before arriving home—saves substantially more electricity than fighting midday solar heat gain all afternoon in an empty house."
        },
        {
            "q": "Which in-stock models qualify for the $45 Hawaii Energy rebate?",
            "a": "All 7 LG Dual Inverter models (LW6023IVSM, LW8022IVSM, LW1022IVSM, LW1222IVSM, LW1522FVSM, LW1822IVSM, LW2422IVSM) plus the GE 12,000 BTU R-32 Variable-Speed Built-In (AJCQ12AXXWA) qualify for the $45 Hawaii Energy cash rebate."
        }
    ],
    "quickShopModelIds": [
        1,
        3,
        4,
        5
    ],
    "quickShopTitle": "Upgrade to a High-CEER Inverter & Cut Your HECO Bill ($560–$1,200)",
    "quickShopSubheading": "Includes official pre-approved $45 Hawaii Energy Rebate V4 PDF. Free Waipahu pickup or $50 Oahu delivery.",
    "eeatTopicTitle": "Window AC HECO Electricity Cost & Wattage Calculator Guide Hawaii (44.2¢/kWh)",
    "reviewsTitle": "HECO Power Bill Savings Reviews Across Oahu",
    "reviewsSubtitle": "Homeowners from Ewa Beach to Kailua sharing real monthly HECO bill drops"
};

export default function PillarRoutePage() {
    return (
        <main className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[92px] md:pt-[180px] pb-36 lg:pb-24">
            <OahuPillarPageBody {...PAGE_DATA} />
        </main>
    );
}
