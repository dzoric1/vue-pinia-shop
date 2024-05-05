<script setup></script>

<template>
  <section class="breadcrumbs">
    <div class="breadcrumbs__container container">
      <ul class="breadcrumbs__list">
        <li class="breadcrumbs__item">
          <RouterLink to="./" class="breadcrumbs__link">Главная</RouterLink>
        </li>
        <li class="breadcrumbs__item">
          <RouterLink to="./" class="breadcrumbs__link">Каталог</RouterLink>
        </li>
        <li class="breadcrumbs__item">
          <RouterLink to="./" class="breadcrumbs__link"
            >Мясо. Птица. Фарш</RouterLink
          >
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss">
.breadcrumbs {
  padding: 30px 0;

  @include tablet {
    padding: 15px 0;
  }
}

.breadcrumbs__list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.breadcrumbs__item {
  position: relative;

  &:last-child {
    .breadcrumbs__link {
      &::after {
        display: none;
      }
    }
  }
}

.breadcrumbs__link {
  padding-right: 16px;
  color: var(--text-gray);

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    width: 5px;
    height: 8px;
    background: url('@/assets/separatorIcon.svg') no-repeat center;
  }
}
</style>
