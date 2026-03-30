# GEO & AI Search Readiness Audit: aanbod.goed.be

**Date:** 2026-03-30
**Domain:** https://aanbod.goed.be
**Subject:** Goed Thuiszorgwinkel -- Belgian healthcare retail (thuiszorgwinkel), part of CM (Christelijke Mutualiteit)
**Language:** Dutch (nl)
**Sector:** E-commerce / Healthcare Retail / Mobility Aids / Medical Supplies

---

## Executive Summary

aanbod.goed.be scores poorly on Generative Engine Optimization readiness. The site relies heavily on client-side rendering (Next.js RSC streaming), has near-total absence of structured data, lacks educational content, and is missing AI-specific directives. AI search engines (ChatGPT, Perplexity, Google AI Overviews, Bing Copilot) will struggle to crawl, comprehend, extract, and cite content from this domain. The site currently functions as a transactional e-commerce storefront with minimal content depth -- a significant disadvantage in the age of AI-generated answers.

**Overall GEO Readiness Score: 18/100**

---

## 1. GEO Health Score Breakdown

| Dimension                    | Weight | Score (0-100) | Weighted |
|------------------------------|--------|---------------|----------|
| Citability                   | 25%    | 10            | 2.5      |
| Structural Readability       | 20%    | 20            | 4.0      |
| Multi-Modal Content          | 15%    | 15            | 2.3      |
| Authority and Brand Signals  | 20%    | 22            | 4.4      |
| Technical Accessibility      | 20%    | 24            | 4.8      |
| **Total**                    | 100%   |               | **18.0** |

### 1.1 Citability (10/100)

**Critical deficiency.** AI systems need self-contained, extractable passages to cite in their responses. aanbod.goed.be provides almost none.

- **No educational or informational content** on category pages. The mobility, incontinence, and compression stocking category pages contain zero explanatory text -- only product grid listings rendered client-side.
- **Product descriptions are thin** (~60 words on the Scooter L&M Vivo+ page). The optimal passage length for AI citation is 134-167 words. Current descriptions fall far below this threshold.
- **No definition blocks** answering common questions like "Wat is een scootmobiel?" or "Welke incontinentiematerialen worden terugbetaald?"
- **No FAQ page accessible** at any tested URL pattern (/veelgestelde-vragen, /nl/veelgestelde-vragen). The footer references an FAQ but it returns 404 or is not crawlable.
- **No blog, guides, or advice content** found. Links to "tips & advies" exist in navigation but no content hub is accessible.
- **No statistics or data points** with source attribution that AI systems could cite.
- **No comparison content** (e.g., "rollator vs. looprek" or product comparison tables).

**Impact:** When a user asks ChatGPT "Waar kan ik een scootmobiel kopen in Belgie?" or Perplexity "Welke incontinentiematerialen worden terugbetaald door CM?", there is nothing on aanbod.goed.be that can be extracted as a cited passage.

### 1.2 Structural Readability (20/100)

- **Heading hierarchy is weak.** Category pages lack proper H1 > H2 > H3 semantic structure. Content is rendered through React component streaming rather than semantic HTML.
- **No question-based headings.** None of the analyzed pages use H2/H3 headings phrased as questions (the pattern most favored by AI systems for extraction).
- **No lists or tables with explanatory content.** Product specification tables exist on individual product pages (dimensions, speed, weight capacity) but are isolated from context.
- **Product pages have some structure** (specifications, description, reimbursement info) but lack the depth and self-containment needed for AI citation.
- **Navigation is well-organized** with clear category taxonomy: mobiliteit, incontinentie-en-stoma, hulpmiddelen, compressiekousen, etc.

### 1.3 Multi-Modal Content (15/100)

- **Product images exist** but lack alt text analysis (client-side rendering prevents verification).
- **No video content** detected. YouTube presence for Goed is unverified but likely minimal. YouTube mentions have the strongest correlation (~0.737) with AI citation.
- **No infographics or diagrams** explaining product selection, sizing guides, or reimbursement processes.
- **No image schema markup** (ImageObject) detected.
- **PDF product sheets** ("productfiche") are linked from product pages -- positive signal but PDFs are less citable than HTML content.

