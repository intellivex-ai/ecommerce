
## 2024-05-24 - Accessibility Enhancements for Icon Buttons
**Learning:** Icon-only buttons (such as search, cart, and mobile menu toggles) are inaccessible to screen reader users without explicit textual descriptors. Furthermore, interactive components relying on badges (like cart counts) need those badges hidden from screen readers if the value is already summarized in the parent element's ARIA label, preventing redundant announcements.
**Action:** When working on navigation or icon-centric components, prioritize adding `aria-label` to buttons, `aria-expanded` for toggles, and `aria-hidden="true"` to decorative inner SVGs and redundant badges. If a badge dynamically updates, include the state within the `aria-label` (e.g., `aria-label={count > 0 ? \`Cart, ${count} items\` : "Cart"}`).
