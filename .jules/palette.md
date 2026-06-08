## 2024-06-08 - [Invisible Focus Trap on Hover Overlays]
**Learning:** Elements visually hidden using `group-hover:opacity-0` (e.g., interactive overlays on Product Cards) remain focusable via keyboard, creating an 'invisible focus' accessibility trap.
**Action:** Always add `focus-within:translate-y-0 focus-within:opacity-100` to the parent container and `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand` styles to the interactive children to ensure proper keyboard accessibility.
