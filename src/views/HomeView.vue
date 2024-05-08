<script setup>
import CheckBox from '@/components/ui/CheckBox.vue'
import DropdownMenu from '@/components/ui/DropdownMenu.vue'
import RangeSlider from '@/components/ui/RangeSlider.vue'
import useClickOutside from '@/hooks/useClickOutside.js'
import CatalogItem from '@/components/CatalogItem.vue'

import { ref } from 'vue'

const isOpen = ref(false)
const sort = ref(null)

useClickOutside(sort, () => (isOpen.value = false))
</script>

<template>
  <section class="catalog">
    <div class="catalog__container container">
      <aside class="catalog__filters">
        <ul class="catalog__filters-list">
          <li>
            <DropdownMenu />
          </li>
          <li>
            <DropdownMenu />
          </li>
          <RangeSlider :max="480" />
        </ul>
        <button class="catalog__filters-reset" type="button">
          Очистить фильтр
        </button>
      </aside>
      <div class="catalog__body">
        <div class="catalog__header">
          <h1 class="catalog__title">Мясо. Птица. Фарш</h1>
          <p class="catalog__count">60 товаров</p>
          <div style="max-width: 300px"></div>
          <div class="catalog__sort" ref="sort">
            <button @click="isOpen = !isOpen" class="catalog__sort-button">
              Сначала популярные
            </button>
            <ul
              class="catalog__sort-list"
              :class="{ 'catalog__sort-list--active': isOpen }"
            >
              <li>
                <CheckBox label="Сначала популярные" />
              </li>
              <li>
                <CheckBox label="Сначала дешевле" />
              </li>
              <li>
                <CheckBox label="Сначала дороже" />
              </li>
              <li>
                <CheckBox label="Высокий рейтинг" />
              </li>
            </ul>
          </div>
        </div>
        <div class="catalog__tags">
          <ul class="catalog__tags-list">
            <li class="catalog__tags-item">
              <button class="catalog__tags-button">Говядина 6</button>
            </li>
            <li class="catalog__tags-item">
              <button class="catalog__tags-button">Свинина 64</button>
            </li>
            <li class="catalog__tags-item">
              <button class="catalog__tags-button">Птица 6</button>
            </li>
            <li class="catalog__tags-item">
              <button class="catalog__tags-button">
                Гусь, утка, индейка, перепелка 6
              </button>
            </li>
            <li class="catalog__tags-item">
              <button class="catalog__tags-button">Говядина 6</button>
            </li>
            <li class="catalog__tags-item">
              <button class="catalog__tags-button">Говядина 6</button>
            </li>
            <li class="catalog__tags-item">
              <button class="catalog__tags-button">
                Гусь, утка, индейка, перепелка 6
              </button>
            </li>
            <li class="catalog__tags-item">
              <button class="catalog__tags-button">Говядина 6</button>
            </li>
            <li class="catalog__tags-item">
              <button class="catalog__tags-button">
                Гусь, утка, индейка, перепелка 6
              </button>
            </li>
          </ul>
        </div>
        <div class="catalog__tags">
          <ul class="catalog__tags-list">
            <li class="catalog__tags-item">
              <button class="catalog__tags-button catalog__tags-button--green">
                Bonefesto
              </button>
            </li>
            <li class="catalog__tags-item">
              <button class="catalog__tags-button catalog__tags-button--green">
                Сметанковый
              </button>
            </li>
          </ul>
        </div>
        <ul class="catalog__list">
          <li>
            <CatalogItem :itemId="1" />
          </li>
          <li>
            <CatalogItem :itemId="2" />
          </li>
          <li>
            <CatalogItem :itemId="3" />
          </li>
          <li>
            <CatalogItem :itemId="4" />
          </li>
          <li>
            <CatalogItem :itemId="5" />
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.catalog {
}

.catalog__container {
  display: flex;
  gap: 40px;
}

.catalog__filters {
  flex: 0 0 220px;
}

.catalog__filters-list {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.catalog__filters-reset {
  width: 100%;
  font-weight: 500;
  font-size: 15px;
  line-height: 133%;
  text-align: center;
  color: var(--text-gray);
  padding: 14px;
  margin-top: 30px;
  background: rgba(93, 136, 150, 0.08);
  border-radius: 6px;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
}

.catalog__body {
  width: 100%;
}

.catalog__header {
  display: flex;
  margin-bottom: 30px;
}

.catalog__title {
  font-weight: 600;
  font-size: 32px;
  line-height: 135%;
  margin-right: 25px;
}

.catalog__count {
  line-height: 135%;
  color: var(--text-gray);
  align-self: flex-end;
}

.catalog__sort {
  position: relative;
  margin-top: 6px;
  margin-left: auto;
}

.catalog__sort-button {
  color: rgba(12, 12, 13, 0.8);
  display: flex;
  align-items: center;
  gap: 8px;

  &::after {
    display: inline-block;
    content: '';
    transform: rotate(90deg);
    transition: transform 0.2s ease;
    width: 7px;
    height: 12px;
    background: url('@/assets/arrow.svg') no-repeat center / contain;
    margin-right: 3px;
  }
}

.catalog__sort-list {
  padding: 20px 16px;
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.15);
  background-color: var(--white);
  border-radius: 12px;
  width: 192px;
  display: flex;
  gap: 15px;
  flex-direction: column;
  position: absolute;
  top: calc(100% - 10px);
  right: 0;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.2s ease,
    visibility 0.2s ease;

  &--active {
    opacity: 1;
    visibility: visible;
  }
}

.catalog__tags {
  margin-bottom: 10px;
}

.catalog__tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.catalog__tags-item {
}

.catalog__tags-button {
  padding: 12px;
  font-weight: 500;
  color: var(--text-gray);
  background-color: #f2f3f5;
  border-radius: 6px;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }

  &--green {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--light-green);
    background: rgba(70, 161, 117, 0.15);

    &::after {
      display: inline-block;
      content: '';
      width: 8px;
      height: 8px;
      background: url('@/assets/xmark.svg') no-repeat center / contain;
    }
  }
}

.catalog__list {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
  margin-top: 20px;
  width: 100%;
}
</style>
