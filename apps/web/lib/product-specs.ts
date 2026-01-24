export interface ProductSpec {
    btu: string;
    coolingArea: string;
    eer: string;
    voltage: string;
    amps: string;
    watts: string;
    dimensions: string;
    weight: string;
    features: string[];
    warranty: string;
    // Educational Fields
    deploymentHeader: string; // e.g., "Best Placements"
    idealFor: string;
    featureHeader: string; // e.g., "Control From Anywhere"
    benefits: string;
    acousticHeader: string; // e.g., "Sleep Soundly & Stay Cool"
    soundProfile: string;
}

const specs: { [key: string]: ProductSpec } = {
    'GE_SMALL': {
        btu: '6,000 BTU',
        coolingArea: '250 sq. ft.',
        eer: '11.0',
        voltage: '115V',
        amps: '4.6 A',
        watts: '490 W',
        dimensions: '12.5" H x 18.5" W x 15.25" D',
        weight: '44 lbs',
        features: ['Remote Control', '3 Fan Speeds', 'Eco Mode', 'Easy Mount Kit'],
        warranty: '1 Year Limited',
        deploymentHeader: 'Best Placements',
        idealFor: 'Small Bedrooms (10x12)',
        featureHeader: 'User-Friendly Control',
        benefits: 'Compact and easier to install in smaller windows.',
        acousticHeader: 'Consistent Cooling',
        soundProfile: 'Standard Rotary (54dB)'
    },
    'GE_MED': {
        btu: '10,000 BTU',
        coolingArea: '450 sq. ft.',
        eer: '11.4',
        voltage: '115V',
        amps: '8.0 A',
        watts: '870 W',
        dimensions: '14.5" H x 19.0" W x 21.5" D',
        weight: '62 lbs',
        features: ['Energy Star', 'Dehumidify Mode', 'WiFi Connect', 'Voice Control'],
        warranty: '1 Year Limited',
        deploymentHeader: 'Best Placements',
        idealFor: 'Medium Bedrooms, Guest Rooms',
        featureHeader: 'Control From Anywhere',
        benefits: 'Balances performance and size, with smart features for convenience.',
        acousticHeader: 'Sleep Soundly & Stay Cool',
        soundProfile: 'Standard Rotary (55dB)'
    },
    'GE_LARGE': {
        btu: '24,000 BTU',
        coolingArea: '1,500 sq. ft.',
        eer: '10.3',
        voltage: '230V',
        amps: '11.2 A',
        watts: '2330 W',
        dimensions: '18.6" H x 26.5" W x 26.5" D',
        weight: '128 lbs',
        features: ['Heat/Cool', 'Slide-Out Chassis', '24h Timer', 'Heavy Duty'],
        warranty: '1 Year Limited',
        deploymentHeader: 'Ideal Installation',
        idealFor: 'Large Living Areas, Garages',
        featureHeader: 'Heavy-Duty Performance',
        benefits: 'High capacity for rapid cooling of large hot spaces.',
        acousticHeader: 'Industrial Power',
        soundProfile: 'High Capacity (60dB)'
    },
    'LG_DUAL_6K': {
        btu: '6,000 BTU',
        coolingArea: '100-200 sq. ft.',
        eer: '14.7 (CEER)',
        voltage: '115V',
        amps: '4.8 A',
        watts: '440 W',
        dimensions: '12.5" H x 19.6" W x 24.5" D',
        weight: '60 lbs',
        features: ['Dual Inverter', 'LoDecibel™ Quiet', 'Sleep Mode', 'Energy Star®'],
        warranty: '1 Year Parts & Labor',
        deploymentHeader: 'Best Placements',
        idealFor: 'Small Bedroom (10x12), Home Office',
        featureHeader: 'Control From Anywhere',
        benefits: 'Dual Inverter technology reduces energy consumption by up to 40% while operating at library-quiet noise levels.',
        acousticHeader: 'Sleep Soundly & Stay Cool',
        soundProfile: 'Ultra-Quiet Mode (44dB) - Similar to a Library'
    },
    'LG_DUAL_8K': {
        btu: '8,000 BTU',
        coolingArea: '100-200 sq. ft.',
        eer: '15.0 (CEER)',
        voltage: '115V',
        amps: '7.0 A',
        watts: '640 W',
        dimensions: '12.5" H x 19.6" W x 24.5" D',
        weight: '63 lbs',
        features: ['Dual Inverter', 'ThinQ® Smart Control', 'Voice Compatible', 'Energy Star®'],
        warranty: '1 Year Parts & Labor',
        deploymentHeader: 'Best Placements',
        idealFor: 'Bedroom, Nursery, Home Office',
        featureHeader: 'Control From Anywhere',
        benefits: 'Integrated ThinQ® smart control allows for remote scheduling and monitoring, perfect for maintaining comfort efficiently.',
        acousticHeader: 'Sleep Soundly & Stay Cool',
        soundProfile: 'Ultra-Quiet (44dB) - Whisper Quiet Operation'
    },
    'LG_DUAL_10K': {
        btu: '10,000 BTU',
        coolingArea: '200-250 sq. ft.',
        eer: '15.0 (CEER)',
        voltage: '115V',
        amps: '9.2 A',
        watts: '920 W',
        dimensions: '12.5" H x 19.6" W x 24.5" D',
        weight: '65 lbs',
        features: ['Dual Inverter', 'Energy Star® Most Efficient', 'Auto Restart', 'Sleep Mode'],
        warranty: '1 Year Parts & Labor',
        deploymentHeader: 'Best Placements',
        idealFor: 'Master Bedroom, Studio Apartment',
        featureHeader: 'Control From Anywhere',
        benefits: 'Recognized as ENERGY STAR® Most Efficient, delivering powerful cooling without the high utility costs.',
        acousticHeader: 'Sleep Soundly & Stay Cool',
        soundProfile: 'LoDecibel™ (44dB) - Unobtrusive Operation'
    },
    'LG_DUAL_12K': {
        btu: '12,000 BTU',
        coolingArea: '200-250 sq. ft.',
        eer: '15.0 (CEER)',
        voltage: '115V',
        amps: '11.0 A',
        watts: '1090 W',
        dimensions: '12.5" H x 23.6" W x 24.5" D',
        weight: '70 lbs',
        features: ['Dual Inverter', 'Gold Fin™ Coating', 'ThinQ® WiFi', '40% Energy Savings'],
        warranty: '1 Year Parts & Labor',
        deploymentHeader: 'Best Placements',
        idealFor: 'Master Suite, Living Room',
        featureHeader: 'Control From Anywhere',
        benefits: 'Gold Fin™ Anti-Corrosive Coating provides essential protection against salt-air oxidation for longevity on the islands.',
        acousticHeader: 'Sleep Soundly & Stay Cool',
        soundProfile: 'Ultra-Quiet Sleep Mode (44dB) - Library Quiet'
    },
    'LG_DUAL_15K': {
        btu: '15,000 BTU',
        coolingArea: '250-350 sq. ft.',
        eer: '14.7 (CEER)',
        voltage: '115V',
        amps: '12.0 A',
        watts: '1350 W',
        dimensions: '15.0" H x 26.0" W x 30.0" D',
        weight: '98 lbs',
        features: ['Dual Inverter', '4-Way Directional', 'High-Torque Compressor', 'Voice Control'],
        warranty: '1 Year Parts & Labor',
        deploymentHeader: 'Best Placements',
        idealFor: 'Large Master, Living Area, Open Plan',
        featureHeader: 'Control From Anywhere',
        benefits: 'High-Torque compressor cycle designed for rapid moisture removal and quick thermal recovery in large spaces.',
        acousticHeader: 'Smooth Power',
        soundProfile: 'Quiet Cooling (52dB) - Powerful but Smooth'
    },
    'LG_DUAL_18K': {
        btu: '18,000 BTU',
        coolingArea: '400+ sq. ft.',
        eer: '14.7 (CEER)',
        voltage: '208/230V',
        amps: '8.8 A',
        watts: '1680 W',
        dimensions: '18.0" H x 26.0" W x 30.0" D',
        weight: '110 lbs',
        features: ['Dual Inverter', 'Maximum Vertical Momentum', 'ThinQ® WiFi', 'Smart Diagnosis'],
        warranty: '1 Year Parts & Labor',
        deploymentHeader: 'Ideal Installation',
        idealFor: 'Whole Floor, Large Open Concept',
        featureHeader: 'Control From Anywhere',
        benefits: 'Engineered with maximum vertical momentum to eliminate hot spots in rooms with vaulted ceilings or complex layouts.',
        acousticHeader: 'Smooth Power',
        soundProfile: 'Efficient Power (52dB) - Quiet for its Class'
    },
    'LG_DUAL_24K': {
        btu: '23,500 BTU',
        coolingArea: '400+ sq. ft.',
        eer: '10.5 (CEER)',
        voltage: '208/230V',
        amps: '10.8 A',
        watts: '2400 W',
        dimensions: '18.0" H x 26.0" W x 30.0" D',
        weight: '114 lbs',
        features: ['Dual Inverter', 'Industrial-Grade Cooling', 'Moisture Management', 'WiFi'],
        warranty: '1 Year Parts & Labor',
        deploymentHeader: 'Target Deployment',
        idealFor: 'Industrial Scale Open Plan, Large Hall',
        featureHeader: 'Control From Anywhere',
        benefits: 'Industrial-grade Titan Cooling capacity for maximum moisture management and temperature control in massive spaces.',
        acousticHeader: 'Industrial Silence',
        soundProfile: 'Power Cooling (53dB) - surprisingly quiet for 24k'
    },
    'LG_SMART_8K': {
        btu: '8,000 BTU',
        coolingArea: '350 sq. ft.',
        eer: '12.1',
        voltage: '115V',
        amps: '6.2 A',
        watts: '660 W',
        dimensions: '12.4" H x 19.6" W x 19.4" D',
        weight: '58 lbs',
        features: ['WiFi Enable', 'Auto Restart', 'Clean Filter Alert', 'Energy Saver'],
        warranty: '1 Year Limited',
        deploymentHeader: 'Best Placements',
        idealFor: 'Small Bedrooms, Home Offices',
        featureHeader: 'Control From Anywhere',
        benefits: 'Smart connectivity allows for remote control and scheduling, perfect for busy professionals.',
        acousticHeader: 'Sleep Soundly & Stay Cool',
        soundProfile: 'Standard Operation (52dB) - White Noise'
    },
    // LG UNIVERSAL FIT (Through-The-Wall)
    'LG_UNI_8K': {
        btu: '8,000 BTU',
        coolingArea: '100-200 sq. ft.',
        eer: '10.7 (CEER)',
        voltage: '115V',
        amps: '7.5 A',
        watts: '750 W',
        dimensions: '14.5" H x 24.0" W x 20.0" D',
        weight: '70 lbs',
        features: ['Dual-Climate (Heat/Cool)', 'Universal Fit', 'Remote Control'],
        warranty: '1 Year Parts & Labor',
        deploymentHeader: 'Best Placements',
        idealFor: 'Small Rooms with Wall Sleeves',
        featureHeader: 'Dual-Climate Comfort',
        benefits: 'Dual-Climate Optimization provides precise 7,000 BTU Heating alongside cooling for year-round comfort.',
        acousticHeader: 'Quiet Operation',
        soundProfile: 'Standard (53dB)'
    },
    'LG_UNI_18K': {
        btu: '18,000 BTU',
        coolingArea: '400+ sq. ft.',
        eer: '10.7 (CEER)',
        voltage: '208/230V',
        amps: '8.3 A',
        watts: '1750 W',
        dimensions: '16.75" H x 26.0" W x 26.0" D',
        weight: '120 lbs',
        features: ['Universl Fit', 'ThinQ® Smart Control', 'High-Capacity Moisture Removal'],
        warranty: '1 Year Parts & Labor',
        deploymentHeader: 'Ideal Installation',
        idealFor: 'Large Open Plans (Wall Install)',
        featureHeader: 'Control From Anywhere',
        benefits: 'High-Capacity Moisture Removal (4.8 Pts/Hr) ensures comfort even in humid island conditions.',
        acousticHeader: 'Powerful Flow',
        soundProfile: 'Powerful (56dB) - White Noise'
    },
    'LG_UNI_24K': {
        btu: '23,500 BTU',
        coolingArea: '400+ sq. ft.',
        eer: '9.8 (CEER)',
        voltage: '208/230V',
        amps: '11.2 A',
        watts: '2400 W',
        dimensions: '16.75" H x 26.0" W x 26.0" D',
        weight: '135 lbs',
        features: ['Industrial-Grade Cooling', 'Supplemental Heating', 'Universal Fit'],
        warranty: '1 Year Parts & Labor',
        deploymentHeader: 'Target Deployment',
        idealFor: 'Industrial Scale Spaces',
        featureHeader: 'Industrial-Grade Cooling',
        benefits: 'Offers supplemental 12,000 BTU electrical heating capacity for versatility in higher altitude or cooler zones.',
        acousticHeader: 'Heavy Duty',
        soundProfile: 'Heavy Duty (58dB)'
    },
    // LG STANDARD WINDOW
    'LG_STD_8K': {
        btu: '8,000 BTU',
        coolingArea: '100-200 sq. ft.',
        eer: '12.0',
        voltage: '115V',
        amps: '6.0 A',
        watts: '660 W',
        dimensions: '12.4" H x 19.4" W x 19.4" D',
        weight: '58 lbs',
        features: ['High-Velocity Airflow', 'Rapid Cool Start', 'Auto-Restart'],
        warranty: '1 Year Limited',
        deploymentHeader: 'Best Placements',
        idealFor: 'Bedroom/Office Budget Retrofit',
        featureHeader: 'Rapid Cool Start',
        benefits: 'Rapid Cool Start cycle specifically tuned for immediate thermal recovery in high-humidity tropical environments.',
        acousticHeader: 'Consistent Cooling',
        soundProfile: 'Standard (54dB)'
    },
    'LG_STD_10K': {
        btu: '10,000 BTU',
        coolingArea: '200-250 sq. ft.',
        eer: '12.0',
        voltage: '115V',
        amps: '7.8 A',
        watts: '830 W',
        dimensions: '14.5" H x 19.5" W x 20.0" D',
        weight: '68 lbs',
        features: ['ThinQ® Smart Control', 'Smart Diagnosis™', 'Energy Saver'],
        warranty: '1 Year Limited',
        deploymentHeader: 'Best Placements',
        idealFor: 'Master Bedroom, Studio',
        featureHeader: 'Control From Anywhere',
        benefits: 'Integrated Smart Diagnosis allows for system verification and longevity.',
        acousticHeader: 'Consistent Cooling',
        soundProfile: 'Standard (52dB)'
    },
    'LG_STD_12K': {
        btu: '12,000 BTU',
        coolingArea: '200-250 sq. ft.',
        eer: '12.0',
        voltage: '115V',
        amps: '9.5 A',
        watts: '1000 W',
        dimensions: '14.5" H x 19.5" W x 21.0" D',
        weight: '75 lbs',
        features: ['Gold Fin™ Coating', 'ThinQ® Smart Control', 'Energy Saver'],
        warranty: '1 Year Limited',
        deploymentHeader: 'Best Placements',
        idealFor: 'Master Suite',
        featureHeader: 'Control From Anywhere',
        benefits: 'Gold Fin™ Anti-Corrosive Shield protects the condenser from salt-air damages.',
        acousticHeader: 'Consistent Cooling',
        soundProfile: 'Standard (52dB)'
    },
    // GE PERFORMANCE SERIES (Wall)
    'GE_PERF_8K': {
        btu: '8,000 BTU',
        coolingArea: '100-200 sq. ft.',
        eer: '10.6',
        voltage: '115V',
        amps: '7.5 A',
        watts: '750 W',
        dimensions: '15.6" H x 26.0" W x 21.0" D',
        weight: '68 lbs',
        features: ['True Universal Fit', 'Remote Control', 'Electronic Touch'],
        warranty: '1 Year Limited',
        deploymentHeader: 'Best Placements',
        idealFor: 'Apartment Wall Sleeve Install',
        featureHeader: 'True Universal Fit',
        benefits: 'True Universal Fit design allows it to slide directly into existing 26" wall sleeves for professional gap-free installs.',
        acousticHeader: 'Consistent Cooling',
        soundProfile: 'Standard Rotary (54dB)'
    },
    'GE_PERF_10K': {
        btu: '10,000 BTU',
        coolingArea: '200-250 sq. ft.',
        eer: '10.6',
        voltage: '115V',
        amps: '9.2 A',
        watts: '940 W',
        dimensions: '15.6" H x 26.0" W x 21.0" D',
        weight: '75 lbs',
        features: ['High-Velocity Airflow', 'Six-Way Directional', 'Dehumidify'],
        warranty: '1 Year Limited',
        deploymentHeader: 'Ideal Installation',
        idealFor: 'Medium Room Wall Install',
        featureHeader: 'High-Velocity Airflow',
        benefits: 'High-torque fans maximize air throw, effectively eliminating hot spots in deep-room configurations.',
        acousticHeader: 'Consistent Cooling',
        soundProfile: 'Standard Rotary (55dB)'
    },
    'GE_PERF_12K': {
        btu: '12,000 BTU',
        coolingArea: '200-250 sq. ft.',
        eer: '10.5',
        voltage: '115V',
        amps: '11.0 A',
        watts: '1140 W',
        dimensions: '15.6" H x 26.0" W x 21.0" D',
        weight: '80 lbs',
        features: ['Power Failure Recovery', 'Universal Fit', 'Energy Saver'],
        warranty: '1 Year Limited',
        deploymentHeader: 'Ideal Installation',
        idealFor: 'Large Room Wall Install',
        featureHeader: 'Power Failure Recovery',
        benefits: 'Automatically restarts at previous settings after island power surges, maintaining climate security.',
        acousticHeader: 'Consistent Cooling',
        soundProfile: 'Standard Rotary (56dB)'
    },
    'GE_RAB26A': {
        btu: 'N/A',
        coolingArea: 'N/A',
        eer: 'N/A',
        voltage: 'N/A',
        amps: 'N/A',
        watts: 'N/A',
        dimensions: '15.6" H x 26.0" W x 16.0" D',
        weight: '25 lbs',
        features: ['Baked Enamel Finish', 'Galvanized Steel', 'Quick Snap Assembly'],
        warranty: 'N/A',
        deploymentHeader: 'Target Deployment',
        idealFor: 'New Wall Installations',
        featureHeader: 'Structural Integrity',
        benefits: 'Essential structural case for GE built-in units, ensuring weather-tight seal and support.',
        acousticHeader: 'Build Quality',
        soundProfile: 'N/A'
    },

};

