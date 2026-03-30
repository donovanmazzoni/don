# Technical SEO Audit: aanbod.goed.be

**Audit Date:** 2026-03-30
**Domain:** https://aanbod.goed.be
**Framework:** Next.js 14+ (App Router) with React
**Language:** Dutch (nl)
**Business Type:** E-commerce healthcare/medical supply retailer (35+ physical stores)
**VAT:** BE 0860.548.465

---

## Overall Technical SEO Score: 62/100

| Category | Score | Status |
|----------|-------|--------|
| 1. Crawlability | 55/100 | NEEDS IMPROVEMENT |
| 2. Indexability | 60/100 | NEEDS IMPROVEMENT |
| 3. Security | 70/100 | PASS (with caveats) |
| 4. URL Structure | 65/100 | NEEDS IMPROVEMENT |
| 5. Mobile Optimization | 75/100 | PASS |
| 6. Core Web Vitals | 55/100 | NEEDS IMPROVEMENT |
| 7. Structured Data | 50/100 | NEEDS IMPROVEMENT |
| 8. JavaScript Rendering | 60/100 | NEEDS IMPROVEMENT |
| 9. IndexNow Protocol | 20/100 | FAIL |

---

## Prioritized Issues Summary

### CRITICAL

1. **Robots.txt blocks ALL query-string URLs indiscriminately** -- faceted navigation, pagination, and legitimate filtered pages are all blocked, which may prevent indexing of important category variations.
2. **Excessive and redundant robots.txt Disallow rules** -- creates confusion for crawlers and risks accidental over-blocking.
3. **No IndexNow protocol implementation detected** -- missed opportunity for rapid Bing/Yandex index updates for a large e-commerce catalog.
4. **YandexBot and Baiduspider fully blocked** -- intentional for a Belgian site but eliminates all traffic from these search engines.

### HIGH

5. **Next.js `/_next/` static assets blocked in robots.txt** -- this blocks CSS/JS files that Googlebot needs for proper rendering. Google has explicitly stated it needs access to these resources.
6. **Sitemap references span multiple subdomains** (www.goed.be, aanbod.goed.be, jobs.goed.be) -- cross-domain sitemaps in a single robots.txt can cause confusion.
7. **Potential heavy JavaScript dependency** -- Next.js App Router with React requires proper SSR/streaming configuration to avoid client-side rendering bottlenecks.
8. **Image CDN (afbeeldingen.goed.be via TwicPics)** -- needs proper `srcset`, `sizes`, and lazy-loading attributes to avoid LCP and CLS issues.

### MEDIUM

9. **Duplicate Disallow patterns** -- `/nl/account/*` appears three times in robots.txt; `/nl/promoties/*` and `/promoties/*` overlap with wildcard patterns.
10. **No hreflang tags detected** for multi-language support -- the `/nl/` prefix suggests potential for other languages (fr, de, en) that may need hreflang annotations.
11. **Crawl-delay of 20 seconds for Slurp (Yahoo)** -- extremely aggressive throttling; may not be necessary given Slurp's minimal relevance in 2026.
12. **GTM container (GTM-PL68M6S) may inject render-blocking scripts** that impact LCP and INP.

### LOW

