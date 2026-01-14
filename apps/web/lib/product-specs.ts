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
        warranty: '1 Year Limited'
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
        warranty: '1 Year Limited'
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
        warranty: '1 Year Limited'
    },
    'LG_DUAL_SMALL': {
        btu: '9,500 BTU',
        coolingArea: '450 sq. ft.',
        eer: '14.7 (CEER)',
        voltage: '115V',
        amps: '8.5 A',
        watts: '820 W',
        dimensions: '12.5" H x 24.5" W x 21.75" D',
        weight: '65 lbs',
        features: ['Dual Inverter', 'LoDecibel™ Quiet', 'LG ThinQ® WiFi', 'Sleep Mode'],
        warranty: '1 Year Parts & Labor'
    },
    'LG_DUAL_LARGE': {
        btu: '14,000 BTU',
        coolingArea: '800 sq. ft.',
        eer: '14.7 (CEER)',
        voltage: '115V',
        amps: '11.6 A',
        watts: '1190 W',
        dimensions: '15.0" H x 26.0" W x 30.0" D',
        weight: '98 lbs',
        features: ['Dual Inverter', 'Energy Star® Most Efficient', 'Voice Control', '4-Way Swing'],
        warranty: '1 Year Parts & Labor'
    },
    'LG_SMART': {
        btu: '8,000 BTU',
        coolingArea: '350 sq. ft.',
        eer: '12.1',
        voltage: '115V',
        amps: '6.2 A',
        watts: '660 W',
        dimensions: '12.4" H x 19.6" W x 19.4" D',
        weight: '58 lbs',
        features: ['WiFi Enable', 'Auto Restart', 'Clean Filter Alert', 'Energy Saver'],
        warranty: '1 Year Limited'
    }
};

export const getProductSpecs = (id: number): ProductSpec => {
    // Logic to infer specs based on ID ranges (simulated database)
    // In a real app, this would come from the API payload
    if (id === 1) return specs['GE_SMALL'];
    if (id === 2) return specs['GE_MED'];
    if (id === 3) return specs['GE_LARGE'];

    if (id >= 4 && id <= 6) return specs['LG_DUAL_SMALL'];
    if (id >= 7 && id <= 10) return specs['LG_DUAL_LARGE'];

    if (id >= 11 && id <= 13) return specs['LG_SMART'];

    return specs['GE_MED']; // Default fallback
};
