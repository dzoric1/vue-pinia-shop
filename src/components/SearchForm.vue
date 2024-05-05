<script setup>
import IconSearch from './icons/IconSearch.vue'

const props = defineProps({
  class: String,
  placeholder: String
})
</script>

<template>
  <form class="search" :class="props.class">
    <div class="search__input-wrapper">
      <input
        class="search__input"
        type="text"
        :placeholder="props.placeholder"
      />
      <button class="search__submit" type="submit" aria-label="Поиск">
        <IconSearch />
      </button>
    </div>
  </form>
</template>

<style lang="scss">
.search {
  width: 100%;

  &:focus-within {
    .search__input-wrapper {
      background: var(--red);
    }
    .search__input {
      color: var(--white);
      &::placeholder {
        color: var(--white);
        opacity: 0.5;
      }
    }
    .search__submit {
      svg {
        path {
          stroke: var(--white);
        }
      }
    }
  }
}

.search__input-wrapper {
  display: flex;
  justify-content: space-between;
  width: 100%;
  transition: background 0.2s ease;
  background: rgba(93, 136, 150, 0.08);
  border-radius: 9px;
}

.search__input {
  background-color: transparent;
  border-radius: 9px;
  border: none;
  width: 100%;
  padding: 12px 12px 12px 27px;
  font-size: 15px;
  color: var(--text-black);

  &::placeholder {
    color: var(--text-gray);
  }

  @include tablet {
    padding: 8px 8px 8px 27px;
    font-size: 14px;
  }
}

.search__submit {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  transition: opacity 0.2s ease;

  svg {
    width: 18px;
    height: 18px;
    object-fit: contain;
  }

  &:hover {
    opacity: 0.6;
  }
}
</style>
