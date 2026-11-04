## 2024-11-04 - Accessible Hover-Revealed UI Elements
**Learning:** Elements revealed on hover using Tailwind's `group-hover:opacity-100` are invisible to keyboard users when focused, resulting in inaccessible interactive elements (like icon buttons on product cards).
**Action:** Pair `group-hover` with `focus-within:opacity-100` (on the container) or `focus-visible:opacity-100` (directly on the element) to ensure hover-revealed UI becomes visible when receiving keyboard focus.
