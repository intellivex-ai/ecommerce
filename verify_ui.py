from playwright.sync_api import sync_playwright
import os

def run():
    os.makedirs('/home/jules/verification/screenshots', exist_ok=True)
    os.makedirs('/home/jules/verification/videos', exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Configure context for video recording
        context = browser.new_context(
            record_video_dir='/home/jules/verification/videos',
            record_video_size={"width": 1280, "height": 720}
        )
        page = context.new_page()

        # Go to Shop page
        page.goto('http://localhost:3000/shop')
        page.wait_for_load_state("networkidle")

        # Take a screenshot to verify UI loads correctly without errors
        page.screenshot(path='/home/jules/verification/screenshots/shop_page.png')

        # Go to Home page
        page.goto('http://localhost:3000/')
        page.wait_for_load_state("networkidle")

        # Take a screenshot to verify UI loads correctly without errors
        page.screenshot(path='/home/jules/verification/screenshots/home_page.png')

        context.close()
        browser.close()

if __name__ == '__main__':
    run()
