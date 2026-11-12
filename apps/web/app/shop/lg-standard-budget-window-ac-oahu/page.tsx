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
            "name": "Affordable LG Standard Window ACs ($395 & $625)"
        }
    ],
    "badge": "Lowest Upfront Factory-New LG Pricing on Oahu • 1-Year Warranty",
    "h1Main": "Affordable LG Window ACs",
    "h1Highlight": "Oahu $395 & $625 Entry Lineup",
    "leadParagraph": "Need dependable, brand-new LG cooling today without overspending on a guest bedroom, home office, student rental, or tenant turnover? Our Waipahu warehouse keeps factory-sealed LG Standard rotary models in stock starting at $395 for the 8,000 BTU LW8024RD and $625 for the 12,000 BTU ThinQ Wi-Fi LW1217ERSM1 — backed by Gold Fin anti-corrosion coils and a full 1-year parts & labor warranty.",
    "primaryCta": {
        "label": "Order $395+ LG Units Online",
        "href": "/shop"
    },
    "phoneEventLabel": "Budget LG Guide Call",
    "table": {
        "id": "oahu-budget-vs-inverter-lg-table",
        "eyebrow": "HONEST WAIPAHU VALUE COMPARISON",
        "heading": "LG Standard ($395 / $625) vs. LG Dual Inverter Upgrade Math",
        "intro": "We stock both LG Standard fixed-speed units and LG Dual Inverter units side-by-side so you can pick lowest upfront purchase price or lowest monthly HECO power bill:",
        "caption": "Comparison of LG LW8024RD ($395) and LW1217ERSM1 ($625) against LG Dual Inverter equivalents at 44.2 cents per kWh Oahu electricity rates.",
        "columns": [
            "LG Model",
            "Waipahu Price",
            "Net After $45 Rebate",
            "CEER / Noise",
            "Ideal Oahu Use Case"
        ],
        "rows": [
            {
                "rowHeader": "LG LW8024RD (8,000 BTU Std)",
                "cells": [
                    "$395",
                    "$395 (Non-Inverter)",
                    "12.0 CEER • 52 dB",
                    "Guest Rooms, Rentals & Tight Budgets"
                ],
                "highlight": true
            },
            {
                "rowHeader": "LG LW6023IVSM (6,000 BTU Inv)",
                "cells": [
                    "$560",
                    "$515 (-$45 HI Energy)",
                    "15.5 CEER • 44 dB",
                    "Nightly Sleepers (100–220 sq. ft.)"
                ],
                "highlight": false
            },
            {
                "rowHeader": "LG LW1217ERSM1 (12,000 BTU WiFi)",
                "cells": [
                    "$625",
                    "$625 (Non-Inverter)",
                    "12.0 CEER • 52 dB",
                    "Mid-Size Living Rooms & Offices"
                ],
                "highlight": true
            },
            {
                "rowHeader": "LG LW1222IVSM (12,000 BTU Inv)",
                "cells": [
                    "$745",
                    "$700 (-$45 HI Energy)",
                    "15.0 CEER • 44 dB",
                    "8+ Hr/Day Cooling (Fastest HECO ROI)"
                ],
                "highlight": false
            }
        ],
        "footnote": "Both LW8024RD ($395) and LW1217ERSM1 ($625) plug into standard 115V / 15-Amp household outlets (NEMA 5-15P) and include wireless remotes and Gold Fin coastal condenser protection."
    },
    "deepDiveEyebrow": "BUILT FOR HAWAII LONGEVITY EVEN AT ENTRY PRICING",
    "deepDiveHeading": "Why Factory-New LG Beats Throwaway Off-Brand Units",
    "deepDiveIntro": "Disposable no-name window units sold online often rust out in 14 months of Oahu salt air and lack local parts support. Here is what sets our entry-tier LG models apart:",
    "cards": [
        {
            "code": "01",
            "title": "LG Gold Fin™ Salt-Air Condenser Coating Included",
            "paragraphs": [
                "Even on our $395 LW8024RD and $625 LW1217ERSM1, LG coats the exterior aluminum condenser fins with hydrophilic Gold Fin™ epoxy protection.",
                "In Ewa Beach, Kailua, Kaneohe, and Honolulu trade winds, Gold Fin slows white aluminum-oxide salt crusting so heat rejection stays strong season after season."
            ],
            "bullets": [
                "Standard on both LW8024RD ($395) and LW1217ERSM1 ($625)",
                "Pairs with annual freshwater coil rinsing for multi-year life"
            ]
        },
        {
            "code": "02",
            "title": "Compact 58-Lb Cabinet on the $395 LW8024RD",
            "paragraphs": [
                "At 12.4\" H x 19.6\" W x 19.4\" D and just 58 lbs net weight, the 8,000 BTU LW8024RD has the shallowest exterior projection in our entire 16-model catalog.",
                "That shallow 19.4-inch depth makes it a favorite for walk-up apartment walkways, narrow lanai clearances, and quick one-person rental turnovers."
            ],
            "bullets": [
                "Fits windows 22\" to 36\" wide with 13\" minimum height",
                "Includes digital thermostat, 24-hr timer, and auto-restart after HECO outages"
            ]
        },
        {
            "code": "03",
            "title": "Slide-Out Chassis + ThinQ Wi-Fi on the $625 LW1217ERSM1",
            "paragraphs": [
                "Most entry-price 12,000 BTU units drop smart controls and use sealed cabinets. The LG LW1217ERSM1 ($625) keeps full LG ThinQ smartphone Wi-Fi control AND a commercial Slide In-Out chassis.",
                "You can cool down your living room from your phone 20 minutes before driving home on the H-1, and slide the chassis out cleanly for future deep cleaning."
            ],
            "bullets": [
                "3.8 pints/hr dehumidification + 310 CFM airflow",
                "Fits 27\" to 39\" window widths (16\" min height)"
            ]
        },
        {
            "code": "04",
            "title": "When to Save Upfront vs. Step Up to Dual Inverter",
            "paragraphs": [
                "If the AC runs 2 to 4 hours in the afternoon (home office, kids' study room, guest room, or landlord-supplied rental where tenant pays electric), the $395 LW8024RD or $625 LW1217ERSM1 delivers unbeatable upfront value.",
                "If you pay the HECO bill yourself and run the AC 8 to 12 hours every night while sleeping, spending $120–$165 more ($75–$120 net after the $45 Hawaii Energy rebate) for Dual Inverter pays for itself inside one Oahu summer."
            ],
            "bullets": [
                "Zero pressure — inspect both models at our Waipahu warehouse",
                "20 units each of LW8024RD and LW1217ERSM1 stocked locally"
            ]
        }
    ],
    "checklist": {
        "eyebrow": "SAME-DAY WAIPAHU PICKUP CHECKLIST",
        "heading": "How to Pick Up Your $395 or $625 LG AC Today",
        "description": "Skip 2-to-3-week mainland freight delays and dented courier boxes with local Waipahu fulfillment:",
        "items": [
            "Order online at affordablehome-ac.com/shop to lock live stock instantly (Apple Pay, Google Pay, or US card).",
            "Choose $0 Free Waipahu Warehouse Pickup by appointment (94-150 Leoleo St. #203) or $50 flat Oahu curbside delivery.",
            "LW8024RD boxed weight is just 65 lbs — fits upright in nearly any SUV, crossover, hatchback, or pickup truck.",
            "Need jalousie glass retrofitting or window mounting? Book a $0 Free In-Home Estimate by appointment with floor drop-cloth protection."
        ],
        "relatedLinks": [
            {
                "label": "Inverter vs. Standard Window AC Payback Math",
                "href": "/inverter-window-ac-vs-standard-hawaii"
            },
            {
                "label": "Window AC HECO Electricity Cost Calculator",
                "href": "/window-ac-electricity-cost-heco-calculator-hawaii"
            },
            {
                "label": "Property Manager & Landlord Supply Oahu",
                "href": "/property-manager-landlord-window-ac-oahu"
            },
            {
                "label": "Free Waipahu Warehouse Pickup Guide",
                "href": "/window-ac-warehouse-pickup-waipahu"
            }
        ]
    },
    "faqsHeading": "Affordable LG Standard Window AC FAQs",
    "faqs": [
        {
            "q": "Are your $395 and $625 LG units brand-new or refurbished?",
            "a": "100% brand-new and factory-sealed in original LG cartons. We never sell used, open-box, or scratched-and-dented units, and every new LG window AC carries LG's 1-Year Parts & Labor manufacturer warranty."
        },
        {
            "q": "Does the $395 LG LW8024RD qualify for the $45 Hawaii Energy rebate?",
            "a": "No—Hawaii Energy restricts the $45 window AC rebate to ENERGY STAR certified inverter models (starting with our $560 LG LW6023IVSM, which becomes $515 net after rebate). The LW8024RD ($395) gives you the lowest immediate out-of-pocket price with zero paperwork."
        },
        {
            "q": "Will the $395 LW8024RD cool a standard Oahu bedroom?",
            "a": "Yes! At 8,000 BTU (rated up to 350 sq. ft. AHAM and calibrated up to 280 sq. ft. for uninsulated Oahu single-wall bedrooms), the LW8024RD cools standard 120 to 260 sq. ft. bedrooms rapidly on a normal 115V wall plug."
        },
        {
            "q": "Can you replace an old noisy window AC and haul away the dead unit during installation?",
            "a": "Yes. Request a $0 Free In-Home Estimate by appointment at (808) 488-1111 or through our Window AC Installation page, and our technicians will quote removing your failed unit and mounting your new LG unit cleanly over protective floor drop cloths."
        }
    ],
    "quickShopModelIds": [
        11,
        12,
        1,
        4
    ],
    "quickShopTitle": "Order In-Stock $395 & $625 LG Window ACs Online",
    "quickShopSubheading": "20+ units in stock in Waipahu. Free warehouse pickup by appointment or $50 flat Oahu delivery.",
    "eeatTopicTitle": "Affordable LG Standard Window ACs Oahu ($395 LW8024RD & $625 LW1217ERSM1)",
    "reviewsTitle": "Oahu Value & Waipahu Pickup Customer Reviews",
    "reviewsSubtitle": "Real Oahu homeowners & property managers rated 4.9★ across 142 reviews"
};

export default function PillarRoutePage() {
    return (
        <main className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[92px] md:pt-[180px] pb-36 lg:pb-24">
            <OahuPillarPageBody {...PAGE_DATA} />
        </main>
    );
}
