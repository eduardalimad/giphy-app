<template>
  <div class="bg-white flex flex-wrap justify-between gap-4 mt-4" style="min-width: 238px">
    <q-card
      v-for="card in localCards"
      :key="card.id"
      class="my-card responsive-card relative overflow-hidden group"
      bordered
    >
      <div class="relative w-full h-48">
        <q-skeleton
          v-if="!loadedImages[card.id]"
          class="absolute w-full h-full z-0 rounded-borders"
        />
        <img
          :src="card.images.original.url"
          :alt="card.alt_text || card.title"
          loading="lazy"
          class="w-full h-48 object-cover relative z-10 transition-opacity duration-500"
          :class="{ 'opacity-0': !loadedImages[card.id], 'opacity-100': loadedImages[card.id] }"
          @load="handleImageLoad(card.id)"
        />
      </div>

      <div
        class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20"
      >
        <q-btn
          flat
          round
          icon="favorite"
          :color="isFavorite(card.id) ? 'red' : 'grey'"
          @click="toggleFavorite(card.id)"
        />
      </div>

      <div
        class="absolute bottom-0 left-0 w-full bg-black bg-opacity-90 text-white text-sm text-center p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
      >
        {{ card.title }}
      </div>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import type { Card } from '../types/giphy';
import { useFavoritesStore } from '../stores/useFavoritesStore';
import { shallowRef, watchEffect, ref } from 'vue';

const props = defineProps<{
  cards: Card[];
}>();

const favoritesStore = useFavoritesStore();
const localCards = shallowRef<Card[]>([]);
const loadedImages = ref<Record<string, boolean>>({});

watchEffect(() => {
  localCards.value = props.cards;
});

const handleImageLoad = (id: string) => {
  loadedImages.value[id] = true;
};

const toggleFavorite = (id: string) => {
  favoritesStore.toggleFavorite(id);
};

const isFavorite = (id: string) => {
  return favoritesStore.isFavorite(id);
};
</script>
