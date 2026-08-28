## 2023-10-25 - Icon-only Navbar Accessibility
**Learning:** Core navigation buttons (Menu, Search, Account, Cart, Close) were using icon-only content without accessible names, and lacked distinct keyboard focus states, making them invisible to screen readers and difficult for keyboard users.
**Action:** Added explicit `aria-label="Open menu"`, `aria-label="Search"`, `aria-label="Account"`, `aria-label="Cart"`, and `aria-label="Close menu"` respectively, along with `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand` classes to ensure they are accessible.
