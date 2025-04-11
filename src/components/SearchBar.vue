<template>
  <div class="q-gutter-md">
    <div class="row q-col-gutter-sm items-center">
      <div class="col">
        <q-input
          v-model="searchTerm"
          label="Buscar GIF"
          outlined
          dense
          clearable
          clear-icon="close"
          @clear="reset"
          @keyup.enter="handleInput"
        />
      </div>
      <div>
        <q-btn
          color="primary"
          dense
          unelevated
          @click="handleInput"
          class="q-px-sm"
          :style="{ height: '42px' }"
        >
          <q-icon name="search" />
        </q-btn>
      </div>
    </div>

    <div class="grid grid-cols-[0rem_1fr_1rem] gap-4 place-items-center">
      <div class="bg-transparent">
        <q-btn
          v-show="showLeftButton"
          dense
          flat
          round
          icon="chevron_left"
          @click="scrollBackward"
          aria-label="Scroll para a esquerda"
        />
      </div>

      <div class="bg-transparent w-full overflow-x-auto pt-2">
        <q-scroll-area ref="scrollAreaRef" class="chip-scroll-area" horizontal>
          <div class="row no-wrap items-center">
            <q-chip
              v-for="chip in props.chips"
              :key="chip"
              clickable
              @click="applyChip(chip)"
              color="blue-1"
              text-color="blue-8"
              bordered
              class="q-mr-sm"
            >
              {{ chip }}
            </q-chip>
          </div>
        </q-scroll-area>
      </div>

      <div class="bg-transparent">
        <q-btn
          v-show="showLeftButton"
          dense
          flat
          round
          icon="chevron_right"
          @click="scrollForward"
          aria-label="Scroll para a direita"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { QScrollArea } from 'quasar';
import { ref, onMounted, watch, nextTick, onBeforeUnmount } from 'vue';

const props = defineProps<{ chips: string[] }>();
const emit = defineEmits(['search', 'reset']);

let debounceTimeout: ReturnType<typeof setTimeout>;

const searchTerm = ref('');
const scrollAreaRef = ref<QScrollArea | null>(null);
const showLeftButton = ref(false);
const showRightButton = ref(true);
const SCROLL_STEP = 250;

onMounted(async () => {
  await nextTick();
  verificarScrollChips();

  const target = scrollAreaRef.value?.getScrollTarget?.();
  if (target) {
    target.addEventListener('scroll', verificarScrollChips);
  }
});

function verificarScrollChips() {
  const el = scrollAreaRef.value?.getScroll();
  if (!el) return;

  const { horizontalSize, horizontalContainerInnerSize, horizontalPosition } = el;

  const hasScroll = horizontalSize > horizontalContainerInnerSize;
  const canScrollLeft = horizontalPosition > 0;
  const canScrollRight = horizontalSize > horizontalPosition + horizontalContainerInnerSize;

  showLeftButton.value = hasScroll && canScrollLeft;
  showRightButton.value = hasScroll && canScrollRight;
}

function scrollForward() {
  const area = scrollAreaRef.value;
  if (!area) return;

  const currentPos = area.getScrollPosition().left;
  area.setScrollPosition('horizontal', currentPos + SCROLL_STEP, 300);

  setTimeout(verificarScrollChips, 350);
}

function scrollBackward() {
  const area = scrollAreaRef.value;
  if (!area) return;

  const currentPos = area.getScrollPosition().left;
  area.setScrollPosition('horizontal', currentPos - SCROLL_STEP, 300);

  setTimeout(verificarScrollChips, 350);
}
function handleInput() {
  if (debounceTimeout) {
    clearTimeout(debounceTimeout);
  }

  debounceTimeout = setTimeout(() => {
    search();
  }, 1000);
}

function search() {
  if (searchTerm.value.trim() === '') {
    return;
  }
  emit('search', searchTerm.value);
}

function reset() {
  searchTerm.value = '';
  emit('reset');
  showLeftButton.value = false;
  showRightButton.value = true;
  verificarScrollChips();
}

function applyChip(chip: string) {
  searchTerm.value = chip;
  handleInput();
}

watch(
  () => props.chips,
  async () => {
    await nextTick();
    verificarScrollChips();
  },
);

onBeforeUnmount(() => {
  const target = scrollAreaRef.value?.getScrollTarget?.();
  if (target) {
    target.removeEventListener('scroll', verificarScrollChips);
  }
});
</script>

<style scoped lang="scss">
.chip-scroll-area {
  max-width: 100%;
  height: 3rem;
  overflow: hidden;
  display: flex;
}
</style>
