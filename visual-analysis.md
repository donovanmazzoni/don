# Visual Analysis Report: aanbod.goed.be

**Date:** 2026-03-30
**Pages analyzed:** Homepage, Category page (mobiliteit), Subcategory/product page (wandelstokken)
**Viewports tested:** Desktop (1920x1080), Mobile (375x812)

---

## 1. Above-the-Fold Content Quality

### Desktop Homepage
- The hero banner area is partially visible but heavily obscured by a **cookie consent modal** that overlays the center of the page. This is a critical first-impression problem: users cannot see the hero content or primary CTA without first interacting with the cookie banner.
- Behind the modal, a promotional banner referencing "scooters gratis" is partially visible, along with a row of mobility scooter products with prices and "meer info" buttons.
- The top utility bar shows trust signals: "gratis verzending vanaf 40 euro," "gratis ophalen en retourneren in onze winkel," and "besteld voor 15u, binnen 2 werkdagen geleverd." These are well-placed but rendered in very small text that is easy to miss.
- The main navigation bar includes category links (promoties, incontinentie & stoma, hulpmiddelen, mobiliteit, sport & revalidatie, etc.), a search bar, login button, and cart icon.

### Mobile Homepage
- The mobile above-the-fold is even more severely impacted by the cookie consent modal. It covers roughly the bottom 60% of the visible viewport.
- Above the cookie banner, only the Goed logo, hamburger menu, account/cart icons, search bar, a "gratis verzending vanaf 40 euro" badge, and the beginning of category icon circles (promoties, incontinentie & stoma, hulpmiddelen, mobiliteit) are visible.
- The hero banner image is just barely peeking through before the cookie modal takes over.
- **No primary CTA is visible** on mobile until the cookie banner is dismissed.

### Category Page (Mobiliteit) -- Desktop
- The page shows a clear H1 "mobiliteit" heading with a descriptive paragraph below it.
- A left sidebar displays subcategories (wandelstokken, rollators, krukken, rolstoelen, etc.) with product counts, and brand filters.
- Product cards are visible with images, names, prices, and teal "voeg toe" (add to cart) buttons.
- The cookie modal again obscures the center of the viewport.

### Category Page (Mobiliteit) -- Mobile
- The H1 and category description are clearly visible and well-sized.
- Subcategory pill-shaped buttons (wandelstokken, rollators, kruk...) are displayed as a horizontal scrollable row -- a good mobile pattern.
- However, the cookie modal blocks the entire product grid. **Zero products are visible** above the fold on mobile.

### Subcategory Page (Wandelstokken) -- Desktop and Mobile
- Similar pattern to the category page. Clear H1, descriptive text, breadcrumb navigation.
- Desktop shows subcategory filters in the left sidebar and product cards with prices and "voeg toe" buttons.
- Mobile uses the same horizontal scrollable pill pattern for sub-subcategories (plooibare wandelstokken, niet plooibare...).
- Again, the cookie modal dominates both viewports on first load.

**Severity: HIGH** -- The cookie consent implementation is the single biggest above-the-fold issue across every page and every viewport.

---

## 2. Visual Hierarchy and CTA Visibility

### Primary CTAs
- **"voeg toe" (Add to cart) buttons:** These use a strong teal/dark green color that contrasts well against the white product cards. They are consistently styled across category and subcategory pages.
- **"meer info" buttons:** On the homepage product row, lighter-colored "meer info" buttons appear below product prices. These have lower visual weight than the "voeg toe" buttons, which is appropriate for a secondary action.
- **Search bar:** Prominent placement in the header on both desktop and mobile with a clear magnifying glass icon. On mobile, it stretches nearly full-width, which is excellent for discoverability.

### Heading Hierarchy
- H1 headings on category/subcategory pages are large, bold, and clearly the dominant text element -- good visual hierarchy.
- Category descriptions sit below the H1 in regular-weight body text, providing a clear information hierarchy.
- Product names within cards are slightly bold, with prices in a larger or emphasized style below them.

