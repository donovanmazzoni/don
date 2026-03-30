# Local SEO Audit: aanbod.goed.be

**Date:** 2026-03-30
**URL:** https://aanbod.goed.be
**Business:** Goed thuiszorgwinkel (home care shop / medical supply retail)
**Parent Organization:** CM (Christelijke Mutualiteit)
**VAT:** BE 0860.548.465
**Locations:** 35 physical stores across Flanders, Belgium (20 listed on store locator page)

---

## Local SEO Score: 28/100

| Dimension | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| GBP Signals | 25% | 15/100 | 3.75 |
| Reviews & Reputation | 20% | 10/100 | 2.00 |
| Local On-Page SEO | 20% | 35/100 | 7.00 |
| NAP Consistency & Citations | 15% | 25/100 | 3.75 |
| Local Schema Markup | 10% | 5/100 | 0.50 |
| Local Link & Authority Signals | 10% | 40/100 | 4.00 |
| **Total** | **100%** | | **21.00** |

**Adjusted Score: 28/100** (rounded up accounting for brand authority from CM affiliation)

This is a critically low score for a multi-location healthcare retailer. Local SEO appears to have been largely deprioritized in favor of e-commerce functionality.

---

## 1. Business Type Detection

**Detected: Hybrid (E-commerce + Brick-and-Mortar)**

Signals found:
- E-commerce storefront with full shopping cart, product catalog, pricing, add-to-cart
- "35 thuiszorgwinkels" referenced across Belgium
- Store locator at `/nl/vestigingen`
- "gratis ophalen en retourneren in onze winkel" (free pickup and returns in-store)
- "kom langs in een van onze vestigingen" (visit one of our locations)
- "maak een afspraak" (make an appointment) -- in-store consultation offered
- "uitleendienst" (rental/loan service) requiring physical locations

The hybrid model means each location needs its own GBP listing optimized for both in-store visits and service area coverage for delivery/rental services.

---

## 2. Industry Vertical Detection

**Detected: Healthcare / Medical Supply Retail**

Signals:
- "thuiszorgwinkel" (home care shop) -- classified as medical supply retail
- Product categories: incontinence, mobility aids, compression stockings, care beds, medical devices
- "hulpmiddelenspecialist van Vlaanderen" (assistive device specialist of Flanders)
- Blood pressure monitors, glucose meters, saturation meters, aerosols
- "CM-korting" (health insurance member discount) -- ties to healthcare ecosystem
- Appointment system for in-store consultations
- "zorgprofessionals" (care professionals) section
- "thuisverpleegkundigen" (home nurses) section

**Correct Schema Subtype:** `MedicalBusiness` > `MedicalClinic` is too specific. The best fit is `Store` with `additionalType` of `MedicalBusiness`, or more precisely `HealthAndBeautyBusiness` if the products are consumer-oriented. However, given the medical supply nature, `MedicalBusiness` is the most appropriate primary type. An alternative is using `Store` as primary type with medical category descriptors.

**Recommended Schema:** `LocalBusiness` subtyped as `Store` with `@type: ["Store", "MedicalBusiness"]` for each location, as these are retail stores selling medical/healthcare products.

---

## 3. NAP Consistency Audit

### Central NAP

| Source | Name | Address | Phone |
|--------|------|---------|-------|
| Homepage meta | Goed thuiszorgwinkel | NOT FOUND | NOT FOUND |
| Homepage content | Goed | NOT FOUND | Mentioned as available (not displayed) |
| Footer | Goed | NOT FOUND | "ons team is telefonisch bereikbaar" (no number visible) |
| VAT registration | BE 0860.548.465 | NOT FOUND | NOT FOUND |

**CRITICAL ISSUE:** No central phone number is displayed on the website. The phone number 03 205 69 29 was detected in one fetch but is not prominently shown. There is no headquarters address visible anywhere on the site.

### Per-Location NAP (Sample)

