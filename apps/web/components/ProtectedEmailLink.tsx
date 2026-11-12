'use client';

import React, { useEffect, useState } from 'react';
import { sendGAEvent } from '@next/third-parties/google';

interface ProtectedEmailLinkProps {
    user?: string;
    domain?: string;
    subject?: string;
    prefixText?: string;
    className?: string;
    icon?: React.ReactNode;
    eventLabel?: string;
    title?: string;
}

/**
 * Anti-Harvester Email Link Armor:
 * - Zero raw `mailto:` or contiguous `user@domain` literal in SSR HTML DOM (defeats regex spam bots).
 * - Zero layout shift (0.00 CLS): renders fragmented spans immediately and upgrades `href` client-side.
 * - Fires GA4 `click_to_email` conversion telemetry on interaction.
 */
export function ProtectedEmailLink({
    user = 'office',
    domain = 'affordablehome-ac.com',
    subject,
    prefixText,
    className,
    icon,
    eventLabel = 'Storefront Protected Email Link',
    title,
}: ProtectedEmailLinkProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const buildMailto = () => {
        const addr = [user, domain].join('@');
        return subject ? `mailto:${addr}?subject=${encodeURIComponent(subject)}` : `mailto:${addr}`;
    };

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        try {
            sendGAEvent('event', 'click_to_email', {
                event_category: 'Contact',
                event_label: eventLabel,
            });
        } catch {
            // Non-blocking analytics
        }

        if (!mounted) {
            e.preventDefault();
            window.location.href = buildMailto();
        }
    };

    return (
        <a
            href={mounted ? buildMailto() : '#dispatch-email'}
            onClick={handleClick}
            className={className}
            title={title}
            rel="nofollow"
        >
            {icon}
            {prefixText ? <span>{prefixText}</span> : null}
            <span>{user}</span>
            <span aria-hidden="true">&#64;</span>
            <span>{domain}</span>
        </a>
    );
}