### 1.4 Authority and Brand Signals (22/100)

- **CM (Christelijke Mutualiteit) parent brand** provides institutional authority, but the connection is underexploited. The footer mentions "samen met CM" but there is no structured data establishing this relationship.
- **No Organization schema.org markup** detected.
- **No author attribution** on any content. No named experts, healthcare professionals, or editorial team.
- **No publication dates** on content (there is virtually no editorial content to date).
- **VAT number present** (BE 0860.548.465) -- minor trust signal.
- **35+ physical stores** mentioned -- strong local authority signal, but no LocalBusiness schema markup on the store locator page.
- **Wikipedia entity status:** No dedicated Wikipedia article for "Goed thuiszorgwinkel" found. CM (Christelijke Mutualiteit) has a Dutch Wikipedia presence, but the link to Goed is not established in structured knowledge graphs.
- **Reddit presence:** Likely minimal. Healthcare retail in Belgium has limited Reddit discussion.
- **LinkedIn presence:** Goed likely has a company page, but not verified in this audit.
- **No E-E-A-T signals** (Experience, Expertise, Authoritativeness, Trustworthiness) beyond the CM institutional affiliation.

### 1.5 Technical Accessibility (24/100)

#### AI Crawler Access Status

| Crawler           | Service          | Status                    | Impact                    |
|-------------------|------------------|---------------------------|---------------------------|
| GPTBot            | ChatGPT training | **Not blocked** (default) | Can crawl, but CSR limits content |
| OAI-SearchBot     | ChatGPT search   | **Not blocked** (default) | Can crawl, but CSR limits content |
| ChatGPT-User      | ChatGPT browse   | **Not blocked** (default) | Can crawl, but CSR limits content |
| ClaudeBot         | Claude/Anthropic  | **Not blocked** (default) | Can crawl, but CSR limits content |
| PerplexityBot     | Perplexity       | **Not blocked** (default) | Can crawl, but CSR limits content |
| Google-Extended   | Gemini training  | **Not blocked** (default) | Can crawl                 |
| Googlebot         | Google Search/AIO| **Not blocked** (default) | Can crawl, renders JS     |
| CCBot             | Common Crawl     | **Not blocked** (default) | Can crawl                 |
| Bytespider        | TikTok/ByteDance | **Not blocked** (default) | Can crawl                 |
| anthropic-ai      | Anthropic        | **Not blocked** (default) | Can crawl                 |
| cohere-ai         | Cohere           | **Not blocked** (default) | Can crawl                 |
| Baiduspider       | Baidu            | **BLOCKED**               | No China visibility       |
| YandexBot         | Yandex           | **BLOCKED**               | No Russia visibility      |
| Qwantify          | Qwant            | **BLOCKED**               | No Qwant visibility       |

**Positive:** No major AI crawlers are blocked. GPTBot, ClaudeBot, PerplexityBot, and OAI-SearchBot all have default access.

**Critical negative: Client-Side Rendering (CSR) severely limits AI crawler access.**

The site is built on Next.js with React Server Components (RSC) streaming. Page content is delivered via `self.__next_f.push()` JavaScript payloads rather than pre-rendered HTML. This means:

- Most AI crawlers (especially PerplexityBot, ClaudeBot, CCBot) **cannot execute JavaScript** and will see empty or minimal content.
- Only Googlebot reliably renders JavaScript, but even then with delays and potential indexing gaps.
- GPTBot and OAI-SearchBot have limited JS rendering capability.
- The static HTML contains navigation, footer text, and framework bootstrap code -- but not the actual product data, descriptions, or category content.

**This is the single biggest technical barrier to AI search visibility.**

#### Other Technical Findings

- **Sitemaps present:** 6 sitemaps referenced in robots.txt covering the main site, categories, products, jobs, and lending service.
- **URL structure is clean:** `/nl/producten/[category]/[subcategory]` and `/nl/product/[product-slug]` patterns are logical and crawlable.
- **No llms.txt file:** Neither `/llms.txt` nor `/.well-known/llms.txt` returns a valid llms.txt file. The `/llms.txt` URL returns the homepage HTML instead of a 404 or valid llms.txt content (indicating a catch-all route).
- **No canonical tags verified** (CSR prevents verification).
- **No hreflang tags verified** (CSR prevents verification).
- **Blocked paths in robots.txt** include `/promoties`, `/afspraak`, `/abonneren`, `/webreservatie` -- these are appropriate blocks for transactional pages.

