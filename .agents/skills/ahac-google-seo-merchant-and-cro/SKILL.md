---
name: ahac-google-seo-merchant-and-cro
description: >-
  Use this skill whenever expanding or auditing Google Search indexing, canonical routes (118+),
  Google Merchant XML (/merchant-feed.xml), Google Product Ratings XML (/product-reviews-feed.xml),
  JSON-LD structured data (Product, CollectionPage, ItemList, FAQPage,HVACBusiness, AggregateRating),
  SERP CTR titles/descriptions, Hawaii Energy $45 rebate eligibility, GA4/GTM e-commerce & lead
  attribution, Stripe 2.9% fee-lock checkout, or running live-crawl and IndexNow submissions.
---

# AHAC Google Search, Merchant Feeds, Rich Snippets & Conversion Velocity Runbook

## 1. Google Search Essentials & Anti-Spam Indexing Architecture (`118` Canonical Routes)
- **Canonical Footprint**: `118` canonical URLs (`102` static, pillar, symptom, and 22-city Oahu hubs + `16` `/shop/[slug]` product detail pages) indexed in [`sitemap.ts`](../../apps/web/app/sitemap.ts), [`sitemap/page.tsx`](../../apps/web/app/sitemap/page.tsx), and [`llms.txt/route.ts`](../../apps/web/app/llms.txt/route.ts).
- **People-First Anti-Doorway Standard**: Every new route MUST serve a distinct Oahu homeowner intent backed by authentic Waipahu 16-SKU data, a semantic `<table>` comparison/specification matrix, `pt-[92px] md:pt-[180px]` 3-row `NavbarV2` clearance, `<WindowAcQuickShop />`, and `<OahuEEATAuthorityBar />`. Never create thin near-duplicate doorway pages.
- **Crawl vs. Consolidation (`robots.ts` & `middleware.ts`)**: Never block user-facing filter parameters (`?capacity=`, `?category=`, `?voltage=`, `?q=`) in `robots.ts`; allow `Googlebot` to crawl them so `middleware.ts` can consolidate link equity via `X-Robots-Tag: noindex, follow` and `<link rel="canonical">`. Never place `/shop?...` query links in global navigation (`NavbarV2`, `MobileDrawerMenu`, `Footer`); link directly to canonical category hubs.

## 2. Structured Data (`JSON-LD`) & Merchant Truthfulness Guardrails
1. **Strict `@type: Product` Deduplication**:
   - Emit `@type: "Product"` JSON-LD **exclusively** on the `16` canonical `/shop/[slug]` PDPs (`1` `Product` node per PDP, bound dynamically to live `/api/v1/products` `InStock`/`OutOfStock` and `promo_price || price`).
   - Category & buyer guides (`/shop`, `/shop/*`, BTU/room silos) MUST use `CollectionPage` + `ItemList` (`ListItem.url` pointing to canonical `/shop/[slug]` PDPs)—never duplicate single-SKU `Product` nodes on non-PDP routes.
2. **Single `AggregateRating` & `BreadcrumbList` Per URL**:
   - Every canonical route emits **exactly `1`** `AggregateRating` (`4.9★`, `142` verified Oahu reviews) and **exactly `1`** `BreadcrumbList` (on all non-root routes, with `Home` `item: "https://www.affordablehome-ac.com"`).
3. **Mandatory 1:1 Visible `FAQPage` SSR HTML Parity**:
   - Every `Question.name` inside `FAQPage` JSON-LD **MUST** be rendered visibly in initial server-rendered HTML (`<details>` or `block`/`hidden` accordion—never unmounted via `openFaq === idx &&` and never JSON-LD-only).
4. **Qualifying-Only `$45` Hawaii Energy Cash Rebate**:
   - Only the **8 qualifying ENERGY STAR® inverter models** may display or claim the `$45` Hawaii Energy Rebate in `/merchant-feed.xml`, PDP badges, schemas, or tables:
     - `IDs 1–7`: LG Dual Inverter series (`LW6023IVSM`, `LW8022IVSM`, `LW1022IVSM`, `LW1222IVSM`, `LW1522FVSM`, `LW1822IVSM`, `LW2422IVSM`)
     - `ID 15`: `GE AJCQ12AXXWA` (`12,000 BTU`, `115V / 15A`, `10.5 CEER`, R-32 Variable Speed Inverter, 2-Yr Full / 5-Yr Sealed System Warranty)
   - Never attach `$45` rebate labels to `IDs 8–10` (LG Cool+Heat), `IDs 11–12` (LG Standard), `IDs 13–14` (GE Standard 230V), or `ID 16` (`GE RAB26A` wall sleeve).
5. **SERP CTR Metadata Bounds**:
   - `<title>`: `<= 76` chars (`title: { absolute: ... }`), front-loading `$395+` / `$0 Estimate` / model price before char 58, synced `1:1` with `openGraph.title` and `twitter.title`.
   - `<meta name="description">`: `125–158` chars (complete sentences, including `(808) 488-1111`), synced `1:1` with `openGraph.description` and `twitter.description`, paired with a `1600x1000` WebP `og:image`.

## 3. Frictionless Checkout, Promo Integrity & GA4 Attribution
- **Zero-Lost-Lead Intake**: Every lead/symptom form MUST handle API errors visibly (`role="alert"` + `(808) 488-1111` bridge)—never swallow errors with `catch { setIsSuccess(true) }`—and fire `trackFunnelEvent('generate_lead', ...)` with PII keys stripped.
- **Stripe `2.9% + $0.30` US-Card Fee Lock**: Keep Apple Pay, Google Pay, and US Cards enabled while keeping Stripe Link, Klarna, Affirm, Cash App, and BNPL disabled (`payment_method_types=['card']` on `PaymentIntent`s and Default Payment Method Configuration locked).
- **Live Stock & `promo_price` Synchronization**: Clamp cart quantities to live `product.stock`, honor active `promo_price` across `CartContext`, `CartDrawer`, `create-checkout-session` (fail closed on `409`), `validate_inventory_service`, and `/merchant-feed.xml` (`<g:sale_price>`), and never overwrite live PostgreSQL `stock`, `price`, or `promo_price` during `seed_products.py --force`.

## 4. Verification & IndexNow Broadcast Commands
```powershell
# Run 12-second live forensic crawl across all canonical URLs, XML feeds, JSON-LD, FAQs & images
powershell -ExecutionPolicy Bypass -File .\scripts\dev-os.ps1 live-crawl

# Broadcast all canonical sitemap URLs to Bing/Yandex/IndexNow search engines
powershell -ExecutionPolicy Bypass -File .\scripts\dev-os.ps1 indexnow
```
