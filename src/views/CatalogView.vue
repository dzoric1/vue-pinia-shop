<script setup>
import DropdownMenu from '@/components/ui/DropdownMenu.vue'
import RangeSlider from '@/components/ui/RangeSlider.vue'
import CatalogItem from '@/components/CatalogItem.vue'
import { useProductsStore } from '@/stores/products'
import { useFiltersStore } from '@/stores/filters'
import { storeToRefs } from 'pinia'
import { onMounted, computed } from 'vue'
import AppLoader from '@/components/ui/AppLoader.vue'
import SortComponent from '@/components/ui/SortComponent.vue'
import FilterTagList from '@/components/ui/FilterTagList.vue'

const productsStore = useProductsStore()
const { products, isProductsLoading, totalProducts, currentProducts } =
  storeToRefs(productsStore)
const { getProducts } = productsStore

const filterStore = useFiltersStore()
const { filters } = storeToRefs(filterStore)
const { addFilter, deleteFilter } = filterStore

const getFilterList = (sortValue) => {
  return products.value.reduce((acc, product) => {
    const existingFilter = acc.find((item) => item.name === product[sortValue])
    if (existingFilter) {
      existingFilter.count++
    } else {
      acc.push({ name: product[sortValue], count: 1, sortValue: sortValue })
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

const typeList = computed(() => {
  return getFilterList('type')
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
            <DropdownMenu
              :list="brandsList"
              label="Бренд"
              @check="addFilter"
              @uncheck="deleteFilter"
            />
          </li>
          <li>
            <DropdownMenu
              :list="countryList"
              label="Страна"
              @check="addFilter"
              @uncheck="deleteFilter"
            />
          </li>
          <li>
            <DropdownMenu
              :list="menuList"
              label="Направления меню"
              @check="addFilter"
              @uncheck="deleteFilter"
            />
          </li>
          <li>
            <DropdownMenu
              :list="tasteList"
              label="Вкус мяса"
              @check="addFilter"
              @uncheck="deleteFilter"
            />
          </li>
          <RangeSlider :max="1000" label="Вес" valueName="г" />
          <RangeSlider :max="1000" label="Цена" valueName="₽" />
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
        <FilterTagList
          v-if="typeList"
          :list="typeList"
          class="catalog__tags"
          @click="addFilter"
        />
        <FilterTagList
          v-if="filters"
          :list="filters"
          class="catalog__tags"
          isGreen
          @click="deleteFilter"
        />
        <ul v-if="isProductsLoading" class="catalog__list">
          <li v-for="i in 4" :key="i">
            <AppLoader />
          </li>
        </ul>
        <ul v-else-if="currentProducts.length > 0" class="catalog__list">
          <li v-for="product in currentProducts" :key="product.id">
            <CatalogItem :product="product" />
          </li>
        </ul>
        <h2 class="catalog__not-found" v-else>Ничего не найдено</h2>
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

.catalog__not-found {
  font-size: 32px;
  font-weight: 600;
  text-align: center;
  margin-top: 60px;
}
</style>
