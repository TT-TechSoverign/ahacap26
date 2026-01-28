import { AdminCalendar } from '@/components/AdminCalendar';
import type { CalendarProps } from '@/types/puck';

export function Calendar({ title }: CalendarProps) {
    return (
        <section id="calendar" className="py-16 md:py-24 bg-background-light dark:bg-background-dark border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                {/* Title is hidden visually but good for accessible struct or editor label */}
                <div className="sr-only">{title}</div>
                <AdminCalendar />
            </div>
        </section>
    );
}
