export interface ProductIdentifier {
    id: number;
    gtin12: string;
    mpn: string;
    brand: string;
    catalystBadge: string;
    plugType: '115V' | '230V' | 'N/A';
    bestFor: string;
}

export const PRODUCT_IDENTIFIERS: Record<number, ProductIdentifier> = {
    1: {
        id: 1,
        gtin12: '048231606752',
        mpn: 'LW6023IVSM',
        brand: 'LG',
        catalystBadge: '🏆 #1 Oahu Bestseller • Standard 115V Plug',
        plugType: '115V',
        bestFor: 'Bedrooms & Home Offices (100–200 sq. ft.)'
    },
    2: {
        id: 2,
        gtin12: '048231605861',
        mpn: 'LW8022IVSM',
        brand: 'LG',
        catalystBadge: '⚡ Most Popular Bedroom Upgrade • +33% Power (+$31 over 6k)',
        plugType: '115V',
        bestFor: 'Bedrooms & Nurseries (100–200 sq. ft.)'
    },
    3: {
        id: 3,
        gtin12: '048231605878',
        mpn: 'LW1022IVSM',
        brand: 'LG',
        catalystBadge: '🌿 Energy Star® Most Efficient 2024 • Master Bedroom Champion',
        plugType: '115V',
        bestFor: 'Master Bedrooms & Studios (200–250 sq. ft.)'
    },
    4: {
        id: 4,
        gtin12: '048231605885',
        mpn: 'LW1222IVSM',
        brand: 'LG',
        catalystBadge: '❄️ High-Yield Master Suite • 115V Plug • Gold Fin™ Salt Shield',
        plugType: '115V',
        bestFor: 'Master Suites & Living Spaces (200–250 sq. ft.)'
    },
    5: {
        id: 5,
        gtin12: '048231607421',
        mpn: 'LW1522FVSM',
        brand: 'LG',
        catalystBadge: '🚀 Highest 115V Capacity on Oahu • Max Airflow (No 230V Rewire!)',
        plugType: '115V',
        bestFor: 'Living Rooms & Large Master Suites (250–350 sq. ft.)'
    },
    6: {
        id: 6,
        gtin12: '048231605908',
        mpn: 'LW1822IVSM',
        brand: 'LG',
        catalystBadge: '⚡ Open-Concept Living Room Titan • 230V High-Torque Power',
        plugType: '230V',
        bestFor: 'Vaulted Living Areas & Great Rooms (400+ sq. ft.)'
    },
    7: {
        id: 7,
        gtin12: '048231605915',
        mpn: 'LW2422IVSM',
        brand: 'LG',
        catalystBadge: '🌊 Commercial & Whole-Floor Titan • 23,500 BTU Ice-Cold Output',
        plugType: '230V',
        bestFor: 'Whole Floors & Commercial Open Plans (400+ sq. ft.)'
    },
    8: {
        id: 8,
        gtin12: '048231606448',
        mpn: 'LW8023HRSM',
        brand: 'LG',
        catalystBadge: '☀️ All-Season Dual-Climate • 7,600 Cool + 7,000 Heat',
        plugType: '115V',
        bestFor: 'Bedrooms & Studios Needing Heating (100–200 sq. ft.)'
    },
    9: {
        id: 9,
        gtin12: '048231606462',
        mpn: 'LW1823HRSM',
        brand: 'LG',
        catalystBadge: '☀️ Large Room Dual-Climate • 18,000 Cool + 12,000 Heat',
        plugType: '230V',
        bestFor: 'Open Living Areas Needing Year-Round Climate (400+ sq. ft.)'
    },
    10: {
        id: 10,
        gtin12: '048231606479',
        mpn: 'LW2423HRSM',
        brand: 'LG',
        catalystBadge: '☀️ Titan Dual-Climate • 23,000 Cool + 12,000 Heat',
        plugType: '230V',
        bestFor: 'Commercial & Whole Floor All-Weather (400+ sq. ft.)'
    },
    11: {
        id: 11,
        gtin12: '048231606950',
        mpn: 'LW8024RD',
        brand: 'LG',
        catalystBadge: '💰 Best Value Island Workhorse • Flat $355 Promo',
        plugType: '115V',
        bestFor: 'Standard Bedroom Budget Replacement (100–200 sq. ft.)'
    },
    12: {
        id: 12,
        gtin12: '048231606578',
        mpn: 'LW1217ERSM1',
        brand: 'LG',
        catalystBadge: '💰 High-BTU Value Champion • 12,000 BTU on Standard 115V',
        plugType: '115V',
        bestFor: 'Master Bedrooms on Budget (200–250 sq. ft.)'
    },
    13: {
        id: 13,
        gtin12: '084691920045',
        mpn: 'AJCQ08AWJ',
        brand: 'GE Appliances',
        catalystBadge: '🏢 26" Condo & High-Rise Wall Sleeve Fit • Direct Slide-In',
        plugType: '115V',
        bestFor: 'High-Rise & Condominium Wall Sleeves (100–200 sq. ft.)'
    },
    14: {
        id: 14,
        gtin12: '084691920113',
        mpn: 'AJCQ10AWJ',
        brand: 'GE Appliances',
        catalystBadge: '🏢 26" Wall Sleeve Universal Fit • High-Velocity Airflow',
        plugType: '115V',
        bestFor: 'Condominium Master Rooms (200–250 sq. ft.)'
    },
    15: {
        id: 15,
        gtin12: '084691920076',
        mpn: 'AJCQ12AWJ',
        brand: 'GE Appliances',
        catalystBadge: '🏢 26" Wall Sleeve Powerhouse • Auto-Restart Surge Protection',
        plugType: '115V',
        bestFor: 'Condo Great Rooms with Existing 26" Sleeves (200–250 sq. ft.)'
    },
    16: {
        id: 16,
        gtin12: '084691854265',
        mpn: 'RAB26A',
        brand: 'GE Appliances',
        catalystBadge: '🛠️ Architect-Grade Galvanized Steel Wall Sleeve with Grille',
        plugType: 'N/A',
        bestFor: 'New Wall Sleeve Installations & High-Rise Replacements'
    }
};

export function getProductIdentifier(id: number): ProductIdentifier | undefined {
    return PRODUCT_IDENTIFIERS[id];
}