const defaultSpecs: ProductSpec = {
    btu: 'N/A', coolingArea: 'N/A', eer: 'N/A', voltage: '115V', amps: 'N/A', watts: 'N/A', dimensions: 'N/A', weight: 'N/A',
    features: [], warranty: 'N/A',
    deploymentHeader: 'General Use', idealFor: 'General Cooling',
    featureHeader: 'Key Features', benefits: 'Standard cooling solution.',
    acousticHeader: 'Sound Level', soundProfile: 'Standard'
};

// Update existing mock objects (GE_SMALL etc) to include new fields if needed to avoid TS errors, 
// strictly speaking we should updated them all.
specs['GE_SMALL'] = { ...specs['GE_SMALL'], idealFor: 'Small Bedrooms (10x12)', benefits: 'Compact and easier to install in smaller windows.', soundProfile: 'Standard Rotary (54dB)' };
specs['GE_MED'] = { ...specs['GE_MED'], idealFor: 'Medium Bedrooms, Guest Rooms', benefits: 'Balances performance and size, with smart features for convenience.', soundProfile: 'Standard Rotary (55dB)' };
specs['GE_LARGE'] = { ...specs['GE_LARGE'], idealFor: 'Large Living Areas, Garages', benefits: 'High capacity for rapid cooling of large hot spaces.', soundProfile: 'High Capacity (60dB)' };
specs['LG_DUAL_SMALL'] = { ...specs['LG_DUAL_SMALL'], idealFor: 'Bedrooms, Home Offices', benefits: 'Inverter technology provides whisper-quiet operation perfect for sleeping or working.', soundProfile: 'LoDecibel™ (44dB) - Very Quiet' };
specs['LG_DUAL_LARGE'] = { ...specs['LG_DUAL_LARGE'], idealFor: 'Large Spaces', benefits: 'High efficiency cooling.', soundProfile: 'Quiet (50dB)' }; // Fallback for the old key if used

