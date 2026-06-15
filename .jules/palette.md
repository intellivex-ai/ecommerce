## 2024-06-15 - Invisible Focus Trap in Hover Overlays
**Learning:** Elements visually hidden using `group-hover:opacity-0` (like product card overlays) remain focusable via keyboard, creating an invisible focus trap where users can tab to interactive elements they cannot see.
**Action:** Always add `focus-within:translate-y-0 focus-within:opacity-100` to the parent container and `focus-visible` styles to interactive children to ensure proper keyboard accessibility and visual focus indicators.
