# Schema.org Structured Data Audit -- aanbod.goed.be

**Date:** 2026-03-30
**Site:** https://aanbod.goed.be
**Type:** Belgian e-commerce healthcare retailer (thuiszorgwinkel), part of CM
**Language:** Dutch (nl_BE)
**Platform:** Next.js (React) with commercetools backend

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Existing Structured Data Detection](#2-existing-structured-data-detection)
3. [Validation Results](#3-validation-results)
4. [Google Rich Results Eligibility](#4-google-rich-results-eligibility)
5. [Missing Schema Opportunities](#5-missing-schema-opportunities)
6. [Recommended JSON-LD Implementations](#6-recommended-json-ld-implementations)
7. [Implementation Priority Matrix](#7-implementation-priority-matrix)

---

## 1. Executive Summary

**Overall schema maturity: Very Low (1/10)**

aanbod.goed.be has virtually no functional structured data. The site contains partial Microdata on product card components (image, name, price, priceCurrency), but these lack the required `itemscope`/`itemtype` wrapper at the correct scope level, miss critical properties (description, availability, URL, SKU), and are not present on category pages at all (products load client-side via JavaScript). No JSON-LD exists on any page. No Organization, WebSite, BreadcrumbList, or any other schema type is implemented.

For a healthcare e-commerce site with 35+ physical stores, subscriptions, rental services, and a strong brand association (CM), this represents a significant missed opportunity for search visibility, rich results, and AI/LLM discoverability.

**Key findings:**
- Zero JSON-LD blocks across all analyzed pages
- Zero RDFa structured data (only Open Graph meta tags present)
- Partial Microdata on product cards (homepage, product page carousel) but incomplete and invalid
- Category pages render products client-side -- no structured data in initial HTML
- No Organization, LocalBusiness, WebSite, BreadcrumbList, or Product (full) schema
- No rich result eligibility for any Google feature

---

## 2. Existing Structured Data Detection

### 2.1 Pages Analyzed

| Page | URL / File | JSON-LD | Microdata | RDFa |
|------|-----------|---------|-----------|------|
| Homepage | `/nl` (homepage.html) | 0 blocks | Partial (product cards) | None (OG tags only) |
| Category (scootmobielen) | `/nl/producten/mobiliteit/scootmobielen` (page-category.html) | 0 blocks | None | None (OG tags only) |
| Category (hulpmiddelen) | `/nl/producten` (category-hulpmiddelen.html) | 0 blocks | None | None |
| Product Detail | `/nl/product/mobio-opvouwbare-scooter-atto` (page-product.html) | 0 blocks | Partial (carousel cards) | None (OG tags only) |

### 2.2 Microdata Found (Product Cards)

Product card components on the homepage and product page "vaak samen gekocht met" (frequently bought together) carousel include:

```html
<article itemScope="" itemType="http://schema.org/Product">
  <a href="/nl/product/[slug]">
    <figure itemProp="image">...</figure>
    <h3 itemProp="name">Product Name</h3>
    <p itemProp="price">EUR X,XX</p>
    <meta itemProp="priceCurrency" content="EUR"/>
  </a>
</article>
```

**Properties present:**
- `itemType="http://schema.org/Product"` -- uses `http://` (should be `https://`)
- `itemProp="image"` -- on `<figure>` element (non-standard)
- `itemProp="name"` -- product name
- `itemProp="price"` -- price value as text content
- `itemProp="priceCurrency"` -- EUR

**Properties missing (required for Google rich results):**
- No `Offer` wrapper around price/priceCurrency
- No `availability`
- No `description`
- No `url`
- No `sku` or `gtin`/`mpn`
- No `brand`
- No `image` as URL string (uses figure element)

### 2.3 Open Graph Tags

Present on all pages with standard properties:
- `og:title`, `og:description`, `og:url`, `og:site_name`, `og:locale`, `og:image`, `og:type`
- Product page also includes `og:image:width`, `og:image:height`
- Note: Product page is missing `og:type` = "product" (defaults to website)

### 2.4 Category Pages -- Critical Gap

Category pages (e.g., `/nl/producten/mobiliteit/scootmobielen`) render product listings entirely via client-side JavaScript. The server-rendered HTML contains:
- Navigation/header
- Filter controls
- Product navigation sidebar
- But zero product cards or product data in the HTML source

This means search engine crawlers that do not execute JavaScript will see no product data and no structured data whatsoever.

---

## 3. Validation Results

### 3.1 Product Card Microdata -- FAIL

| Check | Status | Issue |
|-------|--------|-------|
| @context / itemType URL | FAIL | Uses `http://schema.org/Product` instead of `https://schema.org/Product` |
| Required: name | PASS | Present |
| Required: image | PARTIAL | Uses `<figure>` element, not a URL string |
| Required: offers | FAIL | Price/priceCurrency are direct children of Product, not wrapped in Offer |
| Required: offers.price | FAIL | Text content `EUR X,XX` instead of numeric value |
| Required: offers.availability | FAIL | Missing entirely |
| Recommended: description | FAIL | Missing |
| Recommended: sku/gtin/mpn | FAIL | Missing |
| Recommended: brand | FAIL | Missing |
| Recommended: url | FAIL | Missing (link exists but no itemProp) |

**Verdict:** The existing Microdata is structurally invalid and will not generate Google rich results. Google's Rich Results Test would report errors for missing `offers` and `availability`.

### 3.2 All Other Schema Types -- NOT PRESENT

No other structured data exists to validate.

---

## 4. Google Rich Results Eligibility

| Rich Result Type | Current Status | Potential |
|-----------------|----------------|-----------|
| Product snippets (price, availability) | NOT ELIGIBLE -- invalid Microdata | HIGH -- product pages have all needed data |
| Merchant listings | NOT ELIGIBLE | HIGH -- e-commerce with prices |
| Breadcrumbs | NOT ELIGIBLE | HIGH -- breadcrumb UI exists on product pages |
| Sitelinks search box | NOT ELIGIBLE | MEDIUM -- search functionality exists |
| Organization knowledge panel | NOT ELIGIBLE | HIGH -- established brand (Goed/CM) |
| Local business / store locator | NOT ELIGIBLE | HIGH -- 35+ physical stores |
| FAQ rich results | N/A | LOW -- restricted to government/healthcare (Goed may qualify as healthcare, but benefit is limited) |
| Product reviews | NOT ELIGIBLE | LOW -- no review system detected on-site |

---

## 5. Missing Schema Opportunities

### 5.1 Critical Priority (direct rich result impact)

#### A. Product Schema (JSON-LD) -- Product Detail Pages
The main product page (`/nl/product/mobio-opvouwbare-scooter-atto`) displays:
- Product name: "MOBIO Opvouwbare Scooter ATTO"
- Brand: "Mobio"
- Article number: "0041514"
- Description: detailed text
- Price: visible in page (e.g., amount in EUR)
- Images: multiple product images from commercetools CDN
- Related products in carousel

All data needed for a complete Product schema with Offer is available. This is the single highest-impact implementation.

#### B. BreadcrumbList -- Product and Category Pages
Breadcrumb navigation is already rendered in the HTML:
```
Startpagina > Producten > mobiliteit > scootmobielen > [Product Name]
```
Adding BreadcrumbList JSON-LD would enable breadcrumb rich results in Google SERPs immediately.

#### C. WebSite with SearchAction -- Homepage
The site has a search input (`type="search"`) with placeholder "zoek een product, merk of trefwoord...". WebSite + SearchAction enables the sitelinks search box in Google.

#### D. Organization -- Sitewide
Goed thuiszorgwinkel is part of CM (Christelijke Mutualiteit). Adding Organization schema with logo, contact info (03 205 69 29), social profiles, and parent organization establishes entity identity.

### 5.2 High Priority

#### E. LocalBusiness / MedicalBusiness -- Store Pages
With 35+ physical stores across Flanders, individual store pages (if they exist at `/nl/winkels/[store]`) should have LocalBusiness or MedicalBusiness schema with:
- Address, geo coordinates
- Opening hours
- Phone number
- Department/service type

#### F. ItemList -- Category Pages
Category pages should include ItemList schema listing products, even if products render client-side. This helps search engines understand the page as a product listing.

#### G. OfferShippingDetails -- Product Pages
The site prominently displays "Besteld voor 15u, binnen 2 werkdagen geleverd" and "Gratis verzending vanaf EUR 40". This shipping data should be included in Product schema.

### 5.3 Medium Priority

#### H. FAQPage -- Product Pages (for AI/LLM discoverability)
The product page contains accordion content with "veelgestelde vragen" (frequently asked questions). Since Goed is a healthcare retailer, it may qualify for Google FAQ rich results (restricted to healthcare since August 2023). Even if it does not qualify, FAQPage schema improves AI citation and GEO (Generative Engine Optimization).

**Note:** This is an Info-level recommendation, not Critical. The primary value is AI discoverability, not Google rich results.

#### I. Service -- Rental Service (Uitleendienst)
The site offers a rental service for medical equipment. A Service schema could describe this offering.

#### J. Offer with Subscription -- Subscription Products
The site has a subscription model for incontinence products with delivery frequency options and 10% subscription discount. This could be represented with extended Offer properties.

---

## 6. Recommended JSON-LD Implementations

### 6.A -- Product Schema (Product Detail Pages)

Place in `<head>` of every product detail page. This is the highest-priority implementation.

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "MOBIO Opvouwbare Scooter ATTO",
  "description": "Elegante, comfortabele en opvouwbare scootmobiel. De Atto Scooter is een scootmobiel die gemakkelijk te plooien is. Door zijn korte draaicirkel kunt u zich zorgeloos verplaatsen in kleine ruimtes.",
  "image": [
    "https://images.cdn.europe-west1.gcp.commercetools.com/c49a479e-cca0-47ff-8b0a-c8b91d4e0c27/3567ee7915e44fd68ea1-YFiFkVtK.png"
  ],
  "sku": "0041514",
  "brand": {
    "@type": "Brand",
    "name": "Mobio"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://aanbod.goed.be/nl/product/mobio-opvouwbare-scooter-atto",
    "priceCurrency": "EUR",
    "price": "2695.00",
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/NewCondition",
    "seller": {
      "@type": "Organization",
      "name": "Goed thuiszorgwinkel"
    },
    "shippingDetails": {
      "@type": "OfferShippingDetails",
      "shippingDestination": {
        "@type": "DefinedRegion",
        "addressCountry": "BE"
      },
      "deliveryTime": {
        "@type": "ShippingDeliveryTime",
        "handlingTime": {
          "@type": "QuantitativeValue",
          "minValue": 0,
          "maxValue": 1,
          "unitCode": "DAY"
        },
        "transitTime": {
          "@type": "QuantitativeValue",
          "minValue": 1,
          "maxValue": 2,
          "unitCode": "DAY"
        }
      },
      "shippingRate": {
        "@type": "MonetaryAmount",
        "value": "0",
        "currency": "EUR"
      }
    }
  }
}
```

**Implementation notes:**
- `price` must be a numeric string without currency symbol or thousand separators. Convert "EUR 2.695,00" to "2695.00".
- `availability` should be dynamically set based on stock status. Use `https://schema.org/InStock`, `https://schema.org/OutOfStock`, or `https://schema.org/PreOrder` as appropriate.
- `shippingRate` of 0 applies for orders above EUR 40. For products under EUR 40, set the actual shipping cost.
- For products with CM member discount pricing, consider adding a second Offer with `priceSpecification` to represent the discounted price.
- All URLs must be absolute.

### 6.B -- BreadcrumbList (Product and Category Pages)

Place in `<head>` of every page with breadcrumb navigation.

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Startpagina",
      "item": "https://aanbod.goed.be/nl"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Producten",
      "item": "https://aanbod.goed.be/nl/producten"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Mobiliteit",
      "item": "https://aanbod.goed.be/nl/producten/mobiliteit"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Scootmobielen",
      "item": "https://aanbod.goed.be/nl/producten/mobiliteit/scootmobielen"
    },
    {
      "@type": "ListItem",
      "position": 5,
      "name": "MOBIO Opvouwbare Scooter ATTO"
    }
  ]
}
```

**Implementation notes:**
- The last item (current page) should omit the `item` URL property per Google's guidelines.
- Build dynamically from the existing breadcrumb component's data.
- Note: The existing HTML breadcrumbs use `/nl/products/mobiliteit` (English "products") while other links use `/nl/producten/mobiliteit`. Ensure consistency in the schema URLs.

### 6.C -- WebSite with SearchAction (Homepage)

Place in `<head>` of the homepage only.

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Goed thuiszorgwinkel",
  "alternateName": "Goed",
  "url": "https://aanbod.goed.be",
  "inLanguage": "nl-BE",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://aanbod.goed.be/nl/zoeken?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

**Implementation notes:**
- The `urlTemplate` must match the actual search results URL pattern. Verify the correct search URL by performing a search on the site. Common patterns for Next.js sites: `/nl/zoeken?q=`, `/nl/search?q=`, or `/nl/producten?q=`. Adjust accordingly.
- This enables the Google Sitelinks Search Box feature.

### 6.D -- Organization (Sitewide, in homepage or all pages)

Place in `<head>` of the homepage. Can also be included sitewide.

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Goed thuiszorgwinkel",
  "alternateName": "Goed",
  "url": "https://www.goed.be",
  "logo": "https://www.datocms-assets.com/136341/1743491777-cam-goed-1200x630-60b0e92b10a42.png",
  "description": "Goed thuiszorgwinkel is de hulpmiddelenspecialist van Vlaanderen. Hulpmiddelen voor mobiliteit, incontinentie, compressie en meer.",
  "parentOrganization": {
    "@type": "Organization",
    "name": "CM (Christelijke Mutualiteit)",
    "url": "https://www.cm.be"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+32-3-205-69-29",
    "contactType": "customer service",
    "availableLanguage": "Dutch",
    "hoursAvailable": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "17:30"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "13:00"
      }
    ]
  },
  "sameAs": [
    "https://www.facebook.com/Goedthuiszorgwinkel"
  ],
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "value": "35+"
  }
}
```

**Implementation notes:**
- Replace the `logo` URL with the actual Goed logo URL (the OG image may not be the correct logo).
- Add additional `sameAs` links for Instagram, LinkedIn, YouTube if they exist.
- The `url` should point to the main domain (www.goed.be), not the webshop subdomain.

### 6.E -- LocalBusiness (Individual Store Pages)

For each of the 35+ physical stores, if individual store pages exist:

```json
{
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "Goed thuiszorgwinkel Antwerpen",
  "image": "https://aanbod.goed.be/images/stores/antwerpen.jpg",
  "url": "https://aanbod.goed.be/nl/winkels/antwerpen",
  "@id": "https://aanbod.goed.be/nl/winkels/antwerpen#store",
  "telephone": "+32-3-XXX-XX-XX",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Straatnaam 123",
    "addressLocality": "Antwerpen",
    "postalCode": "2000",
    "addressRegion": "Antwerpen",
    "addressCountry": "BE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 51.2194,
    "longitude": 4.4025
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "09:00",
      "closes": "13:00"
    }
  ],
  "parentOrganization": {
    "@type": "Organization",
    "name": "Goed thuiszorgwinkel",
    "url": "https://www.goed.be"
  },
  "priceRange": "$$",
  "currenciesAccepted": "EUR",
  "paymentAccepted": "Cash, Credit Card, Bancontact"
}
```

**Implementation notes:**
- `MedicalBusiness` is appropriate given the healthcare/medical supplies nature of the business. Alternatively, `Store` with `additionalType` of `MedicalBusiness` can be used.
- Each store needs its own address, phone, coordinates, and opening hours.
- Ensure `geo` coordinates are accurate per store.
- This schema drives Google Maps / Local Pack visibility.

### 6.F -- ItemList (Category Pages)

Place in `<head>` of category listing pages.

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Elektrische scooters",
  "description": "Elektrische scooter kopen bij Goed thuiszorgwinkel.",
  "url": "https://aanbod.goed.be/nl/producten/mobiliteit/scootmobielen",
  "numberOfItems": 15,
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "url": "https://aanbod.goed.be/nl/product/scooter-lm-vivo"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "url": "https://aanbod.goed.be/nl/product/scooter-strider-st4"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "url": "https://aanbod.goed.be/nl/product/scooter-lm-presto"
    }
  ]
}
```

**Implementation notes:**
- Since category pages render products client-side, this JSON-LD must be rendered server-side in the initial HTML response. This is critical because it may be the only product data that search engine crawlers see.
- Each `ListItem` should include the `url` to the product detail page.
- Alternatively, embed full Product objects within each ListItem for richer data, but this increases page weight.
- Update `numberOfItems` and `itemListElement` dynamically based on the current product listing.

### 6.G -- Combined Homepage Script Block

For efficiency, combine WebSite and Organization on the homepage:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://aanbod.goed.be/#website",
      "name": "Goed thuiszorgwinkel",
      "alternateName": "Goed",
      "url": "https://aanbod.goed.be",
      "inLanguage": "nl-BE",
      "publisher": {
        "@id": "https://aanbod.goed.be/#organization"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://aanbod.goed.be/nl/zoeken?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "Organization",
      "@id": "https://aanbod.goed.be/#organization",
      "name": "Goed thuiszorgwinkel",
      "alternateName": "Goed",
      "url": "https://www.goed.be",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.goed.be/assets/images/goed-logo.svg",
        "width": 200,
        "height": 60
      },
      "description": "Goed thuiszorgwinkel is de hulpmiddelenspecialist van Vlaanderen.",
      "parentOrganization": {
        "@type": "Organization",
        "name": "CM (Christelijke Mutualiteit)",
        "url": "https://www.cm.be"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+32-3-205-69-29",
        "contactType": "customer service",
        "availableLanguage": "Dutch"
      },
      "sameAs": [
        "https://www.facebook.com/Goedthuiszorgwinkel"
      ]
    },
    {
      "@type": "WebPage",
      "@id": "https://aanbod.goed.be/nl#webpage",
      "name": "Welkom bij Goed thuiszorgwinkel",
      "url": "https://aanbod.goed.be/nl",
      "isPartOf": {
        "@id": "https://aanbod.goed.be/#website"
      },
      "about": {
        "@id": "https://aanbod.goed.be/#organization"
      },
      "inLanguage": "nl-BE"
    }
  ]
}
</script>
```

