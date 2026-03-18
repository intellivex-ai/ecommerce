## 2024-03-12 - Missing Global ARIA Labels
**Learning:** Found that core global layout elements like navigation icon buttons (Menu, Search, Account, Cart) lacked `aria-label` attributes. This breaks the foundational accessibility of the entire app for screen reader users, who rely on these buttons to navigate.
**Action:** Always ensure that any icon-only button, especially those in high-traffic global components like `Navbar` and `Footer`, has a descriptive `aria-label` attribute (e.g., `aria-label="Search products"`).
