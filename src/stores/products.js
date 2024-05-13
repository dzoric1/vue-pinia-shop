import { defineStore, storeToRefs } from 'pinia'
import { computed, ref, watchEffect } from 'vue'
import { useSortStore } from './sort'

const baseUrl = 'https://ec1e0dcee8241ee0.mokky.dev/items'

export const useProductsStore = defineStore('products', () => {
  const isProductsLoading = ref(false)
  const products = ref([])
  const sortStore = useSortStore()
  const { sort } = storeToRefs(sortStore)

  const sortedProducts = computed(() => {
    if (!sort.value) return products.value

    const sortOrder = sort.value.sortProperty.startsWith('-') ? -1 : 1
    const sortProperty = sort.value.sortProperty.replace('-', '')

    return products.value.sort((a, b) => {
      let valueA, valueB

      switch (sortProperty) {
        case 'rating':
          valueA = a.rating
          valueB = b.rating
          break
        case 'price':
          valueA = a.discountPrice || a.price
          valueB = b.discountPrice || b.price
          break
        case 'discountPrice':
          valueA = a.discountPrice ? a.price / a.discountPrice : 0
          valueB = b.discountPrice ? b.price / b.discountPrice : 0
          break
        default:
          throw new Error(`Неверное свойство сортировки: ${sortProperty}`)
      }

      return (valueB - valueA) * sortOrder
    })
  })

  watchEffect(() => {
    console.log(sortedProducts.value)
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
    sortedProducts
  }
})
