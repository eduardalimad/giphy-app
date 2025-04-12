<template>
  <q-page class="p-4 flex flex-col gap-4">
    <h4 class="text-blue-10">GIFs Trending</h4>
    <div class="bg-white w-full min-h-screen p-8 rounded-lg shadow-md">
      <SearchBar :chips="filterChips" @search="searchGifs" @reset="resetSearch" />
      <h5 class="text-blue-10 mt-4 pb-5">
        Trending Now <q-icon name="trending_up" color="blue-10" size="md" class="q-ml-sm" />
      </h5>
      <div v-if="isLoading" class="flex flex items-center justify-center h-100 w-full">
        <q-spinner color="primary" size="md" class="mb-4" />
      </div>
      <div v-if="!isLoading" class="flex flex-wrap justify-evenly gap-8 w-full">
        <p v-if="cards.length === 0" class="text-center text-gray-500">Nenhum GIF encontrado</p>
        <GifCardList :cards="cards" />
      </div>

      <div v-if="canLoadMore" class="flex justify-center mt-4">
        <q-btn label="Buscar Mais GIFs" color="primary" @click="loadMoreGifs" />
      </div>

      <div v-if="isLoadingMore" class="flex justify-center mt-4">
        <q-spinner color="primary" size="md" />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
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
const isLoadingMore = ref(false);
const limit = ref<number>(250);
const pageIndex = ref<number>(0);
const totalCount = ref<number>(0);

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

    totalCount.value = response.pagination.total_count;

    if (currentPage === 0) {
      cards.value = response.data;
      initialCards.value = response.data;
    } else {
      cards.value.push(...response.data);
    }
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
  pageIndex.value = 0;

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

const loadMoreGifs = async () => {
  const isBusy = isLoadingMore.value || isLoading.value || searchTerm.value;
  const reachedEnd = pageIndex.value + 1 >= Math.ceil(totalCount.value / limit.value);

  if (isBusy || reachedEnd) return;

  isLoadingMore.value = true;

  try {
    const nextPage = ++pageIndex.value;
    const { data } = await getTrendingGifs(limit.value, nextPage);
    cards.value.push(...data);
  } catch (err) {
    console.error('Erro ao carregar mais GIFs:', err);
  } finally {
    isLoadingMore.value = false;
  }
};
const canLoadMore = computed(() => {
  const totalPages = Math.ceil(totalCount.value / limit.value);
  return (
    !isLoading.value &&
    !searchTerm.value &&
    cards.value.length > 0 &&
    pageIndex.value + 1 < totalPages
  );
});
</script>
