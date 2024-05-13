<script setup>
import { useFiltersStore } from '@/stores/filters'

defineProps({
  list: Array,
  isGreen: Boolean
})

const filtersStore = useFiltersStore()
const { filterIsHas } = filtersStore

defineEmits(['click'])
</script>

<template>
  <div class="filter-tags">
    <ul class="filter-tags__list">
      <li v-for="item in list" :key="item" class="filter-tags__item">
        <button
          class="filter-tags__button"
          :class="{
            'filter-tags__button--green': isGreen,
            'filter-tags__button--active': filterIsHas(item)
          }"
          @click="$emit('click', item)"
        >
          {{ item.name }} {{ !isGreen ? item.count : '' }}
        </button>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.filter-tags {
  margin-bottom: 10px;
}

.filter-tags__list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.filter-tags__button {
  padding: 12px;
  font-weight: 500;
  color: var(--text-gray);
  background-color: #f2f3f5;
  border-radius: 6px;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }

  &--active {
    background: rgba(70, 161, 117, 0.15);
  }

  &--green {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--light-green);
    background: rgba(70, 161, 117, 0.15);

    &::after {
      display: inline-block;
      content: '';
      width: 8px;
      height: 8px;
      background: url('@/assets/xmark.svg') no-repeat center / contain;
    }
  }
}
</style>
