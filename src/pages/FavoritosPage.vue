<template>
  <q-page class="p-4 flex flex-col gap-4">
    <h4 class="text-blue-10">Favoritos</h4>
    <div
      class="bg-white w-full min-h-screen p-6 md:p-8 rounded-xl shadow-md flex flex-wrap items-start"
    >
      <div v-if="isLoading" class="flex flex items-center justify-center h-screen w-full">
        <q-spinner color="primary" size="md" class="mb-4" />
      </div>
      <div v-else class="flex flex-wrap justify-evenly gap-8 w-full">
        <div v-if="favorites.length === 0" class="text-center text-gray-500">
          Nenhum favorito encontrado.
        </div>
        <GifCardList v-else :cards="favorites" />
      </div>
    </div>
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
const isLoading = ref(false);

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
    isLoading.value = true;
    const data = await getFavoriteGifs(idsParam);
    favorites.value = data.data;
  } catch (error) {
    console.error('Erro ao buscar GIFs favoritos:', error);
  } finally {
    isLoading.value = false;
  }
};
watch(
  () => Array.from(favoritesStore.favorites),
  (newFavs) => {
    favorites.value = favorites.value.filter((card: Card) => newFavs.includes(card.id));
  },
);
</script>
