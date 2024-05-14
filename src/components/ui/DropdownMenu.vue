<script setup>
import { ref } from 'vue'
import CheckBox from './CheckBox.vue'
import { useFiltersStore } from '@/stores/filters'

defineProps({
  label: String,
  list: Array
})

const isOpen = ref(false)
const menu = ref(null)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const filtersStore = useFiltersStore()
const { filterIsHas } = filtersStore

defineEmits(['check', 'uncheck'])
</script>

<template>
  <div class="dropdown" :class="{ 'dropdown--active': isOpen }">
    <button
      @click="toggleMenu"
      class="dropdown__button"
      type="button"
      aria-label="открыть меню"
    >
      <h3 class="dropdown__title">{{ label }}</h3>
    </button>
    <div class="dropdown__menu" ref="menu">
      <ul class="dropdown__menu-list">
        <li v-for="(item, i) in list" class="dropdown__menu-item" :key="i">
          <CheckBox
            :label="item.name"
            :name="item.name"
            :isChecked="filterIsHas(item)"
            @check="$emit('check', item)"
            @uncheck="$emit('uncheck', item)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
.dropdown {
  &--active {
    .dropdown__title {
      &::after {
        transform: rotate(-90deg);
      }
    }
    .dropdown__menu {
      opacity: 1;
      margin-top: 20px;
      padding: 2px 0;
      max-height: 220px;
      overflow: auto;
    }
  }
}

.dropdown__button {
  width: 100%;
}

.dropdown__title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  text-align: left;
  font-weight: 600;
  font-size: 18px;

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

.dropdown__menu {
  overflow: hidden;
  height: 100%;
  max-height: 0;
  opacity: 0;
  transition:
    opacity 0.2s ease,
    max-height 0.3s ease,
    margin-top 0.3s ease;

  &::-webkit-scrollbar-track {
    border-radius: 15px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar {
    border-radius: 15px;
    width: 4px;
    background-color: #f0f0f0;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 15px;
    background-color: #bdbdbd;
  }
}

.dropdown__menu-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>
