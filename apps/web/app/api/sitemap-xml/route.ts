import { NextResponse } from 'next/server';
import buildSitemapEntries from '@/app/sitemap';

export const revalidate = 86400;

function escapeXml(unsafe: string): string {
  return String(unsafe || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  try {
    const entries = await buildSitemapEntries();

    const urlBlocks = entries.map((entry: any) => {
      const loc = escapeXml(entry.url);
      const lastMod = entry.lastModified
        ? (entry.lastModified instanceof Date ? entry.lastModified.toISOString().split('T')[0] : String(entry.lastModified))
        : '2026-11-11';
      const changeFreq = entry.changeFrequency ? `<changefreq>${escapeXml(entry.changeFrequency)}</changefreq>` : '';
      const priority = typeof entry.priority === 'number' ? `<priority>${entry.priority}</priority>` : '';
      const images: string[] = Array.isArray(entry.images) ? entry.images : [];
      const imageXml = images
        .map((imgUrl) => `\n    <image:image>\n      <image:loc>${escapeXml(imgUrl)}</image:loc>\n    </image:image>`)
        .join('');

      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${escapeXml(lastMod)}</lastmod>
    ${changeFreq}
    ${priority}${imageXml}
  </url>`;
    }).join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlBlocks}
</urlset>`;

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
      },
    });
  } catch (err) {
    console.error('[Sitemap XML Route] Failed to serialize XML + Image Sitemap:', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
