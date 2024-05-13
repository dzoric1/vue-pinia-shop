<script setup>
defineProps({
  tags: Array
})

const tagColor = (tag) => {
  switch (tag.toLowerCase()) {
    case 'хит':
      return '#FF8C22'
    case 'заморозка':
      return '#22C6EA '
    case 'новинка':
      return '#10B145'

    default:
      return '#F3223C'
  }
}
</script>

<template>
  <ul v-if="tags" class="product-tags">
    <li
      v-for="tag in tags"
      class="product-tags__item"
      :key="tag"
      :style="{ backgroundColor: tagColor(tag) }"
    >
      {{ tag }}
    </li>
  </ul>
</template>

<style lang="scss">
.product-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 2px 6px;
  width: 100%;
}

.product-tags__item {
  padding: 6px 8px;
  font-weight: 500;
  font-size: 12px;
  color: var(--white);
  background-color: var(--red);
  border-radius: 6px;
}
</style>
