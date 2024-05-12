<script setup>
import { ref } from 'vue'
import RateComponent from './ui/RateComponent.vue'
import LikeComponent from './ui/LikeComponent.vue'
import TagList from './ui/TagList.vue'
import { useProductsStore } from '@/stores/products'

const props = defineProps({
  product: Object,
  isCollapse: Boolean
})

const productsStore = useProductsStore()
const { toggleFavorite } = productsStore

const swiperRef = ref(null)
const slideCount = props.product.imagesUrl.length

const onMouseMove = (e) => {
  e.stopPropagation()
  const swiper = swiperRef.value.swiper
  const slideWidth = e.target.clientWidth / slideCount
  const slideIndex = Math.abs(Math.trunc(e.offsetX / slideWidth))
  swiper.slideTo(slideIndex)
}

// const onMouseLeave = (e) => {
//   const swiper = swiperRef.value.swiper
//   swiper.slideTo(0)
// }
</script>

<template>
  <div
    class="catalog__item-header"
    :class="{ 'catalog__item-header--collapse': isCollapse }"
  >
    <swiper-container
      ref="swiperRef"
      :slidesPerView="1"
      :space-between="10"
      :centered-slides="true"
      :pagination="{
        el: `#swiper-pagination${product.id}`
      }"
    >
      <swiper-slide v-for="url in product.imagesUrl" :key="url">
        <img :src="url" :alt="product.title" />
      </swiper-slide>
    </swiper-container>
    <div
      class="mouseZone"
      @mousemove="onMouseMove"
      @mouseleave="onMouseLeave"
    ></div>
    <div :id="`swiper-pagination${product.id}`" class="swiper-pagination"></div>
    <RateComponent
      v-if="product.rating"
      :value="product.rating"
      class="catalog__item-rate"
    />
    <LikeComponent
      class="catalog__item-like"
      :isLiked="product.isFavorite"
      @click="() => toggleFavorite(product.id)"
    />
    <button class="catalog__item-about-button" @click="$emit('aboutClick')">
      Подробнее
    </button>
    <TagList class="catalog__item-tags" :tags="product.tags" />
  </div>
</template>

<style lang="scss">
swiper-slide {
  width: 100%;

  img {
    display: block;
    width: 100%;
    height: 240px;
    object-fit: cover;
  }
}
swiper-container {
  width: 100%;
}

.catalog__item-header {
  width: 100%;
  position: relative;
  height: 240px;
  transition: height 0.2s ease;
  overflow: hidden;

  &--collapse {
    height: 186px;
  }
}

.swiper-pagination {
  display: grid;
  padding: 0 16px;
  gap: 4px;
  grid-template-columns: repeat(v-bind(slideCount), 1fr);
  justify-content: space-between;
  width: 100%;
  position: absolute;
  bottom: 4px;
  z-index: 2;
}

.swiper-pagination-bullet {
  width: 100%;
  height: 2px;
  border-radius: 6px;
  background-color: #f4f4f4;
}

.swiper-pagination-bullet-active {
  background-color: var(--text-gray);
}

.mouseZone {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.catalog__item-rate {
  position: absolute;
  z-index: 5;
  top: 16px;
  left: 16px;
}

.catalog__item-like {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 5;
}

.catalog__item-about-button {
  position: absolute;
  bottom: 60px;
  left: 0;
  right: 0;
  max-width: 160px;
  margin: 0 auto;
  z-index: 5;
  padding: 8px;
  border-radius: 9px;
  font-weight: 500;
  font-size: 15px;
  text-align: center;
  color: var(--red);
  background-color: #feedef;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease;
}

.catalog__item-tags {
  padding: 0 16px;
  position: absolute;
  z-index: 5;
  bottom: 10px;
}
</style>
