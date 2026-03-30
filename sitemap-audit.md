# Sitemap Audit - aanbod.goed.be

## Overview

Six sitemaps are declared in robots.txt. Analysis results below.

---

## Sitemap Inventory

| Sitemap URL | Status | URLs | Last Modified Range |
|---|---|---|---|
| `aanbod.goed.be/nl/general/sitemap.xml` | OK | 4 | Jul 2024 - Mar 2026 |
| `aanbod.goed.be/nl/categories/sitemap.xml` | OK | 220 | Nov 2025 - Mar 2026 |
| `aanbod.goed.be/nl/products/sitemap.xml` | OK | ~1,200+ | Mar 2026 |
| `aanbod.goed.be/uitleendienst/sitemap.xml` | REDIRECT (301) | 0 | N/A |
| `www.goed.be/sitemap.xml` | External (main domain) | Unknown | N/A |
| `jobs.goed.be/sitemap.xml` | External (jobs subdomain) | Unknown | N/A |

**Total estimated URLs in aanbod.goed.be sitemaps: ~1,424+**

---

## Detailed Analysis

### 1. General Sitemap (`/nl/general/sitemap.xml`)

Contains only 4 core pages:
- `/nl/startpagina` (lastmod: 2026-03-26)
- `/nl/producten` (lastmod: 2025-01-17)
- `/nl/evenementen` (lastmod: 2024-07-05)
- `/nl/onze-winkels` (lastmod: 2024-07-05)

**Issues:**
- **CRITICAL**: Missing many important pages: `/nl/contact`, `/nl/tips-en-advies`, `/nl/vestigingen`, individual store pages, info pages
- No `changefreq` or `priority` attributes
- `/nl/evenementen` and `/nl/onze-winkels` have very old lastmod dates (Jul 2024)

### 2. Categories Sitemap (`/nl/categories/sitemap.xml`)

Contains 220 category and subcategory URLs. Well-structured covering:
- Mobility (wheelchairs, walking aids, adapted bicycles)
- Incontinence & stoma
- Sleep & seating comfort
- Care products
- Pregnancy & child
- Sport & rehabilitation
- Adapted clothing
- Compression stockings
- Measuring devices
- Hearing & reading aids
- Rental services

**Issues:**
- No `changefreq` or `priority` attributes
- Some categories may have stale lastmod dates

### 3. Products Sitemap (`/nl/products/sitemap.xml`)

Contains 1,200+ product URLs following pattern: `/nl/product/[product-name]`

**Issues:**
- **Content truncated** during fetch - exact count unknown, likely 1,200-2,000+ URLs
- No `changefreq` or `priority` attributes
- All URLs use consistent pattern which is good
- Product modification dates clustered in late March 2026 - suggests bulk update

### 4. Uitleendienst Sitemap (`/uitleendienst/sitemap.xml`)

**CRITICAL**: Returns 301 redirect to `http://aanbod.goed.be/nl/uitleendienst` (a webpage, not a sitemap). This sitemap is broken and non-functional.

---

## Issues Found

### Critical
1. **Broken sitemap**: `/uitleendienst/sitemap.xml` redirects to a regular page instead of serving XML
2. **Missing pages in general sitemap**: Contact, tips & advies, vestigingen, about pages not included
3. **No sitemap index file**: There is no sitemap index at `/sitemap.xml` that references all sub-sitemaps

### High
4. **No `changefreq` or `priority`** on any sitemap - search engines get no crawl priority guidance
5. **Stale lastmod dates**: Some general pages show July 2024 - either they haven't been updated or lastmod is not being maintained
6. **Missing individual store pages**: With 35+ locations, each store page should be in a sitemap
7. **Cross-domain sitemaps in robots.txt**: `www.goed.be/sitemap.xml` and `jobs.goed.be/sitemap.xml` are declared in `aanbod.goed.be/robots.txt` - these should only be in their respective domain's robots.txt

### Medium
8. **No image sitemap**: Product images from `afbeeldingen.goed.be` are not included in sitemaps
9. **No video sitemap**: If product videos exist, they're not in sitemaps
10. **Promotions pages blocked + not in sitemap**: `/nl/promoties` is blocked by robots.txt AND not in any sitemap - intentional but worth reviewing
11. **Large products sitemap**: With 1,200+ URLs, this may benefit from being split into multiple sitemaps by category

### Low
12. **No news sitemap**: If tips & advies content is regularly published, consider a news sitemap
13. **HTTP in redirect**: The uitleendienst redirect goes to `http://` instead of `https://`

---

## Recommendations

### Immediate Actions
1. **Fix uitleendienst sitemap** - Either create a proper XML sitemap for rental service pages or remove the reference from robots.txt
2. **Create sitemap index** at `https://aanbod.goed.be/sitemap.xml` that references all sub-sitemaps
3. **Expand general sitemap** to include all important non-product, non-category pages

### Short-term
4. **Add `changefreq` and `priority`** to all sitemap entries
5. **Add individual store pages** to a dedicated locations sitemap
6. **Remove cross-domain sitemap references** from robots.txt (keep only aanbod.goed.be sitemaps)
7. **Fix lastmod dates** - ensure they reflect actual content modification dates

### Long-term
8. **Add image sitemap** for product photography
9. **Consider splitting products sitemap** by category for better organization
10. **Implement automatic sitemap generation** tied to CMS content updates
11. **Add hreflang sitemaps** if multi-language support is planned

---

## Scoring

| Criterion | Score | Max |
|---|---|---|
| Sitemap exists and is valid XML | 7/10 | 10 |
| All important pages included | 4/10 | 10 |
| Lastmod accuracy | 5/10 | 10 |
| Changefreq & priority | 0/10 | 10 |
| Sitemap index present | 0/10 | 10 |
| No broken sitemaps | 5/10 | 10 |
| Image/video sitemaps | 0/10 | 10 |

**Overall Sitemap Score: 21/70 (30%)**
