## 2024-04-20 - Icon Buttons with Indicators Redundancy
**Learning:** Screen readers announce floating numeric indicators on icon buttons redundantly if not properly hidden. A shopping cart button with a badge might read as "Shopping Bag button... 3" confusingly.
**Action:** Apply `aria-hidden="true"` to both the icon and the indicator badge itself. Place the full descriptive text including the dynamic count (e.g., `aria-label={"Shopping cart with " + count + " items"}`) on the parent button.
