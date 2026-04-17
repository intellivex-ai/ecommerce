## 2026-04-17 - Dynamic ARIA Labels for Icon Buttons
**Learning:** When using icon-only buttons with numerical badges (like shopping carts), adding `aria-hidden` to both the icon and the badge, and placing the full descriptive text (e.g., "Shopping cart with X items") in the parent button's `aria-label` prevents screen readers from redundantly announcing floating numbers.
**Action:** Always apply `aria-hidden` to child elements of icon-only buttons when relying on the parent's `aria-label` for accessibility context.
