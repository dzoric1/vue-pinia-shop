import { useDebounceRefValue } from '@/hooks/useDebounceRefValue'
import deepEqual from 'deep-equal'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useFiltersStore = defineStore('filters', () => {
  const search = ref('')
  const debouncedSearch = useDebounceRefValue(search)
  const filters = ref([])

  const filterProductsBySearch = (products) => {
    if (debouncedSearch.value) {
      return products.filter((product) =>
        product.title
          .toLowerCase()
          .includes(debouncedSearch.value.toLowerCase())
      )
    }

    return products
  }

  const filterIsHas = (filter) => {
    let isHas = false

    filters.value.forEach((item) => {
      if (deepEqual(item, filter)) {
        isHas = true
        return
      }
    })

    return isHas
  }

  const addFilter = (filter) => {
    if (filterIsHas(filter)) {
      return
    }
    filters.value.push(filter)
  }

  const deleteFilter = (filter) => {
    filters.value = filters.value.filter((item) => !deepEqual(item, filter))
  }

  watch(debouncedSearch, () => {
    console.log(debouncedSearch.value)
    console.log(filters.value)
  })

  watch(filters, () => {
    console.log(filters.value)
  })

  const filterProducts = (products, filters) => {
    if (filters.length === 0) {
      return products
    }
    return products.filter((product) => {
      for (const filter of filters) {
        if (product[filter.sortValue] === filter.name) {
          return true
        }
      }
      return false
    })
  }

  return {
    search,
    filters,
    debouncedSearch,
    filterProductsBySearch,
    addFilter,
    deleteFilter,
    filterIsHas,
    filterProducts
  }
})
