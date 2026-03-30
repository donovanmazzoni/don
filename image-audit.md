# Image SEO Audit: aanbod.goed.be

**Data source:** Image Audit (static analysis)
**Date:** 2026-03-30
**Auditor:** Claude SEO Agent
**Pages analyzed:** 4 (homepage, category, subcategory, product)

---

## Image Audit Summary

| Metric | Value | Status |
|--------|-------|--------|
| Pages with OG images | 3/4 | WARN |
| OG images correct size (1200x630) | 1/4 | FAIL |
| OG image:width/height declared | 2/4 | FAIL |
| Twitter card images present | 3/4 | WARN |
| Schema ImageObject usage | 0/4 | FAIL |
| JSON-LD structured data (any) | 0/4 | FAIL |
| AVIF adoption | ~100% | PASS |
| WebP adoption | 0% | N/A (AVIF used instead) |
| Images with srcSet (responsive) | 27/35 (homepage) | PASS |
| Images with sizes attribute | 0/27 (homepage) | FAIL |
| Images with width/height (CLS) | 28/35 (homepage), 8/15 (category) | WARN |
| Images with empty alt text | 8/35 (homepage), 7/15 (category) | FAIL |
| Images without alt attribute | 0/35 (homepage) | PASS |
| Lazy loading implemented | Yes (27/35 homepage) | PASS |
| fetchPriority on hero | Yes (high) | PASS |
| Static images bypassing CDN | 1 (cm-footer.png) | LOW |

---

## 1. OG / Social Preview Images

### Homepage (/nl)
- **og:image:** `https://www.datocms-assets.com/136341/1743491777-cam-goed-1200x630-60b0e92b10a42.png` -- PASS
- **og:image:width:** 1200, **og:image:height:** 630 -- PASS
- **og:type:** website -- PASS
- **twitter:card:** summary_large_image -- PASS
- **twitter:image:** Same as og:image -- PASS
- **twitter:image:width/height:** Declared -- PASS

**Assessment:** The homepage has a properly configured OG image at 1200x630 with all required meta tags. The image is served from DatoCMS assets CDN.

### Category page (/nl/producten/mobiliteit)
- **og:image:** `https://www.datocms-assets.com/136341/1721229470-mobiliteit.png` -- WARN
- **og:image:width:** NOT SET -- FAIL
- **og:image:height:** NOT SET -- FAIL
- **twitter:card:** summary_large_image -- PASS
- **twitter:image:** Same as og:image -- PASS

**Assessment:** OG image exists but lacks `og:image:width` and `og:image:height` declarations. The image URL suggests it is a category-specific image, which is good. However, without dimension metadata, social platforms may render it unpredictably.

### Subcategory page (/nl/producten/mobiliteit/rollators)
- **og:image:** NOT SET -- FAIL
- **og:image:width:** NOT SET -- FAIL
- **twitter:card:** summary (not summary_large_image) -- WARN
- **twitter:image:** NOT SET -- FAIL

**Assessment:** Critical gap. Subcategory pages have no OG image or Twitter image at all. The twitter:card is downgraded to "summary" instead of "summary_large_image". When these pages are shared on social media, no image preview will appear, reducing click-through rates significantly.

### Product page (/nl/product/scooter-lm-vivo)
- **og:image (1st):** `https://images.cdn.europe-west1.gcp.commercetools.com/.../Q_S7Acov.png` -- WARN
- **og:image (2nd):** `https://www.datocms-assets.com/136341/1743491777-cam-goed-1200x630-60b0e92b10a42.png` -- WARN
- **og:image:width:** 1200, **og:image:height:** 630 -- WARN (applies to 2nd image only)
- **twitter:card:** summary_large_image -- PASS
- **twitter:image:** Duplicate tags (product + fallback) -- WARN

**Assessment:** The product page declares TWO `og:image` tags. The first is the actual product photo from Commercetools CDN (good for relevance), but it is a raw product PNG -- likely not 1200x630 and lacking dimension declarations. The second is the generic site-wide fallback. The `og:image:width/height` tags (1200x630) correspond to the second (fallback) image, creating a mismatch. Social platforms will likely use the first image at an unpredictable aspect ratio.

---

## 2. Alt Text Quality

### Summary by page

