# Content Quality & E-E-A-T Analysis: aanbod.goed.be

**Date:** 2026-03-30
**Site:** https://aanbod.goed.be
**Language:** Dutch (nl-BE)
**Type:** E-commerce / Healthcare (thuiszorg) retailer
**Parent organization:** CM (Christelijke Mutualiteit)

---

## Executive Summary

| Metric | Score |
|--------|-------|
| **Overall Content Quality Score** | **48/100** |
| **E-E-A-T Composite Score** | **55/100** |
| **AI Citation Readiness** | **32/100** |
| **Content Depth** | **35/100** |
| **Readability** | **62/100** |

Aanbod.goed.be has strong institutional backing from CM (Christelijke Mutualiteit) and a solid e-commerce infrastructure, but the site severely underperforms on content depth across all page types. The homepage, category pages, and product pages all fall below recommended word count minimums. There is a near-total absence of informational content (tips/advice section returns a 404), no structured data on most pages, and minimal E-E-A-T signals beyond brand association. The site reads as a functional product catalog rather than an authoritative healthcare resource.

---

## Page-by-Page Analysis

---

### 1. Homepage: https://aanbod.goed.be

**Page title:** "Welkom bij Goed thuiszorgwinkel"
**Meta description:** "Goed thuiszorgwinkel is de hulpmiddelenspecialist van Vlaanderen. Ben je op zoek naar een hulpmiddel? Bekijk dan zeker ons assortiment."

#### Content Metrics

| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| Word count (body text) | ~475 | 500+ | BELOW MINIMUM |
| Unique content words (excl. nav/footer) | ~200 est. | -- | CRITICALLY LOW |
| H1 count | 1 | 1 | OK |
| H2 count | 4 | 3-6 | OK |
| H3 count | 27 | -- | EXCESSIVE (product names) |
| Internal links | 156 | -- | GOOD volume |
| Structured data (JSON-LD) | 0 | 1+ (Organization, WebSite) | MISSING |
| Canonical tag | MISSING | Present | ISSUE |

#### H1 Analysis

The H1 is "kom onze scooters gratis uittesten" -- a promotional/campaign H1 rather than a descriptive, keyword-rich heading. This is a rotating hero banner H1, meaning it changes with campaigns, which creates inconsistency for crawlers and makes the homepage's primary topic signal unclear.

**Recommendation:** Use a stable, descriptive H1 such as "Goed thuiszorgwinkel - Hulpmiddelen & thuiszorgproducten online" and move promotional messaging to H2 or visual banners without heading tags.

#### Heading Hierarchy Issues

- H1 skips to H3 directly (no H2 before product listings in hero)
- 27 H3 tags are product names -- these should not be heading tags in the HTML but rather use product card markup
- Heading hierarchy: H1 > H3 (skip) > H2 > H3 > H2 > H3 -- broken nesting

#### Content Depth Assessment

The homepage content is almost entirely navigational and product listing. The only substantive editorial content block is the "waarom kopen bij goed" section, which contains approximately 6 short bullet-style value propositions:
- Tot 30% korting voor CM-leden
- Thuiszorgwinkel in je buurt (35 winkels)
- Advies op maat
- Aanbod huurartikelen
- Keuzehulp voor incontinentiemateriaal
- Abonnement op incontinentiemateriaal

This amounts to roughly 80-100 words of unique editorial content. The rest is product names, prices, and navigation.

#### Content Freshness

- Copyright shows "2026" -- current
- No date stamps, blog links, or news sections visible
- No "last updated" signals

#### Content Quality Score: 38/100

---

### 2. Category Page: Mobiliteit

**URL:** https://aanbod.goed.be/nl/producten/mobiliteit
**Page title:** "Mobiliteitshulpmiddelen online kopen | Goed thuiszorgwinkel"
**Meta description:** "Ontdek alle mobiliteitshulpmiddelen bij Goed Thuiszorgwinkel. Besteld voor 15u, binnen 2 werkdagen geleverd. CM - Voordeel. Gratis verzending vanaf euro 40."

