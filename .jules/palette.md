## 2024-05-24 - Invisible Focus Traps on Interactive Cards
**Learning:** Elements visually hidden with `group-hover:opacity-0` (like interactive overlays on product cards) remain in the DOM and are focusable via keyboard, creating an 'invisible focus' accessibility trap where users can't see what they're focused on.
**Action:** Always add `focus-within:translate-y-0 focus-within:opacity-100` to the parent container of hidden interactive elements, and `focus-visible` styles to the interactive children to ensure proper keyboard accessibility.
