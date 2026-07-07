## 2024-07-07 - Accessible Hover-Overlay Pattern
**Learning:** Found that interactive elements inside hover-only overlays (like `opacity-0 group-hover:opacity-100`) are invisible to keyboard users when focused.
**Action:** Always pair hover visibility classes with `focus-within:opacity-100` on the container and `focus-visible:opacity-100` on the elements to ensure keyboard accessibility.
