<template>
  <q-page class="p-4">
    <q-input
      v-model="searchTerm"
      label="Buscar GIF"
      outlined
      debounce="500"
      @update:model-value="searchGifs"
    />
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
      <div v-for="gif in gifs" :key="gif.id" class="bg-gray-900 p-2 rounded">
        <img :src="gif.images.fixed_height.url" :alt="gif.title" class="w-full rounded" />
        <q-btn flat icon="star" @click="addToFavorites(gif)" color="yellow" />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
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

const searchTerm = ref('');
const gifs = ref<Gif[]>([]);

const searchGifs = async () => {
  const apiKey = 'SUA_API_KEY_GIPHY'; // Substitua pela sua chave
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(searchTerm.value)}&limit=20`,
  );
  const data = await response.json();
  gifs.value = data.data;
};

const addToFavorites = (gif: Gif) => {
  const current: Gif[] = LocalStorage.getItem('favorites') || [];
  const updated = [...current, gif].filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i);
  LocalStorage.set('favorites', updated);
};
</script>
