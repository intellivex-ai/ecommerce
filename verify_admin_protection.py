import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(record_video_dir='/home/jules/verification/videos')
        page = await context.new_page()

        # Navigate to the protected route directly
        await page.goto('http://localhost:3000/admin')

        # Give React state time to initialize and evaluate auth conditions
        await page.wait_for_timeout(3000)

        # Wait for the network to be idle to ensure redirection occurs
        await page.wait_for_load_state("networkidle")

        # Wait for potential global loading screens to disappear if any
        try:
            await page.wait_for_selector('nav', timeout=5000)
        except Exception:
            pass

        # Capture a screenshot showing the user is NOT on the admin page
        await page.screenshot(path='/home/jules/verification/screenshots/admin_redirect.png')
        print("Screenshot captured.")

        # Verify the current URL to confirm redirection
        if '/admin' not in page.url:
            print(f"Success: User was redirected to {page.url}")
        else:
            print("Failure: User remained on the admin page.")

        await context.close()
        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())
