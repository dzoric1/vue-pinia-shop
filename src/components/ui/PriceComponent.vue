<script setup>
import IconPoints from '../icons/IconPoints.vue'

defineProps({
  packagePrice: Number
})
</script>

<template>
  <div class="price">
    <div class="price__row">
      <p class="price__discount">110 ₽</p>
      <p class="price__points">+248 <IconPoints /></p>
    </div>
    <p class="price__value">496 ₽ <span>/ кг</span></p>
    <p class="price__package" v-if="packagePrice">{{ packagePrice }} ₽/ кор</p>
  </div>
</template>

<style lang="scss">
.price__row {
  display: flex;
  align-items: center;
  gap: 5px;
}

.price__value {
  font-weight: 600;
  font-size: 18px;
  margin-top: 4px;
  span {
    font-weight: 600;
    font-size: 15px;
    color: var(--text-gray);
  }
}

.price__discount {
  font-size: 15px;
  text-decoration: line-through;
  color: var(--text-gray);
}

.price__points {
  display: inline-flex;
  align-self: center;
  gap: 6px;
  padding: 4px 6px;
  line-height: 100%;
  font-size: 12px;
  color: var(--white);
  border-radius: 40px;
  background: linear-gradient(54deg, #ff782d 0%, #f32254 70%);

  svg {
    width: 11px;
    height: 11px;
    border-radius: 50%;
    object-fit: cover;
  }
}

.price__package {
  margin-top: 2px;
  font-size: 13px;
  color: var(--text-gray);
}
</style>
