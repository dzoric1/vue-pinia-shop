import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const cart = ref([])

  const addToCart = (product) => {
    const cartItem = cart.value.find((cartItem) => cartItem.id === product.id)

    cartItem
      ? (cartItem.totalWeight += product.weight)
      : cart.value.push({ ...product, totalWeight: product.weight })

    console.log(cart.value)
  }

  const incrementCartItem = (cartItem) => {
    cartItem.totalWeight += cartItem.weight
  }

  const decrementCartItem = (cartItem) => {
    cartItem.totalWeight -= cartItem.weight
    if (cartItem.totalWeight <= 0) {
      cart.value = cart.value.filter((item) => item.id !== cartItem.id)
    }
  }

  return { cart, addToCart, incrementCartItem, decrementCartItem }
})
