import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

const baseUrl = 'https://ec1e0dcee8241ee0.mokky.dev/items'

export const useProductsStore = defineStore('products', () => {
  const isProductsLoading = ref(false)
  const products = ref([])

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
      console.log(isProductsLoading.value)
    }
  }

  return { getProducts, products, isProductsLoading }
})
