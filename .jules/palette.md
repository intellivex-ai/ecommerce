## 2024-05-18 - Invisible Focus Traps in Product Cards
**Learning:** Elements visually hidden using `group-hover:opacity-0` (like the Action Overlay in `ProductCard`) remain focusable via keyboard, creating an "invisible focus" trap where users tab into unseen buttons.
**Action:** Always add `focus-within:translate-y-0 focus-within:opacity-100` to the parent overlay container and explicit `focus-visible` ring styles to the interactive children to ensure the UI reveals itself when navigated via keyboard.
