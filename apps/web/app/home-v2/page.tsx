import { Render } from "@measured/puck";
import config from "../../puck.config";
import NavbarV2 from '@/components/NavbarV2';
import Section1HeroHomeV2 from '@/components/Section1HeroHomeV2';
import Section2OurServicesV2 from '@/components/Section2OurServicesV2';
import { BackToTop } from '@/components/BackToTop';

// Force dynamic since we want to ensure fresh rendering
export const dynamic = 'force-dynamic';

export default function HomepageV2() {
    const v2Data = {
        content: [
            {
                type: "Hero",
                props: {
                    badge: "Authorized Dealer",
                    titleLine1: "Cooling Hawaii",
                    titleHighlight1: "Affordably",
                    titleHighlight2: "& Efficiently",
                    subBadges: [
                        { text: "Est. 2005" },
                        { text: "Licensed & Insured" },
                        { text: "Locally Owned" }
                    ],
                    ctaShop: { text: "Shop Units", href: "/shop", variant: "primary" },
                    ctaEstimate: { text: "Get Quote", href: "/contact", variant: "secondary" },
                    mode: "light",
                    styles: {
                        backgroundColor: "#ffffff",
                        padding: "128px 0px"
                    }
                }
            },
            {
                type: "Services",
                props: {
                    title: "Premium",
                    titleHighlight: "Cooling",
                    description: "Experience the difference of high-efficiency climate control designed specifically for Hawaii's homes.",
                    backlinks: [
                        { text: "We specialize in ", href: "" },
                        { text: "Window AC Sales", href: "/shop" },
                        { text: ", ", href: "" },
                        { text: "Split System Installation", href: "/contact" },
                        { text: ", and ", href: "" },
                        { text: "Maintenance Services", href: "/contact" },
                        { text: ".", href: "" }
                    ],
                    items: [
                        {
                            title: "Window AC Sales",
                            description: "The largest inventory of LG & GE window units in Waipahu. Pick up today.",
                            icon: "storefront",
                            linkText: "Browse Shop",
                            href: "/shop",
                            color: "primary",
                            badge: "In Stock"
                        },
                        {
                            title: "Split Systems",
                            description: "Whisper-quiet, energy-efficient cooling for your entire home.",
                            icon: "ac_unit",
                            linkText: "Get Estimate",
                            href: "/contact",
                            color: "accent"
                        },
                        {
                            title: "Maintenance",
                            description: "Protect your investment with professional cleaning and servicing.",
                            icon: "cleaning_services",
                            linkText: "Cchedule Service",
                            href: "/contact",
                            color: "accent"
                        }
                    ],
                    mode: "light",
                    styles: {
                        backgroundColor: "#f8fafc", // slate-50
                        padding: "96px 0px"
                    }
                }
            },
            {
                type: "Partnerships",
                props: {
                    title: "Trusted Brands",
                    titleHighlight: "For Island Living",
                    narrativeParam: "We only carry and install equipment proven to withstand Hawaii's salt-air environment.",
                    brandsWindow: [
                        { name: "LG", colorClass: "text-slate-800", fontClass: "font-sans font-black text-5xl" },
                        { name: "GE", colorClass: "text-slate-600", fontClass: "font-serif font-bold text-3xl" }
                    ],
                    brandsMiniSplit: [
                        { name: "Mitsubishi", colorClass: "text-red-600", fontClass: "font-bold uppercase text-2xl" },
                        { name: "Fujitsu", colorClass: "text-red-500", fontClass: "font-bold italic text-3xl" }
                    ],
                    brandsCentral: [
                        { name: "Rheem", colorClass: "text-red-600", fontClass: "font-bold text-4xl" }
                    ],
                    styles: {
                        backgroundColor: "#ffffff",
                        padding: "96px 0px"
                    }
                }
            },
            {
                type: "ServiceAreas",
                props: {
                    badge: "Island Coverage",
                    title: "Serving All",
                    titleHighlight: "Oahu",
                    description: "From Honolulu to the North Shore, our team is ready to deploy.",
                    regions: [
                        { id: "central", title: "Central", icon: "location_on", cities: [{ text: "Mililani" }, { text: "Wahiawa" }] },
                        { id: "town", title: "Town", icon: "apartment", cities: [{ text: "Honolulu" }, { text: "Waikiki" }] }
                    ],
                    styles: {
                        // ServiceAreas is hardcoded dark, so we leave it dark as a 'contrast' section or refactor later.
                        // For now letting it be standard dark.
                        padding: "96px 0px"
                    }
                }
            },
            {
                type: "Warehouse",
                props: {
                    badge: "Visit Us",
                    title: "Waipahu",
                    description: "Come see our showroom and pick up your unit today.",
                    addressLabel: "Location",
                    addressValue: "94-150 Leoleo St, Waipahu",
                    directionsLabel: "Hours",
                    directionsValue: "Mon-Fri: 8am - 4pm\nSat: Closed",
                    ctaText: "Get Directions",
                    mapImage: "/assets/ahac-shoplocationv2.svg",
                    styles: { padding: "96px 0px" }
                }
            }
        ],
        root: { props: { title: "Homepage V2" } }
    };

    return (
        <div className="bg-white text-slate-900 min-h-screen font-sans">
            <NavbarV2 />
            <main className="pt-[180px] bg-slate-900">
                <Section1HeroHomeV2 />
                <Section2OurServicesV2 />
                <Section3AboutQuick />
                {/* <Render config={config} data={v2Data} /> */}
            </main>
            <BackToTop visible={true} />
        </div>
    );
}
