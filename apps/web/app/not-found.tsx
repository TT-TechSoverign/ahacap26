import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#0F172A] px-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/hero-cards/ahac-hero-background-2.png"
          alt="Background"
          fill
          className="object-cover opacity-20 blur-sm"
        />
        <div className="absolute inset-0 bg-slate-950/80 mix-blend-multiply" />
      </div>

      <div className="relative z-10 space-y-6 max-w-2xl mt-24 mb-16">
        <h1 className="font-header font-black text-6xl md:text-8xl text-white uppercase drop-shadow-lg">
          404 <span className="text-cyan-400">Error</span>
        </h1>
        <h2 className="text-xl md:text-3xl text-slate-300 font-bold uppercase tracking-widest">
          Looks Like You&apos;re Lost
        </h2>
        <p className="text-slate-400 max-w-lg mx-auto pb-8">
          The page you are looking for has been moved or no longer exists. Don&apos;t worry, we&apos;re still Oahu&apos;s #1 source for air conditioning solutions.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Link href="/shop" className="w-full md:w-auto px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black uppercase tracking-widest text-sm rounded-full transition-all">
            Shop Window ACs
          </Link>
          <Link href="/contact" className="w-full md:w-auto px-8 py-4 bg-transparent border border-cyan-500/50 hover:border-cyan-400 text-cyan-400 font-black uppercase tracking-widest text-sm rounded-full transition-all">
            Request Emergency Service
          </Link>
        </div>
      </div>
    </div>
  );
}
