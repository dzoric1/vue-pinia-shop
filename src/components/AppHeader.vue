<script setup></script>

<template>
  <header class="header">
    <RouterLink to="./" class="header__logo">
      <img src="@/assets/logo.svg" alt="логотип" />
    </RouterLink>
    <button class="header__catalog-button">
      <img src="@/assets/catalog.svg" alt="иконка кнопки" />
      Каталог
    </button>
    <p>Поиск</p>
    <a href="#">link</a>
  </header>
</template>

<style lang="scss">
.header {
  padding: 26px 0;
  display: flex;
  gap: 10px;
}

.header__catalog-button {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 15px;
  padding: 16px;
  background-color: var(--red);
}
</style>
