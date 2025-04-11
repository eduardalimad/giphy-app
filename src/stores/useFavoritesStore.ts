import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';
import { ref } from 'vue';

const FAVORITES_KEY = 'favorites';

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref<Set<string>>(new Set());

  function loadFavorites() {
    const saved: string[] = LocalStorage.getItem(FAVORITES_KEY) || [];
    favorites.value = new Set(saved);
  }

  function toggleFavorite(id: string) {
    if (favorites.value.has(id)) {
      favorites.value.delete(id);
    } else {
      favorites.value.add(id);
    }
    saveFavorites();
  }

  function isFavorite(id: string): boolean {
    return favorites.value.has(id);
  }

  function saveFavorites() {
    LocalStorage.set(FAVORITES_KEY, Array.from(favorites.value));
  }

  return {
    favorites,
    loadFavorites,
    toggleFavorite,
    isFavorite,
    saveFavorites,
  };
});
