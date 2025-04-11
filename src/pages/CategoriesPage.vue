<template>
  <q-page class="p-4 flex flex-col gap-4">
    <h4 class="text-blue-10">Categorias</h4>

    <div class="bg-white w-full min-h-screen p-8 rounded-lg shadow-md">
      <q-spinner v-if="isLoading" color="primary" size="md" class="q-mb-md" />

      <div v-if="!isLoading && !selectedCategory">
        <div class="flex flex-wrap gap-4 mt-4">
          <div
            v-for="(item, id) in categories"
            :key="id"
            class="cursor-pointer"
            style="min-width: 238px"
            @click="selectCategory(item.subcategories)"
          >
            <q-card class="relative w-60 h-40 overflow-hidden">
              <img
                :src="item.gif.images.downsized_medium.url"
                alt="Background"
                class="absolute inset-0 w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span class="text-white text-lg font-semibold">{{ item.name }}</span>
              </div>
            </q-card>
          </div>
        </div>
      </div>

      <div v-else-if="selectedCategory">
        <div class="mb-4 flex items-center gap-2">
          <q-btn flat icon="arrow_back" label="Voltar" @click="selectedCategory = null" />
        </div>

        <div class="flex flex-wrap gap-4">
          <div v-for="(gif, idx) in selectedCategory" :key="idx" class="w-full sm:w-60">
            <q-card class="w-full h-60 overflow-hidden relative">
              <!-- <img
                :src="gif.images.downsized_medium.url"
                alt="Gif"
                class="absolute inset-0 w-full h-full object-cover"
              /> -->
              <div class="absolute bottom-0 w-full bg-black/40 text-white px-2 py-1 text-sm">
                {{ gif.name || 'Sem título' }}
              </div>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { getCategories } from 'src/api/endpoints';
import { onMounted, ref } from 'vue';

const isLoading = ref(false);

const categories = ref([]);
const selectedCategory = ref(null);

onMounted(async () => {
  await fetchTrending();
});

const fetchTrending = async () => {
  isLoading.value = true;
  try {
    const response = await getCategories();
    categories.value = response.data;
    // initialCards.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar GIFs em alta:', error);
  } finally {
    isLoading.value = false;
  }
};
const selectCategory = (item: any) => {
  selectedCategory.value = item;
};
</script>
<style scoped></style>