### Issues
- The homepage hero banner text is partially cut off and hard to read at a glance on desktop.
- On the full-page desktop homepage, a "waarom kopen bij goed" (why buy from Goed) section with value propositions (30% korting, thuiszorgwinkel, advies, aanbod huurartikelen, huislevering, abonnement) is only visible after significant scrolling -- these trust signals would benefit from higher placement.
- No single, dominant primary CTA (such as "Shop nu" or "Bekijk aanbod") exists on the homepage above the fold. The homepage relies on the product row and category navigation rather than a strong call-to-action.

---

## 3. Mobile Rendering Quality and Tap Target Sizes

### Positive Observations
- The hamburger menu icon is adequately sized (appears to meet the 48x48px minimum).
- The search bar is large and easy to tap.
- Account and cart icons in the header appear sufficiently sized.
- Category icon circles on the homepage are generously sized and well-spaced for touch.
- Subcategory pills on category pages are tall enough to be easily tappable.
- Cookie consent buttons ("Alle cookies toestaan" and "Weigeren") are full-width and tall -- easy to tap.

### Potential Issues
- The "Ik wil mijn cookies zelf instellen" link within the cookie modal is plain underlined text, not a button. It may be slightly harder to tap accurately, though it appears to have adequate padding.
- On the full mobile homepage, individual product cards in the promotions row may have small tap targets for the "meer info" or price elements.
- The breadcrumb links on mobile category pages ("producten," "mobiliteit") are relatively small text links that could be difficult to tap precisely.
- The "meer..." expand link for truncated category descriptions is small.

### Text Readability
- Base font size on mobile appears to be 16px or larger, meeting the recommendation for readability without zooming.
- Line heights appear comfortable.
- No horizontal scrolling issues detected on any mobile screenshot.

---

## 4. Layout Shifts and Visual Issues

### Cookie Consent Modal
- The modal is a non-dismissable overlay (not a simple bottom bar) that significantly disrupts the visual experience. It appears as a centered white box on desktop and a bottom-sheet-style panel on mobile.
- On mobile, the modal covers approximately 55-60% of the viewport.
- On desktop, it covers the central content area while leaving navigation and sidebar partially visible.

### Layout Observations
- No obvious broken layouts or overlapping elements were detected outside of the cookie modal.
- Product card grids appear to align properly on desktop (5 columns on category pages).
- The full-page desktop homepage shows clean section separations with alternating white and light grey backgrounds.
- Image scaling appears correct; product images maintain proper aspect ratios.
- The homepage hero image (showing an elderly person with a mobility scooter outdoors) renders well and communicates the brand's target audience clearly.

### Potential Concerns
- Some product card titles may be truncating (e.g., "Wandelstok 4-delig (vrouw)" appears to fit, but longer names might clip).
- Discount badges ("10% extra korting," "25% CM-korting," "mobiliteitsvoordeel") are layered in the top-left corner of product images and use different colored labels. While informative, having multiple badges stacked can create visual clutter.

---

## 5. Navigation Usability

### Desktop Navigation
- **Primary nav bar:** A horizontal menu with category links (promoties, incontinentie & stoma, hulpmiddelen, mobiliteit, sport & revalidatie, zwangerschap & kind, slaap- en zitcomfort, compressiekousen). This is a comprehensive menu but somewhat crowded.
- **"alle categorieen" link:** Positioned at the far right of the nav bar, providing access to the full category tree.
- **Breadcrumbs:** Present on category and subcategory pages (e.g., producten > mobiliteit > wandelstokken). These support navigation and SEO.
- **Utility bar:** The top bar includes "winkels," "tips & advies," "contact," and "inloggen" links.
- **"onze producten" dropdown:** A teal button in the header area offers another product navigation entry point.

### Mobile Navigation
- **Hamburger menu:** Clearly visible in the top-left corner with the Goed logo next to it.
- **Back navigation:** Category and subcategory pages show a back arrow with the parent category name (e.g., "< producten" or "< mobiliteit"), providing clear hierarchical navigation.
- **Search:** Prominently placed below the header, taking full width.
- **No visible bottom navigation bar** -- this could be an opportunity to add persistent cart/account/home shortcuts.

### Sidebar Filters (Desktop)
- Category pages show a left sidebar with subcategories and faceted filters (brand, product type).
- Filter counts in parentheses help users gauge available products.
- Expandable/collapsible sections with chevron icons.

