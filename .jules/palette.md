## 2024-05-18 - Hover-Revealed UI Keyboard Accessibility
**Learning:** Hover-revealed interactive elements (like Quick Add or Wishlist on ProductCard) that rely on `group-hover:opacity-100` are completely invisible/inaccessible to keyboard navigation.
**Action:** Always pair `group-hover:opacity-100` with `focus-within:opacity-100` on the container or `focus-visible:opacity-100` on the button directly to ensure keyboard navigability.