#### Content Metrics

| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| Word count (body text) | ~522 | 800+ (category) | BELOW MINIMUM |
| Unique editorial content | ~60 words | 300+ | CRITICALLY LOW |
| H1 count | 1 ("mobiliteit") | 1 | OK but GENERIC |
| H2 count | 1 | 3-5 | TOO FEW |
| H3 count (product names) | 25 | -- | Product-as-heading issue |
| Subcategory links | 9 | -- | GOOD |
| Filter facets | 15+ | -- | GOOD for UX |
| Pagination | 17 pages | -- | Large catalog |
| Structured data | 0 | ItemList recommended | MISSING |
| Canonical tag | MISSING | Present | ISSUE |

#### Editorial Content

The only unique editorial paragraph is at the bottom of the page:

> "Ontdek hoogwaardige mobiliteitshulpmiddelen die de vrijheid vergroten en het dagelijks leven vereenvoudigen. Bij ons vind je een uitgebreid assortiment aan mobiliteitsoplossingen, ontworpen om aan diverse behoeften te voldoen. Of je nu op zoek bent naar rollators, rolstoelen of elektrische scooters, wij bieden duurzame en betrouwbare opties. Bekijk zeker ook onze blogs over zelfstandig wonen."

This is approximately 50 words of generic, boilerplate text. It mentions "blogs over zelfstandig wonen" but does not link to any specific blog content. The text reads like AI-generated filler: generic phrasing, no specificity, no original insight.

#### Thin Content Indicators

- **SEVERE:** Category page has effectively no informational content
- No buying guide content ("hoe kies je de juiste rollator?")
- No expert advice snippets
- No FAQ section
- No comparison information between subcategories
- Filter facets are comprehensive but contribute no indexable text value

#### Internal Linking

- Good subcategory linking (9 subcategories with product counts)
- Link to mobility specialist appointment on goed.be (cross-domain)
- Missing: links to tips/advice content, buying guides, related categories

#### Content Quality Score: 32/100

---

### 3. Category Page: Incontinentie en Stoma

**URL:** https://aanbod.goed.be/nl/producten/incontinentie-en-stoma
**Page title:** "Incontinentiemateriaal online kopen | Goed thuiszorgwinkel | Goed thuiszorgwinkel"
**Meta description:** "Elk incontinentiemateriaal online bestellen bij Goed Thuiszorgwinkel. Besteld voor 15u, binnen 2 werkdagen geleverd. CM - Voordeel. Gratis verzending vanaf euro 40."

#### Content Metrics

| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| Word count (body text) | ~884 | 800+ (category) | MEETS MINIMUM |
| Unique editorial content | ~350 words | 300+ | MEETS MINIMUM |
| H1 count | 1 | 1 | OK |
| H2 count | 2 | 3-5 | LOW |
| H3 count (editorial) | 6 | -- | GOOD structure |
| Subcategory links | 9 | -- | GOOD |
| Structured data | 0 | ItemList recommended | MISSING |
| Canonical tag | MISSING | Present | ISSUE |

#### Title Tag Issue

**CRITICAL:** The title tag contains a duplicate brand suffix: "Incontinentiemateriaal online kopen | Goed thuiszorgwinkel | Goed thuiszorgwinkel" -- the brand name appears twice, wasting valuable title real estate.

#### Editorial Content Analysis

This is the strongest category page found. It includes bottom-of-page editorial content covering:
1. **Incontinentie en stoma: discreet comfort en betrouwbare zorgproducten** (general intro)
2. **Incontinentie bij mannen** (targeted segment)
3. **Incontinentie bij vrouwen** (targeted segment)
4. **Luiers en absorberende producten** (product type)
5. **Stoma verzorging en opvangsystemen** (product type)
6. **Waarom kiezen voor Goed thuiszorgwinkel?** (trust/value props)

