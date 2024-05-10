<script setup>
import IconStar from '@/components/icons/IconStar.vue'
</script>

<template>
  <div class="rate">
    <IconStar />
    <span>4.6</span>
  </div>
</template>

<style lang="scss">
.rate {
  // position: absolute;
  // z-index: 5;
  // top: 16px;
  // left: 16px;
  font-weight: 500;
  text-align: center;
  color: #585858;
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
