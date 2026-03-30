# Performance Audit: aanbod.goed.be

**Date:** 2026-03-30
**Site:** https://aanbod.goed.be
**Stack:** Next.js 14+ (App Router with React Server Components), commercetools, DatoCMS, TwicPics CDN
**Analysis method:** Static HTML source analysis of the server-rendered homepage (748 KB document)

---

## Executive Summary

The site suffers from **severe render-blocking resource overload**: 48 CSS files and 50 JavaScript chunks are loaded on the homepage. A critical bug causes the hero/LCP image to carry both `fetchPriority="high"` and `loading="lazy"` simultaneously, which undermines LCP optimization. The React Server Components (RSC) payload embedded inline weighs approximately 545 KB, bloating the HTML document to 748 KB. TwicPics-managed images lack explicit width/height attributes, creating CLS risk. No preconnect hints exist for the image CDN domain `afbeeldingen.goed.be`. These issues combined are expected to produce poor LCP scores, marginal INP scores, and borderline CLS scores for real users.

**Estimated Core Web Vitals (field projection):**

| Metric | Estimated Value | Threshold | Status |
|--------|----------------|-----------|--------|
| LCP | 3.5-5.0s (mobile) | <=2.5s | POOR |
| INP | 200-400ms (mobile) | <=200ms | NEEDS IMPROVEMENT |
| CLS | 0.1-0.2 | <=0.1 | NEEDS IMPROVEMENT |