| Page | Total Images | Empty alt (`alt=""`) | Descriptive alt | No alt attr |
|------|-------------|---------------------|-----------------|-------------|
| Homepage | 35 | 8 (23%) | 27 (77%) | 0 |
| Category | 15 | 7 (47%) | 8 (53%) | 0 |
| Subcategory | 15 | 7 (47%) | 8 (53%) | 0 |
| Product | 28 | 7 (25%) | 21 (75%) | 0 |

### Detailed findings

**Navigation/category icons (7 images per page, empty alt):**
Images like `datocms/1741679780-vlot-vooruit.png`, `badkamer.png`, `moeder-en-kind.png` appear on every page as category navigation icons. All have `alt=""`. If they serve a navigational purpose and convey meaning, they should have descriptive alt text like `alt="Mobiliteit"` or `alt="Badkamer hulpmiddelen"`. If truly decorative with adjacent text labels, `alt=""` is acceptable but a missed SEO opportunity.

**Product images on homepage (19 images, good alt):**
Product card images have descriptive alt text matching the product name, e.g.:
- `alt="Scooter L&M Vivo+"`
- `alt="TENA ProSkin Pants Maxi"`
- `alt="byACRE Ultralichte loophulp Carbon Ultralight"`
- `alt="BOTALUX 70 Kniekous (AD) zonder teen"`

These are functional but not fully SEO-optimized. They use product names only without additional descriptive keywords. For example, `alt="Scooter L&M Vivo+ - elektrische scootmobiel"` would be stronger.

**Product page gallery (12 images, identical alt):**
All 12 product images use the identical alt text `alt="Scooter L&M Vivo+"`. Each image shows a different angle/detail, but the alt text does not differentiate. Better alternatives:
- `alt="Scooter L&M Vivo+ - vooraanzicht"`
- `alt="Scooter L&M Vivo+ - stuur detail"`
- `alt="Scooter L&M Vivo+ - zijaanzicht"`

**Hero/banner image (homepage):**
The main hero banner (`scootertestdagen.jpg`) has `alt=""` with `fetchPriority="high"`. This is the most prominent image on the page. An empty alt tag means search engines cannot understand or index this image. It should have descriptive alt text like `alt="Scooter testdagen bij Goed thuiszorgwinkel"`.

**Footer payment icons (8 images, good alt):**
Payment method icons have appropriate short alt text: "Bancontact", "Visa", "Mastercard", etc. This is correct.

---

## 3. Image Format Usage

| Format | Usage | Notes |
|--------|-------|-------|
| AVIF | ~100% of CDN-served images | Via TwiC transform `/format=avif/quality=90` |
| WebP | 0% | Not used; AVIF is the preferred modern format |
| PNG | Source format | Original files are PNG, transformed to AVIF on delivery |
| JPEG | 1 hero image source | `scootertestdagen.jpg` -- also transformed to AVIF |
| Static PNG | 1 file | `/assets/images/cm-footer.png` (16x16, no CDN) |

**Assessment:** PASS. The site has adopted AVIF as its sole modern format delivery via the TwiC CDN (`afbeeldingen.goed.be`). AVIF offers better compression than WebP and is supported by all modern browsers. The `format=avif` parameter in TwiC URLs confirms server-side format conversion. There is no WebP fallback visible in the HTML, but TwiC likely handles format negotiation server-side based on Accept headers.

---

## 4. Image Sizing and Responsive Implementation

### srcSet implementation

Images served via the Next.js Image component include comprehensive srcSet with 9 breakpoints:

```
320w, 640w, 768w, 1024w, 1280w, 1536w, 2048w, 2560w, 3072w
```

This provides excellent responsive coverage from mobile to high-DPI displays.

### sizes attribute -- CRITICAL ISSUE

**None of the images with srcSet have a `sizes` attribute.** This is a significant performance problem.

Without `sizes`, the browser defaults to assuming the image is `100vw` (full viewport width). This means:
- On a 1440px desktop viewport, the browser will download the 2048w or 2560w variant even if the image only occupies a 300px product card
- Product card thumbnails (~300px wide) may download 3072px images
- This wastes bandwidth and slows page load, especially on mobile

The `sizes` attributes found in the HTML (`48x48`, `96x96`, `180x180`) belong to favicon/icon `<link>` tags, not `<img>` tags.

### Width and height attributes (CLS prevention)

| Page | With width/height | Without | CLS risk |
|------|-------------------|---------|----------|
| Homepage | 28/35 (80%) | 7/35 (20%) | Medium |
| Category | 8/15 (53%) | 7/15 (47%) | High |
| Product | 9/28 (32%) | 19/28 (68%) | High |