The editorial text is reasonably well-structured with keyword integration (incontinentie bij mannen, incontinentie bij vrouwen, inlegverbanden, stoma verzorging). However:

- All headings are H3 -- they should be H2 for proper hierarchy
- Content reads as SEO-optimized text rather than genuinely helpful information
- No specific product recommendations within the editorial text
- No statistics, medical references, or expert citations
- Mentions "incontinentiespecialisten" but does not name or credential them

#### AI Content Markers

The editorial text shows signs of template-based or AI-assisted generation:
- Generic transitional phrases ("Ontdek het gemak", "Kies voor huidvriendelijke producten")
- No specific data points, studies, or unique insights
- Repetitive sentence structure across subsections
- Pattern: [Segment intro] + [product types] + [benefit statement]

**Risk level:** Moderate. The content is not harmful but lacks the specificity and expert voice expected for healthcare-adjacent topics (YMYL territory).

#### Standout Features

- **Keuzehulp (product selector tool):** Linked from the page, this interactive tool ("test: welk product past bij mij?") is a genuine E-E-A-T differentiator
- **Specialist appointment booking:** Links to incontinentie specialist appointments
- **Comprehensive filtering:** Gender, usage type, absorbency level filters show domain expertise

#### Content Quality Score: 55/100

---

### 4. Product Page: VERMEIREN Plooibare transportstoel Bobby Evo/42

**URL:** https://aanbod.goed.be/nl/product/vermeiren-plooibare-transportstoel-bobby-evo42
**Page title:** "VERMEIREN Plooibare transportstoel Bobby Evo/42 | Goed thuiszorgwinkel"
**Meta description:** "VERMEIREN Plooibare transportstoel Bobby Evo/42. Besteld voor 15u, binnen 2 werkdagen geleverd. CM - Korting. Gratis verzending vanaf euro 40."

#### Content Metrics

| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| Word count (body text) | ~356 | 300+ (simple product) / 400+ (complex) | BORDERLINE |
| Unique product description | ~80 words | 150+ | LOW |
| H1 count | 1 | 1 | OK |
| H2 count | 5 | 3-5 | GOOD |
| Images | 5 product images | 3+ | GOOD |
| Image alt text | Present, descriptive | -- | GOOD |
| Structured data | 2 (Product, ShippingDetails) | Product required | GOOD |
| Price displayed | Yes (euro 434,54 / euro 334,00 with discount) | -- | GOOD |
| Availability status | "beschikbaar voor levering" | -- | GOOD |
| Delivery estimate | "Nu besteld, ten laatste 1 april geleverd" | -- | GOOD |
| Cross-sells | 1 ("gelijkaardige producten") | 3+ | LOW |

#### Heading Structure

Good hierarchy for a product page:
```
H1: VERMEIREN Plooibare transportstoel Bobby Evo/42
  H2: beschikbaar voor levering
  H2: algemene kenmerken
  H2: productspecificaties
  H2: documenten
  H2: gelijkaardige producten
    H3: VERMEIREN Plooibare transportstoel Bobby Evo/48
  H2: hulp nodig bij je aankoop?
```

#### Product Description Assessment

The product description is minimal:

> "Bobby EVO is de ideale compacte en vouwbare transferstoel. Licht en makkelijk op te vouwen in enkele seconden. Op vakantie, in de luchthaven of in het ziekenhuis: verplaatsing van punt A naar B is makkelijk met de Bobby EVO."

This is followed by bullet-point features and specifications. While functional, it lacks:
- Use cases / scenario descriptions
- Comparison to alternatives
- Who this product is best suited for
- Care/maintenance information
- User reviews or testimonials
- Video content or usage demonstration links

#### Structured Data Quality

Product schema is present and includes:
- Product name, image, brand, SKU
- Offer with price, currency, availability, condition
- Shipping details

**Missing from schema:**
- `description` property
- `aggregateRating` / `review` (no reviews system at all)
- `gtin` / `mpn` for unique product identification
- `priceValidUntil` shows "2025-12-31" which is EXPIRED (current date is 2026-03-30)

