<script setup>
import IconAddToFavorite from '@/components/icons/IconAddToFavorite.vue'
import { ref } from 'vue'

const isLiked = ref(false)
</script>

<template>
  <button
    class="like"
    :class="{ 'like--active': isLiked }"
    @click="isLiked = !isLiked"
  >
    <IconAddToFavorite />
  </button>
</template>

<style lang="scss">
.like {
  &--active {
    path {
      fill-rule: inherit;
      fill: var(--red);
    }
  }
}
</style>
