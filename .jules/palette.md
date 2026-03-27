## 2024-03-27 - ARIA Labels for Icon Buttons with Badges
**Learning:** Screen readers unnecessarily announce floating numbers (like cart badges) redundantly if not properly hidden, while failing to describe the primary action of the button itself if it's icon-only.
**Action:** When creating icon buttons with indicator badges, always apply `aria-hidden="true"` to the badge and place the full descriptive text in the parent button's `aria-label` attribute (e.g., `aria-label="Shopping cart with X items"`).