#### Trust Signals on Product Page

- Brand attribution (Vermeiren)
- SKU number (0074871)
- CM discount transparency
- Expert assistance CTA ("maak een afspraak met een mobiliteitsverstrekker")
- 34 physical stores mentioned
- "(para)medisch geschoolde medewerkers" mentioned
- Document download (Brochure Bobby Evo)
- Payment method logos in footer

**Missing:**
- Customer reviews
- Return policy details on page
- Warranty information
- Reimbursement/RIZIV information (relevant for Belgian healthcare products)

#### Content Quality Score: 52/100

---

### 5. Product Page: Wandelstok 4-delig (vrouw)

**URL:** https://aanbod.goed.be/nl/product/wandelstok-4-delig-vrouw
**Page title:** "Wandelstok 4-delig (vrouw) | Goed thuiszorgwinkel"

#### Content Metrics

| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| Word count | ~315 | 300+ (simple product) | MEETS MINIMUM |
| Unique product description | ~35 words | 100+ | VERY LOW |
| Cross-sells ("vaak samen gekocht") | 4 items | 3+ | GOOD |
| Similar products | 2 items | 3+ | ACCEPTABLE |
| Structured data | 2 (Product, Shipping) | -- | GOOD |
| Breadcrumb depth | 5 levels | -- | EXCELLENT |

#### Description Quality

The entire product description is:

> "Verstelbare opvouwbare wandelstok voor vrouwen, in 4 delen. Gemaakt in bronskleurig aluminium met esdoorn handvat."

For a simpler product this is understandable, but it still lacks:
- Who benefits from this product
- How it compares to other wandelstokken
- Usage tips
- How to choose the right height

#### Structured Data Issue

- `priceValidUntil: "2025-12-31"` -- **EXPIRED**, same issue as other product page

#### Content Quality Score: 45/100

---

### 6. Tips & Advies Page: https://aanbod.goed.be/nl/tips-en-advies

#### Status: 404 / NOT FOUND

The page returns a soft 404 with the H1 "oeps..." and body text "pagina niet gevonden." The page title incorrectly shows "Welkom bij Goed thuiszorgwinkel" (the homepage title) rather than a proper 404 title.

#### Impact Assessment

This is a **critical content gap**. The navigation header shows "tips & advies" as a menu item, linking to a page that does not exist. This means:

1. **Broken user journey:** Users clicking "tips & advies" hit a dead end
2. **Crawl waste:** Googlebot follows this link from every page (it is in the global nav) and finds a soft 404
3. **Missing E-E-A-T opportunity:** A tips/advice section would be the primary vehicle for demonstrating Experience and Expertise
4. **No informational content layer:** The site has zero editorial/advice content, making it purely transactional

**The 404 page itself has issues:**
- Title tag shows homepage title (should be "Pagina niet gevonden | Goed thuiszorgwinkel")
- Meta description shows homepage meta description
- No proper HTTP 404 status code verification (appears to be a soft 404)
- Minimal navigation to help users recover

#### Content Quality Score: 0/100

---

## E-E-A-T Breakdown

### Experience (Weight: 20%) -- Score: 35/100

| Signal | Present | Notes |
|--------|---------|-------|
| First-hand product testing | Partially | "kom onze scooters gratis uittesten" suggests hands-on approach |
| Case studies / customer stories | No | Zero customer testimonials or case studies |
| User reviews | No | No review system on any product page |
| "Onze specialisten" references | Yes | Multiple references to (para)medisch geschoolde medewerkers |
| Physical store presence | Yes | 34-35 stores mentioned, but no store-specific content on webshop |
| Original photography | Unclear | Product images appear to be manufacturer-supplied |
| Video content | No | No video demonstrations found |
| Keuzehulp tool | Yes | Interactive product selector for incontinence -- genuine experience signal |

