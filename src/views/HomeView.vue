<script setup>
import DropdownMenu from '@/components/ui/DropdownMenu.vue'
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
        </ul>
        <button class="catalog__filters-reset">Очистить фильтр</button>
      </aside>
      <div class="catalog__body">КАТАЛОГ</div>
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
</style>
