import { Render } from "@measured/puck";
import config from "../puck.config";
import Navbar from '@/components/Navbar';
import { BackToTop } from '@/components/BackToTop';
import Footer from '@/components/Footer';

// Force dynamic since we fetch fresh content
export const dynamic = 'force-dynamic';

export default async function LandingPage() {
    const API_INTERNAL_URL = process.env.API_INTERNAL_URL || 'http://localhost:8000';
    let data = null;

    try {
        // Fetch PUBLISHED data (no draft param)
        const res = await fetch(`${API_INTERNAL_URL}/api/v1/content/`, {
            cache: 'no-store'
        });
        if (res.ok) {
            const json = await res.json();
            data = json.data;
        }
    } catch (e) {
        console.error("Failed to load content:", e);
    }

    // Default Data (Legacy Content Migration)
    if (!data || Object.keys(data).length === 0) {
        data = {
            content: [
                {
                    type: "Hero", props: {
                        badge: "Est. 2005",
                        titleLine1: "Cooling Oahu",
                        titleHighlight1: "One Home",
                        titleHighlight2: "At A Time",
                        subBadges: [{ text: "Authorized LG Dealer" }, { text: "Licensed & Insured" }, { text: "Energy Efficient" }],
                        ctaShop: { text: "Shop Inventory", href: "/shop", variant: "primary" },
                        ctaEstimate: { text: "Get Estimate", href: "/contact", variant: "outline" }
                    }
                },
                {
                    type: "Services", props: {
                        title: "Elite Cooling",
                        titleHighlight: "Solutions",
                        description: "Specializing in Window AC Units...",
                        backlinks: [],
                        items: [
                            { title: "Window AC Sales", description: "LG & GE Units", icon: "ac_unit", linkText: "View Units", href: "/shop", color: "primary" },
                            { title: "Mini Splits", description: "Ductless Systems", icon: "mode_fan", linkText: "Learn More", href: "/mini-splits", color: "accent" }
                        ]
                    }
                },
                { type: "Video", props: { videoUrl: "/hero.mp4" } },
                {
                    type: "Partnerships", props: {
                        title: "Strategic",
                        titleHighlight: "Partnerships",
                        narrativeParam: "All Oahu AC is proud to partner with industry leaders...",
                        brandsWindow: [
                            { name: "LG", colorClass: "text-rose-500", fontClass: "font-sans font-black tracking-tighter text-6xl" },
                            { name: "GE APPLIANCES", colorClass: "text-blue-400", fontClass: "font-serif font-bold tracking-wide text-3xl" },
                            { name: "Hawai'i Energy", colorClass: "text-[#00FFFF]", fontClass: "font-sans font-bold tracking-tight text-4xl" }
                        ],
                        brandsMiniSplit: [
                            { name: "MITSUBISHI ELECTRIC", colorClass: "text-red-600", fontClass: "font-header font-bold tracking-normal uppercase text-xl" },
                            { name: "FUJITSU", colorClass: "text-red-500", fontClass: "font-sans font-bold italic tracking-widest text-3xl" },
                            { name: "DAIKIN", colorClass: "text-sky-400", fontClass: "font-header font-medium tracking-widest text-2xl" },
                            { name: "CARRIER", colorClass: "text-blue-600", fontClass: "font-sans font-extrabold tracking-tighter text-3xl" }
                        ],
                        brandsCentral: [
                            { name: "RHEEM", colorClass: "text-red-500", fontClass: "font-header font-bold tracking-tight text-5xl" },
                            { name: "BOSCH", colorClass: "text-cyan-500", fontClass: "font-mono font-bold tracking-[0.2em] text-3xl" }
                        ]
                    }
                },
                {
                    type: "ServiceAreas", props: {
                        badge: "Island-Wide",
                        title: "Oahu Service",
                        titleHighlight: "Coverage",
                        description: "Our dedicated fleet covers the entire island...",
                        regions: [
                            { id: "central", title: "Central Oahu", icon: "location_city", cities: [{ text: "Mililani" }, { text: "Wahiawa" }, { text: "Pearl City" }] },
                            { id: "metro", title: "Metro Honolulu", icon: "apartment", cities: [{ text: "Honolulu" }, { text: "Waikiki" }, { text: "Kakaako" }] },
                            { id: "windward", title: "Windward/North", icon: "waves", cities: [{ text: "Kailua" }, { text: "Kaneohe" }, { text: "Haleiwa" }] },
                            { id: "leeward", title: "Leeward", icon: "sunny", cities: [{ text: "Kapolei" }, { text: "Ewa Beach" }, { text: "Waianae" }] }
                        ]
                    }
                },
                { type: "Calendar", props: { title: "Availability" } },
                {
                    type: "Warehouse", props: {
                        badge: "Waipahu Hub",
                        title: "Warehouse",
                        description: "Central distribution center for rapid deployment.",
                        addressLabel: "Location",
                        addressValue: "Waipahu Commercial Center\n94-150 Leoleo St\nWaipahu, HI 96797",
                        directionsLabel: "Directions",
                        directionsValue: "Near the old mill, accessible via H1.",
                        ctaText: "Get Directions",
                        mapImage: "/assets/ahac-shoplocationv2.svg"
                    }
                }
            ],
            root: { props: { title: "Landing Page" } }
        };
    }

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 selection:bg-primary selection:text-white min-h-screen">
            <Navbar />

            <main className="pt-[140px] md:pt-[240px]">
                <Render config={config} data={data} />
            </main>

            <Footer />
            <BackToTop visible={true} />
        </div>
    );
}