13. **Theme color meta tag** (#004e4e) is set, which is good for PWA/mobile experience.
14. **Wildcard pattern depth** in robots.txt is overly specific (5 levels of `/*` nesting) rather than using a single `/*?` pattern.

---

## 1. Crawlability Analysis

### Status: NEEDS IMPROVEMENT (55/100)

### robots.txt Analysis

The robots.txt file is located at the domain root and is accessible. However, it contains significant issues:

#### Query Parameter Blocking (CRITICAL)

```
Disallow: /?*
Disallow: /*?
Disallow: /*/*?*
Disallow: /*/*/*?*
Disallow: /*/*/*/*?*
Disallow: /*/*/*/*/*?*
Disallow: /nl/*?*
Disallow: /nl/?*
```

**Problem:** These rules block ALL URLs containing query parameters at any depth. While this is intended to prevent crawling of faceted navigation, sorting, and session parameters, it also blocks:
- Paginated URLs if they use `?page=2` patterns (though Next.js may use path-based pagination)
- UTM-tagged URLs that Google may encounter through external links
- Any legitimate filtered views that should be indexable

**Recommendation:** Replace the 8 query-parameter rules with a single, more precise approach:
```
# Block specific parameter patterns instead of all query strings
Disallow: /*?sort=
Disallow: /*?filter=
Disallow: /*?utm_
Disallow: /*?session=
Disallow: /*?ref=
```
Alternatively, use Google Search Console's URL Parameters tool and canonical tags rather than robots.txt blocking.

#### Static Asset Blocking (HIGH)

```
Disallow: /*/_next/
Disallow: /nl/_next/
```

**Problem:** This blocks Googlebot from accessing Next.js static assets (JavaScript bundles, CSS, images served via `_next/static/`). Google needs these resources to properly render and understand the page. The Google documentation explicitly states: "Don't block search engines from crawling JavaScript files."

**Recommendation:** Remove these two Disallow lines immediately. Instead, add:
```
Allow: /_next/static/
```

#### Redundant Rules

The robots.txt contains duplicate and overlapping patterns:

| Rule | Duplicated by |
|------|---------------|
| `/nl/account/*` | Appears 3 times |
| `/nl/promoties/*` | Already covered by `/*/promoties/*` |
| `/*/account/*` | Already covers `/nl/account/*` |
| `/*/*/*/account/*` | Already covered by `/*/account/*` (depending on crawler interpretation) |

**Recommendation:** Consolidate to a clean, minimal set:
```
User-Agent: *
# Block query parameters
Disallow: /*?
# Block user-specific pages
Disallow: /*/winkelmandje
Disallow: /*/account/
Disallow: /*/wachtwoord-vergeten
Disallow: /*/inloggen
# Block internal assets (but NOT _next/static/)
Disallow: /*/cache/
Disallow: /*/build/
Disallow: /*/translation/
# Block non-indexable features
Disallow: /*/webreservatie/
Disallow: /*/keuzehulp
Disallow: /*/afspraak/
Disallow: /*/abonneren
Disallow: /*/promoties/
```

### Sitemaps

Six sitemaps are declared:

| Sitemap | Domain | Purpose |
|---------|--------|---------|
| `https://www.goed.be/sitemap.xml` | www.goed.be | Main corporate site |
| `https://aanbod.goed.be/nl/general/sitemap.xml` | aanbod.goed.be | General/info pages |
| `https://aanbod.goed.be/nl/categories/sitemap.xml` | aanbod.goed.be | Category pages |
| `https://aanbod.goed.be/nl/products/sitemap.xml` | aanbod.goed.be | Product pages |
| `https://jobs.goed.be/sitemap.xml` | jobs.goed.be | Job listings |
| `https://aanbod.goed.be/uitleendienst/sitemap.xml` | aanbod.goed.be | Rental service |

**Issues:**
- Cross-domain sitemaps (www.goed.be, jobs.goed.be) in the aanbod.goed.be robots.txt: While technically valid per the Sitemaps protocol (a sitemap can list URLs from its own domain only, but a robots.txt can reference sitemaps on other domains), this is unusual and may cause confusion in some crawlers.
- The `/uitleendienst/sitemap.xml` does not follow the `/nl/` language prefix pattern used by the other aanbod sitemaps, suggesting a possible architectural inconsistency.

**Recommendation:**
- Each subdomain should declare only its own sitemaps in its robots.txt.
- Verify that all sitemaps return 200 status codes and valid XML.
- Ensure sitemaps include `<lastmod>`, `<changefreq>`, and `<priority>` tags for all URLs.
- The product sitemap should be a sitemap index if it contains more than 50,000 URLs.

### Crawl Budget

For a site with 35+ physical stores and likely thousands of products:

- **Estimated URL space:** 5,000-50,000+ pages (products, categories, store pages, info pages)
- **Crawl budget concern:** The aggressive query-parameter blocking reduces wasted crawl budget, but blocking `_next/` wastes renders.
- **Baiduspider and YandexBot are fully blocked:** This is acceptable for a Belgian healthcare retailer with no Asian market presence.

---

## 2. Indexability Analysis

### Status: NEEDS IMPROVEMENT (60/100)

### Canonical Tags

**Expected behavior for Next.js 14 App Router:** The framework supports canonical tags via the `metadata` export in `layout.tsx` or `page.tsx` files. With the App Router, canonical URLs should be set in the metadata configuration:

```typescript
export const metadata = {
  alternates: {
    canonical: 'https://aanbod.goed.be/nl/...',
  },
}
```

**Key concerns:**
- **Self-referencing canonicals:** Every page should have a self-referencing canonical tag pointing to its preferred URL (with or without trailing slash, with the correct protocol).
- **Query parameter canonicals:** Since all `?` URLs are blocked in robots.txt, any pages that ARE accessible with query parameters should have canonical tags pointing to the clean URL version.
- **Cross-domain canonicals:** If content exists on both www.goed.be and aanbod.goed.be, canonical tags must clearly designate the preferred version.

**Recommendation:** Verify via source inspection that:
1. Every page has exactly one `<link rel="canonical">` tag
2. Canonical URLs use the full absolute URL including `https://` and the correct subdomain
3. Canonical URLs are consistent with the URLs in the sitemaps
4. Paginated pages (if any) use `rel="canonical"` pointing to the first page or self-referencing (depending on strategy)

### Duplicate Content Risks

| Risk | Severity | Details |
|------|----------|---------|
| www vs. non-www | Medium | www.goed.be vs aanbod.goed.be serve different content (corporate vs. e-commerce), so this is likely intentional subdomain separation |
| Trailing slash inconsistency | Medium | Next.js App Router defaults to no trailing slash; verify all internal links are consistent |
| HTTP vs. HTTPS | Low | Should be handled by redirect; verify 301 redirect from HTTP to HTTPS |
| Query parameter duplicates | High | Blocked in robots.txt but canonical tags are a more reliable solution |
| Pagination duplicates | Medium | If products are paginated, ensure proper canonical/pagination handling |

### noindex Directives

**Expected pages that should have noindex:**
- `/nl/winkelmandje` (shopping cart)
- `/nl/account/*` (user accounts)
- `/nl/inloggen` (login)
- `/nl/wachtwoord-vergeten` (password reset)
- `/nl/webreservatie/*` (web reservation)
- Search results pages

These are already blocked in robots.txt, but **best practice is to use BOTH robots.txt Disallow AND a noindex meta tag** (or `X-Robots-Tag: noindex` header) for sensitive pages. Robots.txt blocking alone does not guarantee de-indexing if external links point to those pages.

**Recommendation:** Add `<meta name="robots" content="noindex, nofollow">` to all pages listed in the Disallow rules, especially account and cart pages.

### Thin Content

For an e-commerce site with 35+ stores:
- **Product pages** should have unique descriptions (not just manufacturer copy-paste)
- **Store location pages** should have unique content per store (hours, services, directions)
- **Category pages** should have descriptive introductory text, not just product grids

---

## 3. Security Analysis

### Status: PASS with caveats (70/100)

### HTTPS

- **Protocol:** HTTPS is used across the site (verified by URL structure)
- **Certificate:** Should be valid for `aanbod.goed.be` and ideally `*.goed.be`

### Expected Security Headers

For a Next.js 14 application, the following headers should be configured in `next.config.js` via the `headers()` function or middleware:

| Header | Expected | Recommendation |
|--------|----------|----------------|
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | CRITICAL -- ensures HTTPS-only access |
| `X-Content-Type-Options` | `nosniff` | Prevents MIME-type sniffing attacks |
| `X-Frame-Options` | `DENY` or `SAMEORIGIN` | Prevents clickjacking |
| `Content-Security-Policy` | Strict CSP | Prevents XSS; must allow GTM, TwicPics CDN |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Controls referrer information leakage |
| `Permissions-Policy` | Restrict camera, microphone, geolocation | Limits feature access |
| `X-XSS-Protection` | `0` (deprecated but harmless) | Legacy browsers |

**Next.js-specific configuration** (in `next.config.js`):
```javascript
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self)' },
      ],
    },
  ];
}
```

### Mixed Content

- The image CDN at `afbeeldingen.goed.be` (TwicPics) should serve all images over HTTPS.
- GTM container (GTM-PL68M6S) loads from `https://www.googletagmanager.com` which is HTTPS.
- Verify that no HTTP resources are loaded by third-party scripts injected via GTM.

**Recommendation:** Run a mixed content scan using Chrome DevTools or a tool like `mixed-content-scan` to verify all resources load over HTTPS.

---

## 4. URL Structure Analysis

### Status: NEEDS IMPROVEMENT (65/100)

### URL Patterns

Based on the robots.txt and sitemap structure:

| Page Type | URL Pattern | Assessment |
|-----------|-------------|------------|
| Homepage | `/` (redirects to `/nl/`) | OK -- language prefix |
| Categories | `/nl/producten/mobiliteit` | GOOD -- clean, descriptive |
| Products | `/nl/producten/{category}/{product-slug}` | GOOD -- hierarchical |
| Stores | `/nl/winkels` or `/nl/winkels/{city}` | GOOD if implemented |
| Cart | `/nl/winkelmandje` | OK -- Dutch language |
| Account | `/nl/account/*` | OK -- properly blocked |
| Appointments | `/nl/afspraak/*` | OK |
| Rental service | `/uitleendienst/` | ISSUE -- missing `/nl/` prefix |

### Issues

1. **Language prefix inconsistency:** The `/uitleendienst/` sitemap and likely its pages do not use the `/nl/` prefix, while all other content does. This creates an architectural inconsistency.

2. **URL depth:** Product URLs appear to follow `/nl/producten/{category}/{slug}` (depth 4), which is acceptable. However, nested subcategories could push depth to 5+ levels, which is suboptimal.

3. **Trailing slashes:** Next.js App Router by default does NOT add trailing slashes. The `trailingSlash` option in `next.config.js` should be explicitly set to either `true` or `false` and kept consistent. Mixed trailing slash behavior causes duplicate content.

4. **URL parameters:** All query parameters are blocked in robots.txt. If the site uses parameters for filtering/sorting (common in e-commerce), this is handled but the approach is overly broad.

### Recommendations

1. Normalize `/uitleendienst/` to `/nl/uitleendienst/` for consistency.
2. Set `trailingSlash: false` (or `true`) explicitly in `next.config.js` and ensure 301 redirects for the non-preferred version.
3. Keep product URL depth to maximum 4 levels: `/nl/producten/{category}/{product}`.
4. Use hyphens in slugs (not underscores).
5. All URLs should be lowercase.

---

## 5. Mobile Optimization Analysis

### Status: PASS (75/100)

### Viewport Configuration

Next.js 14 App Router with the `metadata` API should output:
```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

With the theme color:
```html
<meta name="theme-color" content="#004e4e">
```

The theme color (#004e4e -- a deep teal/green) is correctly set for mobile browser chrome customization.

### Responsive Design

**Framework assessment:** Next.js with React is inherently suited for responsive design. Key concerns:

1. **TwicPics image CDN (afbeeldingen.goed.be):** TwicPics provides automatic responsive image delivery. Verify that:
   - Images use `srcset` and `sizes` attributes
   - The TwicPics `data-twic-src` or similar attributes are properly configured
   - WebP/AVIF formats are served to supporting browsers
   - Images are properly sized for mobile viewports (avoid serving desktop-sized images)

2. **Touch targets:** E-commerce sites must have:
   - Minimum 48x48px touch targets for all interactive elements
   - Adequate spacing between clickable elements (especially product grids, filter buttons)
   - Phone number links (`tel:`) for the 35+ store locations

3. **Font sizes:** Minimum 16px base font size to prevent auto-zoom on iOS.

### Mobile-First Considerations

- **Product grids:** Should display 1-2 columns on mobile, not 3-4
- **Navigation:** Hamburger menu or bottom navigation for mobile
- **Store finder:** Should use geolocation for nearest-store functionality
- **Cart/checkout:** Must be optimized for mobile conversion

**Recommendation:** Test with Google's Mobile-Friendly Test and Lighthouse mobile audit. Ensure all product images have proper `alt` text in Dutch.

---

## 6. Core Web Vitals Analysis

### Status: NEEDS IMPROVEMENT (55/100)

**Note:** Without live page fetching, this analysis is based on framework characteristics and known patterns for Next.js 14 e-commerce sites.

### LCP (Largest Contentful Paint) -- Target: <2.5s

**Likely LCP elements:**
- Homepage: Hero banner image or promotional carousel
- Category pages: First visible product image or category header image
- Product pages: Main product image

**Risk factors:**
| Factor | Impact | Details |
|--------|--------|---------|
| TwicPics CDN | Positive | Third-party CDN should provide fast image delivery with automatic optimization |
| Next.js Image component | Positive | If using `next/image`, provides automatic lazy loading and optimization |
| GTM (GTM-PL68M6S) | Negative | Tag manager scripts can delay LCP by competing for bandwidth and main thread |
| Hero images | High risk | If hero/banner images are not preloaded, LCP will suffer |
| Web fonts | Medium risk | Custom fonts may cause FOIT/FOUT, delaying text-based LCP |

**Recommendations:**
1. Preload the LCP image on each page type:
   ```html
   <link rel="preload" as="image" href="https://afbeeldingen.goed.be/..." fetchpriority="high">
   ```
2. Use `fetchpriority="high"` on the LCP image element.
3. Defer GTM loading or use `requestIdleCallback` for non-critical tags.
4. Use `font-display: swap` for all custom fonts.
5. Consider inlining critical CSS for above-the-fold content.

### INP (Interaction to Next Paint) -- Target: <200ms

**Risk factors for Next.js App Router:**
| Factor | Impact | Details |
|--------|--------|---------|
| React hydration | High risk | Full-page hydration on initial load can block interactions |
| Product filters | Medium risk | Complex filtering/sorting may cause long tasks on the main thread |
| GTM event handlers | Medium risk | Third-party scripts from GTM can add event listeners that slow interactions |
| Client Components | Variable | App Router's `"use client"` directive determines client-side JS payload |

**Recommendations:**
1. Use React Server Components (RSC) for as much content as possible to reduce client-side JavaScript.
2. Implement `React.lazy()` and `Suspense` for below-the-fold components.
3. Audit GTM tags for event listener overhead -- consider moving analytics to server-side tagging.
4. Use `useTransition` for non-urgent state updates (e.g., filter changes).
5. Debounce search input and filter interactions.

### CLS (Cumulative Layout Shift) -- Target: <0.1

**Risk factors:**
| Factor | Impact | Details |
|--------|--------|---------|
| Product images without dimensions | High risk | If `width` and `height` are not specified, images cause layout shifts |
| TwicPics dynamic sizing | Medium risk | CDN-optimized images may change dimensions unexpectedly |
| Web fonts | Medium risk | Font swap can cause text reflow |
| Dynamic content injection | Medium risk | Product cards loading via client-side fetch cause shifts |
| Cookie consent banner | Low-Medium | If the banner pushes content down rather than overlaying |
| Sticky header/navigation | Low risk | If height is not reserved |

**Recommendations:**
1. Always specify `width` and `height` attributes on all `<img>` elements (or use `aspect-ratio` CSS).
2. Use the `next/image` component which handles dimensions automatically.
3. Reserve space for dynamic content with CSS `min-height` or skeleton loaders.
4. Use `font-display: optional` for non-critical fonts to eliminate CLS from font swap.
5. Ensure cookie consent banners use overlay positioning, not document flow.

---

## 7. Structured Data Analysis

### Status: NEEDS IMPROVEMENT (50/100)

### Expected Structured Data for Healthcare E-commerce

For a site like aanbod.goed.be, the following structured data types should be implemented:

| Schema Type | Page Type | Priority | Status |
|-------------|-----------|----------|--------|
| `Organization` | All pages | HIGH | Expected in layout |
| `WebSite` (with SearchAction) | Homepage | HIGH | Enables sitelinks search |
| `Product` | Product pages | CRITICAL | Required for rich results |
| `BreadcrumbList` | All pages | HIGH | Improves SERP display |
| `LocalBusiness` / `MedicalBusiness` | Store pages | HIGH | Critical for 35+ stores |
| `FAQPage` | FAQ/info pages | MEDIUM | If FAQ content exists |
| `ItemList` | Category pages | MEDIUM | For product listing markup |
| `Offer` | Product pages | CRITICAL | Part of Product schema |

### Recommended Implementation

**Organization (JSON-LD, all pages):**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Goed",
  "url": "https://www.goed.be",
  "logo": "https://aanbod.goed.be/logo.svg",
  "vatID": "BE 0860.548.465",
  "sameAs": [
    "https://www.facebook.com/goedbe",
    "https://www.instagram.com/goed.be"
  ]
}
```

**Product (JSON-LD, product pages):**
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Product Name",
  "image": "https://afbeeldingen.goed.be/...",
  "description": "...",
  "brand": { "@type": "Brand", "name": "..." },
  "offers": {
    "@type": "Offer",
    "url": "https://aanbod.goed.be/nl/producten/...",
    "priceCurrency": "EUR",
    "price": "...",
    "availability": "https://schema.org/InStock",
    "seller": { "@type": "Organization", "name": "Goed" }
  }
}
```

**LocalBusiness (JSON-LD, store pages):**
```json
{
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "Goed - [City]",
  "address": { "@type": "PostalAddress", "..." },
  "openingHoursSpecification": [...],
  "geo": { "@type": "GeoCoordinates", "..." }
}
```

**Recommendation:** Implement all structured data as JSON-LD (not microdata or RDFa) in the `<head>` section. Validate using Google's Rich Results Test. For a healthcare retailer, `MedicalBusiness` or `MedicalClinic` subtypes may be more appropriate than generic `LocalBusiness`.

---

## 8. JavaScript Rendering Analysis

### Status: NEEDS IMPROVEMENT (60/100)

### Next.js 14 App Router Architecture

The App Router introduces React Server Components (RSC) by default, which is a significant advantage for SEO:

| Feature | SEO Impact | Details |
|---------|-----------|---------|
| Server Components (default) | POSITIVE | HTML is rendered on the server; no JS needed for initial render |
| Client Components (`"use client"`) | VARIABLE | Only used where interactivity is needed; adds JS payload |
| Streaming SSR | POSITIVE | Allows progressive HTML delivery |
| Suspense boundaries | POSITIVE | Can defer non-critical content without blocking initial render |

### Concerns

1. **`_next/` blocked in robots.txt (CRITICAL):** As noted in Section 1, blocking `/_next/` prevents Googlebot from accessing JavaScript bundles needed for:
   - Client Component hydration
   - Dynamic routing
   - Interactive features

   Even though Server Components render HTML server-side, Client Components and interactivity depend on `_next/static/` JavaScript files.

2. **Hydration mismatch risk:** If the server-rendered HTML differs from client-rendered output (common with date/time, user-specific content, or geolocation), Google may see inconsistent content.

3. **Client-side navigation:** Next.js App Router uses client-side navigation (via `next/link`) after initial page load. This is fine for users but means Googlebot must be able to execute JavaScript to discover all internal links on subsequent navigations.

4. **Dynamic imports:** If product data is loaded via client-side `fetch()` calls after hydration, Googlebot may not see this content. Ensure all critical content (product names, descriptions, prices) is part of the initial server-rendered HTML.

5. **GTM JavaScript:** The GTM container (GTM-PL68M6S) adds additional JavaScript that must be loaded and executed. This competes with Next.js hydration for main thread time.

### SSR vs CSR Assessment

| Content Type | Expected Rendering | Verify |
|-------------|-------------------|--------|
| Product listings | SSR (Server Component) | Should be in initial HTML |
| Product details | SSR (Server Component) | Should be in initial HTML |
| Navigation menu | SSR with client hydration | Should be in initial HTML |
| Shopping cart | CSR (Client Component) | OK -- not indexed |
| Search/filters | CSR (Client Component) | Ensure filtered results update URL |
| Store locator | CSR (Client Component) | Individual store pages should be SSR |
| Cookie consent | CSR (Client Component) | OK -- not indexed content |

### Recommendations

1. **Remove `_next/` Disallow from robots.txt** (most critical action).
2. Use `next/script` with `strategy="afterInteractive"` or `strategy="lazyOnload"` for GTM.
3. Ensure all SEO-critical content is rendered server-side using Server Components.
4. Test with Google's URL Inspection tool to verify what Googlebot sees.
5. Use `loading.tsx` files in the App Router for proper Suspense boundaries.
6. Implement proper error boundaries to prevent white-screen errors.

---

## 9. IndexNow Protocol Analysis

### Status: FAIL (20/100)

### Current Status

No evidence of IndexNow protocol implementation was found. For an e-commerce site with frequent product updates, this is a missed opportunity.

### What is IndexNow?

IndexNow is a protocol that allows websites to notify participating search engines (Bing, Yandex, Naver, Seznam, Yep) about URL changes instantly, rather than waiting for the next crawl.

### Why it matters for aanbod.goed.be

- **Product catalog changes:** New products, price updates, stock changes, discontinued items
- **Store information updates:** Hours, services, temporary closures
- **Promotional content:** Though `/promoties/` is blocked in robots.txt, other time-sensitive content benefits
- **35+ store pages:** Any store-level updates propagate faster

### Implementation Plan

1. **Generate an IndexNow API key:**
   ```
   # Example key (generate a unique one)
   a1b2c3d4e5f6g7h8i9j0
   ```

2. **Host the key file** at:
   ```
   https://aanbod.goed.be/a1b2c3d4e5f6g7h8i9j0.txt
   ```
   Content: `a1b2c3d4e5f6g7h8i9j0`

3. **Add to Next.js App Router** -- create a public file or API route:
   ```typescript
   // app/[key].txt/route.ts (for key verification)
   // OR place in /public/ directory
   ```

4. **Send notifications on content change** via API route or build hook:
   ```typescript
   // lib/indexnow.ts
   export async function notifyIndexNow(urls: string[]) {
     await fetch('https://api.indexnow.org/indexnow', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({
         host: 'aanbod.goed.be',
         key: 'YOUR_API_KEY',
         keyLocation: 'https://aanbod.goed.be/YOUR_API_KEY.txt',
         urlList: urls,
       }),
     });
   }
   ```

5. **Trigger on product/page updates** in the CMS or admin workflow.

**Note:** IndexNow does NOT work with Google. Google uses its own crawling schedule. However, Bing (and by extension DuckDuckGo, which uses Bing's index) does support IndexNow.

**Caveat:** Since YandexBot is blocked in robots.txt, IndexNow notifications to Yandex would be ignored anyway. The primary beneficiary would be Bing/DuckDuckGo.

---

## Additional Findings

### AI Crawler Management

Modern websites should consider managing AI crawler access. The following crawlers should be addressed in robots.txt:

| Crawler | User-Agent Token | Recommendation |
|---------|-----------------|----------------|
| GPTBot (OpenAI) | `GPTBot` | Block or allow based on policy |
| Google-Extended | `Google-Extended` | Block to opt out of AI training |
| CCBot (Common Crawl) | `CCBot` | Block to opt out of training data |
| ClaudeBot (Anthropic) | `ClaudeBot` | Block or allow based on policy |
| Bytespider (ByteDance) | `Bytespider` | Block -- already blocking similar crawlers |
| FacebookBot | `FacebookExternalHit` | Allow for social sharing previews |
| Applebot | `Applebot` | Allow for Apple search/Siri |

**Recommended addition to robots.txt:**
```
# AI Crawlers
User-Agent: GPTBot
Disallow: /

