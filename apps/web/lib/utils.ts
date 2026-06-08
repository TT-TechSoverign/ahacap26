import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateProductSlug(id: number | string, name: string): string {
    const slugifiedName = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric chars with hyphens
        .replace(/(^-|-$)+/g, '');   // Remove leading/trailing hyphens
    return `${id}-${slugifiedName}`;
}

export function isCampaignActive(): boolean {
    const targetDate = new Date("2026-08-01T09:59:59Z"); // July 31st, 2026 23:59:59 HST
    const isPastDate = new Date().getTime() > targetDate.getTime();
    if (isPastDate) return false;

    // Check if we are running in a production environment (which should NOT show the promo)
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
    const isProdEnv = apiUrl.includes("affordablehome-ac.com") && !apiUrl.includes("staging");

    if (isProdEnv) {
        return false;
    }

    return true;
}
