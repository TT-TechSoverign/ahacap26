import SectionServicesGeneral from '../../components/SectionServicesGeneral';



import Image from 'next/image';
import Link from 'next/link';

export default function MiniSplitsPage() {
    const brands = [
        {
            name: "FUJITSU",
            className: "font-sans font-bold italic tracking-widest text-3xl text-red-500",
            description: "Fujitsu units are like the quiet heroes of your home. They work very hard to keep you cool without making a lot of noise. These systems are great because they save a lot of energy, which means your power bill stays low. We love them because they last a long time and are very easy to use every single day.",
            airHandlerImg: "/assets/minisplitacphotos/mini-split-fujitsu-air-handler.png",
            condenserImg: "/assets/minisplitacphotos/mini-split-fujitsu-condenser.png",
            airHandlerScale: "scale-[1.4]",
            condenserScale: "scale-100",
            buttonClass: "bg-red-600 text-white hover:bg-red-500 shadow-[0_0_15px_rgba(220,38,38,0.3)] hover:shadow-[0_0_25px_rgba(220,38,38,0.5)] border border-red-500/50"
        },
        {
            name: "MITSUBISHI ELECTRIC",
            className: "font-header font-bold tracking-normal uppercase text-xl text-red-600",
            description: "Mitsubishi is a name people really trust for keeping their air perfect. These units use smart technology to find the hot spots in a room and fix them right away. They are built to be very tough, so you do not have to worry about them breaking down. When you pick this brand, you are picking a system that stays strong for years.",
            airHandlerImg: "/assets/minisplitacphotos/mini-split-mitsubishi-air-handler.png",
            condenserImg: "/assets/minisplitacphotos/mini-split-mitsubishi-condenser.png",
            airHandlerScale: "scale-[1.5]",
            condenserScale: "scale-[1.5]",
            buttonClass: "bg-red-700 text-white hover:bg-red-600 shadow-[0_0_15px_rgba(185,28,28,0.3)] hover:shadow-[0_0_25px_rgba(185,28,28,0.5)] border border-red-600/50"
        },
        {
            name: "DAIKIN",
            className: "font-header font-medium tracking-widest text-2xl text-sky-400",
            description: "Daikin makes some of the smartest AC units in the world. They focus on making sure the air in your house feels just right, never too hot and never too cold. These systems are very good for the planet because they use less power to do a big job. They are a wonderful choice if you want a reliable system that is simple to take care of.",
            airHandlerImg: "/assets/minisplitacphotos/mini-split-daikin-condenser.png",
            condenserImg: "/assets/minisplitacphotos/mini-split-daikin-air-handler.png",
            airHandlerScale: "scale-[1.8]",
            condenserScale: "scale-100",
            buttonClass: "bg-sky-500 text-slate-950 hover:bg-sky-400 shadow-[0_0_15px_rgba(14,165,233,0.3)] hover:shadow-[0_0_25px_rgba(14,165,233,0.5)] border border-sky-400/50"
        },
        {
            name: "CARRIER",
            className: "font-sans font-extrabold tracking-tighter text-3xl text-blue-600",
            description: "Carrier is the brand that started it all, and they are still great today. Their mini split units are powerful and can cool down a room very fast. They are designed to fit perfectly into any home without taking up too much space. If you want a system that is simple, strong, and classic, this is the one for you.",
            airHandlerImg: "/assets/minisplitacphotos/mini-split-carrier-air-handler.png",
            condenserImg: "/assets/minisplitacphotos/mini-split-carrier-condenser.png",
            airHandlerScale: "scale-[1.8]",
            condenserScale: "scale-[1.1]",
            buttonClass: "bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] border border-blue-500/50"
        }
    ];

    return (
        <div className="bg-slate-900 min-h-screen">
            
            {/* Header / Intro could go here. The existing pt-[140px] handles navbar overlap. */}
            <div className="pt-[140px] md:pt-[350px] lg:pt-[380px] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-header font-bold text-slate-100 mb-4">
                        Premium Mini Splits
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Discover the perfect cooling solution for your home with our top-rated brands.
                    </p>
                </div>

                <div className="flex flex-col gap-16 mb-20">
                    {brands.map((brand) => (
                        <div key={brand.name} className="bg-slate-950/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center gap-12 group even:md:flex-row-reverse">
                            
                            {/* Text Content */}
                            <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start">
                                <div className="mb-6 bg-slate-900/80 px-8 py-4 rounded-xl shadow-inner border border-slate-700/50 inline-block">
                                    <span className={brand.className}>{brand.name}</span>
                                </div>
                                <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mb-8">
                                    {brand.description}
                                </p>
                                <Link 
                                    href="/contact" 
                                    className={`inline-flex items-center justify-center px-8 py-3.5 font-header font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-all duration-300 ${brand.buttonClass}`}
                                >
                                    Schedule Free In-Home Estimate
                                </Link>
                            </div>

                            {/* Image Collage */}
                            <div className="flex-1 flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-4 relative w-full h-[300px] md:h-[400px]">
                                {/* Air Handler */}
                                <div className="relative w-48 h-24 sm:w-64 sm:h-32 md:w-80 md:h-40 z-20 sm:-translate-y-8 sm:translate-x-4 md:-translate-y-12 md:translate-x-8 drop-shadow-2xl hover:scale-105 transition-transform duration-500">
                                    <Image
                                        src={brand.airHandlerImg}
                                        alt={`${brand.name} Air Handler`}
                                        fill
                                        className={`object-contain ${brand.airHandlerScale}`}
                                    />
                                </div>

                                {/* Condenser */}
                                <div className="relative w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 z-10 sm:translate-y-12 sm:-translate-x-8 md:translate-y-16 md:-translate-x-12 drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)] opacity-90 group-hover:opacity-100 transition-opacity duration-500">
                                    <Image
                                        src={brand.condenserImg}
                                        alt={`${brand.name} Condenser`}
                                        fill
                                        className={`object-contain ${brand.condenserScale}`}
                                    />
                                </div>
                                
                                {/* Aesthetic Glow behind the images */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl -z-10 group-hover:opacity-100 opacity-50 transition-opacity duration-700"></div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>

            <div className="pb-20">
                <SectionServicesGeneral />
            </div>

        </div>
    );
}
