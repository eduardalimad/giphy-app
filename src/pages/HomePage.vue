<template>
  <q-page class="p-4 flex flex-col gap-4">
    <h4 class="text-blue-10">GIFs Trending</h4>
    <div class="bg-white w-full min-h-screen p-8 rounded-lg shadow-md">
      <SearchBar :chips="filterChips" @search="searchGifs" @reset="resetSearch" />
      <h5 class="text-blue-10 mt-4">Trending Now</h5>
      <q-spinner v-if="isLoading" color="primary" size="md" class="q-mb-md" />
      <div v-if="!isLoading">
        <p v-if="cards.length === 0" class="text-center text-gray-500">Nenhum GIF encontrado</p>
        <GifCardList :cards="cards" />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import type { Card } from '../types/giphy';
import { useFavoritesStore } from '../stores/useFavoritesStore';
import GifCardList from '../components/GifCardList.vue';
import SearchBar from '../components/SearchBar.vue';
import { getTrending, getTrendingGifs, searchTerms } from '../api/endpoints';

const favoritesStore = useFavoritesStore();

const cards = ref<Card[]>([]);
const filterChips = ref<string[]>([]);
const searchTerm = ref('');
const initialCards = ref<Card[]>([]);
const isLoading = ref(false);
const limit = ref<number>(25);
const pageIndex = ref<number>(0);

onMounted(async () => {
  await loadInitialData();
});

watch(
  () => favoritesStore.favorites,
  () => updateFavorites(),
);

const loadInitialData = async () => {
  favoritesStore.loadFavorites();
  await fetchTrending(limit.value, pageIndex.value);
  await trendingSearchTerms();
};

const fetchTrending = async (itemsPerPage: number, currentPage: number) => {
  isLoading.value = true;
  try {
    const response = await getTrendingGifs(itemsPerPage, currentPage);
    cards.value = response.data;
    initialCards.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar GIFs em alta:', error);
  } finally {
    isLoading.value = false;
  }
};

const trendingSearchTerms = async () => {
  try {
    const response = await getTrending();
    filterChips.value = response.data;
  } catch (error) {
    console.error('Erro ao carregar termos de busca em alta:', error);
  }
};

const updateFavorites = () => {
  cards.value = cards.value.map((card: Card) => ({
    ...card,
    isFavorite: favoritesStore.isFavorite(card.id),
  }));
};

const searchGifs = async (term: string) => {
  searchTerm.value = term;
  if (!term) {
    cards.value = initialCards.value;
    return;
  }

  isLoading.value = true;
  try {
    const response = await searchTerms(searchTerm.value, limit.value, pageIndex.value);
    cards.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar GIFs:', error);
  } finally {
    isLoading.value = false;
  }
};

const resetSearch = () => {
  searchTerm.value = '';
  cards.value = initialCards.value;
  isLoading.value = false;
};
</script>
