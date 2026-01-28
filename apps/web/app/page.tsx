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
                        badge: "Est. 2005 • Oahu, HI",
                        titleLine1: "20+ YEARS OF SERVICING ISLAND WIDE",
                        titleHighlight1: "OAHU'S HVAC CONTRACTOR",
                        titleHighlight2: "& AC Specialists",
                        subBadges: [{ text: "LG & GE THROUGH THE WALL AC RETAILER" }, { text: "Licensed & Insured" }, { text: "Energy Saving Units" }],
                        ctaShop: { text: "SHOP WINDOW AC INVENTORY", href: "/shop", variant: "primary" },
                        ctaEstimate: { text: "REQUEST A QUOTE", href: "/contact", variant: "outline" }
                    }
                },
                {
                    type: "Services", props: {
                        title: "CORE",
                        titleHighlight: "SERVICES",
                        description: "OAHU'S UNIQUE HIGH-HUMIDITY ENVIRONMENT AND SILENT SALT-AIR CORROSION DEMAND FAR MORE THAN OFF-THE-SHELF COOLING...",
                        backlinks: [],
                        items: [
                            { title: "MINI SPLITS", description: "Eliminate Hot Spots & High Bills. > Our ultra-quiet ductless mini splits provide targeted cooling...", icon: "ac_unit", linkText: "MORE INFO", href: "/contact", color: "primary" },
                            { title: "WINDOW AC SHOP", description: "Your Local High-Efficiency Resource. Skip the big-box logistics. We stock premium, DIY high-efficiency LG & GE...", icon: "storefront", linkText: "View Inventory", href: "/shop", color: "primary", badge: "In Stock" },
                            { title: "CENTRAL AC", description: "Maximize Whole-Home Comfort. We provide professional Retrofits (Air Handlers & Condensers ONLY)...", icon: "hvac", linkText: "MORE INFO", href: "/contact", color: "accent" },
                            { title: "WINDOW AC CLEANING", description: "Breathe Cleaner, Save Longer. High humidity and salt air are the leading causes of AC failure...", icon: "cleaning_services", linkText: "WINDOW AC MAINTENANCE", href: "/contact", color: "accent" }
                        ]
                    }
                },
                { type: "Video", props: { videoUrl: "/hero.mp4" } },
                {
                    type: "Partnerships", props: {
                        title: "ELITE BRAND PARTNERSHIPS",
                        titleHighlight: "TECHNOLOGY TO MASTER OAHU'S MICRO-CLIMATES",
                        narrativeParam: "AFFORDABLE HOME A/C IS PROUD TO MAINTAIN COMPLIANANCE TO PROVIDE YOU WITH THE WORLD'S LEADING HVAC ENGINEERING FIRMS...",
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
                        badge: "Island-Wide Coverage",
                        title: "Oahu's Premier",
                        titleHighlight: "COOLING NETWORK",
                        description: "Licensed experts delivering optimal air quality and precision cooling. Trusted by homeowner associations...",
                        regions: [
                            { id: "central", title: "Central Oahu", icon: "warehouse", cities: [{ text: "Aiea" }, { text: "Pearl City" }, { text: "Mililani" }, { text: "Waipio Gentry" }, { text: "Waikele" }] },
                            { id: "metro", title: "Metro Honolulu", icon: "apartment", cities: [{ text: "Honolulu" }, { text: "Kalihi" }, { text: "Manoa" }, { text: "Kaimuki" }, { text: "Hawaii Kai" }, { text: "Salt Lake" }] },
                            { id: "leeward", title: "LEEWARD", icon: "sunny", cities: [{ text: "Kapolei" }, { text: "Ewa Beach" }, { text: "Waipahu" }, { text: "Kunia" }] },
                            { id: "windward", title: "Windward & North", icon: "waves", cities: [{ text: "Kailua" }, { text: "Kaneohe" }, { text: "Kahaluu" }] }
                        ]
                    }
                },
                { type: "Calendar", props: { title: "Availability" } },
                {
                    type: "Warehouse", props: {
                        badge: "Local Pickup Center",
                        title: "Shop Location",
                        description: "Our shop is stocked with window units. Order yours today",
                        addressLabel: "Address",
                        addressValue: "94-150 Leoleo St. #203\nWaipahu, HI 96797",
                        directionsLabel: "Directions",
                        directionsValue: "Arrive at Waipahu Commercial Center. Enter one-way drive in lane and continue towards the back warehouses. Make a left and continue down towards end of driveway...",
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
