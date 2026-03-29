## 2024-03-29 - Accessibility pattern for icon-only buttons with indicator badges
**Learning:** Adding a generic `aria-label` to an icon button (e.g., a shopping cart) while leaving its child indicator badge visible to screen readers results in redundant and disconnected announcements.
**Action:** Always provide the full descriptive text in the parent button's `aria-label` (e.g., "Shopping cart with X items") and hide the child indicator badge from screen readers using `aria-hidden="true"`.
