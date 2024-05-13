<script setup>
import useClickOutside from '@/hooks/useClickOutside'
import { ref } from 'vue'
import CheckBox from './CheckBox.vue'
import { useSortStore } from '@/stores/sort'
import { storeToRefs } from 'pinia'

defineProps({
  label: String,
  list: Array
})

const sortStore = useSortStore()
const { selectSort, sortList } = sortStore
const { sort } = storeToRefs(sortStore)
const isOpen = ref(false)
const sortRef = ref(null)

const onClickSort = (item) => {
  selectSort(item)
  isOpen.value = false
}

useClickOutside(sortRef, () => (isOpen.value = false))
</script>

<template>
  <div class="catalog__sort" ref="sortRef">
    <button @click="isOpen = !isOpen" class="catalog__sort-button">
      {{ sort.name }}
    </button>
    <ul
      class="catalog__sort-list"
      :class="{ 'catalog__sort-list--active': isOpen }"
    >
      <li v-for="(item, i) in sortList" :key="i">
        <CheckBox
          :label="item.name"
          :isChecked="sort.name === item.name"
          @click="() => onClickSort(item)"
        />
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.catalog__sort {
  position: relative;
  margin-top: 6px;
  margin-left: auto;
}

.catalog__sort-button {
  color: rgba(12, 12, 13, 0.8);
  display: flex;
  align-items: center;
  gap: 8px;

  &::after {
    display: inline-block;
    content: '';
    transform: rotate(90deg);
    transition: transform 0.2s ease;
    width: 7px;
    height: 12px;
    background: url('@/assets/arrow.svg') no-repeat center / contain;
    margin-right: 3px;
  }
}

.catalog__sort-list {
  padding: 20px 16px;
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.15);
  background-color: var(--white);
  border-radius: 12px;
  width: 192px;
  display: flex;
  gap: 15px;
  flex-direction: column;
  position: absolute;
  z-index: 100;
  top: calc(100% - 10px);
  right: 0;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.2s ease,
    visibility 0.2s ease;

  &--active {
    opacity: 1;
    visibility: visible;
  }
}
</style>
