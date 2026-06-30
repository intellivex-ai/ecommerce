## 2024-10-24 - Invisible Focus on Hover Cards
**Learning:** Elements visually hidden with `group-hover:opacity-0` (like interactive overlays on Product Cards) remain focusable via keyboard, creating an 'invisible focus' accessibility trap.
**Action:** Always add `focus-within:translate-y-0 focus-within:opacity-100` to the parent container and `focus-visible` styles to the interactive children to ensure proper keyboard accessibility.
