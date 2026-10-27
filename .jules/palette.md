## 2023-10-27 - Accessible Hover-Revealed UI Elements
**Learning:** Hover-revealed interactive UI elements that rely on Tailwind's `group-hover:opacity-100` are inaccessible to keyboard users unless explicitly paired with focus states.
**Action:** Always pair `group-hover:opacity-100` on containers with `focus-within:opacity-100` (or `focus-visible:opacity-100` on the button itself) to ensure elements become visible and navigable when receiving keyboard focus.
