<template>
  <q-layout view="hHh Lpr lFf" class="shadow-2">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>GIF App</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        class="bg-blue-900 text-gray-300 rounded-r-lg border-none"
      >
        <q-list>
          <q-item
            v-for="item in menuItems"
            :key="item.to"
            :to="item.to"
            :exact="item.exact"
            clickable
          >
            <q-item-section avatar>
              <q-icon :name="item.icon" />
            </q-item-section>
            <q-item-section>{{ item.title }}</q-item-section>
          </q-item>
        </q-list>
      </q-drawer>

      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const leftDrawerOpen = ref(false);
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
const menuItems = [
  { to: '/', title: 'Home', icon: 'home', exact: true },
  { to: '/favorites', title: 'Favorites', icon: 'star' },
  { to: '/categories', title: 'Categories', icon: 'view_headline' },
  { to: '/about', title: 'About', icon: 'record_voice_over' },
];
// import { ref, shallowRef } from 'vue';
// import HomeContent from 'components/contents/HomeContent.vue';
// import FavoritosContent from 'components/contents/FavoritosContent.vue';
// import CategoriasContent from 'components/contents/CategoriasContent.vue';
// import SobreContent from 'components/contents/SobreContent.vue';

// const componentsMap = {
//   HomeContent,
//   FavoritosContent,
//   CategoriasContent,
//   SobreContent,
// };

// const activeComponent = shallowRef(componentsMap['HomeContent']);

// const leftDrawerOpen = ref(false);
// function toggleLeftDrawer() {
//   leftDrawerOpen.value = !leftDrawerOpen.value;
// }

// const linksList = [
//   {
//     title: 'Home',
//     caption: 'Página inicial',
//     icon: 'dashboard',
//     component: componentsMap.HomeContent,
//   },
//   {
//     title: 'Favoritos',
//     caption: 'Seus favoritos',
//     icon: 'star_rate',
//     component: componentsMap.FavoritosContent,
//   },
//   {
//     title: 'Categorias',
//     caption: 'Navegue por temas',
//     icon: 'view_headline',
//     component: componentsMap.CategoriasContent,
//   },
//   {
//     title: 'Sobre',
//     caption: 'Quem somos',
//     icon: 'record_voice_over',
//     component: componentsMap.SobreContent,
//   },
// ];
</script>
