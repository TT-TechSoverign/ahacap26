'use client';

import { sendGAEvent } from '@next/third-parties/google';

export function TrackedPhoneLink({ phone, display, className }: { phone: string, display: string, className?: string }) {
    return (
        <a 
            href={`tel:${phone}`} 
            className={className}
            onClick={() => {
                sendGAEvent('event', 'click_to_call', {
                    event_category: 'Contact',
                    event_label: 'Footer Phone Link'
                });
            }}
        >
            {display}
        </a>
    );
}
