import { NextResponse } from 'next/server';
import { Product } from '@/types/inventory';
import { generateProductSlug } from '@/lib/utils';
import { getProductImages } from '@/lib/product-images';

export const dynamic = 'force-dynamic';

function escapeXml(unsafe: string) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
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
      
      // Resolve WebP high-resolution product images
      const images = getProductImages(product.id);
      const rawHero = images.length > 0 ? images[0] : (product.image_url ? product.image_url.replace('.svg', '.webp') : '/assets/logo-new.png');
      const imageLink = rawHero.startsWith('http') ? rawHero : `${domain}${rawHero}`;
      
      // Secondary / gallery images for Google Shopping interactive carousel
      const additionalImages = images.slice(1);
      const additionalImagesXml = additionalImages.map(img => {
        const fullImg = img.startsWith('http') ? img : `${domain}${img}`;
        return `<g:additional_image_link>${fullImg}</g:additional_image_link>`;
      }).join('\n          ');

      // Brand & Manufacturer MPN Extraction
      const brand = product.name.startsWith('GE') ? 'GE Appliances' : 'LG';
      let mpn = '';
      const matchInParens = product.name.match(/\(([^)]+)\)/);
      if (matchInParens) {
        mpn = matchInParens[1].trim();
      } else {
        const words = product.name.split(' ');
        const modelWord = words.find(w => /^[A-Z0-9]{4,12}$/i.test(w) && !['DUAL', 'WALL', 'BASE', 'CASEMENT'].includes(w.toUpperCase()));
        if (modelWord) {
          mpn = modelWord.trim();
        }
      }

      // Google Product Taxonomy & Type
      const isCasement = product.subcategory === 'casement' || product.name.toLowerCase().includes('casement');
      const googleCategory = isCasement ? '3900' : '2669'; // 2669 = Window Air Conditioners, 3900 = Air Conditioner Accessories
      const productType = isCasement 
        ? 'Home &gt; Heating, Cooling &amp; Air &gt; Air Conditioners &gt; Air Conditioner Accessories'
        : 'Home &gt; Heating, Cooling &amp; Air &gt; Air Conditioners &gt; Window Air Conditioners';

      // Item Group ID for Variant Grouping (BTU capacities grouped under parent model family)
      let itemGroupId = '';
      if (product.subcategory === 'dual_inverter') {
        itemGroupId = 'LG-DUAL-INVERTER-OAHU';
      } else if (product.subcategory === 'universal_fit') {
        itemGroupId = 'LG-UNIVERSAL-FIT-OAHU';
      } else if (product.subcategory === 'base') {
        itemGroupId = 'LG-BASE-STANDARD-OAHU';
      } else if (product.subcategory === 'ge') {
        itemGroupId = 'GE-BUILT-IN-OAHU';
      }
      const itemGroupIdXml = itemGroupId ? `<g:item_group_id>${itemGroupId}</g:item_group_id>` : '';

      // Detailed Description
      const descParts = [];
      if (product.key_spec) descParts.push(product.key_spec);
      if (product.coverage) descParts.push(`Coverage: ${product.coverage}`);
      if (product.noise_level) descParts.push(`Noise Level: ${product.noise_level}`);
      if (product.dehumidification) descParts.push(`Dehumidification: ${product.dehumidification}`);
      if (product.dimensions) descParts.push(`Dimensions: ${product.dimensions}`);
      if (product.voltage) descParts.push(`Voltage: ${product.voltage}`);
      if (product.warranty) descParts.push(`Warranty: ${product.warranty}`);
      descParts.push('Local Waipahu warehouse pickup or $50 island-wide Oahu delivery available. Hawaii Energy rebate form assistance included.');
      const description = descParts.join('. ');

      const shippingWeight = product.weight ? `<g:shipping_weight>${product.weight} lb</g:shipping_weight>` : '';

      // Custom labels for Smart Bidding / Performance Max
      const customLabels = [
        product.subcategory === 'dual_inverter' ? '<g:custom_label_0>Hawaii Energy $45 Rebate Eligible</g:custom_label_0>' : '<g:custom_label_0>Standard Efficiency</g:custom_label_0>',
        '<g:custom_label_1>Oahu Warehouse In-Stock</g:custom_label_1>',
        '<g:custom_label_2>Waipahu Commercial Center Pickup</g:custom_label_2>',
        product.voltage ? `<g:custom_label_3>${escapeXml(product.voltage)}</g:custom_label_3>` : '',
        product.btu ? `<g:custom_label_4>${product.btu} BTU</g:custom_label_4>` : '',
      ].filter(Boolean).join('\n          ');

      return `
        <item>
          <g:id>${product.id}</g:id>
          <g:google_product_category>${googleCategory}</g:google_product_category>
          <g:product_type>${productType}</g:product_type>
          <g:title>${escapeXml(product.name)}</g:title>
          <g:description>${escapeXml(description)}</g:description>
          <g:link>${productLink}</g:link>
          <g:image_link>${imageLink}</g:image_link>
          ${additionalImagesXml}
          <g:condition>new</g:condition>
          <g:availability>${availability}</g:availability>
          <g:price>${product.price}.00 USD</g:price>
          <g:brand>${escapeXml(brand)}</g:brand>
          ${mpn ? `<g:mpn>${escapeXml(mpn)}</g:mpn>` : ''}
          <g:identifier_exists>${mpn ? 'yes' : 'no'}</g:identifier_exists>
          ${itemGroupIdXml}
          ${shippingWeight}
          <g:shipping>
            <g:country>US</g:country>
            <g:region>HI</g:region>
            <g:service>Island-Wide Oahu Delivery</g:service>
            <g:price>50.00 USD</g:price>
          </g:shipping>
          <g:shipping>
            <g:country>US</g:country>
            <g:region>HI</g:region>
            <g:postal_code>96797</g:postal_code>
            <g:service>Waipahu Warehouse Pickup by Appt</g:service>
            <g:price>0.00 USD</g:price>
          </g:shipping>
          ${customLabels}
        </item>
      `;
    }).join('');

    const xmlFeed = `<?xml version="1.0" encoding="UTF-8"?>
      <rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
        <channel>
          <title>Affordable Home AC - Local Oahu Inventory</title>
          <link>${domain}</link>
          <description>Live inventory feed for Waipahu window AC units and ductless accessories.</description>
          ${xmlItems}
        </channel>
      </rss>`;

    return new NextResponse(xmlFeed, {
      headers: { 
        'Content-Type': 'application/xml; charset=utf-8', 
        'Cache-Control': 's-maxage=86400, stale-while-revalidate' 
      },
    });
  } catch (error) {
    console.error('Error generating Google XML feed:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
