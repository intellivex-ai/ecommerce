## 2025-03-03 - Keyboard Accessibility for Hover-Revealed Elements
**Learning:** Hover-revealed interactive UI elements (like Quick Add or Wishlist buttons on Product Cards) that rely solely on Tailwind's `group-hover:opacity-100` are completely inaccessible to keyboard users because they never become visible when focused via the Tab key.
**Action:** Always explicitly pair hover states with `focus-visible:opacity-100` directly on the button, or use `group-focus-within:opacity-100` on the hover container to ensure interactive elements become visible and usable when receiving keyboard focus.
