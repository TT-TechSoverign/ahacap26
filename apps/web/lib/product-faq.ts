export interface FAQItem {
    q: string;
    a: string;
}

export function getProductFaqs(productName: string): FAQItem[] {
    return [
        {
            q: `Does Affordable Home A/C deliver and install the ${productName} near me?`,
            a: `Yes, we offer professional installation and flat-rate delivery for the ${productName} across all 22 Oahu service cities, including Waipahu, Honolulu, Kapolei, Ewa Beach, Kailua, Kaneohe, Mililani, Pearl City, Aiea, and Hawaii Kai.`
        },
        {
            q: `Can I pick up the ${productName} directly?`,
            a: `Yes, free local pickup is available at our Waipahu warehouse for the ${productName}. Select local pickup at checkout and we will notify you when your unit is ready.`
        },
        {
            q: `What is the warranty and return policy for the ${productName}?`,
            a: `The ${productName} is covered by the manufacturer's warranty. Please note that all sales are final—we do not accept returns or exchanges. Warranty claims must be processed directly through the manufacturer.`
        }
    ];
}
