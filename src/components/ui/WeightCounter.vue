<script setup>
import convertWeight from '@/utils/convertWeight'

defineProps({
  weight: Number
})

defineEmits(['increment', 'decrement'])
</script>

<template>
  <div class="weight-counter">
    <button
      class="weight-counter__button weight-counter__button--minus"
      @click="$emit('decrement')"
    ></button>
    <p class="weight-counter__value">
      {{ convertWeight(weight) }}
    </p>
    <button
      class="weight-counter__button weight-counter__button--plus"
      @click="$emit('increment')"
    ></button>
  </div>
</template>

<style lang="scss">
.weight-counter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
  max-width: 240px;
}

.weight-counter__button {
  border-radius: 9px;
  width: 44px;
  height: 44px;
  background: rgba(93, 136, 150, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.6;
  }

  &::after,
  &::before {
    position: absolute;
    content: '';
    display: block;
    width: 18px;
    height: 2px;
    background: var(--text-black);
    pointer-events: all;
    border-radius: 2px;
  }

  &--plus {
    &::before {
      transform: rotate(90deg);
    }
  }
}
.weight-counter__value {
  font-weight: 600;
  font-size: 16px;
  text-align: center;
}
</style>
