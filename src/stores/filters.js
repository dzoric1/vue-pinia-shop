import { useDebounceRefValue } from '@/hooks/useDebounceRefValue'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useFiltersStore = defineStore('filters', () => {
  const search = ref('')
  const debouncedSearch = useDebounceRefValue(search)

  const filterProducts = (products) => {
    if (debouncedSearch.value) {
      return products.filter((product) =>
        product.title
          .toLowerCase()
          .includes(debouncedSearch.value.toLowerCase())
      )
    }

    return products
  }

  watch(debouncedSearch, () => {
    console.log(debouncedSearch.value)
  })

  return { search, debouncedSearch, filterProducts }
})
