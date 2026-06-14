## 2025-06-14 - Invisible Focus Trap Pattern
**Learning:** Elements visually hidden using `group-hover:opacity-0` (e.g., interactive overlays on Product Cards) remain focusable via keyboard, creating an 'invisible focus' accessibility trap.
**Action:** Always add `focus-within:translate-y-0 focus-within:opacity-100` to the parent container and `focus-visible` styles to the interactive children to ensure proper keyboard accessibility.
