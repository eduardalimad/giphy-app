<template>
  <q-avatar :size="sizeImage" class="q-mr-md">
    <img
      src="https://avatars.githubusercontent.com/u/99693673?s=400&u=4abfefe11f71447896779e15e989b230fa381584&v=4"
      alt="Avatar"
    />
  </q-avatar>
</template>
<script setup lang="ts">
defineProps({
  sizeImage: {
    type: String,
    default: '70px',
  },
});
</script>
