<script setup>
import { storeToRefs } from 'pinia'
import { ref, computed } from 'vue'
import CatalogItemHeader from './CatalogItemHeader.vue'
import IconAddToCart from './icons/IconAddToCart.vue'
import PopupWrapper from './ui/PopupWrapper.vue'
import RateComponent from './ui/RateComponent.vue'
import LikeComponent from './ui/LikeComponent.vue'
import TagList from './ui/TagList.vue'
import PriceComponent from './ui/PriceComponent.vue'
import { useCartStore } from '@/stores/cart'
import { useProductsStore } from '@/stores/products'
import WeightCounter from './ui/WeightCounter.vue'
import convertWeight from '@/utils/convertWeight'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const cartStore = useCartStore()
const productStore = useProductsStore()
const { cart } = storeToRefs(cartStore)
const { toggleFavorite } = productStore
const { addToCart, incrementCartItem, decrementCartItem } = cartStore

const isPopupShow = ref(false)

const cartItem = computed(() => {
  return cart.value.find((item) => item.id === props.product.id)
})

const totalWeight = computed(() => {
  return cartItem.value ? cartItem.value.totalWeight : 0
})
</script>

<template>
  <div class="catalog__item">
    <CatalogItemHeader
      :product="product"
      :isCollapse="!!cartItem"
      @aboutClick="isPopupShow = !isPopupShow"
    />
    <div class="catalog__item-footer">
      <h3 class="catalog__item-title">
        {{ product.title }}
      </h3>
      <p class="catalog__item-description">
        {{ convertWeight(product.weight) }} · {{ product.country }}
      </p>
      <div class="catalog__item-control">
        <PriceComponent
          :discount-price="product.discountPrice"
          :price="product.price"
          :points="product.points"
        />
        <button
          v-if="!totalWeight"
          class="catalog__item-button"
          @click="() => addToCart(product)"
        >
          <IconAddToCart />
        </button>
      </div>
      <WeightCounter
        v-show="totalWeight"
        :weight="totalWeight"
        @increment="() => incrementCartItem(cartItem)"
        @decrement="() => decrementCartItem(cartItem)"
      />
    </div>
  </div>

  <Teleport to="body">
    <PopupWrapper :isShow="isPopupShow" @close="isPopupShow = false">
      <div class="catalog__item-about">
        <div class="catalog__item-about-image">
          <TagList class="catalog__item-about-tags" :tags="product.tags" />
          <img :src="product.imagesUrl[0]" alt="НАЗВАНИЕ ТОВАРА" />
          <LikeComponent
            @click="() => toggleFavorite(product.id)"
            class="catalog__item-about-like"
            :isLiked="product.isFavorite"
          />
        </div>
        <div class="catalog__item-about-description">
          <h2 class="catalog__item-about-description-title">
            {{ product.title }}
          </h2>
          <div class="catalog__item-about-description-row">
            <p class="catalog__item-about-description-brand">
              {{ product.brand }}
            </p>
            <p class="catalog__item-about-description">
              {{ product.country }}, {{ product.weight }} г
            </p>
            <RateComponent
              class="catalog__item-about-rate"
              :value="product.rating"
            />
          </div>
          <PriceComponent
            :discount-price="product.discountPrice"
            :price="product.price"
            :package-price="product.packagePrice"
            :points="product.points"
            class="catalog__item-about-price"
          />
          <WeightCounter
            v-show="totalWeight"
            :weight="totalWeight"
            @increment="() => incrementCartItem(cartItem)"
            @decrement="() => decrementCartItem(cartItem)"
          />
          <button
            class="catalog__item-about-add"
            @click="() => addToCart(product)"
            v-if="!totalWeight"
          >
            Добавить в корзину
          </button>
          <p class="catalog__item-about-description-stock">
            В наличии {{ product.inStock }}
          </p>
          <RouterLink to="/" class="catalog__item-about-link">
            Перейти в карточку товара
          </RouterLink>
        </div>
        <div class="catalog__item-about-footer">
          <h3 class="catalog__item-about-footer-title">Характеристики</h3>
          <ul class="catalog__item-about-footer-list">
            <li class="catalog__item-about-footer-item">
              <p class="catalog__item-about-footer-item-title">Срок хранения</p>
              <p class="catalog__item-about-footer-item-value">
                {{ product.deliveryCharacteristics.bestBefore }}
              </p>
            </li>
            <li class="catalog__item-about-footer-item">
              <p class="catalog__item-about-footer-item-title">
                Количество в транспортной упаковке
              </p>
              <p class="catalog__item-about-footer-item-value">
                {{ product.deliveryCharacteristics.count }}
              </p>
            </li>
            <li class="catalog__item-about-footer-item">
              <p class="catalog__item-about-footer-item-title">
                Тип транспортной упаковки
              </p>
              <p class="catalog__item-about-footer-item-value">
                {{ product.deliveryCharacteristics.type }}
              </p>
            </li>
            <li class="catalog__item-about-footer-item">
              <p class="catalog__item-about-footer-item-title">
                Количество в транспортной упаковке на паллете
              </p>
              <p class="catalog__item-about-footer-item-value">
                {{ product.deliveryCharacteristics.palletCount }}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </PopupWrapper>
  </Teleport>
