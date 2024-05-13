import { defineStore, storeToRefs } from 'pinia'
import { computed, ref, watchEffect } from 'vue'
import { useProductsStore } from './products'

export const useSortStore = defineStore('sort', () => {
  const productsStore = useProductsStore()

  const sortList = [
    {
      name: 'Сначала популярные',
      sortProperty: 'rating'
    },
    {
      name: 'Сначала дешевле',
      sortProperty: '-price'
    },
    {
      name: 'Сначала дороже',
      sortProperty: 'price'
    },
    {
      name: 'По размеру скидки',
      sortProperty: 'discountPrice'
    }
  ]

  const sort = ref(sortList[0])

  const selectSort = (item) => {
    sort.value = item
    productsStore.getProducts()
  }

  return { sort, selectSort, sortList }
})