---

## 2. Platform-Specific AI Search Readiness

| Platform             | Readiness | Score  | Key Issue                                      |
|----------------------|-----------|--------|-------------------------------------------------|
| Google AI Overviews  | Very Low  | 20/100 | CSR partly mitigated by Googlebot JS rendering; no structured data; thin content |
| ChatGPT (search)     | Very Low  | 15/100 | CSR blocks content extraction; no citable passages; no FAQ schema |
| Perplexity           | Very Low  | 12/100 | PerplexityBot cannot render JS; zero extractable content from static HTML |
| Bing Copilot         | Very Low  | 18/100 | Bingbot renders some JS but content is too thin for citation |

### Google AI Overviews

Google can render JavaScript, so product pages are technically accessible. However, the lack of structured data (Product, Organization, LocalBusiness, FAQPage schema), thin descriptions, and zero educational content mean Google AI Overviews will prefer competitor sites with richer content when generating healthcare product answers in Dutch.

### ChatGPT (Browse and Search)

ChatGPT browsing capability can render some JavaScript, but the RSC streaming format is particularly challenging. Even if content is accessed, there are no passages of sufficient length (134-167 words) or self-contained answers for ChatGPT to cite. The site will not appear in ChatGPT search results for healthcare product queries.

### Perplexity

PerplexityBot is a traditional web crawler that does not render JavaScript. It will encounter near-empty HTML pages. Goed will be entirely invisible to Perplexity users asking about Belgian healthcare products, mobility aids, or incontinence supplies.

### Bing Copilot

Similar to Google but with less aggressive JS rendering. Bing AI features (Copilot) pull from Bing index, which will have limited content from aanbod.goed.be due to CSR and thin content.

---

## 3. llms.txt Compliance

**Status: NOT PRESENT / MALFORMED**

- `https://aanbod.goed.be/llms.txt` -- Returns homepage HTML (catch-all route), not a valid llms.txt file.
- `https://aanbod.goed.be/.well-known/llms.txt` -- Returns 404.

**What is needed:** A plain-text llms.txt file following the emerging llms.txt specification that:
- Declares what the site is (Belgian healthcare retail / thuiszorgwinkel)
- Lists key content areas and their URLs
- Specifies any AI usage permissions or restrictions
- Provides entity context (parent organization CM, store count, product categories)

---

## 4. Brand Mention and Entity Analysis

### 4.1 Entity Disambiguation

**"Goed" is a highly ambiguous term.** In Dutch, "goed" is a common adjective meaning "good." This creates severe entity disambiguation challenges for AI systems:

- When a user asks about "Goed thuiszorgwinkel," AI systems may not recognize "Goed" as a brand name.
- There is no Wikipedia entity for Goed (the retail chain), which is the strongest disambiguation signal for AI systems.
- No Wikidata Q-number exists for the Goed retail entity.
- The domain split (goed.be for informational, aanbod.goed.be for e-commerce) further fragments entity signals.

### 4.2 Brand Mention Signals

| Platform     | Presence | Estimated Impact |
|-------------|----------|------------------|
| Wikipedia (nl) | Not found (Goed) / Exists (CM) | Very negative -- no entity anchor |
| YouTube      | Unknown / likely minimal | Very negative (strongest correlation factor at ~0.737) |
| Reddit       | Likely minimal | Negative |
| LinkedIn     | Likely present (company page) | Minor positive |
| Google Knowledge Panel | Not verified | Likely absent for "Goed thuiszorgwinkel" |

### 4.3 Knowledge Panel Readiness

**Not ready.** A Google Knowledge Panel requires:
- Wikipedia/Wikidata entity (missing for Goed)
- Consistent NAP (Name, Address, Phone) across the web (partially present via 35 stores, but no LocalBusiness schema)
- Organization schema.org markup (missing)
- Google Business Profiles for all stores (not verified but likely partially present)
- Clear brand identity signals (weakened by "goed" ambiguity)

