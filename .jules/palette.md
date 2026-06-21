## 2024-06-21 - Invisible Focus Trap Pattern
**Learning:** Elements visually hidden using `group-hover:opacity-0` (like interactive overlays on Product Cards) remain in the DOM and are focusable via keyboard, creating an "invisible focus" trap where keyboard users tab into elements they cannot see.
**Action:** When implementing hover-revealed interactive UI, always use `focus-within:translate-y-0 focus-within:opacity-100` on the parent container and `focus-visible:ring-2` on the interactive children to ensure they become visible when focused via keyboard.
