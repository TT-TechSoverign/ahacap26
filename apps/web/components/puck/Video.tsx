import type { VideoSectionProps } from '@/types/puck';

export function Video({ videoUrl, posterUrl, styles }: VideoSectionProps) {
    return (
        <section
            className="py-10 md:py-16 bg-background-dark overflow-hidden"
            style={{
                backgroundColor: styles?.backgroundColor,
                color: styles?.textColor,
                padding: styles?.padding ? styles.padding : undefined
            }}
        >
            <div className="max-w-5xl mx-auto px-6">
                <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative aspect-video bg-black group">
                    <video
                        src={videoUrl || "/hero.mp4"}
                        poster={posterUrl}
                        controls
                        playsInline
                        className="object-cover w-full h-full"
                    >
                        Your browser does not support the video tag.
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/20 via-transparent to-transparent pointer-events-none"></div>
                </div>
            </div>
        </section>
    );
}
