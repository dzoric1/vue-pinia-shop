<script setup>
import IconStar from '@/components/icons/IconStar.vue'

defineProps({
  value: Number
})
</script>

<template>
  <div class="rate">
    <IconStar />
    <span>{{ value }}</span>
  </div>
</template>

<style lang="scss">
.rate {
  font-weight: 500;
  text-align: center;
  color: #585858;
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