</template>

<style lang="scss">
.catalog__item {
  width: 100%;
  background-color: var(--white);
  border: 1px solid rgba(93, 136, 150, 0.08);
  border-radius: 9px;
  height: 441px;
  display: flex;
  flex-direction: column;

  &:hover {
    .catalog__item-about-button {
      opacity: 1;
      visibility: visible;
    }
  }
}

.catalog__item-footer {
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.catalog__item-title {
  font-weight: 500;
  font-size: 15px;
  margin-bottom: 6px;
}

.catalog__item-description {
  font-size: 13px;
  color: var(--text-gray);
}

.catalog__item-control {
  display: flex;
  justify-content: space-between;
  margin-top: auto;
}

.catalog__item-button {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9px;
  width: 44px;
  height: 44px;
  background-color: var(--red);
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }
}

.catalog__item-about-description {
  display: flex;
  flex-direction: column;
}

.catalog__item-about-image {
  position: relative;
  border: 1px solid rgba(93, 136, 150, 0.08);
  border-radius: 9px;
  img {
    width: 100%;
    object-fit: cover;
  }
}

.catalog__item-about-tags {
  position: absolute;
  top: 16px;
  left: 16px;
}

.catalog__item-about-like {
  position: absolute;
  top: 16px;
  right: 16px;
}

.catalog__item-about-description-title {
  font-weight: 500;
  font-size: 16px;
  line-height: 135%;
  max-width: 300px;
  margin-bottom: 16px;
}

.catalog__item-about-description-row {
  display: flex;
  gap: 20px;
  font-size: 13px;
}
.catalog__item-about-description-brand {
  color: var(--text-gray);
}

.catalog__item-about {
  display: grid;
  gap: 30px 20px;
  grid-template-columns: repeat(2, 1fr);
}

.catalog__item-about-rate {
  margin-left: auto;
}

.catalog__item-about-price {
  margin-top: auto;
  margin-bottom: 15px;

  .price__value {
    font-size: 24px;
    span {
      font-size: 20px;
    }
  }
}

.catalog__item-about-add {
  font-weight: 500;
  font-size: 15px;
  text-align: center;
  color: var(--white);
  padding: 14px;
  border-radius: 9px;
  background-color: var(--red);
  max-width: 200px;
  transition: opacity 0.2s ease;
  margin-bottom: 5px;

  &:hover {
    opacity: 0.7;
  }
}

.catalog__item-about-description-stock {
  font-size: 13px;
  line-height: 130%;
  color: var(--text-gray);
  margin-bottom: 26px;
}

.catalog__item-about-link {
  color: var(--red);
  margin-bottom: 2px;
}

.catalog__item-about-footer {
  grid-column: span 2;
}

.catalog__item-about-footer-title {
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 10px;
}

.catalog__item-about-footer-list {
  display: flex;
  flex-wrap: wrap;
  gap: 15px 44px;
}

.catalog__item-about-footer-item {
  font-weight: 500;
  font-size: 13px;
  line-height: 130%;
  min-width: 180px;
}

.catalog__item-about-footer-item-title {
  color: var(--text-gray);
  margin-bottom: 5px;
}
</style>
