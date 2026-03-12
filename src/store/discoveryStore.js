import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useDiscoveryStore = create(
  persist(
    (set, get) => ({
      recentlyViewed: [], // Array of product IDs or small product objects
      searchHistory: [],
      
      addRecentlyViewed: (product) => {
        const { recentlyViewed } = get();
        // Keep unique, most recent at the top
        const updated = [
          product,
          ...recentlyViewed.filter((p) => p.id !== product.id)
        ].slice(0, 10); // Limit to 10 items
        
        set({ recentlyViewed: updated });
      },

      addSearchTerm: (term) => {
        const { searchHistory } = get();
        if (!term.trim()) return;
        const updated = [
          term.trim(),
          ...searchHistory.filter((t) => t.toLowerCase() !== term.trim().toLowerCase())
        ].slice(0, 5);
        set({ searchHistory: updated });
      },

      clearHistory: () => set({ searchHistory: [], recentlyViewed: [] }),
    }),
    {
      name: 'velocity-discovery-storage',
    }
  )
);

export default useDiscoveryStore;
