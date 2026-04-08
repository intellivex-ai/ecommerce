## 2024-03-24 - Accessibility for Icon Buttons with Indicator Badges
**Learning:** When creating icon buttons that contain dynamic indicator badges (like a shopping cart item count), screen readers can redundantly announce the floating numbers if not handled properly.
**Action:** Always apply `aria-hidden="true"` to the indicator badge element itself. Place the full, descriptive text (e.g., "Shopping cart with X items") in the parent button's `aria-label` attribute. This ensures a clean, single announcement for screen reader users across the entire app.
