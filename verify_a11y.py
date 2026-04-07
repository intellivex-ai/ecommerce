import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1280, "height": 800})

        # Go to local server
        await page.goto('http://localhost:3000')

        # Wait for the global loading screen to disappear
        print("Waiting for loading screen...")
        try:
            await page.wait_for_selector('text="BOOTING SUB-SYSTEMS & PROTOCOLS"', state="hidden", timeout=10000)
        except Exception as e:
            print(f"Loading screen wait exception (ignoring): {e}")
            pass

        # Explicitly wait until the loading screen is unmounted by waiting for the navbar to appear
        print("Waiting for Navbar...")
        await page.wait_for_selector('nav', state="visible", timeout=15000)

        print("\n--- Verifying ARIA Labels ---")

        # Check Mobile Menu (requires resizing to mobile view)
        await page.set_viewport_size({"width": 375, "height": 812})
        await page.wait_for_timeout(1000) # give time to re-render

        menu_btn = await page.query_selector('button[aria-label="Open mobile menu"]')
        if menu_btn:
            print("✅ Mobile menu button has correct aria-label")
        else:
            print("❌ Mobile menu button missing aria-label")

        await page.set_viewport_size({"width": 1280, "height": 800})
        await page.wait_for_timeout(1000)

        # Check Search
        search_btn = await page.query_selector('button[aria-label="Open search"]')
        if search_btn:
            print("✅ Search button has correct aria-label")
        else:
            print("❌ Search button missing aria-label")

        # Check Account
        account_btn = await page.query_selector('a[aria-label="My Account"]')
        if account_btn:
            print("✅ Account link has correct aria-label")
        else:
            print("❌ Account link missing aria-label")

        # Check Cart
        cart_btn = await page.query_selector('button[aria-label^="Shopping cart"]')
        if cart_btn:
            aria_label = await cart_btn.get_attribute("aria-label")
            print(f"✅ Cart button has correct aria-label: {aria_label}")
        else:
            print("❌ Cart button missing aria-label")

        # Optional verification: also take screenshots to manually verify
        import os
        os.makedirs('/home/jules/verification/screenshots', exist_ok=True)
        await page.screenshot(path="/home/jules/verification/screenshots/navbar_aria.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
