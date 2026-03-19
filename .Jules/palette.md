## 2026-03-19 - Dynamic ARIA Labels for Icon Badges
**Learning:** Adding indicator badges (like cart item counts) to icon-only buttons causes screen readers to redundantly announce floating numbers if not handled properly.
**Action:** Always apply `aria-hidden="true"` to the indicator badge itself and include the full, dynamic descriptive text (e.g., "Shopping cart with X items") directly in the parent button's `aria-label`.
