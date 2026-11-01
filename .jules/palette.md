## 2024-11-01 - Keyboard Accessibility on Hover-Revealed UI Elements
**Learning:** Hover-revealed interactive UI elements (like Quick Add or Wishlist buttons on Product Cards) that rely on Tailwind's `group-hover:opacity-100` are inaccessible to keyboard users unless explicitly paired with `focus-within:opacity-100` (on containers) or `focus-visible:opacity-100` (directly on buttons).
**Action:** Always ensure that hover-revealed state changes are paired with corresponding focus states (`focus-visible` or `focus-within`) so keyboard users can access and interact with hidden elements.
