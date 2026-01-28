/**
 * scripts/sync-builder-content.ts
 * 
 * This script fetches all published content from Builder.io for matched models
 * and saves them to a local JSON file. This allows the repository to serve
 * as the "Single Source of Truth" and enables disaster recovery.
 * 
 * Usage: npx tsx scripts/sync-builder-content.ts
 */

import { builder } from '@builder.io/sdk';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const API_KEY = process.env.NEXT_PUBLIC_BUILDER_API_KEY;

if (!API_KEY) {
    console.error('Error: NEXT_PUBLIC_BUILDER_API_KEY is not defined.');
    process.exit(1);
}

// Initialize Builder
builder.init(API_KEY);

const MODELS_TO_SYNC = ['page', 'homepage-sections'];
const OUTPUT_DIR = path.join(process.cwd(), 'content');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'builder-dump.json');

async function syncContent() {
    console.log(`Starting Builder.io Content Sync...`);

    const allContent: Record<string, any[]> = {};

    try {
        for (const model of MODELS_TO_SYNC) {
            console.log(`Fetching content for model: ${model}...`);

            // Fetch all published entries for the model
            const results = await builder.getAll(model, {
                options: {
                    includeRefs: true,
                },
                // Only published content
                query: {
                    published: 'public'
                }
            });

            console.log(`Found ${results.length} entries for ${model}.`);
            allContent[model] = results;
        }

        // Ensure output directory exists
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR, { recursive: true });
        }

        // Write to file
        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allContent, null, 2));

        console.log(`✅ Success! Content synced to ${OUTPUT_FILE}`);

    } catch (error) {
        console.error('❌ Sync failed:', error);
        process.exit(1);
    }
}

syncContent();
