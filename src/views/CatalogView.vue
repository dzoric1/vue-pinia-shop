<script setup>
import DropdownMenu from '@/components/ui/DropdownMenu.vue'
import RangeSlider from '@/components/ui/RangeSlider.vue'
import CatalogItem from '@/components/CatalogItem.vue'
import { useProductsStore } from '@/stores/products'
import { storeToRefs } from 'pinia'
import { onMounted, computed } from 'vue'
import AppLoader from '@/components/ui/AppLoader.vue'
import SortComponent from '@/components/ui/SortComponent.vue'

const productsStore = useProductsStore()
const { products, isProductsLoading, totalProducts, currentProducts } =
  storeToRefs(productsStore)

const { getProducts } = productsStore

const getFilterList = (sortValue) => {
  return products.value.reduce((acc, product) => {
    if (!acc.includes(product[sortValue])) {
      acc.push(product[sortValue])
    }
    return acc
  }, [])
}

const brandsList = computed(() => {
  return getFilterList('brand')
})

const countryList = computed(() => {
  return getFilterList('country')
})

const menuList = computed(() => {
  return getFilterList('menu')
})

const tasteList = computed(() => {
  return getFilterList('taste')
})

onMounted(async () => {
  await getProducts()
})
</script>

<template>
  <section class="catalog">
    <div class="catalog__container container">
      <aside class="catalog__filters">
        <ul class="catalog__filters-list">
          <li>
            <DropdownMenu :list="brandsList" label="Бренд" />
          </li>
          <li>
            <DropdownMenu :list="countryList" label="Страна" />
          </li>
          <li>
            <DropdownMenu :list="menuList" label="Направления меню" />
          </li>
          <li>
            <DropdownMenu :list="tasteList" label="Вкус мяса" />
          </li>
          <RangeSlider :max="480" label="Вес" valueName="г" />
          <RangeSlider :max="480" label="Цена" valueName="₽" />
        </ul>
        <button class="catalog__filters-reset" type="button">
          Очистить фильтр
        </button>
      </aside>
      <div class="catalog__body">
        <div class="catalog__header">
          <h1 class="catalog__title">Мясо. Птица. Фарш</h1>
          <p class="catalog__count">{{ totalProducts }} товаров</p>
          <SortComponent />
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
        <ul v-if="isProductsLoading" class="catalog__list">
          <li v-for="i in 4" :key="i">
            <AppLoader />
          </li>
        </ul>
        <ul v-else class="catalog__list">
          <li v-for="product in currentProducts" :key="product.id">
            <CatalogItem :product="product" />
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
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

  @include tablet {
    flex-direction: column;
    align-items: flex-start;
  }
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

  @include tablet {
    align-self: flex-start;
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

  @include small-desktop {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @include tablet {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @include big-mobile {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
</style>
