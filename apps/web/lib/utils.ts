import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { PRODUCT_IDENTIFIERS } from "./product-identifiers"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateProductSlug(id: number | string, name: string): string {
    const numId = typeof id === 'string' ? parseInt(id, 10) : id;
    const mpn = PRODUCT_IDENTIFIERS[numId]?.mpn?.toLowerCase();
    const slugifiedName = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric chars with hyphens
        .replace(/(^-|-$)+/g, '');   // Remove leading/trailing hyphens
    if (mpn && !slugifiedName.includes(mpn)) {
        return `${id}-${slugifiedName}-${mpn}`;
    }
    return `${id}-${slugifiedName}`;
}

export function isCampaignActive(): boolean {
    return false;
}