These estimates are based on the structural issues found in the HTML source. Field data from CrUX should be consulted via CrUX Vis (https://cruxvis.withgoogle.com) or the CrUX API for real 75th percentile values.

---

## 1. Core Web Vitals Analysis

### 1.1 LCP (Largest Contentful Paint) -- CRITICAL

**Likely LCP element:** Hero image (scootertestdagen.jpg) served via TwicPics CDN.

**Critical bug found -- `loading="lazy"` on the LCP image:**

```html
<img alt="" fetchPriority="high" height="1024" width="1536"
     srcSet="https://afbeeldingen.goed.be/datocms/136341/1774538021-scootertestdagen.jpg?twic=v1/format=avif/quality=90/inside=3072x2048 3072w, ..."
     loading="lazy"
     src="https://afbeeldingen.goed.be/datocms/136341/1774538021-scootertestdagen.jpg?twic=v1/format=avif/quality=90/inside=1536x1024"/>
```

The `loading="lazy"` attribute directly contradicts `fetchPriority="high"`. The browser will defer loading this image until it enters the viewport after layout, adding hundreds of milliseconds to LCP. Chrome ignores `fetchPriority` when `loading="lazy"` is set.

**LCP bottleneck chain (subparts):**

1. **TTFB (Time to First Byte):** The 748 KB HTML document must be fully downloaded and parsed before CSS evaluation begins. Without edge CDN caching for the HTML document itself, server response time in Belgium could reach 400-800ms.

2. **Resource Load Delay:** 48 CSS files block rendering. All carry `data-precedence="next"` which means Next.js streams them in document order. The browser must discover and request the LCP image only after processing all CSS. With no `<link rel="preload">` for the hero image and no `<link rel="preconnect">` to `afbeeldingen.goed.be`, the image request starts late.

3. **Resource Load Time:** The hero image uses responsive srcSet with AVIF format (good), but the largest variant is 3072x2048 -- oversized for most viewports. Without a `sizes` attribute, the browser may download a larger variant than needed.

4. **Element Render Delay:** The RSC payload (~545 KB inline scripts) must be parsed before React hydration can trigger rendering of the hero section.

**Preload issues:**
- The only preloaded image is `/assets/images/cm-footer.png` (a footer image) -- this is counterproductive, as it steals bandwidth priority from the hero image.
- The webpack bootstrap script is preloaded with `fetchPriority="low"`, which is correct.
- No preload for the LCP hero image exists.
- No preconnect to `afbeeldingen.goed.be` exists (0 preconnect hints in the entire document).

### 1.2 INP (Interaction to Next Paint) -- AT RISK

**JavaScript bundle analysis:**

- **50 external JS chunks** loaded via `<script async>` tags
- **96 inline RSC payload chunks** (`self.__next_f.push(...)`) totaling ~545 KB
- **558 KB total inline script content** in the document
- **1 polyfill script** with `noModule` attribute (correct legacy handling)
- **0 deferred scripts** -- all scripts use `async`

**Risk factors:**

- **Massive hydration payload:** 96 RSC chunks must be parsed and reconciled during hydration. This creates a long task on the main thread (likely 200-500ms on mid-tier mobile devices).
- **50 async JS chunks** compete for network bandwidth and main thread parsing time simultaneously, since `async` scripts execute as soon as they download.
- **GTM (GTM-PL68M6S):** Google Tag Manager loads additional third-party scripts that further compete for main thread time during and after hydration.
- **No evidence of `React.lazy()` or dynamic imports** for below-fold components -- the entire page appears to hydrate at once.

**Positive factors:**
- All scripts use `async` attribute (no render-blocking `<script>` without async/defer).
- Next.js App Router with RSC means server-rendered HTML is interactive before full hydration (partial).

### 1.3 CLS (Cumulative Layout Shift) -- AT RISK

**Issues found:**

1. **TwicPics images without dimensions:** Images using `data-twic-src` have only `style="object-fit:contain"` but no `width` or `height` attributes. When TwicPics client-side JS replaces the placeholder with the actual image, a layout shift occurs unless CSS reserves the space.

2. **8 images with empty `alt=""` attribute:** While not directly a CLS issue, these images combined with missing dimensions suggest they may be decorative elements that shift layout when loaded.

3. **Hero image srcSet without `sizes` attribute:** The hero image has a srcSet with variants from 320w to 3072w but no `sizes` attribute, meaning the browser defaults to `100vw`. This may cause it to download unnecessarily large images but does not directly cause CLS since width/height are set (1536x1024).

4. **GT-Haptik custom font (6 variants loaded via OTF format):** No `font-display` property was found in the HTML. If the font CSS does not include `font-display: swap` or `font-display: optional`, the font loading will cause FOIT (Flash of Invisible Text) or FOUT (Flash of Unstyled Text), both of which cause layout shifts.

5. **Footer image preloaded unnecessarily:** `cm-footer.png` is preloaded as an image, which suggests it may be a late-injected element that previously caused CLS. The preload band-aid does not fix the root cause.

---

## 2. Resource Optimization

### 2.1 CSS -- CRITICAL ISSUE

**48 separate CSS files** loaded in the `<head>`:

All files follow the pattern `/_next/static/css/{hash}.css` with `data-precedence="next"`. This is Next.js App Router's CSS streaming behavior, where each component's CSS is extracted into a separate file.

**Problems:**

- **48 HTTP requests** for CSS before any rendering can begin. Even with HTTP/2 multiplexing, the browser must discover, request, and parse all 48 files.
- **No critical CSS inlining:** None of the above-fold styles are inlined in the `<head>`. Everything is an external file.
- **Over-granular code splitting:** Next.js App Router extracts CSS per component module. With 48 files, the overhead of HTTP request headers, TLS record framing, and stream scheduling exceeds the benefit of granular caching.

**Recommendation:** Configure `next.config.js` to consolidate CSS:
```js
// next.config.js
experimental: {
  optimizeCss: true, // enables critters for critical CSS inlining
}
```
Alternatively, use `@next/bundle-analyzer` to identify which CSS files are actually needed above the fold and inline those critical styles.

### 2.2 JavaScript

**50 external script chunks** plus ~545 KB of inline RSC data:

| Category | Count | Notes |
|----------|-------|-------|
| Vendor chunks (numeric IDs) | ~30 | e.g., `9622-dcaa4dd9e58af3b4.js` |
| App route chunks | ~12 | e.g., `app/[lang]/(base)/layout-894e4d07dfb10441.js` |
| Framework chunks | 4 | webpack, main-app, polyfills, global-error |
| Named vendor chunks | 2 | `b5df8cbc-...`, `0d63573d-...` |

**Inline RSC payload:** 96 `self.__next_f.push()` calls totaling ~545 KB. This payload contains the serialized React Server Component tree, including product data from commercetools (190 references) and content from DatoCMS (157 references).

**Problems:**

- **545 KB inline RSC data** makes the HTML document 748 KB total. This is extreme for an initial page load. The browser must download and parse all of this before any rendering begins.
- **No apparent route-level code splitting for the homepage.** The chunk for the page itself (`app/[lang]/(base)/(default)/page-b8a794522cd07455.js`) is loaded alongside layout chunks for every level of the route hierarchy.
- **Product data embedded inline** rather than fetched lazily. If the homepage shows a product carousel, all product data (images, prices, descriptions) for every carousel item is in the RSC payload.

### 2.3 Images

**35 total `<img>` elements found:**

**Positive findings:**
- TwicPics CDN (`afbeeldingen.goed.be`) serves images with AVIF format and quality=90
- Responsive `srcSet` with multiple breakpoints (320w to 3072w) on key images
- `loading="lazy"` on 27 images (below-fold content)
- Hero image has explicit `width` and `height` attributes

**Negative findings:**
- **LCP image has contradictory `loading="lazy"` + `fetchPriority="high"`** (see section 1.1)
- **TwicPics lazy-loaded images (`data-twic-src`) lack width/height** -- only 1 image uses `data-twic-src` in the server-rendered HTML, but more may be injected client-side
- **No `sizes` attribute on srcSet images** -- browser defaults to `100vw`, potentially downloading larger images than needed
- **No `<link rel="preload">` for the hero image**
- **Footer image (`cm-footer.png`) is preloaded instead of the hero image** -- misplaced priority
- **OTF font format** used for GT-Haptik (6 variants) instead of WOFF2 -- OTF files are significantly larger than WOFF2

---

## 3. Third-Party Script Impact

### 3.1 Google Tag Manager (GTM-PL68M6S)

GTM is referenced in the HTML and will load additional scripts post-page-load. Common payloads injected by GTM include:

- Google Analytics 4 (gtag.js)
- Facebook Pixel (fbevents.js) -- 9 "facebook" references found in the source
- Potentially: Hotjar, Google Ads remarketing, cookie consent

**Impact:** GTM itself is ~90 KB compressed. Each tag it loads adds main thread work during and after hydration. The Facebook Pixel references (9 occurrences) suggest multiple FB events are tracked, each triggering network requests and DOM mutations.

### 3.2 TwicPics Client-Side SDK

TwicPics uses `data-twic-src` and `data-twic-transform` attributes that require a client-side JavaScript SDK to resolve images. This adds:
- An additional JS file to download and parse
- Client-side image URL resolution (DOM observation + mutation)
- Potential render delay for images managed by TwicPics

**Recommendation:** For LCP-critical images, use direct `<img src>` with the TwicPics URL pre-resolved server-side (as is done for the hero image). Only use the TwicPics JS SDK for lazy-loaded below-fold images.

### 3.3 External Domains Summary

| Domain | Purpose | Preconnect | Impact |
|--------|---------|------------|--------|
| `afbeeldingen.goed.be` | Image CDN (TwicPics) | MISSING | HIGH -- DNS+TCP+TLS adds 150-300ms to first image |
| `www.googletagmanager.com` | GTM | MISSING | MEDIUM |
| `connect.facebook.net` | FB Pixel (via GTM) | MISSING | LOW (deferred) |

---

## 4. Caching and CDN Effectiveness

### 4.1 Static Assets

All Next.js static assets use content-hashed filenames (`/_next/static/css/{hash}.css`, `/_next/static/chunks/{hash}.js`), enabling immutable caching (`Cache-Control: public, max-age=31536000, immutable`). This is a strong point.

### 4.2 Image CDN

TwicPics CDN (`afbeeldingen.goed.be`) provides:
- Automatic AVIF format conversion
- Quality optimization (quality=90)
- Responsive resizing (inside=WxH parameter)
- Edge caching for transformed images

**Missing:** No `<link rel="preconnect" href="https://afbeeldingen.goed.be">` to warm the connection early.

### 4.3 HTML Document Caching

The 748 KB HTML document is the critical bottleneck. If this is served from a Vercel edge function or similar, the TTFB depends on:
- Whether the response is cached at the edge (ISR/static) or generated per-request (SSR)
- Geographic proximity to Belgian users (Vercel has edge nodes in Europe)

**Recommendation:** If using ISR (Incremental Static Regeneration), ensure the homepage has a reasonable revalidation period (e.g., 60 seconds) so most requests are served from cache.

---

## 5. Font Loading Strategy

### 5.1 GT-Haptik Font Family

**6 font variants detected:**

| Variant | Format |
|---------|--------|
| GT-Haptik-Regular.OTF | OTF |
| GT-Haptik-Regular-Oblique.OTF | OTF |
| GT-Haptik-Medium.OTF | OTF |
| GT-Haptik-Medium-Oblique.OTF | OTF |
| GT-Haptik-Bold.OTF | OTF |
| GT-Haptik-Bold-Oblique.OTF | OTF |

**Critical issues:**

1. **OTF format instead of WOFF2:** OTF files are uncompressed glyph outlines. WOFF2 provides 30-50% better compression. A typical OTF file of 80 KB compresses to ~40 KB as WOFF2. With 6 variants, the savings could reach 200+ KB.

2. **No `font-display` property detected:** Without `font-display: swap` or `font-display: optional`, the browser uses its default behavior (typically `font-display: auto`), which in Chrome means a 3-second invisible text period (FOIT) before falling back to a system font. This directly impacts LCP if the largest element contains text styled with GT-Haptik.

3. **6 variants loaded:** The oblique variants (Regular-Oblique, Medium-Oblique) may not be used on the homepage. Each unused variant wastes bandwidth and delays font rendering.

4. **No `<link rel="preload" as="font">` for any font file.** Fonts are discovered only after CSS is parsed, adding latency.

**Recommendations:**

- Convert all GT-Haptik fonts from OTF to WOFF2 format
- Add `font-display: swap` to all `@font-face` declarations
- Preload only the 1-2 font variants used above the fold: `<link rel="preload" as="font" type="font/woff2" href="/fonts/GT-Haptik-Regular.woff2" crossorigin>`
- Subset fonts to include only Latin character set (sufficient for Dutch/Belgian content)
- Remove oblique variants if not used on critical pages

---

## 6. Critical Rendering Path

### 6.1 Current Rendering Sequence (Estimated)

```
0ms    DNS lookup for aanbod.goed.be
50ms   TCP + TLS handshake
100ms  HTTP request sent
300ms  First byte received (TTFB)
300ms  HTML streaming begins (748 KB document)
600ms  First CSS <link> discovered -- 48 CSS files requested
800ms  All 48 CSS requests initiated (HTTP/2 multiplexed)
1200ms CSS files downloaded and parsed
1200ms First paint possible (CSSOM ready)
1200ms Hero image <img> discovered (but loading="lazy" delays it)
1500ms Browser determines hero image is in viewport, starts loading
1500ms DNS lookup for afbeeldingen.goed.be (no preconnect!)
1700ms TCP + TLS to afbeeldingen.goed.be
2000ms Hero image request sent
2500ms Hero image downloaded (AVIF, ~100-200 KB)
2500ms LCP event fires
2500ms RSC payload parsing continues (~545 KB)
3000ms React hydration begins
3500ms React hydration complete -- page becomes interactive (INP-ready)
3500ms GTM loads and injects third-party scripts
4000ms Facebook Pixel and analytics fire
```

**Estimated mobile LCP: 3.5-5.0 seconds** (on 4G connection with mid-tier device)
**Estimated desktop LCP: 2.0-3.0 seconds** (on broadband with fast CPU)

### 6.2 Optimized Rendering Sequence (Target)

```
0ms    DNS lookup
50ms   TCP + TLS
100ms  HTTP request
200ms  First byte (edge cached, smaller HTML)
200ms  Preconnect to afbeeldingen.goed.be established
400ms  Critical CSS inlined -- first paint
400ms  Hero image preload initiated (no lazy loading)
400ms  Consolidated CSS files (5-8 instead of 48) loading
600ms  Hero image downloaded (AVIF, properly sized)
600ms  LCP event fires
800ms  Remaining CSS loaded
1000ms React hydration (smaller RSC payload)
1200ms Page fully interactive
```

**Target mobile LCP: 1.5-2.5 seconds**

---

## 7. Mobile vs Desktop Performance

### 7.1 Key Differences

| Factor | Mobile Impact | Desktop Impact |
|--------|---------------|----------------|
| 748 KB HTML download | ~2s on 3G, ~0.5s on 4G | ~0.1s on broadband |
| 48 CSS file parsing | ~800ms on mid-tier CPU | ~200ms on desktop CPU |
| 545 KB RSC parsing | ~1.5s on mid-tier CPU | ~300ms on desktop CPU |
| React hydration | ~500ms-1s on mid-tier CPU | ~100-200ms on desktop CPU |
| Hero image (no sizes) | May download 3072w variant | May download 3072w variant |
| Font loading (6 OTF) | ~400ms extra on 4G | ~100ms on broadband |

### 7.2 Mobile-Specific Issues

- **No viewport-aware image sizing:** The hero `srcSet` lacks a `sizes` attribute, so mobile browsers default to `100vw` and may download the 3072w image (designed for Retina desktop) on a 375px-wide phone screen.
- **CPU-bound bottleneck:** On a Moto G Power (representative mid-tier device), parsing 545 KB of inline scripts takes significantly longer than on desktop.
- **48 CSS files on HTTP/2:** While multiplexed, mobile browsers typically have lower concurrency limits and slower DNS resolution, amplifying the impact of many small files.

---

## 8. Prioritized Recommendations

### P0 -- Critical (Expected LCP improvement: 1-2 seconds)

| # | Issue | Fix | Impact |
|---|-------|-----|--------|
| 1 | **LCP image has `loading="lazy"`** | Remove `loading="lazy"` from the hero image. Keep `fetchPriority="high"`. | LCP -500ms to -1s |
| 2 | **No preconnect to image CDN** | Add `<link rel="preconnect" href="https://afbeeldingen.goed.be">` in `<head>` | LCP -150-300ms |
| 3 | **No preload for LCP image** | Add `<link rel="preload" as="image" href="..." fetchpriority="high">` for the hero image. Remove the footer image preload. | LCP -200-500ms |
| 4 | **48 CSS files block rendering** | Enable `experimental.optimizeCss` in next.config.js or use a CSS consolidation strategy. Target: 5-8 CSS files maximum. | LCP -200-400ms |

### P1 -- High (Expected improvement across all CWV)

| # | Issue | Fix | Impact |
|---|-------|-----|--------|
| 5 | **545 KB inline RSC payload** | Reduce homepage data: paginate product carousels, lazy-load below-fold sections via `React.lazy()` + Suspense boundaries. Target: <200 KB inline data. | LCP -300ms, INP -100ms |
| 6 | **GT-Haptik fonts in OTF format** | Convert to WOFF2, add `font-display: swap`, preload primary variant, subset to Latin. | LCP -200ms, CLS improvement |
| 7 | **TwicPics images lack dimensions** | Add `width` and `height` attributes to all `<img>` elements using `data-twic-src`. | CLS -0.05-0.1 |
| 8 | **No `sizes` attribute on srcSet images** | Add `sizes="(max-width: 768px) 100vw, 50vw"` (or appropriate values) to all images with `srcSet`. | Bandwidth savings 30-50% on mobile |

### P2 -- Medium (Incremental improvements)

| # | Issue | Fix | Impact |
|---|-------|-----|--------|
| 9 | **50 JS chunks loaded simultaneously** | Review chunk splitting strategy. Use `next/dynamic` for below-fold components. | INP -50-100ms |
| 10 | **GTM blocks main thread** | Defer GTM loading until after `load` event or use Partytown for third-party scripts. | INP -50-150ms |
| 11 | **Footer image preloaded** | Remove `<link rel="preload" as="image" href="/assets/images/cm-footer.png">`. This wastes early bandwidth. | LCP -50ms (indirect) |
| 12 | **6 font variants loaded** | Audit font usage: likely only Regular and Bold are needed on the homepage. Remove unused oblique variants. | Bandwidth savings ~150 KB |

### P3 -- Low (Best practices)

| # | Issue | Fix | Impact |
|---|-------|-----|--------|
| 13 | Empty alt text on 8 images | Add descriptive alt text for non-decorative images. Mark decorative ones with `role="presentation"`. | Accessibility, SEO |
| 14 | Missing preconnect for GTM domain | Add `<link rel="dns-prefetch" href="https://www.googletagmanager.com">` | Minor latency reduction |
| 15 | HTML document size (748 KB) | Investigate if ISR/static generation is used. If SSR, enable edge caching with stale-while-revalidate. | TTFB improvement |

---

## 9. Resource Inventory Summary

| Resource Type | Count | Notes |
|---------------|-------|-------|
| CSS files | 48 | All render-blocking, `data-precedence="next"` |
| External JS chunks | 50 | All `async`, no `defer` |
| Inline script payload | ~545 KB | 96 RSC chunks |
| HTML document size | 748 KB | Single minified line |
| Images (`<img>`) | 35 | 27 lazy, 1 with fetchPriority=high |
| Images (TwicPics managed) | 1+ | `data-twic-src`, no dimensions |
| Font variants (GT-Haptik) | 6 | OTF format, no font-display |
| Preconnect hints | 0 | None for any domain |
| Preloads | 2 | Footer image (wasteful) + webpack chunk (correct) |
| Third-party: GTM | 1 | GTM-PL68M6S |
| Third-party: Facebook | ~9 refs | Likely pixel + events |
| External image domain | 1 | afbeeldingen.goed.be (TwicPics) |

---

## 10. Validation Recommendations

To validate these findings with real-world data:

1. **CrUX Vis** (https://cruxvis.withgoogle.com): Check field data for aanbod.goed.be. Look at LCP subparts (TTFB, resource load delay, resource load time, element render delay) which are available in CrUX since February 2025.

2. **PageSpeed Insights** (https://pagespeedonline.googleapis.com): Run both mobile and desktop tests. Focus on the LCP element identification and the opportunity scores.

3. **Chrome DevTools Performance panel**: Record a page load on a throttled 4G connection to confirm the rendering sequence described in section 6.1.

4. **WebPageTest** (https://www.webpagetest.org): Run from a Brussels, Belgium test location with a Moto G Power device profile to simulate real Belgian user conditions. Use the filmstrip view to identify the exact LCP moment.

---

*Report generated from static HTML source analysis. Field data validation recommended.*
