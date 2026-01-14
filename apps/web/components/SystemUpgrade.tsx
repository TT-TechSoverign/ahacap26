import { Phone } from "lucide-react";
import { Button } from "./ui/Button";

export default function SystemUpgrade() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-navy-950 via-navy-DEFAULT to-navy-900 text-white p-4 relative overflow-hidden pt-32">

      {/* --- AMBIENT GLOW (Background) --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      {/* --- THE CARD --- */}
      <div className="relative z-10 max-w-2xl w-full bg-navy-900/50 backdrop-blur-md border border-border-dark rounded-3xl p-8 md:p-12 shadow-2xl shadow-black/50">

        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 mb-8">
          <span className="text-primary font-bold text-xs tracking-[0.2em] uppercase font-sans">
            System Status: Upgrading
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-header font-bold text-white leading-tight mb-6 uppercase tracking-wide">
          The Evolution <br />
          <span className="text-slate-400">of Cool.</span>
        </h1>

        {/* Subtext */}
        <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-lg font-sans">
          Affordable Home A/C is calibrating a new digital experience. Smart. Adaptive. Precise. A higher standard of comfort is loading now.
        </p>

        {/* Status Pill */}
        <div className="inline-flex items-center gap-3 bg-accent/10 border border-accent/20 rounded-full px-5 py-3 mb-10">
          <div className="w-2.5 h-2.5 bg-accent rounded-full animate-pulse shadow-[0_0_10px_rgba(57,181,74,0.5)]" />
          <span className="text-accent text-xs font-bold tracking-widest uppercase font-sans">
            Field Operations: Fully Active & Ready to Assist
          </span>
        </div>

        {/* Action Button */}
        <div>
          <Button variant="outline" size="lg" className="gap-3 group" asChild>
            <a href="tel:8081234567">
              <span className="font-sans">Contact Support</span>
              <Phone className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
            </a>
          </Button>
        </div>

      </div>

      {/* Footer / Copyright */}
      <div className="absolute bottom-6 text-slate-600 text-[10px] uppercase tracking-widest font-sans">
        Authorized Dealer • Serving Oahu Since 2005
      </div>

    </main>
  );
}
