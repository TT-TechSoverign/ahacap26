import { builder } from '@builder.io/sdk';

// Initialize the Builder SDK with the public API key
// This allows the editor to fetch content and render it
if (process.env.NEXT_PUBLIC_BUILDER_API_KEY) {
    builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);
} else {
    console.warn('Builder.io API Key (NEXT_PUBLIC_BUILDER_API_KEY) is missing. Visual content will not load.');
}

export const builderConfig = {
    apiKey: process.env.NEXT_PUBLIC_BUILDER_API_KEY,
};
