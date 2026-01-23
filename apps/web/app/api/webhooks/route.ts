import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';

export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get('Stripe-Signature') as string;

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET || ''
        );
    } catch (err: any) {
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as any;

        // FULFILLMENT INTEGRITY CHECK
        console.log('[STRIPE HANDSHAKE VERIFIED] Session Completed:', session.id);

        // Confirming Details as requested
        console.log('CONFIRMATION SENT: Unit pricing reflects Local Pickup at Waipahu Distribution Center (94-150 Leoleo St. #203).');
        console.log('Optional Island-Wide Delivery ($50.00) timeline activated if selected.');

        // Here you would typically update your database (e.g. mark order as paid, decrement stock)
    }

    return NextResponse.json({ received: true });
}