---

## 7. Implementation Priority Matrix

| Priority | Schema Type | Page(s) | Impact | Effort | Rich Result? |
|----------|------------|---------|--------|--------|-------------|
| **P0 -- Critical** | Product (JSON-LD) | Product detail pages | Very High | Medium | Yes -- Product snippets, Merchant listings |
| **P0 -- Critical** | BreadcrumbList | Product + category pages | High | Low | Yes -- Breadcrumb trails in SERP |
| **P1 -- High** | WebSite + SearchAction | Homepage | High | Low | Yes -- Sitelinks search box |
| **P1 -- High** | Organization | Homepage / sitewide | High | Low | Yes -- Knowledge panel signals |
| **P1 -- High** | Fix/remove existing Microdata | Product cards sitewide | Medium | Low | Fixes validation errors |
| **P2 -- Medium** | LocalBusiness/MedicalBusiness | Store pages | High | Medium-High | Yes -- Local Pack, Maps |
| **P2 -- Medium** | ItemList | Category pages | Medium | Medium | Indirect -- helps crawlability |
| **P2 -- Medium** | OfferShippingDetails | Product detail pages | Medium | Low | Yes -- Shipping info in snippets |
| **P3 -- Low** | FAQPage | Product pages with FAQ | Low-Medium | Low | Possible (healthcare exemption) + AI discoverability |
| **P3 -- Low** | Service | Rental service page | Low | Low | No direct rich result |

