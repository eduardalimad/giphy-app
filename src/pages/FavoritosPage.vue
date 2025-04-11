<template>
  <q-page class="p-4 flex flex-col gap-4">
    <h4 class="text-blue-10">Favoritos</h4>
    <div class="bg-white w-full min-h-screen p-8 rounded-lg shadow-md">
      <GifCardList :cards="favorites" />
    </div>
    <div v-if="favorites.length === 0" class="text-gray-300">Nenhum GIF favorito ainda!</div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import type { Card } from '../types/giphy';
import GifCardList from '../components/GifCardList.vue';
import { useFavoritesStore } from '../stores/useFavoritesStore';
import { getFavoriteGifs } from 'src/api/endpoints';

const favoritesStore = useFavoritesStore();
const favorites = ref<Card[]>([]);

onMounted(() => {
  favoritesStore.loadFavorites();
  void fetchFavoriteGifs();
});
const fetchFavoriteGifs = async () => {
  const ids = Array.from(favoritesStore.favorites);

  if (ids.length === 0) {
    favorites.value = [];
    return;
  }

  const idsParam = ids.join(',');

  try {
    const data = await getFavoriteGifs(idsParam);
    favorites.value = data.data;
  } catch (error) {
    console.error('Erro ao buscar GIFs favoritos:', error);
  }
};
watch(
  () => Array.from(favoritesStore.favorites),
  (newFavs) => {
    favorites.value = favorites.value.filter((card: Card) => newFavs.includes(card.id));
  },
);
</script>