### Issues
- On mobile, all filtering appears to be hidden (no visible filter button in the above-the-fold area of category screenshots). Users need to scroll past the cookie modal and products to find sorting/filtering options, which could harm usability.
- The desktop nav bar has many items that may cause readability issues at smaller desktop/laptop widths (1366px).

---

## 6. Product Presentation Quality

### Product Cards
- **Images:** Clean, white-background product photos that are consistent in style. Products are centered and clearly visible.
- **Information displayed:** Product name, price, and an "add to cart" button. Some cards also show discount badges.
- **Pricing:** Clearly displayed in a slightly larger or bold font. Prices use the Euro symbol with comma-separated decimals (Belgian convention).
- **Add-to-cart buttons:** Teal-colored with a cart icon and "voeg toe" text. These are prominent and action-oriented.

### Discount/Promotion Badges
- Multiple badge types are used: "10% extra korting" (red/pink), "25% CM-korting" (teal), "mobiliteitsvoordeel" (teal). These are overlaid on the top-left of product images.
- The variety of badge styles communicates different value propositions but may be confusing to users unfamiliar with CM-korting (health insurance discount in Belgium).

### Homepage Product Row
- Featured scooter products are displayed in a horizontal row with product images, names, prices, and "meer info" buttons.
- Price range visible (approximately 1,911 to 4,429 EUR) communicates that this is a premium/medical product category.

### Promotions Section
- A "niet te missen promoties" (unmissable promotions) section on the homepage shows discounted items with clear pricing.

### Missing Elements
- No visible star ratings or review counts on product cards.
- No "compare" functionality visible.
- No wishlist/save functionality visible on product cards.
- No stock availability indicators.

---

## 7. Brand Consistency

### Color Palette
- **Primary:** Dark teal/green (used for header, buttons, footer, navigation backgrounds).
- **Secondary:** White (content backgrounds, product cards).
- **Accent:** Purple/violet (used for login button outline, some interactive elements).
- **Alert/Promo:** Pink/magenta (used for some discount badges and promotional highlights).
- The color scheme is consistent across all pages and viewports.

### Typography
- A clean, modern sans-serif font is used consistently throughout.
- Heading weights and sizes are consistent across pages.
- The Goed logo uses a distinctive lowercase rounded font that aligns with the approachable, healthcare-oriented brand identity.

### Visual Language
- The brand communicates "accessibility," "healthcare," and "comfort" through its imagery (elderly people using mobility devices, medical product photography).
- The teal/green palette evokes trust and health, appropriate for a medical/wellness product retailer.
- Icon style for category circles on the homepage is consistent (flat illustration style with teal tones).

### Consistency Issues
- The cookie consent modal uses a standard style that does not match the brand's teal color scheme -- it uses generic grey/white with black text, creating a slight visual disconnect.
- The discount badge colors (red, teal, pink) do not follow a single unified system, which could confuse users about what each badge means.

---

## 8. Conversion Optimization Signals

### Trust Signals Present
- Free shipping threshold ("gratis verzending vanaf 40 euro") in the utility bar and on mobile.
- Free in-store pickup and returns ("gratis ophalen en retourneren in onze winkel").
- Fast delivery promise ("besteld voor 15u, binnen 2 werkdagen geleverd").
- Physical store references ("winkels" link) -- important for a Belgian healthcare retailer.
- "hulp nodig?" (need help?) box on category pages with a link to make an appointment with mobility advisors.
- "waarom kopen bij goed" section further down the homepage listing six value propositions.

### Conversion Barriers
1. **Cookie modal dominance:** The most significant conversion barrier. It blocks product visibility and requires interaction before any shopping can begin.
2. **No urgency indicators:** No stock level warnings, no "X people viewing this" indicators, no time-limited offer countdowns.
3. **No social proof on product cards:** No ratings, reviews, or "bestseller" badges.
4. **Homepage lacks a clear singular CTA:** The homepage tries to serve multiple purposes (promotions, featured products, category browsing) without a dominant action path.
5. **No visible live chat or quick help widget** -- for a medical product retailer, immediate expert assistance could significantly boost conversions.
6. **Price anchoring is weak:** Discount badges show percentage off but original/crossed-out prices are not visible on the product cards in these screenshots.

