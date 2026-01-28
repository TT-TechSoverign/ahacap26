import type { Config } from "@measured/puck";
import {
    HeroSchema,
    ServicesGridSchema,
    VideoSectionSchema,
    PartnershipsSchema,
    ServiceAreasSchema,
    WarehouseSchema,
    CalendarSchema,
    type HeroProps,
    type ServicesGridProps,
    type VideoSectionProps,
    type PartnershipsProps,
    type ServiceAreasProps,
    type WarehouseProps,
    type CalendarProps,
} from "./types/puck";

import { Hero } from "./components/puck/Hero";
import { Services } from "./components/puck/Services";
import { Video } from "./components/puck/Video";
import { Partnerships } from "./components/puck/Partnerships";
import { ServiceAreas } from "./components/puck/ServiceAreas";
import { Warehouse } from "./components/puck/Warehouse";
import { Calendar } from "./components/puck/Calendar";
import { ColorPicker } from "./components/puck/fields/ColorPicker";

export const config: Config<{
    Hero: HeroProps;
    Services: ServicesGridProps;
    Video: VideoSectionProps;
    Partnerships: PartnershipsProps;
    ServiceAreas: ServiceAreasProps;
    Warehouse: WarehouseProps;
    Calendar: CalendarProps;
}> = {
    components: {
        Hero: {
            fields: {
                badge: { type: "text" },
                titleLine1: { type: "text" },
                titleHighlight1: { type: "text" },
                titleHighlight2: { type: "text" },
                subBadges: {
                    type: "array",
                    getItemSummary: (item) => item.text || "Badge",
                    arrayFields: {
                        text: { type: "text" }
                    }
                },
                ctaShop: {
                    type: "object",
                    objectFields: {
                        text: { type: "text" },
                        href: { type: "text" },
                        variant: { type: "select", options: [{ label: "Primary", value: "primary" }, { label: "Outline", value: "outline" }] }
                    }
                },
                ctaEstimate: {
                    type: "object",
                    objectFields: {
                        text: { type: "text" },
                        href: { type: "text" },
                        variant: { type: "select", options: [{ label: "Primary", value: "primary" }, { label: "Outline", value: "outline" }] }
                    }
                },
                styles: {
                    type: "object",
                    objectFields: {
                        backgroundColor: { type: "custom", render: ColorPicker },
                        textColor: { type: "custom", render: ColorPicker },
                        padding: { type: "text" }
                    }
                }
            },
            defaultProps: {
                badge: "Est. 2005 • Oahu, HI",
                titleLine1: "20+ YEARS OF SERVICING ISLAND WIDE",
                titleHighlight1: "OAHU'S HVAC CONTRACTOR",
                titleHighlight2: "& AC Specialists",
                subBadges: [{ text: "LG & GE THROUGH THE WALL AC RETAILER" }, { text: "Licensed & Insured" }, { text: "Energy Saving Units" }],
                ctaShop: { text: "SHOP WINDOW AC INVENTORY", href: "/shop", variant: "primary" },
                ctaEstimate: { text: "REQUEST A QUOTE", href: "/contact", variant: "outline" },
                styles: { padding: "96px 0px" }
            },
            render: Hero
        },
        Services: {
            fields: {
                title: { type: "text" },
                titleHighlight: { type: "text" },
                description: { type: "textarea" },
                backlinks: {
                    type: "array",
                    getItemSummary: (item) => item.text || "Segment",
                    arrayFields: {
                        text: { type: "text" },
                        href: { type: "text" }
                    }
                },
                items: {
                    type: "array",
                    getItemSummary: (item) => item.title || "Service Item",
                    arrayFields: {
                        title: { type: "text" },
                        description: { type: "textarea" },
                        icon: { type: "text" },
                        linkText: { type: "text" },
                        href: { type: "text" },
                        color: { type: "select", options: [{ label: "Primary", value: "primary" }, { label: "Accent", value: "accent" }] },
                        badge: { type: "text" }
                    }
                }
            },
            defaultProps: {
                title: "CORE",
                titleHighlight: "SERVICES",
                description: "OAHU'S UNIQUE HIGH-HUMIDITY ENVIRONMENT...",
                backlinks: [],
                items: [
                    { title: "MINI SPLITS", description: "Eliminate Hot Spots & High Bills...", icon: "ac_unit", linkText: "MORE INFO", href: "/contact", color: "primary" },
                    { title: "WINDOW AC SHOP", description: "Your Local High-Efficiency Resource...", icon: "storefront", linkText: "View Inventory", href: "/shop", color: "primary", badge: "In Stock" },
                    { title: "CENTRAL AC", description: "Maximize Whole-Home Comfort...", icon: "hvac", linkText: "MORE INFO", href: "/contact", color: "accent" },
                    { title: "WINDOW AC CLEANING", description: "Breathe Cleaner, Save Longer...", icon: "cleaning_services", linkText: "WINDOW AC MAINTENANCE", href: "/contact", color: "accent" }
                ],
                styles: { padding: "96px 0px" }
            },
            render: Services
        },
        Video: {
            fields: {
                videoUrl: { type: "text" },
                posterUrl: { type: "text" },
                styles: {
                    type: "object",
                    objectFields: {
                        backgroundColor: { type: "custom", render: ColorPicker },
                        textColor: { type: "custom", render: ColorPicker },
                        padding: { type: "text" }
                    }
                }
            },
            defaultProps: {
                videoUrl: "/hero.mp4"
            },
            render: Video
        },
        Partnerships: {
            fields: {
                title: { type: "text" },
                titleHighlight: { type: "text" },
                narrativeParam: { type: "textarea" },
                brandsWindow: {
                    type: "array",
                    getItemSummary: (item) => item.name,
                    arrayFields: {
                        name: { type: "text" },
                        colorClass: { type: "text" },
                        fontClass: { type: "text" }
                    }
                },
                brandsMiniSplit: {
                    type: "array",
                    getItemSummary: (item) => item.name,
                    arrayFields: {
                        name: { type: "text" },
                        colorClass: { type: "text" },
                        fontClass: { type: "text" }
                    }
                },
                brandsCentral: {
                    type: "array",
                    getItemSummary: (item) => item.name,
                    arrayFields: {
                        name: { type: "text" },
                        colorClass: { type: "text" },
                        fontClass: { type: "text" }
                    }
                },
                styles: {
                    type: "object",
                    objectFields: {
                        backgroundColor: { type: "custom", render: ColorPicker },
                        textColor: { type: "custom", render: ColorPicker },
                        padding: { type: "text" }
                    }
                }
            },
            defaultProps: {
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
            },
            render: Partnerships
        },
        ServiceAreas: {
            fields: {
                badge: { type: "text" },
                title: { type: "text" },
                titleHighlight: { type: "text" },
                description: { type: "textarea" },
                regions: {
                    type: "array",
                    getItemSummary: (item) => item.title,
                    arrayFields: {
                        id: { type: "text" },
                        title: { type: "text" },
                        icon: { type: "text" },
                        cities: {
                            type: "array",
                            getItemSummary: (item) => item.text,
                            arrayFields: {
                                text: { type: "text" }
                            }
                        }
                    }
                },
                styles: {
                    type: "object",
                    objectFields: {
                        backgroundColor: { type: "custom", render: ColorPicker },
                        textColor: { type: "custom", render: ColorPicker },
                        padding: { type: "text" }
                    }
                }
            },
            defaultProps: {
                badge: "Island-Wide Coverage",
                title: "Oahu's Premier",
                titleHighlight: "COOLING NETWORK",
                description: "Licensed experts delivering optimal air quality...",
                regions: [
                    { id: "central", title: "Central Oahu", icon: "warehouse", cities: [{ text: "Aiea" }, { text: "Pearl City" }, { text: "Mililani" }, { text: "Waipio Gentry" }, { text: "Waikele" }] },
                    { id: "metro", title: "Metro Honolulu", icon: "apartment", cities: [{ text: "Honolulu" }, { text: "Kalihi" }, { text: "Manoa" }, { text: "Kaimuki" }, { text: "Hawaii Kai" }, { text: "Salt Lake" }] },
                    { id: "leeward", title: "LEEWARD", icon: "sunny", cities: [{ text: "Kapolei" }, { text: "Ewa Beach" }, { text: "Waipahu" }, { text: "Kunia" }] },
                    { id: "windward", title: "Windward & North", icon: "waves", cities: [{ text: "Kailua" }, { text: "Kaneohe" }, { text: "Kahaluu" }] }
                ]
            },
            render: ServiceAreas
        },
        Warehouse: {
            fields: {
                badge: { type: "text" },
                title: { type: "text" },
                description: { type: "textarea" },
                addressLabel: { type: "text" },
                addressValue: { type: "text" },
                directionsLabel: { type: "text" },
                directionsValue: { type: "text" },
                ctaText: { type: "text" },
                mapImage: { type: "text" },
                styles: {
                    type: "object",
                    objectFields: {
                        backgroundColor: { type: "custom", render: ColorPicker },
                        textColor: { type: "custom", render: ColorPicker },
                        padding: { type: "text" }
                    }
                }
            },
            defaultProps: {
                badge: "Local Pickup Center",
                title: "Shop Location",
                description: "Our shop is stocked with window units. Order yours today",
                addressLabel: "Address",
                addressValue: "94-150 Leoleo St. #203\nWaipahu, HI 96797",
                directionsLabel: "Directions",
                directionsValue: "Arrive at Waipahu Commercial Center. Enter one-way drive in lane and continue towards the back warehouses...",
                ctaText: "Get Directions",
                mapImage: "/assets/ahac-shoplocationv2.svg"
            },
            render: Warehouse
        },
        Calendar: {
            fields: {
                title: { type: "text" }
            },
            defaultProps: {
                title: "Availability"
            },
            render: Calendar
        }
    },
};

export default config;
