import { z } from 'zod';

// --- Shared Schemas ---
export const StyleSchema = z.object({
    backgroundColor: z.string().optional(),
    textColor: z.string().optional(),
    padding: z.string().optional(),
});

export type StyleProps = z.infer<typeof StyleSchema>;

const LinkSchema = z.object({
    text: z.string(),
    href: z.string(),
    variant: z.enum(['primary', 'secondary', 'outline', 'ghost']).optional().default('primary'),
});

const IconSchema = z.string().describe("Material Symbols Icon Name");

// --- Component Schemas ---

export const HeroSchema = z.object({
    badge: z.string().describe("Top badge text (e.g. Est 2005)"),
    titleLine1: z.string(),
    titleHighlight1: z.string(),
    titleHighlight2: z.string(),
    subBadges: z.array(z.object({ text: z.string() })).describe("List of badges (e.g. Licensed, Insured)"),
    ctaShop: LinkSchema,
    ctaEstimate: LinkSchema,
    styles: StyleSchema.optional()
});

export const ServiceItemSchema = z.object({
    title: z.string(),
    description: z.string(),
    icon: IconSchema,
    linkText: z.string(),
    href: z.string(),
    color: z.string().default('primary'), // Changed to string for custom colors
    badge: z.string().optional(),
});

export const ServicesGridSchema = z.object({
    title: z.string(),
    titleHighlight: z.string(),
    description: z.string().describe("Main narrative text"),
    backlinks: z.array(z.object({
        text: z.string(),
        href: z.string().optional(),
    })).describe("Text segments with optional links"),
    items: z.array(ServiceItemSchema),
    styles: StyleSchema.optional()
});

export const VideoSectionSchema = z.object({
    videoUrl: z.string(),
    posterUrl: z.string().optional(),
    styles: StyleSchema.optional()
});

export const BrandSchema = z.object({
    name: z.string(),
    colorClass: z.string().describe("Tailwind text color class"),
    fontClass: z.string().describe("Tailwind font class"),
});

export const PartnershipsSchema = z.object({
    title: z.string(),
    titleHighlight: z.string(),
    narrativeParam: z.string().describe("Rich text narrative"),
    brandsWindow: z.array(BrandSchema),
    brandsMiniSplit: z.array(BrandSchema),
    brandsCentral: z.array(BrandSchema),
    styles: StyleSchema.optional()
});

export const CitySchema = z.string();
export const RegionSchema = z.object({
    id: z.string(),
    title: z.string(),
    icon: IconSchema,
    cities: z.array(z.object({ text: z.string() })),
});

export const ServiceAreasSchema = z.object({
    badge: z.string(),
    title: z.string(),
    titleHighlight: z.string(),
    description: z.string(),
    regions: z.array(RegionSchema),
    styles: StyleSchema.optional()
});

export const WarehouseSchema = z.object({
    badge: z.string(),
    title: z.string(),
    description: z.string(),
    addressLabel: z.string(),
    addressValue: z.string(),
    directionsLabel: z.string(),
    directionsValue: z.string(),
    ctaText: z.string(),
    mapImage: z.string(),
    styles: StyleSchema.optional()
});

export const CalendarSchema = z.object({
    title: z.string().default("Availability"),
});

// For TS inference
export type HeroProps = z.infer<typeof HeroSchema>;
export type ServicesGridProps = z.infer<typeof ServicesGridSchema>;
export type VideoSectionProps = z.infer<typeof VideoSectionSchema>;
export type PartnershipsProps = z.infer<typeof PartnershipsSchema>;
export type ServiceAreasProps = z.infer<typeof ServiceAreasSchema>;
export type WarehouseProps = z.infer<typeof WarehouseSchema>;
export type CalendarProps = z.infer<typeof CalendarSchema>;