**Key Gap:** The site talks about having specialists but never shows them. No staff profiles, no expert quotes, no "our specialist recommends" callouts on product pages. The experience is claimed but not demonstrated.

### Expertise (Weight: 25%) -- Score: 50/100

| Signal | Present | Notes |
|--------|---------|-------|
| Author credentials | No | No individual author attribution anywhere |
| Technical accuracy | Yes | Product specifications are detailed and manufacturer-sourced |
| Category-specific knowledge | Partial | Incontinentie page shows segmented knowledge; mobiliteit page does not |
| Medical/healthcare context | Minimal | No RIZIV/reimbursement info, no medical guidance |
| Specialist appointment system | Yes | Links to specialist appointments (cross-domain to goed.be) |
| Certification mentions | No | No ISO, CE, or medical device certifications mentioned |
| Product comparison tools | No | No comparison functionality |
| Buying guides | No | Zero buying guide content found |

**Key Gap:** For YMYL healthcare products, expertise signals should be much stronger. The site should include: buying guides written by (para)medische specialisten, RIZIV/mutualiteit reimbursement information, product selection criteria explained by qualified staff.

### Authoritativeness (Weight: 25%) -- Score: 60/100

| Signal | Present | Notes |
|--------|---------|-------|
| Brand recognition (CM/Goed) | Yes | CM is a major Belgian healthcare institution |
| Physical retail presence | Yes | 34-35 stores across Flanders |
| Institutional backing | Yes | Part of Christelijke Mutualiteit (major mutualiteit) |
| External citations/press | Not on site | No press mentions, awards, or external validation shown |
| BTW/company registration | Yes | BE 0860.548.465 in footer |
| Cross-linking with goed.be | Yes | Links to main goed.be site for stores, contact, careers |
| Social proof | Minimal | Only Facebook link; no follower counts, no review aggregation |
| Industry partnerships | Implied | Carries major brands (TENA, Vermeiren, MOBIO) but no "authorized dealer" badges |

**Strength:** The CM association is the single strongest authority signal. CM is one of Belgium's largest mutualiteiten, giving the webshop institutional credibility that most competitors lack.

**Key Gap:** This authority is not sufficiently leveraged on the webshop itself. There should be prominent "onderdeel van CM" messaging, mutual fund member benefit explanations, and cross-referencing with CM's healthcare expertise.

### Trustworthiness (Weight: 30%) -- Score: 65/100

| Signal | Present | Notes |
|--------|---------|-------|
| Contact information | Yes | Phone hours (werkdagen 09:00-17:30, zaterdag 09:00-13:00) |
| Physical address | Via goed.be | Store locations linked but not displayed on webshop |
| Privacy policy | Yes | Link to goed.be/nl/privacybeleid |
| Cookie policy | Yes | Cookie banner with preferences |
| Terms & conditions | Yes | Link to goed.be/nl/algemene-voorwaarden |
| Secure payment | Yes | Bancontact, Visa, Mastercard, Maestro, ING, KBC, Belfius logos |
| Return policy | Partially | "gratis ophalen en retourneren" mentioned, links to Zendesk help |
| Price transparency | Good | CM discount shown, base price + discounted price |
| Shipping information | Good | "besteld voor 15u, binnen 2 werkdagen geleverd", free from euro 40 |
| BTW registration | Yes | In footer |
| SSL/HTTPS | Yes | Site served over HTTPS |

**Key Gap:** Trustworthiness would improve with: visible customer reviews, detailed return policy on product pages, warranty information, RIZIV reimbursement details, and a more prominent "about us" presence on the webshop itself (currently requires navigation to goed.be).

---

## E-E-A-T Composite Score Calculation

| Factor | Weight | Score | Weighted |
|--------|--------|-------|----------|
| Experience | 20% | 35 | 7.0 |
| Expertise | 25% | 50 | 12.5 |
| Authoritativeness | 25% | 60 | 15.0 |
| Trustworthiness | 30% | 65 | 19.5 |
| **TOTAL** | **100%** | -- | **54.0/100** |