export const getProductSpecs = (id: number): ProductSpec => {
    // Logic to infer specs based on ID ranges (simulated database)
    // LG Dual Inverter Series (4-10)
    if (id === 4) return specs['LG_DUAL_6K'];
    if (id === 5) return specs['LG_DUAL_8K'];
    if (id === 6) return specs['LG_DUAL_10K'];
    if (id === 7) return specs['LG_DUAL_12K'];
    if (id === 8) return specs['LG_DUAL_15K']; // Note: inventory says 15k for ID 8
    if (id === 9) return specs['LG_DUAL_18K'];
    if (id === 10) return specs['LG_DUAL_24K'];

    // LG Universal Fit (11-13)
    if (id === 11) return specs['LG_UNI_8K'];
    if (id === 12) return specs['LG_UNI_18K'];
    if (id === 13) return specs['LG_UNI_24K'];

    // LG Standard (14-16)
    if (id === 14) return specs['LG_STD_8K'];
    if (id === 15) return specs['LG_STD_10K'];
    if (id === 16) return specs['LG_STD_12K'];

    // GE Performance (17-19)
    if (id === 17) return specs['GE_PERF_8K'];
    if (id === 18) return specs['GE_PERF_10K'];
    if (id === 19) return specs['GE_PERF_12K'];

    if (id === 21) return specs['GE_RAB26A'];

    return { ...specs['GE_MED'], idealFor: 'General Use', benefits: 'Reliable cooling.', soundProfile: 'Standard' }; // Default fallback
};
