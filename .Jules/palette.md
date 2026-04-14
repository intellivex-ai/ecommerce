## 2026-04-14 - Accessible Icon Buttons with Indicator Badges
**Learning:** When creating icon buttons with indicator badges (such as a cart item count), the floating numbers can be announced redundantly or without context by screen readers if not properly handled.
**Action:** Apply `aria-hidden="true"` to both the decorative icon and the numerical badge itself. Place the full, descriptive text (e.g., "Shopping cart with X items") in the parent button's `aria-label`.