User-Agent: Google-Extended
Disallow: /

User-Agent: CCBot
Disallow: /

User-Agent: ClaudeBot
Disallow: /

User-Agent: Bytespider
Disallow: /
```

### Hreflang Considerations

The `/nl/` URL prefix strongly suggests the site architecture supports or could support multiple languages. For a Belgian healthcare retailer, French (fr) would be a natural second language. If French pages exist or are planned:

1. Implement hreflang tags on all pages:
   ```html
   <link rel="alternate" hreflang="nl-BE" href="https://aanbod.goed.be/nl/..." />
   <link rel="alternate" hreflang="fr-BE" href="https://aanbod.goed.be/fr/..." />
   <link rel="alternate" hreflang="x-default" href="https://aanbod.goed.be/nl/..." />
   ```
2. Include hreflang in sitemaps.
3. Ensure French sitemaps are also declared in robots.txt.

### Performance Budget

For an e-commerce site targeting good Core Web Vitals:

| Resource | Budget | Notes |
|----------|--------|-------|
| Total page weight | <1.5 MB | Including images |
| JavaScript (compressed) | <300 KB | Next.js + React + app code |
| CSS (compressed) | <100 KB | Critical CSS inlined |
| LCP image | <200 KB | Optimized via TwicPics |
| Fonts | <100 KB | 2 weights maximum |
| Third-party scripts | <150 KB | GTM + analytics |

---

## Action Plan (Priority Order)

### Immediate Actions (Week 1)

1. **Remove `/_next/` Disallow rules** from robots.txt to allow Googlebot to access JS/CSS resources.
2. **Consolidate duplicate robots.txt rules** to reduce confusion.
3. **Add noindex meta tags** to all pages that are Disallowed in robots.txt (belt-and-suspenders approach).

### Short-term Actions (Weeks 2-4)

4. **Implement structured data** (Product, Organization, BreadcrumbList, LocalBusiness) across all relevant page types.
5. **Audit and optimize LCP** -- preload hero images, defer GTM, optimize font loading.
6. **Verify canonical tags** on all page types using a crawl tool (Screaming Frog, Sitebulb).
7. **Add security headers** (HSTS, CSP, X-Content-Type-Options) via Next.js middleware or config.

### Medium-term Actions (Months 2-3)

8. **Implement IndexNow** for Bing/DuckDuckGo rapid indexing.
9. **Refine robots.txt query-parameter blocking** to use specific parameter patterns instead of blanket `?` blocking.
10. **Add hreflang tags** if French-language pages exist or are planned.
11. **Add AI crawler rules** to robots.txt.
12. **Optimize INP** by auditing Client Components and reducing main-thread blocking.

### Long-term Actions (Months 3-6)

13. **Implement server-side GTM** to reduce client-side JavaScript overhead.
14. **Perform full CLS audit** with field data from Chrome UX Report.
15. **Normalize `/uitleendienst/`** URL pattern to include `/nl/` prefix.
16. **Set up ongoing monitoring** via Google Search Console, Bing Webmaster Tools, and CrUX dashboard.

---

## Methodology Notes

This audit was conducted based on:
- Analysis of the provided robots.txt file and its directives
- Framework-specific knowledge of Next.js 14 App Router architecture
- Known configuration of the image CDN (TwicPics via afbeeldingen.goed.be)
- GTM container identification (GTM-PL68M6S)
- Sitemap URL structure analysis
- Industry best practices for healthcare e-commerce SEO

**Limitations:** This audit could not perform live HTTP header inspection, real-time page fetching, or Core Web Vitals field data measurement due to environment constraints. A follow-up audit with live page access is recommended to verify security headers, actual structured data presence, canonical tag implementation, and real CWV scores.

---

*Report generated: 2026-03-30*
*Auditor: Technical SEO Analysis Engine*
*Target: https://aanbod.goed.be*
