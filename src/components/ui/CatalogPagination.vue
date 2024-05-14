<script setup>
import { usePaginationStore } from '@/stores/pagination'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const props = defineProps({
  totalItems: {
    type: Number,
    required: true
  }
})

const paginationStore = usePaginationStore()

const { currentPage, itemsPerPage } = storeToRefs(paginationStore)

const { previousPage, nextPage } = paginationStore

const totalPages = computed(() => {
  return Math.ceil(props.totalItems / itemsPerPage.value)
})
</script>

<template>
  <div class="pagination">
    <button
      class="pagination__next"
      :class="{ 'pagination__next--hide': currentPage === totalPages }"
      @click="nextPage"
    >
      Загрузить еще
    </button>
    <div class="pagination__body">
      <button
        class="pagination__button pagination__button--prev"
        @click="previousPage"
        v-show="currentPage !== 1"
      >
        Назад
      </button>
      <ul class="pagination__list">
        <li v-for="i in totalPages" :key="i">
          <button
            class="pagination__list-item"
            :class="{ 'pagination__list-item--active': i === currentPage }"
          >
            {{ i }}
          </button>
        </li>
      </ul>
      <button
        class="pagination__button pagination__button--next"
        @click="nextPage"
        v-show="currentPage !== totalPages"
      >
        Дальше
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.pagination {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
}

.pagination__next {
  font-weight: 500;
  font-size: 15px;
  line-height: 133%;
  text-align: center;
  color: var(--white);
  background-color: var(--red);
  border-radius: 9px;
  padding: 14px;
  width: 100%;
  max-width: 181px;

  &--hide {
    visibility: hidden;
    user-select: none;
  }
}

.pagination__body {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 25px;
  position: relative;
  max-width: max-content;
  margin: 0 auto;
}

.pagination__list {
  display: flex;
  align-items: center;
  gap: 15px;
}

.pagination__list-item {
  font-weight: 500;
  font-size: 15px;
  line-height: 100%;
  color: var(--text-gray);
  transition: opacity 0.2s ease;

  &--active {
    color: var(--text-black);
  }

  &:hover {
    opacity: 0.7;
  }
}

.pagination__button {
  display: flex;
  align-items: center;
  gap: 14px;
  position: absolute;
  font-size: 15px;
  line-height: 100%;
  color: var(--text-gray);
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }

  &--next {
    position: absolute;
    top: 0;
    left: calc(100% + 25px);
  }

  &--prev {
    position: absolute;
    top: 0;
    right: calc(100% + 25px);
    flex-direction: row-reverse;

    &::after {
      transform: rotate(180deg);
    }
  }

  &::after {
    display: inline-block;
    content: '';
    transition: transform 0.2s ease;
    width: 7px;
    height: 12px;
    background: url('@/assets/arrow.svg') no-repeat center / contain;
  }
}
</style>
