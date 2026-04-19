import { NextResponse } from 'next/server';
import { Product } from '@/types/inventory';
import { generateProductSlug } from '@/lib/utils';

export const dynamic = 'force-dynamic';

function escapeXml(unsafe: string) {
  return unsafe.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

export async function GET() {
  try {
    const apiUrl = process.env.API_INTERNAL_URL 
      ? `${process.env.API_INTERNAL_URL}/api/v1/products` 
      : 'http://localhost:8000/api/v1/products';
      
    const response = await fetch(apiUrl, { cache: 'no-store' });
    const products: Product[] = await response.json();

    const domain = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.affordablehome-ac.com';

    const xmlItems = products.map((product: Product) => {
      const availability = product.stock > 0 ? 'in_stock' : 'out_of_stock';
      
      const productLink = `${domain}/shop/${generateProductSlug(product.id, product.name)}`; 
      const imageLink = product.image_url ? `${domain}${product.image_url}` : `${domain}/logo-new.png`;
      
      const brand = product.name.split(' ')[0];
      
      const descParts = [];
      if (product.key_spec) descParts.push(product.key_spec);
      if (product.coverage) descParts.push(`Coverage: ${product.coverage}`);
      if (product.noise_level) descParts.push(`Noise Level: ${product.noise_level}`);
      if (product.dehumidification) descParts.push(`Dehumidification: ${product.dehumidification}`);
      const description = descParts.length > 0 ? descParts.join('. ') + '.' : product.name;

      return `
        <item>
          <g:id>${product.id}</g:id>
          <g:google_product_category>2669</g:google_product_category>
          <g:title>${escapeXml(product.name)}</g:title>
          <g:description>${escapeXml(description)}</g:description>
          <g:link>${productLink}</g:link>
          <g:image_link>${imageLink}</g:image_link>
          <g:condition>new</g:condition>
          <g:availability>${availability}</g:availability>
          <g:price>${product.price}.00 USD</g:price>
          <g:brand>${escapeXml(brand)}</g:brand>
          <g:identifier_exists>no</g:identifier_exists>
        </item>
      `;
    }).join('');

    const xmlFeed = `<?xml version="1.0" encoding="UTF-8"?>
      <rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
        <channel>
          <title>Affordable Home AC - Local Oahu Inventory</title>
          <link>${domain}</link>
          <description>Live inventory feed for Waipahu window AC units.</description>
          ${xmlItems}
        </channel>
      </rss>`;

    return new NextResponse(xmlFeed, {
      headers: { 
        'Content-Type': 'application/xml', 
        'Cache-Control': 's-maxage=86400, stale-while-revalidate' 
      },
    });
  } catch (error) {
    console.error('Error generating Google XML feed:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