---

## AI Citation Readiness: 32/100

AI citation readiness measures how likely content is to be extracted and cited by AI systems (Google AI Overviews, ChatGPT, Perplexity, etc.).

### What Works
- Product specifications are structured in clear lists (extractable)
- Price information is clearly displayed
- Delivery timeframes are specific and quotable
- Product schema markup on product pages provides machine-readable data

### What Fails
- **No quotable expert statements** -- No named expert says "voor personen met beperkte mobiliteit raden wij aan..."
- **No FAQ content** -- FAQ sections are the most-cited content type for AI systems
- **No statistical data** -- No "X% van Vlamingen heeft last van incontinentie" type facts
- **No comparison tables** -- AI systems love structured comparison data
- **No how-to content** -- "Hoe kies je de juiste rollator?" type content is absent
- **No definition content** -- What is a transferstoel? What types of incontinentie exist?
- **Minimal structured data** -- No FAQ schema, no HowTo schema, no BreadcrumbList schema, no Organization schema on homepage
- **No article/blog content** -- The tips section is a 404
- **Category editorial content** -- Only incontinentie has any; mobiliteit has almost none

### Structured Data Gaps

| Schema Type | Present | Recommended |
|-------------|---------|-------------|
| Product | Yes (product pages) | Yes |
| Organization | No | Yes (homepage) |
| WebSite (with SearchAction) | No | Yes (homepage) |
| BreadcrumbList | No | Yes (all pages) |
| ItemList | No | Yes (category pages) |
| FAQPage | No | Yes (category + product pages) |
| HowTo | No | Yes (tips/advice pages) |
| LocalBusiness | No | Yes (store pages) |
| Offer | Yes (within Product) | Yes |
| AggregateRating | No | Yes (if reviews added) |

---

## Content Freshness Assessment

| Signal | Status |
|--------|--------|
| Copyright year | 2026 (current) |
| Product availability | Real-time ("Nu besteld, ten laatste 1 april geleverd") |
| Price updates | Appear current (promotions active) |
| Blog/news content | ABSENT |
| Date stamps on content | NONE found |
| "Last updated" signals | NONE |
| Seasonal content | Minimal (scooter testing campaign on homepage) |
| Structured data priceValidUntil | **EXPIRED: 2025-12-31** (critical fix needed) |

**Risk:** The expired `priceValidUntil` in Product schema could cause Google to show stale/warning rich results or lose rich snippet eligibility.

---

## Readability Assessment

### Language Complexity (Dutch / nl-BE)

The site uses appropriate Belgian Dutch (Flemish) language with:
- Short, accessible sentences on product pages
- Technical terms used correctly (transferstoel, scootmobiel, incontinentiemateriaal)
- Informal "je" address form (appropriate for consumer healthcare)
- Some English loan words accepted in context (scooter, slip, pants)

### Estimated Readability Metrics

| Page | Avg. Sentence Length | Vocabulary Level | Readability |
|------|---------------------|------------------|-------------|
| Homepage | Very short (fragments) | B1-B2 | Easy |
| Cat: Mobiliteit | Short | B1-B2 | Easy |
| Cat: Incontinentie editorial | Medium (15-20 words) | B2 | Moderate |
| Product: Bobby Evo | Short | B1 | Easy |
| Product: Wandelstok | Very short | A2-B1 | Very Easy |

The readability is generally appropriate for the target audience (healthcare consumers, often elderly or caregivers). However, the incontinentie editorial text is noticeably more "written" than the rest of the site, suggesting different content creation processes (possibly AI-generated SEO text vs. product team descriptions).

---

## Duplicate Content Risks

### Identified Risks