---

## 5. Content Gap Analysis for AI Visibility

The most damaging gap is the complete absence of informational content. Competitors who publish healthcare guides, product selection advice, and reimbursement explainers in Dutch will dominate AI-generated answers. Key missing content types:

| Content Type | Status | Priority |
|-------------|--------|----------|
| Category explainer text (134-167 words per category) | Missing | Critical |
| Product buying guides ("Hoe kies ik een rollator?") | Missing | Critical |
| FAQ with FAQPage schema | Missing/broken | Critical |
| Reimbursement guides (RIZIV/VSB terugbetaling) | Missing | High |
| Sizing guides (compression stockings) | Missing | High |
| Comparison content (product vs. product) | Missing | Medium |
| Blog/advice articles | Missing/inaccessible | Medium |
| Video content (product demos, store tours) | Missing | Medium |
| Store-specific landing pages with LocalBusiness schema | Missing | Medium |

---

## 6. Top 10 Highest-Impact Recommendations

### PRIORITY 1 -- CRITICAL (Implement within 30 days)

#### R1. Enable Server-Side Rendering (SSR) or Static Site Generation (SSG)

**Impact:** Unlocks all AI crawler access. Currently the single biggest blocker.
**Effort:** High (2-4 weeks engineering)
**Details:** Configure Next.js to pre-render all product and category pages as static HTML or use SSR with full HTML output. At minimum, implement `generateStaticParams` for all product and category routes. Verify with `curl -A "ClaudeBot" https://aanbod.goed.be/nl/producten/mobiliteit` that full HTML content is returned without JavaScript execution.

#### R2. Add Category Introductory Content (134-167 words per category)

**Impact:** Creates citable passages for every major product category. Direct path to AI citations.
**Effort:** Medium (1-2 weeks content creation)
**Details:** For each of the 11 product categories, write a self-contained introductory paragraph that:
- Directly answers "Wat is [category]?" in the first 40-60 words
- Includes specific statistics (e.g., "Meer dan 1 op 10 Belgen heeft last van incontinentie")
- References Goed by name and mentions CM affiliation
- Is placed above the product grid in an H1 + intro paragraph pattern
- Example for mobiliteit: "Een scootmobiel biedt zelfstandige mobiliteit voor mensen met beperkte loopafstand. Bij Goed thuiszorgwinkel, onderdeel van CM, vindt u meer dan 20 scootmobielen en elektrische rolstoelen die in aanmerking komen voor terugbetaling via de Vlaamse Sociale Bescherming (VSB). Onze ergotherapeuten in 35 winkels adviseren u gratis bij de keuze van het juiste mobiliteitshulpmiddel."

#### R3. Implement Schema.org Structured Data

**Impact:** Enables rich results and improves AI comprehension of entities and relationships.
**Effort:** Medium (1-2 weeks development)
**Details:** Add JSON-LD for:
- **Organization** (on every page): name, logo, url, parentOrganization (CM), foundingDate, numberOfEmployees, areaServed
- **Product** (on product pages): name, description, brand, offers (price, availability, priceCurrency: EUR), sku, image, review/aggregateRating when available
- **LocalBusiness** (on store pages): name, address, geo (lat/lng), telephone, openingHoursSpecification for all 35+ stores
- **BreadcrumbList** (on all pages): reflecting the category hierarchy
- **FAQPage** (on FAQ and category pages): question-answer pairs

### PRIORITY 2 -- HIGH (Implement within 60 days)

#### R4. Create and Publish an FAQ Section with FAQPage Schema

**Impact:** FAQ content is the most directly citable format for AI systems. Question-answer pairs map 1:1 to AI query patterns.
**Effort:** Medium (2-3 weeks content + development)
**Details:**
- Create 30-50 FAQs covering: product selection, reimbursement (RIZIV, CM, VSB), delivery, store services, rental, returns
- Use question-based H2 headings: "Wordt mijn rollator terugbetaald door CM?"
- Keep answers between 134-167 words, self-contained
- Implement FAQPage schema on all FAQ content
- Place top 3-5 relevant FAQs on each category page

#### R5. Create a Valid llms.txt File

