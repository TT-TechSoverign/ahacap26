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
            "name": "Portable AC vs. Window AC in Hawaii"
        }
    ],
    "badge": "Hawaii Psychrometric & HECO Cost Comparison • Custom Jalousie Solutions",
    "h1Main": "Portable AC vs. Window AC",
    "h1Highlight": "Why Hose ACs Struggle in Hawaii Homes",
    "leadParagraph": "Many Oahu renters and homeowners buy a rolling 10,000–14,000 BTU 'ASHRAE' portable air conditioner because they have Hawaiian jalousie louvers or horizontal sliders — only to discover the room barely drops below 79°F while their HECO bill doubles. Before spending $500+ on a noisy floor-hose portable unit, examine the real tropical physics comparing portable ACs against a properly fitted LG or GE Window AC ($395–$1,200).",
    "primaryCta": {
        "label": "Compare In-Stock Window ACs ($395+)",
        "href": "/shop"
    },
    "phoneEventLabel": "Portable vs Window Call",
    "table": {
        "id": "portable-vs-window-ac-hawaii-table",
        "eyebrow": "SIDE-BY-SIDE TROPICAL PERFORMANCE MATRIX",
        "heading": "Rolling Portable Hose AC vs. LG Dual Inverter Window AC",
        "intro": "Comparing a typical '12,000 BTU ASHRAE' (7,500 BTU DOE SACC) portable unit against an in-stock LG Dual Inverter Window AC in an Oahu bedroom:",
        "caption": "Engineering comparison between portable air conditioners and LG Dual Inverter window air conditioners in Hawaii homes.",
        "columns": [
            "Performance Metric",
            "Single-Hose Portable AC",
            "LG Dual Inverter Window AC",
            "Oahu Winner"
        ],
        "rows": [
            {
                "rowHeader": "Net Delivered Cooling",
                "cells": [
                    "~6,500–7,800 Real DOE SACC BTU",
                    "Full 8,000–12,000 AHAM BTU",
                    "Window AC (+40%–55% real cooling)"
                ],
                "highlight": true
            },
            {
                "rowHeader": "Compressor Location & Noise",
                "cells": [
                    "Inside bedroom (56–64 dBA roar)",
                    "Outside window glass (44 dBA whisper)",
                    "Window AC (~4x quieter perceived)"
                ],
                "highlight": true
            },
            {
                "rowHeader": "Room Air Pressure & Humidity",
                "cells": [
                    "Negative pressure sucks 85°F humid air in",
                    "Neutral sealed pressure • 2.5–3.8 Pts/Hr dry",
                    "Window AC (No muggy infiltration)"
                ],
                "highlight": false
            },
            {
                "rowHeader": "Monthly HECO Bill (44.2¢/kWh)",
                "cells": [
                    "~$95–$130 / mo (7.2–8.5 CEER equiv.)",
                    "~$44–$64 / mo (15.0–15.5 CEER)",
                    "Window AC (Saves ~$50+/mo)"
                ],
                "highlight": false
            },
            {
                "rowHeader": "Condensate Water Handling",
                "cells": [
                    "Internal tank overflows at 2 AM in 74% RH",
                    "Self-evaporative exterior slinger pan",
                    "Window AC (Zero bucket dumping)"
                ],
                "highlight": false
            },
            {
                "rowHeader": "Hawaii Energy $45 Rebate",
                "cells": [
                    "$0 (Portable ACs excluded)",
                    "$45 Cash Rebate on ENERGY STAR Inverters",
                    "Window AC ($45 check back)"
                ],
                "highlight": false
            }
        ],
        "footnote": "Even if you have Hawaiian jalousie louvers or strict landlord rules, custom non-destructive jalousie & slider window AC retrofits solve the mounting challenge cleanly."
    },
    "deepDiveEyebrow": "4 THERMODYNAMIC REASONS PORTABLES FAIL ON OAHU",
    "deepDiveHeading": "Why '12,000 BTU' Portable Units Can't Cool Single-Wall Rooms",
    "deepDiveIntro": "Portable ACs were designed as last-resort spot coolers in dry mainland apartments—not humid single-wall Hawaiian homes:",
    "cards": [
        {
            "code": "01",
            "title": "Negative-Pressure Infiltration Through Jalousie Louvers",
            "paragraphs": [
                "A single-hose portable AC cools its condenser by sucking 150–250 CFM of your already-cooled indoor bedroom air and blowing it out the plastic exhaust hose.",
                "Every cubic foot blown outside must be replaced immediately by 86°F, 74%-humidity Oahu air pulled in under doors, through ceiling vents, and between unsealed jalousie glass slats — fighting itself all afternoon."
            ],
            "bullets": [
                "Window ACs keep indoor and outdoor air loops 100% separate",
                "Zero hot corridor or attic air sucked back into your bedroom"
            ]
        },
        {
            "code": "02",
            "title": "Uninsulated 125°F Exhaust Hose Radiating Heat Indoors",
            "paragraphs": [
                "Touch the corrugated plastic exhaust hose on any portable AC after 30 minutes: it glows at 115°F–130°F right inside your room, acting like a 400-watt space heater!",
                "On a Window AC, the hot condenser coil and compressor sit completely outdoors past the window sash where trade winds carry waste heat away."
            ],
            "bullets": [
                "Zero floor space lost to bulky 5-foot plastic ducting",
                "Full window light preserved above compact 12.3\"–15.0\" cabinets"
            ]
        },
        {
            "code": "03",
            "title": "2:00 AM Condensate Tank Shutoffs in 74% Oahu Humidity",
            "paragraphs": [
                "Manufacturers advertise 'bucketless self-evaporating' portables based on 40% Arizona/mainland humidity. In Windward Kailua, Kaneohe, Manoa, or rainy Honolulu nights (75%–85% RH), exhaust air is already saturated and cannot evaporate the condensate.",
                "The tiny internal float pan fills up in 4 hours and shuts the portable AC off with an 'FL' / 'P1' full-bucket alarm in the middle of the night."
            ],
            "bullets": [
                "Window ACs drain naturally outdoors with a 1/4\" rear pitch",
                "Slinger ring splashes condensate onto hot exterior coils to boost CEER"
            ]
        },
        {
            "code": "04",
            "title": "Jalousie & Renter-Friendly Window Mounting Solves the Real Obstacle",
            "paragraphs": [
                "90% of Oahu shoppers who look at portable ACs only do so because they assume a window AC cannot fit jalousie louvers or horizontal sliding windows without permanent damage.",
                "Our Oahu technicians custom-fit jalousie openings by sliding out select glass slats (kept safely for move-out restoration) and installing a crystal-clear, weather-sealed rigid infill panel — with a $0 Free In-Home Estimate."
            ],
            "bullets": [
                "Reversible renter-friendly jalousie & horizontal slider setups",
                "Protective floor drop cloths laid on every appointment"
            ]
        }
    ],
    "checklist": {
        "eyebrow": "SWITCHING FROM A PORTABLE TO A WINDOW AC",
        "heading": "When Only a Window or Built-In Unit Will Do",
        "description": "Note: We focus 100% on LG & GE Window ACs and 26\" Built-In Wall ACs (we do not sell or service portable hose units). Here is how to upgrade cleanly:",
        "items": [
            "Small bedrooms (100–250 sq. ft.) replacing a noisy 8k/10k portable: Choose $395 LG LW8024RD or whisper-quiet $560 LG LW6023IVSM (44 dB).",
            "Master bedrooms & studios (250–380 sq. ft.) replacing a struggling 12k/14k portable: Choose $745 LG LW1222IVSM ($700 net after $45 rebate).",
            "Have Hawaiian jalousie louvers or tall horizontal sliders? Book a $0 Free In-Home Estimate for custom weatherproof framing.",
            "Live in a Honolulu high-rise condo with casement-only glass and a 26\" wall sleeve? Choose GE AJCQ08AWJ ($1,000) or AJCQ12AXXWA ($1,200)."
        ],
        "relatedLinks": [
            {
                "label": "Jalousie Window AC Installation Oahu",
                "href": "/jalousie-window-ac-installation-oahu"
            },
            {
                "label": "Renter-Friendly No-Damage AC Mounting",
                "href": "/renter-friendly-ac-installation-oahu"
            },
            {
                "label": "Horizontal Sliding Window AC Guide",
                "href": "/horizontal-sliding-window-ac-oahu"
            },
            {
                "label": "Quiet 44dB Bedroom Window ACs Oahu",
                "href": "/quiet-bedroom-window-ac-oahu"
            }
        ]
    },
    "faqsHeading": "Portable AC vs. Window AC in Hawaii FAQs",
    "faqs": [
        {
            "q": "Do you clean or repair portable air conditioners on Oahu?",
            "a": "No—Affordable Home A/C specializes 100% in Window Air Conditioners and 26-inch Through-the-Wall Built-In Air Conditioners (sales, custom installation, and antimicrobial deep coil cleaning). Because portable hose units are sealed plastic floor appliances that cost nearly as much to disassemble as a brand-new $395 LG Window AC, upgrading to a window unit saves money immediately."
        },
        {
            "q": "Can a window AC be installed in Hawaiian jalousie louver windows without permanent damage?",
            "a": "Yes! Our technicians carefully slide the glass louver panes out of the clips in the lower section of the jalousie frame (leaving your panes intact so they can be reinstalled whenever you move out) and fabricate a weather-tight rigid panel around the new LG window AC."
        },
        {
            "q": "Why does a 6,000 BTU LG Window AC cool better than a '10,000 BTU' portable AC?",
            "a": "Because a '10,000 BTU ASHRAE' single-hose portable AC actually delivers only ~5,500–6,500 BTU DOE SACC after subtracting exhaust-hose radiant heat and negative-pressure hot air infiltration. A 6,000 BTU LG LW6023IVSM keeps 100% of its heat outdoors and seals the window tight."
        },
        {
            "q": "How much quieter is an LG Dual Inverter Window AC than a portable AC?",
            "a": "In Sleep Mode, LG Dual Inverter Window ACs operate at 44 dBA—roughly 12 to 18 decibels quieter than a portable AC sitting on your bedroom floor. Because the decibel scale is logarithmic, a 10–12 dB reduction sounds less than half as loud to the human ear."
        }
    ],
    "quickShopModelIds": [
        11,
        1,
        3,
        4
    ],
    "quickShopTitle": "Replace Your Noisy Portable AC With an In-Stock LG Window AC ($395–$745)",
    "quickShopSubheading": "Plug into the exact same 115V wall outlet, cut your HECO bill up to 40%, and sleep at 44 dB.",
    "eeatTopicTitle": "Portable AC vs. Window AC in Hawaii Homes — Single-Wall, Jalousie & HECO Guide",
    "reviewsTitle": "Oahu Jalousie & Bedroom Upgrade Reviews",
    "reviewsSubtitle": "Verified Oahu customers who switched to whisper-quiet LG Dual Inverters"
};

export default function PillarRoutePage() {
    return (
        <main className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[92px] md:pt-[180px] pb-36 lg:pb-24">
            <OahuPillarPageBody {...PAGE_DATA} />
        </main>
    );
}
