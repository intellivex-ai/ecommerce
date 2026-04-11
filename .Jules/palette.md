## 2026-04-11 - Cart Indicator Accessibility Pattern
**Learning:** When creating icon buttons with indicator badges (such as a cart item count), screen readers will announce the floating numbers redundantly if not properly hidden.
**Action:** Apply `aria-hidden="true"` to the badge and place the full, descriptive text (e.g., "Shopping cart with X items") in the parent button's `aria-label`.