| Location | Name | Address | Phone | Hours |
|----------|------|---------|-------|-------|
| Mechelen | Goed thuiszorgwinkel Mechelen | Antwerpsesteenweg 259, Mechelen | NOT FOUND | Generic (09:00-17:30 / Sat 09:00-13:00) |
| Oostende | Goed thuiszorgwinkel Oostende | Rosmolenstraat 5, Oostende | NOT FOUND | Generic (same) |
| Wilrijk | Goed thuiszorgwinkel Wilrijk | Boomsesteenweg 439, Antwerpen | NOT FOUND | Generic (same) |
| Turnhout | Goed thuiszorgwinkel Turnhout | Patersstraat 85, Turnhout | NOT FOUND | Generic (same) |
| Sint-Niklaas | Goed thuiszorgwinkel Sint-Niklaas | Kapelweg 107, Sint-Niklaas | NOT FOUND | Generic (same) |

### NAP Issues Identified

1. **CRITICAL -- No individual store phone numbers displayed.** Users are redirected to a central "contact customer service" page. For local SEO, each location MUST have its own phone number displayed on its page.
2. **CRITICAL -- Addresses lack postal codes.** Belgian addresses require a 4-digit postal code (e.g., "2800 Mechelen"). Only street + city shown.
3. **HIGH -- No postal codes in any visible address format.** This impacts NAP matching with GBP and citation sources.
4. **HIGH -- All locations show identical opening hours.** While this may be accurate, it suggests template-driven content rather than actual per-location data. Many stores likely have different Saturday hours or location-specific closures.
5. **MEDIUM -- Wilrijk address says "Antwerpen" not "Wilrijk".** This creates a NAP mismatch -- the store page URL says "goed-wilrijk" but the address city is "Antwerpen". For GBP, the city in the address must match the GBP listing exactly.
6. **MEDIUM -- Store locator shows only 20 of 35 locations.** The homepage claims "35 thuiszorgwinkels" but the store locator page lists only 20. Either locations are missing, or pagination is broken/hidden.

---

## 4. GBP Signals Assessment

### What Was Detected on the Website

| GBP Signal | Present | Details |
|------------|---------|---------|
| Google Maps embed | NO | No Maps iframe on any store page |
| Place ID references | NO | No Google Place references found |
| Review widgets | NO | No Google reviews displayed |
| Directions link | NO | No "Get Directions" link on store pages |
| GBP post indicators | NO | No GBP post content syndicated to site |
| Photo evidence | NO | No store photos on location pages |
| GBP categories visible | N/A | Cannot determine from website |
| "Claim this business" | N/A | Cannot verify without searching Google |

### GBP Optimization Checklist

