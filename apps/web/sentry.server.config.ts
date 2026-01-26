import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = "https://f631959ac81f119593d246b2c0d5f15a@o4510774207709184.ingest.us.sentry.io/4510774228746240";

Sentry.init({
    dsn: SENTRY_DSN,

    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: 1,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,
});
