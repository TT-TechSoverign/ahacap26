'use client';

import React from 'react';
import { OahuPillarPageBody, OahuPillarPageProps } from '@/components/OahuPillarPageBody';

const PAGE_DATA: OahuPillarPageProps = {
    "breadcrumbs": [
        {
            "name": "Window AC Installation",
            "href": "/window-ac-installation"
        },
        {
            "name": "Oahu Unit & Installation Cost Guide"
        }
    ],
    "badge": "$0 Free In-Home Estimate • Zero Fabricated Flat-Rate Packages • Itemized Quotes",
    "h1Main": "Window AC Installation Cost",
    "h1Highlight": "Oahu 2026 Equipment & Mounting Guide",
    "leadParagraph": "How much does it actually cost to buy and install a window air conditioner on Oahu in 2026? Equipment prices at our Waipahu warehouse are 100% fixed and published online ($395 to $1,200 across 16 LG & GE models, minus a $45 Hawaii Energy rebate on qualifying inverters). Because Hawaiian jalousie glass louvers, single-wall redwood sills, second-story brackets, and 26-inch condo sleeves vary widely from house to house, we never pad checkout with fabricated flat-rate installation packages — instead, we provide a $0 Free In-Home Estimate with a transparent itemized quote before any work begins.",
    "primaryCta": {
        "label": "Request $0 Free Install Estimate",
        "href": "/window-ac-installation"
    },
    "phoneEventLabel": "Install Cost Guide Call",
    "table": {
        "id": "oahu-window-ac-cost-factors-table",
        "eyebrow": "TRANSPARENT 2026 OAHU COST BREAKDOWN",
        "heading": "Published Equipment Tiers + On-Site Installation Scope Factors",
        "intro": "Here is how total project investment breaks down between fixed Waipahu warehouse unit pricing and custom on-site mounting scope:",
        "caption": "2026 Oahu Window AC equipment price tiers, fulfillment costs, rebates, and custom installation scope variables.",
        "columns": [
            "Project Component",
            "Published Price / Rate",
            "What Is Included",
            "How to Save on Oahu"
        ],
        "rows": [
            {
                "rowHeader": "Entry LG Standard Units (8k–12k)",
                "cells": [
                    "$395 – $625",
                    "Factory-new LW8024RD / LW1217ERSM1 + 1-Yr Warranty",
                    "Free Waipahu pickup saves $50 delivery"
                ],
                "highlight": false
            },
            {
                "rowHeader": "LG Dual Inverter Units (6k–23.5k)",
                "cells": [
                    "$560 – $1,025",
                    "44 dB ultra-quiet R-32 inverter + ThinQ Wi-Fi",
                    "Claim $45 Hawaii Energy rebate + ~$424/yr HECO"
                ],
                "highlight": true
            },
            {
                "rowHeader": "GE 26\" Built-In + RAB26A Sleeve",
                "cells": [
                    "$1,000 – $1,200 ($275 Sleeve)",
                    "True rear-breathing condo chassis + 2-Yr Full Warranty",
                    "Reuse existing 26\" sleeve if rust-free"
                ],
                "highlight": false
            },
            {
                "rowHeader": "Standard Sash / Horizontal Slider",
                "cells": [
                    "$0 Estimate (Itemized Quote)",
                    "Level pitch calibration, side infill panel, foam weather seal",
                    "Standard ground-floor sills rarely need brackets"
                ],
                "highlight": false
            },
            {
                "rowHeader": "Hawaiian Jalousie Louver Retrofit",
                "cells": [
                    "$0 Estimate (Itemized Quote)",
                    "Glass/wood slat removal, custom UV-clear rigid infill, marine seal",
                    "Preserves your original louvers safely on-site"
                ],
                "highlight": true
            },
            {
                "rowHeader": "Exterior Support Bracket / 2nd Story",
                "cells": [
                    "$0 Estimate (Evaluated On-Site)",
                    "Heavy-gauge cantilever load transfer off thin wood sills",
                    "Only quoted when sill depth or weight requires it"
                ],
                "highlight": false
            }
        ],
        "footnote": "Zero upfront payment required to schedule an installation estimate. Dedicated 208/230V circuit additions or receptacle changes are referred to a licensed electrical subcontractor."
    },
    "deepDiveEyebrow": "WHY WE QUOTE BY APPOINTMENT INSTEAD OF BLIND FLAT RATES",
    "deepDiveHeading": "4 Factors That Change Oahu Window AC Installation Labor",
    "deepDiveIntro": "A blind 'one-price-fits-all' installation button online either overcharges homeowners with simple double-hung windows by hundreds of dollars or triggers surprise change-orders on arrival. Here is what our specialist inspects at $0 cost:",
    "cards": [
        {
            "code": "01",
            "title": "Hawaiian Jalousie Louvers vs. Double-Hung Sashes",
            "paragraphs": [
                "Installing an 8,000 BTU unit in a modern Mililani double-hung vinyl window takes basic sash leveling and insulated side curtains. Installing that same unit in a 1962 Kaimuki or Kaneohe jalousie window requires removing exact louver glass slats, fabricating rigid weatherproof acrylic/PVC framing around the aluminum rack gears, and sealing dozens of trade-wind air gaps.",
                "Itemizing your exact window type ensures simple windows stay inexpensive while jalousie retrofits get airtight craftsmanship that won't leak rain or rattle in 30-mph gusts."
            ],
            "bullets": [
                "Custom rigid infill panels outperform flimsy accordion plastic",
                "Removed jalousie glass slats neatly stacked and left for the homeowner"
            ]
        },
        {
            "code": "02",
            "title": "Single-Wall Redwood Sill Load & Exterior Brackets",
            "paragraphs": [
                "Many Pearl City, Waipahu, Aiea, and Palolo homes are built with 3/4-inch or 1-1/8-inch single-wall tongue-and-groove redwood without a deep 2x4 stud cavity under the sill.",
                "While a 58–63 lb bedroom AC often sits securely on a sound sill without extra hardware, an 85–132 lb 12,000 to 23,500 BTU slide-out chassis frequently requires an exterior cantilever support bracket to transfer torque safely downward."
            ],
            "bullets": [
                "Zero unnecessary bracket upsells when your sill is structurally solid",
                "Stainless/coated hardware resists coastal corrosion"
            ]
        },
        {
            "code": "03",
            "title": "Floor Drop-Cloth Protection & Old Unit Removal",
            "paragraphs": [
                "Removing a waterlogged 10-year-old window AC carries real risk of rusty condensate sloshing onto hardwood, luxury vinyl plank, or carpet if handled carelessly.",
                "Every Affordable Home A/C technician lays clean protective floor drop cloths beneath the work zone before touching a single screw — and we itemize optional old-unit removal cleanly on your estimate."
            ],
            "bullets": [
                "Mandatory floor drop-cloth protocol on 100% of appointments",
                "Clean perimeter weather-stripping tested for 1/4\" outward drain pitch"
            ]
        },
        {
            "code": "04",
            "title": "115V Plug-and-Play vs. Licensed 230V Subcontractor Work",
            "paragraphs": [
                "All 12 of our 6,000 to 14,000 BTU LG and GE models run on existing 115V / 15-Amp household outlets — saving you thousands compared to running high-voltage conduit across a house.",
                "If your large living room requires an 18,000 or 23,500 BTU 208/230V unit and you do not yet have a NEMA 6-15R or 6-20R outlet, any dedicated high-voltage circuit installation is performed strictly by a licensed electrical subcontractor—or you can select our 14,000 BTU 115V LG LW1522FVSM ($785) to skip electrical panel work altogether."
            ],
            "bullets": [
                "14,000 BTU LW1522FVSM ($785) maximizes cooling on standard 115V",
                "Clear upfront electrical check during your $0 estimate"
            ]
        }
    ],
    "checklist": {
        "eyebrow": "FASTEST WAY TO GET YOUR EXACT QUOTE",
        "heading": "3 Steps From $0 Estimate to Ice-Cold Room",
        "description": "Whether you buy your unit from our Waipahu warehouse or already own a new LG/GE window unit in the box, booking takes 2 minutes:",
        "items": [
            "Submit our online $0 Free In-Home Estimate request or call (808) 488-1111 — zero credit card required upfront.",
            "Dispatch calls you first to confirm your Oahu neighborhood, window style (jalousie, slider, sash, or 26\" sleeve), and preferred BTU model.",
            "Our cooling specialist verifies window dimensions, outlet voltage, and bracket needs and presents a clear itemized quote before starting.",
            "Receive your official pre-approved $45 Hawaii Energy cash rebate PDF on qualifying ENERGY STAR Dual Inverter & GE R-32 models."
        ],
        "relatedLinks": [
            {
                "label": "Hawaiian Jalousie Window AC Installation",
                "href": "/jalousie-window-ac-installation-oahu"
            },
            {
                "label": "Horizontal Sliding Window AC Guide",
                "href": "/horizontal-sliding-window-ac-oahu"
            },
            {
                "label": "Exterior Support Brackets & Mounting",
                "href": "/ac-brackets-exterior-security-mounting-oahu"
            },
            {
                "label": "Browse All 16 In-Stock LG & GE Units",
                "href": "/shop"
            }
        ]
    },
    "faqsHeading": "Oahu Window AC Installation Cost FAQs",
    "faqs": [
        {
            "q": "Why don't you charge a flat installation fee during online checkout?",
            "a": "Because Oahu window openings range from 15-minute ground-floor double-hung sashes to custom multi-pane jalousie acrylic fabrications, second-story brackets, and rusted 26-inch concrete condo sleeves. Quoting by appointment ($0 Free In-Home Estimate) guarantees you never overpay for a simple window and never get hit with surprise change-orders on complex openings."
        },
        {
            "q": "Is the in-home Window AC installation estimate really $0?",
            "a": "Yes—100% free ($0) with zero upfront payment barriers. Our dispatch team speaks with you by phone first and schedules an Oahu cooling specialist to evaluate your window or wall sleeve and provide a written itemized quote."
        },
        {
            "q": "Will you install a window AC that I already purchased?",
            "a": "Yes! While most customers save time and money ordering factory-sealed LG or GE inventory directly from our Waipahu warehouse ($395–$1,200), you can also request a $0 installation estimate for a compatible factory-new window AC you already own."
        },
        {
            "q": "Do you patch drywall or install new 230V breaker circuits?",
            "a": "No—we specialize strictly in Window AC & 26-inch wall-sleeve mounting, custom window infill sealing, and coil cleaning (always laying protective floor drop cloths). We do not perform drywall/stucco masonry patching, and any dedicated 208/230V electrical circuit work is handled by licensed electrical subcontractors."
        }
    ],
    "quickShopModelIds": [
        11,
        3,
        4,
        5
    ],
    "quickShopTitle": "Compare Published Waipahu Equipment Prices ($395–$1,200)",
    "quickShopSubheading": "Order your unit online today and request a $0 Free In-Home Installation Estimate by appointment.",
    "eeatTopicTitle": "Window AC Unit & Installation Cost Guide Oahu (2026 Transparent Pricing)",
    "reviewsTitle": "Oahu Jalousie, Slider & Condo Installation Reviews",
    "reviewsSubtitle": "142 verified 5-star reviews praising upfront itemized quotes & clean drop-cloth work"
};

export default function PillarRoutePage() {
    return (
        <main className="bg-[#0a0e14] text-white min-h-screen selection:bg-primary selection:text-white pt-[92px] md:pt-[180px] pb-36 lg:pb-24">
            <OahuPillarPageBody {...PAGE_DATA} />
        </main>
    );
}
