import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePaginationStore = defineStore('pagination', () => {
  const currentPage = ref(1)
  const itemsPerPage = ref(8)

  const previousPage = () => {
    currentPage.value--
  }

  const nextPage = () => {
    currentPage.value++
  }

  return { currentPage, itemsPerPage, previousPage, nextPage }
})
