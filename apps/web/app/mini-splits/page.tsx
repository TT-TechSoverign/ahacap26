import SectionServicesGeneral from '../../components/SectionServicesGeneral';



export default function MiniSplitsPage() {
    const brands = [
        {
            name: "FUJITSU",
            className: "font-sans font-bold italic tracking-widest text-3xl text-red-500",
            description: "Fujitsu units are like the quiet heroes of your home. They work very hard to keep you cool without making a lot of noise. These systems are great because they save a lot of energy, which means your power bill stays low. We love them because they last a long time and are very easy to use every single day."
        },
        {
            name: "MITSUBISHI ELECTRIC",
            className: "font-header font-bold tracking-normal uppercase text-xl text-red-600",
            description: "Mitsubishi is a name people really trust for keeping their air perfect. These units use smart technology to find the hot spots in a room and fix them right away. They are built to be very tough, so you do not have to worry about them breaking down. When you pick this brand, you are picking a system that stays strong for years."
        },
        {
            name: "DAIKIN",
            className: "font-header font-medium tracking-widest text-2xl text-sky-400",
            description: "Daikin makes some of the smartest AC units in the world. They focus on making sure the air in your house feels just right, never too hot and never too cold. These systems are very good for the planet because they use less power to do a big job. They are a wonderful choice if you want a reliable system that is simple to take care of."
        },
        {
            name: "CARRIER",
            className: "font-sans font-extrabold tracking-tighter text-3xl text-blue-600",
            description: "Carrier is the brand that started it all, and they are still great today. Their mini split units are powerful and can cool down a room very fast. They are designed to fit perfectly into any home without taking up too much space. If you want a system that is simple, strong, and classic, this is the one for you."
        }
    ];

    return (
        <div className="bg-slate-900 min-h-screen">
            
            {/* Header / Intro could go here. The existing pt-[140px] handles navbar overlap. */}
            <div className="pt-[140px] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-header font-bold text-slate-100 mb-4">
                        Premium Mini Splits
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Discover the perfect cooling solution for your home with our top-rated brands.
                    </p>
                </div>

                <div className="flex flex-col gap-12 lg:gap-16 mb-20">
                    {brands.map((brand) => (
                        <div key={brand.name} className="bg-slate-950/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-800 shadow-xl flex flex-col items-center text-center">
                            <div className="mb-6 bg-slate-900/80 px-8 py-4 rounded-xl shadow-inner border border-slate-700/50">
                                <span className={brand.className}>{brand.name}</span>
                            </div>
                            <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
                                {brand.description}
                            </p>
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