**Impact:** Provides explicit context and permissions for AI systems.
**Effort:** Low (1 day)
**Details:** Create `/llms.txt` (ensure the Next.js catch-all route does not intercept this path) served as plain text (Content-Type: text/plain), declaring the organization identity, key product category URLs, store locator URL, and contact information. Also create `/.well-known/llms.txt` as an alias.

#### R6. Expand Product Descriptions to 134-167 Words

**Impact:** Makes individual products citable in AI responses.
**Effort:** High (ongoing, 3-6 months for full catalog)
**Details:** Current product descriptions (~60 words) need expansion to include:
- What the product is and who it is for (first 40 words)
- Key specifications in sentence form (not just a spec table)
- Reimbursement eligibility information
- How Goed supports the customer (advice, fitting, delivery)
- Prioritize top-selling products and high-search-volume categories first

### PRIORITY 3 -- MEDIUM (Implement within 90 days)

#### R7. Create Buying Guides and Advice Content

**Impact:** Positions Goed as an authority source that AI systems will cite for informational queries.
**Effort:** High (ongoing content program)
**Details:** Publish 10-20 guide articles covering:
- "Hoe kies ik de juiste rollator?" (How to choose the right rollator)
- "Compressiekousen: welke klasse heb ik nodig?" (Compression stockings: which class do I need)
- "Terugbetaling mobiliteitshulpmiddelen via VSB" (Reimbursement of mobility aids via VSB)
- "Incontinentiemateriaal: een overzicht" (Incontinence products: an overview)
- Each guide should be 800-1500 words, with clear H2 question headings, specific data points, and references to Belgian healthcare regulations
- Include author attribution (named healthcare advisor or ergotherapist from Goed)

#### R8. Build Wikipedia/Wikidata Entity Presence

**Impact:** Resolves entity disambiguation and establishes knowledge graph presence.
**Effort:** Medium (requires notability establishment first)
**Details:**
- Ensure CM Wikipedia article (nl.wikipedia.org) mentions Goed thuiszorgwinkel as a subsidiary/service
- If sufficient third-party press coverage exists, create a dedicated Wikipedia article for Goed
- Create a Wikidata item (Q-number) for Goed with properties: instance_of (retail chain), country (Belgium), parent_organization (CM), industry (healthcare retail), number_of_locations (35+)
- This is the single most impactful action for entity disambiguation given that "goed" is a common Dutch word

#### R9. Develop YouTube Content

**Impact:** YouTube mentions have the strongest correlation (~0.737) with AI citation rates.
**Effort:** High (ongoing)
**Details:**
- Create product demonstration videos (scootmobiel test rides, rollator comparisons)
- Film store tours and expert advice sessions
- Publish "how to choose" video guides
- Optimize video titles and descriptions with brand name "Goed thuiszorgwinkel"
- Embed videos on relevant product and category pages

#### R10. Add Explicit AI Crawler Directives to robots.txt

**Impact:** Low immediate impact but establishes intentional AI search strategy.
**Effort:** Low (1 hour)
**Details:** Add explicit allow rules for AI search crawlers (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended). Consider blocking training-only crawlers (CCBot, anthropic-ai) if content licensing is a concern.

---

## 7. Competitive Vulnerability Assessment

The Belgian healthcare retail / thuiszorgwinkel space is relatively niche in Dutch-language AI search. This creates both risk and opportunity:

**Risk:** Generic health information sites (gezondheid.be, thuisarts.nl), Belgian government sites (RIZIV, VAPH), and larger retailers with better content (e.g., medipoint.nl in Netherlands) will capture AI citations that could reference Goed.

**Opportunity:** There are likely few competitors investing in GEO for Dutch-language healthcare retail. First-mover advantage in creating comprehensive, citable content about Belgian healthcare products and reimbursement systems could establish Goed as the default cited source.

**Key competitive queries where Goed should aim for AI citation:**
- "Waar kan ik een scootmobiel kopen in Belgie?"
- "Wordt incontinentiemateriaal terugbetaald door het ziekenfonds?"
- "Welke compressiekousen heb ik nodig?"
- "Thuiszorgwinkel in de buurt"
- "Rollator kopen met terugbetaling CM"
- "Hulpmiddelen voor ouderen Belgie"

