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
            "name": "10,000 & 12,000 BTU Buyer Guide"
        }
    ],
    "badge": "Waipahu Warehouse In-Stock • 115V Standard Household Plug",
    "h1Main": "10,000 & 12,000 BTU Window ACs",
    "h1Highlight": "Oahu Master Bedroom & Condo Guide",
    "leadParagraph": "In Oahu's single-wall redwood homes, sunny Leeward master suites, and 26-inch Honolulu condo wall sleeves, 10,000 to 12,000 BTU is our #1 requested cooling class. Every 10k and 12k LG and GE model in our Waipahu warehouse runs on a standard 115V / 15-Amp 3-prong wall outlet — delivering 250 to 390 sq. ft. of real Hawaii heat-load cooling without 230V electrical rewiring.",
    "primaryCta": {
        "label": "Shop All 115V In-Stock Models",
        "href": "/shop"
    },
    "phoneEventLabel": "10k 12k BTU Guide Call",
    "table": {
        "id": "oahu-10k-12k-btu-comparison-table",
        "eyebrow": "WAIPAHU 5-MODEL SPECIFICATION MATRIX",
        "heading": "10,000 & 12,000 BTU LG & GE Models Side-by-Side",
        "intro": "Compare factory mainland AHAM square footage against our Oahu Microclimate Calibration (accounting for uninsulated single-wall tongue-and-groove construction, jalousie glass infiltration, and 74% trade-wind humidity):",
        "caption": "Comparison of all five 10,000 and 12,000 BTU LG and GE window and built-in air conditioners stocked at Affordable Home A/C Waipahu.",
        "columns": [
            "Model / SKU",
            "Price & Rebate",
            "Oahu Real Sq. Ft.",
            "Chassis & Window Min",
            "Noise / CEER",
            "Best Oahu Fit"
        ],
        "rows": [
            {
                "rowHeader": "LG LW1022IVSM (10k Dual Inv)",
                "cells": [
                    "$650 ($605 net w/ $45 Rebate)",
                    "200–330 sq. ft. (450 AHAM)",
                    "Top-Mount • 22\"W x 13\"H",
                    "44 dB • 15.0 CEER",
                    "Master Bedrooms & Studios"
                ],
                "highlight": false
            },
            {
                "rowHeader": "LG LW1217ERSM1 (12k WiFi)",
                "cells": [
                    "$625 (Budget 12k Value)",
                    "250–380 sq. ft. (550 AHAM)",
                    "Slide In-Out • 27\"W x 16\"H",
                    "52 dB • 12.0 CEER",
                    "Guest Suites & Rental Turnovers"
                ],
                "highlight": false
            },
            {
                "rowHeader": "LG LW1222IVSM (12k Dual Inv)",
                "cells": [
                    "$745 ($700 net w/ $45 Rebate)",
                    "250–380 sq. ft. (550 AHAM)",
                    "Slide In-Out • 27\"W x 16\"H",
                    "44 dB • 15.0 CEER",
                    "#1 Flagship Master / Living Room"
                ],
                "highlight": true
            },
            {
                "rowHeader": "GE AJCQ10AWJ (10k Built-In)",
                "cells": [
                    "$1,100 (True 26\" Wall Case)",
                    "220–340 sq. ft. (450 AHAM)",
                    "Solid-Side 26\" Wall Sleeve",
                    "55 dB • 10.6 CEER",
                    "Mid-Size Condo Wall Cutouts"
                ],
                "highlight": false
            },
            {
                "rowHeader": "GE AJCQ12AXXWA (12k R-32 Inv)",
                "cells": [
                    "$1,200 ($1,155 net w/ $45 Rebate)",
                    "260–390 sq. ft. (550 AHAM)",
                    "Solid-Side 26\" Wall Sleeve",
                    "48 dB • 10.5 CEER",
                    "Quiet Condo Living & Master Suites"
                ],
                "highlight": true
            }
        ],
        "footnote": "All 5 models operate on standard 115V / 15A household circuits (NEMA 5-15P plug). Qualifying ENERGY STAR inverters include our official pre-approved $45 Hawaii Energy V4 rebate PDF."
    },
    "deepDiveEyebrow": "ISLAND HEAT-LOAD & CHASSIS ENGINEERING",
    "deepDiveHeading": "How to Pick the Right 10k or 12k Unit for Your Oahu Opening",
    "deepDiveIntro": "Mainland sizing charts assume R-19 insulated drywall and double-pane vinyl windows. On Oahu, four physical variables decide which 10,000 or 12,000 BTU chassis fits and cools your room effortlessly:",
    "cards": [
        {
            "code": "01",
            "title": "Window Width: 22-Inch Compact vs. 27-Inch Slide-Out",
            "paragraphs": [
                "Look closely at your window jamb width before choosing between 10,000 and 12,000 BTU. The 10,000 BTU LG LW1022IVSM uses a compact 19.6-inch cabinet (fitting 22\" to 36\" openings and weighing just 63 lbs), making it effortless to mount in narrower Oahu bedroom jalousies and older Kaimuki/Manoa sash frames.",
                "Stepping up to the 12,000 BTU LG LW1222IVSM or LW1217ERSM1 moves to a heavy-duty 23.6-inch Slide In-Out chassis requiring at least a 27-inch clear window width and 16-inch height (85 lbs net weight)."
            ],
            "bullets": [
                "Window 22\"–26.5\" wide: Choose LG LW1022IVSM (10,000 BTU)",
                "Window 27\"–39\" wide: Choose LG LW1222IVSM (12,000 BTU)"
            ]
        },
        {
            "code": "02",
            "title": "3.8 Pts/Hr Dehumidification in Trade-Wind Humidity",
            "paragraphs": [
                "Sensible temperature is only half of comfort in Kailua, Kaneohe, Pearl City, and Honolulu. At 74% relative humidity, sticky indoor air makes 75°F feel clammy if an oversized fixed-speed compressor short-cycles.",
                "The LG LW1222IVSM extracts up to 3.8 pints of moisture per hour while throttling its dual-rotary compressor down to 25% speed overnight — keeping bedroom humidity crisp around 50% RH without icy temperature swings."
            ],
            "bullets": [
                "LW1022IVSM: 2.9 pints/hr latent moisture removal",
                "LW1222IVSM: 3.8 pints/hr + Gold Fin coastal coil coating"
            ]
        },
        {
            "code": "03",
            "title": "True 26-Inch Condo Wall Sleeves: Why GE AJCQ Wins",
            "paragraphs": [
                "Standard window ACs breathe condenser air through side louvers. If you push a side-vented window unit inside a deep concrete condo wall sleeve in Ala Moana, Makiki, or Salt Lake, hot exhaust air recirculates and trips thermal overload.",
                "For dedicated 26-inch wall sleeves (including GE RAB26A casements), select the solid-side rear-breathing GE AJCQ12AXXWA 12,000 BTU R-32 Variable-Speed Inverter ($1,200, backed by a 2-Year Full / 5-Year Sealed System factory warranty)."
            ],
            "bullets": [
                "Zero side-louver recirculation inside concrete/wood walls",
                "Variable-speed 6,100–12,400 BTU/h R-32 inverter modulation"
            ]
        },
        {
            "code": "04",
            "title": "HECO 44.2¢/kWh Payback: LW1222IVSM vs. LW1217ERSM1",
            "paragraphs": [
                "At $625, the standard LG LW1217ERSM1 (12.0 CEER) saves $120 upfront compared to the $745 LG Dual Inverter LW1222IVSM (15.0 CEER). Which makes more financial sense on Oahu?",
                "Once you apply the $45 Hawaii Energy cash rebate to the LW1222IVSM ($700 net), the price gap shrinks to just $75. At Hawaiian Electric's ~44.2¢/kWh residential rate, the 25% CEER efficiency gain pays back that $75 difference in roughly 3 to 4 months of nightly cooling."
            ],
            "bullets": [
                "Daily master-bedroom sleepers: LW1222IVSM saves ~$220+/yr on HECO",
                "Occasional guest rooms: LW1217ERSM1 offers lowest upfront 12k cost"
            ]
        }
    ],
    "checklist": {
        "eyebrow": "PRE-PURCHASE MEASUREMENT CHECKLIST",
        "heading": "4 Measurements Before Ordering Your 10k or 12k Unit",
        "description": "Grab a tape measure and check these four items in 60 seconds — or call our Waipahu dispatch desk at (808) 488-1111 for a $0 Free In-Home Estimate:",
        "items": [
            "Measure inside window jamb-to-jamb width (22\"+ fits LW1022IVSM; 27\"+ fits LW1222IVSM & LW1217ERSM1; 26\" wall sleeve fits GE AJCQ12AXXWA).",
            "Confirm a grounded 3-prong 115V / 15A wall outlet (NEMA 5-15R) is within 4.5 to 5 feet of the window corner without extension cords.",
            "Add +20% BTU headroom if your room has uninsulated single-wall redwood siding, unshaded west-facing Leeward glass, or vaulted ceilings over 9 ft.",
            "Need jalousie glass louver removal and custom weatherproof acrylic infill? Request a $0 Free In-Home Estimate — our crew lays protective floor drop cloths on every install."
        ],
        "relatedLinks": [
            {
                "label": "6k & 8k BTU Small Bedroom Guide ($395+)",
                "href": "/small-room-window-ac-6000-8000-btu"
            },
            {
                "label": "14k–23.5k BTU Large Living Room Guide",
                "href": "/shop/large-room-window-ac-oahu"
            },
            {
                "label": "GE 26\" Built-In Wall Sleeve Guide",
                "href": "/shop/ge-built-in-wall-ac-oahu"
            },
            {
                "label": "$45 Hawaii Energy Rebate Form & Rules",
                "href": "/hawaii-energy-rebate"
            }
        ]
    },
    "faqsHeading": "10,000 & 12,000 BTU Window AC Oahu FAQs",
    "faqs": [
        {
            "q": "Do 12,000 BTU window air conditioners plug into a normal 115V outlet?",
            "a": "Yes! Every 10,000 and 12,000 BTU LG and GE air conditioner we stock in Waipahu (LW1022IVSM, LW1217ERSM1, LW1222IVSM, AJCQ10AWJ, and AJCQ12AXXWA) uses a standard 115-volt, 15-amp 3-prong household plug (NEMA 5-15P). Only 18,000 BTU and 23,500 BTU models require 208/230V outlets."
        },
        {
            "q": "Should I buy 10,000 BTU or 12,000 BTU for an Oahu master bedroom?",
            "a": "For a 200 to 300 sq. ft. master bedroom—or if your window opening is between 22 and 26.5 inches wide—the 10,000 BTU LG LW1022IVSM ($650) is ideal. For larger 280 to 380 sq. ft. master suites, open studio apartments, or west-facing single-wall rooms in Ewa Beach, Kapolei, or Waipahu with a 27-inch+ window, step up to the 12,000 BTU LG LW1222IVSM ($745)."
        },
        {
            "q": "Which 10k and 12k models qualify for the $45 Hawaii Energy cash rebate?",
            "a": "Our ENERGY STAR certified inverter models—including the LG LW1022IVSM ($650), LG LW1222IVSM ($745), and GE AJCQ12AXXWA R-32 Variable-Speed Built-In ($1,200)—qualify for the $45 Hawaii Energy cash rebate. We provide our pre-approved Version 4 rebate application PDF with your purchase."
        },
        {
            "q": "Can I pick up a 10,000 or 12,000 BTU AC at your Waipahu warehouse today?",
            "a": "Yes. Order online at affordablehome-ac.com/shop and select Free Waipahu Warehouse Pickup by appointment (94-150 Leoleo St. #203, Waipahu, HI 96797) or $50 flat-rate curbside delivery across 15 Oahu municipalities."
        }
    ],
    "quickShopModelIds": [
        3,
        4,
        12,
        15
    ],
    "quickShopTitle": "Order In-Stock 10,000 & 12,000 BTU Units Online ($625–$1,200)",
    "quickShopSubheading": "Factory-sealed at our Waipahu warehouse. Free local pickup by appointment or $50 flat Oahu delivery.",
    "eeatTopicTitle": "10,000 & 12,000 BTU Master Bedroom & Condo Window AC Buyer Guide Oahu",
    "reviewsTitle": "Oahu Master Bedroom & Condo AC Reviews",
    "reviewsSubtitle": "4.9-Star average across 142 verified Oahu homeowner installations & warehouse pickups"
};

export default function PillarRoutePage() {
    return (
        <main className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[92px] md:pt-[180px] pb-36 lg:pb-24">
            <OahuPillarPageBody {...PAGE_DATA} />
        </main>
    );
}
