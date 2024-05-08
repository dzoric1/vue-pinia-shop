<script setup>
import { ref } from 'vue'
import IconStar from './icons/IconStar.vue'
import IconAddToFavorite from './icons/IconAddToFavorite.vue'

const { itemId } = defineProps({
  itemId: Number,
  isCollapse: Boolean
})

const spaceBetween = ref(10)
const swiperRef = ref(null)
const slideCount = 4

const tagsColors = {
  Новинка: '#10b145',
  Заморозка: '#22c6ea',
  Хит: '#22c6ea'
}

const onMouseMove = (e) => {
  e.stopPropagation()
  const swiper = swiperRef.value.swiper
  const slideWidth = 240 / slideCount
  const slideIndex = Math.abs(Math.trunc(e.offsetX / slideWidth))
  swiper.slideTo(slideIndex)
}

const onMouseLeave = (e) => {
  const swiper = swiperRef.value.swiper
  // swiper.slideTo(0)
}
</script>

<template>
  <div
    class="catalog__item-header"
    :class="{ 'catalog__item-header--collapse': isCollapse }"
  >
    <swiper-container
      ref="swiperRef"
      :slidesPerView="1"
      :space-between="spaceBetween"
      :centered-slides="true"
      :pagination="{
        el: `#swiper-pagination${itemId}`
      }"
      :breakpoints="{}"
    >
      <swiper-slide v-for="i in slideCount" :key="i">
        <img src="@/assets/cardImage.png" alt="ВСТАВИТЬ ИМЯ ТОВАРА" />
      </swiper-slide>
    </swiper-container>
    <div
      class="mouseZone"
      @mousemove="onMouseMove"
      @mouseleave="onMouseLeave"
    ></div>
    <div :id="`swiper-pagination${itemId}`" class="swiper-pagination"></div>
    <div class="catalog__item-rate">
      <IconStar />
      <span>4.6</span>
    </div>
    <button
      class="catalog__item-add-to-favorite catalog__item-add-to-favorite--active"
    >
      <IconAddToFavorite />
    </button>
    <button class="catalog__item-about-button">Подробнее</button>
    <ul class="catalog__item-tags">
      <li class="catalog__item-tag">Хит</li>
      <li class="catalog__item-tag">Новинка</li>
      <li class="catalog__item-tag">Заморозка</li>
      <!-- <li class="catalog__item-tag">Ликвидация</li> -->
    </ul>
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
  font-weight: 500;
  text-align: center;
  color: #585858;
  display: flex;
  align-items: center;
  gap: 4px;
}

.catalog__item-add-to-favorite {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 5;

  &--active {
    path {
      fill-rule: inherit;
      fill: var(--red);
    }
  }
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
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  width: 100%;
  position: absolute;
  z-index: 5;
  bottom: 10px;
}

.catalog__item-tag {
  padding: 6px 8px;
  font-weight: 500;
  font-size: 12px;
  color: var(--white);
  background-color: var(--red);
  border-radius: 6px;
}
</style>