### Positive Conversion Elements
- Direct "voeg toe" (add to cart) buttons on product listing pages reduce clicks to purchase.
- Clear pricing with no hidden information.
- Category and subcategory structure helps users find specific products quickly.
- The "hulp nodig?" assistance box on category pages is a good trust/conversion element.

---

## 9. Accessibility Visual Cues

### Positive Observations
- Text contrast appears adequate: dark text on white backgrounds, white text on dark teal backgrounds.
- The search bar has clear placeholder text.
- Breadcrumbs provide orientation for screen reader users (assuming proper ARIA markup).
- Category subcategory counts (e.g., "wandelstokken (74)") provide useful context.
- The "meer..." (more) link for truncated descriptions allows expanded content access.

### Concerns
- **Color reliance for badges:** The discount badges rely on both color and text to convey information, which is acceptable, but the small badge text over product images may be difficult to read for users with low vision.
- **Cookie modal focus management:** The modal appears to be full-viewport on mobile, but it is unclear whether keyboard focus is properly trapped within the modal.
- **Image alt text:** Cannot be verified from screenshots alone, but product images should have descriptive alt text.
- **Link underlines:** Most links do not appear to use underlines (relying on color alone), which can be an accessibility concern for users who cannot distinguish colors.
- **Form field labels:** The search bar uses placeholder text ("zoek een product, merk of trefwoord...") rather than a visible label, which disappears on input -- a common accessibility anti-pattern.
- **Touch target spacing on mobile:** While individual tap targets appear adequately sized, some areas (breadcrumbs, small text links) may not meet WCAG 2.5.8 target spacing requirements.

### Target Audience Consideration
- Given that Goed sells mobility aids and healthcare products, a significant portion of their audience likely includes elderly users and people with disabilities. Accessibility is therefore not just a compliance concern but a core business requirement. The current visual design is generally clean and readable but should be audited more deeply for WCAG 2.1 AA compliance, particularly around:
  - Focus indicators on interactive elements
  - Screen reader compatibility of the product grid and filters
  - Keyboard navigation through the cookie modal and product cards
  - Text resizing behavior up to 200%

---

## Summary of Critical Findings

| Priority | Finding | Impact | Pages Affected |
|----------|---------|--------|----------------|
| CRITICAL | Cookie consent modal blocks above-the-fold content on all pages, especially mobile | Users cannot see products or CTAs without first dismissing the modal | All |
| HIGH | No primary CTA visible on homepage above the fold | Reduces conversion rate for new visitors | Homepage |
| HIGH | No product ratings/reviews visible on product cards | Missing social proof reduces purchase confidence | Category, Subcategory |
| MEDIUM | Mobile filter/sort functionality not visible above the fold | Users may not discover filtering options | Category, Subcategory |
| MEDIUM | Multiple inconsistent discount badge styles | Confuses users about promotion types | Category, Subcategory |
| MEDIUM | Trust signals ("waarom kopen bij goed") buried below the fold | Key differentiators are missed by users who do not scroll | Homepage |
| LOW | Search bar uses placeholder instead of visible label | Accessibility concern, especially for target demographic | All |
| LOW | Cookie modal styling does not match brand design | Minor brand consistency issue | All |

---

## Recommendations

1. **Redesign the cookie consent as a bottom bar** (not a modal overlay) so it does not block page content. A slim, non-intrusive bar with "Accept" and "Manage" options would comply with GDPR while preserving the shopping experience.
2. **Add a clear hero CTA on the homepage** such as "Bekijk ons aanbod" (View our range) or "Ontdek onze promoties" (Discover our promotions) above the fold.
3. **Integrate product ratings and review counts** on product listing cards to provide social proof.
4. **Expose sort and filter controls on mobile** at the top of the product listing, either as a sticky bar or prominent buttons visible before scrolling.
5. **Standardize discount badge design** with a single color and clear labeling system that explains badge meanings.
6. **Elevate trust signals** by incorporating key value propositions (free shipping, expert advice, easy returns) into a visible banner or icon row above the fold on the homepage.
7. **Add a visible label or icon to the search field** rather than relying solely on placeholder text.
8. **Consider adding a persistent bottom navigation bar on mobile** with Home, Search, Cart, and Account for improved navigation efficiency.
9. **Conduct a full WCAG 2.1 AA accessibility audit** given the target demographic of elderly and disabled users.
