'use client';

import Image from 'next/image';
import Link from 'next/link';
import { EditableText } from './EditableText';
import { cn } from '@/lib/utils';
import { useContent } from '../lib/context/ContentContext';

export default function SectionServicesGeneral() {
    const { isEditMode } = useContent();

    const services = [
        {
            id: 'residential',
            defaultTitle: 'Residential',
            defaultDesc: 'Keep your home cool and comfortable with our expert installation and repair services.',
            cleanImage: '/assets/yelpphotos/yelp1.jpg',
            link: '/contact'
        },
        {
            id: 'commercial',
            defaultTitle: 'Commercial & HOA',
            defaultDesc: 'Reliable climate control solutions for businesses, condos, and managed properties.',
            cleanImage: '/assets/yelpphotos/yelp10.jpg',
            link: '/contact'
        },
        {
            id: 'construction',
            defaultTitle: 'New Construction',
            defaultDesc: 'Partner with us for seamless HVAC integration in your new build projects.',
            cleanImage: '/assets/yelpphotos/yelp11.jpg',
            link: '/contact'
        },
        {
            id: 'property_mgmt',
            defaultTitle: 'Property Management',
            defaultDesc: 'Rapid response and reliable maintenance for property managers and landlords.',
            cleanImage: '/assets/yelpphotos/yelp12.jpg',
            link: '/contact'
        }
    ];

    return (
        <section className="relative w-full bg-slate-900 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 h-auto md:h-[800px]">
                {services.map((service, index) => (
                    <div
                        key={service.id}
                        className="relative group h-[400px] md:h-full overflow-hidden border-b md:border-b-0 border-r-0 md:border-r border-slate-800 last:border-0"
                    >
                        {/* Background Image */}
                        <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-105">
                            <Image
                                src={service.cleanImage}
                                alt={service.defaultTitle}
                                fill
                                className="object-cover object-center opacity-60 group-hover:opacity-70 transition-opacity"
                            />
                            {/* Dark Gradient Overlay for Text Readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90" />
                            {/* Cyan Glow on Hover */}
                            <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/10 transition-colors duration-500 mix-blend-overlay" />
                        </div>

                        {/* Content */}
                        <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12 lg:p-16">
                            <div className="transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                                <h3 className="font-header font-black text-3xl md:text-4xl lg:text-5xl text-white uppercase tracking-tighter mb-4 drop-shadow-lg group-hover:text-cyan-400 transition-colors">
                                    <EditableText
                                        contentKey={`services_general.${service.id}.title`}
                                        defaultValue={service.defaultTitle}
                                    />
                                </h3>

                                <div className="max-w-md">
                                    <div className="font-sans text-slate-300 text-lg leading-relaxed mb-6 opacity-90 group-hover:opacity-100 transition-opacity">
                                        <EditableText
                                            contentKey={`services_general.${service.id}.description`}
                                            as="p"
                                            multiLine={true}
                                            defaultValue={service.defaultDesc}
                                        />
                                    </div>

                                    <Link
                                        href={service.link}
                                        className={cn(
                                            "inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-white border-b-2 border-transparent hover:border-cyan-400 pb-1 transition-all",
                                            isEditMode ? "pointer-events-none opacity-50" : ""
                                        )}
                                    >
                                        <span className="group-hover:text-cyan-400 transition-colors">Learn More</span>
                                        <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform group-hover:text-cyan-400">arrow_forward</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
