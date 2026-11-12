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
            "name": "Window AC Plug Guide",
            "href": "/shop/window-ac-plug-guide"
        },
        {
            "name": "208V/230V NEMA 6-15 & 6-20 Outlet Guide"
        }
    ],
    "badge": "High-Capacity 18,000–23,500 BTU Electrical Verification • Honolulu 208V Compatible",
    "h1Main": "208V / 230V Window AC Outlets",
    "h1Highlight": "NEMA 6-15 & 6-20 Oahu Identification Guide",
    "leadParagraph": "Ordering an 18,000, 23,000, or 23,500 BTU large-room window air conditioner on Oahu requires matching your exact wall receptacle blade pattern BEFORE delivery or pickup. All four of our high-capacity LG models are dual-rated for both 208V (Honolulu high-rise condos) and 230V/240V (single-family homes), but cooling-only Dual Inverters use a 15-Amp NEMA 6-15P plug while Cool+Heat models require a 20-Amp NEMA 6-20P T-slot receptacle.",
    "primaryCta": {
        "label": "Shop 18k–23.5k Large Room Units",
        "href": "/shop/large-room-window-ac-oahu"
    },
    "phoneEventLabel": "230V Outlet Guide Call",
    "table": {
        "id": "nema-230v-outlet-matching-table",
        "eyebrow": "EXACT NEMA BLADE & WAIPAHU MODEL MATCHING CHART",
        "heading": "Match Your Wall Outlet Faceplate to the Right LG Model",
        "intro": "Never use cheater plug adapters on high-amperage air conditioners. Match your wall receptacle geometry directly to the factory LCDI cord:",
        "caption": "NEMA receptacle blade configuration, voltage, breaker amperage, and matching Waipahu LG window air conditioner models.",
        "columns": [
            "NEMA Plug / Outlet",
            "Blade Shape",
            "Circuit Spec",
            "Matching Waipahu Models",
            "Price & Stock Tier"
        ],
        "rows": [
            {
                "rowHeader": "NEMA 5-15P / 5-15R (Max 115V)",
                "cells": [
                    "Two vertical parallel blades + ground pin",
                    "115V / 15-Amp",
                    "LG LW1522FVSM (14,000 BTU Dual Inv) + all 6k–12k",
                    "$395 – $1,200 (No 230V needed!)"
                ],
                "highlight": false
            },
            {
                "rowHeader": "NEMA 6-15P / 6-15R (Tandem)",
                "cells": [
                    "Two HORIZONTAL flat blades + ground pin",
                    "208/230V / 15-Amp",
                    "LG LW1822IVSM (18k) & LW2422IVSM (23.5k) Dual Inv",
                    "$925 & $1,025 ($45 Rebate)"
                ],
                "highlight": true
            },
            {
                "rowHeader": "NEMA 6-20P / 6-20R (T-Slot)",
                "cells": [
                    "Left VERTICAL/T-slot + Right HORIZONTAL + ground",
                    "208/230V / 20-Amp",
                    "LG LW1823HRSM (18k) & LW2423HRSM (23k) Cool+Heat",
                    "$925 & $1,025 (20A Required)"
                ],
                "highlight": true
            }
        ],
        "footnote": "Bonus compatibility rule: A 20-Amp NEMA 6-20R T-slot wall outlet safely accepts BOTH 15A NEMA 6-15P plugs AND 20A NEMA 6-20P plugs! However, a 15A NEMA 6-15R outlet ONLY accepts 6-15P."
    },
    "deepDiveEyebrow": "OAHU HIGH-RISE 208V & SUBCONTRACTOR SAFETY RULES",
    "deepDiveHeading": "4 Electrical Facts Every Oahu Buyer Should Know",
    "deepDiveIntro": "Checking your outlet takes 15 seconds and prevents the #1 mistake buyers make when ordering large living-room air conditioners:",
    "cards": [
        {
            "code": "01",
            "title": "Honolulu High-Rise 208V vs. Single-Family 240V Compatibility",
            "paragraphs": [
                "Single-family homes in Kapolei, Mililani, Kailua, and Waipahu receive 120/240V split-phase power from pole transformers. High-rise concrete condos in Honolulu, Ala Moana, Makiki, and Salt Lake derive power from 3-phase wye building transformers that deliver 208V across the two hot legs instead of 240V.",
                "Every 18k, 23k, and 23.5k LG model we stock is factory nameplate-rated for 208/230V (±10%), so rotary compressors and inverter boards run safely in both Honolulu towers and suburban homes."
            ],
            "bullets": [
                "Full 208V–240V operating range verified on all 4 large LG SKUs",
                "Built-in LCDI cord leakage detection protects against arc faults"
            ]
        },
        {
            "code": "02",
            "title": "NEMA 6-20R T-Slot Backwards Compatibility Explained",
            "paragraphs": [
                "Look at the left slot of your 230V wall outlet: if it looks like a sideways 'T' (vertical + horizontal cross) while the right slot is horizontal, you have a 20-Amp NEMA 6-20R receptacle.",
                "That T-slot is UL-engineered to accept BOTH our 15-Amp cooling-only Dual Inverters (LW1822IVSM / LW2422IVSM) AND our 20-Amp Cool+Heat units (LW1823HRSM / LW2423HRSM). If both top slots are strictly horizontal lines (— —), you have a 15-Amp NEMA 6-15R and must choose LW1822IVSM or LW2422IVSM."
            ],
            "bullets": [
                "6-20R wall outlet -> Fits LW1822IVSM, LW2422IVSM, LW1823HRSM & LW2423HRSM",
                "6-15R wall outlet -> Fits LW1822IVSM & LW2422IVSM only"
            ]
        },
        {
            "code": "03",
            "title": "Licensed Electrical Subcontractor Grounding Mandate",
            "paragraphs": [
                "Never swap a 15-amp faceplate onto 14-AWG wire for a 20-amp unit, and never use illegal 115V-to-230V plug adapters. Dedicated 208/230V branch circuit wiring, breaker panel work, and new NEMA 6-15R/6-20R receptacle installations must be performed strictly by a licensed electrical subcontractor in accordance with Honolulu electrical code.",
                "During our $0 Free In-Home Estimate, our cooling specialist checks your existing outlet location (cord length on 18k/23.5k LG units is ~52 inches / 4.3 ft) so you know upfront if an electrician is needed."
            ],
            "bullets": [
                "Dedicated 208/230V circuit work grounded to licensed electrical subcontractors",
                "Zero extension cords or power strips permitted on window ACs"
            ]
        },
        {
            "code": "04",
            "title": "No 230V Outlet? Meet the 14,000 BTU 115V LG LW1522FVSM",
            "paragraphs": [
                "What if your living room only has regular 115V 3-prong outlets and your HOA or landlord won't allow running a new 230V line from the breaker box?",
                "Order the LG LW1522FVSM 14,000 BTU Dual Inverter ($785 — in stock in Waipahu). It is the largest cooling capacity UL-approved for a standard 115V / 15A NEMA 5-15P household outlet, cooling up to 450 Oahu sq. ft. (700 AHAM) with a $45 Hawaii Energy rebate."
            ],
            "bullets": [
                "Plugs into normal 115V living room outlet — $0 electrician cost",
                "380 CFM high-throw airflow + 4.2 pints/hr dehumidification"
            ]
        }
    ],
    "checklist": {
        "eyebrow": "15-SECOND OUTLET PHOTO CHECK",
        "heading": "Not Sure Which 230V Outlet You Have?",
        "description": "Before placing your online order for an 18,000 or 23,500 BTU unit, verify these four items:",
        "items": [
            "Snap a clear photo of your wall outlet faceplate and breaker label — call (808) 488-1111 and our Waipahu team will confirm NEMA 5-15R, 6-15R, or 6-20R in seconds.",
            "Measure distance from the bottom-right corner of your window to the outlet (must be within ~4 ft so the factory LCDI plug reaches directly without an extension cord).",
            "Verify window opening size: 18,000 to 23,500 BTU LG cabinets require at least 29\" width and 18\"–19\" height.",
            "If you only have a 115V normal outlet, select the 14,000 BTU LG LW1522FVSM ($785) or contact a licensed electrical subcontractor to add a dedicated 230V circuit first."
        ],
        "relatedLinks": [
            {
                "label": "115V vs 230V Interactive Plug Guide",
                "href": "/shop/window-ac-plug-guide"
            },
            {
                "label": "Large Room 18k & 23.5k Buyer Guide",
                "href": "/shop/large-room-window-ac-oahu"
            },
            {
                "label": "115V Standard Plug Window ACs Oahu",
                "href": "/low-voltage-window-ac-115v-oahu"
            },
            {
                "label": "AC Keeps Tripping Breaker Troubleshooting",
                "href": "/ac-keeps-tripping-breaker-hawaii"
            }
        ]
    },
    "faqsHeading": "208V / 230V Window AC Outlet Oahu FAQs",
    "faqs": [
        {
            "q": "What is the difference between a NEMA 6-15P and NEMA 6-20P window AC plug?",
            "a": "Both are 208/230-volt grounded 3-prong plugs, but NEMA 6-15P (15-Amp, used on our LG LW1822IVSM and LW2422IVSM Dual Inverters) has two flat horizontal blades (— —). NEMA 6-20P (20-Amp, used on our LG LW1823HRSM and LW2423HRSM Cool+Heat units) has one vertical blade and one horizontal blade, requiring a 20-amp T-slot wall outlet."
        },
        {
            "q": "Will a 230V LG Dual Inverter work on a 208V Honolulu condo circuit?",
            "a": "Yes! All four of our large-capacity LG units (LW1822IVSM, LW2422IVSM, LW1823HRSM, and LW2423HRSM) are factory rated for 208/230V 60Hz operation, making them 100% compatible with Honolulu high-rise 208V building power."
        },
        {
            "q": "Can Affordable Home A/C install a new 230V outlet or breaker for me?",
            "a": "We specialize strictly in Window AC sales, mounting, custom window sealing, and coil cleaning; dedicated 208/230V electrical circuit additions or receptacle conversions are performed by licensed electrical subcontractors."
        },
        {
            "q": "What is the biggest window AC that runs on a regular 115V outlet?",
            "a": "The 14,000 BTU LG Dual Inverter LW1522FVSM ($785, in stock at our Waipahu warehouse) is our highest-BTU model that plugs into a standard 115-volt, 15-amp NEMA 5-15R household outlet."
        }
    ],
    "quickShopModelIds": [
        6,
        7,
        9,
        5
    ],
    "quickShopTitle": "Order 208/230V (18k–23.5k) or Max-115V (14k) Units Online",
    "quickShopSubheading": "In stock at our Waipahu warehouse. Free pickup by appointment or $50 flat Oahu delivery.",
    "eeatTopicTitle": "208V / 230V Window AC Outlets (NEMA 6-15 & 6-20) Identification Guide Oahu",
    "reviewsTitle": "Large Living Room & 230V Upgrade Reviews",
    "reviewsSubtitle": "Verified Oahu homeowners cooling open-concept homes & Honolulu condos"
};

export default function PillarRoutePage() {
    return (
        <main className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[92px] md:pt-[180px] pb-36 lg:pb-24">
            <OahuPillarPageBody {...PAGE_DATA} />
        </main>
    );
}
