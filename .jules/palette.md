## 2024-05-24 - Hover-Revealed UI Accessibility
**Learning:** Hover-revealed interactive UI elements that rely on Tailwind's `group-hover:opacity-100` are inaccessible to keyboard users.
**Action:** Always explicitly pair `group-hover` with `focus-within:opacity-100` (on containers) or `focus-visible:opacity-100` (directly on buttons) to ensure they become visible when receiving keyboard focus.
