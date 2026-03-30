from playwright.sync_api import sync_playwright

def run_cuj(page):
    # Wait for the main page to load
    page.goto("http://localhost:5173/shop")

    # Wait for skeleton loaders to resolve (Displaying X products)
    page.wait_for_selector('text=Displaying')
    page.wait_for_timeout(1000)

    # Click a category filter
    page.get_by_role("button", name="Running").click()
    page.wait_for_timeout(1000)

    # Click a color filter
    page.locator("button[title='Black']").click()
    page.wait_for_timeout(1000)

    # Adjust price slider
    slider = page.locator("input[type='range']")
    slider.fill("150")
    page.wait_for_timeout(1000)

    # Take screenshot at the key moment
    page.screenshot(path="/home/jules/verification/screenshots/shop_filters.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    import os
    os.makedirs("/home/jules/verification/screenshots", exist_ok=True)
    os.makedirs("/home/jules/verification/videos", exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos",
            viewport={"width": 1280, "height": 800}
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