1. **Title tag duplication:** Incontinentie category has doubled brand name in title
2. **Meta description patterns:** All product pages follow identical template: "[Product name]. Besteld voor 15u, binnen 2 werkdagen geleverd. CM - Korting. Gratis verzending vanaf euro 40." -- This creates near-duplicate meta descriptions across hundreds of products
3. **Boilerplate footer:** ~120 words of identical footer content on every page, representing 25-40% of total word count on thin pages
4. **Category page pattern:** Mobiliteit category has almost no unique content, meaning filter parameter URLs could create duplicate thin pages
5. **Cross-domain duplication:** Some content overlaps with goed.be (mission, contact info, store info)
6. **Pagination:** 17 pages of mobiliteit results -- paginated content without rel=prev/next or proper handling

### Missing Canonical Tags

**CRITICAL:** No canonical tags were detected on any of the analyzed pages. This means:
- Parameter variations (e.g., `?ref=alg`, `?page=2`) may create duplicate indexing
- The site relies entirely on Googlebot's heuristic deduplication
- Cross-domain content with goed.be has no canonical signal

---

## Internal Linking Analysis

### Strengths
- Clear breadcrumb navigation (up to 5 levels deep on product pages)
- Category > subcategory hierarchy well-linked
- "Gelijkaardige producten" cross-links on product pages
- "Vaak samen gekocht" upsell links on some product pages
- Footer provides comprehensive site-wide navigation
- Cross-domain links to goed.be for stores, contact, specialist appointments

### Weaknesses
- **No contextual editorial links** -- Product pages do not link to advice/guide content
- **No "related category" links** -- Mobiliteit does not link to related categories like "slaap- en zitcomfort"
- **Tips & advies link is broken** -- Global nav link leads to 404
- **Blog/content hub absent** -- No content to link to
- **Breadcrumbs use `/nl/products/` path** (product pages) while category pages use `/nl/producten/` -- URL inconsistency in breadcrumb links
- **No internal search link integration** -- Popular searches not surfaced

### URL Path Inconsistency (Breadcrumbs)

Product pages link breadcrumbs to `/nl/products/mobiliteit/rolstoelen` while category pages use `/nl/producten/mobiliteit`. The `/products/` vs `/producten/` discrepancy may cause crawl issues or 404s on breadcrumb click-through.

---

## User Intent Alignment

| Page | Primary Intent | Alignment | Notes |
|------|---------------|-----------|-------|
| Homepage | Navigational / Informational | **Partial** | Good for navigation; lacks informational value prop |
| Cat: Mobiliteit | Commercial Investigation | **Weak** | Product listing without buying guidance |
| Cat: Incontinentie | Commercial Investigation | **Moderate** | Better editorial content, keuzehulp tool |
| Product: Bobby Evo | Transactional | **Moderate** | Specs present but thin description |
| Product: Wandelstok | Transactional | **Weak** | Minimal product information |
| Tips & Advies | Informational | **FAIL** | 404 page |

---

## YMYL Considerations

Aanbod.goed.be sells healthcare and medical aid products, placing it firmly in YMYL (Your Money or Your Life) territory. Google applies heightened scrutiny to YMYL pages per the Quality Rater Guidelines.

### YMYL Risk Areas
1. **No medical disclaimers** on product pages
2. **No professional credentials displayed** -- the site mentions "(para)medisch geschoolde medewerkers" but never identifies them
3. **No RIZIV/reimbursement guidance** -- Belgian healthcare consumers need to know what is reimbursed
4. **No contraindication information** -- Products like compression stockings have medical implications
5. **No "consult your doctor" messaging** -- Standard for healthcare retail

---

## Priority Recommendations

### Critical (Fix Immediately)

1. **Fix the Tips & Advies 404** -- Either create the content section or remove the nav link. A broken global nav link is a severe crawl and UX issue.

2. **Add canonical tags to ALL pages** -- Every page should have a self-referencing canonical. Parameter URLs (`?ref=alg`, `?page=N`) must be handled.

3. **Fix expired priceValidUntil in Product schema** -- Update from "2025-12-31" to a future date or remove the property. This affects all product pages.

