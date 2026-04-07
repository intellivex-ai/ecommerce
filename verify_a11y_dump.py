import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1280, "height": 800})

        # Go to local server
        await page.goto('http://localhost:3000')

        # Force wait until network is strictly idle
        await page.wait_for_load_state("networkidle")
        await page.wait_for_timeout(5000) # give extra time

        html = await page.content()
        with open('debug_dom.html', 'w') as f:
            f.write(html)
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
