<script setup>
import IconAddToFavorite from '@/components/icons/IconAddToFavorite.vue'

defineProps({
  isLiked: Boolean
})
</script>

<template>
  <button
    class="like"
    :class="{ 'like--active': isLiked }"
    @click="$emit('click')"
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