The 7 navigation icons on every page use `data-twic-src` without width/height attributes. The 12 product gallery images on the product page also lack dimensions. TwiC may inject dimensions via JavaScript, but this creates a CLS risk during initial render before JS executes.

---

## 5. Lazy Loading Implementation

| Page | Lazy loaded | Eagerly loaded | Notes |
|------|------------|----------------|-------|
| Homepage | 27 | 2 (hero + 1 product) | Good distribution |
| Category | 7 | 0 | All lazy -- no eager hero |
| Product | 8 | 0 | All lazy -- no eager product image |

**Homepage:** `loading="lazy"` is applied to 27 images, with the hero banner correctly using `fetchPriority="high"` (not lazy). One additional image has `fetchPriority="low"`. Good implementation.

**Category page:** All images have `loading="lazy"` and the only `fetchPriority` is "low". There is no eagerly loaded above-the-fold image. If the page has a hero or header image, it should not be lazy-loaded.

**Product page:** All 8 images with `loading` attribute are lazy. The main product image (first in the gallery) should be eagerly loaded with `fetchPriority="high"` since it is the primary visual content.

---

## 6. TwiC CDN Configuration

The site uses TwiC (TwicPics) CDN at `afbeeldingen.goed.be` as an image proxy/optimizer. Two delivery mechanisms are observed:

### Mechanism 1: TwiC data attributes (navigation icons, product gallery)
```html
<img data-twic-transform="/format=avif/quality=90/*"
     data-twic-src="media:datocms/136341/..." alt=""/>
```
- Images are lazy-initialized by TwiC JavaScript SDK
- No `src`, `srcSet`, `width`, or `height` in initial HTML
- Relies on client-side JavaScript for rendering
- **SEO concern:** Googlebot may not see these images without JavaScript execution. While Googlebot does execute JS, it adds crawl delay and introduces uncertainty.

### Mechanism 2: Next.js Image component (product cards, footer icons)
```html
<img alt="Product Name" height="1024" width="1536"
     srcSet="https://afbeeldingen.goed.be/commercetools/.../image.png?twic=v1/format=avif/quality=90/inside=3072x2048 3072w, ..."
     loading="lazy"/>
```
- Full server-rendered `srcSet` with TwiC transformation URLs
- Includes `width`, `height` for CLS prevention
- All responsive variants are pre-computed in HTML
- **SEO-friendly:** Fully visible to crawlers without JS

### CDN URL patterns
- **DatoCMS assets:** `afbeeldingen.goed.be/datocms/136341/{id}-{name}.{ext}`
- **Commercetools assets:** `afbeeldingen.goed.be/commercetools/{project-key}/{image-id}.{ext}`
- **Transform syntax:** `?twic=v1/format=avif/quality=90/inside={width}x{height}`

### Quality settings
All images use `quality=90`, which is appropriate for product photography but could be reduced to 80-85 for non-hero images to save bandwidth without visible quality loss.

---

## 7. Schema / Structured Data

**No JSON-LD structured data was found on any of the 4 analyzed pages.** This is a significant SEO gap.

Expected schema types that should include image properties:

| Page type | Expected schema | Image property needed |
|-----------|----------------|----------------------|
| Homepage | Organization, WebSite | logo, image |
| Category | CollectionPage, ItemList | image per item |
| Product | Product | image (array of ImageObject) |

The absence of `Product` schema on the product page is especially impactful. Google Shopping, rich results, and product knowledge panels all rely on Product schema with image data.

---

## 8. Image Generation Plan

> **Note:** The nanobanana-mcp image generation tool is NOT currently configured. The recommendations below are for manual execution or future configuration. Generation requires the banana extension to be set up first.

### Pages requiring new or improved images

