1. **Analyze `src/pages/Shop.jsx`:** The `filtered` variable is calculated on every render by filtering and sorting the `products` array.
2. **Identify Bottleneck:** This array manipulation (`.filter().filter().sort()`) happens on every render of the `Shop` component, even if the related state (`selectedCat`, `priceMax`, `sort`, `products`) hasn't changed. This can cause unnecessary performance overhead, especially as the number of products grows.
3. **Implement Optimization:** Use React's `useMemo` hook to memoize the `filtered` array calculation. This ensures the expensive filtering and sorting logic only runs when its dependencies (`products`, `selectedCat`, `priceMax`, `sort`) change.
4. **Pre-commit checks:** Run linter and perform necessary testing to ensure functionality is preserved.
5. **Create PR:** Submit the change with clear documentation of the performance improvement.
