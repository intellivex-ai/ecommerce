## 2025-02-23 - Screen Reader Accessibility for Cart Badges
**Learning:** Floating number badges on icon buttons (like a cart item count) are announced confusingly out of context by screen readers if left as-is.
**Action:** Always apply `aria-hidden="true"` to the numerical badge itself, and place the full, descriptive text (e.g., "Shopping cart with X items") in the parent button's `aria-label` to ensure context and prevent redundant reading.
