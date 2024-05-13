import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useFiltersStore } from './filters'
import { useSortStore } from './sort'

const baseUrl = 'https://ec1e0dcee8241ee0.mokky.dev/items'

export const useProductsStore = defineStore('products', () => {
  const isProductsLoading = ref(false)
  const products = ref([])
  const sortStore = useSortStore()
  const filtersStore = useFiltersStore()
  const { filterProducts } = filtersStore
  const { sortProducts } = sortStore

  const currentProducts = computed(() => {
    return sortProducts(filterProducts(products.value))
  })

  const getProducts = async () => {
    isProductsLoading.value = true

    try {
      const response = await fetch(baseUrl)

      if (!response.ok) {
        throw new Error('Произошла ошибка в получении данных')
      }

      products.value = await response.json()
    } catch (error) {
      throw new Error(error)
    } finally {
      console.log(products.value)
      isProductsLoading.value = false
    }
  }

  const toggleFavorite = async (productId) => {
    try {
      const product = products.value.find((product) => product.id === productId)

      const response = await fetch(`${baseUrl}/${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          isFavorite: !product.isFavorite
        })
      })

      product.isFavorite = !product.isFavorite

      if (!response.ok) {
        throw new Error('Произошла ошибка в изменении лайка')
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  const totalProducts = computed(() => products.value.length)

  const favoriteProducts = computed(() =>
    products.value.filter((product) => product.isFavorite)
  )

  return {
    getProducts,
    products,
    isProductsLoading,
    totalProducts,
    favoriteProducts,
    toggleFavorite,
    currentProducts
  }
})
