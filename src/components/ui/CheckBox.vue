<script setup>
import { ref } from 'vue'

defineProps({
  label: String
})

const isChecked = ref(false)

const toggleCheck = () => {
  isChecked.value = !isChecked.value
}
</script>

<template>
  <label class="checkbox" :class="{ 'checkbox--checked': isChecked }">
    <input
      @change="toggleCheck"
      type="checkbox"
      :checked="isChecked"
      class="checkbox__input"
    />
    <span class="checkbox__icon"></span>
    {{ label }}
  </label>
</template>

<style lang="scss" scoped>
.checkbox {
  font-size: 14px;
  line-height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;

  &--checked {
    .checkbox__icon {
      background-color: var(--light-green);
      background-image: url('@/assets/check.svg');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 8px;
    }
  }

  &:hover {
    .checkbox__icon {
      background-color: var(--light-green);
    }
  }
}

.checkbox__icon {
  width: 14px;
  height: 14px;
  background-color: rgba(93, 136, 150, 0.08);
  border-radius: 50%;
  margin-right: 8px;
  transition: background-color 0.2s ease;
}

.checkbox__input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}
</style>
