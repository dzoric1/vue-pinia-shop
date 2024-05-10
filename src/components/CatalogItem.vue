<script setup>
import CatalogItemHeader from './CatalogItemHeader.vue'
import IconAddToCart from './icons/IconAddToCart.vue'
import IconPoints from './icons/IconPoints.vue'
import { ref } from 'vue'
import PopupWrapper from './ui/PopupWrapper.vue'
import RateComponent from './ui/RateComponent.vue'
import LikeComponent from './ui/LikeComponent.vue'
import TagList from './ui/TagList.vue'
import PriceComponent from './ui/PriceComponent.vue'

const isCollapse = ref(false)
const isPopupShow = ref(false)

const { itemId } = defineProps({
  itemId: Number
})
</script>

<template>
  <div class="catalog__item">
    <CatalogItemHeader
      :itemId="itemId"
      :isCollapse="isCollapse"
      @aboutClick="isPopupShow = !isPopupShow"
    />
    <div class="catalog__item-footer">
      <h3 class="catalog__item-title">
        Индейка, филе грудки на подложке замороженное "Индилайт"
      </h3>
      <p class="catalog__item-description">300 г · Германия</p>
      <div class="catalog__item-control">
        <PriceComponent />
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

  <Teleport to="body">
    <PopupWrapper :isShow="isPopupShow" @close="isPopupShow = false">
      <div class="catalog__item-about">
        <div class="catalog__item-about-image">
          <TagList class="catalog__item-about-tags" />
          <img src="@/assets/cardImage.png" alt="НАЗВАНИЕ ТОВАРА" />
          <LikeComponent class="catalog__item-about-like" />
        </div>
        <div class="catalog__item-about-description">
          <h2 class="catalog__item-about-description-title">
            Корейка свиная на кости без хребта "СК Короча" "Мираторг" 5,42 кг
          </h2>
          <div class="catalog__item-about-description-row">
            <p class="catalog__item-about-description-brand">Fish & More</p>
            <p class="catalog__item-about-description">Россия, 12 кг</p>
            <RateComponent class="catalog__item-about-rate" />
          </div>
          <PriceComponent
            class="catalog__item-about-price"
            package-price="2000"
          />
          <button class="catalog__item-about-add">Добавить в корзину</button>
          <p class="catalog__item-about-description-stock">В наличии много</p>
          <RouterLink to="/" class="catalog__item-about-link">
            Перейти в карточку товара
          </RouterLink>
        </div>
        <div class="catalog__item-about-footer">
          <h3 class="catalog__item-about-footer-title">Характеристики</h3>
          <ul class="catalog__item-about-footer-list">
            <li class="catalog__item-about-footer-item">
              <p class="catalog__item-about-footer-item-title">Срок хранения</p>
              <p class="catalog__item-about-footer-item-value">1 год</p>
            </li>
            <li class="catalog__item-about-footer-item">
              <p class="catalog__item-about-footer-item-title">
                Количество в транспортной упаковке
              </p>
              <p class="catalog__item-about-footer-item-value">10</p>
            </li>
            <li class="catalog__item-about-footer-item">
              <p class="catalog__item-about-footer-item-title">
                Тип транспортной упаковки
              </p>
              <p class="catalog__item-about-footer-item-value">Коробка</p>
            </li>
            <li class="catalog__item-about-footer-item">
              <p class="catalog__item-about-footer-item-title">
                Количество в транспортной упаковке на паллете
              </p>
              <p class="catalog__item-about-footer-item-value">40</p>
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
