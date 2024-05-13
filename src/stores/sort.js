import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSortStore = defineStore('sort', () => {
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
  }

  const sortProducts = (products) => {
    if (!sort.value) return products

    const sortOrder = sort.value.sortProperty.startsWith('-') ? -1 : 1
    const sortProperty = sort.value.sortProperty.replace('-', '')

    return products.sort((a, b) => {
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
  }

  return { sort, selectSort, sortList, sortProducts }
})