### Additional Recommendations

1. **Remove or replace existing Microdata.** The current product card Microdata is invalid (missing Offer wrapper, http:// instead of https://, missing required properties). Either fix it or remove it and rely entirely on JSON-LD. JSON-LD is preferred because it decouples structured data from HTML rendering.

2. **Server-side render product data on category pages.** Category pages currently load products via client-side JavaScript, meaning Googlebot may not see product listings. Even if Googlebot renders JavaScript, JSON-LD in the initial HTML is more reliable.

3. **Implement JSON-LD via Next.js `<Head>` component or `generateMetadata`.** Since the site uses Next.js, structured data should be added in the page component's metadata layer, ensuring it is present in the server-rendered HTML.

4. **Test all implementations** with:
   - Google Rich Results Test: https://search.google.com/test/rich-results
   - Schema.org Validator: https://validator.schema.org/
   - Google Search Console > Enhancements (after deployment)

5. **Monitor Merchant Center eligibility.** With proper Product + Offer schema, the site becomes eligible for free Google Shopping listings (Merchant Center) without a manual product feed -- Google can extract product data directly from structured data.

---

## Appendix: Pages Analyzed

| File | Corresponding URL |
|------|-------------------|
| `/root/homepage.html` | `https://aanbod.goed.be/nl` |
| `/root/page-home.html` | `https://aanbod.goed.be/nl` (duplicate fetch) |
| `/root/page-category.html` | `https://aanbod.goed.be/nl/producten/mobiliteit/scootmobielen` |
| `/root/category-hulpmiddelen.html` | `https://aanbod.goed.be/nl/producten` |
| `/root/category-scootmobielen.html` | `https://aanbod.goed.be/nl/producten/mobiliteit/scootmobielen` |
| `/root/page-product.html` | `https://aanbod.goed.be/nl/product/mobio-opvouwbare-scooter-atto` |
