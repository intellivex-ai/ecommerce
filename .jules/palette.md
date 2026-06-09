## 2024-06-09 - Invisible Focus Trap on Product Cards
**Learning:** Elements visually hidden using `group-hover:opacity-0` (like interactive overlays on Product Cards) remain focusable via keyboard navigation, creating an "invisible focus trap" where users tab to elements they cannot see.
**Action:** Always add `focus-within:translate-y-0 focus-within:opacity-100` to the parent container of such elements, and `focus-visible` styles (`focus-visible:ring-2`, `focus-visible:opacity-100`) to the interactive children to ensure proper keyboard accessibility.
