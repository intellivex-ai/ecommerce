## 2024-05-18 - Added ARIA Labels to Icon-Only Navbar Buttons
**Learning:** Found an accessibility issue pattern specific to this app's core navigation components: interactive `button` elements that only contain SVG icons (such as the main menu, search, cart, and user profile) completely lacked `aria-label`s. This makes the primary navigation inaccessible to screen readers.
**Action:** When adding new interactive icons to layout components, always ensure an `aria-label` or visually hidden text is included to describe the action.
