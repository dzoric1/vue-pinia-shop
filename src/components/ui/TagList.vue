<script setup></script>

<template>
  <ul class="tags">
    <li class="tags__item">Хит</li>
    <li class="tags__item">Новинка</li>
    <li class="tags__item">Заморозка</li>
    <!-- <li class="tags__item">Ликвидация</li> -->
  </ul>
</template>

<style lang="scss">
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 2px 6px;
  width: 100%;
}

.tags__item {
  padding: 6px 8px;
  font-weight: 500;
  font-size: 12px;
  color: var(--white);
  background-color: var(--red);
  border-radius: 6px;
}
</style>
