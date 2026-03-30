#!/usr/bin/env python3
"""Capture all screenshots for aanbod.goed.be visual analysis."""

import sys
import os
sys.path.insert(0, os.path.expanduser("~/.claude/skills/seo/scripts"))
from capture_screenshot import capture_screenshot

SCREENSHOTS_DIR = "/root/seo-audit-aanbod-goed-be/screenshots"
os.makedirs(SCREENSHOTS_DIR, exist_ok=True)

pages = {
    "homepage": "https://aanbod.goed.be",
    "category": "https://aanbod.goed.be/nl/producten/mobiliteit",
}

# First, capture homepage and category for both viewports
for name, url in pages.items():
    for viewport in ["desktop", "mobile"]:
        output = os.path.join(SCREENSHOTS_DIR, f"{name}_{viewport}.png")
        print(f"Capturing {name} ({viewport})...")
        result = capture_screenshot(url, output, viewport=viewport, full_page=False, timeout=45000)
        if result["success"]:
            print(f"  OK: {output}")
        else:
            print(f"  FAIL: {result['error']}")

# Now find a product page link from the category page
from playwright.sync_api import sync_playwright

product_url = None
print("\nFinding a product page link...")
try:
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1920, "height": 1080})
        page.goto("https://aanbod.goed.be/nl/producten/mobiliteit", wait_until="networkidle", timeout=45000)
        page.wait_for_timeout(2000)

        # Try to find product links
        links = page.query_selector_all("a[href*='/nl/producten/']")
        for link in links:
            href = link.get_attribute("href")
            if href and "/mobiliteit/" in href and href != "/nl/producten/mobiliteit":
                product_url = href if href.startswith("http") else f"https://aanbod.goed.be{href}"
                break

        # If not found, try broader search
        if not product_url:
            links = page.query_selector_all("a[href]")
            for link in links:
                href = link.get_attribute("href")
                if href and "/nl/producten/" in href and href.count("/") > 3:
                    product_url = href if href.startswith("http") else f"https://aanbod.goed.be{href}"
                    break

        # Dump some info for debugging
        if not product_url:
            all_links = page.query_selector_all("a[href]")
            print(f"  Found {len(all_links)} total links on page")
            for link in all_links[:30]:
                href = link.get_attribute("href")
                if href and "product" in href.lower():
                    print(f"    {href}")

        browser.close()
except Exception as e:
    print(f"  Error finding product: {e}")

if product_url:
    print(f"  Product URL: {product_url}")
    for viewport in ["desktop", "mobile"]:
        output = os.path.join(SCREENSHOTS_DIR, f"product_{viewport}.png")
        print(f"Capturing product ({viewport})...")
        result = capture_screenshot(product_url, output, viewport=viewport, full_page=False, timeout=45000)
        if result["success"]:
            print(f"  OK: {output}")
        else:
            print(f"  FAIL: {result['error']}")
else:
    print("  Could not find a product page URL, trying alternate approach...")
    # Try a full-page capture of category to find products
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1920, "height": 1080})
        page.goto("https://aanbod.goed.be/nl/producten/mobiliteit", wait_until="networkidle", timeout=45000)
        page.wait_for_timeout(2000)

        # Get page content for analysis
        content = page.content()
        # Find any detail/product links
        import re
        hrefs = re.findall(r'href="([^"]*)"', content)
        product_hrefs = [h for h in hrefs if '/nl/' in h and h.count('/') >= 4 and 'product' in h.lower()]
        print(f"  Regex found product-like hrefs: {product_hrefs[:10]}")

        # Also try clicking on first product card if any
        cards = page.query_selector_all(".product-card, .card, [class*='product'], [class*='item']")
        print(f"  Found {len(cards)} card-like elements")

        browser.close()

# Also capture full-page versions for deeper analysis
for name, url in [("homepage", "https://aanbod.goed.be")]:
    for viewport in ["desktop", "mobile"]:
        output = os.path.join(SCREENSHOTS_DIR, f"{name}_{viewport}_full.png")
        print(f"Capturing {name} full page ({viewport})...")
        result = capture_screenshot(url, output, viewport=viewport, full_page=True, timeout=45000)
        if result["success"]:
            print(f"  OK: {output}")
        else:
            print(f"  FAIL: {result['error']}")

print("\nDone!")
