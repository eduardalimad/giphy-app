<template>
  <q-page class="p-4 flex flex-col gap-4">
    <h4 class="text-blue-10 text-2xl font-semibold">{{ titlePage }}</h4>

    <div class="bg-white w-full min-h-screen p-6 md:p-8 rounded-xl shadow-md">
      <div v-if="isLoading" class="flex flex items-center justify-center h-screen">
        <q-spinner color="primary" size="md" />
      </div>

      <div v-else>
        <div v-if="!selectedCategory">
          <div
            v-if="categories.length"
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4"
          >
            <CategoryCard
              v-for="(item, id) in categories"
              :key="id"
              :item="item"
              @select-category="selectCategory"
            />
          </div>
          <div v-else class="text-center text-gray-500">Nenhuma categoria encontrada.</div>
        </div>

        <div v-else>
          <div class="mb-4">
            <q-btn flat icon="arrow_back" label="Voltar" @click="goBack" />
          </div>

          <div
            v-if="itensDados.length"
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            <CategoryCard v-for="(dados, id) in itensDados" :key="id" :item="dados" />
          </div>
          <div v-else class="text-center text-gray-500">Nenhum GIF encontrado nesta categoria.</div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getCategories, getSubCategories } from 'src/api/endpoints';
import type { SubCategoryItem } from '../types/giphy';
import CategoryCard from '../components/CategoryCard.vue';

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
