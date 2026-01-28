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
                badge: "Est. 2005",
                titleLine1: "Cooling Oahu",
                titleHighlight1: "One Home",
                titleHighlight2: "At A Time",
                subBadges: [{ text: "Authorized LG Dealer" }, { text: "Licensed & Insured" }, { text: "Energy Efficient" }],
                ctaShop: { text: "Shop Inventory", href: "/shop", variant: "primary" },
                ctaEstimate: { text: "Get Estimate", href: "/contact", variant: "outline" },
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
                title: "Elite Cooling",
                titleHighlight: "Solutions",
                description: "Specializing in Window AC Units...",
                backlinks: [],
                items: [
                    { title: "Window AC Sales", description: "LG & GE Units", icon: "ac_unit", linkText: "View Units", href: "/shop", color: "primary" }
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
                title: "Strategic",
                titleHighlight: "Partnerships",
                narrativeParam: "All Oahu AC is proud to partner...",
                brandsWindow: [
                    { name: "LG", colorClass: "text-rose-500", fontClass: "font-sans font-black tracking-tighter text-6xl" },
                    { name: "GE APPLIANCES", colorClass: "text-blue-400", fontClass: "font-serif font-bold tracking-wide text-3xl" }
                ],
                brandsMiniSplit: [
                    { name: "MITSUBISHI ELECTRIC", colorClass: "text-red-600", fontClass: "font-header font-bold tracking-normal uppercase text-xl" }
                ],
                brandsCentral: [
                    { name: "RHEEM", colorClass: "text-red-500", fontClass: "font-header font-bold tracking-tight text-5xl" }
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
                badge: "Island-Wide",
                title: "Oahu Service",
                titleHighlight: "Coverage",
                description: "Rapid dispatch...",
                regions: [
                    { id: "central", title: "Central Oahu", icon: "location_city", cities: [{ text: "Mililani" }, { text: "Wahiawa" }] }
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
                badge: "Waipahu Hub",
                title: "Warehouse",
                description: "Distribution center...",
                addressLabel: "Location",
                addressValue: "94-150 Leoleo St...",
                directionsLabel: "Directions",
                directionsValue: "Near the old mill...",
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
