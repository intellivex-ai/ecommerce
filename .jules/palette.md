## 2024-06-11 - Invisible Focus Trap on Hidden Overlays
**Learning:** Elements visually hidden using `group-hover:opacity-0` (like the Action Overlay in ProductCard) remain focusable via keyboard, creating an 'invisible focus' accessibility trap where users don't know where their focus is.
**Action:** Always add `focus-within:translate-y-0 focus-within:opacity-100` to the parent container and `focus-visible:ring-2` styles to the interactive children to ensure proper keyboard accessibility.
