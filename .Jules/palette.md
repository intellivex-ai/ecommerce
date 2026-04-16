## 2024-04-16 - Accessible Icon Buttons with Badges
**Learning:** When creating icon-only buttons with indicator badges (like a shopping cart item count), screen readers often announce both the button and the floating number redundantly or out of context. The badge itself is decorative/informational but confusing when read sequentially without context.
**Action:** Apply `aria-hidden="true"` to both the decorative icon AND the numerical badge element. Provide the full, contextual description in the parent button's `aria-label` (e.g., "Shopping cart with 3 items").
