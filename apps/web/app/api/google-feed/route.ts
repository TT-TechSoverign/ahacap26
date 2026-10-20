import { NextResponse } from 'next/server';
import { Product } from '@/types/inventory';
import { generateProductSlug } from '@/lib/utils';
import { getProductImages } from '@/lib/product-images';
import { PRODUCT_IDENTIFIERS } from '@/lib/product-identifiers';
import { INITIAL_CATALOG_PRODUCTS } from '@/lib/catalog-seed';

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
      : 'http://prod-api:8000/api/v1/products';
      
    let products: Product[] = INITIAL_CATALOG_PRODUCTS;
    try {
      const response = await fetch(apiUrl, { cache: 'no-store' });
      if (response.ok) {
        const liveData = await response.json();
        if (Array.isArray(liveData) && liveData.length > 0) {
          products = liveData;
        }
      }
    } catch {
      // Fallback to INITIAL_CATALOG_PRODUCTS
    }

    const domain = process.env.NEXT_PUBLIC_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://www.affordablehome-ac.com';

    const xmlItems = products.map((product: Product) => {
      const availability = product.stock > 0 ? 'in_stock' : 'out_of_stock';
      const productLink = `${domain}/shop/${generateProductSlug(product.id, product.name)}`; 
      
      // Resolve WebP high-resolution product images (Google Merchant strictly requires raster WebP/PNG/JPG, never SVG)
      const images = getProductImages(product.id).map(img => img.replace(/\.svg$/i, '.webp'));
      const rawHero = images.length > 0 ? images[0] : (product.image_url ? product.image_url.replace(/\.svg$/i, '.webp') : '/assets/logo-new.png');
      const imageLink = rawHero.startsWith('http') ? rawHero : `${domain}${rawHero}`;
      
      // Secondary / gallery images & 3D raytraced cutaway for Google Shopping interactive carousel
      const cutawayImageMap: Record<number, string> = {
        1: '/assets/window-unit-images/3d-fit/product_1_fit_cutaway.webp',
        2: '/assets/window-unit-images/3d-fit/product_2_fit_cutaway.webp',
        3: '/assets/window-unit-images/3d-fit/product_3_fit_cutaway.webp',
        4: '/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp',
        5: '/assets/window-unit-images/3d-fit/product_5_fit_cutaway.webp',
        6: '/assets/window-unit-images/3d-fit/product_6_fit_cutaway.webp',
        7: '/assets/window-unit-images/3d-fit/product_7_fit_cutaway.webp',
        8: '/assets/window-unit-images/3d-fit/product_8_fit_cutaway.webp',
        9: '/assets/window-unit-images/3d-fit/product_9_fit_cutaway.webp',
        10: '/assets/window-unit-images/3d-fit/product_10_fit_cutaway.webp',
        11: '/assets/window-unit-images/3d-fit/product_11_fit_cutaway.webp',
        12: '/assets/window-unit-images/3d-fit/product_12_fit_cutaway.webp',
        13: '/assets/window-unit-images/3d-fit/product_13_fit_cutaway.webp',
        14: '/assets/window-unit-images/3d-fit/product_14_fit_cutaway.webp',
        15: '/assets/window-unit-images/3d-fit/product_15_fit_cutaway.webp',
        16: '/assets/window-unit-images/3d-fit/product_16_fit_cutaway.webp'
      };
      const cutawayRel = cutawayImageMap[product.id];
      const cutawayImgLink = cutawayRel ? `${domain}${cutawayRel}` : '';

      const additionalImages = images.slice(1);
      const allAdditionalImages = [...additionalImages];
      if (cutawayImgLink && !allAdditionalImages.includes(cutawayImgLink)) {
        allAdditionalImages.push(cutawayImgLink);
      }
      const additionalImagesXml = allAdditionalImages.map(img => {
        const cleanImg = img.replace(/\.svg$/i, '.webp');
        const fullImg = cleanImg.startsWith('http') ? cleanImg : `${domain}${cleanImg}`;
        return `<g:additional_image_link>${fullImg}</g:additional_image_link>`;
      }).join('\n          ');

      // Brand, GTIN-12 UPC, & Manufacturer MPN Extraction
      const identifier = PRODUCT_IDENTIFIERS[product.id];
      const brand = identifier?.brand || (product.name.startsWith('GE') ? 'GE Appliances' : 'LG');
      const gtin = identifier?.gtin12 || '';
      let mpn = identifier?.mpn || product.key_spec || '';
      if (!mpn) {
        const matchInParens = product.name.match(/\(([^)]+)\)/);
        if (matchInParens) {
          mpn = matchInParens[1].trim();
        }
      }

      const nameWithMpn = mpn && !product.name.toUpperCase().includes(mpn.toUpperCase())
        ? `${product.name} (${mpn})`
        : product.name;
      const categoryLabel = product.id === 16
        ? '26" Structural Through-The-Wall Sleeve'
        : product.subcategory === 'ge'
        ? '26" Built-In Wall Sleeve Air Conditioner'
        : product.subcategory === 'universal_fit'
        ? 'Cool + Heat Window & Wall Air Conditioner'
        : 'Window Air Conditioner';
      const voltLabel = product.voltage && product.voltage !== 'N/A' ? ` - ${product.voltage}` : '';
      const richTitle = `${nameWithMpn} ${categoryLabel}${voltLabel} - Oahu Waipahu Pickup & Delivery`;

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
      if (product.coverage_aham) descParts.push(`AHAM Coverage: ${product.coverage_aham}`);
      else if (product.coverage) descParts.push(`Coverage: ${product.coverage}`);
      if (product.coverage_oahu) descParts.push(`Island Microclimate™: ${product.coverage_oahu}`);
      if (product.min_window_height) descParts.push(`Min Window Height: ${product.min_window_height}`);
      if (product.noise_level) descParts.push(`Noise Level: ${product.noise_level}`);
      if (product.dehumidification) descParts.push(`Dehumidification: ${product.dehumidification}`);
      if (product.dimensions) descParts.push(`Dimensions: ${product.dimensions}`);
      if (product.voltage) descParts.push(`Voltage: ${product.voltage}`);
      if (product.warranty) descParts.push(`Warranty: ${product.warranty}`);
      descParts.push('Local Waipahu warehouse pickup or $50 island-wide Oahu delivery available. Hawaii Energy rebate form assistance included.');
      const description = descParts.join('. ');

      const rawWeight = product.shipping_weight || (product.weight ? `${product.weight} lb` : '');
      const shippingWeight = rawWeight ? `<g:shipping_weight>${escapeXml(rawWeight)}</g:shipping_weight>` : '';

      // 2026 Google Shopping Product Highlights
      const highlights = [
        product.coverage_aham ? `AHAM Factory Certified: ${product.coverage_aham}` : `Coverage: ${product.coverage || 'Factory Rated'}`,
        product.coverage_oahu ? `Island Microclimate Calibration™: ${product.coverage_oahu}` : 'Island Sizing: Optimized for Hawaii Trade Winds & High Humidity',
        product.min_window_height ? `Window Fit: Min ${product.min_window_height} H Opening Clearance` : 'Standard Window Opening Clearance Required',
        product.chassis_type ? `Chassis Design: ${product.chassis_type}` : 'Slide-Out Chassis for Clean Maintenance',
        'Waipahu Warehouse In-Stock • Free Pickup / $50 Oahu Delivery'
      ];
      const highlightsXml = highlights.map(h => `<g:product_highlight>${escapeXml(h)}</g:product_highlight>`).join('\n          ');

      // Custom labels for Smart Bidding / Performance Max & Google Shopping Free Listings
      const roomSizeTier = !product.btu
        ? 'Wall_Sleeve_Accessory'
        : product.btu <= 8500
        ? '6k-8k_Bedroom'
        : product.btu <= 14500
        ? '10k-14k_Living_Room'
        : '18k-24k_Large_Room';
      const plugTier = product.voltage?.includes('230') || product.voltage?.includes('208')
        ? '230V_High_Capacity'
        : '115V_Standard_Plug';

      const customLabels = [
        product.subcategory === 'dual_inverter' ? '<g:custom_label_0>Hawaii Energy $45 Rebate Eligible</g:custom_label_0>' : '<g:custom_label_0>Standard Efficiency</g:custom_label_0>',
        product.stock > 0 ? '<g:custom_label_1>Waipahu_In_Stock</g:custom_label_1>' : '<g:custom_label_1>Out_Of_Stock</g:custom_label_1>',
        `<g:custom_label_2>${escapeXml(roomSizeTier)}</g:custom_label_2>`,
        `<g:custom_label_3>${escapeXml(plugTier)}</g:custom_label_3>`,
        product.btu ? `<g:custom_label_4>${product.btu} BTU</g:custom_label_4>` : '<g:custom_label_4>26in Wall Sleeve</g:custom_label_4>',
      ].filter(Boolean).join('\n          ');

      return `
        <item>
          <g:id>${product.id}</g:id>
          <g:google_product_category>${googleCategory}</g:google_product_category>
          <g:product_type>${productType}</g:product_type>
          <g:title>${escapeXml(richTitle)}</g:title>
          <g:description>${escapeXml(description)}</g:description>
          <g:link>${productLink}</g:link>
          <g:image_link>${imageLink}</g:image_link>
          ${additionalImagesXml}
          ${highlightsXml}
          <g:condition>new</g:condition>
          <g:availability>${availability}</g:availability>
          <g:price>${product.price}.00 USD</g:price>
          <g:brand>${escapeXml(brand)}</g:brand>
          ${gtin ? `<g:gtin>${gtin}</g:gtin>` : ''}
          ${mpn ? `<g:mpn>${escapeXml(mpn)}</g:mpn>` : ''}
          <g:identifier_exists>${(gtin || mpn) ? 'yes' : 'no'}</g:identifier_exists>
          ${itemGroupIdXml}
          ${shippingWeight}
          <g:ships_from_country>US</g:ships_from_country>
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
          <description>Live inventory feed for Waipahu LG Dual Inverter and GE window AC units.</description>
          ${xmlItems}
        </channel>
      </rss>`;

    return new NextResponse(xmlFeed, {
      headers: { 
        'Content-Type': 'application/xml; charset=utf-8', 
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400' 
      },
    });
  } catch (error) {
    console.error('Error generating Google XML feed:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
