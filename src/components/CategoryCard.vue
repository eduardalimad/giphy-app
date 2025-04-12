<template>
  <q-card
    class="my-card responsive-card relative overflow-hidden group cursor-pointer"
    @click="handleClick"
  >
    <div class="relative w-full h-48">
      <q-skeleton
        v-if="!loadedImages[props.item.gif.id]"
        class="absolute w-full h-full z-0 rounded-borders"
      />
      <img
        :src="item.gif.images.downsized_medium.url"
        :alt="item.name"
        loading="lazy"
        class="w-full h-full object-cover transition-opacity duration-500"
        :class="{
          'opacity-0': !loadedImages[props.item.gif.id],
          'opacity-100': loadedImages[props.item.gif.id],
        }"
        @load="handleImageLoad"
      />
      <div
        class="absolute inset-0 bg-black/40 flex items-center justify-center z-20 transition-opacity duration-500"
        :class="{
          'opacity-0': !loadedImages[props.item.gif.id],
          'opacity-100': loadedImages[props.item.gif.id],
        }"
      >
        <span class="text-white text-lg font-semibold text-center px-2">
          {{ item.name }}
        </span>
      </div>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { SubCategoryItem } from '../types/giphy';

const props = defineProps({
  item: {
    type: Object as () => SubCategoryItem,
    required: true,
  },
});

const emit = defineEmits(['select-category']);

const loadedImages = ref<{ [key: string]: boolean }>({});

const handleClick = () => {
  emit('select-category', props.item.name_encoded);
};

const handleImageLoad = () => {
  loadedImages.value[props.item.gif.id] = true;
};
</script>