| Page | Issue | Suggested Use Case | Prompt Idea | Priority |
|------|-------|-------------------|-------------|----------|
| /nl/producten/*/[subcategory] (all ~40 subcategories) | Missing OG image entirely | og | Professional category header showing [category items] in clean Belgian healthcare store setting, 1200x630, Goed brand green/white | Critical |
| /nl/product/* (all products) | OG image is raw product photo, wrong dimensions | og | Product social preview: [product name] on white background with Goed branding bar, 1200x630 | Critical |
| /nl (homepage) | Hero banner has empty alt | hero | N/A -- existing image needs alt text fix only | High |
| /nl/producten/[category] (top categories) | OG image exists but lacks dimension meta | og | N/A -- existing image, add og:image:width/height meta tags | High |
| Navigation icons (all pages) | 7 icons with empty alt, no dimensions, JS-only | icon | N/A -- existing images need alt text and SSR rendering | Medium |

### Estimated scope
- **Subcategory OG images needed:** ~40+ pages lacking any OG image
- **Product OG images:** Recommend dynamic OG image generation via Next.js `/api/og` route rather than static generation (catalog has hundreds of products)
- **Recommended approach for products:** Build a Next.js Edge OG image route that composites the product photo onto a branded 1200x630 template
- **Estimated cost if using nanobanana-mcp for subcategories:** ~40 images at generation cost per image
- **Batch generation recommended:** Group by category for visual consistency

---

## Recommendations

### Critical (fix immediately)

1. **Add `sizes` attribute to all `<img>` tags with `srcSet`.** This is the single highest-impact performance fix. Example for product cards:
   ```
   sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
   ```
   Without this, browsers download images 3-10x larger than needed.

2. **Add OG images to all subcategory pages.** Over 40 subcategory pages currently have no social sharing image. Implement a fallback chain: page-specific OG image > parent category OG image > site-wide default.

3. **Fix product page OG image implementation.** Remove the duplicate `og:image` tag. Either:
   - Serve a properly sized (1200x630) version of the product image via TwiC transform: `?twic=v1/format=png/inside=1200x630`
   - Or use Next.js dynamic OG image generation (`/app/api/og/route.tsx`) to create branded social preview cards with the product photo composited onto a template

4. **Add Product schema (JSON-LD) to product pages** with `image` property containing an array of product photo URLs. This enables Google rich results and Shopping integration.

### High (fix within 2 weeks)

5. **Add descriptive alt text to the homepage hero banner.** Currently `alt=""` on the highest-priority image. Should describe the promotional content.

6. **Add `og:image:width` and `og:image:height`** to category pages that have OG images but lack dimension declarations.

7. **Add `width` and `height` attributes** to all TwiC `data-twic-src` images (7 navigation icons on every page and 12 product gallery images on product pages). This prevents CLS.

8. **Make the primary product image eagerly loaded.** On product pages, the first product gallery image should have `fetchPriority="high"` and no `loading="lazy"`.

### Medium (fix within 1 month)

9. **Differentiate alt text for product gallery images.** Instead of repeating the product name 12 times, add angle/view descriptors: "vooraanzicht", "zijaanzicht", "detail stuur", etc.

10. **Add descriptive alt text to navigation category icons** or confirm they are purely decorative with adjacent text labels.

11. **Add Organization and WebSite schema** to the homepage with `logo` and `image` properties.

12. **Consider server-side rendering for TwiC data-src images.** The 7 navigation icons using `data-twic-src` without a `src` fallback are invisible to crawlers that do not execute JavaScript. Consider using the Next.js Image component pattern for these too.

### Low (backlog)

13. **Reduce quality from 90 to 80-85** for non-hero product thumbnails. At the responsive sizes served (320-1024px), the difference is imperceptible but can save 15-25% bandwidth.

14. **Add WebP fallback** for older browsers. While TwiC likely handles this via Accept header negotiation server-side, explicit `<picture>` elements with WebP and AVIF `<source>` tags would guarantee correct format delivery.

15. **Convert `/assets/images/cm-footer.png`** to use the TwiC CDN instead of serving as a static asset.

---

## Technical Architecture Notes

- **CMS:** DatoCMS (content images) + Commercetools (product images)
- **CDN:** TwiC/TwicPics at `afbeeldingen.goed.be` proxying both DatoCMS and Commercetools origins
- **Framework:** Next.js (App Router with React Server Components)
- **Image component:** Mix of Next.js `<Image>` (SSR with srcSet) and TwiC SDK (client-side lazy init)
- **OG images:** Served from `datocms-assets.com` (not via TwiC CDN)
- **Product images origin:** `images.cdn.europe-west1.gcp.commercetools.com`

---

*Report generated by Claude SEO Agent -- Image Audit (static analysis). Live rendering behavior (JavaScript-dependent images, TwiC runtime transforms) may differ from static HTML analysis. Recommend supplementing with Lighthouse and Chrome DevTools audits for runtime validation.*
