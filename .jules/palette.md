## 2024-05-15 - Invisible Focus Trap on Product Cards
**Learning:** Elements visually hidden using `group-hover:opacity-0` (e.g., interactive overlays and wishlist buttons on Product Cards) remain focusable via keyboard, creating an 'invisible focus' accessibility trap where keyboard users tab into hidden elements.
**Action:** Always add `focus-within:translate-y-0 focus-within:opacity-100` to the parent container and `focus-visible:opacity-100 focus-visible:scale-100` along with visible ring styles to the interactive children to ensure proper keyboard accessibility.
