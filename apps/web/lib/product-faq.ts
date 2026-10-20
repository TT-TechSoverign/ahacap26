export interface FAQItem {
    q: string;
    a: string;
}

export function getProductFaqs(productName: string): FAQItem[] {
    return [
        {
            q: `Does Affordable Home A/C deliver and install the ${productName} near me?`,
            a: `Yes, we offer professional installation by appointment ($0 Free In-Home Estimate) across all 22 Oahu communities and flat-rate $50 delivery across our 15-municipality Oahu delivery zone, including Waipahu, Honolulu, Kapolei, Ewa Beach, Kailua, Kaneohe, Mililani, Pearl City, Aiea, and Hawaii Kai.`
        },
        {
            q: `Can I pick up the ${productName} directly at your Waipahu warehouse?`,
            a: `Yes, free ($0) local pickup by appointment is available at our central Waipahu warehouse (94-150 Leoleo St #203). Select Waipahu warehouse pickup at checkout and our dispatch team will coordinate your loading window.`
        },
        {
            q: `Does the ${productName} qualify for the $45 Hawaii Energy Cash Rebate?`,
            a: `Qualifying Energy Star certified inverter models are eligible for a $45 cash rebate from Hawaii Energy when replacing an older unit on Oahu. We include the official Hawaii Energy rebate application PDF and itemized receipt with your order.`
        },
        {
            q: `How does Island Microclimate Calibration™ sizing differ from the AHAM mainland rating on the ${productName}?`,
            a: `Mainland AHAM square-footage ratings assume R-19 insulated drywall and milder mainland heat. Our Island Microclimate Calibration™ adjusts room sizing for Oahu's uninsulated single-wall redwood construction, jalousie louver solar gain, and tropical humidity—while variable-speed inverter technology helps reduce monthly HECO (~44.2¢/kWh) electric bills by up to 40%.`
        },
        {
            q: `Can the ${productName} be installed in Hawaii jalousie louvers or horizontal sliding windows?`,
            a: `Yes! Our Oahu installation specialists custom-measure your opening, remove necessary jalousie glass slats or fabricate vertical slider filler panels, install standard exterior support brackets when needed, and lay protective floor drop cloths under every window.`
        },
        {
            q: `What is the warranty and return policy for the ${productName}?`,
            a: `The ${productName} is brand-new, factory-sealed, and backed by a 1-year manufacturer warranty. Please note that all sales are final—we do not accept returns or exchanges. Warranty claims are processed directly through the manufacturer.`
        }
    ];
}
