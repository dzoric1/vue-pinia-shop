<script setup>
import { storeToRefs } from 'pinia'
import SearchForm from '@/components/ui/SearchForm.vue'
import IconUser from './icons/IconUser.vue'
import IconOrders from './icons/IconOrders.vue'
import IconFavorites from './icons/IconFavorites.vue'
import IconCart from './icons/IconCart.vue'

import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
const productsStore = useProductsStore()
const { favoriteProducts } = storeToRefs(productsStore)
const { cart } = storeToRefs(cartStore)
</script>

<template>
  <header class="header">
    <div class="header__container container">
      <RouterLink to="./" class="header__logo">
        <img src="@/assets/logo.svg" alt="логотип" />
      </RouterLink>
      <div class="header__row">
        <button class="header__catalog-button" type="button">
          <img src="@/assets/catalog.svg" alt="иконка кнопки" />
          Каталог
        </button>
        <SearchForm class="header__search" placeholder="Поиск по товарам" />
      </div>
      <nav class="header__nav">
        <ul class="header__nav-list">
          <li class="header__nav-item">
            <RouterLink to="./" class="header__nav-link">
              <IconUser />
              Войти
            </RouterLink>
          </li>
          <li class="header__nav-item">
            <RouterLink to="./" class="header__nav-link">
              <IconOrders />
              Заказы
            </RouterLink>
          </li>
          <li class="header__nav-item">
            <RouterLink to="./" class="header__nav-link">
              <span v-if="favoriteProducts.length" class="header__nav-count">{{
                favoriteProducts.length
              }}</span>
              <IconFavorites />
              Избранное
            </RouterLink>
          </li>
          <li class="header__nav-item">
            <RouterLink to="./cart" class="header__nav-link">
              <span v-if="cart.length" class="header__nav-count">{{
                cart.length
              }}</span>
              <IconCart />
              Корзина
            </RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style lang="scss">
.header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  padding: 26px 0;
  background-color: var(--white);
  box-shadow: 0 2px 18px 0 rgba(12, 12, 13, 0.1);

  @include tablet {
    padding: 10px 0;
    border-bottom: 2px solid var(--text-gray);
  }
}

.header__search {
  max-width: 566px;
  margin-right: 15px;

  @include tablet {
    margin-right: 0;
  }
}

.header__container {
  display: flex;
  align-items: center;

  @include tablet {
    flex-direction: column;
    gap: 12px;
  }
}

.header__row {
  display: flex;

  width: 100%;

  @include tablet {
    justify-content: center;
  }
}

.header__logo {
  display: block;
  width: 100%;
  max-width: 202px;
  margin-right: 58px;

  img {
    width: 100%;
    object-fit: cover;
  }

  @include tablet {
    margin-right: 0;
  }
}

.header__catalog-button {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 15px;
  background-color: var(--red);
  color: var(--white);
  border-radius: 9px;
  padding: 12px 16px;
  width: 100%;
  max-width: 120px;
  margin-right: -15px;
  z-index: 1;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.6;
  }

  @include tablet {
    gap: 5px;
    padding: 8px;
    max-width: max-content;
    font-size: 14px;
  }
}

.header__nav {
  margin-left: auto;

  @include tablet {
    margin-left: 0;
  }
}

.header__nav-list {
  display: flex;
  gap: 30px;
}

.header__nav-item {
  font-size: 12px;
}

.header__nav-link {
  padding-top: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  svg {
    width: 25px;
    height: 25px;
    object-fit: contain;
  }
}

.header__nav-count {
  position: absolute;
  top: 0;
  right: 50%;
  transform: translateX(110%);
  background-color: var(--red);
  font-size: 11px;
  padding: 4px;
  border-radius: 44px;
  color: var(--white);
  line-height: 75%;
}
</style>
