<template>
  <q-page class="p-4">
    <h2 class="text-gray-300">Meus Favoritos</h2>
    <div v-if="favorites.length" class="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <div v-for="gif in favorites" :key="gif.id" class="bg-gray-900 p-2 rounded">
        <img :src="gif.images.fixed_height.url" :alt="gif.title" class="w-full rounded" />
        <q-btn flat icon="delete" color="red" @click="removeFavorite(gif.id)" />
      </div>
    </div>
    <div v-else class="text-gray-300">Nenhum GIF favorito ainda!</div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { LocalStorage } from 'quasar';

interface Gif {
  id: string;
  title: string;
  images: {
    fixed_height: {
      url: string;
    };
  };
}

const favorites = ref<Gif[]>([]);

const loadFavorites = () => {
  const saved: Gif[] = LocalStorage.getItem('favorites') || [];
  favorites.value = saved;
};

const removeFavorite = (id: string) => {
  favorites.value = favorites.value.filter((g) => g.id !== id);
  LocalStorage.set('favorites', favorites.value);
};

onMounted(loadFavorites);
</script>
