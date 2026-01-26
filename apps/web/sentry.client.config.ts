import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = "https://f631959ac81f119593d246b2c0d5f15a@o4510774207709184.ingest.us.sentry.io/4510774228746240";

Sentry.init({
    dsn: SENTRY_DSN,

    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: 1,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,

    replaysOnErrorSampleRate: 1.0,

    // This sets the sample rate to be 10%. You may want this to be 100% while
    // in development and sample at a lower rate in production
    replaysSessionSampleRate: 0.1,

    // You can remove this option if you're not planning to use the Sentry Session Replay feature:
    integrations: [
        Sentry.replayIntegration({
            // Additional Replay configuration goes here,
            maskAllText: true,
            blockAllMedia: true,
        }),
    ],
});