4. **Fix duplicate brand name in incontinentie title tag** -- Change from "... | Goed thuiszorgwinkel | Goed thuiszorgwinkel" to single brand suffix.

### High Priority (Within 30 Days)

5. **Add Organization and WebSite schema to homepage** -- Include name, logo, URL, sameAs (social), contactPoint, and SearchAction.

6. **Add BreadcrumbList schema to all pages** -- And fix the `/products/` vs `/producten/` URL inconsistency.

7. **Create category editorial content for mobiliteit** -- Follow the incontinentie pattern but with more depth. Include: what are mobility aids, who needs them, how to choose, RIZIV reimbursement info.

8. **Expand product descriptions** -- Aim for 150+ words per product with: use cases, who it is for, key differentiators, care instructions. Prioritize high-traffic products.

9. **Add FAQ sections to top category pages** -- 5-8 questions per category, using FAQPage schema. Example: "Wordt een rollator terugbetaald door het ziekenfonds?"

### Medium Priority (Within 90 Days)

10. **Launch a tips/advice content hub** -- Create buying guides, how-to articles, and care advice. Minimum 10 articles covering top categories. Each article should be 1,500+ words with named author attribution.

11. **Implement a customer review system** -- Product reviews are critical for both E-E-A-T and conversion. Add AggregateRating and Review schema.

12. **Add expert profiles** -- Create "onze specialisten" page(s) showing real staff with credentials, photos, and specializations. Link these from product pages.

13. **Add RIZIV/reimbursement information** -- Create dedicated content explaining which products are reimbursable, how to claim, what documentation is needed. This is high-value informational content unique to Belgian healthcare retail.

14. **Improve homepage H1 and content** -- Stable, descriptive H1. Add 300+ words of unique editorial content about Goed's mission, product range, and differentiators.

15. **Add ItemList schema to category pages** -- Include top products in structured data for rich results.

### Lower Priority (Within 180 Days)

16. **Add video content** -- Product demonstrations, mobility aid tutorials, incontinence product selection guides.

17. **Create comparison content** -- Side-by-side product comparisons for categories with multiple similar products (rollators, scootmobielen).

18. **Implement "specialist recommends" badges** -- Show which products are recommended by Goed's specialists, with brief expert commentary.

19. **Add seasonal/topical content** -- Summer mobility, winter safety, back-to-school for children's products.

20. **Leverage CM authority** -- More prominent "onderdeel van CM" messaging, CM member benefit explanations, and cross-referencing CM's health expertise.

---

## Competitive Content Benchmark

For a healthcare e-commerce site of this type, competitors like Thuiszorgwinkel.nl, Medipoint.nl, and Zorgzaam.nl typically feature:
- 400-800 word category page descriptions
- Product buying guides (1,500-3,000 words)
- Customer reviews (average 10-50 per popular product)
- Expert advice blog (20-50+ articles)
- FAQ pages with schema markup
- Reimbursement/insurance information pages
- Video product demonstrations

Aanbod.goed.be currently trails significantly on content depth compared to these benchmarks, despite having a stronger institutional authority signal (CM backing) than most competitors.

---

## Summary Scores by Page

| Page | Content Quality | E-E-A-T | AI Citation | Priority |
|------|----------------|---------|-------------|----------|
| Homepage | 38/100 | 50/100 | 25/100 | High |
| Cat: Mobiliteit | 32/100 | 45/100 | 20/100 | Critical |
| Cat: Incontinentie | 55/100 | 58/100 | 40/100 | Medium |
| Product: Bobby Evo | 52/100 | 55/100 | 38/100 | High |
| Product: Wandelstok | 45/100 | 50/100 | 30/100 | High |
| Tips & Advies | 0/100 | 0/100 | 0/100 | Critical |

---

*Report generated: 2026-03-30*
*Analysis tool: Playwright content extraction + manual E-E-A-T assessment*
*Data source files: /root/seo-audit-aanbod-goed-be/fetched/*.json*
