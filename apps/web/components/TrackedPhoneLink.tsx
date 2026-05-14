'use client';

import { sendGAEvent } from '@next/third-parties/google';

export function TrackedPhoneLink({ phone, display, className, eventLabel = 'Footer Phone Link' }: { phone: string, display: string, className?: string, eventLabel?: string }) {
    return (
        <a 
            href={`tel:${phone}`} 
            className={className}
            onClick={() => {
                sendGAEvent('event', 'click_to_call', {
                    event_category: 'Contact',
                    event_label: eventLabel
                });
            }}
        >
            {display}
        </a>
    );
}