---

## 8. Technical Implementation Roadmap

| Phase | Timeline | Actions | Expected Score Impact |
|-------|----------|---------|----------------------|
| Phase 1 | Week 1-4 | SSR/SSG migration; Schema.org implementation; llms.txt creation | 18 -> 35 |
| Phase 2 | Week 4-8 | Category intro content; FAQ section; Product description expansion (top 50 products) | 35 -> 50 |
| Phase 3 | Week 8-16 | Buying guides (10 articles); LocalBusiness schema for all stores; robots.txt AI directives | 50 -> 62 |
| Phase 4 | Week 16-26 | Wikipedia/Wikidata entity; YouTube channel; Full product description expansion; Author attribution | 62 -> 75 |

---

## 9. Monitoring and Measurement

### Metrics to Track

1. **AI citation monitoring:** Use manual testing -- query ChatGPT, Perplexity, and Google AI Overviews monthly with target queries and check if aanbod.goed.be is cited.
2. **Structured data validation:** Google Rich Results Test for all schema implementations.
3. **Crawl accessibility:** Check server logs for GPTBot, ClaudeBot, PerplexityBot user agents. Verify they receive full HTML content (not empty JS shells).
4. **Content indexation:** Google Search Console coverage report -- ensure all new content pages are indexed.
5. **Brand mention tracking:** Monitor mentions of "Goed thuiszorgwinkel" across platforms.

### Tools

- Google Search Console (indexation, structured data errors)
- Schema.org Validator (structured data testing)
- Screaming Frog with JS rendering (crawl comparison: JS off vs. JS on)
- Manual AI platform testing (ChatGPT, Perplexity, Google AIO, Bing Copilot)

---

## Appendix A: robots.txt Current State (Summary)

```
Blocked crawlers:
User-agent: Baiduspider    -> Disallow: /
User-agent: YandexBot      -> Disallow: /
User-agent: Qwantify       -> Disallow: /

Throttled crawlers:
User-agent: Slurp          -> Crawl-delay: 20

Default rules (User-agent: *):
Disallow: /*?*             (query parameters)
Disallow: /winkelmandje    (cart)
Disallow: /account         (user accounts)
Disallow: /inloggen        (login)
Disallow: /promoties       (promotions)
Disallow: /afspraak        (appointments)
Disallow: /abonneren       (subscriptions)
Disallow: /webreservatie   (web reservations)
Disallow: /_next/          (Next.js internals)
Disallow: /cache/          (cache files)
Disallow: /build/          (build files)

6 Sitemaps declared
```

## Appendix B: Key Findings Summary Table

| Check                                  | Status        | Severity  |
|----------------------------------------|---------------|-----------|
| AI crawlers blocked in robots.txt      | No (good)     | --        |
| llms.txt present and valid             | No            | Medium    |
| Server-side rendering (SSR)            | No (CSR only) | Critical  |
| Schema.org Product markup              | Not detected  | Critical  |
| Schema.org Organization markup         | Not detected  | High      |
| Schema.org LocalBusiness markup        | Not detected  | High      |
| Schema.org FAQPage markup              | Not detected  | High      |
| Category educational content           | Missing       | Critical  |
| Product descriptions >= 134 words      | No (~60 words)| High      |
| FAQ section accessible                 | No (broken)   | High      |
| Blog/advice content hub                | Not found     | Medium    |
| Question-based headings                | Not found     | Medium    |
| Author attribution                     | Not found     | Medium    |
| Publication dates on content           | Not found     | Low       |
| Wikipedia entity for Goed              | Not found     | High      |
| Wikidata entity for Goed               | Not found     | High      |
| YouTube content                        | Not found     | Medium    |
| Explicit AI crawler allow rules        | Not present   | Low       |
| Review/rating structured data          | Not detected  | Medium    |
| Image alt text (verifiable)            | Not verifiable| Medium    |
| Hreflang tags                          | Not verifiable| Low       |
| Canonical tags                         | Not verifiable| Medium    |

---

*Report generated 2026-03-30. Analysis based on live crawl data from aanbod.goed.be.*
*Methodology: GEO Health Score framework with 5 weighted dimensions.*