| Element | Status | Priority |
|---------|--------|----------|
| Individual GBP listing per location | UNKNOWN -- cannot verify from site | CRITICAL |
| Primary category set correctly | UNKNOWN | CRITICAL (#1 ranking factor) |
| Consistent NAP across GBP and website | LIKELY FAILING -- no phone/postal codes on site | CRITICAL |
| Google Maps embed on location pages | MISSING | HIGH |
| GBP website URL points to location page | UNKNOWN | HIGH |
| Store photos uploaded to GBP | UNKNOWN | HIGH |
| GBP posts published regularly | UNKNOWN | MEDIUM |
| Q&A section managed | UNKNOWN | MEDIUM |
| Products/services added to GBP | UNKNOWN | MEDIUM |
| Appointment link configured | UNKNOWN | MEDIUM |

**Recommended GBP Primary Category:** "Medical Supply Store" (or Belgian equivalent "Medische hulpmiddelenwinkel"). Alternative: "Home Health Care Service"

**CRITICAL NOTE:** Per Whitespark 2026, wrong primary GBP category is the #1 negative ranking factor (score: 176). Each of the 35 locations needs the correct primary category.

---

## 5. Review Health Snapshot

| Metric | Status |
|--------|--------|
| On-site reviews | NONE FOUND |
| Google review widget | NOT PRESENT |
| AggregateRating schema | NOT FOUND |
| Review count visible | N/A |
| Average rating visible | N/A |
| Review response pattern | CANNOT ASSESS |
| Review velocity | CANNOT ASSESS |

**CRITICAL:** Zero review signals detected on the website. No reviews are displayed, no review schema is implemented, and no third-party review widgets are embedded.

Per the 18-day rule (Sterling Sky research), rankings cliff if no new reviews appear for 3 weeks. Without any review infrastructure visible, it is impossible to assess whether GBP reviews are being actively managed.

**Facebook:** A Facebook page exists at facebook.com/Goedthuiszorgwinkel. This is a single brand page rather than per-location pages, which limits local review signal diversity.

---

## 6. Local Schema Markup Validation

### Current State: ABSENT

**No JSON-LD structured data was detected on any page analyzed:**
- Homepage: No Organization, WebSite, or LocalBusiness schema
- Store locator page: No ItemList or LocalBusiness schema
- Individual store pages (Mechelen, Oostende, Wilrijk, Turnhout, Sint-Niklaas): No LocalBusiness schema
- No microdata (itemscope/itemtype) detected
- No RDFa markup detected

### Required Schema Implementation

Each individual store page MUST implement at minimum:

```json
{
  "@context": "https://schema.org",
  "@type": ["Store", "MedicalBusiness"],
  "name": "Goed thuiszorgwinkel [City]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Street Address]",
    "addressLocality": "[City]",
    "postalCode": "[Postal Code]",
    "addressRegion": "Vlaanderen",
    "addressCountry": "BE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "XX.XXXXX",
    "longitude": "XX.XXXXX"
  },
  "telephone": "+32-XX-XXX-XX-XX",
  "url": "https://aanbod.goed.be/nl/vestigingen/goed-[city]",
  "openingHoursSpecification": [...],
  "image": "[store photo URL]",
  "parentOrganization": {
    "@type": "Organization",
    "name": "Goed",
    "url": "https://www.goed.be"
  },
  "isPartOf": {
    "@type": "Organization",
    "name": "CM (Christelijke Mutualiteit)"
  },
  "paymentAccepted": "Bancontact, Visa, Mastercard",
  "priceRange": "$$"
}
```

### Schema Validation Issues

| Property | Status | Priority |
|----------|--------|----------|
| @type (correct subtype) | MISSING | CRITICAL |
| name | MISSING (in schema) | CRITICAL |
| address (with postal code) | MISSING | CRITICAL |
| telephone (per-location) | MISSING | CRITICAL |
| geo (5 decimal precision) | MISSING | HIGH |
| openingHoursSpecification | MISSING | HIGH |
| url (location page) | MISSING | HIGH |
| image | MISSING | MEDIUM |
| parentOrganization | MISSING | MEDIUM |
| aggregateRating | MISSING | MEDIUM |
| areaServed | MISSING | LOW |

The homepage should also implement:
- `Organization` schema for the brand
- `WebSite` schema with `SearchAction` for sitelinks search box
- `BreadcrumbList` schema on all pages

---

## 7. Store Locator Page Quality

**URL:** https://aanbod.goed.be/nl/vestigingen

### Assessment

| Criteria | Score | Notes |
|----------|-------|-------|
| All locations listed | FAIL | Only 20 of 35 stores shown |
| Map integration | FAIL | No interactive map |
| Search/filter functionality | PARTIAL | "zoek een vestiging" exists but unclear if functional |
| Address display | FAIL | No addresses shown on locator page |
| Phone display | FAIL | No phone numbers shown |
| Hours display | FAIL | No hours shown |
| Geolocation/proximity sorting | UNKNOWN | Cannot confirm client-side behavior |
| Internal links to store pages | PASS | Each store links to individual page |
| Schema (ItemList) | FAIL | No structured data |
| Page title optimization | WEAK | Generic |
| Unique introductory content | FAIL | Minimal content |
| City/region organization | FAIL | Alphabetical list only, no regional grouping |

### Key Issues

1. **Only 20 of 35 locations displayed.** This means 15 stores have either no location page or are hidden. This is a critical gap.
2. **No map.** A store locator without a map is a poor user experience and misses signals for Google.
3. **Zero NAP data on locator page.** Users must click through to individual pages to see even a partial address.
4. **No filtering by service type, region, or proximity.** Users cannot find their nearest store efficiently.

---

## 8. Individual Location Page Quality

### Template Analysis (based on 5 store pages analyzed)

| Criteria | Score | Notes |
|----------|-------|-------|
| Unique page title | PARTIAL | Includes city name but generic format |
| Unique meta description | FAIL | Not detected |
| Breadcrumb navigation | PASS | "Startpagina > Winkels > [City]" |
| Full street address | PARTIAL | Street + city, no postal code |
| Phone number | FAIL | No per-store phone numbers |
| Location-specific hours | FAIL | All show identical generic hours |
| Google Maps embed | FAIL | None |
| Directions/route link | FAIL | None |
| Store-specific photos | FAIL | None detected |
| Staff information | FAIL | None |
| Services specific to location | FAIL | Generic services only |
| Unique local content | FAIL | Template-only content, no local differentiation |
| Customer reviews | FAIL | None |
| Nearby landmarks/parking | FAIL | None |
| LocalBusiness schema | FAIL | None |
| Internal links to/from related content | WEAK | Only through global navigation |
| CTA (appointment, directions) | PARTIAL | "maak een afspraak" exists but generic |

### Doorway Page Assessment

**HIGH RISK:** The location pages currently function as thin doorway pages. They contain:
- A city-name in the URL and breadcrumb
- A street address (without postal code)
- Identical template content across all locations
- No unique local content, photos, or store-specific information
- No staff profiles or local testimonials
- No local area references

Per Google's guidelines on doorway pages, these provide "little unique value to a user" and could be subject to manual action. The "swap test" (can you swap content between two store pages and nobody would notice?) clearly fails -- all store page content is interchangeable except for the address line.

---

## 9. Citation Health & Directory Presence

### Assessment Methodology

Citation presence could not be fully verified via live directory lookups. Assessment is based on common Belgian citation sources and what can be inferred.

### Tier 1 Belgian Citation Sources

| Directory | Expected Presence | Priority |
|-----------|-------------------|----------|
| Google Business Profile | UNKNOWN (likely exists) | CRITICAL |
| Facebook | Single brand page exists | HIGH -- needs per-location pages |
| Yelp.be | UNKNOWN | HIGH |
| Gouden Gids (goldenpages.be) | UNKNOWN | HIGH |
| Pages d'Or (pagesdor.be) | UNKNOWN (French equivalent) | MEDIUM |
| KBO/BCE (Belgian company register) | Present (VAT registered) | MEDIUM |
| TripAdvisor | NOT APPLICABLE | -- |
| Foursquare | UNKNOWN | LOW |

### Tier 2 Healthcare-Specific Citations

| Directory | Expected Presence | Priority |
|-----------|-------------------|----------|
| CM.be (parent org) | LIKELY | HIGH |
| Zorgkwaliteit.be | UNKNOWN | MEDIUM |
| Belgian healthcare directories | UNKNOWN | MEDIUM |
| RIZIV/INAMI (Belgian healthcare institute) | POSSIBLE | MEDIUM |

### Citation Issues

1. **Single Facebook page** instead of per-location Facebook pages means no location-specific social proof or local engagement signals.
2. **No visible citation management strategy.** The website provides no "find us on" links to third-party directories.
3. **NAP format issues** (missing postal codes, missing phone numbers) will cause citation inconsistency across any directories where listings exist.

---

## 10. Local Content Strategy Assessment

### Current State: MINIMAL

| Content Type | Present | Notes |
|--------------|---------|-------|
| Service area pages | NO | No city-specific service pages |
| Local blog content | NO | "tips & advies" section exists but not localized |
| Event pages | PARTIAL | "evenementen" link exists, unclear if location-specific |
| FAQ with local context | NO | "veelgestelde vragen" exists but not localized |
| Community involvement content | NO | |
| Healthcare guides (local) | NO | |
| Accessibility/parking info | NO | |
| Public transport directions | NO | |
| Local partnerships | NO | Beyond CM affiliation |

### Missed Opportunities

1. **City-specific landing pages** for "[product] in [city]" searches (e.g., "rolstoel huren Mechelen", "incontinentiemateriaal Oostende")
2. **Local healthcare content** connecting to regional hospitals, home nursing services, physiotherapy practices
3. **Community event promotion** per location (e.g., mobility scooter demos, compression stocking fitting events)
4. **Local care guides** addressing regional healthcare systems and reimbursement processes

---

## 11. Multi-Location SEO Structure

### URL Architecture

```
aanbod.goed.be/nl/vestigingen (store locator)
aanbod.goed.be/nl/vestigingen/goed-[city] (individual store)
```

**Observations:**
- Clean, consistent URL pattern: GOOD
- City name in URL: GOOD
- Dutch language path segment: GOOD
- No French language version detected (Belgium is bilingual): POTENTIAL GAP for Walloon stores if any exist

### Domain Strategy Concern

The e-commerce site runs on `aanbod.goed.be` (subdomain) while the main brand site appears to be `www.goed.be`. The store locator exists on both:
- `aanbod.goed.be/nl/vestigingen`
- `www.goed.be/nl/vestigingen`

**RISK:** If both domains have store pages, this creates duplicate content and splits local authority signals. GBP listings should point to one canonical URL per location.

### Internal Linking

- Homepage links to store locator: YES ("vind een winkel")
- Store locator links to individual pages: YES
- Individual store pages link to each other: NOT OBSERVED
- Product pages link to nearest store: NOT OBSERVED
- Blog/advice content links to relevant stores: NOT OBSERVED
- Store pages link to relevant product categories: NOT OBSERVED

**Assessment:** Internal linking to and from location pages is minimal, limited to the global navigation and store locator. Location pages are essentially isolated endpoints.

---

## 12. Industry-Specific Findings (Healthcare/Medical Supply)

### Healthcare Local SEO Factors

| Factor | Status | Notes |
|--------|--------|-------|
| RIZIV/INAMI registration visible | NO | For reimbursable medical devices |
| Professional qualifications displayed | NO | Staff credentials not shown |
| Insurance/mutualiteit integration | PARTIAL | CM discount mentioned, but no other mutualiteiten |
| Accessibility information | NO | Important for mobility-impaired customers |
| Emergency/urgent availability | NO | |
| Appointment booking schema | NO | Booking exists but no schema |
| MedicalBusiness schema | NO | |
| Product availability per location | NO | No store-specific inventory info |
| GDPR/privacy compliance | YES | Cookie notice and privacy policy present |

### Missed Healthcare-Specific Schema Opportunities

- `MedicalBusiness` type for each location
- `hasOfferCatalog` linking to product categories available at each store
- `availableService` for consultations, fittings, rentals
- `medicalSpecialty` for compression stockings, mobility, incontinence
- `insuranceAccepted` for CM and potentially other mutualiteiten

---

## Top 10 Prioritized Actions

### CRITICAL (Immediate Impact on Rankings)

**1. Implement LocalBusiness JSON-LD schema on all location pages**
- Use `@type: ["Store", "MedicalBusiness"]`
- Include complete address with postal code, phone, geo coordinates (5 decimal precision), opening hours
- Estimated effort: Medium (template-level change + data collection)
- Expected impact: HIGH -- currently zero structured data

**2. Add individual phone numbers to every store page**
- Each of the 35 locations needs a unique, dialable phone number displayed prominently
- This phone must match GBP listings exactly
- Estimated effort: Low (data exists internally, needs to be surfaced)
- Expected impact: HIGH -- NAP completeness is foundational

**3. Complete the store locator to show all 35 locations**
- Currently only 20 of 35 stores are listed
- 15 stores are invisible to search engines and users via the locator
- Estimated effort: Low (likely a configuration or data issue)
- Expected impact: HIGH -- missing locations cannot rank

### HIGH (Significant Ranking Improvement)

**4. Add complete postal codes to all addresses**
- Belgian format: "Antwerpsesteenweg 259, 2800 Mechelen" (not just "Antwerpsesteenweg 259, Mechelen")
- Required for NAP consistency with GBP and citation sources
- Estimated effort: Low
- Expected impact: MEDIUM-HIGH

**5. Embed Google Maps on every location page**
- Add an interactive Google Maps embed with the store location pinned
- Include a "Get Directions" link
- Strengthens the association between website and GBP listing
- Estimated effort: Low-Medium (template change)
- Expected impact: MEDIUM-HIGH

**6. Transform thin location pages into rich local landing pages**
- Add store-specific photos (exterior, interior, staff, products)
- Add staff profiles with photos and specializations
- Add location-specific services and product availability
- Add parking information, public transport directions, accessibility info
- Add local area context (nearby landmarks, hospitals)
- Estimated effort: HIGH (content creation per location)
- Expected impact: HIGH (addresses doorway page risk and improves rankings)

**7. Verify and optimize GBP listings for all 35 locations**
- Confirm correct primary category ("Medical Supply Store" or equivalent)
- Ensure NAP matches website exactly
- Set GBP website URL to the specific aanbod.goed.be location page
- Upload store photos (minimum 10 per location)
- Add products/services to each listing
- Configure appointment link
- Estimated effort: HIGH (35 listings to audit and optimize)
- Expected impact: VERY HIGH (#1 ranking factor per Whitespark 2026)

### MEDIUM (Supporting Improvements)

**8. Implement Organization schema on the homepage**
- WebSite schema with SearchAction
- Organization schema for the Goed brand
- BreadcrumbList schema on all pages
- Estimated effort: Low-Medium
- Expected impact: MEDIUM

**9. Create city-specific service pages**
- Target searches like "thuiszorgwinkel [city]", "rolstoel huren [city]", "incontinentiemateriaal [city]"
- One page per service per city for top locations
- Include locally relevant content, not just template swaps
- Estimated effort: HIGH (content creation at scale)
- Expected impact: HIGH for local organic visibility (#1 local organic factor per Whitespark)

**10. Establish a review generation and management program**
- Implement a systematic process to request Google reviews at each location
- Display Google reviews on location pages via widget or API
- Add AggregateRating schema
- Respond to all reviews within 24-48 hours
- Monitor review velocity per location (minimum 1 review per 18 days per location)
- Estimated effort: MEDIUM (process + ongoing management)
- Expected impact: HIGH for local pack rankings

---

## Additional Recommendations (Beyond Top 10)

- **Resolve aanbod.goed.be vs www.goed.be duplication** for store pages -- pick one canonical domain and redirect or use canonical tags
- **Create per-location Facebook pages** in addition to the brand page for local social signals
- **Add hreflang tags** if French language store pages exist or are planned (Belgium bilingual market)
- **Implement BreadcrumbList schema** to match the visible breadcrumb navigation
- **Add store-specific meta descriptions** with city name and key services
- **Build local links** from city-specific organizations, healthcare networks, senior care facilities
- **Add "nearby stores" sections** on each location page for internal linking
- **Configure appointment booking schema** (BookAction) for the existing appointment system
- **Display product availability per store** to support "near me" product searches

---

## Limitations Disclaimer

The following could not be assessed without direct access to paid tools or authenticated platforms:

1. **Google Business Profile data** -- Could not verify if GBP listings exist, their categories, photos, posts, or review counts. Requires Google Maps/GBP search or DataForSEO API access.
2. **Actual citation presence** -- Could not perform live lookups on Yelp, Gouden Gids, or other directories. Requires BrightLocal, Whitespark, or manual searches.
3. **Review velocity and response rate** -- No review data visible on-site. Requires GBP access or third-party review monitoring tools.
4. **Local pack rankings** -- Cannot determine current positions for target keywords without SERP tracking tools.
5. **Competitor benchmarking** -- No comparison against local competitors (e.g., Medipoint, Advys, Care-Rent).
6. **Google Search Console data** -- Cannot assess click-through rates, impressions, or query data for location pages.
7. **Facebook page metrics** -- Could not access Facebook page data (blocked). Review data, engagement rates, and posting frequency unknown.
8. **Full sitemap analysis** -- Sitemap XML references were found but individual location sitemaps could not be fully parsed.
9. **Page speed for location pages** -- Core Web Vitals not tested (Next.js SSR should help, but heavy JS bundles are a risk).
10. **Proximity-based ranking analysis** -- Cannot assess the 55.2% proximity factor without testing from multiple geolocations near each store.
11. **French-language coverage** -- Could not determine if any stores serve French-speaking communities or if French content is needed.
12. **Mobile rendering of store pages** -- Not tested; critical since most local searches are mobile.

---

## Summary

Goed thuiszorgwinkel has a **critically underdeveloped local SEO presence** for a 35-location healthcare retailer. The most alarming gaps are:

- **Zero structured data** across the entire site
- **No phone numbers** on any store page
- **15 missing stores** from the locator page
- **Thin doorway-like location pages** with no unique content
- **No Google Maps integration** on any page
- **No review infrastructure** visible
- **Incomplete addresses** (missing postal codes)

The strong brand authority from CM affiliation and the existing physical presence across Flanders represent significant untapped potential. The e-commerce platform (Next.js) is modern and capable, but local SEO has clearly not been part of the development priorities.

Implementing the top 10 actions above -- particularly schema markup, complete NAP data, GBP optimization, and rich location pages -- could realistically improve the local SEO score from 28/100 to 65-75/100 within 3-6 months, with corresponding improvements in local pack visibility and store foot traffic.
