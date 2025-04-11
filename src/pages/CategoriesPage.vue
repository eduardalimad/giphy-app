<template>
  <q-page class="p-4 flex flex-col gap-4">
    <h4 class="text-blue-10 text-2xl font-semibold">{{ titlePage }}</h4>

    <div class="bg-white w-full min-h-screen p-6 md:p-8 rounded-xl shadow-md">
      <q-spinner v-if="isLoading" color="primary" size="md" class="mb-4" />

      <div v-if="!isLoading && !selectedCategory">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          <div
            v-for="(item, id) in categories"
            :key="id"
            @click="selectCategory(item.name_encoded)"
            class="cursor-pointer"
          >
            <q-card class="relative h-40 overflow-hidden hover:scale-[1.02] transition-transform">
              <img
                :src="item.gif.images.downsized_medium.url"
                alt="Categoria"
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span class="text-white text-lg font-semibold text-center px-2">{{
                  item.name
                }}</span>
              </div>
            </q-card>
          </div>
        </div>
      </div>

      <div v-else-if="selectedCategory">
        <div class="mb-4">
          <q-btn flat icon="arrow_back" label="Voltar" @click="goBack" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div v-for="(dados, id) in itensDados" :key="id">
            <q-card class="relative h-40 overflow-hidden hover:scale-[1.02] transition-transform">
              <img
                :src="dados.gif.images.preview_gif.url"
                alt="GIF"
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span class="text-white text-lg font-semibold text-center px-2">{{
                  dados.name
                }}</span>
              </div>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { getCategories, getSubCategories } from 'src/api/endpoints';
import { onMounted, ref } from 'vue';
import type { SubCategoryItem } from '../types/giphy';

const isLoading = ref(false);
const categories = ref<SubCategoryItem[]>([]);
const selectedCategory = ref<string>('');
const itensDados = ref<SubCategoryItem[]>([]);
const titlePage = ref('Categorias');

onMounted(async () => {
  await fetchTrending();
});

const fetchTrending = async () => {
  isLoading.value = true;
  try {
    const response = await getCategories();
    categories.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
  } finally {
    isLoading.value = false;
  }
};

const fetchSubCategory = async (id: string) => {
  isLoading.value = true;
  try {
    const response = await getSubCategories(id);
    itensDados.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar GIFs:', error);
  } finally {
    isLoading.value = false;
  }
};

const goBack = () => {
  selectedCategory.value = '';
  titlePage.value = 'Categorias';
};

const selectCategory = (nameCode: string) => {
  selectedCategory.value = nameCode;
  titlePage.value = nameCode.charAt(0).toUpperCase() + nameCode.slice(1);
  void fetchSubCategory(nameCode);
};
</script>
