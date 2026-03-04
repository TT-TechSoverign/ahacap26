import { Metadata } from 'next';
import ServiceAreasClientPage from '../page';
import contentData from '@/lib/content/content.json';

export async function generateStaticParams() {
    const content = contentData as any;
    const regions = content?.landing_legacy?.service_areas?.regions || [];
    
    const cities: string[] = [];
    regions.forEach((region: any) => {
        if (region.cities) {
            region.cities.forEach((city: any) => {
                cities.push(city.name);
            });
        }
    });

    return cities.map((city) => ({
        city: city.toLowerCase().replace(/ /g, '-'),
    }));
}

export async function generateMetadata({ params }: { params: { city: string } }): Promise<Metadata> {
    const formattedCity = params.city
        .split('-')
        .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
        
    return {
        title: `AC Installation & Repair in ${formattedCity}, HI | Affordable Home AC`,
        description: `Expert residential and commercial Air Conditioning services in ${formattedCity}, Oahu. We specialize in Mini-Split and Window AC systems.`,
    };
}

export default function CityServiceArea() {
    return <ServiceAreasClientPage />;
}
