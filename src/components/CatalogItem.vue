<script setup>
import CatalogItemHeader from './CatalogItemHeader.vue'
import IconAddToCart from './icons/IconAddToCart.vue'
import IconPoints from './icons/IconPoints.vue'
import { ref } from 'vue'

const isCollapse = ref(false)

const { itemId } = defineProps({
  itemId: Number
})
</script>

<template>
  <div class="catalog__item">
    <CatalogItemHeader :itemId="itemId" :isCollapse="isCollapse" />
    <div class="catalog__item-footer">
      <h3 class="catalog__item-title">
        Индейка, филе грудки на подложке замороженное "Индилайт"
      </h3>
      <p class="catalog__item-description">300 г · Германия</p>
      <div class="catalog__item-control">
        <div class="catalog__item-price-wrapper">
          <p class="catalog__item-price-description">110 ₽</p>
          <!-- <p class="catalog__item-price-points">+248 <IconPoints /></p> -->
          <p class="catalog__item-price">496 ₽ <span>/ кг</span></p>
        </div>
        <button class="catalog__item-button" @click="isCollapse = !isCollapse">
          <IconAddToCart />
        </button>
      </div>
      <div v-show="isCollapse" class="catalog__item-cart-count">
        <button
          class="catalog__item-cart-button catalog__item-cart-button--minus"
        ></button>
        <p class="catalog__item-cart-count-value">2.5 кг</p>
        <button
          class="catalog__item-cart-button catalog__item-cart-button--plus"
        ></button>
      </div>
    </div>
  </div>
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

.catalog__item-price-wrapper {
}

.catalog__item-price {
  font-weight: 600;
  font-size: 18px;
  margin-top: 4px;
  span {
    font-weight: 600;
    font-size: 15px;
    color: var(--text-gray);
  }
}

.catalog__item-price-description {
  font-size: 15px;
  text-decoration: line-through;
  color: var(--text-gray);
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

.catalog__item-cart-count {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
}

.catalog__item-cart-button {
  border-radius: 9px;
  width: 44px;
  height: 44px;
  background: rgba(93, 136, 150, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.6;
  }

  &::after,
  &::before {
    position: absolute;
    content: '';
    display: block;
    width: 18px;
    height: 2px;
    background: var(--text-black);
    pointer-events: all;
    border-radius: 2px;
  }

  &--plus {
    &::before {
      transform: rotate(90deg);
    }
  }
}
.catalog__item-cart-count-value {
  font-weight: 600;
  font-size: 16px;
  text-align: center;
}

.catalog__item-price-points {
  display: inline-flex;
  align-self: center;
  gap: 6px;
  padding: 4px 6px;
  line-height: 100%;
  font-size: 12px;
  color: var(--white);
  border-radius: 40px;
  background: linear-gradient(54deg, #ff782d 0%, #f32254 70%);

  svg {
    width: 11px;
    height: 11px;
    border-radius: 50%;
    object-fit: cover;
  }
}
</style>
