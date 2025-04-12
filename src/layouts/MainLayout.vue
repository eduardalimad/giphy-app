<template>
  <q-layout view="hHh Lpr lFf" class="shadow-2 bg-grey-12">
    <q-header elevated>
      <q-toolbar class="text-white q-px-md">
        <div class="row justify-between items-center full-width custom-toolbar">
          <div class="row items-center">
            <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
            <img src="../assets/logo.png" alt="Logo" height="32" class="q-ml-sm" />
          </div>

          <div class="row items-center">
            <q-toolbar-title class="username"> MARIA EDUARDA </q-toolbar-title>
            <AvatarUser sizeImage="40px" />
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        class="text-gray-300 rounded-r-lg border-none"
        style="background-color: #202938"
      >
        <div class="row justify-between items-center q-pa-sm">
          <q-item-label header class="text-white text-h6 font-normal q-pl-sm q-mb-sm">
            Menu
          </q-item-label>
          <q-btn dense flat round icon="close" @click="leftDrawerOpen = false" class="text-white" />
        </div>

        <q-list padding class="q-pt-sm">
          <q-item
            v-for="item in menuItems"
            :key="item.to"
            :to="item.to"
            :exact="item.exact"
            clickable
            v-ripple
            class="q-mb-sm rounded-borders q-hoverable menu-item"
          >
            <q-item-section avatar>
              <q-icon :name="item.icon" size="24px" />
            </q-item-section>
            <q-item-section>{{ item.title }}</q-item-section>
          </q-item>
        </q-list>
      </q-drawer>

      <div class="q-pa-sm">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AvatarUser from '../components/AvatarUser.vue';

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
</script>
<style lang="scss" scoped>
.custom-toolbar {
  background-color: $primary;

  .username {
    font-weight: 600;
  }

  @media (max-width: 438px) {
    .username {
      display: none;
    }
  }
}
</style>
